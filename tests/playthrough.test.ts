// Full headless playthroughs: fold each case's answer key through the real
// reducer and assert the case completes with the educational payoff intact.
//
// The driver auto-advances dialogue between decisions, so the answer keys
// encode puzzle structure, not tap counts — rewriting a line can't break them.

import { describe, expect, it } from 'vitest'
import type { CaseData } from '../src/engine/types'
import { initialState, step } from '../src/engine/reducer'
import type { GameState } from '../src/engine/state'
import type { GameEvent } from '../src/engine/events'
import { parse, serialize } from '../src/engine/save'
import { cases } from '../src/cases'
import { case01Walkthrough } from '../src/cases/case01-petty-cash/walkthrough'
import { case02Walkthrough } from '../src/cases/case02-lapping/walkthrough'
import { microWalkthrough } from '../src/cases/micro-meryenda/walkthrough'

const MAX_TAPS = 200

/** Tap through dialogue/note cards until the game wants a real decision. */
function autoAdvance(data: CaseData, s: GameState): GameState {
  let cur = s
  for (let i = 0; i < MAX_TAPS; i++) {
    if (cur.mode !== 'dialogue' && !cur.noteShowing) return cur
    const next = step(data, cur, { type: 'ADVANCE' }).state
    if (next === cur) return cur
    cur = next
  }
  throw new Error(`autoAdvance exceeded ${MAX_TAPS} taps — likely a dialogue loop`)
}

function play(data: CaseData, events: GameEvent[], from?: GameState): GameState {
  let s = from ?? initialState(data)
  events.forEach((e, i) => {
    s = autoAdvance(data, s)
    const next = step(data, s, e).state
    if (next === s) {
      throw new Error(`walkthrough step ${i} (${e.type}) did nothing in mode "${s.mode}"`)
    }
    s = next
  })
  return autoAdvance(data, s)
}

describe('case01-petty-cash playthrough', () => {
  const data = cases['case01-petty-cash']!

  it('completes start-to-finish with the penalty path exercised', () => {
    const end = play(data, case01Walkthrough)
    expect(end.mode).toBe('caseComplete')
    expect(end.credibility).toBe(4) // exactly one deliberate wrong present
  })

  it('surfaces every reviewer note in the case', () => {
    const end = play(data, case01Walkthrough)
    expect([...end.seenNotes].sort()).toEqual(Object.keys(data.notes).sort())
  })

  it('collects every evidence item', () => {
    const end = play(data, case01Walkthrough)
    expect([...end.evidence].sort()).toEqual(Object.keys(data.evidence).sort())
  })

  it('reaches the same ending after a mid-case save/load round-trip', () => {
    // Split at the first testimony entry — the auto-checkpoint fires there.
    const split = case01Walkthrough.findIndex((e) => e.type === 'DO_ACTION' && e.actionId === 'testify') + 1
    const mid = play(data, case01Walkthrough.slice(0, split))
    const snap = parse(serialize(mid, 777), data)
    expect(snap).not.toBeNull()

    const resumed = step(data, initialState(data), { type: 'LOAD', snapshot: snap! }).state
    const end = play(data, case01Walkthrough.slice(split), resumed)
    expect(end.mode).toBe('caseComplete')
  })
})

describe('case02-lapping playthrough', () => {
  const data = cases['case02-lapping']!

  it('completes start-to-finish with the penalty path exercised', () => {
    const end = play(data, case02Walkthrough)
    expect(end.mode).toBe('caseComplete')
    expect(end.credibility).toBe(4) // exactly one deliberate wrong present
  })

  it('surfaces every reviewer note in the case', () => {
    const end = play(data, case02Walkthrough)
    expect([...end.seenNotes].sort()).toEqual(Object.keys(data.notes).sort())
  })

  it('collects every evidence item', () => {
    const end = play(data, case02Walkthrough)
    expect([...end.evidence].sort()).toEqual(Object.keys(data.evidence).sort())
  })

  it('reaches the same ending after a mid-case save/load round-trip', () => {
    const split = case02Walkthrough.findIndex((e) => e.type === 'DO_ACTION' && e.actionId === 'testify1') + 1
    const mid = play(data, case02Walkthrough.slice(0, split))
    const snap = parse(serialize(mid, 777), data)
    expect(snap).not.toBeNull()

    const resumed = step(data, initialState(data), { type: 'LOAD', snapshot: snap! }).state
    const end = play(data, case02Walkthrough.slice(split), resumed)
    expect(end.mode).toBe('caseComplete')
  })
})

describe('micro-meryenda playthrough', () => {
  const data = cases['micro-meryenda']!

  it('completes start-to-finish with the penalty path exercised', () => {
    const end = play(data, microWalkthrough)
    expect(end.mode).toBe('caseComplete')
    expect(end.credibility).toBe(2)
    expect(end.seenNotes).toEqual(['note-count', 'note-vouch'])
  })
})
