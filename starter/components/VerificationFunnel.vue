<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

interface Layer {
  title: string
  detail: string
  icon: string
  focus?: boolean
}

const layers: Layer[] = [
  { icon: 'codebasis', title: 'Codebasis', detail: 'saubere Schnittstellen, Architektur, Aufräumen' },
  { icon: 'statisch', title: 'Statische Analyse', detail: 'Lint-Regeln, Typen, Compiler, Tests, Pipeline' },
  { icon: 'verifikation', title: 'Verifikation', detail: 'formal, empirisch', focus: true },
  { icon: 'prosa', title: 'Prosa', detail: 'Regeln für den Agenten' },
  { icon: 'mensch', title: 'Mensch', detail: '' },
]

const { $clicks } = useSlideContext()
const focused = computed(() => $clicks.value >= 1)

const top = 20
const apex = 540
const cx = 500
const halfTop = 320
const bounds = [20, 118, 216, 326, 436, 540]
const iconSize = 64
const half = (y: number) => halfTop * (apex - y) / (apex - top)

const shapes = layers.map((layer, i) => {
  const y0 = bounds[i]
  const y1 = bounds[i + 1]
  const points = [
    [cx - half(y0), y0],
    [cx + half(y0), y0],
    [cx + half(y1), y1],
    [cx - half(y1), y1],
  ].map(p => p.join(',')).join(' ')
  const last = i === layers.length - 1
  const mid = last ? y0 + 30 : (y0 + y1) / 2
  return { ...layer, points, mid, last, iconX: cx - half(mid) - iconSize - 18 }
})

const focusLayer = shapes.find(s => s.focus)!
const arrowY = focusLayer.mid
const arrowTip = cx + half(arrowY) + 16
</script>

<template>
  <svg viewBox="0 0 1000 560" class="funnel" role="img" aria-label="Umgekehrte Pyramide: Codebasis, statische Analyse, Verifikation, Prosa, menschliches Review. Heute geht es um Verifikation.">
    <defs>
      <marker id="funnel-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#ff6bed" />
      </marker>
    </defs>

    <g v-for="s in shapes" :key="s.title" class="layer" :class="{ 'is-focus': focused && s.focus, 'is-dim': focused && !s.focus }">
      <polygon :points="s.points" />
      <image :href="`/funnel/${s.icon}.webp`" :x="s.iconX" :y="s.mid - iconSize / 2" :width="iconSize" :height="iconSize" class="layer__icon" />
      <text :x="cx" :y="s.last ? s.mid : s.mid - 10" text-anchor="middle" class="layer__title" :class="{ 'is-small': s.last }">{{ s.title }}</text>
      <text v-if="s.detail" :x="cx" :y="s.mid + 14" text-anchor="middle" class="layer__detail">({{ s.detail }})</text>
    </g>

    <g class="pointer" :class="{ 'is-on': focused }">
      <path :d="`M 850 ${arrowY} C 790 ${arrowY - 40}, 740 ${arrowY - 20}, ${arrowTip} ${arrowY}`" marker-end="url(#funnel-arrow)" />
      <text x="860" :y="arrowY - 6" class="pointer__title">Heute</text>
      <text x="860" :y="arrowY + 22" class="pointer__detail">Darauf schauen wir</text>
    </g>
  </svg>
</template>

<style scoped>
.funnel {
  width: 100%;
  height: auto;
  max-height: 420px;
  font-family: inherit;
}

.layer polygon {
  fill: rgba(255, 255, 255, 0.04);
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linejoin: round;
  transition: fill 0.4s, stroke 0.4s, opacity 0.4s;
}

.layer text {
  fill: currentColor;
  transition: fill 0.4s, opacity 0.4s;
}

.layer__title {
  font-size: 30px;
  font-weight: 700;
}

.layer__title.is-small {
  font-size: 20px;
}

.layer__detail {
  font-size: 14px;
  opacity: 0.7;
}

.layer.is-dim {
  opacity: 0.35;
}

.layer__icon {
  transition: transform 0.4s;
  transform-box: fill-box;
  transform-origin: center;
}

.layer.is-focus .layer__icon {
  transform: scale(1.25);
}

.layer.is-focus polygon {
  fill: rgba(255, 107, 237, 0.2);
  stroke: #ff6bed;
  stroke-width: 4;
}

.layer.is-focus text {
  fill: #ff6bed;
}

.pointer {
  opacity: 0;
  transition: opacity 0.4s 0.2s;
}

.pointer.is-on {
  opacity: 1;
}

.pointer path {
  fill: none;
  stroke: #ff6bed;
  stroke-width: 4;
  stroke-linecap: round;
}

.pointer__title {
  fill: #ff6bed;
  font-size: 36px;
  font-weight: 700;
}

.pointer__detail {
  fill: currentColor;
  font-size: 18px;
  opacity: 0.8;
}
</style>
