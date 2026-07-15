// Pure derived views over (CaseData, GameState) so UI components never walk raw case data.

import type {
  CaseData,
  DialogueLine,
  Evidence,
  EvidenceId,
  ReviewerNote,
  Scene,
  SceneAction,
  Speaker,
  Statement,
  Testimony,
} from './types'
import type { GameState } from './state'
import { condMet, visibleStatementsOf } from './reducer'

export function currentLine(data: CaseData, s: GameState): DialogueLine | null {
  if (s.noteShowing) return null
  if ((s.mode !== 'dialogue' && s.mode !== 'choice') || !s.script) return null
  return data.scripts[s.script.id]?.[s.script.index] ?? null
}

export function currentNote(data: CaseData, s: GameState): ReviewerNote | null {
  return s.noteShowing ? (data.notes[s.noteShowing] ?? null) : null
}

/** Speaker of the current say/shout line, or the testifying witness. */
export function currentSpeaker(data: CaseData, s: GameState): Speaker | null {
  const line = currentLine(data, s)
  if (line && (line.kind === 'say' || line.kind === 'shout')) {
    return data.speakers[line.speaker] ?? null
  }
  if (s.mode === 'testimony') {
    const t = currentTestimony(data, s)
    return t ? (data.speakers[t.speaker] ?? null) : null
  }
  return null
}

export function currentScene(data: CaseData, s: GameState): Scene | null {
  return s.sceneId ? (data.scenes[s.sceneId] ?? null) : null
}

export interface VisibleAction extends SceneAction {
  done: boolean
}

export function visibleActions(data: CaseData, s: GameState): VisibleAction[] {
  const scene = currentScene(data, s)
  if (!scene || s.mode !== 'investigation') return []
  return scene.actions
    .filter((a) => condMet(a.when, s.flags))
    .map((a) => ({ ...a, done: a.doneFlag ? Boolean(s.flags[a.doneFlag]) : false }))
}

export function currentTestimony(data: CaseData, s: GameState): Testimony | null {
  return s.testimony ? (data.testimonies[s.testimony.id] ?? null) : null
}

export function visibleStatements(data: CaseData, s: GameState): Statement[] {
  const t = currentTestimony(data, s)
  if (!t || !s.testimony) return []
  return visibleStatementsOf(t, s.testimony.revealed)
}

export function currentStatement(data: CaseData, s: GameState): Statement | null {
  if (!s.testimony) return null
  return visibleStatements(data, s).find((st) => st.id === s.testimony!.statementId) ?? null
}

export interface PapersEntry {
  id: EvidenceId
  evidence: Evidence
}

export function workingPapers(data: CaseData, s: GameState): PapersEntry[] {
  return s.evidence.flatMap((id) => {
    const evidence = data.evidence[id]
    return evidence ? [{ id, evidence }] : []
  })
}

export function recapNotes(data: CaseData, s: GameState): ReviewerNote[] {
  return s.seenNotes.flatMap((id) => {
    const n = data.notes[id]
    return n ? [n] : []
  })
}
