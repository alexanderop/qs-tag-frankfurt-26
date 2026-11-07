<script setup lang="ts">
export interface IconCard {
  /** Path under public/, e.g. "/icons/rakete.webp". */
  icon: string
  title: string
  sub?: string
  tag?: string
  accent?: boolean
}

const { items, flow = false, columns, size = 'md' } = defineProps<{
  items: IconCard[]
  /** Row with arrows between cards (a process). Otherwise a grid. */
  flow?: boolean
  columns?: number
  size?: 'md' | 'lg'
}>()
</script>

<template>
  <div class="cards" :class="[flow ? 'cards--flow' : 'cards--grid', `cards--${size}`]" :style="!flow ? { gridTemplateColumns: `repeat(${columns ?? items.length}, minmax(0, 1fr))` } : undefined">
    <div v-for="(item, i) in items" :key="item.title" v-click class="cards__step">
      <div v-if="flow && i > 0" class="cards__arrow">→</div>
      <div class="cards__card" :class="{ 'is-accent': item.accent }">
        <img :src="item.icon" alt="" class="cards__icon">
        <div class="cards__title">{{ item.title }}</div>
        <div v-if="item.sub" class="cards__sub">{{ item.sub }}</div>
        <div v-if="item.tag" class="cards__tag">{{ item.tag }}</div>
      </div>
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
  align-self: center;
  color: #ff6bed;
  font-size: 28px;
  font-weight: 700;
  padding: 0 6px;
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
  width: 150px;
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
