// Case 01 dialogue. Taglish: Tagalog voice, accounting terms in English.

import type { DialogueLine, ScriptId } from '../../engine/types'

export const scripts: Record<ScriptId, DialogueLine[]> = {
  // ---------- Act 1: briefing ----------
  'sc-start': [
    { kind: 'narrate', text: 'Ferrer & Alcaraz, CPAs — Lunes ng umaga, 7:40 AM.' },
    { kind: 'say', speaker: 'cess', text: 'Jun! Gising. Unang fieldwork mo ngayon.' },
    { kind: 'say', speaker: 'jun', text: 'Gising na po ako, Ate Cess. Third cup ko na \'to.' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Cabrera Trading. Maliit na trading company sa Sampaloc — hardware at office supplies. Petty cash fund ang assignment mo.',
    },
    { kind: 'say', speaker: 'jun', text: 'Petty cash? Ate, ₱20,000 lang \'yon. Wala pang isang porsyento ng total assets nila.' },
    {
      kind: 'say',
      speaker: 'cess',
      pose: 'stern',
      text: 'Sabi mo. Pero ang tanong ko: bakit apat na beses nag-replenish ang ₱20,000 na pondo nitong nakaraang buwan?',
    },
    { kind: 'say', speaker: 'jun', text: '...₱80,000 pala \'yon sa isang buwan.' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Ngayon nakikinig ka na. Maliit ang pondo, malaki ang daloy. At kadalasan, dito nagsisimula ang malaki.',
    },
    { kind: 'give', evidence: 'ev-program' },
    { kind: 'give', evidence: 'ev-policy' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Eto ang audit program at ang PCF policy nila. Basahin mo ang policy bago ka pumasok — kailangan mong alam ang tama bago mo mahanap ang mali.',
    },
    {
      kind: 'choice',
      prompt: 'Ano ang unang gagawin mo pagdating sa kliyente?',
      options: [
        { text: 'Surprise cash count agad.', label: 'right' },
        { text: 'Kausapin muna ang custodian.', label: 'soft' },
      ],
    },
    { kind: 'label', name: 'soft' },
    {
      kind: 'say',
      speaker: 'cess',
      pose: 'stern',
      text: 'Mali. Kapag pinaalam mo pa, may oras siyang ayusin ang kaha. Ang cash count ay SURPRISE — kaya nga surprise.',
    },
    { kind: 'goto', label: 'go' },
    { kind: 'label', name: 'right' },
    { kind: 'say', speaker: 'cess', text: 'Tama. Bilangin bago magtanong. Walang paalam, walang paghahanda.' },
    { kind: 'label', name: 'go' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Isa pa: ang custodian ay si Malou Salcedo. Sampung taon na sa kompanya. Mabait. Alagang-alaga ang mga bata sa opisina.',
    },
    { kind: 'say', speaker: 'jun', text: 'Kaya siguro walang nagdududa sa kanya.' },
    { kind: 'say', speaker: 'cess', text: 'Kaya nga tayo ang tinawag. Tara na.' },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'office' },
  ],

  // ---------- Act 1: investigation ----------
  'sc-count': [
    { kind: 'narrate', text: 'Binuksan mo ang kaha sa harap ni Malou. Binilang mo ang bawat piso.' },
    { kind: 'say', speaker: 'malou', text: 'Bakit ngayon pa? Wala akong balita na may audit ngayong araw...' },
    { kind: 'say', speaker: 'jun', text: 'Standard procedure lang po, Ma\'am. Kailangan lang kayong nandito habang binibilang.' },
    { kind: 'narrate', text: 'Cash: ₱4,100. Vouchers: ₱14,650. May vale slip din — ₱1,000, sulat-kamay.' },
    { kind: 'narrate', text: 'Kabuuan: ₱18,750 na lehitimo. Dapat ₱20,000. Kulang ng ₱1,250.' },
    { kind: 'give', evidence: 'ev-count' },
    { kind: 'give', evidence: 'ev-vale' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Naku, siguro may hindi pa ako nailalagay na resibo. Bukas ko na lang hanapin?' },
    { kind: 'say', speaker: 'cess', text: 'Ngayon na lang, Malou. Nandito na kami, e.' },
    { kind: 'note', note: 'note-imprest' },
    { kind: 'setFlag', flag: 'f-counted' },
  ],

  'sc-vale': [
    { kind: 'narrate', text: 'Tiningnan mong mabuti ang vale slip. Papel mula sa notebook, sulat-kamay.' },
    { kind: 'say', speaker: 'jun', text: '"Vale — ₱1,000. Babayaran ko sa sweldo. — M. Salcedo, 4 Aug." Ma\'am, bawal po ito sa policy niyo.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Emergency lang \'yan, hijo. Babalik din \'yan sa Biyernes. Lagi namang bumabalik.' },
    { kind: 'say', speaker: 'jun', text: '"Lagi"?' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: '...minsan lang. Minsan lang talaga.' },
    { kind: 'note', note: 'note-vale' },
    { kind: 'setFlag', flag: 'f-vale' },
  ],

  'sc-vouchers': [
    { kind: 'narrate', text: 'Hinalungkat mo ang voucher bundle. Kape, load, grab, xerox, tubig — ordinaryo lahat.' },
    { kind: 'narrate', text: 'Maliban sa isa. PCV #204: ₱4,850, R&M Merchandise, "office supplies (bulk)".' },
    { kind: 'give', evidence: 'ev-vouchers' },
    { kind: 'say', speaker: 'jun', text: 'Ate, ₱2,000 ang limit kada voucher. Ito, ₱4,850.' },
    { kind: 'say', speaker: 'cess', text: 'At may kalakip na OR. Tingnan mo nga.' },
    { kind: 'give', evidence: 'ev-or871' },
    { kind: 'narrate', text: 'May kakaiba sa numero. Parang mas maitim ang tinta ng "4"...' },
    { kind: 'say', speaker: 'cess', text: 'Suriin mo \'yan sa Working Papers. May loupe ka sa bag.' },
    { kind: 'setFlag', flag: 'f-vouchers' },
  ],

  'sc-malou-1': [
    { kind: 'say', speaker: 'malou', text: 'Kumusta, hijo? Gusto mo ng kape? May pandesal pa kami sa likod.' },
    { kind: 'branch', when: { allOf: ['f-counted'] }, label: 'after' },
    { kind: 'say', speaker: 'jun', text: 'Mamaya na po, Ma\'am. May tatapusin lang po ako.' },
    { kind: 'say', speaker: 'malou', text: 'Sige, sige. Nandito lang ako.' },
    { kind: 'goto', label: 'end' },
    { kind: 'label', name: 'after' },
    { kind: 'say', speaker: 'jun', text: 'Ma\'am, ₱1,250 po ang kulang sa pondo.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Ay, ganoon ba? Baka may nabitawan lang akong resibo. Alam mo naman, ang dami-daming papel dito.' },
    { kind: 'say', speaker: 'cess', text: 'Malou, handa ka na bang magbigay ng pormal na testimonya?' },
    { kind: 'say', speaker: 'malou', text: 'Testimonya? Naku... o sige. Wala naman akong itinatago.' },
    { kind: 'setFlag', flag: 'f-ready-t1' },
    { kind: 'label', name: 'end' },
  ],

  // ---------- Testimony 1 presses ----------
  'sc-t1-p1': [
    { kind: 'say', speaker: 'jun', text: 'Sampung taon po kayong custodian?' },
    { kind: 'say', speaker: 'malou', text: 'Simula nang mamatay ang asawa ko. Si Mr. Cabrera mismo ang nagbigay sa akin ng susi.' },
    { kind: 'say', speaker: 'cess', text: 'At sino ang nagre-review ng ginagawa mo, Malou?' },
    { kind: 'say', speaker: 'malou', text: '...wala naman. Tiwala sila sa akin.' },
    { kind: 'say', speaker: 'jun', text: '(Walang review. Isang tao, hawak lahat.)' },
  ],
  'sc-t1-p2': [
    { kind: 'say', speaker: 'jun', text: 'Kumpleto po ba talaga, Ma\'am? Kahit ngayong umaga?' },
    { kind: 'say', speaker: 'malou', text: 'Oo naman! Bale... may vale lang ako. Pero hindi \'yon bilang, di ba? Babayaran ko naman \'yon.' },
    { kind: 'say', speaker: 'cess', text: 'Marinig mo ba ang sarili mo? "Hindi \'yon bilang."' },
  ],
  'sc-t1-p3': [
    { kind: 'say', speaker: 'jun', text: 'Kailan po kayo huling nag-replenish?' },
    { kind: 'say', speaker: 'malou', text: 'Noong isang linggo. Bakit?' },
    { kind: 'say', speaker: 'jun', text: 'Kasi dati po, buwanan. Ngayon, lingguhan na.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Mahal na ang lahat ngayon, hijo. Tumaas ang presyo ng kape.' },
    { kind: 'say', speaker: 'jun', text: '(Apat na beses ang ₱20,000 kada buwan. Hindi kape \'yon.)' },
  ],
  'sc-t1-p4': [
    { kind: 'say', speaker: 'jun', text: 'Sino pa po ang may access sa kaha?' },
    { kind: 'say', speaker: 'malou', text: 'Ako lang. Nasa akin ang susi, gabi\'t araw.' },
    { kind: 'say', speaker: 'cess', text: 'Kaya kung may kulang, isa lang ang puwedeng magpaliwanag.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: '...' },
  ],

  'sc-t1-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Ma\'am, hindi po kumpleto ang pondo. Binilang natin kanina — mismong harap niyo.' },
    { kind: 'say', speaker: 'jun', text: 'Cash ₱4,100. Vouchers ₱14,650. Kabuuan: ₱18,750. Dapat ₱20,000.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Kasama na \'yung vale ko doon...' },
    {
      kind: 'say',
      speaker: 'jun',
      text: 'Kahit isama ang vale, ₱19,750 pa rin. At sabi ng policy niyo mismo: bawal ang vale sa kaha. Alinman ang piliin niyo, kulang pa rin.',
    },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Aba, e... siguro nga may... naiwan akong resibo sa bahay...' },
    { kind: 'say', speaker: 'cess', text: 'Jun. Ang voucher #204.' },
    { kind: 'say', speaker: 'jun', text: 'Opo. Ma\'am — R&M Merchandise. ₱4,850. Ano po ang binili niyo doon?' },
    { kind: 'say', speaker: 'malou', text: 'Ay, \'yon ba? Bond paper, ballpen, folder. Bulk order kasi para makamura.' },
    { kind: 'say', speaker: 'cess', text: 'Puntahan natin ang R&M.' },
    { kind: 'moveTo', scene: 'street' },
  ],

  // ---------- Act 2: R&M ----------
  'sc-store': [
    { kind: 'narrate', text: 'Nakababa ang rolling door ng R&M Merchandise. Kalawangin na ang padlock.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... sarado.' },
    { kind: 'narrate', text: 'May notice ng barangay na nakadikit: "CLOSED — MAY 2023". Makapal na ang alikabok sa signage.' },
    { kind: 'say', speaker: 'jun', text: 'Mayo pa. Pero ang OR, June 12.' },
    { kind: 'say', speaker: 'cess', text: 'Kunan mo ng litrato. Kasama ang notice at ang petsa.' },
    { kind: 'give', evidence: 'ev-photo' },
    { kind: 'note', note: 'note-existence' },
    { kind: 'setFlag', flag: 'f-photo' },
  ],

  'sc-bong': [
    { kind: 'say', speaker: 'bong', text: 'Hinahanap niyo si Mrs. Ramos? Matagal nang sarado \'yan, iho.' },
    { kind: 'say', speaker: 'jun', text: 'Kailan po sila nagsara?' },
    { kind: 'say', speaker: 'bong', text: 'Mayo. Nagkasakit \'yung mister niya, umuwi sila sa Bicol. Wala nang nagbukas simula noon.' },
    { kind: 'say', speaker: 'jun', text: 'Sigurado po kayo? Wala man lang bumibili kahit paminsan-minsan?' },
    {
      kind: 'say',
      speaker: 'bong',
      text: 'Iho, katabi ko \'yan. Ako ang unang nakakakita kung may pumapasok. Wala. Baka multo lang.',
    },
    { kind: 'say', speaker: 'jun', text: '(Multo na bumili ng ₱4,850 na bond paper.)' },
    { kind: 'setFlag', flag: 'f-bong' },
  ],

  'sc-priorfile': [
    { kind: 'say', speaker: 'cess', text: 'Hinugot ko ang prior-year file. May sample tayong tunay na OR ng R&M.' },
    { kind: 'give', evidence: 'ev-genuine-or' },
    { kind: 'say', speaker: 'cess', text: 'Ikumpara mo. Isang tinta lang ang mga numero, at may pre-printed na pirma ni Mrs. Ramos.' },
    { kind: 'say', speaker: 'jun', text: 'Sa #0871, blangko ang "Received by".' },
    { kind: 'say', speaker: 'cess', text: 'At isa pa — FY2023 ang engagement natin, kaya OR pa ang primary document noon.' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Sa ilalim ng EOPT Act — RA 11976, 2024 — invoice na ang pangunahin. Kung mag-a-audit ka ng bagong period, ibang dokumento na ang hahanapin mo.',
    },
    { kind: 'say', speaker: 'jun', text: 'Nagbabago pala ang hinahanap depende sa taon.' },
    { kind: 'say', speaker: 'cess', text: 'Ang batas, oo. Ang tanong, hindi: totoo ba \'to?' },
    { kind: 'setFlag', flag: 'f-genuine' },
  ],

  'sc-loupe': [
    { kind: 'narrate', text: 'Inilapag mo ang OR #0871 sa ilalim ng loupe. Dahan-dahan mong sinundan ang mga numero.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... ang "4". Ibang tinta. Mas maitim, mas makapal.' },
    { kind: 'narrate', text: 'May bakas ng bura sa ilalim. At ang spacing ng "850" — nakasentro para sa tatlong digit, hindi apat.' },
    { kind: 'say', speaker: 'jun', text: '₱850 ang orihinal. Idinagdag ang "4".' },
    { kind: 'give', evidence: 'ev-ink' },
    { kind: 'say', speaker: 'cess', text: '₱4,000 ang diperensiya. Sa isang voucher lang.' },
    { kind: 'setFlag', flag: 'f-ink' },
  ],

  'sc-back-office': [
    { kind: 'say', speaker: 'cess', text: 'Handa ka na bang bumalik kay Malou?' },
    { kind: 'say', speaker: 'jun', text: 'Opo.' },
    { kind: 'say', speaker: 'cess', text: 'Tandaan mo: hindi mo siya kalaban. Ang trabaho mo ay ang totoo, hindi ang panalo.' },
    { kind: 'testimony', testimony: 't2-purchase' },
  ],

  // ---------- Testimony 2 presses ----------
  'sc-t2-p1': [
    { kind: 'say', speaker: 'jun', text: 'Anong oras po kayo pumunta sa R&M noong June 12?' },
    { kind: 'say', speaker: 'malou', text: 'Hapon. Pagkatapos ng lunch. Bakit ba ang dami mong tanong sa oras?' },
  ],
  'sc-t2-p2': [
    { kind: 'say', speaker: 'jun', text: 'Bakit po sa R&M pa kayo bumili? May supplier naman kayo, di ba?' },
    { kind: 'say', speaker: 'malou', text: 'Mas mura doon. At matagal ko nang kilala si Mrs. Ramos.' },
    { kind: 'say', speaker: 'jun', text: '(Kilala niya si Mrs. Ramos... pero hindi niya alam na sarado na?)' },
  ],
  'sc-t2-p3': [
    { kind: 'say', speaker: 'jun', text: '₱4,850 po para sa bond paper at ballpen?' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Bulk nga, e! Sampung ream! Kasama na \'yung mga folder.' },
    { kind: 'say', speaker: 'cess', text: 'Sampung ream. Nasaan sila ngayon, Malou?' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: '...naubos na siguro.' },
  ],
  'sc-t2-p4': [
    { kind: 'say', speaker: 'jun', text: 'Sino po ang nag-abot sa inyo ng resibo?' },
    { kind: 'say', speaker: 'malou', text: 'Si Mrs. Ramos! Siya mismo. Nakangiti pa nga.' },
    { kind: 'say', speaker: 'jun', text: '(Blangko ang "Received by" sa OR. Hindi \'yon ang gawi ni Mrs. Ramos.)' },
  ],

  'sc-t2-break1': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Hindi po kayo puwedeng bumili sa R&M noong June 12.' },
    { kind: 'say', speaker: 'malou', text: 'Ha? Bakit naman?' },
    { kind: 'say', speaker: 'jun', text: 'Dahil sarado na ang R&M mula pa noong Mayo. Eto po ang litrato — kalawangin ang padlock, may notice ng barangay.' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'jun', text: 'Kinumpirma rin ng katabing tindahan. Walang nagbukas ng pinto simula Mayo.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'A-ah! Naalala ko na! Mas maaga pala \'yon. Abril siguro? Na-late lang ang pagbigay ng resibo.' },
    { kind: 'say', speaker: 'cess', text: 'Kaya nakalagay ang June 12 sa resibo.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Mali siguro ang sulat ni Mrs. Ramos! Matanda na \'yon, e!' },
    { kind: 'note', note: 'note-existence' },
    { kind: 'testimony', testimony: 't2b-revised' },
  ],

  'sc-t2b-p1': [
    { kind: 'say', speaker: 'jun', text: 'Kaninang umaga, sigurado kayong June 12. Ngayon, Abril na po?' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Nagkakaedad na rin ako, hijo. Nagkakamali ang tao.' },
  ],
  'sc-t2b-p2': [
    { kind: 'say', speaker: 'jun', text: 'Nagkamali po si Mrs. Ramos ng petsa, sabi niyo?' },
    { kind: 'say', speaker: 'malou', text: 'Oo! Baka nagmamadali siya nun.' },
    { kind: 'say', speaker: 'jun', text: '(Nagmamadaling nagsulat ng petsa na dalawang buwan matapos siyang magsara.)' },
  ],
  'sc-t2b-p3': [
    { kind: 'say', speaker: 'jun', text: 'Tama po ba ang halaga? ₱4,850?' },
    { kind: 'say', speaker: 'malou', text: 'Oo naman! Nandiyan mismo sa resibo, di ba? Nakasulat!' },
    { kind: 'say', speaker: 'cess', text: '"Nakasulat." Interesting ang pagkakapili mo ng salita, Malou.' },
  ],

  'sc-t2b-break': [
    { kind: 'shout', card: 'ETO, O!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Tingnan niyo po ang sarili niyong resibo sa ilalim ng loupe.' },
    { kind: 'say', speaker: 'jun', text: 'Ang "4" sa "₱4,850" — ibang tinta. Mas maitim. May bura sa ilalim.' },
    { kind: 'say', speaker: 'jun', text: 'At ang spacing ng "850" ay nakasentro para sa TATLONG digit. ₱850 po ang orihinal.' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: 'Hindi... hindi ako marunong gumawa niyan...' },
    { kind: 'say', speaker: 'jun', text: 'Isang numero lang po ang kailangan, Ma\'am. ₱4,000 ang napunta sa bulsa.' },
    { kind: 'say', speaker: 'cess', text: 'At ang tunay na ₱850? Bond paper siguro. Para may maipakita kung may magtanong.' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: 'S-si Dodong! Si Dodong ang pinabili ko! Siya ang may hawak ng pera nun!' },
    { kind: 'say', speaker: 'jun', text: 'Si Dodong po?' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Oo! Siya ang nag-errand! Kung may binago sa resibo, hindi ako \'yon!' },
    { kind: 'note', note: 'note-vouching' },
    { kind: 'moveTo', scene: 'office2' },
  ],

  // ---------- Act 3 ----------
  'sc-dodong': [
    { kind: 'say', speaker: 'dodong', text: 'Ako po? Errand sa R&M? Sir, hindi po ako nakalabas noong June 12.' },
    { kind: 'say', speaker: 'jun', text: 'Sigurado ka?' },
    { kind: 'say', speaker: 'dodong', text: 'Opo! Sick leave po ako nun — dengue. Tatlong araw akong wala. Nakasulat po \'yon sa HR calendar.' },
    { kind: 'say', speaker: 'jun', text: 'May makakapagpatunay ba?' },
    { kind: 'say', speaker: 'dodong', text: 'Yung logbook po ng guard! Lahat ng labas-pasok, nakasulat doon. Kunin ko po?' },
    { kind: 'narrate', text: 'Bumalik si Dodong may dalang photocopy. June 12: walang entry para sa kanya. Sa halip — "SICK LEAVE (approved)".' },
    { kind: 'give', evidence: 'ev-gatelog' },
    { kind: 'say', speaker: 'dodong', text: 'Sir... bakit po sinabi ni Ate Malou na ako?' },
    { kind: 'say', speaker: 'jun', text: '...' },
    { kind: 'setFlag', flag: 'f-gatelog' },
  ],

  'sc-analytics': [
    { kind: 'say', speaker: 'cess', text: 'Ginawa ko ang analytical review habang nasa labas ka.' },
    { kind: 'give', evidence: 'ev-ledger' },
    { kind: 'say', speaker: 'cess', text: 'Jan hanggang Marso: isang replenishment kada buwan. Simula Abril: tatlo, apat.' },
    { kind: 'say', speaker: 'jun', text: 'Doble ang bilis. Pero hindi lumaki ang operasyon.' },
    { kind: 'say', speaker: 'cess', text: 'At ang unang vale? Abril din.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... ano po ang nangyari noong Abril?' },
    { kind: 'say', speaker: 'cess', text: 'Hindi ko alam. Pero alam ng ledger na may nangyari.' },
    { kind: 'setFlag', flag: 'f-ledger' },
  ],

  'sc-bundle-again': [
    { kind: 'narrate', text: 'Muli mong hinalungkat ang voucher bundle. May naipit sa likod — hindi voucher.' },
    { kind: 'narrate', text: 'Statement of account. Sta. Teresa Medical Center. Marso 2023.' },
    { kind: 'narrate', text: 'Pasyente: SALCEDO, Rogelio. Balance: ₱47,300. May sulat-kamay sa gilid: "paunti-unti muna."' },
    { kind: 'give', evidence: 'ev-hospital' },
    { kind: 'say', speaker: 'jun', text: 'Ate...' },
    { kind: 'say', speaker: 'cess', text: 'Alam ko.' },
    { kind: 'say', speaker: 'jun', text: 'Hindi ba natin puwedeng... hindi na lang isama \'to?' },
    {
      kind: 'say',
      speaker: 'cess',
      pose: 'stern',
      text: 'Jun. Naiintindihan ko. Pero hindi tayo ang humuhusga kung bakit — tayo ang nagsasabi kung ano.',
    },
    { kind: 'say', speaker: 'cess', text: 'At ang "bakit" ay hindi dahilan para itago ang "ano". Ito mismo ang pressure sa fraud triangle.' },
    { kind: 'setFlag', flag: 'f-hospital' },
  ],

  'sc-to-conf': [
    { kind: 'say', speaker: 'cess', text: 'Handa na ang exit conference. Nandiyan na si Partner Alcaraz.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... kinakabahan po ako.' },
    { kind: 'say', speaker: 'cess', text: 'Mabuti. Ibig sabihin, alam mong may timbang ito.' },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'conference' },
  ],

  'sc-conf-open': [
    { kind: 'say', speaker: 'alcaraz', text: 'Magandang hapon. Nandito tayo para sa findings sa petty cash fund ng Cabrera Trading.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Ginoong Ramos, ikaw ang staff na nag-perform. Ipakita mo.' },
    { kind: 'say', speaker: 'jun', text: 'Opo, Sir.' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Sir Alcaraz, sampung taon na po ako dito. Kilala niyo po ako.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Kilala kita, Malou. Kaya nga masakit ito. Magsalita ka — huling pagkakataon.' },
    { kind: 'testimony', testimony: 't3-final' },
  ],

  'sc-t3-p1': [
    { kind: 'say', speaker: 'jun', text: 'Bakit po si Dodong ang binanggit niyo?' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Kasi siya ang laging nag-e-errand! Lahat ng labas, siya!' },
    { kind: 'say', speaker: 'dodong', text: 'Ate Malou... bakit po?' },
    { kind: 'say', speaker: 'malou', text: '...' },
  ],
  'sc-t3-p2': [
    { kind: 'say', speaker: 'jun', text: 'Wala po kayong kinuha sa pondo, sabi niyo?' },
    { kind: 'say', speaker: 'malou', text: 'Hindi ako magnanakaw! Hiniram ko lang! May pinagkaiba \'yon!' },
    { kind: 'say', speaker: 'cess', text: '"Hiniram." Sabi mo kanina, wala kang kinuha. Ngayon, hiniram mo?' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'jun', text: '(Nadulas siya. Ang rationalization, lumalabas kahit ayaw niya.)' },
  ],
  'sc-t3-p3': [
    { kind: 'say', speaker: 'jun', text: 'Walang problema sa pera, sabi niyo?' },
    { kind: 'say', speaker: 'malou', text: 'Wala! Sapat naman ang sweldo ko. Simple lang ako mabuhay.' },
    { kind: 'say', speaker: 'jun', text: '(₱47,300. Marso.)' },
  ],
  'sc-t3-p4': [
    { kind: 'say', speaker: 'jun', text: 'Kayo lang po ang may susi ng kaha?' },
    { kind: 'say', speaker: 'malou', text: 'Oo. Ako lang. Pinagkatiwalaan nila ako.' },
    { kind: 'say', speaker: 'alcaraz', text: 'At \'yan mismo, Malou, ang pinakamalaking pagkakamali ng kompanyang ito.' },
  ],

  'sc-t3-break1': [
    { kind: 'shout', card: 'ETO, O!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Hindi po puwedeng si Dodong. Naka-sick leave siya noong June 12.' },
    { kind: 'say', speaker: 'jun', text: 'Eto ang kopya ng gate logbook. Walang entry. May approved leave sa HR calendar. Dengue.' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: 'H-hindi... baka nagkamali ang guard...' },
    { kind: 'say', speaker: 'dodong', text: 'Tatlong araw po akong naka-dextrose, Ate.' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: '...' },
    {
      kind: 'say',
      speaker: 'jun',
      text: 'Walang lumabas noong araw na \'yon. Walang bumili. Walang tindahang bukas. Ang tanging totoo sa transaksiyong \'yon ay ang ₱4,850 na lumabas sa kaha.',
    },
    { kind: 'say', speaker: 'alcaraz', text: 'Malou. Tapos na.' },
    { kind: 'note', note: 'note-skepticism' },
    { kind: 'testimony', testimony: 't3b-last' },
  ],

  'sc-t3b-p1': [
    { kind: 'say', speaker: 'jun', text: 'Wala pong problema sa pera?' },
    { kind: 'say', speaker: 'malou', pose: 'nervous', text: 'Wala. Wala talaga. Kaya ko naman.' },
    { kind: 'say', speaker: 'jun', text: '(Nanginginig ang kamay niya.)' },
  ],
  'sc-t3b-p2': [
    { kind: 'say', speaker: 'jun', text: 'Sabi niyo, "hiniram" lang.' },
    { kind: 'say', speaker: 'malou', text: 'Babayaran ko! Lagi kong binabayaran! Tanungin mo sila!' },
    { kind: 'say', speaker: 'cess', text: 'Ang vale ng Agosto, hindi pa bayad. At ang ₱4,000 ng Hunyo?' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: '...' },
  ],

  'sc-t3b-break': [
    { kind: 'shout', card: 'OBJECTION!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'May problema po kayo sa pera. Simula pa noong Marso.' },
    { kind: 'say', speaker: 'jun', text: 'Sta. Teresa Medical Center. Rogelio Salcedo. ₱47,300.' },
    { kind: 'say', speaker: 'jun', text: 'Naipit po ito sa voucher bundle niyo. Sulat-kamay sa gilid: "paunti-unti muna."' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: '...ang tatay ko \'yan.' },
    { kind: 'narrate', text: 'Tumahimik ang buong conference room.' },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: 'Stroke. Marso. Sabi ng doktor, kailangan ng therapy, tatlong beses sa isang linggo, ₱3,000 kada session.' },
    { kind: 'say', speaker: 'malou', text: 'Ang sweldo ko, ₱18,000. Ang gamot niya, ₱9,000. Ikaw, ano\'ng gagawin mo?' },
    { kind: 'say', speaker: 'jun', text: '...' },
    {
      kind: 'say',
      speaker: 'malou',
      text: 'Hiniram ko lang. ₱1,000 muna, Abril. Babayaran ko sa sweldo. Tapos ₱2,000. Tapos hindi na sapat ang ₱2,000.',
    },
    {
      kind: 'say',
      speaker: 'malou',
      text: 'Yung R&M... nakita ko ang lumang resibo sa file. Sarado na sila. Walang magche-check. Isang numero lang ang idinagdag ko.',
    },
    { kind: 'say', speaker: 'malou', pose: 'shocked', text: 'Isang numero lang... ₱4,000 ang halaga.' },
    { kind: 'say', speaker: 'malou', text: 'Hindi ko naman ito para sa sarili ko. Para kay Tatay. Ibang usapan \'yon, di ba? ...Di ba?' },
    { kind: 'say', speaker: 'cess', text: 'Malou. Naiintindihan ka namin. Pera pa rin \'yon ng kompanya.' },
    { kind: 'note', note: 'note-triangle' },
    { kind: 'testimony', testimony: 't4-close' },
  ],

  'sc-t4-p1': [
    { kind: 'say', speaker: 'jun', text: 'Sir, hindi po ba dapat may nakahuli agad?' },
    { kind: 'say', speaker: 'alcaraz', text: '\'Yan mismo ang tanong. Sampung taon, walang surprise count. Walang review. Isang tao lang ang may hawak ng lahat.' },
  ],
  'sc-t4-p2': [
    { kind: 'say', speaker: 'jun', text: 'Sir, ano po ang mangyayari kay Malou?' },
    { kind: 'say', speaker: 'alcaraz', text: 'Hindi tayo ang magdedesisyon. Sa management \'yon, at sa batas.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Ang atin: iulat ang natuklasan nang tapat, kumpleto, at may ebidensiya. Ni hindi mas mabigat, ni hindi mas magaan.' },
  ],

  'sc-t4-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Sir, hindi lang po si Malou ang finding natin.' },
    { kind: 'say', speaker: 'jun', text: 'Eto po ang PCF policy nila. Sabi mismo: hiwalay dapat ang custody at recording. Bawal ang vale. May limit kada voucher.' },
    { kind: 'say', speaker: 'jun', text: 'Lahat ng \'yan, nilabag. Sa loob ng apat na buwan. Walang nakapansin.' },
    { kind: 'say', speaker: 'jun', text: 'Kung may surprise count noong Abril, ₱1,000 sana ang nawala — hindi ₱17,000.' },
    { kind: 'say', speaker: 'alcaraz', text: '...' },
    { kind: 'say', speaker: 'alcaraz', text: 'Ferrer. Ang staff mo.' },
    { kind: 'say', speaker: 'cess', text: 'Alam ko, Sir. Natuto siya.' },
    {
      kind: 'say',
      speaker: 'alcaraz',
      text: 'Malou, may cash shortage na ₱17,150 at isang altered document. Mapupunta ito sa management at sa audit committee.',
    },
    {
      kind: 'say',
      speaker: 'alcaraz',
      text: 'Pero sa management letter, isusulat ko rin ito: binigyan kayo ng kompanya ng pagkakataong magnakaw. Sampung taon nilang binuksan ang pinto at umasang walang papasok.',
    },
    { kind: 'say', speaker: 'malou', text: 'Sir... pasensiya na po.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Alam ko, Malou. Alam ko.' },
    { kind: 'narrate', text: 'Tumayo si Partner Alcaraz. Tapos ang exit conference.' },
    { kind: 'say', speaker: 'cess', text: 'Jun. Kumusta ang pakiramdam?' },
    { kind: 'say', speaker: 'jun', text: 'Akala ko po masaya kapag nahuli mo. Hindi pala.' },
    { kind: 'say', speaker: 'cess', text: 'Kung masaya ka, mali ang trabaho mo. Tama ang naramdaman mo — at tama rin ang ginawa mo.' },
    { kind: 'say', speaker: 'cess', text: 'Tara, libre kita ng kape. Ako ang bibili — hindi galing sa petty cash.' },
    { kind: 'note', note: 'note-sod' },
    { kind: 'endCase' },
  ],

  'sc-wrong': [
    { kind: 'say', speaker: 'cess', text: 'Jun... hindi konektado \'yan sa sinabi niya. Basahin mong mabuti ang statement.' },
  ],
}
