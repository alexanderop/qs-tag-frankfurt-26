<script setup lang="ts">
import { ref } from 'vue'
import { useMermaidSteps } from '../composables/useMermaidSteps'

const props = withDefaults(defineProps<{
  /** One entry per click; an entry lists node ids or named edge ids separated by spaces. */
  steps: string[]
  /** Same as v-click's `at`. */
  at?: string | number
  /** 'hide' = invisible until revealed, 'dim' = faint preview of what comes next. */
  hidden?: 'hide' | 'dim'
}>(), {
  at: undefined,
  hidden: 'hide',
})

const root = ref<HTMLElement>()
const { error } = useMermaidSteps(root, {
  steps: () => props.steps,
  at: () => props.at,
  mode: () => props.hidden,
})
</script>

<template>
  <div ref="root" class="mermaid-steps">
    <slot />
    <pre v-if="error" class="mermaid-steps__error">{{ error }}</pre>
  </div>
</template>

<style scoped>
.mermaid-steps__error {
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ef4444;
  border-radius: 0.375rem;
  color: #fca5a5;
  font-size: 0.75rem;
  white-space: pre-wrap;
}
</style>
