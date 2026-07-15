// Case 01 — "Ang Kulang na Kaha": speakers, evidence, reviewer notes.
// Engagement period is FY2023 on purpose: pre-RA 11976 (EOPT, 2024), when the
// Official Receipt was still the primary document for sales of services.
// Ate Cess flags the change in-story so reviewees aren't taught a stale rule.

import type { Evidence, EvidenceId, NoteId, ReviewerNote, Speaker, SpeakerId } from '../../engine/types'

export const speakers: Record<SpeakerId, Speaker> = {
  jun: { name: 'Jun', role: 'Junior Auditor', spriteId: 'jun', blip: 'low' },
  cess: { name: 'Ate Cess', role: 'Audit Senior', spriteId: 'cess', blip: 'mid' },
  alcaraz: { name: 'Partner Alcaraz', role: 'Engagement Partner', spriteId: 'alcaraz', blip: 'low' },
  malou: { name: 'Malou', role: 'Petty Cash Custodian', spriteId: 'malou', blip: 'mid' },
  dodong: { name: 'Dodong', role: 'Messenger', spriteId: 'dodong', blip: 'high' },
  bong: { name: 'Kuya Bong', role: 'Katabing Tindahan', spriteId: 'bong', blip: 'low' },
}

export const evidence: Record<EvidenceId, Evidence> = {
  'ev-program': {
    name: 'Audit Program — Cash',
    iconId: 'icon-doc',
    short: 'Ang checklist mo para sa petty cash procedures.',
    detail:
      'CABRERA TRADING CORP. — FY2023\nAudit Program: Petty Cash Fund\n\n1. Surprise cash count sa presence ng custodian\n2. Vouch replenishments sa supporting documents\n3. Test cutoff — unreplenished vouchers\n4. Confirm imprest balance sa GL\n\nPrepared by: C. Ferrer  Reviewed by: R. Alcaraz',
  },
  'ev-policy': {
    name: 'PCF Policy Sheet',
    iconId: 'icon-doc',
    short: 'Imprest fund: ₱20,000. Limit ₱2,000/voucher. Bawal ang vale.',
    detail:
      'CABRERA TRADING CORP.\nPetty Cash Fund Policy (rev. 2021)\n\n• Imprest system: fixed fund ₱20,000.00\n• Cash + unreplenished vouchers = ₱20,000.00 sa lahat ng oras\n• Maximum ₱2,000.00 kada disbursement\n• Kailangan ng OR o sales invoice sa bawat voucher\n• BAWAL ang vale/IOU laban sa pondo\n• Custodian lang ang may access sa kaha',
  },
  'ev-count': {
    name: 'Cash Count Sheet',
    iconId: 'icon-cash',
    short: 'Cash ₱4,100 + vouchers ₱14,650 = ₱18,750. Kulang ng ₱1,250.',
    detail:
      'SURPRISE CASH COUNT — 14 Aug 2023, 9:12 AM\nCounted in presence of: M. Salcedo (custodian)\n\nBills & coins ................ ₱ 4,100.00\nUnreplenished vouchers ....... ₱14,650.00\nVale slip (M. Salcedo) ....... ₱ 1,000.00 *\n                               ───────────\nTotal accounted .............. ₱19,750.00\nPer imprest policy ........... ₱20,000.00\nSHORTAGE ..................... ₱ 1,250.00\n\n* Vale is not a valid petty cash disbursement per policy.\n  Kung hindi bibilangin ang vale: ₱18,750 → shortage ₱1,250.',
    inspect: {
      kind: 'document',
      lines: [
        '  SURPRISE CASH COUNT       ',
        '  14 Aug 2023  9:12 AM      ',
        '--------------------------- ',
        ' Bills & coins    4,100.00  ',
        ' Vouchers        14,650.00  ',
        ' Vale (M.S.)      1,000.00  ',
        '                 ---------  ',
        ' Accounted       19,750.00  ',
        ' Per policy      20,000.00  ',
        ' SHORTAGE         1,250.00  ',
        '--------------------------- ',
        ' Counted by: J. Ramos       ',
        ' Witnessed: M. Salcedo      ',
      ],
      hint: 'Cash + vouchers ay dapat eksaktong ₱20,000. Hindi ito tugma — at hindi pa kasama diyan ang vale.',
    },
  },
  'ev-vale': {
    name: 'Vale Slip',
    iconId: 'icon-note',
    short: 'IOU ni Malou, ₱1,000. Bawal ito sa policy.',
    detail:
      'Papel na napunit mula sa notebook, nakalagay sa kaha:\n\n"VALE — ₱1,000\nBabayaran ko sa sweldo.\n— M. Salcedo, 4 Aug"\n\nAng vale ay hindi valid na petty cash disbursement. Sintomas ito ng personal na paggamit ng pondo ng kompanya.',
  },
  'ev-vouchers': {
    name: 'Voucher Bundle',
    iconId: 'icon-doc',
    short: 'Unreplenished vouchers, ₱14,650. May kasamang OR #0871.',
    detail:
      'Mga petty cash voucher na hindi pa nare-replenish, kabuuang ₱14,650.\n\nKaraniwan lang ang halos lahat — kape, load, grab, xerox, tubig.\nIsa lang ang lumalaking mata sa bundle: PCV #204, ₱4,850 — R&M Merchandise, "office supplies (bulk)".\n\nLampas ito sa ₱2,000 na limit kada disbursement.',
  },
  'ev-or871': {
    name: 'OR #0871 — R&M',
    iconId: 'icon-receipt',
    short: '₱4,850 daw. Ang kapal ng tinta sa "4".',
    detail:
      'Official Receipt #0871\nR&M Merchandise, Sampaloc\nDate: 12 June 2023\nAmount: ₱4,850.00\nFor: Office supplies (bulk)\n\nMay kakaiba sa numero. Suriin mo nang malapitan.',
    inspect: {
      kind: 'document',
      lines: [
        '   R&M MERCHANDISE          ',
        '   Sampaloc, Manila         ',
        '   OFFICIAL RECEIPT  0871   ',
        '--------------------------- ',
        ' Date: 12 JUNE 2023         ',
        ' Office supplies (bulk)     ',
        '                            ',
        '   AMOUNT:  P 4,850.00      ',
        '             ^              ',
        '        (mas maitim ang     ',
        '         tintang ito)       ',
        '--------------------------- ',
        ' Received by: ____________  ',
      ],
      hint: 'Iba ang tinta ng "4". Kung tatanggalin mo iyon: ₱850.00. Sakto sa presyo ng ilang ream ng bond paper.',
    },
  },
  'ev-photo': {
    name: 'Litrato ng R&M',
    iconId: 'icon-photo',
    short: 'Sarado ang R&M mula pa noong Mayo. Naka-padlock, may abo.',
    detail:
      'Litrato ng harapan ng R&M Merchandise, kuha ngayong 14 Aug 2023.\n\nNakababa ang rolling door, may kalawang na padlock, at nakadikit ang notice ng barangay: "CLOSED — MAY 2023". Makapal na ang alikabok sa signage.\n\nKung sarado na ang tindahan simula Mayo, walang bumili dito noong June 12.',
  },
  'ev-genuine-or': {
    name: 'Tunay na OR ng R&M',
    iconId: 'icon-receipt',
    short: 'Prior-year sample. Iba ang hitsura ng mga numero.',
    detail:
      'Mula sa prior-year working papers: tunay na OR ng R&M (Nov 2022).\n\nPareho ang serye at format — pero iisa ang tinta ng lahat ng numero, at may pre-printed na "Received by" signature ni Mrs. Ramos ng R&M.\n\nSa OR #0871: blangko ang "Received by".',
  },
  'ev-ink': {
    name: 'Ink Analysis Note',
    iconId: 'icon-note',
    short: 'Ang "4" ay nakapatong sa ibang tinta. ₱850 → ₱4,850.',
    detail:
      'Tala ni Jun matapos suriin sa ilalim ng loupe:\n\n• Ang "4" sa "4,850" ay ibang tinta — mas maitim, mas makapal ang stroke.\n• May bahagyang bakas ng nabura sa ilalim.\n• Ang spacing ng "850" ay nakasentro para sa 3-digit na halaga, hindi 4.\n\nKonklusyon: ang orihinal na halaga ay ₱850.00. Ang "4" ay idinagdag.\nAltered document. ₱4,000 ang diperensiya.',
  },
  'ev-gatelog': {
    name: 'Gate Logbook Copy',
    iconId: 'icon-doc',
    short: 'Walang labas si Dodong noong June 12. Naka-leave siya.',
    detail:
      'Kopya ng gate logbook ng guard, June 2023:\n\nJune 12 (Lunes) — walang entry para kay D. Bautista.\nSa halip: "D. BAUTISTA — SICK LEAVE (approved)" sa HR calendar na nakapaskil sa guardhouse.\n\nKung naka-leave si Dodong noong June 12, hindi siya ang bumili ng kahit ano sa R&M.',
  },
  'ev-ledger': {
    name: 'PCF Ledger Memo',
    iconId: 'icon-ledger',
    short: 'Buwanan dating replenishment. Naging lingguhan mula April.',
    detail:
      'Analytical review ni Ate Cess sa petty cash replenishments:\n\nJan–Mar 2023 ... 1x kada buwan (avg ₱9,800)\nApril 2023 ..... 3x (₱18,400)\nMay 2023 ....... 4x (₱19,100)\nJune 2023 ...... 4x (₱19,600)\nJuly 2023 ...... 4x (₱18,900)\n\nDumoble ang bilis ng paglabas ng pera simula April — walang katumbas na paglaki ng operasyon. Kasabay nito ang unang vale.',
  },
  'ev-hospital': {
    name: 'Hospital Billing Notice',
    iconId: 'icon-note',
    short: 'Nakalimutan sa loob ng voucher bundle. Bill ng ospital, Marso.',
    detail:
      'Naipit sa likod ng voucher bundle — mukhang naiwan nang hindi sinasadya:\n\nSTA. TERESA MEDICAL CENTER\nStatement of Account — 28 March 2023\nPatient: SALCEDO, Rogelio (father)\nBalance due: ₱47,300.00\n\nMay nakasulat sa gilid, sulat-kamay: "paunti-unti muna."',
  },
}

export const notes: Record<NoteId, ReviewerNote> = {
  'note-imprest': {
    concept: 'Imprest System & Surprise Cash Count',
    citation: 'PSA 500 (audit evidence); AT: cash & cash equivalents',
    body: 'Sa imprest system, fixed ang pondo — kaya sa lahat ng oras: cash on hand + unreplenished vouchers = imprest amount. Ang surprise cash count ang direktang test nito, at kailangang ginagawa sa harap ng custodian para hindi mapasa ang sisi. Anumang kulang ay unaccounted disbursement hangga\'t hindi napapatunayan.',
  },
  'note-vale': {
    concept: 'Vale/IOU: hindi ito disbursement',
    citation: 'AT: internal control over cash; PCF policy',
    body: 'Ang vale ay utang ng empleyado, hindi gastos ng kompanya. Hindi ito valid na laman ng petty cash fund — receivable na dapat \'yan, hindi cash. Kapag may vale sa kaha, dalawa ang problema: control override at posibleng personal na paggamit ng pondo.',
  },
  'note-vouching': {
    concept: 'Vouching & Altered Documents',
    citation: 'PSA 240.13; PSA 500.7 (reliability of evidence)',
    body: 'Ang vouching ay pagsundan ang recorded amount pabalik sa supporting document. Pero hindi sapat na may resibo — kailangang tingnan kung tunay ito. Sabi ng PSA 240, dapat alerto ang auditor sa dokumentong mukhang binago. Ang external document ay mas maaasahan kaysa internal, pero ang pineke o binagong external document ay pinakamapanganib sa lahat.',
  },
  'note-existence': {
    concept: 'Existence ng Supplier',
    citation: 'PSA 240 (fictitious transactions); PSA 500 (external evidence)',
    body: 'Ang klasikong disbursement fraud ay may resibo mula sa supplier na hindi na (o hindi kailanman) umiiral. Kaya may site visit at supplier confirmation: pinapatunayan nito ang existence assertion. Kapag sarado na ang tindahan bago pa ang petsa ng resibo, ang transaksiyon ay fictitious — walang dami ng dokumento ang makakapagpatunay ng bumili ka sa multo.',
  },
  'note-skepticism': {
    concept: 'Professional Skepticism',
    citation: 'PSA 200.15; PSA 240.12–.13',
    body: 'Ang professional skepticism ay questioning mind — hindi paghihinala sa lahat, pero hindi rin basta paniniwala. Sabi ng PSA 200, hindi puwedeng ipagpalagay ng auditor na tapat ang management; at sabi ng PSA 240, hindi rin puwedeng ipagpalagay na hindi tapat. Ang nakaraang karanasan sa isang tao ay hindi dahilan para tumigil sa pagtatanong ngayon.',
  },
  'note-triangle': {
    concept: 'Ang Fraud Triangle',
    citation: 'PSA 240, Appendix 1 (fraud risk factors)',
    body: 'Tatlo ang sabay-sabay na nangyayari kapag may fraud:\n• PRESSURE — bayarin sa ospital na hindi kaya ng sweldo.\n• OPPORTUNITY — siya lang ang may hawak ng kaha, walang surprise count, siya rin ang naghahanda ng voucher.\n• RATIONALIZATION — "babayaran ko naman, hiram lang."\nHindi masamang tao ang tinitingnan ng auditor. Ang tinitingnan ay ang tatlong kondisyong ito.',
  },
  'note-sod': {
    concept: 'Segregation of Duties',
    citation: 'PSA 315 (understanding internal control); management letter points',
    body: 'Ang custody, recording, at authorization ay dapat hiwa-hiwalay. Kay Malou, siya ang may hawak ng pera, siya ang gumagawa ng voucher, at walang nagre-review — kaya walang makakahuli maliban sa surprise count. Ang rekomendasyon: hiwalayan ang mga tungkulin, ipa-review ang replenishment sa iba, at gawing regular ang unannounced counts. Hindi lang paghuli ng magnanakaw ang trabaho ng auditor — pagsasara rin ng butas.',
  },
}
