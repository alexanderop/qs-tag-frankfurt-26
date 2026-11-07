import type { Browser, Page } from 'playwright'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { afterAll, beforeAll, describe, expect, inject, it } from 'vitest'

// Smoke tests against the BUILT starter deck. They catch Slidev / Mermaid / plugin upgrades
// that unit and component tests can't see: real routing, click registration, shadow-root rendering, build output.

const deckUrl = inject('deckUrl')
const deckDir = inject('deckDir')

let browser: Browser
let page: Page

beforeAll(async () => {
  browser = await chromium.launch()
  // a fresh context per run: no service worker from an earlier build serves stale assets
  page = await browser.newPage({ viewport: { width: 1280, height: 720 }, serviceWorkers: 'block' })
})

afterAll(async () => {
  await browser?.close()
})

/** Visible node and edge ids of the MermaidSteps diagram on the current slide. */
function visibleSteps() {
  return page.evaluate(() => {
    const svg = document.querySelector('.slidev-page:not([style*="display: none"]) .mermaid-steps .mermaid')
      ?.shadowRoot
      ?.querySelector('svg')
    if (!svg)
      return null
    const shown = (el: Element) => (el as SVGElement).style.opacity !== '0'
    return {
      nodes: [...svg.querySelectorAll('g[id*="-flowchart-"]')].filter(shown).length,
      edges: [...svg.querySelectorAll('path[data-id]')].filter(shown).length,
    }
  })
}

async function goto(path: string) {
  await page.goto(`${deckUrl}${path}`)
  await page.waitForLoadState('networkidle')
}

describe('given the built starter deck', () => {
  describe('when stepping through the MermaidSteps demo slide', () => {
    it('should reveal the diagram one step per click', async () => {
      await goto('/mermaid-steps?clicks=0')
      await expect.poll(visibleSteps).toEqual({ nodes: 1, edges: 0 })

      await goto('/mermaid-steps?clicks=3')
      await expect.poll(visibleSteps).toEqual({ nodes: 5, edges: 4 })

      await goto('/mermaid-steps?clicks=4')
      await expect.poll(visibleSteps).toEqual({ nodes: 5, edges: 5 })
    })

    it('should own exactly 4 clicks, then move to the next slide', async () => {
      await goto('/mermaid-steps')
      await expect.poll(visibleSteps).toEqual({ nodes: 1, edges: 0 })
      for (let i = 1; i <= 4; i++) {
        await page.keyboard.press('ArrowRight')
        await expect.poll(() => new URL(page.url()).searchParams.get('clicks')).toBe(String(i))
      }
      await page.keyboard.press('ArrowRight')
      await expect.poll(() => new URL(page.url()).pathname).not.toBe('/mermaid-steps')
    })

    it('should show the full diagram in export mode', async () => {
      // `slidev export --with-clicks false` renders each slide with ?print at its last click
      await goto('/mermaid-steps?print=true&clicks=99')
      await expect.poll(visibleSteps).toEqual({ nodes: 5, edges: 5 })
    })
  })

  describe('when rendering every slide', () => {
    it('should render every Mermaid diagram without a syntax or load error', async () => {
      // the overview page renders one container per slide (window.__slidev__ only exists in dev)
      await goto('/overview')
      const total = await page.locator('.slidev-slide-container').count()
      expect(total).toBeGreaterThan(20)
      const broken: string[] = []
      for (let no = 1; no <= total; no++) {
        await goto(`/${no}`)
        const problem = await page.evaluate(() => {
          const slide = document.querySelector('.slidev-page:not([style*="display: none"])')
          if (slide?.textContent?.includes('An error occurred on this slide'))
            return 'slide failed to load'
          if (slide?.querySelector('pre[border]'))
            return slide.querySelector('pre[border]')!.textContent!.slice(0, 120)
          for (const host of slide?.querySelectorAll('.mermaid') ?? []) {
            const svg = host.shadowRoot?.querySelector('svg')
            if (svg?.getAttribute('aria-roledescription') === 'error')
              return `mermaid syntax error: ${svg.textContent?.slice(0, 120)}`
          }
          return null
        })
        if (problem)
          broken.push(`slide ${no}: ${problem}`)
      }
      expect(broken).toEqual([])
    })
  })

  describe('when checking the build output', () => {
    it('should bundle Geist instead of requesting Google Fonts', async () => {
      const html = readFileSync(join(deckDir, 'index.html'), 'utf8')
      expect(html).not.toContain('fonts.googleapis.com')
      await goto('/1')
      await expect.poll(() => page.evaluate(() =>
        [...document.fonts].some(f => f.family.replace(/"/g, '') === 'Geist Variable' && f.status === 'loaded'),
      )).toBe(true)
    })

    it('should precache fonts for offline use (pwa: build)', () => {
      const sw = readFileSync(join(deckDir, 'sw.js'), 'utf8')
      expect(sw).toMatch(/\.woff2/)
    })

    it('should generate the og-image (seoMeta.ogImage: auto)', () => {
      expect(existsSync(join(deckDir, 'og-image.png'))).toBe(true)
    })
  })
})
