<script setup lang="ts">
// Ported from alexop.dev/lab/delivery-factory (blog-astro src/features/delivery-factory).
import Factory from '../features/delivery-factory/components/DeliveryFactory.vue'

withDefaults(defineProps<{ era?: '2022' | '2026', showEraToggle?: boolean }>(), {
  era: '2022',
  showEraToggle: false,
})
</script>

<template>
  <div class="delivery-factory-slide">
    <Factory :era="era" :show-era-toggle="showEraToggle" />
  </div>
</template>

<style scoped>
.delivery-factory-slide {
  --site-color-primary: #ff6bed;
  --site-color-primary-foreground: #111;
  --site-color-border: rgba(255, 255, 255, 0.2);
  --site-color-focus-ring: #ff6bed;
  zoom: 0.62;
  max-width: 868px;
  margin: 0 auto;
}

/* The slide shows the belt and the stats; the blog's upgrade panel and hints don't fit. */
.delivery-factory-slide :deep(.upgrades),
.delivery-factory-slide :deep(.machines),
.delivery-factory-slide :deep(.hint) {
  display: none;
}
</style>
