import type { ClicksContext } from '@slidev/types'
import type { Ref } from 'vue'
import { createClicksContextBase } from '@slidev/client/composables/useClicks.ts'
import { injectionClicksContext } from '@slidev/client/constants.ts'
import mermaid from 'mermaid'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, h, nextTick, provide, ref } from 'vue'
import setupMermaid from '../../slidev-theme-brand/setup/mermaid'
import { collectStepElements } from '../composables/useMermaidSteps'
import Fixture from './MermaidSteps.fixture.vue'

const code = `flowchart LR
  client[Client] --> api[API]
  api --> db[(Postgres)]
  api e2@-.->|warm| cache[(Redis)]`

async function mount(props: Record<string, unknown>) {
  const current = ref(0)
  // Slidev's real clicks engine, not a fake
  const clicks = ref(createClicksContextBase(current)) as Ref<ClicksContext>
  // Does what Slidev's slide wrapper does: provide the context and call setup(),
  // so `total` is computed from registered elements once the slide mounts.
  const Slide = defineComponent({
    setup() {
      provide(injectionClicksContext, clicks)
      clicks.value.setup()
      return () => h(Fixture, { code, ...props })
    },
  })
  // vitest-browser-vue 3: render() is async
  const screen = await render(Slide)
  return { current, clicks, screen }
}

function svgOf(container: Element): SVGSVGElement | null {
  return container.querySelector('.mermaid')?.shadowRoot?.querySelector('svg') ?? null
}

/** opacity of every node and edge, keyed by id, once the component has applied it */
async function visibility(container: Element) {
  await expect.poll(() => {
    const svg = svgOf(container)
    return svg?.querySelector<SVGElement>('g[id*="-flowchart-"]')?.style.opacity
  }).toBeTruthy()
  const els = collectStepElements(svgOf(container)!)
  const read = (map: Map<string, Element[]>) =>
    Object.fromEntries([...map].map(([id, [el]]) => [id, (el as SVGElement).style.opacity]))
  return { nodes: read(els.nodes), edges: read(els.edges) }
}

async function settle() {
  await nextTick()
  await new Promise(r => requestAnimationFrame(r))
}

describe('given Mermaid 12 renders a flowchart with the theme config', () => {
  // Upgrade canary: MermaidSteps depends on these internal SVG ids. If Mermaid renames them, this fails first.
  for (const look of ['handDrawn', 'classic'] as const) {
    it(`should still emit the node and edge ids MermaidSteps reads (${look} look)`, async () => {
      mermaid.initialize({ startOnLoad: false, ...(setupMermaid() as object), look })
      const host = document.createElement('div')
      document.body.append(host)
      const { svg } = await mermaid.render(`canary-${look}`, code, host)
      host.innerHTML = svg
      const els = collectStepElements(host.querySelector('svg')!)
      expect([...els.nodes.keys()].sort()).toEqual(['api', 'cache', 'client', 'db'])
      expect([...els.edges.keys()].sort()).toEqual(['L_api_db_0', 'L_client_api_0', 'e2'])
      host.remove()
    })
  }

  it('should expose subgraph ids so a step can reveal a whole group', async () => {
    mermaid.initialize({ startOnLoad: false, ...(setupMermaid() as object) })
    const host = document.createElement('div')
    document.body.append(host)
    const { svg } = await mermaid.render('canary-sub', `flowchart LR
  a[A] --> job
  subgraph job["Job"]
    b[B] --> c[C]
  end`, host)
    host.innerHTML = svg
    const els = collectStepElements(host.querySelector('svg')!)
    expect([...els.nodes.keys()].sort()).toEqual(['a', 'b', 'c', 'job'])
    host.remove()
  })
})

describe('given a MermaidSteps diagram', () => {
  describe('when the slide is at click 0', () => {
    it('should show only the first step', async () => {
      const { screen } = await mount({ steps: ['client', 'api', 'db cache', 'e2'] })
      const v = await visibility(screen.container)
      expect(v.nodes).toEqual({ client: '1', api: '0', db: '0', cache: '0' })
      expect(Object.values(v.edges).every(o => o === '0')).toBe(true)
    })
  })

  describe('when clicking forward', () => {
    it('should reveal an unnamed edge together with its later endpoint', async () => {
      const { screen, current } = await mount({ steps: ['client', 'api', 'db cache', 'e2'] })
      await visibility(screen.container)
      current.value = 1
      await settle()
      const v = await visibility(screen.container)
      expect(v.nodes.api).toBe('1')
      expect(v.edges.L_client_api_0).toBe('1')
      expect(v.edges.L_api_db_0).toBe('0')
    })

    it('should keep a listed named edge hidden until its own step', async () => {
      const { screen, current } = await mount({ steps: ['client', 'api', 'db cache', 'e2'] })
      await visibility(screen.container)
      current.value = 2
      await settle()
      expect((await visibility(screen.container)).edges.e2).toBe('0')
      current.value = 3
      await settle()
      expect((await visibility(screen.container)).edges.e2).toBe('1')
    })
  })

  describe('when hidden is "dim"', () => {
    it('should show future steps at 0.15 instead of hiding them', async () => {
      const { screen } = await mount({ steps: ['client', 'api'], hidden: 'dim' })
      const v = await visibility(screen.container)
      expect(v.nodes.client).toBe('1')
      expect(v.nodes.api).toBe('0.15')
    })
  })

  describe('when mounted in a slide', () => {
    it('should register its own clicks so no `clicks:` frontmatter is needed', async () => {
      const { screen, clicks } = await mount({ steps: ['client', 'api', 'db cache', 'e2'] })
      await visibility(screen.container)
      expect(clicks.value.total).toBe(3)
    })

    it('should start after earlier clicks when given `at`', async () => {
      const { screen, current } = await mount({ steps: ['client', 'api'], at: 2 })
      await visibility(screen.container)
      current.value = 1
      await settle()
      expect((await visibility(screen.container)).nodes.api).toBe('0')
      current.value = 2
      await settle()
      expect((await visibility(screen.container)).nodes.api).toBe('1')
    })
  })

  describe('when a step names an id that does not exist', () => {
    it('should render an error that lists the real ids', async () => {
      const { screen } = await mount({ steps: ['clinet'] })
      await expect.element(screen.getByText(/unknown id "clinet"/)).toBeVisible()
      await expect.element(screen.getByText(/client, api/)).toBeVisible()
    })
  })
})
