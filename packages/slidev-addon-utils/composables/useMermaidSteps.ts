import type { ClicksContext } from '@slidev/types'
import type { Ref } from 'vue'
import type { StepPlan } from '../utils/mermaidSteps'
import { injectionClicksContext } from '@slidev/client/constants.ts'
import { computed, inject, onMounted, onUnmounted, ref, shallowRef, watchEffect } from 'vue'
import { planSteps, stepOpacity } from '../utils/mermaidSteps'

export interface MermaidStepsOptions {
  steps: () => readonly string[]
  /** Same meaning as v-click's `at`. Default '+1': the first reveal is the next click. */
  at?: () => string | number | undefined
  mode: () => 'hide' | 'dim'
}

interface StepElements {
  nodes: Map<string, Element[]>
  edges: Map<string, Element[]>
}

const NODE_ID = /-flowchart-(.+)-\d+$/

/** Collect node groups and edge paths/labels of a rendered Mermaid flowchart SVG. */
export function collectStepElements(svg: SVGSVGElement): StepElements {
  const nodes = new Map<string, Element[]>()
  const edges = new Map<string, Element[]>()
  const add = (map: Map<string, Element[]>, id: string, el: Element) => {
    map.set(id, [...(map.get(id) ?? []), el])
  }
  // classic look renders `g.node`, handDrawn renders `g.rough-node`: select by the id pattern instead of the class
  for (const node of svg.querySelectorAll('g[id*="-flowchart-"]')) {
    const id = NODE_ID.exec(node.id)?.[1]
    if (id)
      add(nodes, id, node)
  }
  for (const el of svg.querySelectorAll('[data-id]')) {
    const id = (el as HTMLElement).dataset.id!
    if (nodes.has(id))
      continue
    // edge labels carry the edge's data-id on an inner element; fade the whole label group
    add(edges, id, el.closest('g.edgeLabel') ?? el)
  }
  return { nodes, edges }
}

/** Find the Mermaid SVG Slidev renders inside a shadow root below `root`. */
function findMermaidSvg(root: HTMLElement): SVGSVGElement | null {
  for (const el of root.querySelectorAll('*')) {
    const svg = el.shadowRoot?.querySelector('svg')
    if (svg)
      return svg as SVGSVGElement
  }
  return null
}

let uid = 0

export function useMermaidSteps(root: Ref<HTMLElement | undefined>, options: MermaidStepsOptions) {
  // Read clicks straight from the injection key: unlike useSlideContext(), this works outside a Slidev app (tests).
  const clicks = inject(injectionClicksContext, undefined) as Ref<ClicksContext> | undefined
  const id = `mermaid-steps-${uid++}`
  const svg = shallowRef<SVGSVGElement | null>(null)
  const error = ref<string | null>(null)

  let observer: MutationObserver | undefined
  let frame = 0

  const info = shallowRef<ReturnType<ClicksContext['calculateSince']>>(null)

  // Step index: 0 before the first reveal click, steps.length - 1 at the last.
  const step = computed(() => {
    const ctx = clicks?.value
    if (!ctx || !info.value)
      return Number.POSITIVE_INFINITY
    return Math.max(0, ctx.current - info.value.start + 1)
  })

  const plan = computed<{ els: StepElements, plan: StepPlan } | null>(() => {
    if (!svg.value)
      return null
    const els = collectStepElements(svg.value)
    try {
      error.value = null
      return { els, plan: planSteps(options.steps(), [...els.nodes.keys()], [...els.edges.keys()]) }
    }
    catch (e) {
      error.value = (e as Error).message
      return null
    }
  })

  function locate() {
    const found = root.value ? findMermaidSvg(root.value) : null
    if (found) {
      svg.value = found
      // Slidev replaces the SVG on re-render (HMR, theme): watch the shadow root and re-collect
      observer?.disconnect()
      observer = new MutationObserver(() => {
        const next = found.getRootNode() instanceof ShadowRoot
          ? (found.getRootNode() as ShadowRoot).querySelector('svg')
          : null
        if (next && next !== svg.value)
          svg.value = next as SVGSVGElement
      })
      observer.observe(found.getRootNode() as ShadowRoot, { childList: true })
      return
    }
    frame = requestAnimationFrame(locate)
  }

  onMounted(() => {
    const ctx = clicks?.value
    if (ctx) {
      info.value = ctx.calculateSince(options.at?.() ?? '+1', Math.max(options.steps().length - 1, 0))
      ctx.register(id, info.value)
    }
    locate()
  })

  onUnmounted(() => {
    clicks?.value.unregister(id)
    observer?.disconnect()
    cancelAnimationFrame(frame)
  })

  watchEffect(() => {
    const current = plan.value
    if (!current)
      return
    const mode = options.mode()
    const apply = (map: Map<string, Element[]>, appearsAt: Map<string, number>) => {
      for (const [key, elements] of map) {
        const opacity = String(stepOpacity(appearsAt.get(key) ?? 0, step.value, mode))
        for (const el of elements) {
          const style = (el as SVGElement).style
          style.transition = 'opacity 0.3s ease'
          style.opacity = opacity
        }
      }
    }
    apply(current.els.nodes, current.plan.nodes)
    apply(current.els.edges, current.plan.edges)
  })

  return { svg, step, error }
}
