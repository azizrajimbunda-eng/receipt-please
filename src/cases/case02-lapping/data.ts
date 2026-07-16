// Case 02 — "Ang Paikot na Kolekta": speakers, evidence, reviewer notes.
// Lapping in accounts receivable at a cash-heavy beverage distributor.
// The teaching core: internal records stay perfectly consistent under lapping —
// only EXTERNAL evidence (the customer's own OR copy) breaks the loop.

import type { Evidence, EvidenceId, NoteId, ReviewerNote, Speaker, SpeakerId } from '../../engine/types'

export const speakers: Record<SpeakerId, Speaker> = {
  jun: { name: 'Jun', role: 'Junior Auditor', spriteId: 'jun', blip: 'low' },
  cess: { name: 'Ate Cess', role: 'Audit Senior', spriteId: 'cess', blip: 'mid' },
  alcaraz: { name: 'Partner Alcaraz', role: 'Engagement Partner', spriteId: 'alcaraz', blip: 'low' },
  ryan: { name: 'Ryan', role: 'Collector', spriteId: 'ryan', blip: 'mid' },
  baby: { name: 'Aling Baby', role: 'May-ari, Sari-sari Store', spriteId: 'baby', blip: 'high' },
  olivia: { name: 'Madam Olivia', role: 'May-ari, Mabuhay Beverage', spriteId: 'olivia', blip: 'mid' },
}

export const evidence: Record<EvidenceId, Evidence> = {
  'ev-program2': {
    name: 'Audit Program — AR',
    iconId: 'icon-doc',
    short: 'Ang checklist mo para sa receivables at collections.',
    detail:
      'MABUHAY BEVERAGE DISTRIBUTORS — FY2023\nAudit Program: Trade Receivables\n\n1. Confirm balances sa mga customer (PSA 505)\n2. Compare OR dates vs deposit dates vs posting dates\n3. Test "deposits intact" — buo bang naide-deposito ang koleksyon?\n4. Review AR aging at follow up ang mga reklamo\n\nPrepared by: C. Ferrer  Reviewed by: R. Alcaraz',
  },
  'ev-aging': {
    name: 'AR Aging Schedule',
    iconId: 'icon-ledger',
    short: 'Dalawang customer, past due daw — pero galit na galit: "BAYAD NA!"',
    detail:
      'AR Aging — 31 July 2023 (may tickmarks ni Jun)\n\nAling Baby (sari-sari) .... ₱ 8,000  31-60 days ✗\nMang Turo (carinderia) .... ₱ 6,500  31-60 days ✗\nIba pa (28 accounts) ...... kalat, mostly current\n\n✗ = tumawag sa opisina: "Bayad na kami! May resibo kami!"\nParehong ruta ni Ryan ang dalawa.',
    inspect: {
      kind: 'document',
      lines: [
        '  AR AGING — 31 JUL 2023    ',
        '---------------------------',
        ' Aling Baby   8,000  31-60✗',
        ' Mang Turo    6,500  31-60✗',
        ' 28 others    current      ',
        '---------------------------',
        ' ✗ = "BAYAD NA KAMI!"      ',
        '   parehong ruta: R.V.     ',
      ],
      hint: 'Dalawang "past due" na galit na sinisingil mo pa. Parehong ruta. Hindi \'yan kalimot ng customer.',
    },
  },
  'ev-or-dup': {
    name: 'Duplicate OR #1102',
    iconId: 'icon-receipt',
    short: 'Company copy: Aling Baby, ₱8,000 — dated June 17.',
    detail:
      'Duplicate (company copy) ng OR booklet:\n\nOR #1102 — Aling Baby\nAmount: ₱8,000.00\nDate: 17 June 2023\nCollector: R. Villanueva\n\nMalinis. Consistent sa deposit records at sa posting. Kaya nga walang nakahuli — ang loob ng sistema, magkakasundo.',
    inspect: {
      kind: 'document',
      lines: [
        '  MABUHAY BEVERAGE           ',
        '  OR #1102 (DUPLICATE)      ',
        '---------------------------',
        ' Customer: ALING BABY       ',
        ' Amount:   P 8,000.00       ',
        ' Date:     17 JUNE 2023     ',
        ' Collector: R. VILLANUEVA   ',
      ],
      hint: 'Tandaan ang petsa: June 17. Itago mo ito sa isip — may makakasagot dito sa labas ng kompanya.',
    },
  },
  'ev-deposits': {
    name: 'Deposit Slips (June)',
    iconId: 'icon-cash',
    short: 'June 3: walang ₱8,000. June 17: may ₱8,000.',
    detail:
      'Validated deposit slips, June 2023:\n\nJune 3 — ₱22,500 kabuuan\n  breakdown: 12,000 + 6,000 + 4,500\n  (walang ₱8,000 na komponente)\n\nJune 17 — ₱31,000 kabuuan\n  breakdown: 8,000 + 14,500 + 8,500\n\nKung June 3 nagbayad si Aling Baby, nasaan ang ₱8,000 sa June 3 deposit?',
    inspect: {
      kind: 'document',
      lines: [
        ' DEPOSIT SLIP  03 JUN 2023  ',
        '  12,000 + 6,000 + 4,500    ',
        '  TOTAL: P 22,500           ',
        '---------------------------',
        ' DEPOSIT SLIP  17 JUN 2023  ',
        '  8,000 + 14,500 + 8,500    ',
        '  TOTAL: P 31,000           ',
      ],
      hint: 'Ang ₱8,000 ay lumitaw sa June 17 — hindi sa June 3. Saan galing ang perang idineposito noong 17?',
    },
  },
  'ev-or-cust': {
    name: 'OR #1102 (kopya ni Aling Baby)',
    iconId: 'icon-receipt',
    short: 'PAREHONG numero — pero June 3 ang petsa. Ito ang pumapatay.',
    detail:
      'Ang customer copy ni Aling Baby ng OR #1102:\n\nOR #1102 — Aling Baby\nAmount: ₱8,000.00\nDate: 3 JUNE 2023\nCollector: R. Villanueva\n\nParehong OR number, parehong halaga, parehong kolektor — MAGKAIBANG PETSA sa duplicate. Ang original at duplicate ay sabay sinusulat sa carbon. Hindi sila puwedeng magkaiba... maliban kung hiniwalay ang pages.',
    inspect: {
      kind: 'document',
      lines: [
        '  MABUHAY BEVERAGE          ',
        '  OR #1102 (ORIGINAL)       ',
        '---------------------------',
        ' Customer: ALING BABY       ',
        ' Amount:   P 8,000.00       ',
        ' Date:     3 JUNE 2023      ',
        '           ^^^^^^^^^^^      ',
        ' Collector: R. VILLANUEVA   ',
        '---------------------------',
        ' (kupas, may mantsa ng      ',
        '  toyo — pero malinaw       ',
        '  ang petsa)                ',
      ],
      hint: 'June 3 sa original, June 17 sa duplicate. Ang carbon copy ay hindi nagsisinungaling — ang tao lang.',
    },
  },
  'ev-listahan': {
    name: 'Listahan ni Aling Baby',
    iconId: 'icon-note',
    short: 'Ang notebook ng tindahan: "Jun 3 — bayad Mabuhay 8,000 kay Ryan."',
    detail:
      'Ang kwaderno ng tindahan — listahan ng utang at bayad:\n\n"Jun 3 (Sab) — BAYAD sa Mabuhay ₱8,000 — kay Ryan, umaga, sakto bago mag-jeep"\n\nMay kasunod pang entry: "Jun 3 — pamasahe ni Totoy ₱50 (utang)". Ang listahan ng tindera ay ledger na walang audit adjustment. Pinaniniwalaan ito ng buong barangay.',
  },
  'ev-lag-memo': {
    name: 'Deposit Lag Memo',
    iconId: 'icon-ledger',
    short: 'OR-to-deposit lag: 1 araw dati. 12 araw na simula Marso.',
    detail:
      'Analytical review ni Ate Cess:\n\nAverage na agwat mula OR date hanggang deposit date (ruta ni Ryan):\n\nOct–Dec 2022 ... 1.2 araw\nJan–Feb 2023 ... 1.4 araw\nMar 2023 ....... 5.8 araw\nApr 2023 ....... 8.3 araw\nMay 2023 ....... 10.1 araw\nJun–Jul 2023 ... 12.4 araw\n\nSa ibang ruta: flat na 1-2 araw buong taon. Iisa lang ang kolektor na humahaba ang hawak sa pera.',
  },
  'ev-subledger': {
    name: 'Subsidiary Ledger Memo',
    iconId: 'icon-ledger',
    short: 'Bayad ni Mang Turo (June 17) — naipasok kay Aling Baby. Kay Mang Turo: July 2.',
    detail:
      'Trace ni Jun sa AR subsidiary ledgers:\n\n• June 17: nag-bayad si Mang Turo ng ₱6,500 + may dagdag na koleksyon.\n• Ang June 17 deposit na ₱8,000 ay naipasok sa account ni ALING BABY.\n• Ang account ni MANG TURO ay na-kredito lamang noong JULY 2 — gamit ang bayad ng IBANG customer.\n\nIto ang lapping: bawat bagong koleksyon, pantakip sa nauna. Ang butas, hindi nawawala — gumugulong lang. At lumalaki.',
  },
  'ev-56notice': {
    name: 'Demand Letter (5-6)',
    iconId: 'icon-note',
    short: 'Nakatiklop sa route folder ni Ryan. "FINAL NOTICE — ₱62,000."',
    detail:
      'Nakatiklop sa loob ng route folder ni Ryan, kupas na sa kakabukas:\n\n"FINAL NOTICE\nR. Villanueva\nUtang: ₱62,000 (principal ₱40,000 + interes)\nLingguhang hulog: ₱4,000\nHuling babala bago ang personal na pagsingil."\n\nWalang letterhead. Walang pirma. Ang mga ganitong sulat, hindi galing sa bangko.',
  },
  'ev-advances': {
    name: 'Denied CA Slips',
    iconId: 'icon-doc',
    short: 'Tatlong cash advance request ni Ryan — lahat DENIED, Feb–Mar.',
    detail:
      'Mula sa HR file (pinahiram ni Madam Olivia):\n\nCash Advance Request — R. Villanueva\n• Feb 6: ₱15,000 — DENIED (limit exceeded)\n• Feb 27: ₱20,000 — DENIED\n• Mar 13: ₱25,000 — DENIED, "final"\n\nMakalipas ang dalawang linggo, nagsimula ang paghaba ng deposit lag. Ang taong hindi pinautang ng kompanya ay nangutang sa kompanya — nang walang paalam.',
  },
  'ev-engagement': {
    name: 'Engagement Letter',
    iconId: 'icon-doc',
    short: 'Ang pinirmahan ni Madam Olivia mismo: fraud findings → sa governance.',
    detail:
      'Engagement Letter, Ferrer & Alcaraz — pirmado ni O. Mabuhay:\n\n"Alinsunod sa PSA 240, ang anumang natuklasang fraud o hinihinalang fraud ay ikokomunika ng auditor sa management at sa those charged with governance nang napapanahon, at idodokumento sa audit files..."\n\nHindi ito kagustuhan ng auditor. Ito ang pinagkasunduan — at ang pamantayan.',
  },
}

export const notes: Record<NoteId, ReviewerNote> = {
  'note-confirmation': {
    concept: 'External Confirmations',
    citation: 'PSA 505 (external confirmations)',
    body: 'Ang AR ay kinukumpirma mismo sa customer, hindi sa taong nangolekta. Ang AUDITOR ang dapat may kontrol sa buong proseso — pagpili ng accounts, pagpapadala, pagtanggap ng sagot. Kapag ang auditee ang namagitan, hindi na confirmation \'yon — kuwento na lang niya, may sobre.',
  },
  'note-analytics': {
    concept: 'Analytical Procedures bilang Pantukoy ng Panganib',
    citation: 'PSA 520; PSA 315 (risk assessment)',
    body: 'Hindi mo kailangang makita ang mismong pagnanakaw — makikita mo ang anino niya sa numero. Isang kolektor na humaba ang OR-to-deposit lag mula 1 araw papuntang 12, habang flat ang lahat ng iba? Hindi \'yan sagot. \'Yan ay tanong na kailangan mong itanong.',
  },
  'note-lapping': {
    concept: 'Lapping: ang anatomy',
    citation: 'AT: cash & receivables fraud; PSA 240',
    body: 'Sa lapping, kinukuha ang bayad ni Customer A, at tinatakpan ng bayad ni Customer B pagdating nito — kaya laging gumugulong ang butas. Ang tatlong petsa ang test: petsa sa ORIGINAL na resibo ng customer, petsa ng DEPOSIT, petsa ng POSTING. Magkakasundo ang loob ng sistema; ang original na hawak ng customer ang hindi kayang i-edit ng magnanakaw.',
  },
  'note-intact': {
    concept: 'Deposits Intact Test',
    citation: 'AT: internal control over cash receipts',
    body: 'Ang bawat araw ng koleksyon ay dapat ideposito nang BUO at HIWALAY — hindi pinagsasama, hindi hinuhulugan. Kapag intact ang deposits, bawat resibo ay may katapat na linya sa deposit slip. Kapag hindi, may puwang para pagbalik-balikin ang pera. Ang puwang na \'yon ang tinitirhan ng lapping.',
  },
  'note-external': {
    concept: 'Hierarchy ng Ebidensiya',
    citation: 'PSA 500.A31 (reliability of audit evidence)',
    body: 'Mas maaasahan ang ebidensiyang galing sa LABAS ng kompanya kaysa loob, at mas maaasahan ang orihinal kaysa kopya. Ang duplicate OR ay gawa ng kompanya — kayang isaayos. Ang original na hawak ng customer, may mantsa man ng toyo, ay hindi naabot ng kamay ng nandaya. Kaya\'t ang tindera ang pinaka-reliable na witness sa kasong ito.',
  },
  'note-redflags': {
    concept: 'Fraud Risk Factors: ang mga pulang bandila',
    citation: 'PSA 240, Appendix 1 & 3',
    body: 'Bago pa ang ebidensiya, may mga senyales: empleyadong tinanggihan ng cash advance nang tatlong beses; personal na utang na lampas sa kita; ayaw mag-leave o magpahawak ng ruta sa iba (dahil babagsak ang ikot). Ang red flag ay hindi pruweba — imbitasyon ito na tumingin nang mas malapit.',
  },
  'note-governance': {
    concept: 'Komunikasyon sa Those Charged with Governance',
    citation: 'PSA 240.40–.42; PSA 260',
    body: 'Kapag may natuklasang fraud, tungkulin ng auditor na ikomunika ito sa management at sa those charged with governance — nakasulat man sa engagement letter o hindi, dahil pamantayan ito. Ang "ayusin na lang natin nang tahimik" ay hindi opsiyon na puwedeng ibigay ng auditor, kahit ang may-ari pa ang humiling.',
  },
}
