// Answer key for the micro case: the DECISIONS, not the taps between them.
// The playthrough test auto-advances dialogue around these.

import type { GameEvent } from '../../engine/events'

export const microWalkthrough: GameEvent[] = [
  { type: 'CHOOSE', index: 0 },
  { type: 'DO_ACTION', actionId: 'examine-tally' },
  { type: 'DO_ACTION', actionId: 'examine-trash' },
  { type: 'DO_ACTION', actionId: 'testify' },
  { type: 'PRESS' }, // st-1
  { type: 'STATEMENT_NEXT' }, // → st-2
  { type: 'PRESENT', evidence: 'ev-tally' }, // WRONG on purpose → penalty
  { type: 'PRESS' }, // st-2 press reveals st-3
  { type: 'PRESENT', evidence: 'ev-mt-resibo' }, // CORRECT → endCase
]
