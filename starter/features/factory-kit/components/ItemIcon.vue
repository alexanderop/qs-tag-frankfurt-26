<script setup lang="ts">
/**
 * One item sprite drawn into a tiny canvas, so HTML legends match the belts.
 */
import { onMounted, ref } from "vue";
import { type ItemSprite, drawItem } from "../draw/items";

const props = withDefaults(defineProps<{ sprite: ItemSprite; size?: number }>(), { size: 20 });

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  const c = canvas.value!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.width = c.height = Math.round(props.size * dpr);
  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);
  drawItem(g, props.sprite, props.size / 2, props.size / 2 - 1, props.size * 0.6);
});
</script>

<template>
  <canvas
    ref="canvas"
    class="item-icon"
    aria-hidden="true"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style scoped>
.item-icon {
  display: inline-block;
  flex: none;
  vertical-align: middle;
}
</style>
