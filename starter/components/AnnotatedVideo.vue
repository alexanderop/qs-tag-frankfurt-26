<script setup lang="ts">
import { computed, ref } from 'vue'

export interface VideoChapter {
  /** Start in seconds. */
  t: number
  text: string
  kind?: 'pass' | 'bug' | 'info'
}

const props = defineProps<{ src: string, chapters: VideoChapter[] }>()

const video = ref<HTMLVideoElement>()
const now = ref(0)

const active = computed(() => {
  let index = -1
  props.chapters.forEach((c, i) => {
    if (c.t <= now.value + 0.05)
      index = i
  })
  return index
})

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
      <video ref="video" :src="src" controls muted class="annotated__video" @timeupdate="now = ($event.target as HTMLVideoElement).currentTime" @seeked="now = ($event.target as HTMLVideoElement).currentTime" />
      <div v-if="active >= 0" :key="active" class="annotated__caption" :class="`is-${chapters[active].kind ?? 'info'}`">
        {{ chapters[active].text }}
      </div>
    </div>
    <ol class="annotated__list">
      <li v-for="(c, i) in chapters" :key="c.t" :class="[{ 'is-active': i === active, 'is-past': i < active }, `is-${c.kind ?? 'info'}`]" @click="seek(c.t)">
        <span class="annotated__time">{{ stamp(c.t) }}</span>
        <span class="annotated__icon">{{ icon[c.kind ?? 'info'] }}</span>
        <span>{{ c.text }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.annotated {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
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

.annotated__list li.is-bug span:last-child {
  font-weight: 700;
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
