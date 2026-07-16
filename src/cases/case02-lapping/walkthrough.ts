// Answer key for Case 02: the DECISIONS, not the taps between them.

import type { GameEvent } from '../../engine/events'

export const case02Walkthrough: GameEvent[] = [
  { type: 'CHOOSE', index: 0 }, // confirm with the customers, hindi sa kolektor

  // Act 1 — warehouse
  { type: 'DO_ACTION', actionId: 'olivia' },
  { type: 'DO_ACTION', actionId: 'orbook' },
  { type: 'DO_ACTION', actionId: 'deposits' },
  { type: 'DO_ACTION', actionId: 'ryan' },
  { type: 'DO_ACTION', actionId: 'testify1' },

  // T1: navigate to s4 ("walang reklamo"), one deliberate wrong present, then the aging
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-program2' }, // WRONG on purpose → penalty
  { type: 'PRESENT', evidence: 'ev-aging' }, // → sari-sari store

  // Act 2 — sari-sari
  { type: 'DO_ACTION', actionId: 'baby' },
  { type: 'DO_ACTION', actionId: 'listahan' },
  { type: 'DO_ACTION', actionId: 'lag' },
  { type: 'DO_ACTION', actionId: 'back' }, // → T2

  // T2: the customer's original OR against the duplicate's date (s3)
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-or-cust' }, // → T2b

  // T2b: the subsidiary ledger against "buo ang hawak ko" (s1)
  { type: 'PRESENT', evidence: 'ev-subledger' }, // → warehouse2

  // Act 3
  { type: 'DO_ACTION', actionId: 'folder' },
  { type: 'DO_ACTION', actionId: 'hr' },
  { type: 'DO_ACTION', actionId: 'conf' }, // → conference2
  { type: 'DO_ACTION', actionId: 'open' }, // → T3

  // T3: the 5-6 notice against "walang utang" (s1)
  { type: 'PRESENT', evidence: 'ev-56notice' }, // → T4

  // T4: the engagement letter against "the report stops with me" (s2)
  { type: 'STATEMENT_NEXT' },
  { type: 'PRESENT', evidence: 'ev-engagement' }, // → endCase
]
