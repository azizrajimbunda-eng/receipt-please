import { describe, expect, it } from 'vitest'
import type { CaseData } from '../src/engine/types'
import { initialState, step } from '../src/engine/reducer'
import type { GameState } from '../src/engine/state'
import type { GameEvent } from '../src/engine/events'
import { hintsFor } from '../src/engine/hints'
import { microCase } from '../src/cases/micro-meryenda/case'
import { cases } from '../src/cases'

function play(data: CaseData, events: GameEvent[]): GameState {
  let s = initialState(data)
  for (const e of events) {
    // auto-advance dialogue between decisions
    for (let i = 0; i < 100 && (s.mode === 'dialogue' || s.noteShowing); i++) {
      const n = step(data, s, { type: 'ADVANCE' }).state
      if (n === s) break
      s = n
    }
    s = step(data, s, e).state
  }
  for (let i = 0; i < 100 && (s.mode === 'dialogue' || s.noteShowing); i++) {
    const n = step(data, s, { type: 'ADVANCE' }).state
    if (n === s) break
    s = n
  }
  return s
}

const TO_TESTIMONY: GameEvent[] = [
  { type: 'CHOOSE', index: 0 },
  { type: 'DO_ACTION', actionId: 'examine-tally' },
  { type: 'DO_ACTION', actionId: 'examine-trash' },
  { type: 'DO_ACTION', actionId: 'testify' },
]

describe('hintsFor — testimony mode', () => {
  it('final tiers name the target statement, then the exact evidence', () => {
    const s = play(microCase, TO_TESTIMONY)
    const hints = hintsFor(microCase, s)
    expect(hints.length).toBeGreaterThanOrEqual(3)
    expect(hints[hints.length - 2]).toContain('Hindi ako bumibili ng milk tea')
    expect(hints[hints.length - 1]).toContain('Milk Tea Resibo')
  })

  it('authored hints (when present) come first', () => {
    const s = play(microCase, TO_TESTIMONY)
    const t = microCase.testimonies['t-jopay']!
    if (t.hints?.length) {
      expect(hintsFor(microCase, s)[0]).toBe(t.hints[0])
    }
  })

  it('guides toward pressing when the target statement is still hidden', () => {
    const c = structuredClone(microCase)
    const t = c.testimonies['t-jopay']!
    // move the contradiction onto the hidden statement, revealed by pressing s2
    const s2 = t.statements[1]!
    const s3 = t.statements[2]!
    s3.contradiction = s2.contradiction
    delete s2.contradiction
    const s = play(c, TO_TESTIMONY)
    const hints = hintsFor(c, s)
    expect(hints.some((h) => h.includes('Diinan mo ang statement na'))).toBe(true)
    expect(hints.some((h) => h.includes('Hindi ako bumibili'))).toBe(true) // the revealer
  })
})

describe('hintsFor — investigation mode', () => {
  it('points at the first undone action', () => {
    const s = play(microCase, [{ type: 'CHOOSE', index: 0 }])
    const hints = hintsFor(microCase, s)
    expect(hints[hints.length - 1]).toContain('Kausapin si Ate Cess')
  })

  it('points at the proceed action once everything else is done', () => {
    const s = play(microCase, [
      { type: 'CHOOSE', index: 0 },
      { type: 'DO_ACTION', actionId: 'talk-cess' },
      { type: 'DO_ACTION', actionId: 'examine-tally' },
      { type: 'DO_ACTION', actionId: 'examine-trash' },
      { type: 'DO_ACTION', actionId: 'talk-cess' }, // branch path (gives ev-cctv) recounted as done already
    ])
    const hints = hintsFor(microCase, s)
    expect(hints[hints.length - 1]).toContain('Harapin si Jopay')
  })
})

describe('every shipped testimony has authored hints', () => {
  for (const [caseId, data] of Object.entries(cases)) {
    it(caseId, () => {
      for (const [tid, t] of Object.entries(data.testimonies)) {
        expect(t.hints?.length ?? 0, `${tid} has no authored hints`).toBeGreaterThan(0)
      }
    })
  }
})
