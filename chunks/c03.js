// BPSC 1-5 GS extra topics (appended to syl_bpsc15)
// Note: History is already handled in c02.js (Modern India only for 1-5)
const syl_bpsc15_extra = [
  {name:'Environment & EVS',hindi:'पर्यावरण एवं EVS',
   micro:['Ecosystem — Food chain, Energy flow',
          'Biodiversity — Hotspots, IUCN Red List',
          'Pollution — Air, Water, Soil, Noise',
          'Climate Change — Greenhouse effect, Ozone depletion',
          'Natural Disasters — flood, drought, earthquake',
          'Conservation — National Parks, Wildlife Sanctuaries',
          'EVS Pedagogy — teaching methods for primary level']},
  {name:'General Awareness & Bihar GK',hindi:'सामान्य जागरूकता एवं बिहार GK',
   micro:['India & Neighboring Countries — capitals, currencies',
          'Current Affairs — national and international (last 6 months)',
          'Sports — Olympics, CWG, Asian Games, recent events',
          'Awards & Honours — Bharat Ratna, Padma, Nobel',
          'Government Policies & Schemes — central and state',
          'Bihar GK — history, geography, districts, rivers',
          'Science & Technology News']}
];
// Merge into syl_bpsc15
syl_bpsc15['Part II — General Studies (सामान्य अध्ययन)'].topics.push(...syl_bpsc15_extra);
