<script setup lang="ts">
import { resolveAssetUrl } from '@alexop/slidev-theme-brand/layoutHelper'

export interface IconCard {
  /** Path under public/, e.g. "/icons/rakete.webp". */
  icon: string
  title: string
  sub?: string
  tag?: string
  accent?: boolean
}

const { items, flow = false, columns, size = 'md', width = 150, loop, noClicks = false } = defineProps<{
  items: IconCard[]
  /** Row with arrows between cards (a process). Otherwise a grid. */
  flow?: boolean
  columns?: number
  size?: 'md' | 'lg'
  /** Card width in px for `flow`. */
  width?: number
  /** Dashed arrow back from card `from` to card `to` (0-based), shown with the last card. */
  loop?: { from: number, to: number, label: string }
  /** Show all cards at once instead of one `v-click` per card. */
  noClicks?: boolean
}>()

const arrow = 28
const center = (i: number) => i * (width + arrow) + width / 2
</script>

<template>
  <div class="cards-wrap">
  <div class="cards" :class="[flow ? 'cards--flow' : 'cards--grid', `cards--${size}`]" :style="!flow ? { gridTemplateColumns: `repeat(${columns ?? items.length}, minmax(0, 1fr))` } : { '--card-w': `${width}px` }">
    <div v-for="(item, i) in items" :key="item.title" v-click="noClicks ? false : undefined" class="cards__step">
      <div v-if="flow && i > 0" class="cards__arrow">→</div>
      <div class="cards__card" :class="{ 'is-accent': item.accent }">
        <img :src="resolveAssetUrl(item.icon)" alt="" class="cards__icon">
        <div class="cards__title">{{ item.title }}</div>
        <div v-if="item.sub" class="cards__sub">{{ item.sub }}</div>
        <div v-if="item.tag" class="cards__tag">{{ item.tag }}</div>
      </div>
    </div>
  </div>
  <div v-if="flow && loop" v-after class="cards__loop" :style="{ marginLeft: `${center(loop.to)}px`, width: `${center(loop.from) - center(loop.to)}px` }">
    <span>{{ loop.label }}</span>
  </div>
  </div>
</template>

<style scoped>
.cards--flow {
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.cards--grid {
  display: grid;
  gap: 16px;
}

.cards__step {
  display: flex;
  align-items: stretch;
}

.cards__arrow {
  width: 28px;
  text-align: center;
  align-self: center;
  color: #ff6bed;
  font-size: 28px;
  font-weight: 700;
}

.cards__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 12px 10px;
  background: rgba(255, 255, 255, 0.04);
}

.cards--flow .cards__card {
  width: var(--card-w);
}

.cards-wrap {
  width: fit-content;
  margin: 0 auto;
}

.cards__loop {
  position: relative;
  height: 30px;
  border: 2px dashed #ff6bed;
  border-top: none;
  border-radius: 0 0 10px 10px;
}

.cards__loop::before {
  content: '▲';
  position: absolute;
  left: -8px;
  top: -12px;
  color: #ff6bed;
  font-size: 14px;
}

.cards__loop span {
  position: absolute;
  left: 50%;
  bottom: -12px;
  transform: translateX(-50%);
  padding: 0 10px;
  background: var(--slidev-theme-background, #141414);
  color: #ff6bed;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.cards__card.is-accent {
  border-color: #ff6bed;
  background: rgba(255, 107, 237, 0.12);
}

.cards__icon {
  width: 72px;
  height: 72px;
  margin-bottom: 6px;
}

.cards--lg .cards__icon {
  width: 104px;
  height: 104px;
}

.cards__title {
  font-weight: 700;
  font-size: 15px;
  line-height: 1.25;
}

.cards--lg .cards__title {
  font-size: 20px;
}

.cards__sub {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 4px;
  line-height: 1.35;
}

.cards--lg .cards__sub {
  font-size: 15px;
}

.cards__tag {
  font-size: 11px;
  color: #ff6bed;
  margin-top: auto;
  padding-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
