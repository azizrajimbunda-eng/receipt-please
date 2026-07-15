import { describe, expect, it } from 'vitest'
import { initialState, step } from '../src/engine/reducer'
import type { GameState } from '../src/engine/state'
import type { Effect, GameEvent } from '../src/engine/events'
import { parse, serialize } from '../src/engine/save'
import { currentLine, visibleActions, visibleStatements, workingPapers } from '../src/engine/selectors'
import { microCase as data } from '../src/cases/micro-meryenda/case'

function run(events: GameEvent[], from?: GameState): { state: GameState; effects: Effect[] } {
  let state = from ?? initialState(data)
  let effects: Effect[] = []
  for (const e of events) {
    const r = step(data, state, e)
    state = r.state
    effects = r.effects
  }
  return { state, effects }
}

const toPantry: GameEvent[] = [{ type: 'ADVANCE' }, { type: 'ADVANCE' }, { type: 'CHOOSE', index: 0 }]
const toTestimony: GameEvent[] = [
  ...toPantry,
  { type: 'DO_ACTION', actionId: 'examine-tally' },
  { type: 'ADVANCE' },
  { type: 'ADVANCE' },
  { type: 'DO_ACTION', actionId: 'examine-trash' },
  { type: 'ADVANCE' },
  { type: 'DO_ACTION', actionId: 'testify' },
]

describe('dialogue flow', () => {
  it('settles the initial state at the first displayable line', () => {
    const s = initialState(data)
    expect(s.mode).toBe('dialogue')
    expect(currentLine(data, s)?.kind).toBe('narrate')
    expect(s.credibility).toBe(3)
  })

  it('ADVANCE walks say lines and stops at a choice', () => {
    const { state } = run([{ type: 'ADVANCE' }, { type: 'ADVANCE' }])
    expect(state.mode).toBe('choice')
    expect(currentLine(data, state)?.kind).toBe('choice')
  })

  it('ADVANCE on a choice is a no-op; CHOOSE jumps to the label and runs directives', () => {
    const before = run([{ type: 'ADVANCE' }, { type: 'ADVANCE' }]).state
    expect(step(data, before, { type: 'ADVANCE' }).state.mode).toBe('choice')

    const { state, effects } = run(toPantry)
    expect(state.mode).toBe('investigation')
    expect(state.sceneId).toBe('pantry')
    // checkpoint line fired a save, moveTo fired the scene music
    expect(state.checkpoint).not.toBeNull()
    expect(effects).toContainEqual({ type: 'save' })
    expect(effects).toContainEqual({ type: 'music', id: 'investigation' })
  })

  it('branch respects flags (talk to Cess before and after the tally)', () => {
    // Before counting: scolding path, no evidence given.
    const before = run([...toPantry, { type: 'DO_ACTION', actionId: 'talk-cess' }, { type: 'ADVANCE' }])
    const line1 = currentLine(data, before.state)
    expect(line1?.kind === 'say' && line1.text.includes('Bilangin')).toBe(true)

    // After counting: branch taken, CCTV note handed over.
    const after = run([
      ...toPantry,
      { type: 'DO_ACTION', actionId: 'examine-tally' },
      { type: 'ADVANCE' },
      { type: 'ADVANCE' },
      { type: 'DO_ACTION', actionId: 'talk-cess' },
      { type: 'ADVANCE' }, // "Kulang ng singkwenta?..." line
      { type: 'ADVANCE' }, // give ev-cctv executes → "Balik ka lang..."
    ])
    expect(after.state.evidence).toContain('ev-cctv')
  })
})

describe('investigation', () => {
  it('gates actions on when-conditions and marks doneFlags', () => {
    const { state } = run(toPantry)
    const ids = visibleActions(data, state).map((a) => a.id)
    expect(ids).not.toContain('testify')

    const ready = run([
      ...toPantry,
      { type: 'DO_ACTION', actionId: 'examine-tally' },
      { type: 'ADVANCE' },
      { type: 'ADVANCE' },
      { type: 'DO_ACTION', actionId: 'examine-trash' },
      { type: 'ADVANCE' },
    ]).state
    const actions = visibleActions(data, ready)
    expect(actions.map((a) => a.id)).toContain('testify')
    expect(actions.find((a) => a.id === 'examine-tally')?.done).toBe(true)
  })

  it('give is idempotent — re-running an examine adds no duplicate evidence', () => {
    const once = run([
      ...toPantry,
      { type: 'DO_ACTION', actionId: 'examine-tally' },
      { type: 'ADVANCE' },
      { type: 'ADVANCE' },
    ]).state
    expect(workingPapers(data, once).map((p) => p.id)).toEqual(['ev-tally'])

    const twice = run(
      [{ type: 'DO_ACTION', actionId: 'examine-tally' }, { type: 'ADVANCE' }, { type: 'ADVANCE' }],
      once,
    )
    expect(twice.state.evidence).toEqual(['ev-tally'])
    expect(twice.effects.filter((e) => e.type === 'evidenceAdded')).toHaveLength(0)
  })

  it('a standalone note line shows the card, appends seenNotes once, and resumes', () => {
    const mid = run([...toPantry, { type: 'DO_ACTION', actionId: 'examine-tally' }, { type: 'ADVANCE' }]).state
    expect(mid.noteShowing).toBe('note-count')
    expect(mid.seenNotes).toEqual(['note-count'])
    const after = step(data, mid, { type: 'ADVANCE' }).state
    expect(after.noteShowing).toBeNull()
    expect(after.mode).toBe('investigation')
    expect(after.seenNotes).toEqual(['note-count'])
  })
})

describe('testimony', () => {
  it('entering testimony auto-checkpoints and emits save + music', () => {
    const { state, effects } = run(toTestimony)
    expect(state.mode).toBe('testimony')
    expect(state.testimony?.statementId).toBe('st-1')
    expect(state.checkpoint?.mode).toBe('testimony')
    expect(effects).toContainEqual({ type: 'save' })
    expect(effects).toContainEqual({ type: 'music', id: 'testimony' })
  })

  it('statement navigation wraps around visible statements only', () => {
    const s0 = run(toTestimony).state
    expect(visibleStatements(data, s0).map((st) => st.id)).toEqual(['st-1', 'st-2'])
    const s1 = step(data, s0, { type: 'STATEMENT_NEXT' }).state
    expect(s1.testimony?.statementId).toBe('st-2')
    const s2 = step(data, s1, { type: 'STATEMENT_NEXT' }).state
    expect(s2.testimony?.statementId).toBe('st-1') // wrapped
    const s3 = step(data, s2, { type: 'STATEMENT_PREV' }).state
    expect(s3.testimony?.statementId).toBe('st-2') // wrapped backwards
  })

  it('PRESS runs the press script, reveals hidden statements once, and returns to the same statement', () => {
    const atSt2 = run([...toTestimony, { type: 'STATEMENT_NEXT' }]).state
    const pressed = run([{ type: 'PRESS' }], atSt2).state
    expect(pressed.mode).toBe('dialogue')
    expect(pressed.testimony?.revealed).toEqual(['st-3'])
    const back = run([{ type: 'ADVANCE' }], pressed).state
    expect(back.mode).toBe('testimony')
    expect(back.testimony?.statementId).toBe('st-2')
    expect(visibleStatements(data, back).map((st) => st.id)).toEqual(['st-1', 'st-2', 'st-3'])
    // pressing again does not duplicate the reveal
    const again = run([{ type: 'PRESS' }, { type: 'ADVANCE' }], back).state
    expect(again.testimony?.revealed).toEqual(['st-3'])
  })

  it('wrong PRESENT costs credibility, plays the penalty kit, and returns via wrongPresentScript', () => {
    const atSt2 = run([...toTestimony, { type: 'STATEMENT_NEXT' }]).state
    const { state, effects } = run([{ type: 'PRESENT', evidence: 'ev-tally' }], atSt2)
    expect(state.credibility).toBe(2)
    expect(effects).toContainEqual({ type: 'shake' })
    expect(effects).toContainEqual({ type: 'flash', color: 'red' })
    expect(effects).toContainEqual({ type: 'sfx', id: 'penalty' })
    expect(state.mode).toBe('dialogue')
    const back = run([{ type: 'ADVANCE' }], state).state
    expect(back.mode).toBe('testimony')
    expect(back.testimony?.statementId).toBe('st-2')
  })

  it('PRESENT with unowned evidence is ignored', () => {
    const s0 = run(toTestimony).state
    const { state, effects } = run([{ type: 'PRESENT', evidence: 'ev-cctv' }], s0)
    expect(state.credibility).toBe(3)
    expect(effects).toHaveLength(0)
  })

  it('credibility 0 → gameOver; RETRY restores the testimony-entry checkpoint', () => {
    const s0 = run(toTestimony).state
    const wrong: GameEvent[] = [
      { type: 'PRESENT', evidence: 'ev-tally' },
      { type: 'ADVANCE' },
      { type: 'PRESENT', evidence: 'ev-tally' },
      { type: 'ADVANCE' },
      { type: 'PRESENT', evidence: 'ev-tally' },
    ]
    const dead = run(wrong, s0).state
    expect(dead.mode).toBe('gameOver')
    expect(dead.credibility).toBe(0)

    const retried = step(data, dead, { type: 'RETRY' }).state
    expect(retried.mode).toBe('testimony')
    expect(retried.testimony?.statementId).toBe('st-1')
    expect(retried.credibility).toBe(3)
    expect(retried.evidence).toEqual(dead.evidence) // progress is monotone, kept
  })

  it('correct PRESENT plays the takedown and holds the reviewer note before the transition', () => {
    const atSt2 = run([...toTestimony, { type: 'STATEMENT_NEXT' }]).state
    const hit = run([{ type: 'PRESENT', evidence: 'ev-mt-resibo' }], atSt2)
    expect(hit.effects).toContainEqual({ type: 'flash', color: 'white' })
    expect(hit.effects).toContainEqual({ type: 'sfx', id: 'correct' })
    const line = currentLine(data, hit.state)
    expect(line?.kind).toBe('shout')

    const atNote = run([{ type: 'ADVANCE' }, { type: 'ADVANCE' }, { type: 'ADVANCE' }], hit.state).state
    expect(atNote.noteShowing).toBe('note-vouch')
    expect(atNote.mode).toBe('dialogue')

    const done = step(data, atNote, { type: 'ADVANCE' }).state
    expect(done.mode).toBe('caseComplete')
    expect(done.seenNotes).toContain('note-vouch')
  })
})

describe('save round-trip', () => {
  it('serialize → parse → LOAD restores the same position and stays completable', () => {
    const mid = run(toTestimony).state
    const raw = serialize(mid, 12345)
    const snap = parse(raw, data)
    expect(snap).not.toBeNull()

    const loaded = step(data, initialState(data), { type: 'LOAD', snapshot: snap! }).state
    expect(loaded.mode).toBe('testimony')
    expect(loaded.testimony?.statementId).toBe('st-1')
    expect(loaded.evidence).toEqual(mid.evidence)
    expect(loaded.checkpoint).not.toBeNull()
  })

  it('parse rejects garbage, wrong version, wrong case, and unknown ids', () => {
    expect(parse('not json', data)).toBeNull()

    const mid = run(toTestimony).state
    const good = JSON.parse(serialize(mid, 1))
    expect(parse(JSON.stringify({ ...good, v: 2 }), data)).toBeNull()
    expect(parse(JSON.stringify({ ...good, caseId: 'other' }), data)).toBeNull()

    const badEvidence = structuredClone(good)
    badEvidence.snapshot.evidence.push('ev-deleted')
    expect(parse(JSON.stringify(badEvidence), data)).toBeNull()

    const badStatement = structuredClone(good)
    badStatement.snapshot.testimony.statementId = 'st-3' // hidden, not revealed → not visible
    expect(parse(JSON.stringify(badStatement), data)).toBeNull()
  })
})
