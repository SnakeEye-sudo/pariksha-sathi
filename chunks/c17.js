// ═══════════════════════════════════════════════════════════════
// c17.js — Banking Exams Syllabuses: IBPS PO, SBI PO, IBPS RRB, IBPS Clerk
// ═══════════════════════════════════════════════════════════════

// ── IBPS PO 2026 ─────────────────────────────────────────────
const syl_ibps_po = {
  'Prelims — Reasoning Ability (35 Marks)': {
    marks: 35, color: '#3b82f6',
    topics: [
      { name: 'Puzzles & Seating Arrangement', hindi: 'पहेलियां एवं बैठक व्यवस्था',
        micro: ['Linear Arrangement — Single & Double row',
                'Circular Arrangement — Facing inside/outside',
                'Square/Rectangular Arrangement',
                'Floor-based Puzzles',
                'Box-based Puzzles',
                'Day/Month/Year-based Puzzles',
                'Blood Relation + Seating combined'] },
      { name: 'Logical Reasoning', hindi: 'तार्किक तर्क',
        micro: ['Syllogism — All, Some, No, Only some',
                'Inequality — Direct & Coded',
                'Blood Relations — Family tree',
                'Direction & Distance',
                'Coding-Decoding — New pattern',
                'Order & Ranking',
                'Alphanumeric Series'] }
    ]
  },
  'Prelims — Quantitative Aptitude (35 Marks)': {
    marks: 35, color: '#f59e0b',
    topics: [
      { name: 'Arithmetic', hindi: 'अंकगणित',
        micro: ['Percentage, Profit & Loss, Discount',
                'Simple & Compound Interest',
                'Ratio & Proportion, Partnership',
                'Time & Work, Pipes & Cisterns',
                'Speed, Distance & Time, Trains, Boats',
                'Average, Mixture & Alligation',
                'Number System, LCM & HCF'] },
      { name: 'Data Interpretation', hindi: 'आंकड़ा व्याख्या',
        micro: ['Tabular DI — 5 questions per set',
                'Bar Graph DI',
                'Pie Chart DI',
                'Line Graph DI',
                'Mixed/Caselet DI',
                'Missing DI',
                'Quadratic Equations'] }
    ]
  },
  'Prelims — English Language (30 Marks)': {
    marks: 30, color: '#10b981',
    topics: [
      { name: 'English for Banking', hindi: 'बैंकिंग के लिए अंग्रेजी',
        micro: ['Reading Comprehension — 1 passage (5–7 Qs)',
                'Cloze Test — 5–7 blanks',
                'Error Detection — Grammatical errors',
                'Sentence Improvement',
                'Para Jumbles — 5 sentences',
                'Fill in the Blanks — Double/Single',
                'Word Usage / Vocabulary'] }
    ]
  },
  'Mains — Reasoning & Computer Aptitude (60 Marks)': {
    marks: 60, color: '#3b82f6',
    topics: [
      { name: 'Advanced Reasoning', hindi: 'उन्नत तर्कशक्ति',
        micro: ['Complex Puzzles — Multi-variable',
                'Advanced Seating Arrangement',
                'Input-Output — New pattern',
                'Logical Reasoning — Critical thinking',
                'Data Sufficiency',
                'Course of Action, Cause & Effect'] },
      { name: 'Computer Aptitude', hindi: 'कंप्यूटर अभिरुचि',
        micro: ['Computer Fundamentals — Hardware, Software',
                'Operating Systems — Windows, Linux',
                'MS Office — Word, Excel, PowerPoint',
                'Internet & Networking — LAN, WAN, Protocols',
                'Cybersecurity — Virus, Firewall, Encryption',
                'Database — SQL basics, DBMS',
                'Number Systems — Binary, Octal, Hexadecimal'] }
    ]
  },
  'Mains — Data Analysis & Interpretation (60 Marks)': {
    marks: 60, color: '#f59e0b',
    topics: [
      { name: 'Advanced DI & Quant', hindi: 'उन्नत DI एवं गणित',
        micro: ['Complex Tabular DI',
                'Caselet DI — Paragraph based',
                'Mixed DI — 2 types combined',
                'Probability — Basic & Advanced',
                'Permutation & Combination',
                'Data Sufficiency — 2 statements',
                'Advanced Arithmetic — All topics'] }
    ]
  },
  'Mains — General Economy & Banking Awareness (40 Marks)': {
    marks: 40, color: '#8b5cf6',
    topics: [
      { name: 'Banking & Financial Awareness', hindi: 'बैंकिंग एवं वित्तीय जागरूकता',
        micro: ['RBI — Functions, Monetary policy, Repo rate, CRR, SLR, MSF',
                'Types of banks — Commercial, Cooperative, RRB, Payment banks',
                'Banking terms — NPA, SARFAESI, IBC, CIBIL, SWIFT',
                'Financial institutions — NABARD, SIDBI, NHB, EXIM Bank',
                'Capital markets — SEBI, Stock exchanges, Mutual funds, IPO',
                'Insurance — IRDAI, LIC, Types of insurance',
                'Government schemes — Jan Dhan, Mudra, Stand-Up India',
                'Budget — Fiscal deficit, Revenue deficit, FRBM',
                'GST — Structure, Rates, Input tax credit',
                'International — IMF, World Bank, ADB, AIIB, SWIFT'] },
      { name: 'Current Affairs & Static GK', hindi: 'समसामयिकी एवं स्थैतिक GK',
        micro: ['National current affairs — last 6 months',
                'International events — Summits, Agreements',
                'Banking appointments — RBI Governor, Bank CEOs',
                'Awards — Padma, Nobel, Banking awards',
                'Sports — Recent events, India\'s performance',
                'Important days — Banking & Finance related',
                'Countries, Capitals, Currencies',
                'Books & Authors — Recent publications'] }
    ]
  },
  'Mains — English Language (40 Marks)': {
    marks: 40, color: '#10b981',
    topics: [
      { name: 'Advanced English for Banking', hindi: 'बैंकिंग के लिए उन्नत अंग्रेजी',
        micro: ['Reading Comprehension — 2 long passages',
                'Essay Writing — 200–250 words',
                'Letter Writing — Formal & Informal',
                'Précis Writing',
                'Advanced Vocabulary — Synonyms, Antonyms',
                'Advanced Grammar — Complex structures',
                'Sentence Rearrangement — Para jumbles'] }
    ]
  }
};

// ── SBI PO 2026 ──────────────────────────────────────────────
const syl_sbi_po = {
  'Prelims — Reasoning Ability (35 Marks)': {
    marks: 35, color: '#3b82f6',
    topics: [
      { name: 'Puzzles & Arrangement', hindi: 'पहेलियां एवं व्यवस्था',
        micro: ['Linear Seating Arrangement — Single & Double row',
                'Circular Arrangement — Facing inside/outside',
                'Floor-based Puzzles — 7/8 floors',
                'Box-based Puzzles',
                'Month/Day-based Puzzles',
                'Blood Relation + Seating combined',
                'Scheduling Puzzles'] },
      { name: 'Logical & Verbal Reasoning', hindi: 'तार्किक एवं मौखिक तर्क',
        micro: ['Syllogism — All types including "Only some"',
                'Inequality — Direct & Coded',
                'Blood Relations',
                'Direction & Distance',
                'Coding-Decoding — New pattern (SBI specific)',
                'Alphanumeric Series',
                'Order & Ranking'] }
    ]
  },
  'Prelims — Quantitative Aptitude (35 Marks)': {
    marks: 35, color: '#f59e0b',
    topics: [
      { name: 'Arithmetic & Number Series', hindi: 'अंकगणित एवं संख्या श्रृंखला',
        micro: ['Number Series — Missing & Wrong term',
                'Percentage, Profit & Loss, Discount',
                'Simple & Compound Interest',
                'Ratio, Proportion & Partnership',
                'Time & Work, Pipes & Cisterns',
                'Speed, Distance & Time',
                'Average, Mixture & Alligation'] },
      { name: 'Data Interpretation', hindi: 'आंकड़ा व्याख्या',
        micro: ['Tabular DI',
                'Bar Graph DI',
                'Pie Chart DI',
                'Line Graph DI',
                'Caselet DI',
                'Quadratic Equations',
                'Approximation & Simplification'] }
    ]
  },
  'Prelims — English Language (30 Marks)': {
    marks: 30, color: '#10b981',
    topics: [
      { name: 'English for SBI PO', hindi: 'SBI PO के लिए अंग्रेजी',
        micro: ['Reading Comprehension — Story/Economy based',
                'Cloze Test',
                'Error Detection',
                'Sentence Improvement',
                'Para Jumbles',
                'Fill in the Blanks',
                'Word Swap / Sentence Connector'] }
    ]
  },
  'Mains — Data Analysis & Interpretation (60 Marks)': {
    marks: 60, color: '#f59e0b',
    topics: [
      { name: 'Advanced DI & Quant', hindi: 'उन्नत DI एवं गणित',
        micro: ['Complex Tabular DI — 5 Qs per set',
                'Caselet DI — Paragraph based',
                'Mixed DI',
                'Probability',
                'Permutation & Combination',
                'Data Sufficiency',
                'Advanced Arithmetic'] }
    ]
  },
  'Mains — Reasoning & Computer Aptitude (60 Marks)': {
    marks: 60, color: '#3b82f6',
    topics: [
      { name: 'Advanced Reasoning & Computer', hindi: 'उन्नत तर्कशक्ति एवं कंप्यूटर',
        micro: ['Complex Multi-variable Puzzles',
                'Advanced Seating Arrangement',
                'Input-Output',
                'Logical Reasoning',
                'Computer Fundamentals',
                'MS Office, Internet, Networking',
                'Cybersecurity, Database basics'] }
    ]
  },
  'Mains — General/Economy/Banking Awareness (40 Marks)': {
    marks: 40, color: '#8b5cf6',
    topics: [
      { name: 'Banking & Economy Awareness', hindi: 'बैंकिंग एवं अर्थव्यवस्था जागरूकता',
        micro: ['RBI — Monetary policy, Rates, Functions',
                'SBI — History, Products, Services, Subsidiaries',
                'Banking terms — NPA, SARFAESI, IBC, CIBIL',
                'Financial institutions — NABARD, SIDBI, EXIM',
                'Capital markets — SEBI, Mutual funds, IPO',
                'Government schemes — Jan Dhan, Mudra, PMAY',
                'Budget, GST, Fiscal policy',
                'Current Affairs — last 6 months',
                'International — IMF, World Bank, ADB'] }
    ]
  },
  'Mains — English Language (40 Marks)': {
    marks: 40, color: '#10b981',
    topics: [
      { name: 'Advanced English', hindi: 'उन्नत अंग्रेजी',
        micro: ['Reading Comprehension — 2 passages',
                'Essay Writing',
                'Letter Writing',
                'Précis Writing',
                'Advanced Vocabulary',
                'Advanced Grammar',
                'Para Jumbles'] }
    ]
  }
};

// ── IBPS RRB PO 2026 ─────────────────────────────────────────
const syl_ibps_rrb = {
  'Prelims — Reasoning (40 Marks)': {
    marks: 40, color: '#3b82f6',
    topics: [
      { name: 'Reasoning for RRB', hindi: 'RRB के लिए तर्कशक्ति',
        micro: ['Puzzles — Floor, Box, Linear, Circular',
                'Syllogism',
                'Inequality',
                'Blood Relations',
                'Direction & Distance',
                'Coding-Decoding',
                'Alphanumeric Series',
                'Order & Ranking'] }
    ]
  },
  'Prelims — Quantitative Aptitude (40 Marks)': {
    marks: 40, color: '#f59e0b',
    topics: [
      { name: 'Quant for RRB', hindi: 'RRB के लिए गणित',
        micro: ['Number Series',
                'Simplification & Approximation',
                'Percentage, Profit & Loss',
                'Simple & Compound Interest',
                'Time & Work, Speed & Distance',
                'Average, Ratio & Proportion',
                'Data Interpretation — Tables, Graphs'] }
    ]
  },
  'Mains — Reasoning (40 Marks)': {
    marks: 40, color: '#3b82f6',
    topics: [
      { name: 'Advanced Reasoning', hindi: 'उन्नत तर्कशक्ति',
        micro: ['Complex Puzzles',
                'Advanced Seating Arrangement',
                'Input-Output',
                'Logical Reasoning',
                'Data Sufficiency',
                'Critical Reasoning'] }
    ]
  },
  'Mains — Quantitative Aptitude (40 Marks)': {
    marks: 40, color: '#f59e0b',
    topics: [
      { name: 'Advanced Quant', hindi: 'उन्नत गणित',
        micro: ['Complex DI — Caselet, Mixed',
                'Probability',
                'Permutation & Combination',
                'Advanced Arithmetic',
                'Data Sufficiency',
                'Quadratic Equations'] }
    ]
  },
  'Mains — General Awareness (40 Marks)': {
    marks: 40, color: '#8b5cf6',
    topics: [
      { name: 'Banking & Rural Economy Awareness', hindi: 'बैंकिंग एवं ग्रामीण अर्थव्यवस्था',
        micro: ['RBI — Functions, Monetary policy',
                'RRBs — History, Structure, Functions, NABARD',
                'Rural banking — Kisan Credit Card, PMFBY, e-NAM',
                'Agriculture — Crops, MSP, Food security',
                'Government schemes — PM-KISAN, MGNREGA, PMAY',
                'Current Affairs — last 6 months',
                'Banking terms, Financial institutions'] }
    ]
  },
  'Mains — English / Hindi Language (40 Marks)': {
    marks: 40, color: '#10b981',
    topics: [
      { name: 'Language Skills', hindi: 'भाषा कौशल',
        micro: ['Reading Comprehension',
                'Cloze Test',
                'Error Detection',
                'Sentence Improvement',
                'Para Jumbles',
                'Fill in the Blanks',
                'Hindi Grammar (for Hindi medium)'] }
    ]
  }
};

// ── IBPS Clerk 2026 ──────────────────────────────────────────
const syl_ibps_clerk = {
  'Prelims — Reasoning Ability (35 Marks)': {
    marks: 35, color: '#3b82f6',
    topics: [
      { name: 'Reasoning for Clerk', hindi: 'Clerk के लिए तर्कशक्ति',
        micro: ['Puzzles — Simple Floor, Box, Linear',
                'Syllogism',
                'Inequality',
                'Blood Relations',
                'Direction & Distance',
                'Coding-Decoding',
                'Alphanumeric Series',
                'Order & Ranking',
                'Alphabet Test'] }
    ]
  },
  'Prelims — Quantitative Aptitude (35 Marks)': {
    marks: 35, color: '#f59e0b',
    topics: [
      { name: 'Quant for Clerk', hindi: 'Clerk के लिए गणित',
        micro: ['Number Series',
                'Simplification & Approximation',
                'Percentage, Profit & Loss',
                'Simple & Compound Interest',
                'Time & Work, Speed & Distance',
                'Average, Ratio & Proportion',
                'Data Interpretation — Basic'] }
    ]
  },
  'Prelims — English Language (30 Marks)': {
    marks: 30, color: '#10b981',
    topics: [
      { name: 'English for Clerk', hindi: 'Clerk के लिए अंग्रेजी',
        micro: ['Reading Comprehension',
                'Cloze Test',
                'Error Detection',
                'Sentence Improvement',
                'Para Jumbles',
                'Fill in the Blanks'] }
    ]
  },
  'Mains — Reasoning Ability & Computer Aptitude (50 Marks)': {
    marks: 50, color: '#3b82f6',
    topics: [
      { name: 'Reasoning & Computer', hindi: 'तर्कशक्ति एवं कंप्यूटर',
        micro: ['Complex Puzzles',
                'Advanced Seating Arrangement',
                'Input-Output',
                'Logical Reasoning',
                'Computer Fundamentals',
                'MS Office, Internet, Networking'] }
    ]
  },
  'Mains — Quantitative Aptitude (50 Marks)': {
    marks: 50, color: '#f59e0b',
    topics: [
      { name: 'Advanced Quant', hindi: 'उन्नत गणित',
        micro: ['Complex DI',
                'Probability',
                'Advanced Arithmetic',
                'Data Sufficiency',
                'Quadratic Equations'] }
    ]
  },
  'Mains — General/Financial Awareness (50 Marks)': {
    marks: 50, color: '#8b5cf6',
    topics: [
      { name: 'Banking & Financial Awareness', hindi: 'बैंकिंग एवं वित्तीय जागरूकता',
        micro: ['RBI — Functions, Monetary policy, Rates',
                'Banking terms — NPA, SARFAESI, CIBIL',
                'Financial institutions — NABARD, SIDBI',
                'Government schemes — Jan Dhan, Mudra',
                'Current Affairs — last 6 months',
                'Static GK — Countries, Capitals, Currencies'] }
    ]
  },
  'Mains — English Language (40 Marks)': {
    marks: 40, color: '#10b981',
    topics: [
      { name: 'English for Clerk Mains', hindi: 'Clerk Mains के लिए अंग्रेजी',
        micro: ['Reading Comprehension',
                'Cloze Test',
                'Error Detection',
                'Sentence Improvement',
                'Para Jumbles',
                'Fill in the Blanks',
                'Vocabulary'] }
    ]
  }
};
