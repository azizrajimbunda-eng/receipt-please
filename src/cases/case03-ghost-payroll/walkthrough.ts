// Answer key for Case 03: the DECISIONS, not the taps between them.

import type { GameEvent } from '../../engine/events'

export const case03Walkthrough: GameEvent[] = [
  { type: 'CHOOSE', index: 0 }, // observe the payout, walang paalam

  // Act 1 — Site A
  { type: 'DO_ACTION', actionId: 'igme' },
  { type: 'DO_ACTION', actionId: 'dtr' },
  { type: 'DO_ACTION', actionId: 'bulletin' },
  { type: 'DO_ACTION', actionId: 'weng' },
  { type: 'DO_ACTION', actionId: 'testify1' },

  // T1: navigate to s3 ("tuloy-tuloy buong Agosto"), one deliberate wrong present, then the closure memo
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-register' }, // WRONG on purpose → penalty
  { type: 'PRESENT', evidence: 'ev-closure' }, // → admin office

  // Act 2 — Admin office
  { type: 'DO_ACTION', actionId: 'file201' },
  { type: 'DO_ACTION', actionId: 'remit' },
  { type: 'DO_ACTION', actionId: 'nestor' },
  { type: 'DO_ACTION', actionId: 'testify2' },

  // T2: the R-3 against "remitted lahat" (s3)
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-remit' }, // → the Saturday payout

  // Act 3 — payout observation
  { type: 'DO_ACTION', actionId: 'observe' },
  { type: 'DO_ACTION', actionId: 'weng2' },
  { type: 'DO_ACTION', actionId: 'signatures' },
  { type: 'DO_ACTION', actionId: 'compare' },
  { type: 'DO_ACTION', actionId: 'conf' }, // → conference
  { type: 'DO_ACTION', actionId: 'open' }, // → T3

  // T3: the handwriting comparison against "never touched his signature" (s3)
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-handwriting' }, // → T4

  // T4: the unclaimed envelope against "walang kontrol na tatalab" (s2)
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-envelope' }, // → endCase
]
