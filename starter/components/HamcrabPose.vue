<script setup lang="ts">
import { computed } from 'vue'
import { resolveAssetUrl } from '@alexop/slidev-theme-brand/layoutHelper'

export type HamcrabPoseName = 'dance' | 'stand' | 'tired' | 'sit' | 'clap' | 'shock' | 'popcorn' | 'popcorn-drop'

const props = withDefaults(defineProps<{ pose: HamcrabPoseName, size?: number }>(), { size: 180 })

const labels: Record<HamcrabPoseName, string> = {
  dance: 'Hamcrab tanzt.',
  stand: 'Hamcrab steht mit erhobenen Armen.',
  tired: 'Hamcrab steht müde und wackelt.',
  sit: 'Hamcrab sitzt zufrieden auf dem Boden.',
  clap: 'Hamcrab sitzt und klatscht.',
  shock: 'Hamcrab hält sich geschockt die Wangen.',
  popcorn: 'Hamcrab sitzt mit Popcorn und schaut zu.',
  'popcorn-drop': 'Hamcrab lässt vor Schreck das Popcorn fallen.',
}

const src = computed(() => resolveAssetUrl(`/sprites/hamcrab-${props.pose}.webp`))
</script>

<template>
  <div class="hamcrab-pose" :style="{ '--hamcrab-size': `${size}px` }">
    <DancingHamcrab v-if="pose === 'dance'" />
    <img v-else :key="pose" :src="src" :alt="labels[pose]" :class="`is-${pose}`">
  </div>
</template>

<style scoped>
.hamcrab-pose { width: var(--hamcrab-size); height: var(--hamcrab-size); }
.hamcrab-pose img { width: 100%; height: 100%; object-fit: contain; transform-origin: 50% 90%; }
.is-stand { animation: hop .5s ease-out; }
.is-tired { animation: wobble 1.6s ease-in-out infinite; }
.is-sit { animation: plopp .35s ease-out; }
.is-clap { animation: cheer .45s ease-in-out infinite alternate; }
.is-shock { animation: shake .12s linear 6, plopp .3s ease-out; }
.is-popcorn { animation: munch 1.2s ease-in-out infinite; }
.is-popcorn-drop { animation: shake .1s linear 5; }
@keyframes hop { 0% { transform: translateY(12%) scale(.95); } 60% { transform: translateY(-6%); } 100% { transform: none; } }
@keyframes wobble { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
@keyframes plopp { 0% { transform: translateY(-14%); } 70% { transform: translateY(2%) scaleY(.94); } 100% { transform: none; } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3%); } 75% { transform: translateX(3%); } }
@keyframes munch { 0%, 100% { transform: none; } 50% { transform: translateY(-2%) rotate(-1deg); } }
@keyframes cheer { from { transform: translateY(0); } to { transform: translateY(-4%); } }
@media (prefers-reduced-motion: reduce) { .hamcrab-pose img { animation: none; } }
@media print { .hamcrab-pose img { animation: none; } }
</style>
