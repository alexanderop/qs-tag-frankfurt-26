import { describe, expect, it } from 'vitest'
import { edgeEnds, planSteps, stepOpacity, UnknownStepIdError } from '../utils/mermaidSteps'

const nodes = ['client', 'api', 'db', 'user_db']
const edges = ['L_client_api_0', 'L_api_db_0', 'L_api_user_db_0', 'e2']

describe('edgeEnds', () => {
  it('should split a Mermaid edge id into its endpoints', () => {
    expect(edgeEnds('L_client_api_0', nodes)).toEqual({ from: 'client', to: 'api' })
  })

  it('should handle node ids that contain underscores', () => {
    expect(edgeEnds('L_api_user_db_0', nodes)).toEqual({ from: 'api', to: 'user_db' })
  })

  it('should return null for a named edge', () => {
    expect(edgeEnds('e2', nodes)).toBeNull()
  })
})

describe('planSteps', () => {
  it('should place listed ids at their step and unnamed edges at their later endpoint', () => {
    const plan = planSteps(['client', 'api', 'db user_db', 'e2'], nodes, edges)
    expect(Object.fromEntries(plan.nodes)).toEqual({ client: 0, api: 1, db: 2, user_db: 2 })
    expect(Object.fromEntries(plan.edges)).toEqual({ L_client_api_0: 1, L_api_db_0: 2, L_api_user_db_0: 2, e2: 3 })
  })

  it('should show unlisted nodes and named edges at the last step', () => {
    const plan = planSteps(['client', 'api'], nodes, edges)
    expect(plan.nodes.get('db')).toBe(1)
    expect(plan.edges.get('e2')).toBe(1)
  })

  it('should throw on an unknown id and list the ids a slide author can use', () => {
    expect(() => planSteps(['clinet'], nodes, edges)).toThrowError(UnknownStepIdError)
    expect(() => planSteps(['clinet'], nodes, edges)).toThrowError('Known ids: client, api, db, user_db, e2')
  })
})

describe('stepOpacity', () => {
  it('should be 1 once the step is reached, 0 or 0.15 before', () => {
    expect(stepOpacity(2, 2, 'hide')).toBe(1)
    expect(stepOpacity(2, 1, 'hide')).toBe(0)
    expect(stepOpacity(2, 1, 'dim')).toBe(0.15)
  })
})
