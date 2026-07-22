// Case 04 — "Ang Presyo ng Payo" (The Price of Advice)
// Management Advisory Services: a self-serving feasibility study whose four
// recommendations are each a classic relevant-costing fallacy.
// 4 scenes · 10 evidence · 6 speakers · 4 testimony rounds · 4 contradictions · 7 reviewer notes.

import type { CaseData, Scene, SceneId, Testimony, TestimonyId } from '../../engine/types'
import { evidence, notes, speakers } from './data'
import { scripts } from './scripts'

const scenes: Record<SceneId, Scene> = {
  bakery: {
    name: 'Bibingka ni Aling Rosa — Commissary',
    backgroundId: 'bg-bakery',
    musicId: 'investigation',
    actions: [
      { id: 'rosa', label: 'Kausapin si Aling Rosa', kind: 'talk', target: 'sc4-rosa', doneFlag: 'f4-did-rosa' },
      { id: 'nina', label: 'Kausapin si Nina', kind: 'talk', target: 'sc4-nina', doneFlag: 'f4-did-nina' },
      {
        id: 'floor',
        label: 'Libutin ang production floor',
        kind: 'examine',
        target: 'sc4-floor',
        when: { allOf: ['f4-nina'] },
        doneFlag: 'f4-did-floor',
      },
      {
        id: 'orderfile',
        label: 'Suriin ang Hotel Mirador order',
        kind: 'examine',
        target: 'sc4-orderfile',
        when: { allOf: ['f4-nina'] },
        doneFlag: 'f4-did-order',
      },
      {
        id: 'recast',
        label: 'Tanungin si Ate Cess sa segment recast',
        kind: 'talk',
        target: 'sc4-recast',
        when: { allOf: ['f4-nina'] },
        doneFlag: 'f4-did-recast',
      },
      { id: 'marco', label: 'Kausapin si Marco', kind: 'talk', target: 'sc4-marco-1', doneFlag: 'f4-did-marco' },
      {
        id: 'testify1',
        label: 'Kunin ang testimonya ni Marco',
        kind: 'testimony',
        target: 't1-espesyal',
        when: { allOf: ['f4-rosa', 'f4-capacity', 'f4-order', 'f4-recast', 'f4-ready-t1'] },
      },
    ],
  },

  records: {
    name: 'Bibingka ni Aling Rosa — Office',
    backgroundId: 'bg-office',
    musicId: 'investigation',
    actions: [
      { id: 'quote', label: 'Suriin ang MZR Foods quotation', kind: 'examine', target: 'sc4-quote', doneFlag: 'f4-did-quote' },
      {
        id: 'nina2',
        label: 'Kausapin si Nina tungkol sa MZR',
        kind: 'talk',
        target: 'sc4-nina2',
        when: { allOf: ['f4-quote'] },
        doneFlag: 'f4-did-nina2',
      },
      {
        id: 'relevant',
        label: 'Tanungin si Ate Cess sa relevant costing',
        kind: 'talk',
        target: 'sc4-relevant',
        when: { allOf: ['f4-quote'] },
        doneFlag: 'f4-did-relevant',
      },
      {
        id: 'hurno',
        label: 'Gawin ang Project Hurno incremental analysis',
        kind: 'examine',
        target: 'sc4-hurno',
        when: { allOf: ['f4-sec', 'f4-relevant'] },
        doneFlag: 'f4-did-hurno',
      },
      {
        id: 'conf',
        label: 'Pumunta sa comedor (presentation)',
        kind: 'talk',
        target: 'sc4-to-conf4',
        when: { allOf: ['f4-quote', 'f4-sec', 'f4-relevant', 'f4-hurno'] },
      },
    ],
  },

  comedor: {
    name: 'Bibingka ni Aling Rosa — Comedor',
    backgroundId: 'bg-conference',
    musicId: 'testimony',
    actions: [{ id: 'open', label: 'Simulan ang presentation review', kind: 'talk', target: 'sc4-conf-open' }],
  },

  // (comedor holds testimonies 2-4; no free-roam scene between them)
}

const testimonies: Record<TestimonyId, Testimony> = {
  // Round 1 — the recast contradicts the "₱120k loss" (keep-or-drop).
  't1-espesyal': {
    title: 'Lugi ang Espesyal',
    speaker: 'marco',
    musicId: 'testimony',
    hints: [
      'Ang "lugi" ni Marco ay may kasamang ₱500,000 na ALLOCATED costs. Itigil man ang linya, mananatili ba ang upa ng head office?',
      'Ginawa na ni Ate Cess ang recast — segment margin, avoidable costs lang. Hanapin mo ang statement niyang "hindi mababawi ang ₱120,000".',
    ],
    statements: [
      { id: 't1-s1', text: 'Nasa mismong P&L nila ang ₱120,000 na net loss. Hindi ako nag-imbento — data-driven ako.', press: { script: 'sc4-t1-p1' } },
      { id: 't1-s2', text: 'Ang bottom line ay bottom line. Negatibo ang Espesyal, kaya itigil na.', press: { script: 'sc4-t1-p2', reveals: 't1-s4' } },
      {
        id: 't1-s3',
        text: 'Kapag itinigil ito, mababawi ng kompanya ang ₱120,000 na iyon kada taon. Malinaw.',
        press: { script: 'sc4-t1-p3' },
        contradiction: { evidence: ['ev-recast'], script: 'sc4-t1-break', note: 'note-segment' },
      },
      {
        id: 't1-s4',
        text: 'Ang contribution margin? Nasa appendix iyon. Hindi iyon ang bottom line na mahalaga.',
        hidden: true,
        pose: 'nervous',
        press: { script: 'sc4-t1-p2' },
      },
    ],
  },

  // Round 2 — the relevant costing schedule contradicts "reject the order".
  't2-hotel': {
    title: 'Tanggihan ang Hotel Order',
    speaker: 'marco',
    musicId: 'testimony',
    hints: [
      'Ang "₱22 cost" ni Marco ay may ₱9 na allocated overhead na nariyan na, order man o wala. Ano ang mahalaga: kapasididad. Ilan ang porsiyento ng gamit?',
      'Ginawa ni Ate Cess ang relevant costing schedule. Sa idle capacity, presyo laban sa variable. Hanapin mo ang statement niya tungkol sa ₱22.',
    ],
    statements: [
      { id: 't2-s1', text: '₱22 ang total cost kada piraso; ₱18 lang ang alok. Lugi ng ₱4 — dapat tanggihan.', press: { script: 'sc4-t2-p1' } },
      {
        id: 't2-s2',
        text: 'Kahit anong ikot niyo, ₱22 ang gastos. Ang cost ay cost. Simpleng aritmetika.',
        pose: 'nervous',
        press: { script: 'sc4-t2-p2' },
        contradiction: { evidence: ['ev-relevant'], script: 'sc4-t2-break', note: 'note-special' },
      },
    ],
  },

  // Round 3 — the SEC registration contradicts "no connection to MZR".
  't3-mzr': {
    title: 'Ang Pinakamurang Supplier',
    speaker: 'marco',
    musicId: 'cornered',
    hints: [
      'MZR Foods. Marco Z. Reyes. Tiningnan ni Nina kung kanino talaga pag-aari ang "pinakamurang supplier". Hindi iyon nagkataon.',
      'Ang SEC registration ng MZR. Hanapin mo ang statement kung saan itinatanggi ni Marco ang koneksiyon — doon mo iharap.',
    ],
    statements: [
      { id: 't3-s1', text: 'Tatlong supplier ang kinanvass ko. Pormal, sealed. Ang MZR ang pumasa sa presyo at kalidad.', press: { script: 'sc4-t3-p1' } },
      {
        id: 't3-s2',
        text: 'Wala akong kahit anong koneksiyon sa MZR Foods. Independent kong pinili — pinakamura sila.',
        pose: 'nervous',
        press: { script: 'sc4-t3-p2' },
        contradiction: { evidence: ['ev-sec'], script: 'sc4-t3-break', note: 'note-ethics' },
      },
    ],
  },

  // Round 4 — the incremental analysis contradicts the client's own sunk-cost defense.
  't4-puhunan': {
    title: 'Protektahan ang Puhunan',
    speaker: 'rosa',
    musicId: 'testimony',
    hints: [
      'Ito ang pinakamabait na laban mo, Jun. Hindi manloloko si Aling Rosa — ayaw lang niyang aminin na tapos na. Ano ang tawag sa ₱2M na nagastos na?',
      'Ang Project Hurno memo. Ang ₱2M ay sunk — wala nang boto. Iharap mo ang analysis sa pangungusap na nanghahawak sa nakaraan, at dahan-dahanin mo.',
    ],
    statements: [
      { id: 't4-s1', text: 'Malapit nang matapos ang bagong pugon. Kailangan ng negosyo ang dagdag na kapasidad para lumago.', press: { script: 'sc4-t4-p1' } },
      {
        id: 't4-s2',
        text: 'Dalawang milyon na ang puhunan ko sa Project Hurno. Hindi ko itatapon ang pinaghirapan ko.',
        press: { script: 'sc4-t4-p2' },
        contradiction: { evidence: ['ev-hurno'], script: 'sc4-t4-break', note: 'note-sunk' },
      },
    ],
  },
}

export const case04: CaseData = {
  id: 'case04-mas',
  schemaVersion: 1,
  title: 'Kaso 4: Ang Presyo ng Payo',
  credibilityMax: 5,
  speakers,
  evidence,
  notes,
  scenes,
  scripts,
  testimonies,
  startScript: 'sc4-start',
  wrongPresentScript: 'sc4-wrong',
}
