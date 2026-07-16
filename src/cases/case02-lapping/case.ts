// Case 02 — "Ang Paikot na Kolekta" (The Rolling Collection)
// Lapping in AR at Mabuhay Beverage Distributors.
// 4 scenes · 11 evidence · 6 speakers · 5 testimony rounds · 5 contradictions · 7 reviewer notes.

import type { CaseData, Scene, SceneId, Testimony, TestimonyId } from '../../engine/types'
import { evidence, notes, speakers } from './data'
import { scripts } from './scripts'

const scenes: Record<SceneId, Scene> = {
  warehouse: {
    name: 'Mabuhay Beverage — Warehouse Office',
    backgroundId: 'bg-warehouse',
    musicId: 'investigation',
    actions: [
      { id: 'olivia', label: 'Kausapin si Madam Olivia', kind: 'talk', target: 'sc2-olivia', doneFlag: 'f2-did-olivia' },
      { id: 'orbook', label: 'Suriin ang OR booklet ni Ryan', kind: 'examine', target: 'sc2-orbook', doneFlag: 'f2-did-orbook' },
      {
        id: 'deposits',
        label: 'Hanapin ang deposit slips ng June',
        kind: 'examine',
        target: 'sc2-deposits',
        when: { allOf: ['f2-orbook'] },
        doneFlag: 'f2-did-deposits',
      },
      { id: 'ryan', label: 'Kausapin si Ryan', kind: 'talk', target: 'sc2-ryan-1', doneFlag: 'f2-did-ryan' },
      {
        id: 'testify1',
        label: 'Kunin ang testimonya ni Ryan',
        kind: 'testimony',
        target: 't1-sistema',
        when: { allOf: ['f2-olivia', 'f2-orbook', 'f2-deposits', 'f2-ready-t1'] },
      },
    ],
  },

  sarisari: {
    name: 'Tindahan ni Aling Baby',
    backgroundId: 'bg-sarisari',
    musicId: 'investigation',
    actions: [
      { id: 'baby', label: 'Kausapin si Aling Baby', kind: 'talk', target: 'sc2-baby', doneFlag: 'f2-did-baby' },
      {
        id: 'listahan',
        label: 'Tingnan ang listahan ng tindahan',
        kind: 'examine',
        target: 'sc2-listahan',
        when: { allOf: ['f2-baby'] },
        doneFlag: 'f2-did-listahan',
      },
      {
        id: 'lag',
        label: 'Kausapin si Ate Cess sa analytics',
        kind: 'talk',
        target: 'sc2-lag',
        when: { allOf: ['f2-baby'] },
        doneFlag: 'f2-did-lag',
      },
      {
        id: 'back',
        label: 'Balik sa warehouse — harapin si Ryan',
        kind: 'talk',
        target: 'sc2-back-warehouse',
        when: { allOf: ['f2-baby', 'f2-listahan', 'f2-lag'] },
      },
    ],
  },

  warehouse2: {
    name: 'Mabuhay Beverage — Matapos ang Amin',
    backgroundId: 'bg-warehouse',
    musicId: 'investigation',
    actions: [
      { id: 'folder', label: 'Suriin ang route folder ni Ryan', kind: 'examine', target: 'sc2-folder', doneFlag: 'f2-did-folder' },
      {
        id: 'hr',
        label: 'Hingin kay Madam Olivia ang HR file',
        kind: 'talk',
        target: 'sc2-hr',
        when: { allOf: ['f2-notice'] },
        doneFlag: 'f2-did-hr',
      },
      {
        id: 'conf',
        label: 'Pumunta sa exit conference',
        kind: 'talk',
        target: 'sc2-to-conf2',
        when: { allOf: ['f2-notice', 'f2-advances'] },
      },
    ],
  },

  conference2: {
    name: 'Mabuhay Beverage — Conference Room',
    backgroundId: 'bg-conference',
    musicId: 'testimony',
    actions: [{ id: 'open', label: 'Simulan ang exit conference', kind: 'talk', target: 'sc2-conf-open' }],
  },
}

const testimonies: Record<TestimonyId, Testimony> = {
  // Round 1 — the aging schedule contradicts "walang reklamo".
  't1-sistema': {
    title: 'Ang Sistema Ko',
    speaker: 'ryan',
    musicId: 'testimony',
    hints: [
      'Ang kuwento niya, maganda. Pero may schedule ka sa Working Papers na may dalawang tickmark. Ano ulit ang ibig sabihin ng mga iyon?',
      'Sabi niya kuntento lahat ng customer. Ang aging schedule mo mismo ang nagsasabing dalawa ang galit — sa parehong ruta niya.',
    ],
    statements: [
      { id: 't1-s1', text: 'Trenta ang tindahan sa ruta ko. Ako ang top collector ng Mabuhay.', press: { script: 'sc2-t1-p1' } },
      {
        id: 't1-s2',
        text: 'Lahat ng koleksyon ko, same day na nadedeposito. Sistema ko \'yan.',
        press: { script: 'sc2-t1-p2', reveals: 't1-s5' },
      },
      { id: 't1-s3', text: 'Hindi ko pinapahawak ang ruta ko kahit kanino. Personalized service.', press: { script: 'sc2-t1-p3' } },
      {
        id: 't1-s4',
        text: 'Walang customer na nagrereklamo sa akin. Lahat sila, kuntento.',
        press: { script: 'sc2-t1-p4' },
        contradiction: { evidence: ['ev-aging'], script: 'sc2-t1-break', note: 'note-confirmation' },
      },
      {
        id: 't1-s5',
        text: 'Okay — minsan next banking day. Pero \'yon lang talaga ang delay. Promise.',
        hidden: true,
        pose: 'nervous',
        press: { script: 'sc2-t1-p2' },
      },
    ],
  },

  // Round 2 — the customer's ORIGINAL OR contradicts the duplicate's date.
  't2-1102': {
    title: 'Ang Bayad ni Aling Baby',
    speaker: 'ryan',
    musicId: 'testimony',
    hints: [
      'Pansinin mo, Jun: ang duplicate, ang deposit slip, ang posting — magkakasundo silang lahat. Ano ang TANGING papel na hindi galing sa loob ng kompanya?',
      'Sa hierarchy ng ebidensiya, ang original na hawak ng customer ang hindi naaabot ng kamay ng nandaya. Ikumpara mo ang petsa nito sa sinasabi niya.',
    ],
    statements: [
      { id: 't2-s1', text: 'Si Aling Baby, nagbayad noong June 17. Kabisado ko \'yon.', press: { script: 'sc2-t2-p1' } },
      { id: 't2-s2', text: 'Nasa deposit slip mismo ang ₱8,000 noong June 17. May bank stamp.', press: { script: 'sc2-t2-p2' } },
      {
        id: 't2-s3',
        text: 'At ang duplicate OR ang patunay — June 17 ang nakasulat. Opisyal \'yon.',
        press: { script: 'sc2-t2-p3' },
        contradiction: { evidence: ['ev-or-cust'], script: 'sc2-t2-break', note: 'note-lapping' },
      },
    ],
  },

  // Round 2b — the subsidiary ledger contradicts "buo ang hawak ko".
  't2b-buo': {
    title: 'Hawak Ko Lang Saglit',
    speaker: 'ryan',
    musicId: 'cornered',
    hints: [
      'Sabi niya "buo" ang hawak niya. Kung ganoon, kaninong pera ang pumasok sa bangko noong June 17? Binigyan kita ng trace kanina.',
      'Ang subsidiary ledger memo — sundan mo kung kaninong account napunta ang bayad ni Mang Turo. Iyan mismo ang hugis ng lapping.',
    ],
    statements: [
      {
        id: 't2b-s1',
        text: 'Na-delay lang ang deposito! Buong-buo ang pera sa bag ko — hindi ko ginalaw ni piso.',
        pose: 'nervous',
        press: { script: 'sc2-t2b-p1' },
        contradiction: { evidence: ['ev-subledger'], script: 'sc2-t2b-break', note: 'note-intact' },
      },
      { id: 't2b-s2', text: 'Noong June 17, dineposito ko na — ayon mismo sa schedule ko.', press: { script: 'sc2-t2b-p2' } },
    ],
  },

  // Round 3 — the 5-6 notice contradicts "walang utang, walang bisyo".
  't3-amin': {
    title: 'Ang Totoo',
    speaker: 'ryan',
    musicId: 'cornered',
    hints: [
      'Inamin na niya ang delays, pero itinatanggi pa rin niya ang DAHILAN. May nahanap ka sa route folder niya, hindi ba?',
      'Ang final notice na tiklop nang tiklop. Lingguhang hulog sa five-six — iyan ang pressure na umiikot sa buong kaso.',
    ],
    statements: [
      {
        id: 't3-s1',
        text: 'Aaminin ko ang delays. Pero wala akong bisyo, wala akong utang, wala akong pinagkakagastusan.',
        pose: 'nervous',
        press: { script: 'sc2-t3-p1' },
        contradiction: { evidence: ['ev-56notice'], script: 'sc2-t3-break', note: 'note-redflags' },
      },
      { id: 't3-s2', text: 'Gagastusin ko lang sana muna. Isang beses. Tapos ibabalik ko agad.', press: { script: 'sc2-t3-p2' } },
    ],
  },

  // Round 4 — the engagement letter contradicts "the report stops with me".
  't4-tahimik': {
    title: 'Tahimik Lang',
    speaker: 'olivia',
    musicId: 'testimony',
    hints: [
      'Alam kong mabigat ito — kliyente natin siya. Pero tanungin mo ang sarili mo: hanggang kanino DAPAT umabot ang report na ito, ayon sa pamantayan?',
      'May dokumentong pirmado ni Madam Olivia mismo na sumasagot diyan. Ibinigay ko sa iyo bago tayo pumasok.',
    ],
    statements: [
      {
        id: 't4-s1',
        text: 'Tatanggalin ko si Ryan nang tahimik. Resignation. Walang kaso, walang eskandalo.',
        press: { script: 'sc2-t4-p1' },
      },
      {
        id: 't4-s2',
        text: 'Ang report niyo ay sa akin lang pupunta — at dito lang titigil ang usapang ito.',
        pose: 'stern',
        press: { script: 'sc2-t4-p2' },
        contradiction: { evidence: ['ev-engagement'], script: 'sc2-t4-break', note: 'note-governance' },
      },
    ],
  },
}

export const case02: CaseData = {
  id: 'case02-lapping',
  schemaVersion: 1,
  title: 'Kaso 2: Ang Paikot na Kolekta',
  credibilityMax: 5,
  speakers,
  evidence,
  notes,
  scenes,
  scripts,
  testimonies,
  startScript: 'sc2-start',
  wrongPresentScript: 'sc2-wrong',
}
