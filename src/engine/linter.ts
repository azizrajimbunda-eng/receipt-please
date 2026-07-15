// Case linter: the authoring safety net. Static referential/shape checks plus a
// BFS completability solver that drives the REAL reducer — progress is monotone
// (flags/evidence/reveals only grow), so the reachable-state space stays tiny.

import type { CaseData, DialogueLine, EvidenceId, FlagId, ScriptId } from './types'
import type { GameState } from './state'
import { initialState, step, condMet, visibleStatementsOf } from './reducer'
import type { GameEvent } from './events'

export interface LintIssue {
  level: 'error' | 'warn'
  code: string
  where: string
  message: string
}

const MAX_SOLVER_STATES = 20_000

export function lintCase(data: CaseData): LintIssue[] {
  const issues: LintIssue[] = []
  const err = (code: string, where: string, message: string) =>
    issues.push({ level: 'error', code, where, message })
  const warn = (code: string, where: string, message: string) =>
    issues.push({ level: 'warn', code, where, message })

  // ---- collected reference sets (for orphan detection) ----
  const usedScripts = new Set<ScriptId>()
  const usedScenes = new Set<string>()
  const usedTestimonies = new Set<string>()
  const usedSpeakers = new Set<string>()
  const usedNotes = new Set<string>()
  const givableEvidence = new Set<EvidenceId>()
  const settableFlags = new Set<FlagId>()
  const referencedFlags = new Set<FlagId>()

  const collectCondition = (c: { allOf?: string[]; noneOf?: string[] } | undefined) => {
    c?.allOf?.forEach((f) => referencedFlags.add(f))
    c?.noneOf?.forEach((f) => referencedFlags.add(f))
  }

  // ---- basics ----
  if (data.credibilityMax < 1) err('shape-credibility', data.id, 'credibilityMax must be ≥ 1')
  if (!data.scripts[data.startScript]) {
    err('ref-script', 'startScript', `startScript "${data.startScript}" does not exist`)
  }
  usedScripts.add(data.startScript)
  if (data.wrongPresentScript) {
    usedScripts.add(data.wrongPresentScript)
    if (!data.scripts[data.wrongPresentScript]) {
      err('ref-script', 'wrongPresentScript', `wrongPresentScript "${data.wrongPresentScript}" does not exist`)
    }
  } else {
    warn('shape-wrong-present-missing', data.id, 'no wrongPresentScript — wrong presents will show no dialogue')
  }

  // ---- scripts: per-line referential integrity ----
  for (const [scriptId, lines] of Object.entries(data.scripts)) {
    const labels = new Set(lines.filter((l) => l.kind === 'label').map((l) => (l as { name: string }).name))
    const checkLabel = (label: string, where: string) => {
      if (!labels.has(label)) err('ref-label', where, `label "${label}" not found in script "${scriptId}"`)
    }
    lines.forEach((line: DialogueLine, i) => {
      const where = `${scriptId}[${i}]`
      switch (line.kind) {
        case 'say':
        case 'shout':
          usedSpeakers.add(line.speaker)
          if (!data.speakers[line.speaker]) err('ref-speaker', where, `speaker "${line.speaker}" does not exist`)
          break
        case 'give':
          givableEvidence.add(line.evidence)
          if (!data.evidence[line.evidence]) err('ref-evidence', where, `evidence "${line.evidence}" does not exist`)
          break
        case 'setFlag':
          settableFlags.add(line.flag)
          break
        case 'goto':
          checkLabel(line.label, where)
          break
        case 'branch':
          collectCondition(line.when)
          checkLabel(line.label, where)
          break
        case 'choice':
          line.options.forEach((o) => checkLabel(o.label, where))
          break
        case 'note':
          usedNotes.add(line.note)
          if (!data.notes[line.note]) err('ref-note', where, `note "${line.note}" does not exist`)
          break
        case 'moveTo':
          usedScenes.add(line.scene)
          if (!data.scenes[line.scene]) err('ref-scene', where, `scene "${line.scene}" does not exist`)
          break
        case 'testimony':
          usedTestimonies.add(line.testimony)
          if (!data.testimonies[line.testimony]) err('ref-testimony', where, `testimony "${line.testimony}" does not exist`)
          break
        default:
          break
      }
    })
  }

  // ---- scenes ----
  for (const [sceneId, scene] of Object.entries(data.scenes)) {
    const seenActionIds = new Set<string>()
    for (const a of scene.actions) {
      const where = `${sceneId}/${a.id}`
      if (seenActionIds.has(a.id)) err('shape-duplicate-action', where, `duplicate action id "${a.id}"`)
      seenActionIds.add(a.id)
      collectCondition(a.when)
      if (a.doneFlag) settableFlags.add(a.doneFlag)
      if (a.kind === 'talk' || a.kind === 'examine') {
        usedScripts.add(a.target)
        if (!data.scripts[a.target]) err('ref-script', where, `script "${a.target}" does not exist`)
      } else if (a.kind === 'move') {
        usedScenes.add(a.target)
        if (!data.scenes[a.target]) err('ref-scene', where, `scene "${a.target}" does not exist`)
      } else {
        usedTestimonies.add(a.target)
        if (!data.testimonies[a.target]) err('ref-testimony', where, `testimony "${a.target}" does not exist`)
      }
    }
  }

  // ---- testimonies + statements ----
  for (const [tid, t] of Object.entries(data.testimonies)) {
    usedSpeakers.add(t.speaker)
    if (!data.speakers[t.speaker]) err('ref-speaker', tid, `speaker "${t.speaker}" does not exist`)

    const ids = new Set<string>()
    const revealed = new Set<string>()
    let hasContradiction = false
    for (const st of t.statements) {
      const where = `${tid}/${st.id}`
      if (ids.has(st.id)) err('shape-duplicate-statement', where, `duplicate statement id "${st.id}"`)
      ids.add(st.id)
      usedScripts.add(st.press.script)
      if (!data.scripts[st.press.script]) err('ref-script', where, `press script "${st.press.script}" does not exist`)
      if (st.press.setsFlag) settableFlags.add(st.press.setsFlag)
      if (st.press.reveals) {
        revealed.add(st.press.reveals)
        if (!t.statements.some((x) => x.id === st.press.reveals)) {
          err('ref-statement', where, `press.reveals "${st.press.reveals}" is not a statement in "${tid}"`)
        }
      }
      if (st.contradiction) {
        hasContradiction = true
        usedScripts.add(st.contradiction.script)
        usedNotes.add(st.contradiction.note)
        if (!data.scripts[st.contradiction.script]) {
          err('ref-script', where, `takedown script "${st.contradiction.script}" does not exist`)
        } else if (!data.scripts[st.contradiction.script]!.some((l) => l.kind === 'moveTo' || l.kind === 'testimony' || l.kind === 'endCase')) {
          err('shape-no-transition', where, `takedown script "${st.contradiction.script}" has no moveTo/testimony/endCase — play would dead-end`)
        }
        if (!data.notes[st.contradiction.note]) err('ref-note', where, `note "${st.contradiction.note}" does not exist`)
        for (const ev of st.contradiction.evidence) {
          if (!data.evidence[ev]) err('ref-evidence', where, `evidence "${ev}" does not exist`)
        }
      }
    }
    if (visibleStatementsOf(t, []).length === 0) {
      err('shape-no-visible-statement', tid, 'testimony has no initially visible statements')
    }
    if (!hasContradiction) err('shape-no-contradiction', tid, 'testimony has no contradiction — confrontation is unwinnable')
    for (const st of t.statements) {
      if (st.hidden && !revealed.has(st.id)) {
        err('shape-hidden-unreachable', `${tid}/${st.id}`, 'hidden statement is never revealed by any press')
      }
    }
  }

  // Stop before the solver if references are broken — it would just chase them.
  if (issues.some((i) => i.level === 'error')) return issues

  // ---- completability: BFS with the real reducer ----
  issues.push(...solve(data))

  // ---- orphans (warnings) ----
  for (const id of Object.keys(data.scripts)) {
    if (!usedScripts.has(id)) warn('orphan-script', id, 'script is never referenced')
  }
  for (const id of Object.keys(data.evidence)) {
    if (!givableEvidence.has(id)) warn('orphan-evidence', id, 'evidence is never given by any script')
  }
  for (const id of Object.keys(data.notes)) {
    if (!usedNotes.has(id)) warn('orphan-note', id, 'note is never shown')
  }
  for (const id of Object.keys(data.testimonies)) {
    if (!usedTestimonies.has(id)) warn('orphan-testimony', id, 'testimony is never entered')
  }
  for (const id of Object.keys(data.speakers)) {
    if (!usedSpeakers.has(id)) warn('orphan-speaker', id, 'speaker never speaks')
  }
  for (const f of referencedFlags) {
    if (!settableFlags.has(f)) warn('orphan-flag', f, 'condition references a flag nothing ever sets')
  }

  return issues
}

/** BFS over reachable states; wrong presents are never explored (they only cost
 * credibility), so the solver proves a penalty-free path start → caseComplete. */
function solve(data: CaseData): LintIssue[] {
  const start = initialState(data)
  const seen = new Set<string>([key(start)])
  const queue: GameState[] = [start]
  const firedContradictions = new Set<string>()
  const enteredTestimonies = new Set<string>()
  let states = 0

  while (queue.length > 0) {
    const s = queue.shift()!
    if (++states > MAX_SOLVER_STATES) {
      return [{ level: 'error', code: 'solver-exploded', where: data.id, message: `search exceeded ${MAX_SOLVER_STATES} states — likely a flag/reveal loop` }]
    }
    if (s.mode === 'caseComplete') return []
    if (s.testimony) enteredTestimonies.add(s.testimony.id)

    for (const { event, jumpTo, fires } of successors(data, s)) {
      let base = s
      if (jumpTo) {
        base = structuredClone(s)
        base.testimony!.statementId = jumpTo
      }
      const next = step(data, base, event).state
      const k = key(next)
      if (!seen.has(k)) {
        seen.add(k)
        queue.push(next)
        if (fires) firedContradictions.add(fires)
      }
    }
  }

  // Exhausted without completing — report what never fired, the actionable bit.
  const problems: string[] = []
  for (const [tid, t] of Object.entries(data.testimonies)) {
    if (!enteredTestimonies.has(tid)) {
      problems.push(`testimony "${tid}" is never reachable`)
      continue
    }
    for (const st of t.statements) {
      if (st.contradiction && !firedContradictions.has(`${tid}/${st.id}`)) {
        problems.push(
          `contradiction on "${tid}/${st.id}" never fires — evidence [${st.contradiction.evidence.join(', ')}] not obtainable by that point`,
        )
      }
    }
  }
  return [{
    level: 'error',
    code: 'solver-not-completable',
    where: data.id,
    message: `no path from start to caseComplete. ${problems.length ? problems.join('; ') : 'play dead-ends before endCase'}`,
  }]
}

interface Successor {
  event: GameEvent
  /** jump the testimony cursor before the event (equivalent to STATEMENT_NEXT chains) */
  jumpTo?: string
  /** contradiction key this edge fires, for reporting */
  fires?: string
}

function successors(data: CaseData, s: GameState): Successor[] {
  if (s.noteShowing) return [{ event: { type: 'ADVANCE' } }]
  switch (s.mode) {
    case 'dialogue':
      return [{ event: { type: 'ADVANCE' } }]
    case 'choice': {
      if (!s.script) return []
      const line = data.scripts[s.script.id]?.[s.script.index]
      if (line?.kind !== 'choice') return []
      return line.options.map((_, i) => ({ event: { type: 'CHOOSE', index: i } as GameEvent }))
    }
    case 'investigation': {
      const scene = s.sceneId ? data.scenes[s.sceneId] : undefined
      if (!scene) return []
      return scene.actions
        .filter((a) => condMet(a.when, s.flags))
        .map((a) => ({ event: { type: 'DO_ACTION', actionId: a.id } as GameEvent }))
    }
    case 'testimony': {
      if (!s.testimony) return []
      const t = data.testimonies[s.testimony.id]
      if (!t) return []
      const out: Successor[] = []
      for (const st of visibleStatementsOf(t, s.testimony.revealed)) {
        out.push({ event: { type: 'PRESS' }, jumpTo: st.id })
        if (st.contradiction) {
          for (const ev of st.contradiction.evidence) {
            if (s.evidence.includes(ev)) {
              out.push({
                event: { type: 'PRESENT', evidence: ev },
                jumpTo: st.id,
                fires: `${s.testimony.id}/${st.id}`,
              })
            }
          }
        }
      }
      return out
    }
    default:
      return [] // gameOver can't occur (no wrong presents); caseComplete is the goal
  }
}

function key(s: GameState): string {
  return JSON.stringify({
    m: s.mode,
    sc: s.script,
    r: s.resume,
    scene: s.sceneId,
    t: s.testimony ? { id: s.testimony.id, st: s.testimony.statementId, rev: [...s.testimony.revealed].sort() } : null,
    ev: [...s.evidence].sort(),
    f: Object.keys(s.flags).sort(),
    pn: s.pendingNote,
    ns: s.noteShowing,
  })
}
