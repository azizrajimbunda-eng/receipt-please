// Case 02 dialogue. Taglish: Tagalog voice, accounting terms in English.

import type { DialogueLine, ScriptId } from '../../engine/types'

export const scripts: Record<ScriptId, DialogueLine[]> = {
  // ---------- Act 1: briefing ----------
  'sc2-start': [
    { kind: 'narrate', text: 'Ferrer & Alcaraz, CPAs — dalawang linggo matapos ang kaso ng Cabrera Trading.' },
    { kind: 'say', speaker: 'cess', text: 'Jun. May bago tayo. Mabuhay Beverage Distributors — softdrinks at beer, delivery sa mga tindahan.' },
    { kind: 'say', speaker: 'jun', text: 'Distributor? Malaki-laki na po \'yan kaysa sa Cabrera.' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'At cash na cash. Ang mga kolektor nila, umiikot sa mga sari-sari store at carinderia — bayaran sa kamay, resibo sa kamay.',
    },
    {
      kind: 'say',
      speaker: 'cess',
      pose: 'stern',
      text: 'Ang sumbong: dalawang customer ang tumawag sa opisina, galit. "Bakit niyo pa kami sinisingil? BAYAD NA KAMI." Pero sa libro, may utang pa sila.',
    },
    { kind: 'say', speaker: 'jun', text: 'Kung bayad na sila pero hindi pumapasok sa libro... may dumadaan sa pera bago ito umabot sa bangko.' },
    { kind: 'give', evidence: 'ev-program2' },
    { kind: 'give', evidence: 'ev-aging' },
    { kind: 'say', speaker: 'cess', text: 'Eto ang audit program at ang aging schedule. Pansinin mo kung kaninong ruta ang dalawang reklamador.' },
    {
      kind: 'choice',
      prompt: 'Paano mo be-verify-hin kung bayad na nga ang mga customer?',
      options: [
        { text: 'Tanungin mismo ang mga customer.', label: 'right2' },
        { text: 'Tanungin ang kolektor tungkol sa records niya.', label: 'soft2' },
      ],
    },
    { kind: 'label', name: 'soft2' },
    {
      kind: 'say',
      speaker: 'cess',
      pose: 'stern',
      text: 'Isipin mo ang sinabi mo. Ang kolektor ang pinag-uusapan — tapos siya rin ang tatanungin mo kung tapat ang records niya?',
    },
    { kind: 'goto', label: 'go2' },
    { kind: 'label', name: 'right2' },
    { kind: 'say', speaker: 'cess', text: 'Tama. Confirmation — diretso sa customer, hindi dumadaan sa taong ini-imbestigahan.' },
    { kind: 'label', name: 'go2' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Ang kolektor sa rutang \'yon ay si Ryan Villanueva. Paborito ng lahat. Mabilis mag-report, laging maaga, hindi umaabsent.',
    },
    { kind: 'say', speaker: 'jun', text: '"Hindi umaabsent." Sa Cabrera, "pinagkakatiwalaan ng lahat." Nakikita ko na ang pattern, Ate.' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Huwag kang magmadali. Ang hindi pag-absent ay puwedeng sipag lang. Pero sa isang lapping scheme... kailangan mong pumasok ARAW-ARAW para paikutin ang bola. Tandaan mo \'yan.',
    },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'warehouse' },
  ],

  // ---------- Act 1: warehouse investigation ----------
  'sc2-olivia': [
    { kind: 'say', speaker: 'olivia', text: 'Kayo ang mga auditor? Maupo kayo. Pero sasabihin ko agad: nagsasayang kayo ng oras kay Ryan.' },
    { kind: 'say', speaker: 'jun', text: 'Hindi pa po namin sinasabi kung sino ang titingnan namin.' },
    { kind: 'say', speaker: 'olivia', text: '...Ang ruta niya ang may reklamo, hindi ba? Pero makinig ka. Sampung taon ko nang negosyo ito. Si Ryan ang pinakamasipag na kolektor na nadaanan ko.' },
    { kind: 'say', speaker: 'olivia', text: 'Hindi umaabsent, hindi nagbabakasyon, hindi nagpapahawak ng ruta niya kahit kanino. Dedikado.' },
    { kind: 'say', speaker: 'jun', text: '(Hindi nagpapahawak ng ruta kahit kanino...)' },
    { kind: 'say', speaker: 'cess', text: 'Salamat, Madam. Titingnan lang namin ang records — routine lang po.' },
    { kind: 'setFlag', flag: 'f2-olivia' },
  ],

  'sc2-orbook': [
    { kind: 'narrate', text: 'Hiniram mo ang OR booklet ng ruta ni Ryan. Duplicate copies — carbon ng mga resibong ibinigay sa customer.' },
    { kind: 'narrate', text: 'OR #1102: Aling Baby, ₱8,000, June 17. Malinis ang sulat. Walang bura.' },
    { kind: 'give', evidence: 'ev-or-dup' },
    { kind: 'say', speaker: 'jun', text: 'Ate, kung June 17 ang bayad ni Aling Baby, bakit siya nagrereklamo na sinisingil pa rin siya nitong July?' },
    { kind: 'say', speaker: 'cess', text: 'Magandang tanong. Pero ang mas maganda: totoo bang June 17 \'yan?' },
    { kind: 'setFlag', flag: 'f2-orbook' },
  ],

  'sc2-deposits': [
    { kind: 'narrate', text: 'Kinuha mo ang validated deposit slips ng June mula sa bangko file.' },
    { kind: 'narrate', text: 'June 3: ₱22,500 — walang ₱8,000 sa breakdown. June 17: ₱31,000 — may ₱8,000.' },
    { kind: 'give', evidence: 'ev-deposits' },
    { kind: 'say', speaker: 'jun', text: 'Consistent sa duplicate OR. June 17 talaga ang pasok ng ₱8,000.' },
    { kind: 'say', speaker: 'cess', text: 'Consistent ang loob ng sistema. Kaya hindi ito makikita ng bookkeeper kailanman. Ang sagot ay nasa labas — sa customer mismo.' },
    { kind: 'setFlag', flag: 'f2-deposits' },
  ],

  'sc2-ryan-1': [
    { kind: 'say', speaker: 'ryan', text: 'Kayo pala ang mga auditor! Ryan po. Kung may kailangan kayo sa ruta ko, sabihin niyo lang — organisado \'yan, promise.' },
    { kind: 'branch', when: { allOf: ['f2-orbook', 'f2-deposits'] }, label: 'ready2' },
    { kind: 'say', speaker: 'jun', text: 'Titingnan pa lang po namin ang records. Balikan ka namin.' },
    { kind: 'say', speaker: 'ryan', text: 'Sige po! Nandito lang ako. Hindi ako umaalis, ha!' },
    { kind: 'goto', label: 'end2' },
    { kind: 'label', name: 'ready2' },
    { kind: 'say', speaker: 'jun', text: 'May mga tanong kami tungkol sa ruta mo. Puwede ka bang magbigay ng pormal na testimonya?' },
    { kind: 'say', speaker: 'ryan', text: 'Testimonya agad? Grabe kayo. O sige, sige — wala naman akong itinatago. Ako pa!' },
    { kind: 'setFlag', flag: 'f2-ready-t1' },
    { kind: 'label', name: 'end2' },
  ],

  // ---------- Testimony 1 presses ----------
  'sc2-t1-p1': [
    { kind: 'say', speaker: 'jun', text: 'Ilang tindahan ang ruta mo?' },
    { kind: 'say', speaker: 'ryan', text: 'Tatlumpu, sir! Kabisado ko pati birthday ng mga anak nila. Kaya ako ang pinakamataas ang collection rate.' },
    { kind: 'say', speaker: 'jun', text: '(Pinakamataas ang collection rate — at pinakamahaba ang deposit lag. Interesting combination.)' },
  ],
  'sc2-t1-p2': [
    { kind: 'say', speaker: 'jun', text: '"Same day" mo dineposito lahat? Walang exception?' },
    { kind: 'say', speaker: 'ryan', text: 'Bale... minsan next banking day, kung hapon na natapos ang ikot. Pero \'yon lang. Sistema ko \'yan, sir.' },
    { kind: 'say', speaker: 'cess', text: '"Sistema." Magugustuhan mo ang salitang \'yan mamaya, Jun.' },
  ],
  'sc2-t1-p3': [
    { kind: 'say', speaker: 'jun', text: 'Bakit hindi ka nagpapahawak ng ruta mo sa iba? Kahit nag-leave ka?' },
    { kind: 'say', speaker: 'ryan', text: 'Ayoko pong magulo ang kalakaran. Ang mga suki ko, ako lang ang kilala. Personalized service!' },
    { kind: 'say', speaker: 'jun', text: '(O kaya: kapag ibang tao ang umikot, may makakapansin sa mga petsa.)' },
  ],
  'sc2-t1-p4': [
    { kind: 'say', speaker: 'jun', text: 'Kilala mo ba sina Aling Baby at Mang Turo?' },
    { kind: 'say', speaker: 'ryan', text: 'Suki ko \'yan pareho! Bakit, ano\'ng sabi nila?' },
    { kind: 'say', speaker: 'jun', text: 'Hindi pa namin sila nakakausap.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: '...A, ganon ba. Sige. Okay.' },
    { kind: 'say', speaker: 'jun', text: '(Kinabahan siya sa "hindi PA".)' },
  ],

  'sc2-t1-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: '"Walang customer na nagrereklamo"? Dalawa ang tumawag sa opisina nitong buwan.' },
    { kind: 'say', speaker: 'jun', text: 'Aling Baby at Mang Turo. Parehong galit. Parehong may resibo daw. Parehong nasa ruta mo.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'Ah — \'yon ba! Sir, alam niyo naman ang matatanda. Nakakalimot ng petsa. Baka na-confuse lang sila sa statement.' },
    { kind: 'say', speaker: 'cess', text: 'Puwede. Kaya pupunta kami sa tindahan para itanong mismo.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'P-pupunta kayo? Sir, sayang ang oras niyo — malayo \'yon, mainit pa!' },
    { kind: 'say', speaker: 'jun', text: 'May payong ako.' },
    { kind: 'note', note: 'note-confirmation' },
    { kind: 'moveTo', scene: 'sarisari' },
  ],

  // ---------- Act 2: sari-sari store ----------
  'sc2-baby': [
    { kind: 'say', speaker: 'baby', pose: 'annoyed', text: 'Mabuhay Beverage?! Aba, mabuti nga at may pumunta! Singil kayo nang singil, e BAYAD NA AKO!' },
    { kind: 'say', speaker: 'jun', text: 'Po, kaya nga po kami nandito — para linawin. Kailan po kayo nagbayad?' },
    { kind: 'say', speaker: 'baby', text: 'June 3! Sabado! Umaga! Kay Ryan mismo! Kakaabot ko lang ng bayad sa jeep ni Totoy nung umalis siya!' },
    { kind: 'say', speaker: 'jun', text: 'Sigurado po kayo sa petsa?' },
    { kind: 'say', speaker: 'baby', pose: 'annoyed', text: 'Iho. May resibo ako. Hindi ako nagbabayad nang walang resibo. WALANG RESIBO, WALANG USAPAN.' },
    { kind: 'narrate', text: 'Hinugot niya mula sa lata ng biskwit ang isang OR — kupas, may mantsa ng toyo, pero buo.' },
    { kind: 'narrate', text: 'OR #1102. ₱8,000. Ang petsa: 3 JUNE 2023.' },
    { kind: 'give', evidence: 'ev-or-cust' },
    { kind: 'say', speaker: 'jun', text: '(Parehong OR number ng duplicate sa opisina. Magkaibang petsa. Ang carbon copy, hindi nagkakamali nang ganito.)' },
    { kind: 'note', note: 'note-external' },
    { kind: 'setFlag', flag: 'f2-baby' },
  ],

  'sc2-listahan': [
    { kind: 'say', speaker: 'baby', text: 'At kung ayaw niyo sa resibo — eto pa ang listahan ko. Lahat ng pumapasok at lumalabas sa tindahang ito, nakasulat.' },
    { kind: 'narrate', text: '"Jun 3 (Sab) — BAYAD sa Mabuhay ₱8,000 — kay Ryan, umaga."' },
    { kind: 'give', evidence: 'ev-listahan' },
    { kind: 'say', speaker: 'baby', text: 'Ang tindera, iho, ay may mas mahigpit na bookkeeping kaysa sa kahit anong opisina. Subukan mong dayain ang suki — isang linggo, alam na ng buong barangay.' },
    { kind: 'say', speaker: 'jun', text: '(Sana po lahat ng kliyente namin, ganito.)' },
    { kind: 'setFlag', flag: 'f2-listahan' },
  ],

  'sc2-lag': [
    { kind: 'say', speaker: 'cess', text: 'Habang kausap mo si Aling Baby, tinapos ko ang analytics. Tingnan mo.' },
    { kind: 'give', evidence: 'ev-lag-memo' },
    { kind: 'say', speaker: 'cess', text: 'OR date hanggang deposit date, ruta ni Ryan: isang araw dati. Ngayon, labindalawa.' },
    { kind: 'say', speaker: 'jun', text: 'At ang ibang ruta, flat na isa hanggang dalawa.' },
    { kind: 'say', speaker: 'cess', text: 'Simula Marso. May nangyari noong Marso sa buhay ni Ryan — hindi pa natin alam kung ano, pero alam na ng numero na may nangyari.' },
    { kind: 'note', note: 'note-analytics' },
    { kind: 'setFlag', flag: 'f2-lag' },
  ],

  'sc2-back-warehouse': [
    { kind: 'say', speaker: 'cess', text: 'May original ka na mula sa customer, may duplicate mula sa kompanya, may deposit slips, may lag analysis.' },
    { kind: 'say', speaker: 'jun', text: 'Apat na petsa na hindi nagkakasundo.' },
    { kind: 'say', speaker: 'cess', text: 'Balik tayo sa warehouse. Ikaw ang bahala sa kanya, Jun. Ako ang bahala sa subsidiary ledgers habang nagtatestimonya siya.' },
    { kind: 'testimony', testimony: 't2-1102' },
  ],

  // ---------- Testimony 2 presses ----------
  'sc2-t2-p1': [
    { kind: 'say', speaker: 'jun', text: 'Kabisado mo ang June 17? Ang bilis mong sumagot ng petsa.' },
    { kind: 'say', speaker: 'ryan', text: 'Sabi ko sa inyo, sir — organisado ako! Kabisado ko ang mga koleksyon ko.' },
    { kind: 'say', speaker: 'jun', text: '(Kabisado niya nga. Kabisado ng taong pinaghandaan ang tanong.)' },
  ],
  'sc2-t2-p2': [
    { kind: 'say', speaker: 'jun', text: 'Nasa deposit slip nga ang ₱8,000 noong June 17. Sino ang nagdeposito?' },
    { kind: 'say', speaker: 'ryan', text: 'Ako mismo! May bank stamp pa, sir. Tingnan niyo!' },
    { kind: 'say', speaker: 'jun', text: 'Hindi ko tinatanong kung nadeposito. Tinatanong ko kung KANINONG pera ang nadeposito.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: '...Ha? E di kay Aling Baby?' },
  ],
  'sc2-t2-p3': [
    { kind: 'say', speaker: 'jun', text: 'Ang duplicate at ang original ay sabay nasusulat sa carbon. Paano sila nagkakaiba?' },
    { kind: 'say', speaker: 'ryan', text: 'Malay ko po! Baka nabasa niyo nang mali. Kupas na siguro \'yung kopya ng matanda.' },
    { kind: 'say', speaker: 'jun', text: 'Kupas, oo. May mantsa ng toyo. Pero ang "3 JUNE" ay malinaw na malinaw.' },
  ],

  'sc2-t2-break': [
    { kind: 'shout', card: 'ETO, O!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Ang ORIGINAL ng OR #1102 — mula mismo sa lata ng biskwit ni Aling Baby.' },
    { kind: 'say', speaker: 'jun', text: 'Parehong numero. Parehong halaga. Parehong pirma mo. Ang petsa: HUNYO TRES.' },
    { kind: 'say', speaker: 'ryan', pose: 'shocked', text: '...Binigay niya sa inyo?!' },
    { kind: 'say', speaker: 'jun', text: 'Ang original at duplicate ay iisang lapad ng carbon paper ang pagitan. Hindi sila nagkakaiba ng LABINGAPAT NA ARAW.' },
    { kind: 'say', speaker: 'jun', text: 'Maliban kung sinulat mo ang original noong June 3... at ang duplicate, dalawang linggo pagkatapos — kapag mayroon ka nang panakip na pera.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'S-sir, hindi po ganon! Na-delay lang talaga ang deposit ko! Buo naman ang pera — hawak ko lang saglit! Hindi ko ginalaw ni piso!' },
    { kind: 'say', speaker: 'cess', text: 'Ayan na ang bagong kuwento. Jun — tapos na ako sa subsidiary ledgers. Baka kailanganin mo ito.' },
    { kind: 'give', evidence: 'ev-subledger' },
    { kind: 'note', note: 'note-lapping' },
    { kind: 'testimony', testimony: 't2b-buo' },
  ],

  'sc2-t2b-p1': [
    { kind: 'say', speaker: 'jun', text: '"Hawak mo lang"? Dalawang linggo mong hawak ang ₱8,000 ng kompanya?' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'H-hindi ko ginastos! Nasa bag ko lang! Iniingatan ko pa nga!' },
    { kind: 'say', speaker: 'jun', text: '(Kung buo sa bag, bakit kailangan pang hintayin ang June 17 para ideposito?)' },
  ],
  'sc2-t2b-p2': [
    { kind: 'say', speaker: 'jun', text: 'Ano ang nangyari noong June 17? Bakit noon mo naideposito?' },
    { kind: 'say', speaker: 'ryan', text: 'Basta... naalala ko na, na-schedule ko na. Sistema ko nga po \'yon, di ba.' },
    { kind: 'say', speaker: 'cess', text: 'June 17 din ang araw na nagbayad si Mang Turo. Anong coincidence.' },
    { kind: 'say', speaker: 'ryan', pose: 'shocked', text: '...' },
  ],

  'sc2-t2b-break': [
    { kind: 'shout', card: 'OBJECTION!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Hindi buo ang hawak mo — WALA ka nang hawak. Eto ang subsidiary ledger trace.' },
    { kind: 'say', speaker: 'jun', text: 'Ang ₱8,000 na idineposito mo noong June 17 ay hindi pera ni Aling Baby. Pera \'yon ni MANG TURO — nagbayad siya noong araw ding \'yon.' },
    { kind: 'say', speaker: 'jun', text: 'At ang account ni Mang Turo? Na-kredito lang noong JULY 2 — gamit naman ang bayad ng SUSUNOD na customer.' },
    { kind: 'say', speaker: 'ryan', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'jun', text: 'Ito ang lapping. Ang pera ni Aling Baby, nagastos mo noong June 3. Simula noon, bawat koleksyon mo ay pantakip sa nauna. Gumugulong. Lumalaki.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'Sir... sir, hindi niyo naiintindihan. Ibabalik ko \'yon. LAHAT. May plano ako—' },
    { kind: 'say', speaker: 'cess', text: 'May plano ka. Kaya hindi ka umaabsent, hindi ka nagbabakasyon, hindi mo pinapahawak ang ruta mo. Dahil kapag tumigil ang gulong isang araw lang — babagsak lahat.' },
    { kind: 'say', speaker: 'ryan', pose: 'shocked', text: '...Kayo na po ang nagsabi. Pagod na pagod na ako, sir.' },
    { kind: 'note', note: 'note-intact' },
    { kind: 'moveTo', scene: 'warehouse2' },
  ],

  // ---------- Act 3 ----------
  'sc2-folder': [
    { kind: 'narrate', text: 'Ibinigay ni Ryan ang route folder niya. Sa loob, nakatiklop nang maraming beses, isang papel na kupas na sa kakabukas.' },
    { kind: 'narrate', text: '"FINAL NOTICE — R. Villanueva. Utang: ₱62,000. Lingguhang hulog: ₱4,000."' },
    { kind: 'give', evidence: 'ev-56notice' },
    { kind: 'say', speaker: 'jun', text: 'Five-six. Kaya pala lingguhan ang ikot ng butas — lingguhan din ang hulog.' },
    { kind: 'setFlag', flag: 'f2-notice' },
  ],

  'sc2-hr': [
    { kind: 'say', speaker: 'olivia', pose: 'stern', text: '...Kinuha ko ang HR file niya, gaya ng hiningi niyo. Ayoko mang tingnan.' },
    { kind: 'narrate', text: 'Tatlong cash advance request. Feb 6: DENIED. Feb 27: DENIED. Mar 13: DENIED — "final".' },
    { kind: 'give', evidence: 'ev-advances' },
    { kind: 'say', speaker: 'jun', text: 'Tatlong beses siyang humingi ng tulong sa kompanya. Tatlong beses na hindi.' },
    { kind: 'say', speaker: 'olivia', text: 'May policy kami sa cash advance... Kung alam ko lang na ganito ang kapalit.' },
    { kind: 'say', speaker: 'cess', text: 'Madam, hindi niyo kasalanang tumanggi. Pero pagkatapos ng pagtangging \'yon, dapat may nagbantay nang mas mabuti.' },
    { kind: 'setFlag', flag: 'f2-advances' },
  ],

  'sc2-to-conf2': [
    { kind: 'say', speaker: 'cess', text: 'Exit conference na. Si Partner Alcaraz ang mamumuno ulit.' },
    { kind: 'say', speaker: 'cess', text: 'Isa pa. Dalhin mo ang engagement letter — \'yung pirmado ni Madam Olivia mismo.' },
    { kind: 'give', evidence: 'ev-engagement' },
    { kind: 'say', speaker: 'jun', text: 'Ang engagement letter? Para saan po?' },
    { kind: 'say', speaker: 'cess', text: 'Pakiramdam ko lang. Ang mga may-ari ng negosyo, kapag nasaktan ang pangalan nila... minsan mas gusto nilang itago kaysa ayusin.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... mas mabigat ito kaysa kay Malou, ano po?' },
    { kind: 'say', speaker: 'cess', text: '₱62,000 sa five-six na dumodoble kada ilang buwan? Jun, ang kalaban ni Ryan ay hindi tayo. Matagal na siyang natalo bago pa tayo dumating.' },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'conference2' },
  ],

  'sc2-conf-open': [
    { kind: 'say', speaker: 'alcaraz', text: 'Exit conference para sa Mabuhay Beverage engagement. Nandito ang may-ari, ang staff, at ang empleyadong sangkot.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'Sir, madam... papaliwanagin niyo pa po ba ako? Alam na naman ng lahat.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Ang proseso ay proseso, hijo. Isang huling testimonya. Ang sasabihin mo dito ay papasok sa report.' },
    { kind: 'testimony', testimony: 't3-amin' },
  ],

  'sc2-t3-p1': [
    { kind: 'say', speaker: 'jun', text: 'Magkano na ang kabuuang butas, Ryan? Sa tantiya mo mismo.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: '...Mga ₱35,000 siguro? Hindi ko na alam, sir. Nawalan na ako ng bilang pagkatapos ng ikatlong ikot.' },
    { kind: 'say', speaker: 'jun', text: '(Nawalan ng bilang. Ang kolektor na kabisado ang birthday ng mga anak ng suki.)' },
  ],
  'sc2-t3-p2': [
    { kind: 'say', speaker: 'jun', text: '"Gagastusin ko lang naman sana muna" — ano ang ibig sabihin noon?' },
    { kind: 'say', speaker: 'ryan', text: 'Isang hulog lang sana talaga, sir. ₱4,000 lang. Babalik agad pagkasingil ko sa Sabado. At bumalik naman!' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'Kaso... may hulog ulit pagkalipas ng isang linggo. At isa pa. At isa pa.' },
  ],

  'sc2-t3-break': [
    { kind: 'shout', card: 'ETO, O!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: '"Wala akong pinagkakagastusan"? Ryan, nasa route folder mo ito.' },
    { kind: 'say', speaker: 'jun', text: 'Final notice. ₱62,000 sa five-six. Lingguhang hulog na ₱4,000 — sa sweldong ₱16,000 kada buwan.' },
    { kind: 'say', speaker: 'ryan', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'jun', text: 'At tatlong denied na cash advance, Feb hanggang Marso. Pagkatapos ng ikatlong DENIED — doon nagsimula ang deposit lag. Hindi \'yan coincidence.' },
    { kind: 'say', speaker: 'ryan', text: 'E-sabong po, sir. Nung pandemya pa nagsimula. Akala ko kaya kong bawiin ang natalo... tapos \'yung five-six na ang bumabawi sa akin.' },
    { kind: 'say', speaker: 'ryan', pose: 'nervous', text: 'Hindi ako kumuha para yumaman, sir. Kumuha ako para makahulog. May pinagkaiba po \'yon... di ba? ...Meron po ba?' },
    { kind: 'say', speaker: 'jun', text: '...' },
    { kind: 'say', speaker: 'alcaraz', text: 'Sa ledger, hijo, wala. Sa buhay mo, mayroon — at sana ang korte ang makarinig noon, hindi ang aming working papers.' },
    { kind: 'note', note: 'note-redflags' },
    { kind: 'testimony', testimony: 't4-tahimik' },
  ],

  'sc2-t4-p1': [
    { kind: 'say', speaker: 'jun', text: 'Madam, ano po ang balak niyo kay Ryan?' },
    { kind: 'say', speaker: 'olivia', text: 'Tatanggalin ko siya, siyempre. Pero tahimik. Resignation. Walang kaso, walang blotter, walang chismis sa mga supplier.' },
    { kind: 'say', speaker: 'olivia', pose: 'stern', text: 'Sampung taon kong itinayo ang pangalan ng Mabuhay. Hindi ito madudurog dahil sa isang kolektor.' },
  ],
  'sc2-t4-p2': [
    { kind: 'say', speaker: 'jun', text: 'At ang report po namin?' },
    { kind: 'say', speaker: 'olivia', text: 'Kayo ang inupahan ko. Ang report niyo ay sa akin lang pupunta — at doon ito titigil. Klaro ba?' },
    { kind: 'say', speaker: 'jun', text: '(Hindi po. Hindi klaro.)' },
  ],

  'sc2-t4-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Madam, may pinirmahan po kayo bago kami nagsimula. Binabasa ko lang po ito pabalik sa inyo.' },
    { kind: 'say', speaker: 'jun', text: '"Ang anumang natuklasang fraud ay ikokomunika sa management at sa those charged with governance nang napapanahon, at idodokumento sa audit files."' },
    { kind: 'say', speaker: 'olivia', pose: 'stern', text: 'Ako ang management! Ako ang governance! Ako ang lahat ng \'yan — ako ang may-ari!' },
    { kind: 'say', speaker: 'alcaraz', text: 'May treasurer kayo, Madam. May corporate secretary. May SEC filing kayo bilang korporasyon — hindi ito sari-sari store na kayo lang ang masusunod.' },
    { kind: 'say', speaker: 'jun', text: 'At kahit po kayo lang — ang findings ay nasa working papers na namin. Hindi po namin kayang "i-unsee". Hindi rin po namin gugustuhin.' },
    { kind: 'say', speaker: 'olivia', text: '...Kung ilalabas ko kayo sa engagement? Ngayon na mismo?' },
    { kind: 'say', speaker: 'alcaraz', text: 'Puwede niyo pong gawin. Nakadokumento pa rin ang aming natuklasan, at may mga tungkulin pa rin kami sa ilalim ng pamantayan. Ang pagpapaalis sa auditor ay hindi pambura ng ebidensiya.' },
    { kind: 'say', speaker: 'olivia', pose: 'stern', text: '...' },
    { kind: 'say', speaker: 'olivia', text: 'Sampung taon ko \'tong negosyo. Alam niyo ba kung bakit ako kumuha ng auditor? Dahil sabi ng banko, requirement.' },
    { kind: 'say', speaker: 'olivia', text: 'Ngayon ko lang naintindihan kung para saan pala talaga kayo. ...Sige. Idaan natin sa tama.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Salamat po, Madam. \'Yan ang pinakamahirap na desisyon sa buong kasong ito — at kayo ang gumawa.' },
    { kind: 'narrate', text: 'Lumabas si Madam Olivia kasama si Ryan. Sa pintuan, huminto siya sandali — at tinapik ang balikat ng dating paborito niyang kolektor.' },
    { kind: 'say', speaker: 'cess', text: 'Jun. Dalawang kaso, dalawang beses kang nag-objection sa maling tao sa tamang dahilan.' },
    { kind: 'say', speaker: 'jun', text: 'Ate, sa susunod naman po, gusto ko namang walang umiiyak sa dulo.' },
    { kind: 'say', speaker: 'cess', text: 'Ay, Jun. Auditor ka. Ang pinakamagandang araw natin ay \'yung walang nahuhuli — at walang dapat hulihin. Darating din tayo doon... isang kliyente bawat isa.' },
    { kind: 'note', note: 'note-governance' },
    { kind: 'endCase' },
  ],

  'sc2-wrong': [
    { kind: 'say', speaker: 'cess', text: 'Jun, hinga muna. Hindi \'yan ang ebidensiyang sasalungat sa statement na \'yan.' },
  ],
}
