// Answer key for Case 01: the DECISIONS a player makes, not the taps between
// them. The playthrough test drives these through the real reducer and
// auto-advances dialogue, so rewriting a line never breaks the key — only
// changing the actual puzzle does.

import type { GameEvent } from '../../engine/events'

export const case01Walkthrough: GameEvent[] = [
  { type: 'CHOOSE', index: 0 }, // "Surprise cash count agad."

  // Act 1 — build the working papers, then take the testimony.
  { type: 'DO_ACTION', actionId: 'count' },
  { type: 'DO_ACTION', actionId: 'vale' },
  { type: 'DO_ACTION', actionId: 'vouchers' },
  { type: 'DO_ACTION', actionId: 'malou' },
  { type: 'DO_ACTION', actionId: 'testify' },

  // Testimony 1 — the cash count breaks "kumpleto ang pondo".
  { type: 'PRESS' }, // s1: no review, one person holds everything
  { type: 'STATEMENT_NEXT' }, // → t1-s2
  { type: 'PRESENT', evidence: 'ev-vale' }, // WRONG on purpose → penalty path
  { type: 'PRESENT', evidence: 'ev-count' }, // CORRECT

  // Act 2 — the closed store, the genuine OR, the loupe.
  { type: 'DO_ACTION', actionId: 'store' },
  { type: 'DO_ACTION', actionId: 'bong' },
  { type: 'DO_ACTION', actionId: 'priorfile' },
  { type: 'DO_ACTION', actionId: 'loupe' },
  { type: 'DO_ACTION', actionId: 'back' },

  // Testimony 2 — the photo breaks the June 12 purchase.
  { type: 'STATEMENT_NEXT' }, // → t2-s2
  { type: 'PRESENT', evidence: 'ev-photo' }, // CORRECT

  // Testimony 2b — the ink breaks the ₱4,850.
  { type: 'STATEMENT_NEXT' },
  { type: 'STATEMENT_NEXT' }, // → t2b-s3
  { type: 'PRESENT', evidence: 'ev-ink' }, // CORRECT

  // Act 3 — the gate log, the ledger trend, the hospital bill.
  { type: 'DO_ACTION', actionId: 'dodong' },
  { type: 'DO_ACTION', actionId: 'analytics' },
  { type: 'DO_ACTION', actionId: 'bundle' },
  { type: 'DO_ACTION', actionId: 'conf' },
  { type: 'DO_ACTION', actionId: 'open' },

  // Testimony 3 — the gate log breaks "si Dodong ang bumili".
  { type: 'PRESENT', evidence: 'ev-gatelog' }, // CORRECT (cursor starts on t3-s1)

  // Testimony 3b — the hospital bill breaks "walang problema sa pera".
  { type: 'PRESENT', evidence: 'ev-hospital' }, // CORRECT (cursor on t3b-s1)

  // Testimony 4 — the policy breaks "isang tao lang ang may kasalanan".
  { type: 'STATEMENT_NEXT' }, // → t4-s2
  { type: 'PRESENT', evidence: 'ev-policy' }, // CORRECT → endCase
]
