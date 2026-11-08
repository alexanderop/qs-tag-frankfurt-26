<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface VideoChapter {
  /** Start in seconds. */
  t: number
  text: string
  kind?: 'pass' | 'bug' | 'info'
  /** What went wrong, shown under the text of a bug row. */
  finding?: string
  severity?: 'critical' | 'major' | 'minor'
}

const props = defineProps<{ src: string, chapters: VideoChapter[] }>()

const video = ref<HTMLVideoElement>()
const now = ref(0)
const list = ref<HTMLOListElement>()

const active = computed(() => {
  let index = -1
  props.chapters.forEach((c, i) => {
    if (c.t <= now.value + 0.05)
      index = i
  })
  return index
})

watch(active, async (i) => {
  await nextTick()
  const el = list.value
  const row = el?.children[i] as HTMLElement | undefined
  if (!el || !row)
    return
  el.scrollTo({ top: row.offsetTop - (el.clientHeight - row.offsetHeight) / 2, behavior: 'smooth' })
})

// The presenter view drives the video, the audience tab follows. One direction only, so no echo loops.
const isPresenter = typeof location !== 'undefined' && location.pathname.includes('/presenter')
let channel: BroadcastChannel | undefined

function broadcast() {
  const v = video.value
  if (!v || !isPresenter)
    return
  channel?.postMessage({ src: props.src, t: v.currentTime, playing: !v.paused })
}

onMounted(() => {
  channel = new BroadcastChannel('annotated-video')
  if (isPresenter)
    return
  channel.onmessage = ({ data }) => {
    const v = video.value
    if (!v || data.src !== props.src)
      return
    if (Math.abs(v.currentTime - data.t) > 0.4)
      v.currentTime = data.t
    now.value = data.t
    if (data.playing && v.paused)
      v.play().catch(() => {})
    if (!data.playing && !v.paused)
      v.pause()
  }
})

onBeforeUnmount(() => channel?.close())

const icon = { pass: '✅', bug: '🐛', info: '▶' } as const

function seek(t: number) {
  if (!video.value)
    return
  video.value.currentTime = t
  now.value = t
}

function stamp(t: number) {
  return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`
}
</script>

<template>
  <div class="annotated">
    <div class="annotated__stage">
      <video ref="video" :src="src" controls muted class="annotated__video" @timeupdate="now = ($event.target as HTMLVideoElement).currentTime" @seeked="now = ($event.target as HTMLVideoElement).currentTime; broadcast()" @play="broadcast" @pause="broadcast" />
      <div v-if="active >= 0" :key="active" class="annotated__caption" :class="`is-${chapters[active].kind ?? 'info'}`">
        {{ chapters[active].text }}
        <div v-if="chapters[active].finding" class="annotated__caption-finding">
          {{ chapters[active].finding }}
        </div>
      </div>
    </div>
    <div class="annotated__side">
      <ol ref="list" class="annotated__list">
        <li v-for="(c, i) in chapters" :key="c.t" :class="[{ 'is-active': i === active, 'is-past': i < active }, `is-${c.kind ?? 'info'}`]" @click="seek(c.t)">
          <span class="annotated__time">{{ stamp(c.t) }}</span>
          <span class="annotated__icon">{{ icon[c.kind ?? 'info'] }}</span>
          <span>
            {{ c.text }}
            <span v-if="c.finding" class="annotated__finding">
              <span v-if="c.severity" class="annotated__sev" :class="`is-${c.severity}`">{{ c.severity.toUpperCase() }}</span>
              {{ c.finding }}
            </span>
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.annotated {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  gap: 18px;
  align-items: stretch;
}

.annotated__side {
  position: relative;
}

.annotated__stage {
  position: relative;
}

.annotated__video {
  width: 100%;
  border-radius: 8px;
  display: block;
}

.annotated__caption {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  background: rgba(17, 17, 17, 0.88);
  border-left: 4px solid #ff6bed;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  animation: pop 0.25s ease-out;
}

.annotated__caption.is-bug {
  background: #ff6bed;
  border-left-color: #fff;
  color: #111;
}

.annotated__list {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  scrollbar-width: none;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 12.5px;
  line-height: 1.3;
}

.annotated__list li {
  display: grid;
  grid-template-columns: 34px 20px 1fr;
  gap: 4px;
  padding: 4px 6px;
  margin: 0;
  line-height: 1.25;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 0.2s, background 0.2s;
}

.annotated__list li.is-past {
  opacity: 0.8;
}

.annotated__list li.is-active {
  opacity: 1;
  background: rgba(255, 107, 237, 0.15);
  outline: 1px solid #ff6bed;
}

.annotated__list li.is-bug {
  box-shadow: inset 3px 0 0 #ff4d4d;
}

.annotated__finding {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 1px;
  font-weight: 700;
  color: #ff8a8a;
}

.annotated__sev {
  flex: none;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 1px 6px;
  border-radius: 999px;
}

.annotated__sev.is-critical {
  background: rgba(255, 77, 77, 0.18);
  color: #ff8a8a;
}

.annotated__sev.is-major {
  background: rgba(251, 146, 60, 0.18);
  color: #fdba74;
}

.annotated__sev.is-minor {
  background: rgba(250, 204, 21, 0.16);
  color: #fde047;
}

.annotated__caption-finding {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 600;
}

.annotated__time {
  font-family: ui-monospace, monospace;
  color: #ff6bed;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}
</style>
