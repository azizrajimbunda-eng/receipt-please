// Case 03 — "Ang Sweldo ng Multo": speakers, evidence, reviewer notes.
// Ghost employee payroll fraud at a construction contractor — sustained by
// COLLUSION between the foreman (certifies DTRs) and the payroll officer
// (prepares payroll, forges acknowledgments). The teaching core: segregation
// of duties fails under collusion; the control that survives is the one that
// demands a warm body — the surprise payout observation.

import type { Evidence, EvidenceId, NoteId, ReviewerNote, Speaker, SpeakerId } from '../../engine/types'

export const speakers: Record<SpeakerId, Speaker> = {
  jun: { name: 'Jun', role: 'Junior Auditor', spriteId: 'jun', blip: 'low' },
  cess: { name: 'Ate Cess', role: 'Audit Senior', spriteId: 'cess', blip: 'mid' },
  alcaraz: { name: 'Partner Alcaraz', role: 'Engagement Partner', spriteId: 'alcaraz', blip: 'low' },
  nestor: { name: 'Sir Nestor', role: 'Payroll Officer', spriteId: 'nestor', blip: 'low' },
  igme: { name: 'Foreman Igme', role: 'Site Foreman', spriteId: 'igme', blip: 'mid' },
  weng: { name: 'Weng', role: 'Timekeeper', spriteId: 'weng', blip: 'high' },
}

export const evidence: Record<EvidenceId, Evidence> = {
  'ev-program3': {
    name: 'Audit Program — Payroll',
    iconId: 'icon-doc',
    short: 'Ang checklist mo para sa payroll cycle ng Tibay Builders.',
    detail:
      'TIBAY BUILDERS CONSTRUCTION CORP. — FY2023\nAudit Program: Payroll\n\n1. Match payroll register ↔ 201 files ↔ DTRs\n2. Cross-check statutory remittances (SSS/PhilHealth/Pag-IBIG)\n3. Observe an UNANNOUNCED payroll payout\n4. Investigate unclaimed wages\n\nPrepared by: C. Ferrer  Reviewed by: R. Alcaraz',
  },
  'ev-register': {
    name: 'Payroll Register',
    iconId: 'icon-ledger',
    short: '61 pangalan. Si R. dela Peña: ₱4,200 kada linggo, cash.',
    detail:
      'Payroll Register — Site A, Agosto 2023\n\n61 na manggagawa, lingguhang sweldo, cash sa sobre.\nKaraniwan ang lahat — maliban sa isa na hindi mo pa alam kung bakit.\n\nR. DELA PEÑA — laborer, ₱4,200/linggo, kumpleto ang deductions:\nSSS ₱180, PhilHealth ₱112.50, Pag-IBIG ₱100.\n\nMay kaltas siya. May sweldo siya. May pirma siya. Ang tanong: may TAO ba siya?',
  },
  'ev-tip': {
    name: 'Anonymous na Sulat',
    iconId: 'icon-note',
    short: '"May sumusweldo sa Tibay na hindi niyo nakikita."',
    detail:
      'Dumating sa opisina ng Tibay, walang pangalan, walang pirma:\n\n"Sa kinauukulan. May sumusweldo sa Site A na hindi niyo nakikita. Matagal na po ito. Tingnan niyo ang mga sobre tuwing Sabado. Iyon lang po."\n\nMaayos ang sulat-kamay. Maliit. Maingat. Sulat ng taong matagal nang kinakabahan.',
    inspect: {
      kind: 'document',
      lines: [
        '  Sa kinauukulan:            ',
        '                            ',
        '  May sumusweldo sa Site A  ',
        '  na hindi niyo nakikita.   ',
        '  Matagal na po ito.        ',
        '                            ',
        '  Tingnan niyo ang mga      ',
        '  sobre tuwing Sabado.      ',
        '                            ',
        '  Iyon lang po.             ',
      ],
      hint: '"Tingnan niyo ang mga sobre." Alam ng sumulat kung PAANO mahuhuli — kasama ito sa proseso ng sweldo.',
    },
  },
  'ev-dtr': {
    name: 'DTR ni dela Peña',
    iconId: 'icon-doc',
    short: 'Perpekto. 8 oras, araw-araw. Kahit Agosto 1 at 2.',
    detail:
      'Daily Time Records ni R. dela Peña, Agosto 2023.\n\n7:00 AM in, 4:00 PM out. Walang late. Walang absent. Walang overtime.\nParehong-pareho ang bawat araw — parang makina.\n\nAt may entry siya noong Agosto 1 at 2. Tandaan mo ang mga petsang iyon.',
    inspect: {
      kind: 'document',
      lines: [
        ' DTR — R. DELA PEÑA  AUG23  ',
        '---------------------------',
        ' Aug 1 (Tue)  7:00 - 4:00  ',
        ' Aug 2 (Wed)  7:00 - 4:00  ',
        ' Aug 3 (Thu)  7:00 - 4:00  ',
        ' Aug 4 (Fri)  7:00 - 4:00  ',
        ' Aug 5 (Sat)  7:00 - 12:00 ',
        '---------------------------',
        ' Certified: E. IGME        ',
        '   (foreman)                ',
      ],
      hint: 'Walang tao sa mundo na eksaktong 7:00 pumapasok nang dalawampung araw na sunud-sunod. At ano nga ulit ang nangyari noong Agosto 1 at 2?',
    },
  },
  'ev-closure': {
    name: 'Site Closure Memo',
    iconId: 'icon-doc',
    short: 'Sarado ang site noong Aug 1-2 — bagyo. Pirmado mismo ni Igme.',
    detail:
      'Nakapaskil sa bulletin board ng site:\n\n"MEMO — Agosto 1-2, 2023\nSuspendido ang lahat ng trabaho sa Site A dahil sa Bagyong Egay (Signal No. 3). Bawal pumasok sa site. No work.\n\n(sgd.) E. IGME, Site Foreman"\n\nAng foreman na nag-certify na nagtrabaho si dela Peña noong Agosto 1 at 2... ay ang parehong foreman na nagsara ng site sa mga araw ding iyon.',
  },
  'ev-201': {
    name: '201 File ni dela Peña',
    iconId: 'icon-doc',
    short: 'Manipis. Walang SSS number. Malabo ang litrato.',
    detail:
      'Ang personnel file ni R. dela Peña:\n\n• Application form — kalahating pahina lang ang sagot\n• Litrato — photocopy ng photocopy, halos anino na lang\n• SSS number — BLANGKO\n• NBI clearance — wala\n• Emergency contact — "izzz" (hindi mabasa)\n\nAng 201 file ang patunay na dumaan sa tamang proseso ang pag-hire. Ang file na ito ay patunay na hindi.',
  },
  'ev-remit': {
    name: 'SSS R-3 Remittance List',
    iconId: 'icon-ledger',
    short: 'May kaltas si dela Peña sa register. WALA siya sa remittance.',
    detail:
      'SSS R-3 Contribution Collection List — Tibay Builders, Q2-Q3 2023.\n\n60 pangalan ang nire-remit buwan-buwan.\nSa payroll register: 61 ang may kaltas.\n\nAng nawawala: R. DELA PEÑA.\n\nBinabawasan siya ng ₱180 kada linggo para sa SSS — pero walang pumupuntang SSS. Ang taong hindi nire-remit sa gobyerno ay taong ayaw ipakilala sa gobyerno.',
    inspect: {
      kind: 'document',
      lines: [
        ' SSS R-3 — TIBAY BUILDERS   ',
        ' names remitted: 60         ',
        '---------------------------',
        ' ...                        ',
        ' 34. DEL ROSARIO, M.        ',
        ' 35. DIMAANO, R.            ',
        '     (walang DELA PEÑA)     ',
        ' 36. ESTACIO, J.            ',
        ' ...                        ',
        '---------------------------',
        ' register deductions: 61    ',
      ],
      hint: 'Ang register ay gawa ng kompanya. Ang R-3 ay hulog sa gobyerno. Kapag hindi sila tugma, ang isa ay may itinatago.',
    },
  },
  'ev-signatures': {
    name: 'Payroll Acknowledgments',
    iconId: 'icon-doc',
    short: 'Lingguhang pirma ni "R. dela Peña" sa pagtanggap ng sweldo.',
    detail:
      'Payroll acknowledgment sheets — bawat sobre, may pirma ng tumanggap.\n\n"R. dela Peña" — tatlumpu\'t dalawang linggo ng pirma, mula Enero.\nMaayos. Tuloy-tuloy ang tinta. Kumpiyansa ang lagda.\n\nMasyadong kumpiyansa para sa taong walang nakakakita.',
  },
  'ev-handwriting': {
    name: 'Handwriting Comparison',
    iconId: 'icon-note',
    short: 'Ang loop ng "R" at "P" — tugma sa sulat-kamay ni Sir Nestor.',
    detail:
      'Tala ni Ate Cess, inihambing ang mga pirma:\n\n• Ang "R" sa "R. dela Peña" ay may loop pababa — identical sa "R" ng "Reviewed by: N. Ramirez" sa payroll register.\n• Ang bilis at diin ng panulat: pareho.\n• Ang pirma noong Marso, may mantsa ng parehong blue fountain pen na nakapatong sa mesa ni Sir Nestor.\n\nHindi kami questioned document examiner. Pero sapat ito para itanong sa kanya nang harapan.',
    inspect: {
      kind: 'document',
      lines: [
        ' HANDWRITING COMPARISON     ',
        '---------------------------',
        ' "R. dela Peña" (payroll):  ',
        '    R——loop pababa, pahilis ',
        ' "N. Ramirez" (register):   ',
        '    R——loop pababa, pahilis ',
        '---------------------------',
        ' parehong fountain pen ink  ',
        ' (blue-black, wet writer)   ',
      ],
      hint: 'Tatlumpu\'t dalawang linggo ng pirma — at lahat, iisang kamay ang gumuhit.',
    },
  },
  'ev-envelope': {
    name: 'Sobre ni dela Peña',
    iconId: 'icon-cash',
    short: 'Sabado ng payout. Lahat kumuha ng sobre. Isa ang naiwan.',
    detail:
      'Surprise payout observation, Sabado, 9:00 AM.\n\nAnimnapu\'t isang sobre. Animnapung manggagawa ang pumila, nagpakita ng ID, pumirma, kumuha.\n\nIsang sobre ang naiwan sa mesa: R. DELA PEÑA — ₱4,200.\n\nInalok ni Foreman Igme na "dadalhin na lang niya" dahil "may sakit si dela Peña." Tumanggi kami. Ang sobre ay sa tao ibinibigay, hindi sa kuwento.',
  },
  'ev-wenglog': {
    name: 'Logbook ni Weng',
    iconId: 'icon-note',
    short: 'Ang sariling talaan ng timekeeper. Walang dela Peña. Kahit kailan.',
    detail:
      'Ang personal na logbook ni Weng — hindi opisyal, pero mas totoo kaysa sa opisyal:\n\n"Sir, mula nung Enero, ako mismo ang nagbabantay ng time-in. Hindi ko po siya nakita ni minsan. Nung tinanong ko si Foreman, sabi \'huwag na raw akong pakialamera.\' Kaya po ako na lang ang nagsulat. Para may nakasulat."\n\nBawat pahina, listahan ng mga pumasok. Tatlumpu\'t dalawang linggo. Walang dela Peña.',
  },
}

export const notes: Record<NoteId, ReviewerNote> = {
  'note-payroll-cycle': {
    concept: 'Ang Payroll Cycle at ang Apat na Pirma',
    citation: 'PSA 315; AT: payroll cycle controls',
    body: 'Apat na tungkulin ang dapat hiwa-hiwalay sa payroll: ang nag-a-authorize ng hire (HR/201), ang nagtatala ng oras (timekeeper/DTR), ang naghahanda ng payroll, at ang nagbabayad (treasury). Kapag ang isang tao ay nakakaabot sa dalawa o higit — o kapag dalawang tao ang nagkasundo — doon dumadaan ang multo.',
  },
  'note-201': {
    concept: 'Ang 201 File: Existence ng Empleyado',
    citation: 'AT: tests of details — payroll; occurrence assertion',
    body: 'Ang bawat pangalan sa payroll ay dapat may katapat na kumpletong personnel file: application, IDs, SSS/TIN, clearances. Ang manipis o kulang na 201 file sa isang matagal nang "empleyado" ay red flag sa occurrence — baka ang papel lang ang na-hire, hindi ang tao.',
  },
  'note-dtr': {
    concept: 'Timekeeping Evidence at ang Perpektong DTR',
    citation: 'PSA 240 (fraud red flags); AT: payroll',
    body: 'Ang totoong tao ay nale-late, umaabsent, nag-o-overtime. Ang DTR na eksaktong 7:00-4:00 nang tatlumpung araw ay hindi masipag — iyon ay kinopya. At ang entry sa araw na sarado ang site ay hindi na red flag; iyon ay amin na. Ihambing ang DTR sa mga araw na IMPOSIBLENG nagtrabaho ang kahit sino.',
  },
  'note-remittance': {
    concept: 'Statutory Remittances bilang Cross-check',
    citation: 'AT: payroll substantive tests; SSS/PhilHealth/Pag-IBIG filings',
    body: 'Ang payroll register ay gawa ng kompanya — kayang ayusin. Pero ang remittance lists na isinusumite sa SSS at PhilHealth ay may bakas sa labas. Ang nandaraya ay madalas HINDI nagre-remit para sa multo (sayang ang pera, at baka magtanong ang ahensiya) — kaya ang puwang sa pagitan ng register at ng R-3 ang isa sa pinakamabilis na paraan para mahuli ang ghost employee.',
  },
  'note-forensic': {
    concept: 'Pagsusuri ng Pirma at Dokumento',
    citation: 'PSA 240.13; PSA 500 (reliability)',
    body: 'Hindi kailangang maging questioned document examiner para mapansin ang tatlumpu\'t dalawang lingguhang pirma na iisa ang kamay. Ang tungkulin ng auditor ay hindi ang mag-patunay sa korte — ang tungkulin ay mapansin, idokumento, at itaas. Kapag may hinala sa pirma, ihambing sa mga kilalang sulat-kamay sa parehong file.',
  },
  'note-payout': {
    concept: 'Surprise Payout Observation',
    citation: 'AT: payroll — observation ng pay distribution; unclaimed wages',
    body: 'Ang pinaka-lumang lunas sa ghost employee: dumalo nang WALANG PAALAM sa mismong sweldo, ipakuha ang bawat sobre nang may ID at pirma, at imbestigahan ang bawat sobreng walang kumuha. Ang papel ay napipirmahan ng kahit sino. Ang sobre ay kinukuha lamang ng taong totoo.',
  },
  'note-collusion': {
    concept: 'Collusion: ang Hangganan ng Internal Control',
    citation: 'PSA 315.A54 (inherent limitations); PSA 240',
    body: 'Ang segregation of duties ay panlaban sa ISANG madayang tao. Kapag dalawa ang nagkasundo — ang nag-certify ng DTR at ang naghanda ng payroll — magkakandado pa rin ang papeles, at lulusot ang multo nang may apat na pirma. Kaya may mga kontrol na hindi pirma ang hinihingi kundi KATAWAN: ang surprise count, ang surprise payout, ang aktwal na pagharap. Hindi imposibleng dayain ang mga ito — pero hindi ito madadaya ng ballpen lang.',
  },
}
