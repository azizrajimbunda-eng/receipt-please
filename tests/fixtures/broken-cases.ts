// Seeded authoring mistakes: each fixture is the micro case with exactly one
// defect the linter must catch with a specific code.

import type { CaseData } from '../../src/engine/types'
import { microCase } from '../../src/cases/micro-meryenda/case'

function mutate(fn: (c: CaseData) => void): CaseData {
  const c = structuredClone(microCase)
  fn(c)
  return c
}

/** give references evidence that doesn't exist → ref-evidence */
export const refEvidence = mutate((c) => {
  c.scripts['sc-trash'] = [
    { kind: 'narrate', text: 'x' },
    { kind: 'give', evidence: 'ev-ghost' },
  ]
})

/** goto to a label that doesn't exist → ref-label */
export const refLabel = mutate((c) => {
  c.scripts['sc-cess']![3] = { kind: 'goto', label: 'nowhere' }
})

/** takedown script with no moveTo/testimony/endCase → shape-no-transition */
export const noTransition = mutate((c) => {
  c.scripts['sc-takedown'] = c.scripts['sc-takedown']!.slice(0, -1)
})

/** hidden statement that no press ever reveals → shape-hidden-unreachable */
export const hiddenUnreachable = mutate((c) => {
  delete c.testimonies['t-jopay']!.statements[1]!.press.reveals
})

/** contradiction evidence never given anywhere → solver-not-completable */
export const notCompletable = mutate((c) => {
  c.scripts['sc-trash'] = [{ kind: 'narrate', text: 'Walang laman ang basurahan.' }]
})

/** testimony enterable BEFORE its contradiction evidence exists → solver-softlock.
 * (Case stays completable via the good order — the bad order is the defect.) */
export const softlockable = mutate((c) => {
  const testify = c.scenes['pantry']!.actions.find((a) => a.id === 'testify')!
  testify.when = { allOf: ['f-tally'] } // dropped f-resibo: enter without the milk tea OR
})

/** an extra script nothing references → orphan-script (warning, still completable) */
export const orphanScript = mutate((c) => {
  c.scripts['sc-unused'] = [{ kind: 'narrate', text: 'hello?' }]
})
