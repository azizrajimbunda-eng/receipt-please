// Case 03 — "Ang Sweldo ng Multo" (The Ghost's Salary)
// Ghost employee payroll fraud at Tibay Builders, sustained by collusion.
// 4 scenes · 11 evidence · 6 speakers · 4 testimony rounds · 4 contradictions · 7 reviewer notes.

import type { CaseData, Scene, SceneId, Testimony, TestimonyId } from '../../engine/types'
import { evidence, notes, speakers } from './data'
import { scripts } from './scripts'

const scenes: Record<SceneId, Scene> = {
  site: {
    name: 'Tibay Builders — Site A',
    backgroundId: 'bg-site',
    musicId: 'investigation',
    actions: [
      { id: 'igme', label: 'Kausapin si Foreman Igme', kind: 'talk', target: 'sc3-igme', doneFlag: 'f3-did-igme' },
      { id: 'dtr', label: 'Suriin ang DTR bundle', kind: 'examine', target: 'sc3-dtr', doneFlag: 'f3-did-dtr' },
      {
        id: 'bulletin',
        label: 'Tingnan ang bulletin board',
        kind: 'examine',
        target: 'sc3-bulletin',
        when: { allOf: ['f3-dtr'] },
        doneFlag: 'f3-did-bulletin',
      },
      {
        id: 'weng',
        label: 'Kausapin ang timekeeper',
        kind: 'talk',
        target: 'sc3-weng',
        when: { allOf: ['f3-dtr'] },
        doneFlag: 'f3-did-weng',
      },
      {
        id: 'testify1',
        label: 'Kunin ang testimonya ni Foreman Igme',
        kind: 'testimony',
        target: 't1-tropa',
        when: { allOf: ['f3-igme', 'f3-dtr', 'f3-closure', 'f3-weng', 'f3-ready-t1'] },
      },
    ],
  },

  admin: {
    name: 'Tibay Builders — Admin Office',
    backgroundId: 'bg-office',
    musicId: 'investigation',
    actions: [
      { id: 'file201', label: 'Hilingin ang 201 file ni dela Peña', kind: 'examine', target: 'sc3-201', doneFlag: 'f3-did-201' },
      {
        id: 'remit',
        label: 'Ihanay ang SSS R-3 sa register',
        kind: 'examine',
        target: 'sc3-remit',
        when: { allOf: ['f3-201'] },
        doneFlag: 'f3-did-remit',
      },
      { id: 'nestor', label: 'Kausapin si Sir Nestor', kind: 'talk', target: 'sc3-nestor-1', doneFlag: 'f3-did-nestor' },
      {
        id: 'testify2',
        label: 'Kunin ang testimonya ni Sir Nestor',
        kind: 'testimony',
        target: 't2-papeles',
        when: { allOf: ['f3-201', 'f3-remit', 'f3-ready-t2'] },
      },
    ],
  },

  payout: {
    name: 'Site A — Sabado ng Sweldo',
    backgroundId: 'bg-site',
    musicId: 'investigation',
    actions: [
      { id: 'observe', label: 'Obserbahan ang payout', kind: 'examine', target: 'sc3-payout', doneFlag: 'f3-did-observe' },
      {
        id: 'weng2',
        label: 'Kausapin si Weng nang sarilinan',
        kind: 'talk',
        target: 'sc3-weng2',
        when: { allOf: ['f3-payout'] },
        doneFlag: 'f3-did-weng2',
      },
      {
        id: 'signatures',
        label: 'Suriin ang payroll acknowledgments',
        kind: 'examine',
        target: 'sc3-signatures',
        when: { allOf: ['f3-payout'] },
        doneFlag: 'f3-did-signatures',
      },
      {
        id: 'compare',
        label: 'Ipakita kay Ate Cess ang mga pirma',
        kind: 'talk',
        target: 'sc3-compare',
        when: { allOf: ['f3-signatures'] },
        doneFlag: 'f3-did-compare',
      },
      {
        id: 'conf',
        label: 'Pumunta sa exit conference',
        kind: 'talk',
        target: 'sc3-to-conf3',
        when: { allOf: ['f3-payout', 'f3-wenglog', 'f3-compare'] },
      },
    ],
  },

  conference3: {
    name: 'Tibay Builders — Conference Room',
    backgroundId: 'bg-conference',
    musicId: 'testimony',
    actions: [{ id: 'open', label: 'Simulan ang exit conference', kind: 'talk', target: 'sc3-conf-open' }],
  },
}

const testimonies: Record<TestimonyId, Testimony> = {
  // Round 1 — the foreman's own closure memo contradicts the perfect August.
  't1-tropa': {
    title: 'Kumpleto ang Tropa Ko',
    speaker: 'igme',
    musicId: 'testimony',
    hints: [
      'Ang DTR ni dela Peña ay perpekto — masyadong perpekto. May nakita ka sa bulletin board na ginawang imposible ang dalawang araw doon.',
      'Sino mismo ang pumirma sa memo na nagsara ng site noong Agosto uno at dos? Basahin mo ulit ang statement niya tungkol sa Agosto.',
    ],
    statements: [
      { id: 't1-s1', text: 'Dalawampung taon na ako dito. Kilala ko ang bawat taong pumapasok sa site na ito.', press: { script: 'sc3-t1-p1' } },
      { id: 't1-s2', text: 'Ako mismo ang nag-ce-certify ng bawat DTR. Walang lusot sa akin.', press: { script: 'sc3-t1-p2', reveals: 't1-s5' } },
      {
        id: 't1-s3',
        text: 'Tuloy-tuloy ang trabaho namin buong Agosto. Walang absent si dela Peña ni isang araw.',
        press: { script: 'sc3-t1-p3' },
        contradiction: { evidence: ['ev-closure'], script: 'sc3-t1-break', note: 'note-dtr' },
      },
      { id: 't1-s4', text: 'Si Erning dela Peña? Nandiyan lang \'yon. Nagkataon lang na wala ngayon.', pose: 'nervous', press: { script: 'sc3-t1-p4' } },
      {
        id: 't1-s5',
        text: 'Maaga lang talaga pumapasok si Erning — una pa sa timekeeper, kaya hindi siya nakikita ni Weng.',
        hidden: true,
        pose: 'nervous',
        press: { script: 'sc3-t1-p3' },
      },
    ],
  },

  // Round 2 — the SSS R-3 contradicts "remitted lahat".
  't2-papeles': {
    title: 'Ayos ang Papeles',
    speaker: 'nestor',
    musicId: 'testimony',
    hints: [
      'Ang lahat ng papel ni Sir Nestor ay panloob — register, sobre, file. Anong dokumento ang lumalabas ng kompanya papunta sa gobyerno?',
      'Inihanay mo na ang R-3 sa register. Animnapu laban sa animnapu\'t isa. Hanapin mo ang statement niya tungkol sa remittance.',
    ],
    statements: [
      { id: 't2-s1', text: 'Dalawampu\'t limang taon akong nag-a-asikaso ng payroll. Walang diskuwento, walang delay.', press: { script: 'sc3-t2-p1' } },
      { id: 't2-s2', text: 'Ako ang naghahanda ng bawat sobre — mula bilang hanggang selyo, ayon sa register.', press: { script: 'sc3-t2-p2' } },
      {
        id: 't2-s3',
        text: 'Kumpleto ang kaltas ni dela Peña at remitted lahat — SSS, PhilHealth, Pag-IBIG. Nasa records.',
        press: { script: 'sc3-t2-p3' },
        contradiction: { evidence: ['ev-remit'], script: 'sc3-t2-break', note: 'note-remittance' },
      },
    ],
  },

  // Round 3 — the handwriting comparison contradicts "never touched his signature".
  't3-malinis': {
    title: 'Malinis ang Kamay Ko',
    speaker: 'nestor',
    musicId: 'cornered',
    hints: [
      'Tatlumpu\'t dalawang linggo ng pirma ni "dela Peña". Sino ang nagsuri ng mga loop ng letra habang abala ka sa payout?',
      'Ang handwriting comparison ni Ate Cess. Hanapin mo ang statement niya tungkol sa pirma — doon mo siya salubungin.',
    ],
    statements: [
      { id: 't3-s1', text: 'Hindi ko kilala si dela Peña nang personal. Si Foreman ang nakakakilala sa mga tao.', press: { script: 'sc3-t3-p1' } },
      { id: 't3-s2', text: 'Trabaho ko ang sobre, hindi ang tao. Kung may multo sa listahan, hindi ako ang naglagay.', press: { script: 'sc3-t3-p2' } },
      {
        id: 't3-s3',
        text: 'At ni minsan, hindi ko hinawakan ang pirma niya. Ang pirma ay sa nagbabayaran, hindi sa naghahanda.',
        pose: 'nervous',
        press: { script: 'sc3-t3-p2' },
        contradiction: { evidence: ['ev-handwriting'], script: 'sc3-t3-break', note: 'note-forensic' },
      },
    ],
  },

  // Round 4 — the unclaimed envelope contradicts the partner's fatalism.
  't4-aral': {
    title: 'Walang Tatalab',
    speaker: 'alcaraz',
    musicId: 'testimony',
    hints: [
      'Hindi tama na "walang kontrol na tatalab" — may isang kontrol na TUMALAB, kahapon lang. Nasa Working Papers mo pa ang patunay, may laman pang ₱4,200.',
      'Ang sobre na walang kumuha. Ang kontrol na humihingi ng katawan, hindi pirma. Iharap mo iyon sa pangungusap na sumuko na.',
    ],
    statements: [
      {
        id: 't4-s1',
        text: 'Apat na pirma bawat payroll — at walong buwan itong nakalusot. Nadaig ng dalawang magkasabwat ang disenyo.',
        press: { script: 'sc3-t4-p1' },
      },
      {
        id: 't4-s2',
        text: 'Kung ganito, wala tayong maisusulat sa management letter. Laban sa collusion, walang kontrol na tatalab.',
        press: { script: 'sc3-t4-p2' },
        contradiction: { evidence: ['ev-envelope'], script: 'sc3-t4-break', note: 'note-collusion' },
      },
    ],
  },
}

export const case03: CaseData = {
  id: 'case03-ghost-payroll',
  schemaVersion: 1,
  title: 'Kaso 3: Ang Sweldo ng Multo',
  credibilityMax: 5,
  speakers,
  evidence,
  notes,
  scenes,
  scripts,
  testimonies,
  startScript: 'sc3-start',
  wrongPresentScript: 'sc3-wrong',
}
