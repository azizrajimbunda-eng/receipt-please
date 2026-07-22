// Case 04 — "Ang Presyo ng Payo": speakers, evidence, reviewer notes.
// Management Advisory Services. No missing cash this time — the fraud is a
// self-serving feasibility study. Every recommendation in the consultant's
// roadmap is a classic MAS fallacy, and the last one is defended not by the
// villain but by the client's own heart.
//
// The numbers are the content: every schedule here must actually compute.
//   Keep-or-drop: segment "loss" ₱120k AFTER ₱500k allocated common fixed
//     costs; segment margin is +₱380k → dropping LOSES ₱380k.
//   Special order: 10,000 pcs @ ₱18 vs unit VC ₱13 (full cost ₱22 incl.
//     ₱9 allocated fixed) at 60% capacity → +₱50,000.
//   Make-or-buy: buy ₱15.50 vs full cost ₱17 — but avoidable cost is only
//     ₱13.80 and the freed space has no alternative use → outsourcing loses
//     ₱1.70/pc BEFORE the year-2 price escalation.
//   Sunk cost: ₱2M spent on Project Hurno is gone whether they finish or not;
//     finishing costs ₱1.5M more for capacity a 60%-utilized plant can't use;
//     abandoning salvages ₱400k.

import type { Evidence, EvidenceId, NoteId, ReviewerNote, Speaker, SpeakerId } from '../../engine/types'

export const speakers: Record<SpeakerId, Speaker> = {
  jun: { name: 'Jun', role: 'Junior Consultant', spriteId: 'jun', blip: 'low' },
  cess: { name: 'Ate Cess', role: 'MAS Senior', spriteId: 'cess', blip: 'mid' },
  alcaraz: { name: 'Partner Alcaraz', role: 'Engagement Partner', spriteId: 'alcaraz', blip: 'low' },
  marco: { name: 'Marco', role: 'Business Consultant', spriteId: 'marco', blip: 'mid' },
  rosa: { name: 'Aling Rosa', role: 'May-ari, Bibingka ni Aling Rosa', spriteId: 'rosa', blip: 'high' },
  nina: { name: 'Nina', role: 'Operations Manager', spriteId: 'nina', blip: 'high' },
}

export const evidence: Record<EvidenceId, Evidence> = {
  'ev-program4': {
    name: 'MAS Engagement Brief',
    iconId: 'icon-doc',
    short: 'Ang trabaho: i-review ang roadmap BAGO pumirma si Aling Rosa.',
    detail:
      'BIBINGKA NI ALING ROSA, INC. — MAS Engagement\n\nScope: independent review ng "Profit Maximization Roadmap" ni Marco Reyes bago ito aprubahan ng may-ari.\n\n1. I-verify ang bawat rekomendasyon gamit ang RELEVANT costs\n2. Ihiwalay ang avoidable sa allocated\n3. Suriin ang assumptions sa kapasidad\n4. Alamin kung kanino pupunta ang bawat pisong "matitipid"\n\nPrepared by: C. Ferrer  Reviewed by: R. Alcaraz',
  },
  'ev-roadmap': {
    name: 'Profit Roadmap ni Marco',
    iconId: 'icon-doc',
    short: 'Apat na rekomendasyon. "Guaranteed +₱1.2M profit."',
    detail:
      'PROFIT MAXIMIZATION ROADMAP\nInihanda ni: Marco Z. Reyes, MBA\n\n1. ITIGIL ang Bibingka Espesyal line — lugi ₱120,000/taon\n2. TANGGIHAN ang Hotel Mirador special order — lugi ₱4/piraso\n3. I-OUTSOURCE ang galapong production sa MZR Foods Corp.\n4. ITULOY ang Project Hurno — "protektahan ang ₱2M na puhunan"\n\n"Kabuuang benepisyo: ₱1.2M+ kada taon. Guaranteed."\n\nMakinis ang deck. Makulay ang graphs. Ang numero — titingnan pa natin.',
    inspect: {
      kind: 'document',
      lines: [
        ' PROFIT MAXIMIZATION        ',
        ' ROADMAP — M.Z. REYES, MBA  ',
        '---------------------------',
        ' 1. ITIGIL ang Espesyal     ',
        '    (lugi 120k/yr)          ',
        ' 2. TANGGIHAN ang hotel     ',
        '    order (lugi P4/pc)      ',
        ' 3. I-OUTSOURCE sa MZR      ',
        '    FOODS CORP.             ',
        ' 4. ITULOY ang Project      ',
        '    Hurno (2M na ang puhunan)',
        '---------------------------',
        ' "GUARANTEED +1.2M"         ',
      ],
      hint: 'MZR Foods. Marco Z. Reyes. Baka nagkataon lang. Baka rin hindi.',
    },
  },
  'ev-fee': {
    name: 'Consulting Contract',
    iconId: 'icon-doc',
    short: 'Bayad ni Marco: 20% ng "realized savings" — kontingente.',
    detail:
      'Consulting Agreement — M.Z. Reyes Business Solutions\n\n"Ang propesyonal na bayad ay dalawampung porsiyento (20%) ng lahat ng realized savings mula sa pagpapatupad ng mga rekomendasyon, kada taon, sa loob ng tatlong taon."\n\nKapag ang bayad mo ay nakasalalay sa laki ng "savings", ang bawat rekomendasyon ay may dahilang lumaki — totoo man o hindi. Iyan ang problema sa contingent fees sa advisory work.',
  },
  'ev-segment-pl': {
    name: 'Segment P&L (kay Marco)',
    iconId: 'icon-ledger',
    short: 'Bibingka Espesyal: "(₱120,000) NET LOSS." May allocated na ₱500k.',
    detail:
      'Product Line P&L — Bibingka Espesyal (galing sa deck ni Marco)\n\nSales ........................ ₱2,100,000\nVariable costs ............... (1,220,000)\nContribution margin ..........    880,000\nDirect fixed costs ...........   (500,000)\nAllocated head office costs ..   (500,000)\n                               ───────────\n"NET LOSS" ...................   (120,000)\n\nTingnan mo kung saan nanggaling ang "lugi": kalahati ng fixed costs ay ALLOCATED — upa ng head office, sweldo ni Aling Rosa, kuryente ng buong commissary. Mananatili ang mga iyon itigil man ang Espesyal.',
    inspect: {
      kind: 'document',
      lines: [
        ' BIBINGKA ESPESYAL — P&L    ',
        '---------------------------',
        ' Sales           2,100,000  ',
        ' Variable       (1,220,000) ',
        ' CM                880,000  ',
        ' Direct fixed     (500,000) ',
        ' ALLOCATED HO     (500,000) ',
        '                 ---------  ',
        ' "NET LOSS"       (120,000) ',
        '---------------------------',
        ' allocated = upa, sweldo,   ',
        ' kuryente ng BUONG plant    ',
      ],
      hint: 'Kapag itinigil ang Espesyal, aalis ba ang upa ng head office? Hindi. Ililipat lang ang ₱500k sa ibang produkto.',
    },
  },
  'ev-recast': {
    name: 'Recast Segment Analysis',
    iconId: 'icon-ledger',
    short: 'Ang totoong tanong: ano ang MAWAWALA kapag itinigil? ₱380k.',
    detail:
      'Recast ni Jun — keep-or-drop, avoidable costs lang:\n\nMawawalang contribution margin ... ₱880,000\nMaiiwasang direct fixed costs .... (500,000)\n                                   ─────────\nSEGMENT MARGIN (mawawala) ........ ₱380,000\n\nAng allocated na ₱500,000? Hindi maiiwasan — lilipat lang sa Classic at Ube lines, at ang dating "maliit na kita" nila ay magmumukhang lugi rin. Ganyan magpalaganap ang death spiral: isang line kada taon, hanggang maubos.\n\nKonklusyon: ang pagtigil sa "lugi" na Espesyal ay magpapababa ng kita ng ₱380,000 kada taon.',
    inspect: {
      kind: 'document',
      lines: [
        ' KEEP-OR-DROP — ESPESYAL    ',
        '---------------------------',
        ' CM na mawawala    880,000  ',
        ' Avoidable fixed  (500,000) ',
        '                 ---------  ',
        ' SEGMENT MARGIN    380,000  ',
        '---------------------------',
        ' allocated 500k: LILIPAT    ',
        ' LANG, hindi mawawala       ',
        ' drop = -380k kada taon     ',
      ],
      hint: 'Ang desisyon ay tungkol sa MAIIWASAN, hindi sa inilista. Segment margin ang sagot, hindi "net loss".',
    },
  },
  'ev-order': {
    name: 'Hotel Mirador Order',
    iconId: 'icon-doc',
    short: '10,000 pcs @ ₱18. "Unit cost" daw ₱22. Pero magkano ang variable?',
    detail:
      'Special Order — Hotel Mirador breakfast buffet\n\n10,000 pirasong mini-bibingka kada quarter, ₱18.00 kada piraso, sariling packaging ng hotel, hindi dadaan sa mga tindahan.\n\nSabi ng costing sheet: ₱22.00 ang "cost per unit" —\n  Variable (galapong, itlog, keso, labor) ... ₱13.00\n  Allocated fixed overhead .................. ₱9.00\n\nAng ₱9 na iyon ay upa at depreciation na nariyan na, may order man o wala.',
  },
  'ev-capacity': {
    name: 'Capacity Report',
    iconId: 'icon-ledger',
    short: 'Ang commissary: 60% pa lang ang gamit. May 40% na tulog.',
    detail:
      'Production Capacity Report — Q3\n\nNormal capacity ......... 100,000 pcs/quarter\nActual production ....... 60,200 pcs/quarter\nUtilization ............. 60%\n\nAng special order ng Hotel Mirador (10,000 pcs) ay kasya sa idle capacity nang HINDI ginagalaw ang regular production. Walang lost sales. Walang overtime. Ang tanging tanong: mas malaki ba ang ₱18 kaysa sa dagdag-gastos kada piraso?',
  },
  'ev-relevant': {
    name: 'Relevant Costing Schedule',
    iconId: 'icon-ledger',
    short: '₱18 bayad − ₱13 variable = +₱5 × 10,000 = +₱50,000 kada quarter.',
    detail:
      'Special Order Analysis — relevant costs lang:\n\nPresyo kada piraso ............ ₱18.00\nVariable cost kada piraso ..... (13.00)\nIncremental CM kada piraso ....   5.00\n× 10,000 pcs .................. ₱50,000 kada quarter\n\nAng ₱9.00 na allocated fixed overhead? IRRELEVANT — nariyan na iyon, tanggapin man o hindi ang order. Sa idle capacity at walang epekto sa regular na benta, ang "lugi ₱4" ni Marco ay kita palang ₱5.\n\n₱200,000 kada taon ang itinatapon ng rekomendasyon niya.',
    inspect: {
      kind: 'document',
      lines: [
        ' SPECIAL ORDER — RELEVANT   ',
        '---------------------------',
        ' Price/pc          18.00    ',
        ' Variable/pc      (13.00)   ',
        ' Incremental CM     5.00    ',
        ' x 10,000 pcs    P 50,000   ',
        '   kada quarter             ',
        '---------------------------',
        ' allocated OH P9: nariyan   ',
        ' na, order man o wala —     ',
        ' IRRELEVANT                 ',
      ],
      hint: 'Sa idle capacity, ang tanong ay hindi "magkano ang cost" — kundi "magkano ang DAGDAG na cost".',
    },
  },
  'ev-quote': {
    name: 'MZR Foods Quotation',
    iconId: 'icon-doc',
    short: '₱15.50/kg ang galapong — Year 1 lang. Basahin ang maliit na letra.',
    detail:
      'Quotation — MZR FOODS CORPORATION\n\nGalapong supply: ₱15.50/kg (laban sa "₱17.00/kg in-house cost" sa deck)\n\nMaliit na letra, ika-anim na pahina:\n"Ang presyo ay para sa unang taon lamang. Taunang price adjustment na hanggang 18% simula Year 2, batay sa market conditions na tutukuyin ng supplier."\n\nAt ang "₱17.00 in-house cost"? Full absorption cost. Ang maiiwasan lang kapag tumigil silang gumiling: ₱13.80 — variable at ilang direct fixed. Ang gilingan at ang espasyo: walang ibang gamit.\n\nOutsourcing math: bili ₱15.50 vs iwas ₱13.80 = LUGI ₱1.70 kada kilo. Bago pa ang 18%.',
    inspect: {
      kind: 'document',
      lines: [
        ' MZR FOODS CORP.            ',
        ' QUOTATION — GALAPONG       ',
        '---------------------------',
        ' P 15.50 / kg               ',
        '   ("vs P17.00 in-house")   ',
        '---------------------------',
        ' p.6, fine print:           ',
        ' "Year 1 only. Annual       ',
        '  adjustment up to 18%      ',
        '  from Year 2, per market   ',
        '  conditions determined     ',
        '  BY THE SUPPLIER."         ',
      ],
      hint: 'Kapag ang supplier ang nagtatakda ng "market conditions", hindi iyan presyo — pain iyan sa bitag.',
    },
  },
  'ev-sec': {
    name: 'SEC Registration — MZR',
    iconId: 'icon-doc',
    short: 'Incorporators ng MZR Foods: numero uno, MARCO Z. REYES.',
    detail:
      'SEC Certificate of Incorporation — MZR FOODS CORPORATION\nRehistrado: Marso 2023 (limang buwan bago ang roadmap)\n\nIncorporators:\n1. REYES, MARCO Z. .............. 40%\n2. REYES-VILORIA, MARISSA Z. .... 30%\n3. VILORIA, EDGARDO T. .......... 30%\n\nHiniram ni Nina sa SEC i-View. Ang "pinakamurang supplier" sa canvass ni Marco ay pag-aari ni... Marco. Ang M sa MZR ay hindi misteryo. Inisyal niya iyon.',
    inspect: {
      kind: 'document',
      lines: [
        ' SEC — CERT. OF INC.        ',
        ' MZR FOODS CORPORATION      ',
        ' registered: MAR 2023       ',
        '---------------------------',
        ' INCORPORATORS:             ',
        ' 1. REYES, MARCO Z.    40%  ',
        ' 2. REYES-VILORIA, M.  30%  ',
        ' 3. VILORIA, E.        30%  ',
        '---------------------------',
        ' 5 buwan bago ang roadmap   ',
      ],
      hint: 'Nirehistro niya ang supplier BAGO niya isinulat ang rekomendasyong bumili mula rito.',
    },
  },
  'ev-hurno': {
    name: 'Project Hurno Memo',
    iconId: 'icon-ledger',
    short: '₱2M na ang nagastos. ₱1.5M pa para matapos. Para sa kapasidad na hindi kailangan.',
    detail:
      'Project Hurno — incremental analysis ni Jun\n\nNagastos na (2022–2023) ......... ₱2,000,000 — SUNK\n  Hindi na mababawi, ituloy man o ihinto.\n\nKung ITULOY:\n  Gastos para matapos ........... (₱1,500,000)\n  Dagdag na kapasidad ........... +40,000 pcs/qtr\n  Kasalukuyang utilization ...... 60% — may 40% nang tulog\n  Dagdag na kita sa dagdag-kapasidad: ₱0 sa nakikitang hinaharap\n\nKung IHINTO:\n  Salvage (bentang shell at kagamitan sa katabing commissary): +₱400,000\n\nAng ₱2,000,000 ay wala sa magkabilang kolum. Hindi na siya botante sa desisyong ito.',
    inspect: {
      kind: 'document',
      lines: [
        ' PROJECT HURNO              ',
        '---------------------------',
        ' Nagastos na:  2,000,000    ',
        '   >> SUNK — wala sa        ',
        '      desisyon <<           ',
        ' ITULOY: (1,500,000) para   ',
        '   sa kapasidad na di       ',
        '   kailangan (60% util.)    ',
        ' IHINTO: +400,000 salvage   ',
        '---------------------------',
        ' difference: 1.9M pabor     ',
        ' sa paghinto                ',
      ],
      hint: 'Ang tanong ay hindi "sasayangin ko ba ang ₱2M?" Nasayang na iyon. Ang tanong: "sasayangin ko pa ba ang susunod na ₱1.5M?"',
    },
  },
}

export const notes: Record<NoteId, ReviewerNote> = {
  'note-mas': {
    concept: 'Ano ang MAS — at Sino ang Pinaglilingkuran Nito',
    citation: 'MAS practice standards; Code of Ethics (competence & due care)',
    body: 'Ang Management Advisory Services ay payo sa desisyon — hindi opinyon sa financial statements. Walang "true and fair" dito; ang sukatan ay: tama ba ang analysis, at para KANINO ang benepisyo? Ang unang tanong sa bawat rekomendasyon ay hindi "magkano ang matitipid" kundi "relevant ba ang mga numerong pinagbatayan".',
  },
  'note-cm': {
    concept: 'Contribution Margin: ang Wika ng Desisyon',
    citation: 'MAS: CVP analysis',
    body: 'Sales minus variable costs. Iyan ang perang natitira para bayaran ang fixed costs at maging kita. Halos bawat short-term na desisyon — itigil, tanggapin, gawin, bilhin — ay nasasagot sa tanong na: ano ang mangyayari sa TOTAL contribution margin? Ang "net income per unit" ay madalas kasinungalingan; ang CM ay hindi.',
  },
  'note-segment': {
    concept: 'Keep-or-Drop: Avoidable Lang ang Bilang',
    citation: 'MAS: relevant costing — segment elimination',
    body: 'Ang segment na "lugi" pagkatapos ng allocated common costs ay maaaring kumikita pala. Ang test: kapag itinigil, ano ang MAWAWALA (contribution margin) at ano ang MAIIWASAN (direct/avoidable fixed)? Kung positibo ang segment margin, ang pagtigil ay pagpapalubog. At ang allocated costs na lilipat sa ibang lines ay magpapa-"lugi" naman sa kanila — ang tinatawag na death spiral.',
  },
  'note-special': {
    concept: 'Special Orders sa Idle Capacity',
    citation: 'MAS: relevant costing — accept-or-reject',
    body: 'Kapag may idle capacity at hindi maaapektuhan ang regular na benta, ang tamang paghahambing ay presyo laban sa INCREMENTAL cost — kadalasan variable cost lang. Ang allocated fixed overhead ay nariyan na, tanggapin man o hindi. Ang order na "lugi" laban sa full cost ay maaaring kita laban sa relevant cost.',
  },
  'note-makeorbuy': {
    concept: 'Make-or-Buy: ang Presyo Laban sa Maiiwasan',
    citation: 'MAS: relevant costing — outsourcing decisions',
    body: 'Ang paghahambing ay hindi "presyo ng supplier vs full cost namin". Ito ay: presyo ng supplier laban sa AVOIDABLE cost ng paggawa, dagdag ang kikitain ng mapapalayang kapasidad (opportunity cost). Kung walang ibang gamit ang kapasidad at maliit lang ang maiiwasan, ang "mas murang" supplier ay mas mahal. At laging basahin ang escalation clause.',
  },
  'note-ethics': {
    concept: 'Objectivity at Conflict of Interest sa Advisory',
    citation: 'Code of Ethics for Professional Accountants; MAS practice standards',
    body: 'Ang payo ay may halaga lamang kung malinis ang pinanggalingan. Dalawang pulang bandila dito: ang CONTINGENT FEE (bayad na porsiyento ng "savings" — ganti sa paglaki ng numero, hindi sa katotohanan) at ang undisclosed na interes sa kalalabasan ng rekomendasyon. Ang consultant na nagrerekomendang bumili sa sarili niyang kompanya ay hindi na consultant — benta na iyon, nakadamit-payo.',
  },
  'note-sunk': {
    concept: 'Sunk Costs: ang Perang Hindi Na Botante',
    citation: 'MAS: relevant costing; capital budgeting',
    body: 'Ang nagastos na ay pantay sa lahat ng pagpipilian — kaya wala itong boto sa desisyon. Masakit iwanan ang ₱2M, pero ang ₱2M ay wala na, ituloy man o ihinto. Ang tanging tanong: mula NGAYON, alin ang mas mabuti? Hindi kahinaan ang umamin na hindi na dapat ituloy — iyon ang pinakamahirap at pinakamahusay na desisyon sa managerial accounting, dahil laban ito sa puso.',
  },
}
