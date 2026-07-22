// Case 04 dialogue. Taglish: Tagalog voice, MAS terms in English.

import type { DialogueLine, ScriptId } from '../../engine/types'

export const scripts: Record<ScriptId, DialogueLine[]> = {
  // ---------- Act 1: briefing ----------
  'sc4-start': [
    { kind: 'narrate', text: 'Ferrer & Alcaraz, CPAs. Walang nawawalang pera ngayon. Iba ang kasong ito.' },
    { kind: 'say', speaker: 'cess', text: 'Jun, MAS engagement tayo ngayon. Bibingka ni Aling Rosa — apatnapung taon nang negosyo, tatlong product lines, isang commissary sa Marikina.' },
    { kind: 'say', speaker: 'jun', text: 'MAS? Hindi audit?' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Advisory. May kumatok sa kanilang consultant — si Marco Reyes, MBA — may dalang "Profit Maximization Roadmap". Ang anak ni Aling Rosa, si Nina, ang tumawag sa atin. Gusto niya ng second opinion bago pumirma ang nanay niya.',
    },
    { kind: 'give', evidence: 'ev-program4' },
    { kind: 'give', evidence: 'ev-roadmap' },
    { kind: 'say', speaker: 'jun', text: '"Guaranteed +₱1.2M kada taon." Ang tapang ng salitang guaranteed.' },
    { kind: 'say', speaker: 'cess', text: 'Sa MAS, walang guaranteed. May tama at may relevant. Iyon lang ang meron.' },
    {
      kind: 'choice',
      prompt: 'Ano ang unang tanong mo sa bawat rekomendasyon sa roadmap?',
      options: [
        { text: 'Relevant ba ang mga costs na pinagbatayan?', label: 'right4' },
        { text: 'Magkano ang matitipid?', label: 'soft4' },
      ],
    },
    { kind: 'label', name: 'soft4' },
    {
      kind: 'say',
      speaker: 'cess',
      pose: 'stern',
      text: 'Ang "matitipid" ay ang sagot ng roadmap. Hindi mo masusukat ang sagot gamit ang sariling sagot nito. Ang unang tanong: TAMA ba ang mga numerong pinagbatayan?',
    },
    { kind: 'goto', label: 'go4' },
    { kind: 'label', name: 'right4' },
    { kind: 'say', speaker: 'cess', text: 'Tama. Relevant costs muna, bago ang kahit ano. Ang magandang deck na mali ang batayan ay makinis na kasinungalingan.' },
    { kind: 'label', name: 'go4' },
    { kind: 'note', note: 'note-mas' },
    {
      kind: 'say',
      speaker: 'cess',
      text: 'Isa pang detalye: naka-schedule ang final presentation ni Marco sa comedor nila mamayang hapon. Pipirma na sana si Aling Rosa. May kalahating araw tayo.',
    },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'bakery' },
  ],

  // ---------- Act 1: bakery ----------
  'sc4-rosa': [
    { kind: 'say', speaker: 'rosa', text: 'Kayo ang mga kasama ni Nina? Kumain muna kayo. Bagong luto ang Espesyal — itlog na maalat at keso, recipe pa ng lola ko.' },
    { kind: 'say', speaker: 'jun', text: 'Salamat po. Aling Rosa — kumusta po si Marco?' },
    {
      kind: 'say',
      speaker: 'rosa',
      text: 'Ay, si Marco! Mabait na bata. Magalang, may MBA pa. Sabi niya, kaya raw niyang doblehin ang kita ko bago ako mag-retire. Para may maipamana ako kay Nina na malakas.',
    },
    { kind: 'say', speaker: 'rosa', text: 'Kaso ang mga rekomendasyon niya... itigil ang Espesyal? Recipe ng lola ko iyon, iho. Pero kung iyon ang tama para sa negosyo...' },
    { kind: 'say', speaker: 'jun', text: '(Handa siyang isakripisyo ang recipe ng lola niya sa numerong mali. Kailangan naming bilisan.)' },
    { kind: 'setFlag', flag: 'f4-rosa' },
  ],

  'sc4-nina': [
    { kind: 'say', speaker: 'nina', text: 'Salamat at pumunta kayo. Hindi ako accountant pero may kutob ako, at ayokong pumirma si Mama dahil lang makinis ang PowerPoint.' },
    { kind: 'say', speaker: 'nina', text: 'Eto ang P&L na ginamit niya para sa "lugi" ng Espesyal. At eto ang kontrata niya — basahin niyo ang bayad.' },
    { kind: 'give', evidence: 'ev-segment-pl' },
    { kind: 'give', evidence: 'ev-fee' },
    { kind: 'say', speaker: 'jun', text: '20% ng "realized savings", tatlong taon. Kapag mas malaki ang "savings", mas malaki ang bayad niya.' },
    { kind: 'say', speaker: 'nina', text: 'Kaya bawat rekomendasyon niya, "tipid" nang "tipid". Sana mali lang ako. Pero kung tama ako — mas gusto kong malaman ngayon kaysa sa Year 2.' },
    { kind: 'setFlag', flag: 'f4-nina' },
  ],

  'sc4-floor': [
    { kind: 'narrate', text: 'Nilibot mo ang production floor. Apat na hilera ng pugon, tatlo lang ang may apoy. Mga trey na naghihintay.' },
    { kind: 'narrate', text: 'Sa production report: 60% utilization. May 40% na kapasidad na natutulog araw-araw.' },
    { kind: 'give', evidence: 'ev-capacity' },
    { kind: 'say', speaker: 'jun', text: '(Idle capacity. Tandaan mo ito — halos lahat ng desisyon sa roadmap ay nakasandal sa kapasidad.)' },
    { kind: 'narrate', text: 'Sa sulok, may nakatiwangwang na bakal na estruktura — kalahating tapos, natatakpan ng trapal. May karatula: "PROJECT HURNO".' },
    { kind: 'setFlag', flag: 'f4-capacity' },
  ],

  'sc4-orderfile': [
    { kind: 'narrate', text: 'Sa file ni Nina: ang alok ng Hotel Mirador. 10,000 mini-bibingka kada quarter, ₱18 kada piraso.' },
    { kind: 'give', evidence: 'ev-order' },
    { kind: 'say', speaker: 'jun', text: '₱22 daw ang "cost per unit" — pero ₱13 lang ang variable. Ang ₱9 ay allocated na upa at depreciation.' },
    { kind: 'say', speaker: 'jun', text: '(Sabi ni Marco, lugi ₱4 kada piraso. Titingnan natin.)' },
    { kind: 'setFlag', flag: 'f4-order' },
  ],

  'sc4-recast': [
    { kind: 'say', speaker: 'cess', text: 'Tapos ko na ang recast ng Espesyal. Upo ka muna — magugustuhan mo ito.' },
    { kind: 'give', evidence: 'ev-recast' },
    { kind: 'say', speaker: 'cess', text: 'CM ng Espesyal: ₱880,000. Avoidable fixed: ₱500,000. Segment margin: positibong ₱380,000.' },
    { kind: 'say', speaker: 'jun', text: 'At ang ₱500,000 na allocated — lilipat lang sa Classic at Ube kapag itinigil. Tapos sila naman ang magmumukhang lugi.' },
    { kind: 'say', speaker: 'cess', text: 'Death spiral. Isang line kada taon, hanggang ang huling natirang produkto ang "may kasalanan" sa lahat ng upa. Ganyan namamatay ang mga apatnapung-taong negosyo.' },
    { kind: 'note', note: 'note-cm' },
    { kind: 'setFlag', flag: 'f4-recast' },
  ],

  'sc4-marco-1': [
    { kind: 'say', speaker: 'marco', text: 'Ah! Ang second opinion team. Marco Reyes. Walang personalan, ha — mas maraming mata, mas maganda para kay Aling Rosa.' },
    { kind: 'say', speaker: 'jun', text: 'Sang-ayon po ako doon.' },
    { kind: 'say', speaker: 'marco', text: 'Ang totoo, matutuwa kayo sa roadmap. Data-driven lahat. Galing mismo sa books nila — walang imbento.' },
    { kind: 'branch', when: { allOf: ['f4-recast'] }, label: 'ready4' },
    { kind: 'say', speaker: 'jun', text: 'Binabasa pa lang po namin. Balikan ko kayo.' },
    { kind: 'say', speaker: 'marco', text: 'Dahan-dahanin niyo! Alas-kuwatro ang presentation. Pirmahan na, sana.' },
    { kind: 'goto', label: 'end4' },
    { kind: 'label', name: 'ready4' },
    { kind: 'say', speaker: 'jun', text: 'Sir Marco, bago po ang presentation — puwede po ba kayong magbigay ng pormal na testimonya tungkol sa unang rekomendasyon?' },
    { kind: 'say', speaker: 'marco', text: 'Testimonya? Parang korte naman. ...Sige, game. Kumpiyansa ako sa numero ko.' },
    { kind: 'setFlag', flag: 'f4-ready-t1' },
    { kind: 'label', name: 'end4' },
  ],

  // ---------- Testimony 1 presses (Marco — keep-or-drop) ----------
  'sc4-t1-p1': [
    { kind: 'say', speaker: 'jun', text: 'Saan po galing ang ₱120,000 na "lugi"?' },
    { kind: 'say', speaker: 'marco', text: 'Sa mismong P&L nila! Sales, less costs, net loss. Elementary. Hindi ako ang gumawa ng numero — tagapagsalita lang ako ng katotohanan.' },
    { kind: 'say', speaker: 'jun', text: '(Tagapagsalita ng allocated costs, mas tama.)' },
  ],
  'sc4-t1-p2': [
    { kind: 'say', speaker: 'jun', text: 'Alam niyo po ba kung magkano ang contribution margin ng Espesyal?' },
    { kind: 'say', speaker: 'marco', pose: 'nervous', text: 'Ang... siyempre. Nasa deck iyon. Sa appendix. Ang punto, ang bottom line ay bottom line: negative one-twenty.' },
    { kind: 'say', speaker: 'jun', text: '(Hindi niya alam. O alam niya, at umaasa siyang hindi namin alam.)' },
  ],
  'sc4-t1-p3': [
    { kind: 'say', speaker: 'jun', text: 'Kapag itinigil ang Espesyal — saan mapupunta ang upa ng head office na naka-allocate dito?' },
    { kind: 'say', speaker: 'marco', pose: 'nervous', text: 'Ma-a-absorb ng ibang lines. Normal na accounting iyon.' },
    { kind: 'say', speaker: 'jun', text: '"Ma-a-absorb." Ibig sabihin, hindi mawawala.' },
    { kind: 'say', speaker: 'marco', text: '...Teknikalidad iyan.' },
  ],

  'sc4-t1-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Hindi po mababawi ang ₱120,000 — dahil hindi iyon lugi. Eto po ang recast.' },
    { kind: 'say', speaker: 'jun', text: 'Kapag itinigil ang Espesyal: mawawala ang ₱880,000 na contribution margin, maiiwasan lang ang ₱500,000 na direct fixed. Ang kompanya ay MALULUGI ng ₱380,000 kada taon.' },
    { kind: 'say', speaker: 'marco', pose: 'shocked', text: '...Recast? Sino ang nag-authorize sa inyo na i-recast ang—' },
    { kind: 'say', speaker: 'jun', text: 'Ang allocated na ₱500,000 ay upa at kuryente ng BUONG commissary. Itigil man ang Espesyal, hindi aalis ang upa. Lilipat lang ito sa Classic at Ube — at sa susunod na taon, sila naman ang irerekomenda niyong itigil.' },
    { kind: 'say', speaker: 'rosa', text: '...Ang recipe ng lola ko. Kumikita pala ng ₱380,000?' },
    { kind: 'say', speaker: 'marco', pose: 'nervous', text: 'Aling Rosa, semantics lang po ito, magkaiba lang kami ng framework—' },
    { kind: 'say', speaker: 'cess', text: 'Ang framework na may pangalan: relevant costing. Jun — sa records tayo. May dalawa pang rekomendasyong hihimayin bago mag-alas-kuwatro.' },
    { kind: 'moveTo', scene: 'records' },
  ],

  // ---------- Act 2: records ----------
  'sc4-quote': [
    { kind: 'narrate', text: 'Ang quotation ng MZR Foods para sa galapong: ₱15.50 kada kilo, laban sa "₱17.00 in-house".' },
    { kind: 'narrate', text: 'Sa ikaanim na pahina, maliit na letra: "Year 1 only. Annual adjustment up to 18%, per market conditions determined by the supplier."' },
    { kind: 'give', evidence: 'ev-quote' },
    { kind: 'say', speaker: 'jun', text: 'At ang ₱17 ay full cost. Ang maiiwasan lang kapag tumigil silang gumiling: ₱13.80. Bili ₱15.50, iwas ₱13.80 — lugi ₱1.70 kada kilo. Year 1 pa lang iyon.' },
    { kind: 'note', note: 'note-makeorbuy' },
    { kind: 'setFlag', flag: 'f4-quote' },
  ],

  'sc4-nina2': [
    { kind: 'say', speaker: 'nina', text: 'May hiniling kayo kahapon — chineck ko ang MZR Foods sa SEC i-View. Kagabi ko pa hawak ito, hindi ako makatulog.' },
    { kind: 'give', evidence: 'ev-sec' },
    { kind: 'say', speaker: 'jun', text: 'Incorporators: Reyes, Marco Z. — kwarenta porsiyento. Rehistrado limang buwan bago ang roadmap.' },
    { kind: 'say', speaker: 'nina', text: 'MZR. Marco Z. Reyes. Nasa pangalan na mismo, hindi man lang nagtago. Ganoon ba siya ka-kumpiyansa na hindi kami magtatanong?' },
    { kind: 'say', speaker: 'jun', text: '(Oo. Ganoon ka-kumpiyansa. Hanggang ngayong hapon.)' },
    { kind: 'setFlag', flag: 'f4-sec' },
  ],

  'sc4-relevant': [
    { kind: 'say', speaker: 'cess', text: 'Ang hotel order — heto ang relevant costing schedule. Simple lang pero buhay o kamatayan ang pagkakaiba.' },
    { kind: 'give', evidence: 'ev-relevant' },
    { kind: 'say', speaker: 'cess', text: 'Sa idle capacity: presyo ₱18, variable ₱13. Dagdag na ₱5 kada piraso, ₱50,000 kada quarter — ₱200,000 kada taon na itinatapon ng "lugi ₱4" ni Marco.' },
    { kind: 'say', speaker: 'jun', text: 'Ang ₱9 na allocated overhead — nariyan na, order man o wala.' },
    { kind: 'say', speaker: 'cess', text: 'Sabihin mo iyan sa kanya mamaya. Sa harap ni Aling Rosa. Ako ang bahala sa kape.' },
    { kind: 'setFlag', flag: 'f4-relevant' },
  ],

  'sc4-hurno': [
    { kind: 'say', speaker: 'jun', text: 'Ate, iisa na lang ang natitira sa roadmap — ang Project Hurno. At iyon po ang ipagtatanggol ni Aling Rosa mismo, hindi ni Marco.' },
    { kind: 'say', speaker: 'cess', text: 'Kaya iba ang paghahanda mo dito. Hindi ka manghuhuli — magtuturo ka. Gawin mo ang incremental analysis. Hatiin: ano ang nakaraan, ano ang hinaharap.' },
    { kind: 'narrate', text: 'Kinuha mo ang mga resibo ng Project Hurno at hinati sa dalawang kolum: nagastos na, at gagastusin pa.' },
    { kind: 'give', evidence: 'ev-hurno' },
    { kind: 'say', speaker: 'jun', text: '₱2M na ang nagastos — sunk. ₱1.5M pa para matapos, para sa kapasidad na hindi kayang gamitin ng plantang 60% pa lang. O ibenta ang shell nang ₱400,000.' },
    { kind: 'say', speaker: 'cess', text: 'Ang ₱2M ay wala sa magkabilang kolum. Hindi na siya botante. Kunin mo iyang katotohanang iyan sa comedor — pero dahan-dahan. May puso ang huling laban na ito.' },
    { kind: 'setFlag', flag: 'f4-hurno' },
  ],

  'sc4-to-conf4': [
    { kind: 'say', speaker: 'nina', text: 'Alas-kuwatro na po. Nag-set up na si Marco ng projector sa comedor. May bago pa siyang polo.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... ang huling rekomendasyon. Project Hurno. Si Aling Rosa mismo ang maninindigan doon, hindi si Marco.' },
    { kind: 'say', speaker: 'cess', text: 'Alam ko. Kaya ang huling laban mo ngayon ay hindi kontra sa manloloko — kontra sa pusong ayaw umamin na lugi na. Iyon ang pinakamahirap na klase ng testimony, Jun. Dahan-dahanin mo.' },
    { kind: 'checkpoint' },
    { kind: 'moveTo', scene: 'comedor' },
  ],

  'sc4-conf-open': [
    { kind: 'say', speaker: 'marco', text: 'Aling Rosa, Nina, at siyempre ang ating... second opinion team. Ipagpapatuloy ko ang presentation — rekomendasyon numero dos: ang Hotel Mirador order.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Bago ka magpatuloy, G. Reyes — ang kliyente ay humiling ng pormal na review. Bawat rekomendasyon, dadaan sa tanong. Ayos lang ba?' },
    { kind: 'say', speaker: 'marco', text: 'Ayos na ayos. Ang totoo ay hindi natatakot sa tanong.' },
    { kind: 'say', speaker: 'jun', text: '(Sana po totoo iyan.)' },
    { kind: 'testimony', testimony: 't2-hotel' },
  ],

  // ---------- Testimony 2 presses (special order) ----------
  'sc4-t2-p1': [
    { kind: 'say', speaker: 'jun', text: 'Paano po kayo nakarating sa ₱22 kada piraso?' },
    { kind: 'say', speaker: 'marco', text: 'Total cost, divided by units. Standard costing. Kahit first-year accounting student, alam iyan.' },
    { kind: 'say', speaker: 'jun', text: 'Opo. At kahit first-year MAS student, alam kung kailan iyan MALI.' },
  ],
  'sc4-t2-p2': [
    { kind: 'say', speaker: 'jun', text: 'Alam niyo po bang 60% lang ang utilization ng commissary?' },
    { kind: 'say', speaker: 'marco', pose: 'nervous', text: 'May kinalaman ba iyon? Ang cost ay cost. ₱22 ang gastos, ₱18 ang bayad. Simpleng aritmetika.' },
    { kind: 'say', speaker: 'jun', text: '(Ang kapasidad ang buong kuwento, at "may kinalaman ba iyon" ang sagot niya.)' },
  ],

  'sc4-t2-break': [
    { kind: 'shout', card: 'ETO, O!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Ang relevant costing schedule po. Sa idle capacity, ang tamang paghahambing: ₱18 na presyo laban sa ₱13 na variable cost.' },
    { kind: 'say', speaker: 'jun', text: 'Dagdag na ₱5 kada piraso. ₱50,000 kada quarter. ₱200,000 kada taon — mula sa order na nirekomenda niyong TANGGIHAN.' },
    { kind: 'say', speaker: 'marco', pose: 'shocked', text: 'Ang allocated overhead ay totoong gastos! Hindi ninyo puwedeng balewalain—' },
    { kind: 'say', speaker: 'jun', text: 'Totoo po siya — at IRRELEVANT. Ang upa ay babayaran, tanggapin man ang hotel o hindi. Walang dagdag ni piso.' },
    { kind: 'say', speaker: 'rosa', text: 'Teka. Ang order na sinabihan akong tanggihan... kita pala ng ₱200,000?' },
    { kind: 'say', speaker: 'marco', pose: 'nervous', text: 'Aling Rosa, konserbatibo lang po ako para sa inyo! Ang mahalaga ay ang malaking tipid sa rekomendasyon tres — ang outsourcing—' },
    { kind: 'say', speaker: 'jun', text: 'A, opo. Ang outsourcing. Pag-usapan po natin ang MZR Foods.' },
    { kind: 'testimony', testimony: 't3-mzr' },
  ],

  // ---------- Testimony 3 presses (MZR / conflict) ----------
  'sc4-t3-p1': [
    { kind: 'say', speaker: 'jun', text: 'Ilan pong supplier ang kasama sa canvass?' },
    { kind: 'say', speaker: 'marco', text: 'Tatlo. Pormal na proseso — request for quotation, sealed, lahat. Ang MZR lang ang pumasa sa presyo at kalidad.' },
    { kind: 'say', speaker: 'jun', text: '(Tatlong sobre, isang nagsulat ng resulta.)' },
  ],
  'sc4-t3-p2': [
    { kind: 'say', speaker: 'jun', text: 'Kailan po naitatag ang MZR Foods?' },
    { kind: 'say', speaker: 'marco', pose: 'nervous', text: 'Hindi ko... bakit ko naman kabisado ang founding date ng isang supplier? Bago-bago sila siguro. Agresibo sa presyo ang mga bago. Mabuti iyon para sa kliyente.' },
    { kind: 'say', speaker: 'jun', text: 'Marso 2023 po. Limang buwan bago ang roadmap niyo.' },
    { kind: 'say', speaker: 'marco', pose: 'nervous', text: '...Ang galing niyong mag-research.' },
  ],

  'sc4-t3-break': [
    { kind: 'shout', card: 'OBJECTION!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: '"Walang kahit anong koneksyon"? Sir Marco — eto po ang SEC registration ng MZR Foods Corporation.' },
    { kind: 'say', speaker: 'jun', text: 'Incorporator numero uno: REYES, MARCO Z. Apatnapung porsiyento. Ang M-Z-R po ay hindi misteryosong acronym. Inisyal niyo po iyon.' },
    { kind: 'say', speaker: 'rosa', pose: 'shocked', text: 'Marco...?' },
    { kind: 'say', speaker: 'marco', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'jun', text: 'At hindi lang po iyon. Ang "pinakamurang" presyo ng MZR ay Year 1 lang — may escalation na hanggang 18% kada taon, na ang SUPPLIER ang magtatakda. At ang bayad niyo bilang consultant: 20% ng "savings".' },
    { kind: 'say', speaker: 'jun', text: 'Kayo po ang consultant na nagrekomenda. Kayo rin po ang supplier na mananalo. At kayo rin po ang kokolekta ng porsiyento ng "tipid" na kayo rin ang nag-imbento.' },
    { kind: 'say', speaker: 'marco', text: '...Legal ang magkaroon ng negosyo. Walang batas na—' },
    { kind: 'say', speaker: 'alcaraz', text: 'May tinatawag na conflict of interest, G. Reyes, at may tinatawag na disclosure. Ang payong may nakatagong interes ay hindi payo. Benta iyon.' },
    { kind: 'say', speaker: 'nina', text: 'Mama. Sapat na po ba?' },
    { kind: 'say', speaker: 'rosa', text: '...Iho. Umalis ka na sa comedor ko.' },
    { kind: 'narrate', text: 'Tiniklop ni Marco ang laptop niya. Walang nagsalita habang naglalakad siya palabas. Ang bago niyang polo, basa sa likod.' },
    { kind: 'say', speaker: 'rosa', text: 'Salamat, mga iho. ...Pero may isa pang bagay. Ang Project Hurno — ITUTULOY ko iyon. Akin ang desisyong iyon, hindi kay Marco.' },
    { kind: 'testimony', testimony: 't4-puhunan' },
  ],

  // ---------- Testimony 4 presses (Rosa — sunk cost) ----------
  'sc4-t4-p1': [
    { kind: 'say', speaker: 'jun', text: 'Aling Rosa... ano po ang gagawin ng bagong pugon kapag natapos?' },
    { kind: 'say', speaker: 'rosa', text: 'Dagdag na kapasidad! Para paglaki ng negosyo, handa tayo.' },
    { kind: 'say', speaker: 'jun', text: 'Opo. Pero ngayon po, ang apat na pugon natin — tatlo lang ang umaandar.' },
    { kind: 'say', speaker: 'rosa', text: '...Alam ko iyon, iho. Nakikita ko araw-araw.' },
  ],
  'sc4-t4-p2': [
    { kind: 'say', speaker: 'jun', text: 'Bakit po napakahalaga ng Project Hurno sa inyo?' },
    { kind: 'say', speaker: 'rosa', text: 'Ipinangako ko sa sarili ko noong namatay ang mister ko: lalakihan ko ito. Ang Hurno ang pangako kong iyon, iho. Nakapangalan pa sa kanya ang project — mahilig siya sa malalaking pugon.' },
    { kind: 'say', speaker: 'jun', text: '(Hindi ito tungkol sa numero. Kailanman hindi naging tungkol sa numero.)' },
  ],

  'sc4-t4-break': [
    { kind: 'shout', card: 'SANDALI!', speaker: 'jun' },
    { kind: 'say', speaker: 'jun', text: 'Aling Rosa... hindi po itatapon ang ₱2 milyon. Hindi po iyon puwedeng itapon — dahil wala na po siya.' },
    { kind: 'say', speaker: 'rosa', text: '...Ano?' },
    { kind: 'say', speaker: 'jun', text: 'Eto po ang analysis. Ang ₱2M ay nagastos na — ituloy man o ihinto, hindi na siya babalik. Sa managerial accounting, sunk cost po ang tawag. Wala na po siyang boto sa desisyon.' },
    { kind: 'say', speaker: 'jun', text: 'Ang totoong tanong po: ang SUSUNOD na ₱1.5 milyon. Ibubuhos po ba natin siya sa kapasidad na hindi kailangan ng plantang 60% pa lang ang gamit — o ililigtas natin siya, ibenta ang shell nang ₱400,000, at ilagay ang pera kung saan may buhay?' },
    { kind: 'say', speaker: 'rosa', pose: 'shocked', text: '...' },
    { kind: 'say', speaker: 'rosa', text: 'Ang pangako ko sa mister ko...' },
    {
      kind: 'say',
      speaker: 'jun',
      text: 'Ang pangako niyo po ay palakihin ang negosyo. Hindi po ang tapusin ang isang pugon. Ang ₱1.5M na maliligtas — kayang buhayin ang ikaapat na pugon na patay, kayang pondohan ang hotel order, kayang i-regularize ang mga tao ni Nina. Iyon po ang paglaki.',
    },
    { kind: 'say', speaker: 'nina', text: 'Ma. Alam ni Papa ang pagkakaiba ng pugon at ng pangako.' },
    { kind: 'narrate', text: 'Matagal na katahimikan. Tumingin si Aling Rosa sa direksiyon ng production floor — sa trapal na may karatulang "PROJECT HURNO".' },
    { kind: 'say', speaker: 'rosa', text: '...Ibenta ang shell. Ang pangalan — ililipat natin sa bagong linya ng Espesyal. "Hurno ni Celso." Mas magugustuhan niya iyon.' },
    { kind: 'say', speaker: 'rosa', text: 'At kayo, mga iho — sa susunod na may magandang PowerPoint na kumatok dito, kayo muna ang tatawagin ko bago ako pumirma ng kahit ano.' },
    { kind: 'say', speaker: 'alcaraz', text: 'Iyan po, Aling Rosa, ang pinakamurang internal control sa buong mundo.' },
    { kind: 'narrate', text: 'Sa labas ng comedor, inabutan kayo ni Aling Rosa ng dalawang kahon ng Bibingka Espesyal. Mainit pa.' },
    { kind: 'say', speaker: 'cess', text: 'Kita mo, Jun? May mga kasong walang magnanakaw na hinahabol. Minsan ang nililigtas mo ay ang kliyente — mula sa payo, at mula sa sarili niyang puso.' },
    { kind: 'say', speaker: 'jun', text: 'Ate... ito po ang paborito kong kaso.' },
    { kind: 'say', speaker: 'cess', text: 'Sabi ko na nga ba. MAS ka talaga sa puso. Tara — habang mainit pa ang bibingka.' },
    { kind: 'endCase' },
  ],

  'sc4-wrong': [
    { kind: 'say', speaker: 'cess', text: 'Hindi iyan ang schedule na kontra sa statement, Jun. Isipin mo: alin ang RELEVANT dito?' },
  ],
}
