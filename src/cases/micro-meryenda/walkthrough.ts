// Answer key for the micro case: a GameEvent[] that drives the engine from
// initialState to caseComplete, including one deliberate wrong present to
// exercise the penalty path. Consumed by tests/playthrough.test.ts.

import type { GameEvent } from '../../engine/events'

export const microWalkthrough: GameEvent[] = [
  { type: 'ADVANCE' }, // narrate → cess
  { type: 'ADVANCE' }, // cess → choice
  { type: 'CHOOSE', index: 0 }, // → checkpoint → moveTo pantry (investigation)
  { type: 'DO_ACTION', actionId: 'examine-tally' }, // narrate
  { type: 'ADVANCE' }, // give ev-tally → note-count card
  { type: 'ADVANCE' }, // dismiss note → back to pantry
  { type: 'DO_ACTION', actionId: 'examine-trash' }, // narrate
  { type: 'ADVANCE' }, // give ev-mt-resibo → back to pantry
  { type: 'DO_ACTION', actionId: 'testify' }, // enter testimony at st-1 (auto-checkpoint)
  { type: 'PRESS' }, // press st-1
  { type: 'ADVANCE' }, // press script ends → back to st-1
  { type: 'STATEMENT_NEXT' }, // → st-2
  { type: 'PRESENT', evidence: 'ev-tally' }, // WRONG on purpose: penalty, sc-wrong
  { type: 'ADVANCE' }, // sc-wrong ends → back to st-2
  { type: 'PRESS' }, // press st-2, reveals st-3
  { type: 'ADVANCE' }, // press script ends → back to st-2
  { type: 'PRESENT', evidence: 'ev-mt-resibo' }, // CORRECT → takedown shout
  { type: 'ADVANCE' }, // shout → jopay shocked
  { type: 'ADVANCE' }, // → cess line
  { type: 'ADVANCE' }, // → endCase held by pending note-vouch card
  { type: 'ADVANCE' }, // dismiss note → caseComplete
]
