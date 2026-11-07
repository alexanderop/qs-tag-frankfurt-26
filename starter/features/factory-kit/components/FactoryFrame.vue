<script setup lang="ts">
/**
 * The chrome around every factory scene: title bar with controls, the canvas
 * stage with a loading skeleton, and a slot for stats and panels below.
 * Fill the `hud-left` / `hud-right` slots to get a game-style HUD instead:
 * the frame breaks out of the text column and the panels sit beside the map.
 * Shared button, stat and chip styles live here, namespaced under `.factory`.
 */
import { computed, ref, useSlots } from "vue";
import { T, type TileRect } from "../geometry";

const props = defineProps<{
  title: string;
  ready: boolean;
  /**
  Map size in world px.
  */
  width: number;
  height: number;
  minWidth: number;
  /**
  Accessible description of the animation.
  */
  label: string;
  /**
  Grey placeholders shown until the first frame is drawn.
  */
  skeleton?: { floors: TileRect[]; machines: TileRect[] };
}>();

const emit = defineEmits<{
  pointermove: [e: PointerEvent];
  pointerleave: [];
  click: [e: PointerEvent];
}>();

const root = ref<HTMLElement>();
const stage = ref<HTMLElement>();
const canvas = ref<HTMLCanvasElement>();
defineExpose({ root, stage, canvas });

const slots = useSlots();
const hud = computed(() => !!(slots["hud-left"] || slots["hud-right"]));

const skeletonBlocks = computed(() => {
  if (!props.skeleton) return [];
  const cols = props.width / T;
  const rows = props.height / T;
  const pct = (r: TileRect) => ({
    left: `${(r.x / cols) * 100}%`,
    top: `${(r.y / rows) * 100}%`,
    width: `${(r.w / cols) * 100}%`,
    height: `${(r.h / rows) * 100}%`,
  });
  return [
    ...props.skeleton.floors.map((r) => ({ kind: "floor", style: pct(r) })),
    ...props.skeleton.machines.map((r) => ({ kind: "machine", style: pct(r) })),
  ];
});
</script>

<template>
  <figure
    ref="root"
    class="factory not-prose no-math"
    :class="{ 'has-hud': hud }"
  >
    <header class="bar">
      <div class="title">
        <span class="dot" aria-hidden="true" />
        <span>{{ title }}</span>
        <slot name="meta" />
      </div>
      <div class="controls">
        <slot name="controls" />
      </div>
    </header>

    <div class="body">
      <aside v-if="$slots['hud-left']" class="hud hud-left">
        <div class="hud-scroll"><slot name="hud-left" /></div>
      </aside>

      <div ref="stage" class="stage">
        <div
          class="stage-inner"
          :style="{
            minWidth: `${minWidth}px`,
            aspectRatio: `${width} / ${height}`,
          }"
        >
          <div v-if="!ready" class="skeleton" aria-hidden="true">
            <span
              v-for="(r, i) in skeletonBlocks"
              :key="i"
              class="skeleton-block"
              :class="r.kind"
              :style="r.style"
            />
            <span class="skeleton-label">
              <svg viewBox="0 0 24 24" class="skeleton-gear">
                <path
                  d="M19.4 13a7.5 7.5 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3h-4l-.4 2.9a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.5 7.5 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.4 7.4 0 0 0 1.7 1L11 21h4l.4-2.9a7.4 7.4 0 0 0 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
                />
              </svg>
              Building the factory…
            </span>
          </div>
          <canvas
            ref="canvas"
            role="img"
            :aria-label="label"
            @pointermove="emit('pointermove', $event)"
            @pointerleave="emit('pointerleave')"
            @click="emit('click', $event as PointerEvent)"
          />
        </div>
      </div>

      <aside v-if="$slots['hud-right']" class="hud hud-right">
        <div class="hud-scroll"><slot name="hud-right" /></div>
      </aside>
    </div>

    <slot />
  </figure>
</template>

<style>
.factory {
  --f-panel: #2b2a2b;
  --f-panel-hi: #3d3c3d;
  --f-edge: #141414;
  --f-text: #f1ece4;
  --f-dim: #b9b2a6;
  --f-orange: #ffa21c;
  margin: 2rem 0;
  border: 1px solid var(--site-color-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--f-panel);
  color: var(--f-text);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.06),
    0 18px 40px -20px rgb(0 0 0 / 0.7);
}

.factory .bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.75rem;
  background: linear-gradient(#363536, #2b2a2b);
  border-bottom: 2px solid var(--f-edge);
}

.factory .title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.factory .dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--site-color-primary);
  box-shadow: 0 0 10px var(--site-color-primary);
}

.factory .day {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--f-dim);
  font-variant-numeric: tabular-nums;
}

.factory .controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.factory .segmented {
  display: flex;
  gap: 2px;
}

.factory .btn {
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  border: 1px solid var(--f-edge);
  color: var(--f-text);
  background: linear-gradient(#5a595a, #454445);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.18),
    0 2px 0 rgb(0 0 0 / 0.45);
  cursor: pointer;
}

.factory .btn:hover:not(:disabled) {
  background: linear-gradient(#ffb547, var(--f-orange));
  color: #1a1206;
}

.factory .btn[aria-pressed="true"] {
  background: var(--site-color-primary);
  color: var(--site-color-primary-foreground);
  box-shadow: inset 0 2px 3px rgb(0 0 0 / 0.35);
}

.factory .btn:focus-visible,
.factory .chip:focus-visible {
  outline: 2px solid var(--site-color-focus-ring);
  outline-offset: 2px;
}

.factory .btn.primary {
  margin-top: 0.25rem;
  background: linear-gradient(#5fd068, #3d9f45);
  color: #0b1a0c;
}

.factory .btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.factory .stage {
  /* The map's min width scrolls inside the stage instead of widening the page. */
  contain: inline-size;
  line-height: 0;
  overflow-x: auto;
  border-bottom: 2px solid var(--f-edge);
  background: #8f5d2d;
}

/* Reserves the map's exact box before JS runs, so nothing jumps on hydration. */
.factory .stage-inner {
  position: relative;
}

.factory .stage canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  touch-action: pan-x pan-y;
}

.factory .skeleton {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  background: #8f5d2d;
}

.factory .skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    transparent 30%,
    rgb(255 255 255 / 0.14) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  animation: factory-skeleton-sweep 1.6s ease-in-out infinite;
}

.factory .skeleton-block {
  position: absolute;
  border-radius: 4px;
}

.factory .skeleton-block.floor {
  background-color: #45433f;
  background-image:
    linear-gradient(rgb(0 0 0 / 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgb(0 0 0 / 0.18) 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: 0;
}

.factory .skeleton-block.machine {
  background: #5d5f62;
  box-shadow:
    inset 0 0 0 2px #2a2c2e,
    6px 6px 0 rgb(0 0 0 / 0.25);
}

.factory .skeleton-label {
  position: absolute;
  left: 50%;
  top: 50%;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  color: var(--f-text);
  background: rgb(14 14 16 / 0.85);
  transform: translate(-50%, -50%);
}

.factory .skeleton-gear {
  width: 18px;
  height: 18px;
  fill: var(--f-orange);
  animation: factory-skeleton-spin 2s linear infinite;
}

@keyframes factory-skeleton-sweep {
  to {
    transform: translateX(100%);
  }
}

@keyframes factory-skeleton-spin {
  to {
    transform: rotate(1turn);
  }
}

@media (prefers-reduced-motion: reduce) {
  .factory .skeleton::after,
  .factory .skeleton-gear {
    animation: none;
  }
}

.factory .stats {
  display: grid;
  grid-template-columns: repeat(var(--f-stat-cols, 5), minmax(0, 1fr));
  gap: 2px;
  background: var(--f-edge);
}

.factory .stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.55rem 0.7rem;
  background: var(--f-panel-hi);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
}

.factory .stat .label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--f-dim);
}

.factory .stat .value {
  font-size: 1.15rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.factory .stat.alarm .value {
  color: #ff6b5b;
}

.factory .chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / 0.12);
  background: rgb(0 0 0 / 0.25);
  color: var(--f-text);
  cursor: pointer;
}

.factory .chip[aria-pressed="true"] {
  border-color: var(--site-color-primary);
  box-shadow: 0 0 0 1px var(--site-color-primary);
}

.factory .swatch {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background: var(--chip);
}

.factory .hot {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.05rem 0.35rem;
  border-radius: 3px;
  background: #e0332a;
  color: #fff;
}

.factory .hint {
  margin: 0.7rem 0.75rem 0.85rem;
  font-size: 0.85rem;
  color: var(--f-dim);
}

/* ---------------------------------------------------------------- HUD layout */

.factory.has-hud {
  position: relative;
  left: 50%;
  width: min(1240px, calc(100vw - 2rem));
  translate: -50% 0;
}

.factory.has-hud .body {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr) 250px;
  border-bottom: 2px solid var(--f-edge);
}

.factory.has-hud .stage {
  border-bottom: 0;
}

/* The map sets the row height; panels scroll inside it instead of stretching it. */
.factory .hud {
  position: relative;
  background:
    linear-gradient(rgb(255 255 255 / 0.03), transparent 40%), var(--f-panel);
}

.factory .hud-left {
  border-right: 2px solid var(--f-edge);
}

.factory .hud-right {
  border-left: 2px solid var(--f-edge);
}

.factory .hud-scroll {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.6rem;
  overflow-y: auto;
  scrollbar-width: thin;
}

.factory .hud-panel {
  border: 1px solid var(--f-edge);
  border-radius: 4px;
  background: #1f1e1f;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.05),
    0 2px 0 rgb(0 0 0 / 0.35);
  overflow: hidden;
}

.factory .hud-title {
  margin: 0;
  padding: 0.35rem 0.55rem;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ffe6c0;
  background: linear-gradient(#403f40, #333233);
  border-bottom: 1px solid var(--f-edge);
}

.factory .hud-body {
  padding: 0.5rem 0.55rem;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--f-dim);
}

@media (max-width: 1100px) {
  .factory.has-hud {
    left: auto;
    width: auto;
    translate: none;
  }

  .factory.has-hud .body {
    display: flex;
    flex-direction: column;
  }

  /* Map first, then the panels under it. */
  .factory.has-hud .stage {
    order: -1;
    border-bottom: 2px solid var(--f-edge);
  }

  .factory .hud {
    border: 0;
  }

  .factory .hud-scroll {
    position: static;
  }
}

@media (max-width: 640px) {
  .factory .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .factory .stat:last-child:nth-child(odd) {
    grid-column: span 2;
  }
}
</style>
