// MAS cases live or die on their arithmetic, and the linter can't check prose.
// This suite pins the canonical relevant-costing identities AND asserts the
// result figures actually appear in the evidence a player reads — so editing a
// number in one place without the other fails loudly.

import { describe, expect, it } from 'vitest'
import { evidence } from '../src/cases/case04-mas/data'

describe('Case 04 relevant-costing arithmetic', () => {
  it('keep-or-drop: segment margin is +₱380k despite Marco’s ₱120k "loss"', () => {
    const sales = 2_100_000
    const variable = 1_220_000
    const directFixed = 500_000
    const allocated = 500_000
    const cm = sales - variable
    expect(cm).toBe(880_000)
    expect(cm - directFixed - allocated).toBe(-120_000) // Marco's framing
    expect(cm - directFixed).toBe(380_000) // the real, avoidable-only answer
  })

  it('special order: idle capacity turns a "₱4 loss" into a ₱5 gain', () => {
    const price = 18
    const unitVariable = 13
    const allocatedOH = 9
    expect(unitVariable + allocatedOH).toBe(22) // the misleading full unit cost
    expect(price - unitVariable).toBe(5) // incremental CM per unit
    expect((price - unitVariable) * 10_000).toBe(50_000) // per quarter
    expect((price - unitVariable) * 10_000 * 4).toBe(200_000) // per year
  })

  it('make-or-buy: outsourcing loses ₱1.70/kg against avoidable cost', () => {
    const buy = 15.5
    const avoidable = 13.8
    expect(Number((buy - avoidable).toFixed(2))).toBe(1.7)
  })

  it('sunk cost: the ₱2M is gone; the live swing is ₱1.9M toward abandoning', () => {
    const finishCost = 1_500_000
    const salvage = 400_000
    expect(salvage - -finishCost).toBe(1_900_000)
  })
})

describe('Case 04 result figures appear in the evidence a player reads', () => {
  const has = (id: string, needle: string) => expect(evidence[id]?.detail ?? '').toContain(needle)

  it('the recast shows the ₱380,000 segment margin', () => has('ev-recast', '380,000'))
  it('the relevant costing schedule shows the ₱50,000/quarter gain', () => has('ev-relevant', '50,000'))
  it('the MZR quote flags the 18% escalation', () => has('ev-quote', '18%'))
  it('the SEC doc names Marco Z. Reyes at 40%', () => {
    has('ev-sec', 'MARCO Z')
    has('ev-sec', '40%')
  })
  it('the Hurno memo marks the ₱2,000,000 as sunk', () => {
    has('ev-hurno', '2,000,000')
    has('ev-hurno', 'SUNK')
  })
})
