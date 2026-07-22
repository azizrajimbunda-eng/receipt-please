// Answer key for Case 04: the DECISIONS, not the taps between them.

import type { GameEvent } from '../../engine/events'

export const case04Walkthrough: GameEvent[] = [
  { type: 'CHOOSE', index: 0 }, // relevant costs muna, hindi "matitipid"

  // Act 1 — bakery
  { type: 'DO_ACTION', actionId: 'rosa' },
  { type: 'DO_ACTION', actionId: 'nina' },
  { type: 'DO_ACTION', actionId: 'floor' },
  { type: 'DO_ACTION', actionId: 'orderfile' },
  { type: 'DO_ACTION', actionId: 'recast' },
  { type: 'DO_ACTION', actionId: 'marco' },
  { type: 'DO_ACTION', actionId: 'testify1' },

  // T1: navigate to s3 ("mababawi ang 120k"), one deliberate wrong present, then the recast
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-segment-pl' }, // WRONG on purpose (his own P&L) → penalty
  { type: 'PRESENT', evidence: 'ev-recast' }, // → records office

  // Act 2 — records
  { type: 'DO_ACTION', actionId: 'quote' },
  { type: 'DO_ACTION', actionId: 'nina2' },
  { type: 'DO_ACTION', actionId: 'relevant' },
  { type: 'DO_ACTION', actionId: 'hurno' },
  { type: 'DO_ACTION', actionId: 'conf' }, // → comedor
  { type: 'DO_ACTION', actionId: 'open' }, // → T2

  // T2: the relevant costing schedule against "cost is cost" (s2)
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-relevant' }, // → T3

  // T3: the SEC registration against "no connection" (s2)
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-sec' }, // → T4

  // T4: the incremental analysis against Aling Rosa's sunk-cost defense (s2)
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-hurno' }, // → endCase
]
