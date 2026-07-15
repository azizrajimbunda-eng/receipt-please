// Full headless playthroughs: fold each case's walkthrough (answer key) through
// the real reducer and assert the case completes with the educational payoff seen.

import { describe, expect, it } from 'vitest'
import { initialState, step } from '../src/engine/reducer'
import type { GameState } from '../src/engine/state'
import type { GameEvent } from '../src/engine/events'
import { parse, serialize } from '../src/engine/save'
import { microCase } from '../src/cases/micro-meryenda/case'
import { microWalkthrough } from '../src/cases/micro-meryenda/walkthrough'

function play(events: GameEvent[], from: GameState): GameState {
  let s = from
  for (const e of events) s = step(microCase, s, e).state
  return s
}

describe('micro-meryenda playthrough', () => {
  it('completes start-to-finish with the penalty path exercised', () => {
    const end = play(microWalkthrough, initialState(microCase))
    expect(end.mode).toBe('caseComplete')
    expect(end.credibility).toBe(2) // exactly one deliberate wrong present
    expect(end.seenNotes).toEqual(['note-count', 'note-vouch'])
    expect(end.evidence).toEqual(['ev-tally', 'ev-mt-resibo'])
  })

  it('reaches the same ending after a mid-case save/load round-trip', () => {
    const SPLIT = 9 // right after entering the testimony (auto-checkpoint fired)
    const mid = play(microWalkthrough.slice(0, SPLIT), initialState(microCase))
    const snap = parse(serialize(mid, 777), microCase)
    expect(snap).not.toBeNull()

    const resumed = step(microCase, initialState(microCase), { type: 'LOAD', snapshot: snap! }).state
    const end = play(microWalkthrough.slice(SPLIT), resumed)
    expect(end.mode).toBe('caseComplete')
    expect(end.seenNotes).toContain('note-vouch')
  })
})
