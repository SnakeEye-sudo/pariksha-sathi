// generatePYQsHTML() + generateExamInfoHTML() — lang-aware, all exams
function generatePYQsHTML() {
  const exam = userData.exam;
  const isBpsc = exam === 'bpsc' || exam === 'bpsc_tre';
  const isUpsc = exam === 'upsc' || exam === 'upsc_2026' || exam === 'upsc_2027';
  const isEn = lang === 'en';

  // Banking exams
  if (['ibps_po','sbi_po','ibps_rrb','ibps_clerk'].includes(exam)) {
    const examName = (getExamConfig(exam)||{}).title || exam.toUpperCase();
    return `<div class="section-block">
      <h3>📝 ${examName} — PYQ Analysis & Tips</h3>
      <div class="pyq-grid">
        <div class="pyq-card"><h5>🧠 ${isEn?'Reasoning (High Scoring)':'तर्कशक्ति (उच्च अंक)'}</h5><ul>
          <li>${isEn?'Puzzles & Seating Arrangement (10–15 Qs)':'पहेलियां एवं बैठक व्यवस्था (10–15 प्रश्न)'}</li>
          <li>${isEn?'Syllogism (3–5 Qs)':'न्यायवाक्य (3–5 प्रश्न)'}</li>
          <li>${isEn?'Inequality (3–5 Qs)':'असमानता (3–5 प्रश्न)'}</li>
          <li>${isEn?'Coding-Decoding (3–4 Qs)':'कूट भाषा (3–4 प्रश्न)'}</li>
          <li>${isEn?'Blood Relations, Direction':'रक्त संबंध, दिशा ज्ञान'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🔢 ${isEn?'Quantitative Aptitude':'संख्यात्मक अभिरुचि'}</h5><ul>
          <li>${isEn?'Data Interpretation (15–20 Qs)':'आंकड़ा व्याख्या (15–20 प्रश्न)'}</li>
          <li>${isEn?'Arithmetic — Percentage, SI/CI, Profit-Loss':'अंकगणित — प्रतिशत, ब्याज, लाभ-हानि'}</li>
          <li>${isEn?'Number Series (5 Qs)':'संख्या श्रृंखला (5 प्रश्न)'}</li>
          <li>${isEn?'Quadratic Equations (5 Qs)':'द्विघात समीकरण (5 प्रश्न)'}</li>
          <li>${isEn?'Simplification & Approximation':'सरलीकरण एवं सन्निकटन'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🏦 ${isEn?'Banking Awareness (Key Area)':'बैंकिंग जागरूकता (मुख्य क्षेत्र)'}</h5><ul>
          <li>${isEn?'RBI — Monetary policy, Rates (5–6 Qs)':'RBI — मौद्रिक नीति, दरें (5–6 प्रश्न)'}</li>
          <li>${isEn?'Banking terms — NPA, SARFAESI, CIBIL':'बैंकिंग शब्दावली — NPA, SARFAESI, CIBIL'}</li>
          <li>${isEn?'Government schemes — Jan Dhan, Mudra':'सरकारी योजनाएं — जन धन, मुद्रा'}</li>
          <li>${isEn?'Financial institutions — NABARD, SIDBI':'वित्तीय संस्थाएं — NABARD, SIDBI'}</li>
          <li>${isEn?'Current Affairs — last 6 months':'समसामयिकी — पिछले 6 महीने'}</li>
        </ul></div>
        <div class="pyq-card"><h5>📖 ${isEn?'English Language':'अंग्रेजी भाषा'}</h5><ul>
          <li>${isEn?'Reading Comprehension (5–7 Qs)':'पठन बोध (5–7 प्रश्न)'}</li>
          <li>${isEn?'Cloze Test (5–7 Qs)':'क्लोज़ टेस्ट (5–7 प्रश्न)'}</li>
          <li>${isEn?'Error Detection (3–5 Qs)':'त्रुटि पहचान (3–5 प्रश्न)'}</li>
          <li>${isEn?'Para Jumbles (5 Qs)':'पैरा जम्बल (5 प्रश्न)'}</li>
          <li>${isEn?'Sentence Improvement':'वाक्य सुधार'}</li>
        </ul></div>
      </div>
      <div class="ca-box"><h4>📰 ${isEn?'Daily Preparation Strategy':'दैनिक तैयारी रणनीति'}</h4><ul>
        <li>${isEn?'The Hindu / Economic Times — 30 min daily':'The Hindu / Economic Times — रोज़ 30 मिनट'}</li>
        <li>${isEn?'Banking Awareness: Oliveboard / Adda247 monthly':'Banking Awareness: Oliveboard / Adda247 मासिक'}</li>
        <li>${isEn?'Practice 50+ DI sets before exam':'परीक्षा से पहले 50+ DI sets practice करें'}</li>
        <li>${isEn?'Mock tests: 3–4 per week in last month':'Mock tests: अंतिम महीने में 3–4 प्रति सप्ताह'}</li>
      </ul></div>
    </div>`;
  }

  // SSC CGL
  if (exam === 'ssc_cgl') {
    return `<div class="section-block">
      <h3>📝 SSC CGL 2026 — PYQ Analysis & Tips</h3>
      <div class="pyq-grid">
        <div class="pyq-card"><h5>🧠 ${isEn?'Reasoning (25 Qs Tier 1)':'तर्कशक्ति (25 प्रश्न Tier 1)'}</h5><ul>
          <li>${isEn?'Analogy & Classification (5–6 Qs)':'सादृश्यता एवं वर्गीकरण (5–6 प्रश्न)'}</li>
          <li>${isEn?'Series — Number & Letter (4–5 Qs)':'श्रृंखला — संख्या एवं अक्षर (4–5 प्रश्न)'}</li>
          <li>${isEn?'Coding-Decoding (3–4 Qs)':'कूट भाषा (3–4 प्रश्न)'}</li>
          <li>${isEn?'Matrix & Figure problems (3–4 Qs)':'मैट्रिक्स एवं आकृति (3–4 प्रश्न)'}</li>
          <li>${isEn?'Venn Diagram, Syllogism':'वेन आरेख, न्यायवाक्य'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🔢 ${isEn?'Quantitative Aptitude (25 Qs)':'संख्यात्मक अभिरुचि (25 प्रश्न)'}</h5><ul>
          <li>${isEn?'Percentage, Profit-Loss (4–5 Qs)':'प्रतिशत, लाभ-हानि (4–5 प्रश्न)'}</li>
          <li>${isEn?'Geometry & Mensuration (5–6 Qs)':'ज्यामिति एवं क्षेत्रमिति (5–6 प्रश्न)'}</li>
          <li>${isEn?'Trigonometry (3–4 Qs)':'त्रिकोणमिति (3–4 प्रश्न)'}</li>
          <li>${isEn?'Algebra (3–4 Qs)':'बीजगणित (3–4 प्रश्न)'}</li>
          <li>${isEn?'DI — Table/Bar/Pie (5 Qs)':'DI — तालिका/बार/पाई (5 प्रश्न)'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🌍 ${isEn?'General Awareness (25 Qs)':'सामान्य जागरूकता (25 प्रश्न)'}</h5><ul>
          <li>${isEn?'History — Modern India (4–5 Qs)':'इतिहास — आधुनिक भारत (4–5 प्रश्न)'}</li>
          <li>${isEn?'Polity — Constitution, Parliament':'राजव्यवस्था — संविधान, संसद'}</li>
          <li>${isEn?'Science — Biology, Physics, Chemistry':'विज्ञान — जीव, भौतिकी, रसायन'}</li>
          <li>${isEn?'Current Affairs — last 6 months':'समसामयिकी — पिछले 6 महीने'}</li>
          <li>${isEn?'Static GK — Awards, Sports, Books':'स्थैतिक GK — पुरस्कार, खेल, पुस्तकें'}</li>
        </ul></div>
        <div class="pyq-card"><h5>📖 ${isEn?'English (25 Qs)':'अंग्रेजी (25 प्रश्न)'}</h5><ul>
          <li>${isEn?'Synonyms & Antonyms (4–5 Qs)':'समानार्थी एवं विलोम (4–5 प्रश्न)'}</li>
          <li>${isEn?'One Word Substitution (2–3 Qs)':'एक शब्द प्रतिस्थापन (2–3 प्रश्न)'}</li>
          <li>${isEn?'Idioms & Phrases (2–3 Qs)':'मुहावरे एवं वाक्यांश (2–3 प्रश्न)'}</li>
          <li>${isEn?'Error Detection (3–4 Qs)':'त्रुटि पहचान (3–4 प्रश्न)'}</li>
          <li>${isEn?'Reading Comprehension (5 Qs)':'पठन बोध (5 प्रश्न)'}</li>
        </ul></div>
      </div>
      <div class="ca-box"><h4>📰 ${isEn?'Daily Preparation Strategy':'दैनिक तैयारी रणनीति'}</h4><ul>
        <li>${isEn?'Lucent GK + NCERT 6–10 for GA':'Lucent GK + NCERT 6–10 GA के लिए'}</li>
        <li>${isEn?'R.S. Aggarwal for Maths & Reasoning':'R.S. Aggarwal गणित एवं तर्कशक्ति के लिए'}</li>
        <li>${isEn?'Wren & Martin for English Grammar':'Wren & Martin अंग्रेजी व्याकरण के लिए'}</li>
        <li>${isEn?'50+ mock tests before Tier 1':'Tier 1 से पहले 50+ mock tests'}</li>
      </ul></div>
    </div>`;
  }

  // NDA
  if (exam === 'nda_2026') {
    return `<div class="section-block">
      <h3>📝 NDA 2026 — PYQ Analysis & Tips</h3>
      <div class="pyq-grid">
        <div class="pyq-card"><h5>📐 ${isEn?'Mathematics (120 Qs, 300 Marks)':'गणित (120 प्रश्न, 300 अंक)'}</h5><ul>
          <li>${isEn?'Algebra & Matrices (20–25 Qs)':'बीजगणित एवं मैट्रिक्स (20–25 प्रश्न)'}</li>
          <li>${isEn?'Trigonometry (15–20 Qs)':'त्रिकोणमिति (15–20 प्रश्न)'}</li>
          <li>${isEn?'Calculus — Differential & Integral (20–25 Qs)':'कलन — अवकल एवं समाकल (20–25 प्रश्न)'}</li>
          <li>${isEn?'Analytical Geometry 2D & 3D (15–20 Qs)':'विश्लेषणात्मक ज्यामिति (15–20 प्रश्न)'}</li>
          <li>${isEn?'Statistics & Probability (10–12 Qs)':'सांख्यिकी एवं प्रायिकता (10–12 प्रश्न)'}</li>
        </ul></div>
        <div class="pyq-card"><h5>⚡ ${isEn?'Physics (GAT — 25%)':'भौतिकी (GAT — 25%)'}</h5><ul>
          <li>${isEn?'Mechanics — Newton Laws, Gravitation':'यांत्रिकी — न्यूटन के नियम, गुरुत्वाकर्षण'}</li>
          <li>${isEn?'Electricity & Magnetism':'विद्युत एवं चुंबकत्व'}</li>
          <li>${isEn?'Light — Reflection, Refraction, Lenses':'प्रकाश — परावर्तन, अपवर्तन, लेंस'}</li>
          <li>${isEn?'Modern Physics — Radioactivity, Semiconductors':'आधुनिक भौतिकी — रेडियोधर्मिता, अर्धचालक'}</li>
          <li>${isEn?'Sound & Thermodynamics':'ध्वनि एवं ऊष्मागतिकी'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🌍 ${isEn?'History & Geography (GAT)':'इतिहास एवं भूगोल (GAT)'}</h5><ul>
          <li>${isEn?'Freedom Movement — Gandhi, Bose, 1857':'स्वतंत्रता संग्राम — गांधी, बोस, 1857'}</li>
          <li>${isEn?'World Wars I & II':'विश्व युद्ध I एवं II'}</li>
          <li>${isEn?'Indian Geography — Rivers, Climate, Soils':'भारतीय भूगोल — नदियां, जलवायु, मिट्टी'}</li>
          <li>${isEn?'World Geography — Continents, Countries':'विश्व भूगोल — महाद्वीप, देश'}</li>
          <li>${isEn?'Defence Geography — Strategic locations':'रक्षा भूगोल — रणनीतिक स्थान'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🎖️ ${isEn?'Current Affairs & Defence':'समसामयिकी एवं रक्षा'}</h5><ul>
          <li>${isEn?'Indian defence — Army, Navy, Air Force':'भारतीय रक्षा — थल, नौ, वायु सेना'}</li>
          <li>${isEn?'DRDO — Agni, BrahMos, Tejas, INS Vikrant':'DRDO — अग्नि, ब्रह्मोस, तेजस, INS विक्रांत'}</li>
          <li>${isEn?'ISRO — Chandrayaan-3, Gaganyaan':'ISRO — चंद्रयान-3, गगनयान'}</li>
          <li>${isEn?'Gallantry awards — PVC, AC, VrC':'वीरता पुरस्कार — PVC, AC, VrC'}</li>
          <li>${isEn?'International — G20, SCO, QUAD':'अंतर्राष्ट्रीय — G20, SCO, QUAD'}</li>
        </ul></div>
      </div>
      <div class="ca-box"><h4>📰 ${isEn?'NDA Preparation Strategy':'NDA तैयारी रणनीति'}</h4><ul>
        <li>${isEn?'NCERT Maths 11-12 + R.D. Sharma for Maths paper':'NCERT गणित 11-12 + R.D. Sharma गणित पेपर के लिए'}</li>
        <li>${isEn?'NCERT Physics, Chemistry, Biology 11-12 for GAT':'NCERT भौतिकी, रसायन, जीव विज्ञान 11-12 GAT के लिए'}</li>
        <li>${isEn?'Pathfinder NDA/NA by Arihant — comprehensive guide':'Pathfinder NDA/NA by Arihant — व्यापक गाइड'}</li>
        <li>${isEn?'SSB preparation: GTO, Psychology, Interview':'SSB तैयारी: GTO, मनोविज्ञान, साक्षात्कार'}</li>
      </ul></div>
    </div>`;
  }

  // BPSC CCE (71st/72nd)
  if (exam === 'bpsc_71' || exam === 'bpsc_72') {
    const examName = (getExamConfig(exam)||{}).title || 'BPSC CCE';
    return `<div class="section-block">
      <h3>📝 ${examName} — PYQ Analysis & Tips</h3>
      <div class="pyq-grid">
        <div class="pyq-card"><h5>📜 ${isEn?'History (Most Asked)':'इतिहास (सबसे ज़्यादा पूछा जाता है)'}</h5><ul>
          <li>${isEn?'Bihar History — Magadha, Champaran, JP (8–10 Qs)':'बिहार इतिहास — मगध, चंपारण, जेपी (8–10 प्रश्न)'}</li>
          <li>${isEn?'Modern India — Freedom Movement (6–8 Qs)':'आधुनिक भारत — स्वतंत्रता संग्राम (6–8 प्रश्न)'}</li>
          <li>${isEn?'Ancient India — Maurya, Gupta (4–5 Qs)':'प्राचीन भारत — मौर्य, गुप्त (4–5 प्रश्न)'}</li>
          <li>${isEn?'Medieval India — Mughal, Bhakti (4–5 Qs)':'मध्यकालीन भारत — मुगल, भक्ति (4–5 प्रश्न)'}</li>
          <li>${isEn?'World History — World Wars, Cold War':'विश्व इतिहास — विश्व युद्ध, शीत युद्ध'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🗺️ ${isEn?'Geography & Bihar GK':'भूगोल एवं बिहार GK'}</h5><ul>
          <li>${isEn?'Bihar Geography — Rivers, Districts, Agriculture':'बिहार भूगोल — नदियां, जिले, कृषि'}</li>
          <li>${isEn?'Indian Geography — Physiography, Climate':'भारतीय भूगोल — भौतिक स्वरूप, जलवायु'}</li>
          <li>${isEn?'Physical Geography — Plate tectonics, Monsoon':'भौतिक भूगोल — प्लेट विवर्तनिकी, मानसून'}</li>
          <li>${isEn?'Economic Geography — Agriculture, Industries':'आर्थिक भूगोल — कृषि, उद्योग'}</li>
          <li>${isEn?'Environment — Biodiversity, Climate change':'पर्यावरण — जैव विविधता, जलवायु परिवर्तन'}</li>
        </ul></div>
        <div class="pyq-card"><h5>⚖️ ${isEn?'Polity & Governance':'राजव्यवस्था एवं शासन'}</h5><ul>
          <li>${isEn?'Constitution — FR, DPSP, Amendments (6–8 Qs)':'संविधान — मौलिक अधिकार, DPSP, संशोधन (6–8 प्रश्न)'}</li>
          <li>${isEn?'Bihar Government — CM, Vidhan Sabha':'बिहार सरकार — CM, विधान सभा'}</li>
          <li>${isEn?'Panchayati Raj — 73rd, 74th Amendment':'पंचायती राज — 73वां, 74वां संशोधन'}</li>
          <li>${isEn?'Central Government — President, PM, Parliament':'केंद्र सरकार — राष्ट्रपति, PM, संसद'}</li>
          <li>${isEn?'Current Affairs — Bihar schemes':'समसामयिकी — बिहार योजनाएं'}</li>
        </ul></div>
        <div class="pyq-card"><h5>💰 ${isEn?'Economy & Science':'अर्थव्यवस्था एवं विज्ञान'}</h5><ul>
          <li>${isEn?'Bihar Economy — Agriculture, Industries':'बिहार अर्थव्यवस्था — कृषि, उद्योग'}</li>
          <li>${isEn?'Indian Economy — GDP, RBI, Budget':'भारतीय अर्थव्यवस्था — GDP, RBI, बजट'}</li>
          <li>${isEn?'Science — ISRO, DRDO, Health':'विज्ञान — ISRO, DRDO, स्वास्थ्य'}</li>
          <li>${isEn?'Current Affairs — National & Bihar':'समसामयिकी — राष्ट्रीय एवं बिहार'}</li>
          <li>${isEn?'Awards, Sports, Important Days':'पुरस्कार, खेल, महत्वपूर्ण दिवस'}</li>
        </ul></div>
      </div>
      <div class="ca-box"><h4>📰 ${isEn?'Daily Preparation Strategy':'दैनिक तैयारी रणनीति'}</h4><ul>
        <li>${isEn?'Prabhat Khabar / Dainik Jagran — Bihar focus':'प्रभात खबर / दैनिक जागरण — बिहार फोकस'}</li>
        <li>${isEn?'NCERT 6–12 for History, Geography, Polity':'NCERT 6–12 इतिहास, भूगोल, राजव्यवस्था के लिए'}</li>
        <li>${isEn?'Spectrum Modern History + Bipin Chandra':'Spectrum Modern History + बिपिन चंद्र'}</li>
        <li>${isEn?'Bihar Special GK — Arihant / Lucent Bihar':'Bihar Special GK — Arihant / Lucent Bihar'}</li>
      </ul></div>
    </div>`;
  }

  // BPSC TRE
  if (isBpsc) {
    return `<div class="section-block">
      <h3>📝 BPSC TRE — PYQ Analysis & Tips</h3>
      <div class="pyq-grid">
        <div class="pyq-card"><h5>🔢 ${isEn?'Mathematics (Most Asked)':'गणित (सबसे ज़्यादा पूछे जाते हैं)'}</h5><ul>
          <li>${isEn?'Percentage & Profit-Loss (8–10 Qs)':'प्रतिशत एवं लाभ-हानि (8–10 प्रश्न)'}</li>
          <li>${isEn?'Time & Work, Speed-Distance (6–8 Qs)':'समय-कार्य, चाल-दूरी (6–8 प्रश्न)'}</li>
          <li>${isEn?'Number System & Simplification':'संख्या पद्धति एवं सरलीकरण'}</li>
          <li>${isEn?'Mensuration — Area, Volume':'क्षेत्रमिति — क्षेत्रफल, आयतन'}</li>
          <li>${isEn?'Average, Ratio & Proportion':'औसत, अनुपात एवं समानुपात'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🧠 ${isEn?'Reasoning (High Scoring)':'तर्कशक्ति (उच्च अंक)'}</h5><ul>
          <li>${isEn?'Series — Number & Letter (5–6 Qs)':'श्रृंखला — संख्या एवं अक्षर (5–6 प्रश्न)'}</li>
          <li>${isEn?'Blood Relations (3–4 Qs)':'रक्त संबंध (3–4 प्रश्न)'}</li>
          <li>${isEn?'Coding-Decoding (3–4 Qs)':'कूट भाषा (3–4 प्रश्न)'}</li>
          <li>${isEn?'Direction Sense (2–3 Qs)':'दिशा ज्ञान (2–3 प्रश्न)'}</li>
          <li>${isEn?'Syllogism & Venn Diagram':'न्यायवाक्य एवं वेन आरेख'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🌍 ${isEn?'GS — History & Polity':'सामान्य अध्ययन — इतिहास एवं राजव्यवस्था'}</h5><ul>
          <li>${isEn?'Freedom Movement — Gandhi, INC':'स्वतंत्रता संग्राम — गांधी, INC'}</li>
          <li>${isEn?'Bihar History — Champaran, JP':'बिहार इतिहास — चंपारण, जेपी'}</li>
          <li>${isEn?'Constitution — FR, DPSP, Amendments':'संविधान — मौलिक अधिकार, DPSP, संशोधन'}</li>
          <li>${isEn?'Panchayati Raj (73rd, 74th)':'पंचायती राज (73वां, 74वां संशोधन)'}</li>
          <li>${isEn?'President, PM, Parliament':'राष्ट्रपति, प्रधानमंत्री, संसद'}</li>
        </ul></div>
        <div class="pyq-card"><h5>🔬 ${isEn?'Science (Easy Marks)':'विज्ञान (आसान अंक)'}</h5><ul>
          <li>${isEn?'Biology — Diseases, Vitamins, Cells':'जीव विज्ञान — रोग, विटामिन, कोशिका'}</li>
          <li>${isEn?'Physics — Force, Motion, Light':'भौतिकी — बल, गति, प्रकाश'}</li>
          <li>${isEn?'Chemistry — Acids, Metals, Reactions':'रसायन — अम्ल, धातु, अभिक्रियाएं'}</li>
          <li>${isEn?'Environment — Pollution, Ecosystem':'पर्यावरण — प्रदूषण, पारिस्थितिकी'}</li>
          <li>${isEn?'Current Science News':'विज्ञान की समसामयिक घटनाएं'}</li>
        </ul></div>
      </div>
      <div class="ca-box"><h4>📰 ${isEn?'Daily Current Affairs Strategy':'दैनिक समसामयिकी रणनीति'}</h4><ul>
        <li>${isEn?'The Hindu / Dainik Jagran — 30 min daily':'The Hindu / दैनिक जागरण — रोज़ 30 मिनट'}</li>
        <li>${isEn?'Monthly Magazine: Pratiyogita Darpan / Arihant':'मासिक पत्रिका: प्रतियोगिता दर्पण / अरिहंत'}</li>
        <li>${isEn?'Bihar Current Affairs — Prabhat Khabar':'बिहार समसामयिकी — प्रभात खबर'}</li>
        <li>${isEn?'Government Schemes — PIB.gov.in':'सरकारी योजनाएं — PIB.gov.in'}</li>
      </ul></div>
    </div>`;
  }

  // UPSC (default)
  return `<div class="section-block">
    <h3>📝 UPSC CSE — PYQ Analysis & Tips</h3>
    <div class="pyq-grid">
      <div class="pyq-card"><h5>🏛️ ${isEn?'Polity & Governance (Prelims)':'राजव्यवस्था एवं शासन (प्रारंभिक)'}</h5><ul>
        <li>${isEn?'Constitution — Articles, Amendments (8–10 Qs)':'संविधान — अनुच्छेद, संशोधन (8–10 प्रश्न)'}</li>
        <li>${isEn?'Parliament, President, PM (5–6 Qs)':'संसद, राष्ट्रपति, प्रधानमंत्री (5–6 प्रश्न)'}</li>
        <li>${isEn?'Constitutional Bodies (4–5 Qs)':'संवैधानिक निकाय (4–5 प्रश्न)'}</li>
        <li>${isEn?'Panchayati Raj, Local Bodies':'पंचायती राज, स्थानीय निकाय'}</li>
        <li>${isEn?'Recent SC Judgements':'सर्वोच्च न्यायालय के हालिया निर्णय'}</li>
      </ul></div>
      <div class="pyq-card"><h5>🌿 ${isEn?'Environment & Ecology':'पर्यावरण एवं पारिस्थितिकी'}</h5><ul>
        <li>${isEn?'Biodiversity — IUCN, Ramsar, CITES (5–7 Qs)':'जैव विविधता — IUCN, रामसर, CITES (5–7 प्रश्न)'}</li>
        <li>${isEn?'Climate Change — Paris, COP (4–5 Qs)':'जलवायु परिवर्तन — पेरिस, COP (4–5 प्रश्न)'}</li>
        <li>${isEn?'National Parks & Sanctuaries':'राष्ट्रीय उद्यान एवं अभयारण्य'}</li>
        <li>${isEn?'Environmental Laws':'पर्यावरण कानून'}</li>
        <li>${isEn?'Pollution & Disaster Management':'प्रदूषण एवं आपदा प्रबंधन'}</li>
      </ul></div>
      <div class="pyq-card"><h5>📜 ${isEn?'History & Culture':'इतिहास एवं संस्कृति'}</h5><ul>
        <li>${isEn?'Ancient India — Indus, Maurya, Gupta (5–6 Qs)':'प्राचीन भारत — सिंधु, मौर्य, गुप्त (5–6 प्रश्न)'}</li>
        <li>${isEn?'Medieval — Mughal, Bhakti-Sufi (4–5 Qs)':'मध्यकालीन — मुगल, भक्ति-सूफी (4–5 प्रश्न)'}</li>
        <li>${isEn?'Modern — Freedom Movement (6–8 Qs)':'आधुनिक — स्वतंत्रता संग्राम (6–8 प्रश्न)'}</li>
        <li>${isEn?'Art & Architecture (3–4 Qs)':'कला एवं स्थापत्य (3–4 प्रश्न)'}</li>
        <li>${isEn?'UNESCO Heritage Sites':'UNESCO विश्व धरोहर स्थल'}</li>
      </ul></div>
      <div class="pyq-card"><h5>💰 ${isEn?'Economy (Trending)':'अर्थव्यवस्था (ट्रेंडिंग)'}</h5><ul>
        <li>${isEn?'Budget — Fiscal Deficit, Taxes (4–5 Qs)':'बजट — राजकोषीय घाटा, कर (4–5 प्रश्न)'}</li>
        <li>${isEn?'RBI, Monetary Policy, Inflation':'RBI, मौद्रिक नीति, मुद्रास्फीति'}</li>
        <li>${isEn?'Agriculture — MSP, e-NAM, FCI':'कृषि — MSP, e-NAM, FCI'}</li>
        <li>${isEn?'International — WTO, IMF, World Bank':'अंतर्राष्ट्रीय — WTO, IMF, विश्व बैंक'}</li>
        <li>${isEn?'Government Schemes — PLI, PM-KISAN':'सरकारी योजनाएं — PLI, PM-KISAN'}</li>
      </ul></div>
    </div>
    <div class="pyq-links">
      <a class="pyq-link" href="https://upsc.gov.in/examinations/previous-question-papers" target="_blank">📄 UPSC Official PYQs</a>
      <a class="pyq-link" href="https://www.insightsonindia.com/upsc-previous-year-question-papers/" target="_blank">📚 Insights PYQ Analysis</a>
    </div>
    <div class="ca-box"><h4>📰 ${isEn?'Daily Current Affairs Strategy':'दैनिक समसामयिकी रणनीति'}</h4><ul>
      <li>${isEn?'The Hindu + Indian Express — 1 hr daily':'The Hindu + Indian Express — रोज़ 1 घंटा'}</li>
      <li>${isEn?'PIB.gov.in — Government press releases':'PIB.gov.in — सरकारी प्रेस विज्ञप्तियां'}</li>
      <li>${isEn?'Monthly: Vision IAS / Insights Current Affairs':'मासिक: Vision IAS / Insights समसामयिकी'}</li>
      <li>${isEn?'Yojana & Kurukshetra — Monthly magazines':'योजना एवं कुरुक्षेत्र — मासिक पत्रिकाएं'}</li>
    </ul></div>
  </div>`;
}

function generateExamInfoHTML() {
  const exam = userData.exam;
  const isBpsc = exam === 'bpsc' || exam === 'bpsc_tre';
  const isEn = lang === 'en';

  // Generic info for registry-based exams (banking, SSC, NDA, BPSC CCE)
  if (!isBpsc && exam !== 'upsc' && exam !== 'upsc_2026' && exam !== 'upsc_2027') {
    const cfg = getExamConfig(exam) || {};
    const examDate = cfg.examDate ? new Date(cfg.examDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : 'TBA';
    const booksMap = {
      ssc_cgl: ['NCERT 6–10 (all subjects)','Lucent GK','R.S. Aggarwal — Maths & Reasoning','Wren & Martin — English','Kiran SSC CGL Guide'],
      ibps_po: ['NCERT 6–10','Oliveboard Banking Awareness','R.S. Aggarwal — Verbal & Non-Verbal','Arihant IBPS PO Guide','Manorama Yearbook'],
      sbi_po: ['NCERT 6–10','SBI PO Previous Papers','R.S. Aggarwal','Arihant SBI PO Guide','The Hindu for English'],
      ibps_rrb: ['NCERT 6–10','Oliveboard RRB Guide','R.S. Aggarwal','Arihant IBPS RRB Guide','Rural Banking Awareness'],
      ibps_clerk: ['NCERT 6–10','Oliveboard Clerk Guide','R.S. Aggarwal','Arihant IBPS Clerk Guide','Banking Awareness by Arihant'],
      nda_2026: ['NCERT Maths 11–12','R.D. Sharma Maths','NCERT Physics/Chemistry/Biology 11–12','Pathfinder NDA/NA by Arihant','Spectrum Modern History'],
      bpsc_71: ['NCERT 6–12','Spectrum Modern History','Laxmikanth Polity','Lucent Bihar GK','Arihant BPSC Guide'],
      bpsc_72: ['NCERT 6–12','Spectrum Modern History','Laxmikanth Polity','Lucent Bihar GK','Arihant BPSC Guide'],
    };
    const books = booksMap[exam] || ['NCERT 6–12','Standard reference books','Previous year papers'];
    return `<div class="section-block">
      <h3>ℹ️ ${cfg.title||exam.toUpperCase()} — ${isEn?'Exam Information':'परीक्षा जानकारी'}</h3>
      <div class="info-grid">
        <div class="info-card">
          <h4>📅 ${isEn?'Important Dates':'महत्वपूर्ण तिथियां'}</h4>
          <p><strong>${isEn?'Exam Date:':'परीक्षा तिथि:'}</strong> ${examDate}</p>
          <p><strong>${isEn?'Category:':'श्रेणी:'}</strong> ${cfg.category||''}</p>
          <p><strong>${isEn?'Vacancies:':'रिक्तियां:'}</strong> ${cfg.vacancies||'TBA'}</p>
          <p><strong>${isEn?'Plan Ends:':'Plan समाप्त:'}</strong> ${isEn?'15 days before exam':'परीक्षा से 15 दिन पहले'}</p>
        </div>
        <div class="info-card">
          <h4>📝 ${isEn?'Exam Pattern':'परीक्षा पैटर्न'}</h4>
          <p>${cfg.pattern||'MCQ Based'}</p>
          <p>${isEn?'Check official notification for latest pattern':'नवीनतम पैटर्न के लिए आधिकारिक अधिसूचना देखें'}</p>
        </div>
        <div class="info-card">
          <h4>✅ ${isEn?'Key Tips':'मुख्य सुझाव'}</h4>
          <p>📋 ${isEn?'Attempt previous year papers':'पिछले वर्षों के प्रश्नपत्र हल करें'}</p>
          <p>🎯 ${isEn?'Focus on high-weightage topics':'उच्च भार वाले topics पर ध्यान दें'}</p>
          <p>⏱️ ${isEn?'Practice time management':'समय प्रबंधन का अभ्यास करें'}</p>
          <p>📰 ${isEn?'Daily current affairs — 30 min':'दैनिक समसामयिकी — 30 मिनट'}</p>
        </div>
        <div class="info-card">
          <h4>📚 ${isEn?'Best Books':'सर्वश्रेष्ठ पुस्तकें'}</h4>
          ${books.map(b=>`<p>• ${b}</p>`).join('')}
        </div>
      </div>
    </div>`;
  }

  // BPSC TRE
  if (isBpsc) {
    const cls = userData.bpscClass;
    return `<div class="section-block">
      <h3>ℹ️ BPSC TRE 4.0 — ${isEn?'Exam Information':'परीक्षा जानकारी'}</h3>
      <div class="info-grid">
        <div class="info-card">
          <h4>📅 ${isEn?'Important Dates':'महत्वपूर्ण तिथियां'}</h4>
          <p><strong>${isEn?'Exam Date:':'परीक्षा तिथि:'}</strong> Sep 2026 (${isEn?'Tentative':'संभावित'})</p>
          <p><strong>${isEn?'Notification:':'अधिसूचना:'}</strong> BPSC Official</p>
          <p><strong>${isEn?'Plan Ends:':'Plan समाप्त:'}</strong> ${isEn?'15 days before exam':'परीक्षा से 15 दिन पहले'}</p>
        </div>
        <div class="info-card">
          <h4>📝 ${isEn?'Exam Pattern':'परीक्षा पैटर्न'}</h4>
          ${cls==='1-5'||cls==='both'?`<p><strong>Class 1–5 (PRT):</strong></p><p>${isEn?'Part I Language: 30 marks':'भाग I भाषा: 30 अंक'}</p><p>${isEn?'Part II GS: 120 marks':'भाग II सामान्य अध्ययन: 120 अंक'}</p><p><strong>${isEn?'Total: 150 marks':'कुल: 150 अंक'}</strong></p>`:''}
          ${cls==='6-8'||cls==='both'?`<p><strong>Class 6–8 (TGT):</strong></p><p>${isEn?'Part I Language: 30 marks':'भाग I भाषा: 30 अंक'}</p><p>${isEn?'Part II GS: 40 marks':'भाग II सामान्य अध्ययन: 40 अंक'}</p><p>${isEn?'Part III Subject: 80 marks':'भाग III विषय: 80 अंक'}</p><p><strong>${isEn?'Total: 150 marks':'कुल: 150 अंक'}</strong></p>`:''}
        </div>
        <div class="info-card">
          <h4>✅ ${isEn?'Key Rules':'मुख्य नियम'}</h4>
          <p>❌ ${isEn?'No Negative Marking':'नकारात्मक अंकन नहीं'}</p>
          <p>⏱️ ${isEn?'Duration: 2.5 hours':'अवधि: 2.5 घंटे'}</p>
          <p>📋 ${isEn?'MCQ format':'बहुविकल्पीय प्रश्न'}</p>
          <p>🏫 ${isEn?'46,595 Total Vacancies':'46,595 कुल रिक्तियां'}</p>
        </div>
        <div class="info-card">
          <h4>📚 ${isEn?'Best Books':'सर्वश्रेष्ठ पुस्तकें'}</h4>
          <p>• NCERT Class 6–10 (${isEn?'all subjects':'सभी विषय'})</p>
          <p>• Lucent's GK (Hindi/English)</p>
          <p>• Arihant BPSC TRE Guide</p>
          <p>• R.S. Aggarwal — ${isEn?'Maths & Reasoning':'गणित एवं तर्कशक्ति'}</p>
        </div>
      </div>
    </div>`;
  }

  // UPSC
  const yr = userData.upscYear || '2027';
  const mainYr = parseInt(yr);
  const intYr = mainYr + 1;
  const optNames = {
    history: isEn?'History':'History (इतिहास)',
    geography: isEn?'Geography':'Geography (भूगोल)',
    pub_admin: isEn?'Public Administration':'Public Administration (लोक प्रशासन)',
    sociology: isEn?'Sociology':'Sociology (समाजशास्त्र)',
    pol_sci: isEn?'Political Science & IR':'Political Science & IR (राजनीति विज्ञान)',
    anthropology: isEn?'Anthropology':'Anthropology (मानवशास्त्र)',
    philosophy: isEn?'Philosophy':'Philosophy (दर्शनशास्त्र)',
    psychology: isEn?'Psychology':'Psychology (मनोविज्ञान)',
    economics: isEn?'Economics':'Economics (अर्थशास्त्र)',
    law: isEn?'Law':'Law (विधि)'
  };
  const optNote = userData.optionalSubject && optNames[userData.optionalSubject]
    ? `<div class="optional-note selected"><h4>✅ ${isEn?'Optional Subject Selected':'Optional Subject चुना गया'}</h4><p>${isEn?`You have selected <strong>${optNames[userData.optionalSubject]}</strong> as your Optional Subject. Both Paper I &amp; Paper II are included in your plan. Optional carries <strong>500 marks</strong> and is a key rank determinant.`:`आपने <strong>${optNames[userData.optionalSubject]}</strong> Optional Subject चुना है। इसका syllabus आपके plan में शामिल है — Paper I + Paper II दोनों। Optional में <strong>500 marks</strong> होते हैं जो rank निर्धारित करते हैं।`}</p></div>`
    : `<div class="optional-note"><h4>⚠️ ${isEn?'No Optional Subject Selected':'Optional Subject नहीं चुना'}</h4><p>${isEn?'You have not selected an Optional Subject yet. Popular choices: <strong>History, Geography, Public Administration, Sociology, Political Science &amp; IR, Anthropology, Philosophy, Psychology</strong>. Choose based on your graduation background and interest.':'आपने अभी तक Optional Subject नहीं चुना है। Popular choices: <strong>History, Geography, Public Administration, Sociology, Political Science &amp; IR, Anthropology, Philosophy, Psychology</strong>. अपने graduation background और interest के हिसाब से चुनें।'}</p></div>`;
  return `<div class="section-block">
    <h3>ℹ️ UPSC CSE ${yr} — ${isEn?'Exam Information':'परीक्षा जानकारी'}</h3>
    <div class="info-grid">
      <div class="info-card">
        <h4>📅 ${isEn?'Important Dates':'महत्वपूर्ण तिथियां'}</h4>
        <p><strong>${isEn?'Prelims:':'प्रारंभिक:'}</strong> May ${yr}</p>
        <p><strong>${isEn?'Mains:':'मुख्य:'}</strong> Sep–Oct ${mainYr}</p>
        <p><strong>${isEn?'Interview:':'साक्षात्कार:'}</strong> Jan–Apr ${intYr}</p>
        <p><strong>${isEn?'Plan Ends:':'Plan समाप्त:'}</strong> ${isEn?'15 days before Prelims':'Prelims से 15 दिन पहले'}</p>
      </div>
      <div class="info-card">
        <h4>📝 ${isEn?'Prelims Pattern':'प्रारंभिक पैटर्न'}</h4>
        <p>GS Paper I: 200 ${isEn?'marks (100 Qs)':'अंक (100 प्रश्न)'}</p>
        <p>CSAT Paper II: 200 ${isEn?'marks (qualifying 33%)':'अंक (33% अर्हक)'}</p>
        <p>${isEn?'Negative marking: -0.66 per wrong':'नकारात्मक अंकन: -0.66 प्रति गलत'}</p>
        <p>${isEn?'Duration: 2 hrs each paper':'अवधि: प्रत्येक पेपर 2 घंटे'}</p>
      </div>
      <div class="info-card">
        <h4>📝 ${isEn?'Mains Pattern':'मुख्य परीक्षा पैटर्न'}</h4>
        <p>${isEn?'Qualifying: Paper A + B (300+300)':'अर्हक: पेपर A + B (300+300)'}</p>
        <p>${isEn?'Essay: 250 marks':'निबंध: 250 अंक'}</p>
        <p>GS I–IV: 250×4 = 1000 ${isEn?'marks':'अंक'}</p>
        <p>${isEn?'Optional I+II: 250×2 = 500 marks':'Optional I+II: 250×2 = 500 अंक'}</p>
        <p>${isEn?'Interview: 275 marks':'साक्षात्कार: 275 अंक'}</p>
        <p><strong>${isEn?'Total Merit: 2025 marks':'कुल मेरिट: 2025 अंक'}</strong></p>
      </div>
      <div class="info-card">
        <h4>📚 ${isEn?'Standard Books':'मानक पुस्तकें'}</h4>
        <p>• NCERT 6–12 (${isEn?'all subjects':'सभी विषय'})</p>
        <p>• Laxmikanth — Indian Polity</p>
        <p>• Bipin Chandra — Modern History</p>
        <p>• Ramesh Singh — Indian Economy</p>
        <p>• Shankar IAS — Environment</p>
      </div>
    </div>
    ${optNote}
  </div>`;
}
