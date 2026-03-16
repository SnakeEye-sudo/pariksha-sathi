// ═══════════════════════════════════════════════════════════════
// c22.js — State PSC Syllabuses: UPPSC, MPPSC, RPSC RAS, MPSC
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

const syl_uppsc = {
  'General Studies I — History, Art & Culture': {
    marks: 200, color: '#8b5cf6',
    topics: [
      { name: 'Ancient India', hindi: 'प्राचीन भारत', micro: ['Indus Valley Civilization','Vedic Period','Maurya Empire','Gupta Period','South Indian Kingdoms'] },
      { name: 'Medieval India', hindi: 'मध्यकालीन भारत', micro: ['Delhi Sultanate','Mughal Empire','Bhakti & Sufi Movement','Vijayanagara','Maratha'] },
      { name: 'Modern India & Freedom Struggle', hindi: 'आधुनिक भारत और स्वतंत्रता संग्राम', micro: ['British Rule','1857 Revolt','Congress','Gandhi','Partition'] },
      { name: 'Art, Culture & Heritage', hindi: 'कला, संस्कृति और विरासत', micro: ['Architecture','Painting','Music','Dance','UNESCO Sites'] },
      { name: 'UP History & Culture', hindi: 'उत्तर प्रदेश का इतिहास और संस्कृति', micro: ['UP in Freedom Struggle','Fairs & Festivals','Folk Arts','Religious Sites'] },
      { name: 'World History', hindi: 'विश्व इतिहास', micro: ['French Revolution','Industrial Revolution','World Wars','Cold War','Decolonization'] }
    ]
  },
  'General Studies II — Geography': {
    marks: 200, color: '#8b5cf6',
    topics: [
      { name: 'Physical Geography', hindi: 'भौतिक भूगोल', micro: ['Geomorphology','Climatology','Oceanography','Biogeography'] },
      { name: 'Indian Geography', hindi: 'भारतीय भूगोल', micro: ['Physiography','Climate','Rivers','Natural Resources','Agriculture'] },
      { name: 'UP Geography', hindi: 'उत्तर प्रदेश का भूगोल', micro: ['Physical Features','Rivers','Climate','Agriculture','Industries','Population'] },
      { name: 'Economic Geography', hindi: 'आर्थिक भूगोल', micro: ['Agriculture','Industries','Trade','Transport','Energy Resources'] },
      { name: 'Human Geography', hindi: 'मानव भूगोल', micro: ['Population','Migration','Urbanization','Human Development'] }
    ]
  },
  'General Studies III — Indian Polity & Governance': {
    marks: 200, color: '#8b5cf6',
    topics: [
      { name: 'Indian Constitution', hindi: 'भारतीय संविधान', micro: ['Preamble','Fundamental Rights','DPSP','Fundamental Duties','Amendments'] },
      { name: 'Union Government', hindi: 'केंद्र सरकार', micro: ['Parliament','President','Prime Minister','Cabinet','Supreme Court'] },
      { name: 'State Government & UP Administration', hindi: 'राज्य सरकार और UP प्रशासन', micro: ['Governor','CM','State Legislature','High Court','UP Panchayati Raj'] },
      { name: 'Local Self Government', hindi: 'स्थानीय स्वशासन', micro: ['73rd Amendment','74th Amendment','Panchayati Raj','Urban Local Bodies'] },
      { name: 'Governance & Public Policy', hindi: 'शासन और लोक नीति', micro: ['E-Governance','RTI','CAG','UPSC','Welfare Schemes'] }
    ]
  },
  'General Studies IV — Economy': {
    marks: 200, color: '#8b5cf6',
    topics: [
      { name: 'Indian Economy', hindi: 'भारतीय अर्थव्यवस्था', micro: ['Planning','GDP','Inflation','Fiscal Policy','Monetary Policy'] },
      { name: 'Agriculture & Rural Development', hindi: 'कृषि और ग्रामीण विकास', micro: ['Green Revolution','Land Reforms','Irrigation','MNREGA','PM-KISAN'] },
      { name: 'Industry & Infrastructure', hindi: 'उद्योग और बुनियादी ढांचा', micro: ['Industrial Policy','MSMEs','SEZ','Transport','Energy'] },
      { name: 'UP Economy', hindi: 'उत्तर प्रदेश की अर्थव्यवस्था', micro: ['Agriculture in UP','Industries','One District One Product','Expressways','Investment'] },
      { name: 'Banking & Finance', hindi: 'बैंकिंग और वित्त', micro: ['RBI','Commercial Banks','NBFCs','Capital Markets','Insurance'] }
    ]
  },
  'General Studies V — Science & Technology': {
    marks: 200, color: '#8b5cf6',
    topics: [
      { name: 'General Science', hindi: 'सामान्य विज्ञान', micro: ['Physics Basics','Chemistry Basics','Biology Basics','Everyday Science'] },
      { name: 'Science & Technology', hindi: 'विज्ञान और प्रौद्योगिकी', micro: ['Space Technology','Defence Technology','Biotechnology','IT & AI','Nuclear Technology'] },
      { name: 'Environment & Ecology', hindi: 'पर्यावरण और पारिस्थितिकी', micro: ['Biodiversity','Climate Change','Pollution','Conservation','Environmental Laws'] },
      { name: 'Current Affairs & Miscellaneous', hindi: 'समसामयिक घटनाएं', micro: ['National Events','International Events','Awards','Sports','Books & Authors'] }
    ]
  },
  'CSAT (Qualifying)': {
    marks: 200, color: '#6b7280',
    topics: [
      { name: 'Comprehension & Communication', hindi: 'बोध और संचार', micro: ['Reading Comprehension','Interpersonal Skills','Communication'] },
      { name: 'Logical Reasoning & Analytical Ability', hindi: 'तार्किक तर्क और विश्लेषणात्मक क्षमता', micro: ['Logical Reasoning','Analytical Ability','Decision Making'] },
      { name: 'Basic Numeracy', hindi: 'मूल संख्यात्मकता', micro: ['Numbers','Percentages','Ratio','Data Interpretation'] }
    ]
  }
};

const syl_mppsc = {
  'General Studies I — History, Culture & Geography': {
    marks: 300, color: '#f97316',
    topics: [
      { name: 'MP History & Culture', hindi: 'मध्य प्रदेश का इतिहास और संस्कृति', micro: ['Ancient MP','Medieval MP','Freedom Struggle in MP','Tribal History','Art & Architecture'] },
      { name: 'Indian History', hindi: 'भारतीय इतिहास', micro: ['Ancient India','Medieval India','Modern India','Freedom Movement'] },
      { name: 'MP Geography', hindi: 'मध्य प्रदेश का भूगोल', micro: ['Physical Features','Rivers','Climate','Natural Resources','Wildlife Sanctuaries'] },
      { name: 'Indian Geography', hindi: 'भारतीय भूगोल', micro: ['Physiography','Climate','Agriculture','Industries','Transport'] },
      { name: 'World Geography', hindi: 'विश्व भूगोल', micro: ['Continents','Oceans','Climate Zones','Natural Resources'] }
    ]
  },
  'General Studies II — Polity, Economy & Science': {
    marks: 300, color: '#f97316',
    topics: [
      { name: 'Indian Polity & Constitution', hindi: 'भारतीय राजव्यवस्था और संविधान', micro: ['Constitution','Parliament','Judiciary','Federalism','Local Government'] },
      { name: 'MP Polity & Administration', hindi: 'मध्य प्रदेश की राजव्यवस्था', micro: ['MP Legislature','Governor','CM','High Court','Panchayati Raj in MP'] },
      { name: 'Indian Economy', hindi: 'भारतीय अर्थव्यवस्था', micro: ['Planning','Agriculture','Industry','Banking','Fiscal Policy'] },
      { name: 'MP Economy', hindi: 'मध्य प्रदेश की अर्थव्यवस्था', micro: ['Agriculture in MP','Industries','Mineral Resources','Tourism','Schemes'] },
      { name: 'Science & Technology', hindi: 'विज्ञान और प्रौद्योगिकी', micro: ['General Science','Space','Defence','IT','Biotechnology','Environment'] }
    ]
  },
  'General Aptitude Test (Qualifying)': {
    marks: 200, color: '#6b7280',
    topics: [
      { name: 'Comprehension & Reasoning', hindi: 'बोध और तर्क', micro: ['Reading Comprehension','Logical Reasoning','Analytical Ability'] },
      { name: 'Basic Mathematics', hindi: 'मूल गणित', micro: ['Arithmetic','Algebra','Data Interpretation','Graphs'] },
      { name: 'General Mental Ability', hindi: 'सामान्य मानसिक योग्यता', micro: ['Decision Making','Problem Solving','Interpersonal Skills'] }
    ]
  }
};

const syl_rpsc_ras = {
  'General Studies I — History, Art & Culture': {
    marks: 200, color: '#ec4899',
    topics: [
      { name: 'Rajasthan History & Culture', hindi: 'राजस्थान का इतिहास और संस्कृति', micro: ['Ancient Rajasthan','Medieval Rajputana','Freedom Struggle in Rajasthan','Art & Architecture','Fairs & Festivals'] },
      { name: 'Indian History', hindi: 'भारतीय इतिहास', micro: ['Ancient India','Medieval India','Modern India','National Movement'] },
      { name: 'World History', hindi: 'विश्व इतिहास', micro: ['Renaissance','Industrial Revolution','World Wars','Cold War'] },
      { name: 'Art, Culture & Heritage', hindi: 'कला, संस्कृति और विरासत', micro: ['Rajasthani Painting','Music','Dance','Handicrafts','UNESCO Sites'] }
    ]
  },
  'General Studies II — Geography': {
    marks: 200, color: '#ec4899',
    topics: [
      { name: 'Rajasthan Geography', hindi: 'राजस्थान का भूगोल', micro: ['Physical Features','Thar Desert','Rivers','Climate','Natural Resources','Wildlife'] },
      { name: 'Indian Geography', hindi: 'भारतीय भूगोल', micro: ['Physiography','Climate','Agriculture','Industries','Transport'] },
      { name: 'World Geography', hindi: 'विश्व भूगोल', micro: ['Physical Geography','Economic Geography','Human Geography'] }
    ]
  },
  'General Studies III — Polity, Economy & Science': {
    marks: 200, color: '#ec4899',
    topics: [
      { name: 'Indian Polity & Constitution', hindi: 'भारतीय राजव्यवस्था', micro: ['Constitution','Parliament','Judiciary','Federalism','Elections'] },
      { name: 'Rajasthan Polity & Administration', hindi: 'राजस्थान की राजव्यवस्था', micro: ['Rajasthan Legislature','Governor','CM','High Court','Panchayati Raj in Rajasthan'] },
      { name: 'Indian & Rajasthan Economy', hindi: 'भारतीय और राजस्थान की अर्थव्यवस्था', micro: ['Planning','Agriculture','Industry','Banking','Rajasthan Budget','Schemes'] },
      { name: 'Science & Technology', hindi: 'विज्ञान और प्रौद्योगिकी', micro: ['General Science','Space','Defence','IT','Environment','Biotechnology'] },
      { name: 'Current Affairs', hindi: 'समसामयिक घटनाएं', micro: ['National','International','Rajasthan Specific','Awards','Sports'] }
    ]
  },
  'General Studies IV — Ethics & Reasoning': {
    marks: 200, color: '#ec4899',
    topics: [
      { name: 'Ethics & Human Interface', hindi: 'नैतिकता और मानवीय संपर्क', micro: ['Ethics Basics','Integrity','Attitude','Emotional Intelligence','Moral Thinkers'] },
      { name: 'Aptitude & Reasoning', hindi: 'अभिरुचि और तर्क', micro: ['Logical Reasoning','Analytical Ability','Decision Making','Problem Solving'] },
      { name: 'Basic Numeracy', hindi: 'मूल संख्यात्मकता', micro: ['Arithmetic','Data Interpretation','Graphs','Statistics'] }
    ]
  }
};

const syl_mpsc = {
  'General Studies I — History, Geography & Culture': {
    marks: 250, color: '#06b6d4',
    topics: [
      { name: 'Maharashtra History & Culture', hindi: 'महाराष्ट्र का इतिहास और संस्कृति', micro: ['Ancient Maharashtra','Maratha Empire','Freedom Struggle in Maharashtra','Social Reform Movements','Art & Culture'] },
      { name: 'Indian History', hindi: 'भारतीय इतिहास', micro: ['Ancient India','Medieval India','Modern India','National Movement'] },
      { name: 'Maharashtra Geography', hindi: 'महाराष्ट्र का भूगोल', micro: ['Physical Features','Rivers','Climate','Agriculture','Industries','Natural Resources'] },
      { name: 'Indian Geography', hindi: 'भारतीय भूगोल', micro: ['Physiography','Climate','Agriculture','Industries','Transport'] }
    ]
  },
  'General Studies II — Polity & Governance': {
    marks: 250, color: '#06b6d4',
    topics: [
      { name: 'Indian Constitution & Polity', hindi: 'भारतीय संविधान और राजव्यवस्था', micro: ['Constitution','Parliament','Judiciary','Federalism','Elections','Local Government'] },
      { name: 'Maharashtra Polity & Administration', hindi: 'महाराष्ट्र की राजव्यवस्था', micro: ['Maharashtra Legislature','Governor','CM','High Court','Panchayati Raj in Maharashtra','Mumbai Municipal Corporation'] },
      { name: 'Governance & Public Policy', hindi: 'शासन और लोक नीति', micro: ['E-Governance','RTI','CAG','Welfare Schemes','Maharashtra Schemes'] }
    ]
  },
  'General Studies III — Economy & Science': {
    marks: 250, color: '#06b6d4',
    topics: [
      { name: 'Indian Economy', hindi: 'भारतीय अर्थव्यवस्था', micro: ['Planning','GDP','Inflation','Fiscal Policy','Monetary Policy','Banking'] },
      { name: 'Maharashtra Economy', hindi: 'महाराष्ट्र की अर्थव्यवस्था', micro: ['Agriculture in Maharashtra','Industries','IT Sector','Tourism','Maharashtra Budget'] },
      { name: 'Science & Technology', hindi: 'विज्ञान और प्रौद्योगिकी', micro: ['General Science','Space','Defence','IT','Biotechnology','Environment'] },
      { name: 'Current Affairs', hindi: 'समसामयिक घटनाएं', micro: ['National','International','Maharashtra Specific','Awards','Sports'] }
    ]
  },
  'Marathi Language (Qualifying)': {
    marks: 100, color: '#6b7280',
    topics: [
      { name: 'Marathi Grammar & Comprehension', hindi: 'मराठी व्याकरण और बोध', micro: ['Grammar','Comprehension','Essay Writing','Letter Writing'] },
      { name: 'Marathi Literature', hindi: 'मराठी साहित्य', micro: ['Classical Literature','Modern Literature','Poets & Writers'] }
    ]
  },
  'English Language (Qualifying)': {
    marks: 100, color: '#6b7280',
    topics: [
      { name: 'English Grammar & Comprehension', hindi: 'अंग्रेजी व्याकरण और बोध', micro: ['Grammar','Comprehension','Essay Writing','Precis Writing'] }
    ]
  }
};
