// "Tanong kay Ate Cess" — tiered consult hints, computed purely from
// (CaseData, GameState) so they're testable headlessly.
//
// Testimony tiers: authored hints (concept nudges, mildest first) → generated
// "which statement" → generated "which evidence". If the target statement is
// still hidden, press-guidance tiers come first — you can't present at a
// statement you haven't heard.

import type { CaseData, Statement, Testimony } from './types'
import type { GameState } from './state'
import { condMet } from './reducer'

function clip(text: string, max = 48): string {
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`
}

export function hintsFor(data: CaseData, state: GameState): string[] {
  if (state.mode === 'testimony' && state.testimony) {
    const t = data.testimonies[state.testimony.id]
    if (t) return testimonyHints(data, state, t)
  }
  if (state.mode === 'investigation') return investigationHints(data, state)
  return ['Ituloy mo lang muna ang usapan. Kapag kailangan mo ako, nandito lang ako.']
}

function testimonyHints(data: CaseData, state: GameState, t: Testimony): string[] {
  const target = t.statements.find((s: Statement) => s.contradiction)
  if (!target?.contradiction) {
    // linter forbids contradiction-less testimonies; stay graceful anyway
    return ['Diinan mo ang bawat statement — pakinggan mo kung saan humahaba ang paliwanag.']
  }

  const out: string[] = [...(t.hints ?? [])]
  if (out.length === 0) {
    out.push(
      'Isa sa mga statement ay direktang kontra sa isang papel sa Working Papers mo. Basahin mo ulit ang bawat isa — dahan-dahan.',
    )
  }

  const revealed = state.testimony?.revealed ?? []
  const targetVisible = !target.hidden || revealed.includes(target.id)
  if (!targetVisible) {
    const revealer = t.statements.find((s) => s.press.reveals === target.id)
    out.push('May hindi pa siya sinasabi. Hindi mo maipapakita ang kontra sa kuwentong hindi mo pa naririnig.')
    out.push(
      revealer
        ? `Diinan mo ang statement na: "${clip(revealer.text)}" — may kasunod pa iyon.`
        : 'Diinan mo ang bawat statement hanggang may bago siyang sabihin.',
    )
  }

  out.push(`Balikan mo ang statement na: "${clip(target.text)}"`)

  const evidenceNames = target.contradiction.evidence
    .map((id) => data.evidence[id]?.name)
    .filter((n): n is string => Boolean(n))
  const owned = target.contradiction.evidence.some((id) => state.evidence.includes(id))
  if (owned) {
    out.push(`Iharap mo ang "${evidenceNames[0] ?? '?'}" laban sa statement na iyon. Sagot na iyan, Jun.`)
  } else {
    // The soft-lock linter check makes this unreachable in shipped cases.
    out.push(`Ang sagot ay ang "${evidenceNames[0] ?? '?'}" — pero wala pa iyon sa Working Papers mo.`)
  }
  return out
}

function investigationHints(data: CaseData, state: GameState): string[] {
  const scene = state.sceneId ? data.scenes[state.sceneId] : undefined
  if (!scene) return ['Tingnan mo ang paligid. Laging may hindi pa nasusuri.']

  const visible = scene.actions.filter((a) => condMet(a.when, state.flags))
  const undone = visible.find((a) => a.doneFlag && !state.flags[a.doneFlag])
  if (undone) {
    return [
      'May hindi ka pa nagagawa sa lugar na ito. Ang audit ay hindi pinipili ang madali — sinusuri ang lahat.',
      `Subukan mo: "${undone.label}"`,
    ]
  }
  const proceed = visible.find((a) => !a.doneFlag)
  if (proceed) {
    return [
      'Kumpleto ka na dito sa tingin ko. Oras na para sumulong.',
      `Handa ka na. Piliin mo: "${proceed.label}"`,
    ]
  }
  return ['Balikan mo ang mga nagawa mo na — may aksyon na magbubukas kapag kumpleto ang kailangan nito.']
}
