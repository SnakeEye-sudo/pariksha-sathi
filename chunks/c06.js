// SYLLABUS DATA — UPSC CSE Mains
// Qualifying: Paper A Indian Language(300) + Paper B English(300)
// Merit: Essay(250) + GS I-IV(250x4=1000) + Optional(250x2=500) + Interview(275)
const syl_upsc_mains = {
  'Qualifying Paper A — Indian Language (300 Marks)': {
    marks:300, color:'#64748b',
    topics:[
      {name:'Indian Language Paper (Qualifying — Matriculation level)',hindi:'भारतीय भाषा पेपर (अर्हक)',
       micro:['One Indian language from 8th Schedule of Constitution',
              'Comprehension of given passages','Precis writing',
              'Usage & vocabulary','Short essays',
              'Translation from English to Indian language & vice versa',
              'Note: Marks NOT counted in merit ranking — minimum 25% required']}
    ]
  },
  'Qualifying Paper B — English (300 Marks)': {
    marks:300, color:'#64748b',
    topics:[
      {name:'English Paper (Qualifying — Matriculation level)',hindi:'अंग्रेजी पेपर (अर्हक)',
       micro:['Comprehension of given passages','Precis writing',
              'Usage & vocabulary','Short essays',
              'Translation from Indian language to English',
              'Note: Marks NOT counted in merit ranking — minimum 25% required']}
    ]
  },
  'Essay Paper (250 Marks)': {
    marks:250, color:'#f59e0b',
    topics:[
      {name:'Essay Writing — Two Essays (Section A & B)',hindi:'निबंध लेखन',
       micro:['Section A: Philosophical / Abstract topics',
              'Section B: Current issues / Social / Administrative topics',
              'Structure — Introduction, Body, Conclusion',
              'Coherence, Flow & Language quality',
              'Multidimensional analysis (~1000-1200 words each)',
              'Practice topics: Technology & Society, Democracy, Women empowerment, Environment, Ethics in governance']}
    ]
  },
  'GS Paper I (250 Marks)': {
    marks:250, color:'#10b981',
    topics:[
      {name:'Indian Heritage & Culture',hindi:'भारतीय विरासत एवं संस्कृति',
       micro:['Art forms — Classical dance (Bharatnatyam, Kathak, Odissi, Kuchipudi, Manipuri, Mohiniyattam, Kathakali, Sattriya)',
              'Classical music — Hindustani & Carnatic','Folk arts & Tribal arts',
              'Literature — Ancient (Sanskrit, Pali), Medieval, Modern',
              'Architecture — Temple styles (Nagara, Dravida, Vesara), Sultanate, Mughal, Colonial',
              'Sculpture & Painting (Ajanta, Ellora, Miniature, Madhubani)',
              'Philosophy & Religion — Vedanta, Buddhism, Jainism, Sufism, Bhakti',
              'UNESCO World Heritage Sites in India']},
      {name:'Modern Indian History (1757–1947)',hindi:'आधुनिक भारतीय इतिहास',
       micro:['British expansion — Battles, Treaties, Subsidiary Alliance, Doctrine of Lapse',
              'Economic impact — Drain of wealth, Deindustrialisation',
              'Social reforms — Raja Ram Mohan Roy, Brahmo Samaj, Arya Samaj',
              '1857 Revolt — Causes, Nature, Spread, Consequences',
              'Rise of nationalism — INC, Moderates vs Extremists, Partition of Bengal 1905',
              'Gandhi era — Champaran, Non-Cooperation, Civil Disobedience, Quit India',
              'Revolutionary movements — Bhagat Singh, Subhas Chandra Bose, INA',
              'Communalism & Partition 1947']},
      {name:'Post-independence Consolidation',hindi:'स्वतंत्रता पश्चात एकीकरण',
       micro:['Integration of princely states','Reorganisation of states on linguistic basis',
              'Nehruvian era — foreign policy, economic planning',
              'Green Revolution, White Revolution','Emergency 1975-77',
              'Economic liberalisation 1991']},
      {name:'World History (18th–20th Century)',hindi:'विश्व इतिहास',
       micro:['Industrial Revolution & its impact',
              'American Revolution, French Revolution',
              'World War I — Causes, Events, Consequences',
              'World War II — Causes, Events, Holocaust, Consequences',
              'Russian Revolution 1917','Decolonisation of Asia & Africa',
              'Cold War, Non-Aligned Movement',
              'Unification of Germany & Italy']},
      {name:'Indian Society',hindi:'भारतीय समाज',
       micro:['Diversity of India — Caste, Religion, Language, Region',
              "Role of women & women's organisations",
              'Population & associated issues','Poverty & developmental issues',
              'Urbanisation, migration','Communalism, Regionalism, Secularism',
              'Social empowerment']},
      {name:'Physical & Human Geography',hindi:'भौतिक एवं मानव भूगोल',
       micro:['Geomorphology — Earthquakes, Volcanoes, Tsunamis, Cyclones',
              'Climatology — Monsoon, El Nino, La Nina, Climate zones',
              'Oceanography — Ocean currents, Tides, Marine resources',
              'Biogeography — Biomes, Biodiversity',
              'Human Geography — Population distribution, Migration, Urbanisation',
              'Economic Geography — Agriculture, Industry, Trade']}
    ]
  }
};
