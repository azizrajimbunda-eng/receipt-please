// Case 03 dialogue. Taglish: Tagalog voice, accounting terms in English.

import type { DialogueLine, ScriptId } from '../../engine/types'

export const scripts: Record<ScriptId, DialogueLine[]> = {
  // ---------- Act 1: briefing ----------
  'sc3-start': [
    { kind: 'narrate', text: 'Ferrer & Alcaraz, CPAs — isang buwan matapos ang Mabuhay Beverage.' },
    { kind: 'say', speaker: 'cess', text: 'Jun. Construction naman ngayon. Tibay Builders — animnapu\'t isang manggagawa sa Site A, lingguhang sweldo, cash sa sobre.' },
    { kind: 'say', speaker: 'jun', text: 'Cash payroll? Ate, ang dami pong butas doon.' },
    { kind: 'say', speaker: 'cess', text: 'Kaya nga may sulat tayo.' },
    { kind: 'give', evidence: 'ev-tip' },
    { kind: 'narrate', text: '"May sumusweldo sa Site A na hindi niyo nakikita."' },
    { kind: 'say', speaker: 'jun', text: 'Ghost employee.' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Baka. O baka empleyadong galit lang na gumagawa ng kuwento. Ang sulat ay hinala — hindi ebidensiya. Trabaho nating alamin kung alin.',
    },
    { kind: 'give', evidence: 'ev-program3' },
    { kind: 'give', evidence: 'ev-register' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Eto ang audit program at ang payroll register. Animnapu\'t isang pangalan. Kung may multo, kailangan natin siyang hanapin sa papel — at sa lupa.',
    },
    {
      kind: 'choice',
      prompt: 'Paano mo papatunayan na TOTOO ang bawat empleyado?',
      options: [
        { text: 'Obserbahan ang aktwal na payout, walang paalam.', label: 'right3' },
        { text: 'Hingin kay HR ang kumpletong master list.', label: 'soft3' },
      ],
    },
    { kind: 'label', name: 'soft3' },
    {
      kind: 'say',
      speaker: 'cess',
      pose: 'stern',
      text: 'Jun. Ang master list ay gawa ng mga taong ini-imbestigahan natin. Hindi mo mapapatunayan ang listahan gamit ang parehong listahan.',
    },
    { kind: 'goto', label: 'go3' },
    { kind: 'label', name: 'right3' },
    { kind: 'say', speaker: 'cess', text: 'Tama. Ang papel ay napipirmahan ng kahit sino. Ang sobre, kinukuha ng totoong tao. Pero bago tayo dumalo sa Sabado — papel muna. Alamin natin kung sino ang hahanapin.' },
    { kind: 'label', name: 'go3' },
    { kind: 'note', note: 'note-payroll-cycle' },
    { kind: 'say', speaker: 'cess', text: 'Isa pa. Ang foreman doon ay si Igme — dalawampung taon na sa Tibay. Ang payroll officer ay si Sir Nestor — malinis ang record, maayos ang papeles. Sobrang ayos. Tandaan mo iyan.' },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'site' },
  ],

  // ---------- Act 1: site ----------
  'sc3-igme': [
    { kind: 'say', speaker: 'igme', text: 'Mga auditor! Tuloy kayo, ingat sa hollow blocks. Ano\'ng maitutulong ko?' },
    { kind: 'say', speaker: 'jun', text: 'Kilala niyo po ba lahat ng tao niyo dito, Foreman?' },
    { kind: 'say', speaker: 'igme', text: 'Isa-isa! Dalawampung taon na ako dito, iho. Kilala ko pati pangalan ng mga anak nila. Itanong mo kahit sino.' },
    { kind: 'say', speaker: 'jun', text: 'Si R. dela Peña po?' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: '...Si Erning? Oo naman! Masipag \'yon. Nandiyan lang \'yon — ay, kanina, umikot muna sa Site B. Bumalik mamaya.' },
    { kind: 'say', speaker: 'jun', text: '(Sabi sa register, Site A lang siya naka-assign.)' },
    { kind: 'setFlag', flag: 'f3-igme' },
  ],

  'sc3-dtr': [
    { kind: 'narrate', text: 'Hiniram mo ang DTR bundle. Karamihan, gusot, may putik, may mantsa ng kape — mga papel na hawak ng totoong tao.' },
    { kind: 'narrate', text: 'Ang kay dela Peña: malinis. Eksaktong 7:00 in, 4:00 out. Araw-araw. Parang orasan.' },
    { kind: 'give', evidence: 'ev-dtr' },
    { kind: 'say', speaker: 'jun', text: 'Ate, may entry siya noong Agosto uno at dos.' },
    { kind: 'say', speaker: 'cess', text: 'Ano ang nangyari noong Agosto uno at dos?' },
    { kind: 'say', speaker: 'jun', text: '...Hindi ko pa alam. Pero kutob ko, may nakapaskil dito sa site na makakasagot.' },
    { kind: 'setFlag', flag: 'f3-dtr' },
  ],

  'sc3-bulletin': [
    { kind: 'narrate', text: 'Sa bulletin board: safety notices, schedule ng deliveries, listahan ng birthday... at isang memo na kupas na.' },
    { kind: 'narrate', text: '"MEMO — Agosto 1-2: Suspendido ang lahat ng trabaho sa Site A dahil sa Bagyong Egay. Bawal pumasok sa site."' },
    { kind: 'say', speaker: 'jun', text: 'Pirmado ni... E. Igme. Foreman.' },
    { kind: 'give', evidence: 'ev-closure' },
    { kind: 'say', speaker: 'cess', text: 'Ang taong nagsara ng site ay ang parehong taong nag-certify na may nagtrabaho sa loob nito. Kuhanan mo ng litrato bago pa mapunit ng hangin.' },
    { kind: 'setFlag', flag: 'f3-closure' },
  ],

  'sc3-weng': [
    { kind: 'say', speaker: 'weng', text: 'A-ako po ang timekeeper. May kailangan po kayo sa records?' },
    { kind: 'say', speaker: 'jun', text: 'Si dela Peña — nakikita mo ba siya tuwing time-in?' },
    { kind: 'say', speaker: 'weng', pose: 'nervous', text: '...Sir, marami pong pumapasok, minsan hindi ko na po napapansin isa-isa—' },
    { kind: 'say', speaker: 'jun', text: 'Weng. Trabaho mo ang pumansin isa-isa.' },
    { kind: 'say', speaker: 'weng', pose: 'nervous', text: '...Si Foreman po ang nagdadala ng DTR niya. Firmado na po pagdating sa akin. Nung tinanong ko po minsan, sinabihan lang po ako na huwag pakialamera.' },
    { kind: 'say', speaker: 'weng', text: 'Sir... hindi ko po sinabi \'yan, ha? Wala po akong sinabi.' },
    { kind: 'say', speaker: 'jun', text: '(May alam si Weng. At may kinakatakutan.)' },
    { kind: 'setFlag', flag: 'f3-weng' },
    { kind: 'setFlag', flag: 'f3-ready-t1' },
  ],

  // ---------- Testimony 1 presses (Igme) ----------
  'sc3-t1-p1': [
    { kind: 'say', speaker: 'jun', text: 'Dalawampung taon na kayo dito?' },
    { kind: 'say', speaker: 'igme', text: 'Mula pa noong si Engr. Tibayan mismo ang naghahalo ng semento! Walang pumapasok sa site na hindi ko kilala.' },
    { kind: 'say', speaker: 'jun', text: '(Iyan mismo ang problema, Foreman.)' },
  ],
  'sc3-t1-p2': [
    { kind: 'say', speaker: 'jun', text: 'Kayo po ang nag-ce-certify ng lahat ng DTR?' },
    { kind: 'say', speaker: 'igme', text: 'Ako mismo. Bawat papel, dumadaan sa akin bago mapunta kay Sir Nestor. Walang lusot.' },
    { kind: 'say', speaker: 'jun', text: 'Walang lusot. Tatandaan ko po \'yan.' },
  ],
  'sc3-t1-p3': [
    { kind: 'say', speaker: 'jun', text: 'Bakit hindi nakita ni Weng si dela Peña sa time-in, kahit minsan?' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: 'Si Weng? Bata pa \'yon, madaling malito. Maaga pumapasok si Erning — una pa sa timekeeper!' },
    { kind: 'say', speaker: 'jun', text: 'Mas maaga sa timekeeper. Tatlumpu\'t dalawang linggong sunud-sunod.' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: '...Masipag nga, di ba?' },
  ],
  'sc3-t1-p4': [
    { kind: 'say', speaker: 'jun', text: 'Nasaan si dela Peña ngayon mismo?' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: 'Sabi ko nga — Site B! O baka nag-lunch. O baka... may lakad. Hindi ko rin masabi, ang dami kong tao, iho!' },
    { kind: 'say', speaker: 'jun', text: 'Kanina po, "kilala niyo pati pangalan ng mga anak nila."' },
    { kind: 'say', speaker: 'igme', text: '...' },
  ],

  'sc3-t1-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Tuloy-tuloy ang trabaho buong Agosto? Foreman — kayo mismo ang nagsara ng site.' },
    { kind: 'say', speaker: 'jun', text: 'Eto ang memo niyo. Agosto uno at dos: "Suspendido ang lahat ng trabaho. Bawal pumasok." Pirmado: E. Igme.' },
    { kind: 'say', speaker: 'igme', pose: 'shocked', text: '...Ang bagyo. Oo. Naka... nakalimutan ko.' },
    { kind: 'say', speaker: 'jun', text: 'Pero hindi nakalimutan ng DTR ni dela Peña. May entry siya sa parehong araw. 7:00 hanggang 4:00. Sa loob ng site na ipinasara niyo dahil sa Signal No. 3.' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: 'B-baka nagkamali lang siya ng sulat! Sige, tatanungin ko siya, ako na ang bahala—' },
    { kind: 'say', speaker: 'cess', text: 'Huwag na kayong mag-abala, Foreman. Kami na ang magtatanong. Jun — sa admin office tayo. Doon nakatira ang papeles ng multo.' },
    { kind: 'moveTo', scene: 'admin' },
  ],

  // ---------- Act 2: admin office ----------
  'sc3-201': [
    { kind: 'narrate', text: 'Hiniling mo ang 201 file ni dela Peña. Ang mga katabing folder, makapal — IDs, clearances, litrato ng pamilya.' },
    { kind: 'narrate', text: 'Ang kanya: tatlong pahina. Application na kalahati ang sagot. Litratong photocopy ng photocopy. Walang SSS number.' },
    { kind: 'give', evidence: 'ev-201' },
    { kind: 'say', speaker: 'jun', text: 'Parang tao siyang hindi tinapos i-imbento.' },
    { kind: 'note', note: 'note-201' },
    { kind: 'setFlag', flag: 'f3-201' },
  ],

  'sc3-remit': [
    { kind: 'narrate', text: 'Kinuha mo ang SSS R-3 remittance lists at inihanay sa payroll register. Isa-isa. Animnapu\'t isang pangalan sa register.' },
    { kind: 'narrate', text: 'Animnapu sa remittance.' },
    { kind: 'give', evidence: 'ev-remit' },
    { kind: 'say', speaker: 'jun', text: 'May kaltas siya kada linggo — ₱180 sa SSS. Pero hindi hinuhulog. Saan napupunta ang kaltas ng multo?' },
    { kind: 'say', speaker: 'cess', text: 'Sa parehong bulsa na kumukuha ng sobre niya. Ang nandaraya, ayaw mag-iwan ng bakas sa gobyerno — kaya ang gobyerno ang pinaka-tapat na testigo natin.' },
    { kind: 'setFlag', flag: 'f3-remit' },
  ],

  'sc3-nestor-1': [
    { kind: 'say', speaker: 'nestor', text: 'Ah, kayo ang mga auditor. Nestor Ramirez, payroll. Kung may kailangan kayo, naka-file lahat — alphabetical, by month, by site.' },
    { kind: 'say', speaker: 'jun', text: 'Napakaayos niyo po, Sir.' },
    { kind: 'say', speaker: 'nestor', text: 'Dalawampu\'t limang taon sa payroll, iho. Ang kaguluhan ay kapabayaan. Dito, walang nadidiskuwento ni piso, walang nade-delay ni araw.' },
    { kind: 'branch', when: { allOf: ['f3-201', 'f3-remit'] }, label: 'ready3' },
    { kind: 'say', speaker: 'jun', text: 'Babalikan ko po kayo pag natapos ko ang records.' },
    { kind: 'say', speaker: 'nestor', text: 'Anumang oras. Bukas ang libro ko.' },
    { kind: 'goto', label: 'end3' },
    { kind: 'label', name: 'ready3' },
    { kind: 'say', speaker: 'jun', text: 'Sir Nestor, may mga tanong po ako tungkol kay R. dela Peña. Pormal na testimonya po sana.' },
    { kind: 'say', speaker: 'nestor', text: 'Si dela Peña? ...Sige. Pero sasabihin ko sa inyo ngayon pa lang: ang papeles ng taong iyan ay kasing-ayos ng sa lahat.' },
    { kind: 'say', speaker: 'jun', text: '(Iyan nga po ang problema.)' },
    { kind: 'setFlag', flag: 'f3-ready-t2' },
    { kind: 'label', name: 'end3' },
  ],

  // ---------- Testimony 2 presses (Nestor) ----------
  'sc3-t2-p1': [
    { kind: 'say', speaker: 'jun', text: 'Kailan po siya na-hire?' },
    { kind: 'say', speaker: 'nestor', text: 'Matagal na. Bago pa ako... este, bago pa ang system namin. Kaya siguro medyo manipis ang file — lumang proseso pa iyon.' },
    { kind: 'say', speaker: 'jun', text: '(Sabi sa register, 2021 siya na-hire. Ang "system" nila, 2019 pa.)' },
  ],
  'sc3-t2-p2': [
    { kind: 'say', speaker: 'jun', text: 'Kayo po ang naghahanda ng mga sobre?' },
    { kind: 'say', speaker: 'nestor', text: 'Ako, mula bilang hanggang selyo. Tapos si Foreman ang namamahagi tuwing Sabado, may pirmahan.' },
    { kind: 'say', speaker: 'jun', text: 'Kayo ang naghahanda. Si Foreman ang namimigay. At si Foreman din ang nag-ce-certify ng DTR.' },
    { kind: 'say', speaker: 'nestor', text: 'Ganoon talaga sa construction, iho. Praktikal.' },
    { kind: 'say', speaker: 'jun', text: '(Praktikal — para kanino?)' },
  ],
  'sc3-t2-p3': [
    { kind: 'say', speaker: 'jun', text: 'Bakit po walang SSS number sa file niya pero may SSS deduction siya sa register?' },
    { kind: 'say', speaker: 'nestor', pose: 'nervous', text: 'May... pending pa sigurong application. Nangyayari iyan sa mga probinsyano — matagal kumuha ng number.' },
    { kind: 'say', speaker: 'jun', text: 'Dalawang taon pong pending?' },
    { kind: 'say', speaker: 'nestor', pose: 'nervous', text: 'Mabagal ang gobyerno, iho.' },
  ],

  'sc3-t2-break': [
    { kind: 'shout', card: 'ETO, O!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: '"Remitted lahat"? Sir, eto po ang R-3 niyo. Animnapung pangalan.' },
    { kind: 'say', speaker: 'jun', text: 'Sa payroll register, animnapu\'t isa ang may kaltas. Ang nawawala sa remittance: si R. dela Peña.' },
    { kind: 'say', speaker: 'nestor', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'jun', text: 'Dalawampu\'t limang taon sa payroll. "Walang nadidiskuwento ni piso." Pero ang SSS ni dela Peña — ₱180 kada linggo, tatlumpu\'t dalawang linggo — hindi umabot sa gobyerno ni minsan.' },
    { kind: 'say', speaker: 'nestor', pose: 'nervous', text: 'Clerical... clerical oversight. Isang pangalan sa animnapu\'t isa! Ako na mismo ang magre-rectify—' },
    { kind: 'say', speaker: 'cess', text: 'Huwag muna. May payout bukas ng umaga, hindi ba? Sabado. Dadalo kami. Walang paalam sana — pero heto, nagpapaalam na kami. Kita-kits, Sir Nestor.' },
    { kind: 'say', speaker: 'nestor', pose: 'shocked', text: '...Bukas?' },
    { kind: 'moveTo', scene: 'payout' },
  ],

  // ---------- Act 3: the payout ----------
  'sc3-payout': [
    { kind: 'narrate', text: 'Sabado, 9:00 AM. Isang mesa, isang pila, animnapu\'t isang sobre.' },
    { kind: 'narrate', text: 'Isa-isang lumapit ang mga manggagawa. ID. Pirma. Sobre. Ang ilan, nagbibiro. Ang ilan, nagmamadali. Lahat, totoo.' },
    { kind: 'narrate', text: '10:47 AM. Tapos ang pila. Sa mesa, mag-isa: ang sobre ni R. DELA PEÑA.' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: 'A... ako na lang ang magdadala niyan sa kanya. May sakit si Erning, kaya hindi nakarating. Lagnat. Malala.' },
    { kind: 'say', speaker: 'jun', text: 'Foreman. Kaninang umaga, "nasa Site B siya." Ngayon, may lagnat na siya?' },
    { kind: 'say', speaker: 'igme', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'cess', text: 'Ang sobre ay mananatili sa amin bilang ebidensiya. Kapag humarap si dela Peña na may ID, sa kanya ito. Kami na ang bahalang maghintay.' },
    { kind: 'give', evidence: 'ev-envelope' },
    { kind: 'note', note: 'note-payout' },
    { kind: 'setFlag', flag: 'f3-payout' },
  ],

  'sc3-weng2': [
    { kind: 'say', speaker: 'weng', text: 'Sir... kayo po ba talaga ang auditor? Hindi po kayo taga-Tibay?' },
    { kind: 'say', speaker: 'jun', text: 'Hindi kami taga-Tibay, Weng. At kahit ano ang sabihin mo, hindi ikaw ang naghahanap ng gulo — kami.' },
    { kind: 'narrate', text: 'Huminga siya nang malalim. Tapos naglabas ng maliit na kwaderno mula sa bag.' },
    { kind: 'say', speaker: 'weng', text: 'Mula nung Enero po, ako na lang ang nagtatala ng talagang pumapasok. Kasi po \'yung opisyal, may mga pangalan na... hindi ko po nakikita.' },
    { kind: 'give', evidence: 'ev-wenglog' },
    { kind: 'say', speaker: 'weng', text: 'Baka po ako ang matanggal, sir. Pero mas ayoko na pong kinakabahan tuwing Sabado.' },
    { kind: 'say', speaker: 'jun', text: '(Ang sulat-kamay sa logbook... maliit. Maingat. Nakita ko na ang sulat na ito dati.)' },
    { kind: 'say', speaker: 'jun', text: 'Weng. Ikaw ang sumulat ng anonymous na sulat, hindi ba? "Tingnan niyo ang mga sobre."' },
    { kind: 'say', speaker: 'weng', pose: 'nervous', text: '...Ang tagal niyong dumating, sir.' },
    { kind: 'setFlag', flag: 'f3-wenglog' },
  ],

  'sc3-signatures': [
    { kind: 'narrate', text: 'Hiniling mo ang payroll acknowledgment sheets — ang pirmahan sa bawat sobre, bawat Sabado.' },
    { kind: 'narrate', text: '"R. dela Peña" — tatlumpu\'t dalawang pirma. Tuloy-tuloy ang tinta, kumpiyansa ang lagda.' },
    { kind: 'give', evidence: 'ev-signatures' },
    { kind: 'say', speaker: 'jun', text: 'Masyadong maganda ang pirma para sa taong walang nakakakita.' },
    { kind: 'setFlag', flag: 'f3-signatures' },
  ],

  'sc3-compare': [
    { kind: 'say', speaker: 'cess', text: 'Inihambing ko ang mga pirma habang nasa payout ka. Tingnan mo ang loop ng "R".' },
    { kind: 'give', evidence: 'ev-handwriting' },
    { kind: 'say', speaker: 'cess', text: 'Ang "R" sa "R. dela Peña" at ang "R" sa "Reviewed by: N. Ramirez" — iisang kamay, Jun. Pati ang tinta: blue-black fountain pen. Sino ang may fountain pen sa mesa niya?' },
    { kind: 'say', speaker: 'jun', text: 'Si Sir Nestor.' },
    { kind: 'say', speaker: 'cess', text: 'Hindi tayo document examiner — kaya hindi natin sasabihing "siya iyon". Sasabihin natin: "ipaliwanag niyo po ito." At titingnan natin ang mukha niya habang sumasagot.' },
    { kind: 'setFlag', flag: 'f3-compare' },
  ],

  'sc3-to-conf3': [
    { kind: 'say', speaker: 'cess', text: 'Kumpleto na: DTR sa saradong site, butas sa remittance, sobreng walang kumuha, pirmang iisa ang kamay, at ang logbook ni Weng.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... dalawa sila, hindi ba? Hindi kayang mag-isa ito.' },
    { kind: 'say', speaker: 'cess', text: 'Ang DTR ay kay Foreman. Ang sobre at pirma ay kay Nestor. Oo, Jun. Dalawa. At iyan mismo ang gagawin nating aral mamaya.' },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'conference3' },
  ],

  'sc3-conf-open': [
    { kind: 'say', speaker: 'alcaraz', text: 'Exit conference, Tibay Builders. Nandito ang payroll officer, ang site foreman, at ang aming staff.' },
    { kind: 'say', speaker: 'nestor', text: 'Sir Alcaraz, bago tayo magsimula — dalawampu\'t limang taon ang serbisyo ko. Sana po ang papel ang pag-usapan, hindi ang tsismis.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Ang papel nga ang pag-uusapan, G. Ramirez. Dala namin lahat. Magsimula ka, hijo.' },
    { kind: 'testimony', testimony: 't3-malinis' },
  ],

  // ---------- Testimony 3 presses (Nestor, final) ----------
  'sc3-t3-p1': [
    { kind: 'say', speaker: 'jun', text: 'Hindi niyo po kilala si dela Peña nang personal?' },
    { kind: 'say', speaker: 'nestor', text: 'Animnapu\'t isang manggagawa, iho. Papeles ang kilala ko, hindi mukha. Si Foreman ang nakakakilala sa tao.' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: '...Teka. Bakit ako ang—' },
    { kind: 'say', speaker: 'nestor', text: 'Ikaw ang nag-e-endorso ng DTR, Igme. Hindi ba?' },
    { kind: 'say', speaker: 'jun', text: '(Nagsisimula na silang maghiwalay ng bangka.)' },
  ],
  'sc3-t3-p2': [
    { kind: 'say', speaker: 'jun', text: 'Ang mga sobre — kayo po ang naghahanda, hanggang selyo?' },
    { kind: 'say', speaker: 'nestor', text: 'Inihahanda ko ayon sa register. Kung may multa... kung may MULTO sa register, kasalanan iyon ng nagpasok ng pangalan — hindi ng naghanda ng sobre.' },
    { kind: 'say', speaker: 'jun', text: 'Nadulas po kayo, Sir. "Multa" — "multo". Alam na pala natin pareho kung ano ang pinag-uusapan.' },
  ],

  'sc3-t3-break': [
    { kind: 'shout', card: 'OBJECTION!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: '"Ni minsan hindi ko hinawakan ang pirma niya"? Sir Nestor — tatlumpu\'t dalawang linggo niyo pong hawak.' },
    { kind: 'say', speaker: 'jun', text: 'Ang handwriting comparison po. Ang loop ng "R" sa pirma ni dela Peña — kapareho ng "R" sa "Reviewed by: N. Ramirez". Parehong bilis. Parehong diin. Parehong blue-black fountain pen na nasa mesa niyo mismo.' },
    { kind: 'say', speaker: 'nestor', pose: 'shocked', text: '...Hindi kayo document examiner. Walang timbang iyan sa korte!' },
    { kind: 'say', speaker: 'alcaraz', text: 'Wala kaming korte dito, G. Ramirez. May tanong lang: kung hindi ikaw ang pumipirma para sa taong hindi humarap kahit sa sariling sweldo niya — sino?' },
    { kind: 'say', speaker: 'nestor', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'igme', text: '...Sir. Sir, ako na po ang magsasabi.' },
    { kind: 'say', speaker: 'nestor', pose: 'shocked', text: 'IGME—' },
    { kind: 'say', speaker: 'igme', text: 'Totoo si Erning dela Peña, sir. Tao siya. Nagtrabaho dito hanggang Enero — tapos umuwi sa Samar. Hindi na bumalik.' },
    { kind: 'say', speaker: 'igme', text: 'Si Sir Nestor ang nagsabing... huwag muna nating tanggalin sa listahan. Sabi niya, sayang, tuloy pa rin naman ang budget. Hati kami. Animnapu-kwarenta.' },
    { kind: 'say', speaker: 'igme', pose: 'nervous', text: 'Ako ang pumipirma sa DTR. Siya ang sa sobre. Walong buwan po. ...Alam kong mali. Pero ang dali po kasi. Walang nagtatanong. WALANG nagtatanong.' },
    { kind: 'say', speaker: 'weng', text: '...May nagtanong po.' },
    { kind: 'narrate', text: 'Tumahimik ang buong conference room. Tumingin si Igme kay Weng — at yumuko.' },
    { kind: 'testimony', testimony: 't4-aral' },
  ],

  // ---------- Testimony 4 presses (Alcaraz closing) ----------
  'sc3-t4-p1': [
    { kind: 'say', speaker: 'jun', text: 'Sir, apat na pirma po bawat payroll. HR, timekeeper, foreman, payroll officer.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Apat na pirma, hijo. At walong buwan ang multo sa listahan. Ano ang sinasabi niyan tungkol sa mga pirma?' },
    { kind: 'say', speaker: 'jun', text: '(Na ang dalawa sa apat ay iisang bangka.)' },
  ],
  'sc3-t4-p2': [
    { kind: 'say', speaker: 'jun', text: 'Isusulat po ba natin na walang kontrol na tatalab?' },
    { kind: 'say', speaker: 'alcaraz', text: 'Iyan ang tanong, hindi ba? Kung ang segregation ay natalo ng dalawang magkasabwat — ano pa ang isusulat natin sa management letter maliban sa "magdasal kayo"?' },
    { kind: 'say', speaker: 'jun', text: '(May sagot ako diyan, Sir. Nasa Working Papers ko, may laman pang ₱4,200.)' },
  ],

  'sc3-t4-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Sir — may kontrol pong tumalab. Isa. Kahapon lang po, sa harap nating lahat.' },
    { kind: 'say', speaker: 'jun', text: 'Ang sobre ni dela Peña. Animnapu\'t isang sobre ang inihanda; animnapung tao ang humarap, nagpakita ng ID, pumirma. Ang ikaanimnapu\'t isa — nasa Working Papers natin ngayon, hindi nagalaw.' },
    { kind: 'say', speaker: 'jun', text: 'Ang pirma, kayang dayain ng ballpen. Ang DTR, kayang i-certify ng kasabwat. Pero ang surprise payout — kailangan ng KATAWAN. Walong buwan silang nakalusot sa apat na pirma. Isang Sabado lang sila nahuli ng isang sobre.' },
    { kind: 'say', speaker: 'alcaraz', text: '...' },
    { kind: 'say', speaker: 'alcaraz', text: 'Kaya pala hiniling ni Ferrer na ikaw ang staff dito. Sige, hijo. Idikta mo ang management letter point.' },
    { kind: 'say', speaker: 'jun', text: 'Opo, Sir. Una: quarterly surprise payout observation, hindi inaanunsyo. Ikalawa: ang timekeeper ay direktang mag-uulat sa admin, hindi sa foreman. Ikatlo—' },
    { kind: 'say', speaker: 'jun', text: '—ikatlo po: si Weng. Hindi lang siya dapat protektahan. Dapat siyang i-regularize. Ang kompanyang ito ay may isang internal control na gumana nang walong buwan nang walang bayad — ang konsensiya ng timekeeper nila.' },
    { kind: 'say', speaker: 'weng', pose: 'nervous', text: '...Sir naman po. Nakakahiya.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Tatlong puntos, tatlong tama. Tapos ang exit conference.' },
    { kind: 'narrate', text: 'Sa labas ng conference room, inabot ni Ate Cess ang isang kape. Mainit. Hindi galing sa petty cash.' },
    { kind: 'say', speaker: 'cess', text: 'Tatlong kaso, Jun. Kaha, kolekta, sweldo. Alam mo na ba kung ano ang pattern?' },
    { kind: 'say', speaker: 'jun', text: 'Opo, Ate. Ang pera ay hindi nawawala nang mag-isa. May tao lagi — at may dahilan, at may butas, at may hindi nagtatanong.' },
    { kind: 'say', speaker: 'cess', text: 'At may nagtatanong. Iyon tayo. Tara — may bago na naman daw tayong kliyente sa Lunes.' },
    { kind: 'endCase' },
  ],

  'sc3-wrong': [
    { kind: 'say', speaker: 'cess', text: 'Hindi iyan, Jun. Basahin mo ulit ang statement — ano mismo ang kinokontra mo?' },
  ],
}
