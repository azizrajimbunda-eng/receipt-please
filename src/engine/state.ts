import type {
  CaseData,
  EvidenceId,
  FlagId,
  NoteId,
  SceneId,
  ScriptId,
  StatementId,
  TestimonyId,
} from './types'

export type Mode =
  | 'dialogue'
  | 'choice'
  | 'investigation'
  | 'testimony'
  | 'gameOver'
  | 'caseComplete'

export interface ScriptCursor {
  id: ScriptId
  index: number
}

/** Where control returns when the active script runs past its last line. */
export type Resume =
  | { kind: 'none' }
  | { kind: 'investigation'; sceneId: SceneId }
  | { kind: 'testimony' }

export interface TestimonyState {
  id: TestimonyId
  /** current statement by id, not index — press-reveals can shift positions */
  statementId: StatementId
  revealed: StatementId[]
}

export interface GameState {
  caseId: string
  mode: Mode
  script: ScriptCursor | null
  resume: Resume
  sceneId: SceneId | null
  testimony: TestimonyState | null
  /** Working Papers, in acquisition order */
  evidence: EvidenceId[]
  flags: Record<FlagId, true>
  credibility: number
  seenNotes: NoteId[]
  /** reviewer note queued by a correct present; shown before the takedown's transition */
  pendingNote: NoteId | null
  /** reviewer note card currently displayed (blocks input until ADVANCE) */
  noteShowing: NoteId | null
  checkpoint: Snapshot | null
  /** bumped whenever a step emits effects; the UI drains its effect queue keyed on this */
  fxSeq: number
}

/** Everything needed to restore play position. pendingNote/noteShowing are
 * deliberately excluded — checkpoints never land mid-takedown. */
export type Snapshot = Pick<
  GameState,
  | 'caseId'
  | 'mode'
  | 'script'
  | 'resume'
  | 'sceneId'
  | 'testimony'
  | 'evidence'
  | 'flags'
  | 'credibility'
  | 'seenNotes'
>

export function snapshotOf(s: GameState): Snapshot {
  return structuredClone({
    caseId: s.caseId,
    mode: s.mode,
    script: s.script,
    resume: s.resume,
    sceneId: s.sceneId,
    testimony: s.testimony,
    evidence: s.evidence,
    flags: s.flags,
    credibility: s.credibility,
    seenNotes: s.seenNotes,
  })
}

export function blankState(data: CaseData): GameState {
  return {
    caseId: data.id,
    mode: 'dialogue',
    script: { id: data.startScript, index: 0 },
    resume: { kind: 'none' },
    sceneId: null,
    testimony: null,
    evidence: [],
    flags: {},
    credibility: data.credibilityMax,
    seenNotes: [],
    pendingNote: null,
    noteShowing: null,
    checkpoint: null,
    fxSeq: 0,
  }
}
