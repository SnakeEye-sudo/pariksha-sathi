// SYLLABUS DATA — BPSC Class 1-5 (PRT)
// Pattern: Part I Language(30) + Part II GS(120) = 150 marks. No negative marking.
// Language is qualifying — kept last so GS subjects get priority in rotation.
const syl_bpsc15 = {

  'Part II — General Studies (सामान्य अध्ययन)': {
    marks:120, color:'#10b981',
    topics:[

      // ── HISTORY ──
      {name:'History: Modern India & Freedom Movement',hindi:'आधुनिक भारत एवं स्वतंत्रता संग्राम',
       micro:['British East India Company — Plassey, Buxar',
              '1857 Revolt — causes, events, leaders',
              'Indian National Congress — formation 1885',
              'Gandhi — Champaran, Non-Cooperation, Civil Disobedience, Quit India',
              'Bihar in Freedom Movement — JP, Rajendra Prasad',
              'Partition 1947 and Independence',
              'Important Acts — 1919, 1935, 1947']},

      // ── GEOGRAPHY ──
      {name:'Geography: India — Physical & Climate',hindi:'भारत का भौतिक भूगोल एवं जलवायु',
       micro:['Location, extent and neighbours of India',
              'Physiographic divisions — Himalayas, Plains, Plateau, Coastal',
              'Major rivers — Ganga, Yamuna, Brahmaputra, Deccan rivers',
              'Climate — Monsoon, seasons, rainfall distribution',
              'Natural vegetation and wildlife',
              'Bihar geography — rivers, plains, districts']},

      {name:'Geography: India — Resources & Economy',hindi:'भारत के संसाधन एवं अर्थव्यवस्था',
       micro:['Soil types — alluvial, black, red, laterite',
              'Agriculture — major crops, crop seasons (Kharif/Rabi)',
              'Minerals — coal, iron ore, bauxite, mica',
              'Industries — iron & steel, textile, IT',
              'Transport — railways, roadways, waterways',
              'Population — census, density, literacy']},

      // ── POLITY ──
      {name:'Polity: Constitution & Fundamental Rights',hindi:'संविधान एवं मौलिक अधिकार',
       micro:['Making of Constitution — Constituent Assembly',
              'Preamble — key words and significance',
              'Fundamental Rights — Articles 12–35',
              'Directive Principles of State Policy (DPSP)',
              'Fundamental Duties',
              'Important Amendments — 42nd, 44th, 73rd, 74th, 86th']},

      {name:'Polity: Government Structure',hindi:'सरकार की संरचना',
       micro:['President — election, powers, Article 52–78',
              'Prime Minister and Council of Ministers',
              'Parliament — Lok Sabha, Rajya Sabha, functions',
              'Supreme Court and High Courts',
              'Panchayati Raj — 73rd Amendment, 3-tier system',
              'Urban Local Bodies — 74th Amendment',
              'Election Commission — functions and powers']},

      // ── ECONOMICS ──
      {name:'Economics: Indian Economy Basics',hindi:'भारतीय अर्थव्यवस्था की मूल बातें',
       micro:['Types of economy — capitalist, socialist, mixed',
              'National Income — GDP, GNP, NNP',
              'Five Year Plans and NITI Aayog',
              'Poverty and unemployment — types and measures',
              'Inflation — causes, effects, control',
              'Banking — RBI, commercial banks, functions',
              'Government schemes — PM-KISAN, MGNREGA, Ayushman Bharat']},

      // ── SCIENCE ──
      {name:'Science: Physics — Motion, Force & Energy',hindi:'भौतिकी — गति, बल एवं ऊर्जा',
       micro:['Motion — distance, displacement, speed, velocity',
              'Newton\'s Laws of Motion',
              'Work, Energy and Power',
              'Gravitation — free fall, g value',
              'Pressure — Pascal\'s law, atmospheric pressure',
              'Sound — properties, echo, ultrasound']},

      {name:'Science: Physics — Light, Heat & Electricity',hindi:'भौतिकी — प्रकाश, ऊष्मा एवं विद्युत',
       micro:['Reflection and Refraction of Light',
              'Lenses and Mirrors — concave, convex',
              'Human Eye — defects and correction',
              'Heat — conduction, convection, radiation',
              'Electric current — Ohm\'s law, resistance',
              'Magnetic effects of current']},

      {name:'Science: Chemistry',hindi:'रसायन विज्ञान',
       micro:['Matter — states, properties, changes',
              'Atoms and Molecules — atomic structure',
              'Periodic Table — groups, periods, key elements',
              'Acids, Bases and Salts — pH scale',
              'Metals and Non-Metals — properties and uses',
              'Carbon compounds — organic basics',
              'Chemical reactions — types and examples']},

      {name:'Science: Biology — Life Processes',hindi:'जीव विज्ञान — जीवन प्रक्रियाएं',
       micro:['Cell — structure, organelles, cell division',
              'Nutrition — autotrophic, heterotrophic, photosynthesis',
              'Respiration — aerobic and anaerobic',
              'Transportation — blood, heart, circulatory system',
              'Excretion — kidneys, nephron',
              'Nervous System — brain, spinal cord, reflex action']},

      {name:'Science: Biology — Reproduction & Environment',hindi:'जीव विज्ञान — जनन एवं पर्यावरण',
       micro:['Reproduction — asexual and sexual',
              'Heredity and Evolution — Mendel\'s laws',
              'Vitamins and Minerals — sources and deficiency diseases',
              'Diseases — bacterial, viral, protozoan, deficiency',
              'Ecosystem — food chain, food web, energy flow',
              'Environmental pollution — types and control',
              'Conservation — biodiversity, national parks']},

      // ── BIHAR GK & CURRENT AFFAIRS ──
      {name:'Bihar GK & Current Affairs',hindi:'बिहार सामान्य ज्ञान एवं समसामयिकी',
       micro:['Bihar — history, geography, districts, rivers',
              'Bihar government schemes — Mukhyamantri schemes',
              'Bihar economy — agriculture, industries',
              'Important personalities from Bihar',
              'National current affairs — last 6 months',
              'Government schemes — central and state',
              'Sports, awards, summits — recent events']},

      // ── ENVIRONMENT & EVS ──
      {name:'Environment & EVS',hindi:'पर्यावरण एवं पर्यावरण अध्ययन',
       micro:['Natural resources — air, water, soil, forests',
              'Pollution — air, water, soil, noise — causes and effects',
              'Climate change — greenhouse effect, global warming',
              'Biodiversity — types, threats, conservation',
              'Environmental laws — Wildlife Protection Act, Forest Act',
              'EVS pedagogy — teaching methods for primary classes',
              'Sustainable development goals (SDGs)']},

      // ── GENERAL AWARENESS ──
      {name:'General Awareness & Bihar GK',hindi:'सामान्य जागरूकता एवं बिहार GK',
       micro:['India — capitals, currencies, national symbols',
              'Important days and events — national and international',
              'Books and authors — recent and classic',
              'Science in everyday life — inventions and discoveries',
              'Bihar — Chief Ministers, Governors, important facts',
              'Sports — Olympics, Commonwealth, Asian Games',
              'Awards — Bharat Ratna, Padma, Nobel Prize']},

      // ── MATHEMATICS (merged into 6 balanced topics) ──
      {name:'Maths: Number System & Simplification',hindi:'संख्या पद्धति एवं सरलीकरण',
       micro:['Natural, Whole, Integer, Rational, Irrational numbers',
              'LCM & HCF — methods and shortcuts',
              'Divisibility rules (2,3,4,5,6,8,9,11)',
              'BODMAS — order of operations',
              'Simplification of fractions and decimals',
              'Practice: 10 mixed questions']},

      {name:'Maths: Percentage, Profit-Loss & Discount',hindi:'प्रतिशत, लाभ-हानि एवं छूट',
       micro:['Percentage — formula, increase/decrease, application',
              'Converting fraction ↔ percentage ↔ decimal',
              'Cost Price, Selling Price, Marked Price',
              'Profit % and Loss % formulas',
              'Discount — single and successive',
              'Dishonest dealer problems',
              'Practice: 15 mixed questions']},

      {name:'Maths: Interest, Ratio & Average',hindi:'ब्याज, अनुपात एवं औसत',
       micro:['SI formula — P×R×T/100',
              'CI formula — P(1+R/100)^T, half-yearly compounding',
              'Ratio — simplification, comparison, partnership',
              'Proportion — direct and inverse',
              'Average formula, weighted average, consecutive numbers',
              'Practice: 15 mixed questions']},

      {name:'Maths: Time-Work & Speed-Distance',hindi:'समय-कार्य एवं चाल-दूरी',
       micro:['Time & Work — basic formula (1/n per day)',
              'Pipes & Cisterns',
              'Speed = Distance / Time',
              'Relative speed — same and opposite direction',
              'Train problems (length + speed)',
              'Practice: 15 mixed questions']},

      {name:'Maths: Algebra & Geometry',hindi:'बीजगणित एवं रेखागणित',
       micro:['Algebraic identities: (a+b)², (a-b)², (a+b)(a-b)',
              'Factorisation and linear equations (1 & 2 variables)',
              'Types of angles, parallel lines and transversal',
              'Properties of triangles — congruence, similarity',
              'Pythagoras theorem and applications',
              'Practice: 15 mixed questions']},

      {name:'Maths: Mensuration — 2D & 3D',hindi:'क्षेत्रमिति — समतल एवं ठोस आकृतियाँ',
       micro:['Rectangle, Square, Triangle — area and perimeter',
              'Circle — area (πr²) and circumference (2πr)',
              'Parallelogram, Trapezium, combined figures',
              'Cube, Cuboid — volume and surface area',
              'Cylinder, Cone, Sphere — volume and surface area',
              'Practice: 15 mixed questions']},

      // ── REASONING (merged into 2 topics) ──
      {name:'Reasoning: Series, Analogy, Coding & Relations',hindi:'श्रृंखला, सादृश्यता, कूट भाषा एवं रक्त संबंध',
       micro:['Number & Letter Series — missing/wrong term',
              'Analogy — number, letter, word based',
              'Classification (Odd one out)',
              'Coding-Decoding — letter shift, symbol based',
              'Blood Relations — family tree method',
              'Direction Sense & Ranking',
              'Practice: 15 mixed questions']},

      {name:'Reasoning: Logical, Verbal & Non-Verbal',hindi:'तार्किक, मौखिक एवं अशाब्दिक तर्क',
       micro:['Statement & Conclusion / Assumption',
              'Syllogism — Venn diagram method',
              'Sitting Arrangement — linear and circular',
              'Calendar, Clock — day/date/angle problems',
              'Mirror & Water Image, Venn Diagram',
              'Cause & Effect, Course of Action',
              'Practice: 15 mixed questions']}
    ]
  },

  // ── LANGUAGE — kept last (qualifying paper) ──
  'Part I — Language (भाषा)': {
    marks:30, color:'#f59e0b',
    topics:[
      {name:'English Grammar & Comprehension',hindi:'अंग्रेजी व्याकरण एवं बोध',
       micro:['Vocabulary — Synonyms, Antonyms, One-word substitution',
              'Grammar — Noun, Pronoun, Verb, Adverb, Adjective, Preposition',
              'Articles (a, an, the) and Tenses (all 12 types)',
              'Voice — Active & Passive',
              'Narration — Direct & Indirect',
              'Sentence Correction & Transformation',
              'Reading Comprehension and Idioms & Phrases']},
      {name:'Hindi / Urdu / Bangla Grammar',hindi:'हिंदी / उर्दू / बांग्ला व्याकरण',
       micro:['वर्तनी (Spelling) और रिक्त स्थान पूर्ति',
              'शब्दावली — विलोम, समानार्थी शब्द',
              'वाक्य की बनावट और व्याकरण',
              'मुहावरेदार प्रयोग और त्रुटि पहचान',
              'बुनियादी लेखन क्षमता']}
    ]
  }
};
