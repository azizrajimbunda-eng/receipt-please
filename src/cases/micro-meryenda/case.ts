// Micro case: the smallest complete case. Exercises every schema feature
// (choice, branch, give, flags, checkpoint, press-reveal, contradiction,
// wrong-present, standalone note, endCase) and doubles as the dev/test fixture.

import type { CaseData } from '../../engine/types'

export const microCase: CaseData = {
  id: 'micro-meryenda',
  schemaVersion: 1,
  title: 'Micro Case: Ang Nawawalang Meryenda Fund',
  credibilityMax: 3,

  speakers: {
    jun: { name: 'Jun', role: 'Junior Auditor', spriteId: 'jun', blip: 'low' },
    cess: { name: 'Ate Cess', role: 'Senior Auditor', spriteId: 'cess', blip: 'mid' },
    jopay: { name: 'Jopay', role: 'Intern', spriteId: 'jopay', blip: 'high' },
  },

  evidence: {
    'ev-tally': {
      name: 'Meryenda Fund Tally',
      iconId: 'icon-ledger',
      short: 'Fund ₱500 — resibo ₱450, cash ₱0. Kulang ng ₱50.',
      detail:
        'Meryenda fund count, Wednesday 9AM.\nFund: ₱500.00\nMga resibo sa kaha: ₱450.00\nCash on hand: ₱0.00\nShortage: ₱50.00',
    },
    'ev-mt-resibo': {
      name: 'Milk Tea Resibo',
      iconId: 'icon-receipt',
      short: 'Wintermelon MT, ₱50 — dated Tuesday.',
      detail: 'TEA-REX MILK TEA HOUSE\n1x Wintermelon MT (L) ... ₱50.00\nDate: Tuesday, 3:32 PM',
      inspect: {
        kind: 'document',
        lines: [
          '  TEA-REX MILK TEA HOUSE  ',
          '--------------------------',
          ' 1x Wintermelon MT (L)    ',
          '              P50.00      ',
          ' CASH ................    ',
          ' Date: TUE  3:32 PM       ',
          '--------------------------',
          '  salamat po! ingat!      ',
        ],
        hint: 'Tuesday, 3:32 PM. Sino kaya ang nasa labas ng office nun?',
      },
    },
    'ev-cctv': {
      name: 'CCTV Logbook Note',
      iconId: 'icon-note',
      short: 'Jopay lumabas 3:15 PM nung Tuesday.',
      detail: 'Guard logbook: "3:15 PM TUE — J. Salazar (intern), lumabas. Balik 3:45 PM."',
    },
  },

  notes: {
    'note-count': {
      concept: 'Cash Count 101',
      citation: 'AT reviewer: cash & cash equivalents',
      body: 'Sa imprest fund, dapat cash + resibo = fund amount. Kapag kulang, may unaccounted na paglabas ng pera. Bilangin bago magtanong.',
    },
    'note-vouch': {
      concept: 'Vouching: resibo vs testimony',
      citation: 'PSA 500 — audit evidence',
      body: 'Mas kapani-paniwala ang dokumento kaysa sa sinasabi ng tao. Kapag nagsalungat ang resibo at testimonya, sundan mo ang resibo.',
    },
  },

  scenes: {
    pantry: {
      name: 'Office Pantry',
      backgroundId: 'bg-pantry',
      musicId: 'investigation',
      actions: [
        {
          id: 'talk-cess',
          label: 'Kausapin si Ate Cess',
          kind: 'talk',
          target: 'sc-cess',
          doneFlag: 'f-talked-cess',
        },
        {
          id: 'examine-tally',
          label: 'Bilangin ang meryenda fund',
          kind: 'examine',
          target: 'sc-tally',
          doneFlag: 'f-tally',
        },
        {
          id: 'examine-trash',
          label: 'Halungkatin ang basurahan',
          kind: 'examine',
          target: 'sc-trash',
          doneFlag: 'f-resibo',
        },
        {
          id: 'testify',
          label: 'Harapin si Jopay',
          kind: 'testimony',
          target: 't-jopay',
          when: { allOf: ['f-tally', 'f-resibo'] },
        },
      ],
    },
  },

  scripts: {
    'sc-start': [
      { kind: 'narrate', text: 'RECEIPT, PLEASE! — micro case. May nawawalang ₱50 sa meryenda fund ng opisina.' },
      { kind: 'say', speaker: 'cess', text: 'Jun, may nawawalang singkwenta sa meryenda fund. Trabaho mo \'to.' },
      {
        kind: 'choice',
        prompt: 'Tanggapin ang kaso?',
        options: [
          { text: 'Sige.', label: 'go' },
          { text: 'Sige na nga.', label: 'go' },
        ],
      },
      { kind: 'label', name: 'go' },
      { kind: 'checkpoint' },
      { kind: 'moveTo', scene: 'pantry' },
    ],
    'sc-cess': [
      { kind: 'say', speaker: 'cess', text: 'Kumusta ang audit ng meryenda fund?' },
      { kind: 'branch', when: { allOf: ['f-tally'] }, label: 'seen-tally' },
      { kind: 'say', speaker: 'cess', text: 'Bilangin mo muna yung pera sa kaha bago ka magtanong-tanong.' },
      { kind: 'goto', label: 'end' },
      { kind: 'label', name: 'seen-tally' },
      { kind: 'say', speaker: 'cess', text: 'Kulang ng singkwenta? Interesting. Eto, hiniram ko yung logbook ng guard.' },
      { kind: 'give', evidence: 'ev-cctv' },
      { kind: 'label', name: 'end' },
      { kind: 'say', speaker: 'cess', text: 'Balik ka lang kung kailangan mo ako.' },
    ],
    'sc-tally': [
      { kind: 'narrate', text: 'Binilang mo ang kaha: ₱450 na resibo, walang cash. Kulang ng ₱50.' },
      { kind: 'give', evidence: 'ev-tally' },
      { kind: 'note', note: 'note-count' },
    ],
    'sc-trash': [
      { kind: 'narrate', text: 'May resibo ng milk tea sa ilalim ng mga tissue. Dated Tuesday. Interesting.' },
      { kind: 'give', evidence: 'ev-mt-resibo' },
    ],
    'sc-press-1': [
      { kind: 'say', speaker: 'jopay', text: 'Promise, nasa desk lang ako buong araw! May quiz pa nga ako sa review, e.' },
    ],
    'sc-press-2': [
      { kind: 'say', speaker: 'jopay', text: 'Coffee talaga ako! Yung barako pa nga, hindi yung 3-in-1... well, minsan lang naman ako nagpapa-sweet.' },
    ],
    'sc-press-3': [
      { kind: 'say', speaker: 'jopay', text: 'Basta hindi nung Tuesday! May proof ka ba? Wala diba? Hmp.' },
    ],
    'sc-wrong': [
      { kind: 'say', speaker: 'cess', text: 'Jun... hindi yata konektado \'yan. Isipin mo ulit.' },
    ],
    'sc-takedown': [
      { kind: 'shout', card: 'ETO, O!', speaker: 'jun' },
      { kind: 'say', speaker: 'jopay', pose: 'shocked', text: 'S-saan mo nakuha \'yan?!' },
      { kind: 'say', speaker: 'cess', text: 'Wintermelon. Large. Tuesday, 3:32 PM. Grabe ka, Jopay.' },
      { kind: 'endCase' },
    ],
  },

  testimonies: {
    't-jopay': {
      title: 'Wala Akong Alam sa Meryenda Fund',
      speaker: 'jopay',
      musicId: 'testimony',
      statements: [
        {
          id: 'st-1',
          text: 'Buong araw akong nasa desk ko nung Tuesday, nagre-review.',
          press: { script: 'sc-press-1' },
        },
        {
          id: 'st-2',
          text: 'Hindi ako bumibili ng milk tea — coffee person ako.',
          press: { script: 'sc-press-2', reveals: 'st-3' },
          contradiction: { evidence: ['ev-mt-resibo'], script: 'sc-takedown', note: 'note-vouch' },
        },
        {
          id: 'st-3',
          text: 'Okay fine, minsan nakaka-milk tea ako. Pero hindi nung Tuesday!',
          hidden: true,
          press: { script: 'sc-press-3' },
        },
      ],
    },
  },

  startScript: 'sc-start',
  wrongPresentScript: 'sc-wrong',
}
