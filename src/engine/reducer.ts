// The whole game as a pure state machine: step(caseData, state, event) → {state, effects}.
// No React, no DOM, no storage — the UI interprets the returned effects.

import type {
  CaseData,
  Condition,
  DialogueLine,
  FlagId,
  LineFx,
  Statement,
  Testimony,
  TestimonyId,
} from './types'
import type { GameState, Snapshot } from './state'
import { blankState, snapshotOf } from './state'
import type { Effect, GameEvent } from './events'

export interface StepResult {
  state: GameState
  effects: Effect[]
}

export function condMet(c: Condition | undefined, flags: Record<FlagId, true>): boolean {
  if (!c) return true
  if (c.allOf && !c.allOf.every((f) => flags[f])) return false
  if (c.noneOf && !c.noneOf.every((f) => !flags[f])) return false
  return true
}

export function visibleStatementsOf(t: Testimony, revealed: string[]): Statement[] {
  return t.statements.filter((s) => !s.hidden || revealed.includes(s.id))
}

function cloneState(s: GameState): GameState {
  return {
    ...s,
    script: s.script ? { ...s.script } : null,
    resume: { ...s.resume },
    testimony: s.testimony
      ? { ...s.testimony, revealed: [...s.testimony.revealed] }
      : null,
    evidence: [...s.evidence],
    flags: { ...s.flags },
    seenNotes: [...s.seenNotes],
    // checkpoint snapshots are immutable once taken; share the reference
  }
}

function labelIndex(lines: DialogueLine[], name: string): number {
  const i = lines.findIndex((l) => l.kind === 'label' && l.name === name)
  // Unknown labels are a linter error; halting at end-of-script is the safe fallback.
  return i === -1 ? lines.length : i
}

function pushLineFx(fx: LineFx, effects: Effect[]): void {
  if (fx.shake) effects.push({ type: 'shake' })
  if (fx.flash) effects.push({ type: 'flash', color: fx.flash })
  if (fx.sting) effects.push({ type: 'sfx', id: fx.sting })
  if (fx.music !== undefined) effects.push({ type: 'music', id: fx.music })
}

function showNote(s: GameState, note: string): void {
  s.noteShowing = note
  if (!s.seenNotes.includes(note)) s.seenNotes.push(note)
}

function runScript(data: CaseData, s: GameState, scriptId: string, effects: Effect[]): void {
  s.script = { id: scriptId, index: 0 }
  s.mode = 'dialogue'
  settle(data, s, effects)
}

function enterTestimony(data: CaseData, s: GameState, id: TestimonyId, effects: Effect[]): void {
  const t = data.testimonies[id]
  if (!t) return // linter prevents; halt safely
  const first = visibleStatementsOf(t, [])[0]
  if (!first) return
  s.testimony = { id, statementId: first.id, revealed: [] }
  s.mode = 'testimony'
  s.script = null
  s.resume = { kind: 'none' }
  if (t.musicId !== undefined) effects.push({ type: 'music', id: t.musicId })
  // Auto-checkpoint on every testimony entry: retry always restarts the confrontation.
  s.checkpoint = snapshotOf(s)
  effects.push({ type: 'save' })
}

/**
 * Execute lines from the cursor forward, auto-running directives, until we hit
 * a displayable line (stop with cursor AT it) or a transition (execute it and stop).
 */
function settle(data: CaseData, s: GameState, effects: Effect[]): void {
  for (;;) {
    if (!s.script) return
    const lines = data.scripts[s.script.id]
    if (!lines) {
      s.script = null
      return
    }
    if (s.script.index >= lines.length) {
      // Script ran past its end — consult resume.
      const r = s.resume
      s.script = null
      if (r.kind === 'investigation') {
        s.mode = 'investigation'
        s.sceneId = r.sceneId
        s.resume = { kind: 'none' }
      } else if (r.kind === 'testimony') {
        s.mode = 'testimony'
        s.resume = { kind: 'none' }
      }
      // resume 'none' falling off the end is a dead end — linter catches it.
      return
    }
    const line = lines[s.script.index]
    if (!line) return
    switch (line.kind) {
      case 'label':
        s.script.index++
        continue
      case 'goto':
        s.script.index = labelIndex(lines, line.label)
        continue
      case 'branch':
        if (condMet(line.when, s.flags)) s.script.index = labelIndex(lines, line.label)
        else s.script.index++
        continue
      case 'setFlag':
        s.flags[line.flag] = true
        s.script.index++
        continue
      case 'give':
        if (!s.evidence.includes(line.evidence)) {
          s.evidence.push(line.evidence)
          effects.push({ type: 'sfx', id: 'reveal' }, { type: 'evidenceAdded', evidence: line.evidence })
        }
        s.script.index++
        continue
      case 'checkpoint':
        // Snapshot points at the NEXT unexecuted line, so restore resumes right past it.
        s.script.index++
        s.checkpoint = snapshotOf(s)
        effects.push({ type: 'save' })
        continue
      case 'say':
        s.mode = 'dialogue'
        if (line.fx) pushLineFx(line.fx, effects)
        return
      case 'narrate':
        s.mode = 'dialogue'
        return
      case 'shout':
        s.mode = 'dialogue'
        effects.push({ type: 'sfx', id: 'objection' }, { type: 'shake' })
        return
      case 'note':
        s.mode = 'dialogue'
        showNote(s, line.note)
        return
      case 'choice':
        s.mode = 'choice'
        return
      case 'moveTo': {
        if (consumePendingNote(s)) return
        const scene = data.scenes[line.scene]
        s.sceneId = line.scene
        s.mode = 'investigation'
        s.script = null
        s.resume = { kind: 'none' }
        s.testimony = null
        if (scene?.musicId !== undefined) effects.push({ type: 'music', id: scene.musicId })
        return
      }
      case 'testimony':
        if (consumePendingNote(s)) return
        enterTestimony(data, s, line.testimony, effects)
        return
      case 'endCase':
        if (consumePendingNote(s)) return
        s.mode = 'caseComplete'
        s.script = null
        s.testimony = null
        effects.push({ type: 'music', id: null })
        return
    }
  }
}

/** A correct present queues its reviewer note; show it right before the takedown's transition. */
function consumePendingNote(s: GameState): boolean {
  if (!s.pendingNote) return false
  showNote(s, s.pendingNote)
  s.pendingNote = null
  s.mode = 'dialogue'
  return true // cursor stays AT the transition line; next ADVANCE executes it
}

function applySnapshot(data: CaseData, s: GameState, snap: Snapshot, effects: Effect[]): void {
  const c = structuredClone(snap)
  s.mode = c.mode
  s.script = c.script
  s.resume = c.resume
  s.sceneId = c.sceneId
  s.testimony = c.testimony
  s.evidence = c.evidence
  s.flags = c.flags
  s.credibility = c.credibility
  s.seenNotes = c.seenNotes
  s.pendingNote = null
  s.noteShowing = null
  // Re-establish music for the restored context.
  if (s.mode === 'testimony' && s.testimony) {
    const t = data.testimonies[s.testimony.id]
    if (t?.musicId !== undefined) effects.push({ type: 'music', id: t.musicId ?? null })
  } else if (s.sceneId) {
    const scene = data.scenes[s.sceneId]
    if (scene?.musicId !== undefined) effects.push({ type: 'music', id: scene.musicId ?? null })
  }
  // A restored dialogue cursor may point at an unexecuted directive — settle to
  // the next displayable line. (settle never re-executes displayed lines: it
  // stops AT them without mutating.)
  if (s.mode === 'dialogue' || s.mode === 'choice') settle(data, s, effects)
}

export function initialState(data: CaseData): GameState {
  const s = blankState(data)
  // Opening effects are discarded by design: the title screen's "Tap to Start"
  // gesture mounts the game, and scene/testimony entries re-emit music anyway.
  settle(data, s, [])
  return s
}

export function step(data: CaseData, prev: GameState, event: GameEvent): StepResult {
  const s = cloneState(prev)
  const effects: Effect[] = []

  switch (event.type) {
    case 'ADVANCE': {
      if (s.noteShowing) {
        const line = s.script ? data.scripts[s.script.id]?.[s.script.index] : undefined
        s.noteShowing = null
        if (s.script && line?.kind === 'note') s.script.index++
        // else: cursor is AT a transition line held back by a pending note — settle executes it
        settle(data, s, effects)
        break
      }
      if (s.mode === 'dialogue' && s.script) {
        const line = data.scripts[s.script.id]?.[s.script.index]
        if (line && (line.kind === 'say' || line.kind === 'narrate' || line.kind === 'shout')) {
          s.script.index++
          settle(data, s, effects)
        }
      }
      break
    }

    case 'CHOOSE': {
      if (s.mode !== 'choice' || !s.script) break
      const line = data.scripts[s.script.id]?.[s.script.index]
      if (line?.kind !== 'choice') break
      const opt = line.options[event.index]
      if (!opt) break
      const lines = data.scripts[s.script.id]
      if (!lines) break
      s.script.index = labelIndex(lines, opt.label)
      s.mode = 'dialogue'
      settle(data, s, effects)
      break
    }

    case 'DO_ACTION': {
      if (s.mode !== 'investigation' || !s.sceneId) break
      const scene = data.scenes[s.sceneId]
      const action = scene?.actions.find((a) => a.id === event.actionId)
      if (!action || !condMet(action.when, s.flags)) break
      if (action.doneFlag) s.flags[action.doneFlag] = true
      if (action.kind === 'talk' || action.kind === 'examine') {
        s.resume = { kind: 'investigation', sceneId: s.sceneId }
        runScript(data, s, action.target, effects)
      } else if (action.kind === 'move') {
        s.sceneId = action.target
        const next = data.scenes[action.target]
        if (next?.musicId !== undefined) effects.push({ type: 'music', id: next.musicId })
      } else {
        enterTestimony(data, s, action.target, effects)
      }
      break
    }

    case 'STATEMENT_NEXT':
    case 'STATEMENT_PREV': {
      if (s.mode !== 'testimony' || !s.testimony) break
      const t = data.testimonies[s.testimony.id]
      if (!t) break
      const visible = visibleStatementsOf(t, s.testimony.revealed)
      const i = visible.findIndex((st) => st.id === s.testimony!.statementId)
      if (i === -1 || visible.length === 0) break
      const delta = event.type === 'STATEMENT_NEXT' ? 1 : -1
      const next = visible[(i + delta + visible.length) % visible.length]
      if (next) s.testimony.statementId = next.id
      break
    }

    case 'PRESS': {
      if (s.mode !== 'testimony' || !s.testimony) break
      const t = data.testimonies[s.testimony.id]
      const st = t?.statements.find((x) => x.id === s.testimony!.statementId)
      if (!st) break
      if (st.press.reveals && !s.testimony.revealed.includes(st.press.reveals)) {
        s.testimony.revealed.push(st.press.reveals)
      }
      if (st.press.setsFlag) s.flags[st.press.setsFlag] = true
      s.resume = { kind: 'testimony' }
      runScript(data, s, st.press.script, effects)
      break
    }

    case 'PRESENT': {
      if (s.mode !== 'testimony' || !s.testimony) break
      if (!s.evidence.includes(event.evidence)) break
      const t = data.testimonies[s.testimony.id]
      const st = t?.statements.find((x) => x.id === s.testimony!.statementId)
      if (!st) break
      const c = st.contradiction
      if (c && c.evidence.includes(event.evidence)) {
        effects.push({ type: 'flash', color: 'white' }, { type: 'sfx', id: 'correct' })
        s.pendingNote = c.note
        s.resume = { kind: 'none' }
        runScript(data, s, c.script, effects)
      } else {
        s.credibility--
        effects.push({ type: 'shake' }, { type: 'flash', color: 'red' }, { type: 'sfx', id: 'penalty' })
        if (s.credibility <= 0) {
          s.mode = 'gameOver'
          effects.push({ type: 'music', id: null })
        } else if (data.wrongPresentScript) {
          s.resume = { kind: 'testimony' }
          runScript(data, s, data.wrongPresentScript, effects)
        }
      }
      break
    }

    case 'RETRY': {
      if (s.mode !== 'gameOver' || !s.checkpoint) break
      applySnapshot(data, s, s.checkpoint, effects)
      break
    }

    case 'LOAD': {
      // Caller validates via save.parse(); the snapshot becomes the new checkpoint.
      s.checkpoint = structuredClone(event.snapshot)
      applySnapshot(data, s, event.snapshot, effects)
      break
    }
  }

  if (effects.length > 0) s.fxSeq++
  return { state: s, effects }
}
