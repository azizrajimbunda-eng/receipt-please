// Case 01 — "Ang Kulang na Kaha" (The Short Cash Box)
// Petty cash / doctored-OR fraud at Cabrera Trading Corp., FY2023.
// 4 scenes · 11 evidence · 4 testimony rounds · 5 contradictions · 7 reviewer notes.

import type { CaseData, Scene, SceneId, Testimony, TestimonyId } from '../../engine/types'
import { evidence, notes, speakers } from './data'
import { scripts } from './scripts'

const scenes: Record<SceneId, Scene> = {
  office: {
    name: 'Cabrera Trading — Accounting Office',
    backgroundId: 'bg-office',
    musicId: 'investigation',
    actions: [
      { id: 'count', label: 'Surprise cash count', kind: 'examine', target: 'sc-count', doneFlag: 'f-did-count' },
      {
        id: 'vale',
        label: 'Suriin ang vale slip',
        kind: 'examine',
        target: 'sc-vale',
        when: { allOf: ['f-counted'] },
        doneFlag: 'f-did-vale',
      },
      {
        id: 'vouchers',
        label: 'Halungkatin ang voucher file',
        kind: 'examine',
        target: 'sc-vouchers',
        when: { allOf: ['f-counted'] },
        doneFlag: 'f-did-vouchers',
      },
      { id: 'malou', label: 'Kausapin si Malou', kind: 'talk', target: 'sc-malou-1', doneFlag: 'f-did-malou' },
      {
        id: 'testify',
        label: 'Kunin ang testimonya ni Malou',
        kind: 'testimony',
        target: 't1-fund',
        when: { allOf: ['f-counted', 'f-vale', 'f-vouchers', 'f-ready-t1'] },
      },
    ],
  },

  street: {
    name: 'Sampaloc — Harapan ng R&M Merchandise',
    backgroundId: 'bg-street',
    musicId: 'investigation',
    actions: [
      { id: 'store', label: 'Tingnan ang tindahan', kind: 'examine', target: 'sc-store', doneFlag: 'f-did-store' },
      {
        id: 'bong',
        label: 'Kausapin ang katabing tindero',
        kind: 'talk',
        target: 'sc-bong',
        when: { allOf: ['f-photo'] },
        doneFlag: 'f-did-bong',
      },
      {
        id: 'priorfile',
        label: 'Tanungin si Ate Cess tungkol sa prior-year file',
        kind: 'talk',
        target: 'sc-priorfile',
        when: { allOf: ['f-photo'] },
        doneFlag: 'f-did-prior',
      },
      {
        id: 'loupe',
        label: 'Suriin ang OR #0871 sa loupe',
        kind: 'examine',
        target: 'sc-loupe',
        when: { allOf: ['f-genuine'] },
        doneFlag: 'f-did-loupe',
      },
      {
        id: 'back',
        label: 'Bumalik kay Malou',
        kind: 'talk',
        target: 'sc-back-office',
        when: { allOf: ['f-photo', 'f-bong', 'f-ink'] },
      },
    ],
  },

  office2: {
    name: 'Cabrera Trading — Bago ang Exit Conference',
    backgroundId: 'bg-office',
    musicId: 'investigation',
    actions: [
      { id: 'dodong', label: 'Kausapin si Dodong', kind: 'talk', target: 'sc-dodong', doneFlag: 'f-did-dodong' },
      { id: 'analytics', label: 'Tanungin si Ate Cess sa ledger', kind: 'talk', target: 'sc-analytics', doneFlag: 'f-did-analytics' },
      {
        id: 'bundle',
        label: 'Balikan ang voucher bundle',
        kind: 'examine',
        target: 'sc-bundle-again',
        when: { allOf: ['f-ledger'] },
        doneFlag: 'f-did-bundle',
      },
      {
        id: 'conf',
        label: 'Pumunta sa exit conference',
        kind: 'talk',
        target: 'sc-to-conf',
        when: { allOf: ['f-gatelog', 'f-ledger', 'f-hospital'] },
      },
    ],
  },

  conference: {
    name: 'Cabrera Trading — Conference Room',
    backgroundId: 'bg-conference',
    musicId: 'testimony',
    actions: [{ id: 'open', label: 'Simulan ang exit conference', kind: 'talk', target: 'sc-conf-open' }],
  },
}

const testimonies: Record<TestimonyId, Testimony> = {
  // Round 1 — the count contradicts "kumpleto".
  't1-fund': {
    title: 'Kumpleto ang Pondo',
    speaker: 'malou',
    musicId: 'testimony',
    statements: [
      { id: 't1-s1', text: 'Sampung taon na akong custodian dito. Kailanman, walang nawala.', press: { script: 'sc-t1-p1' } },
      {
        id: 't1-s2',
        text: 'Kumpleto ang pondo. Bale... may maliit na vale lang ako.',
        pose: 'nervous',
        press: { script: 'sc-t1-p2', reveals: 't1-s5' },
        contradiction: { evidence: ['ev-count'], script: 'sc-t1-break', note: 'note-imprest' },
      },
      { id: 't1-s3', text: 'Bawat gastos, may resibo. Nakalagay lahat sa voucher file.', press: { script: 'sc-t1-p3' } },
      { id: 't1-s4', text: 'Ako lang ang may susi. Walang ibang nakakahawak ng kaha.', press: { script: 'sc-t1-p4' } },
      {
        id: 't1-s5',
        text: 'Baka may resibo lang akong naiwan sa bahay. Bukas, dala ko na.',
        hidden: true,
        pose: 'nervous',
        press: { script: 'sc-t1-p2' },
      },
    ],
  },

  // Round 2 — the closed store contradicts the June 12 purchase.
  't2-purchase': {
    title: 'Ang R&M Purchase',
    speaker: 'malou',
    musicId: 'testimony',
    statements: [
      { id: 't2-s1', text: 'Pumunta ako sa R&M noong June 12. Bumili ako ng office supplies.', press: { script: 'sc-t2-p1' } },
      {
        id: 't2-s2',
        text: 'Binili ko ang mga \'yon nang mismong araw na \'yon. June 12, hapon.',
        press: { script: 'sc-t2-p1', reveals: 't2-s5' },
        contradiction: { evidence: ['ev-photo'], script: 'sc-t2-break1', note: 'note-existence' },
      },
      { id: 't2-s3', text: 'Sa R&M ako bumili kasi mas mura doon. Kilala ko si Mrs. Ramos.', press: { script: 'sc-t2-p2' } },
      { id: 't2-s4', text: '₱4,850 lahat. Bond paper, ballpen, folder. Bulk order.', pose: 'nervous', press: { script: 'sc-t2-p3' } },
      {
        id: 't2-s5',
        text: 'Si Mrs. Ramos mismo ang nag-abot sa akin ng resibo.',
        hidden: true,
        press: { script: 'sc-t2-p4' },
      },
    ],
  },

  // Round 2b — the ink contradicts the amount.
  't2b-revised': {
    title: 'Ang R&M Purchase (binago)',
    speaker: 'malou',
    musicId: 'testimony',
    statements: [
      { id: 't2b-s1', text: 'Naalala ko na — mas maaga pala \'yon. Abril siguro.', pose: 'nervous', press: { script: 'sc-t2b-p1' } },
      { id: 't2b-s2', text: 'Na-late lang ibigay ang resibo. Nagkamali si Mrs. Ramos ng petsa.', press: { script: 'sc-t2b-p2' } },
      {
        id: 't2b-s3',
        text: 'Pero tama ang halaga! ₱4,850. Nakasulat mismo sa resibo!',
        press: { script: 'sc-t2b-p3' },
        contradiction: { evidence: ['ev-ink'], script: 'sc-t2b-break', note: 'note-vouching' },
      },
    ],
  },

  // Round 3 — the gate log contradicts "Dodong did it".
  't3-final': {
    title: 'Si Dodong ang Bumili',
    speaker: 'malou',
    musicId: 'cornered',
    statements: [
      {
        id: 't3-s1',
        text: 'Si Dodong ang pinabili ko. Siya ang may hawak ng pera noong June 12.',
        pose: 'nervous',
        press: { script: 'sc-t3-p1' },
        contradiction: { evidence: ['ev-gatelog'], script: 'sc-t3-break1', note: 'note-skepticism' },
      },
      { id: 't3-s2', text: 'Wala akong kinuha sa pondo. Ni isang piso.', press: { script: 'sc-t3-p2' } },
      { id: 't3-s3', text: 'Wala akong problema sa pera. Sapat ang sweldo ko.', press: { script: 'sc-t3-p3' } },
      { id: 't3-s4', text: 'Ako lang ang may susi. Pinagkatiwalaan nila ako.', press: { script: 'sc-t3-p4' } },
    ],
  },

  // Round 3b — the hospital bill contradicts "no money problems".
  't3b-last': {
    title: 'Wala Akong Problema',
    speaker: 'malou',
    musicId: 'cornered',
    statements: [
      {
        id: 't3b-s1',
        text: 'Wala akong problema sa pera. Kaya ko naman ang lahat.',
        pose: 'nervous',
        press: { script: 'sc-t3b-p1' },
        contradiction: { evidence: ['ev-hospital'], script: 'sc-t3b-break', note: 'note-triangle' },
      },
      { id: 't3b-s2', text: 'Hiniram ko lang. Babayaran ko rin naman lahat.', press: { script: 'sc-t3b-p2' } },
    ],
  },

  // Round 4 — the closing beat: the company's controls are also a finding.
  't4-close': {
    title: 'Ang Management Letter',
    speaker: 'alcaraz',
    musicId: 'testimony',
    statements: [
      { id: 't4-s1', text: 'Malinaw ang findings: cash shortage at altered document. Tapos na ang kaso.', press: { script: 'sc-t4-p1' } },
      {
        id: 't4-s2',
        text: 'Isang tao ang may kasalanan dito. Iuulat natin siya, at doon nagtatapos.',
        press: { script: 'sc-t4-p2' },
        contradiction: { evidence: ['ev-policy'], script: 'sc-t4-break', note: 'note-sod' },
      },
    ],
  },
}

export const case01: CaseData = {
  id: 'case01-petty-cash',
  schemaVersion: 1,
  title: 'Kaso 1: Ang Kulang na Kaha',
  credibilityMax: 5,
  speakers,
  evidence,
  notes,
  scenes,
  scripts,
  testimonies,
  startScript: 'sc-start',
  wrongPresentScript: 'sc-wrong',
}
