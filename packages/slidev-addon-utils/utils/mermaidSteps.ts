/**
 * Pure planning logic for <MermaidSteps>: decides at which step each node and
 * edge of a rendered Mermaid flowchart becomes visible. No DOM, no Slidev.
 */

export interface StepPlan {
  /** node id → step index at which it appears */
  nodes: Map<string, number>
  /** edge id (Mermaid `data-id`) → step index at which it appears */
  edges: Map<string, number>
}

/** Split one step entry ("db cache") into ids. */
export function stepIds(step: string): string[] {
  return step.split(/\s+/).filter(Boolean)
}

/**
 * Mermaid names unnamed edges `L_<from>_<to>_<n>`. Node ids may contain `_`,
 * so match against the known ids instead of splitting on `_`.
 */
export function edgeEnds(edgeId: string, nodeIds: readonly string[]): { from: string, to: string } | null {
  const body = /^L_(.+)_\d+$/.exec(edgeId)?.[1]
  if (!body)
    return null
  for (const from of nodeIds) {
    if (!body.startsWith(`${from}_`))
      continue
    const to = body.slice(from.length + 1)
    if (nodeIds.includes(to))
      return { from, to }
  }
  return null
}

export class UnknownStepIdError extends Error {
  constructor(readonly id: string, readonly known: readonly string[]) {
    super(`MermaidSteps: unknown id "${id}". Known ids: ${known.join(', ')}`)
    this.name = 'UnknownStepIdError'
  }
}

/**
 * Build the plan. Listed ids appear at their step. An unlisted unnamed edge
 * appears once both its ends are visible. Anything else unlisted (a node, or a
 * named edge whose ends the SVG doesn't record) appears after the last step.
 */
export function planSteps(steps: readonly string[], nodeIds: readonly string[], edgeIds: readonly string[]): StepPlan {
  const nodes = new Map<string, number>()
  const edges = new Map<string, number>()
  const last = Math.max(steps.length - 1, 0)

  steps.forEach((step, index) => {
    for (const id of stepIds(step)) {
      if (nodeIds.includes(id))
        nodes.set(id, index)
      else if (edgeIds.includes(id))
        edges.set(id, index)
      else
        throw new UnknownStepIdError(id, [...nodeIds, ...edgeIds.filter(e => !e.startsWith('L_'))])
    }
  })

  for (const id of nodeIds) {
    if (!nodes.has(id))
      nodes.set(id, last)
  }

  for (const id of edgeIds) {
    if (edges.has(id))
      continue
    const ends = edgeEnds(id, nodeIds)
    edges.set(id, ends ? Math.max(nodes.get(ends.from)!, nodes.get(ends.to)!) : last)
  }

  return { nodes, edges }
}

/** Opacity for an element that appears at `appearsAt`, when the deck is at `step`. */
export function stepOpacity(appearsAt: number, step: number, mode: 'hide' | 'dim'): number {
  if (step >= appearsAt)
    return 1
  return mode === 'dim' ? 0.15 : 0
}
