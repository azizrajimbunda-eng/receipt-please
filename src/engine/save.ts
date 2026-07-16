// Versioned save persistence. The engine never touches browser storage directly —
// the UI injects a StorageAdapter (real storage in the app, in-memory in tests,
// and an in-memory fallback when the artifact iframe denies storage access).

import type { CaseData } from './types'
import type { GameState, Mode, Snapshot } from './state'
import { snapshotOf } from './state'
import { visibleStatementsOf } from './reducer'

/** Legacy single-slot key (pre case-select); migrated to per-case keys on boot. */
export const SAVE_KEY = 'receipt-please:save:v1'

/** One save slot per case. */
export function saveKeyFor(caseId: string): string {
  return `receipt-please:save:v1:${caseId}`
}

export interface SaveGame {
  v: 1
  caseId: string
  snapshot: Snapshot
  savedAt: number
}

export interface StorageAdapter {
  get(key: string): string | null
  set(key: string, value: string): void
}

export function memoryStorage(): StorageAdapter {
  const m = new Map<string, string>()
  return {
    get: (k) => m.get(k) ?? null,
    set: (k, v) => void m.set(k, v),
  }
}

export function serializeSnapshot(caseId: string, snapshot: Snapshot, savedAt: number): string {
  const save: SaveGame = { v: 1, caseId, snapshot, savedAt }
  return JSON.stringify(save)
}

export function serialize(state: GameState, savedAt: number): string {
  return serializeSnapshot(state.caseId, snapshotOf(state), savedAt)
}

const MODES: Mode[] = ['dialogue', 'choice', 'investigation', 'testimony', 'gameOver', 'caseComplete']

/**
 * Validate a raw save against the CURRENT case data. Returns null on any
 * mismatch — a content update must never resurrect a save pointing at deleted nodes.
 */
export function parse(raw: string, data: CaseData): Snapshot | null {
  let save: SaveGame
  try {
    save = JSON.parse(raw) as SaveGame
  } catch {
    return null
  }
  if (!save || typeof save !== 'object') return null
  if (save.v !== 1 || save.caseId !== data.id) return null
  const s = save.snapshot
  if (!s || typeof s !== 'object') return null
  if (s.caseId !== data.id) return null
  if (!MODES.includes(s.mode)) return null
  if (typeof s.credibility !== 'number' || s.credibility < 0 || s.credibility > data.credibilityMax) return null

  if (s.script !== null) {
    if (!s.script || typeof s.script.index !== 'number') return null
    const lines = data.scripts[s.script.id]
    if (!lines || s.script.index < 0 || s.script.index > lines.length) return null
  }
  if (s.sceneId !== null && !data.scenes[s.sceneId]) return null
  if (s.testimony !== null) {
    const t = data.testimonies[s.testimony.id]
    if (!t) return null
    if (!Array.isArray(s.testimony.revealed)) return null
    const ids = new Set(t.statements.map((st) => st.id))
    if (!s.testimony.revealed.every((id) => ids.has(id))) return null
    const visible = visibleStatementsOf(t, s.testimony.revealed)
    if (!visible.some((st) => st.id === s.testimony!.statementId)) return null
  }
  if (!Array.isArray(s.evidence) || !s.evidence.every((id) => data.evidence[id])) return null
  if (!Array.isArray(s.seenNotes) || !s.seenNotes.every((id) => data.notes[id])) return null
  if (!s.flags || typeof s.flags !== 'object') return null
  if (!s.resume || typeof s.resume !== 'object') return null
  if (s.resume.kind === 'investigation' && !data.scenes[s.resume.sceneId]) return null

  return s
}
