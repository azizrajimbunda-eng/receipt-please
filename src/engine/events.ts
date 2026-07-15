import type { EvidenceId } from './types'
import type { Snapshot } from './state'

export type GameEvent =
  | { type: 'ADVANCE' }
  | { type: 'CHOOSE'; index: number }
  | { type: 'DO_ACTION'; actionId: string }
  | { type: 'STATEMENT_NEXT' }
  | { type: 'STATEMENT_PREV' }
  | { type: 'PRESS' }
  | { type: 'PRESENT'; evidence: EvidenceId }
  | { type: 'RETRY' }
  | { type: 'LOAD'; snapshot: Snapshot }

/** Side-effect descriptors — the reducer stays pure; the React layer interprets these. */
export type Effect =
  | { type: 'sfx'; id: string }
  | { type: 'music'; id: string | null }
  | { type: 'shake' }
  | { type: 'flash'; color: 'white' | 'red' }
  | { type: 'save' }
  | { type: 'evidenceAdded'; evidence: EvidenceId }
