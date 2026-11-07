<script setup lang="ts">
// Renders like Slidev's builtin Mermaid.vue: real mermaid + the theme's setup/mermaid.ts,
// SVG injected into a shadow root on a `div.mermaid`.
import mermaid from 'mermaid'
import { onMounted, ref } from 'vue'
import setupMermaid from '../../slidev-theme-brand/setup/mermaid'
import MermaidSteps from '../components/MermaidSteps.vue'

const props = defineProps<{
  code: string
  steps: string[]
  hidden?: 'hide' | 'dim'
  at?: string | number
  look?: 'handDrawn' | 'classic'
}>()

const host = ref<HTMLElement>()
let renderId = 0

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    ...(setupMermaid() as object),
    ...(props.look ? { look: props.look } : {}),
  })
  const { svg } = await mermaid.render(`fixture-${Date.now()}-${renderId++}`, props.code)
  host.value!.attachShadow({ mode: 'open' }).innerHTML = svg
})
</script>

<template>
  <MermaidSteps :steps="steps" :hidden="hidden" :at="at">
    <div ref="host" class="mermaid" />
  </MermaidSteps>
</template>
