// ═══════════════════════════════════════════════════════════════
// c16.js — SSC CGL 2026 Syllabus
// ═══════════════════════════════════════════════════════════════
const syl_ssc_cgl = {
  'Tier 1 — General Intelligence & Reasoning (50 Marks)': {
    marks: 50, color: '#3b82f6',
    topics: [
      { name: 'Verbal Reasoning', hindi: 'मौखिक तर्क',
        micro: ['Analogy — Word, Number, Letter based',
                'Classification (Odd one out) — Word, Number, Letter',
                'Series — Number, Letter, Mixed',
                'Coding-Decoding — Letter shift, Symbol, Number based',
                'Blood Relations — Family tree method',
                'Direction & Distance — Compass, Turns',
                'Ranking & Order — Position from top/bottom',
                'Alphabet Test — Dictionary order, Position'] },
      { name: 'Non-Verbal Reasoning', hindi: 'अशाब्दिक तर्क',
        micro: ['Mirror Image & Water Image',
                'Paper Folding & Cutting',
                'Embedded Figures',
                'Figure Completion & Matrix',
                'Counting of Figures — Triangles, Squares',
                'Venn Diagrams — 2 & 3 circles',
                'Dice & Cube problems'] },
      { name: 'Logical Reasoning', hindi: 'तार्किक तर्क',
        micro: ['Statement & Conclusion',
                'Statement & Assumption',
                'Statement & Argument',
                'Syllogism — All, Some, No type',
                'Cause & Effect',
                'Course of Action',
                'Sitting Arrangement — Linear & Circular',
                'Puzzles — Box, Floor, Day-based'] }
    ]
  },
  'Tier 1 — Quantitative Aptitude (50 Marks)': {
    marks: 50, color: '#f59e0b',
    topics: [
      { name: 'Number System & Arithmetic', hindi: 'संख्या पद्धति एवं अंकगणित',
        micro: ['Number System — Natural, Whole, Integer, Rational, Irrational',
                'LCM & HCF — Shortcut methods',
                'Divisibility rules (2,3,4,5,6,7,8,9,11)',
                'Simplification — BODMAS, Fractions, Decimals',
                'Percentage — Formula, Increase/Decrease, Applications',
                'Profit & Loss — CP, SP, MP, Discount, Dishonest dealer',
                'Simple & Compound Interest — All formulas',
                'Ratio & Proportion — Partnership, Mixture & Alligation'] },
      { name: 'Algebra & Geometry', hindi: 'बीजगणित एवं रेखागणित',
        micro: ['Algebraic identities — (a+b)², (a-b)², (a+b)³, (a-b)³',
                'Linear equations — 1 & 2 variables',
                'Quadratic equations — Factorisation, Formula',
                'Lines & Angles — Parallel lines, Transversal',
                'Triangles — Congruence, Similarity, Pythagoras',
                'Circles — Chord, Tangent, Secant, Angle properties',
                'Coordinate Geometry — Distance, Midpoint, Slope'] },
      { name: 'Mensuration & Trigonometry', hindi: 'क्षेत्रमिति एवं त्रिकोणमिति',
        micro: ['2D Mensuration — Rectangle, Square, Triangle, Circle, Parallelogram, Trapezium',
                '3D Mensuration — Cube, Cuboid, Cylinder, Cone, Sphere, Hemisphere',
                'Trigonometry — sin, cos, tan, cot, sec, cosec',
                'Trigonometric identities — sin²θ + cos²θ = 1',
                'Heights & Distances — Angle of elevation/depression',
                'Data Interpretation — Tables, Bar, Pie, Line graphs'] },
      { name: 'Time, Work & Speed', hindi: 'समय, कार्य एवं चाल',
        micro: ['Time & Work — Basic formula, Efficiency method',
                'Pipes & Cisterns — Filling, Emptying, Combined',
                'Speed, Distance & Time — Basic formula',
                'Relative Speed — Same & Opposite direction',
                'Train problems — Length + Speed',
                'Boat & Stream — Upstream, Downstream',
                'Average — Simple, Weighted, Consecutive numbers'] }
    ]
  },
  'Tier 1 — English Language (50 Marks)': {
    marks: 50, color: '#10b981',
    topics: [
      { name: 'Vocabulary & Grammar', hindi: 'शब्दावली एवं व्याकरण',
        micro: ['Synonyms & Antonyms (5–6 Qs)',
                'One Word Substitution (2–3 Qs)',
                'Idioms & Phrases (2–3 Qs)',
                'Spelling Correction (2–3 Qs)',
                'Fill in the Blanks — Articles, Prepositions, Conjunctions',
                'Tenses — All 12 types with usage',
                'Voice — Active & Passive conversion',
                'Narration — Direct & Indirect speech'] },
      { name: 'Comprehension & Error Detection', hindi: 'बोध एवं त्रुटि पहचान',
        micro: ['Reading Comprehension — 2 passages (5 Qs each)',
                'Error Detection — Grammatical errors in sentences',
                'Sentence Improvement — Choose correct option',
                'Para Jumbles — Rearrange sentences',
                'Cloze Test — Fill blanks in passage',
                'Sentence Completion'] }
    ]
  },
  'Tier 1 — General Awareness (50 Marks)': {
    marks: 50, color: '#8b5cf6',
    topics: [
      { name: 'History, Polity & Geography', hindi: 'इतिहास, राजव्यवस्था एवं भूगोल',
        micro: ['Ancient India — Indus Valley, Maurya, Gupta',
                'Medieval India — Delhi Sultanate, Mughal, Bhakti-Sufi',
                'Modern India — Freedom Movement, Gandhi, 1857',
                'Indian Constitution — FR, DPSP, Amendments, Articles',
                'Parliament, President, PM, Supreme Court',
                'Indian Geography — Physiography, Rivers, Climate, Soils',
                'World Geography — Continents, Countries, Capitals'] },
      { name: 'Economy, Science & Current Affairs', hindi: 'अर्थव्यवस्था, विज्ञान एवं समसामयिकी',
        micro: ['Indian Economy — GDP, RBI, Budget, Taxes, Schemes',
                'Banking — Types, Functions, SEBI, Insurance',
                'Physics — Motion, Light, Electricity, Sound',
                'Chemistry — Periodic Table, Acids-Bases, Metals',
                'Biology — Diseases, Vitamins, Cell, Genetics',
                'Space — ISRO missions, Satellites',
                'Current Affairs — National & International (last 6 months)',
                'Awards, Sports, Books & Authors, Important Days'] }
    ]
  },
  'Tier 2 — Mathematical Abilities (90 Marks)': {
    marks: 90, color: '#f59e0b',
    topics: [
      { name: 'Advanced Mathematics', hindi: 'उन्नत गणित',
        micro: ['Number Theory — Surds, Indices, Logarithms',
                'Algebra — Polynomials, Quadratic equations, Inequalities',
                'Geometry — Triangles, Circles, Quadrilaterals, Polygons',
                'Mensuration — Advanced 2D & 3D problems',
                'Trigonometry — Advanced identities, Heights & Distances',
                'Statistics — Mean, Median, Mode, SD, Variance',
                'Data Interpretation — Complex tables, Mixed graphs'] }
    ]
  },
  'Tier 2 — Reasoning & General Intelligence (30 Marks)': {
    marks: 30, color: '#3b82f6',
    topics: [
      { name: 'Advanced Reasoning', hindi: 'उन्नत तर्कशक्ति',
        micro: ['Analytical Reasoning — Complex puzzles',
                'Critical Thinking — Assumptions, Inferences',
                'Data Sufficiency',
                'Input-Output problems',
                'Advanced Sitting Arrangement',
                'Logical Deduction'] }
    ]
  },
  'Tier 2 — English Language & Comprehension (45 Marks)': {
    marks: 45, color: '#10b981',
    topics: [
      { name: 'Advanced English', hindi: 'उन्नत अंग्रेजी',
        micro: ['Advanced Vocabulary — Synonyms, Antonyms, Analogies',
                'Advanced Grammar — Complex sentence structures',
                'Reading Comprehension — Long passages',
                'Essay Writing (for JSO/AAO posts)',
                'Précis Writing',
                'Letter Writing'] }
    ]
  },
  'Tier 2 — General Awareness (25 Marks)': {
    marks: 25, color: '#8b5cf6',
    topics: [
      { name: 'Advanced GK & Current Affairs', hindi: 'उन्नत सामान्य ज्ञान',
        micro: ['Detailed Indian History & Culture',
                'Advanced Polity — Constitutional provisions',
                'Advanced Economy — Budget, Monetary policy',
                'Science & Technology — ISRO, DRDO, AI',
                'Current Affairs — Last 12 months',
                'International Relations, Summits, Agreements'] }
    ]
  },
  'Tier 2 — Computer Knowledge (20 Marks)': {
    marks: 20, color: '#06b6d4',
    topics: [
      { name: 'Computer Fundamentals', hindi: 'कंप्यूटर मूल बातें',
        micro: ['Computer basics — Hardware, Software, Input/Output devices',
                'Operating Systems — Windows, Linux basics',
                'MS Office — Word, Excel, PowerPoint',
                'Internet — Browsers, Email, Search engines',
                'Networking — LAN, WAN, IP address, Protocols',
                'Cybersecurity — Virus, Malware, Firewall',
                'Database basics — SQL, DBMS concepts'] }
    ]
  }
};
