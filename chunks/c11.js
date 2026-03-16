// generatePYQsHTML() + generateExamInfoHTML() — lang-aware
function generatePYQsHTML() {
  const isBpsc = userData.exam === 'bpsc';
  const isEn = lang === 'en';
  if (isBpsc) {
    return `<div class="section-block">
      <h3>📝 BPSC TRE — PYQ Analysis & Tips</h3>
      <div class="pyq-grid">
        <div class="pyq-card">
          <h5>🔢 ${isEn ? 'Mathematics (Most Asked)' : 'गणित (सबसे ज़्यादा पूछे जाते हैं)'}</h5>
          <ul>
            <li>${isEn ? 'Percentage & Profit-Loss (8–10 Qs)' : 'प्रतिशत एवं लाभ-हानि (8–10 प्रश्न)'}</li>
            <li>${isEn ? 'Time & Work, Speed-Distance (6–8 Qs)' : 'समय-कार्य, चाल-दूरी (6–8 प्रश्न)'}</li>
            <li>${isEn ? 'Number System & Simplification' : 'संख्या पद्धति एवं सरलीकरण'}</li>
            <li>${isEn ? 'Mensuration — Area, Volume' : 'क्षेत्रमिति — क्षेत्रफल, आयतन'}</li>
            <li>${isEn ? 'Average, Ratio & Proportion' : 'औसत, अनुपात एवं समानुपात'}</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>🧠 ${isEn ? 'Reasoning (High Scoring)' : 'तर्कशक्ति (उच्च अंक)'}</h5>
          <ul>
            <li>${isEn ? 'Series — Number & Letter (5–6 Qs)' : 'श्रृंखला — संख्या एवं अक्षर (5–6 प्रश्न)'}</li>
            <li>${isEn ? 'Blood Relations (3–4 Qs)' : 'रक्त संबंध (3–4 प्रश्न)'}</li>
            <li>${isEn ? 'Coding-Decoding (3–4 Qs)' : 'कूट भाषा (3–4 प्रश्न)'}</li>
            <li>${isEn ? 'Direction Sense (2–3 Qs)' : 'दिशा ज्ञान (2–3 प्रश्न)'}</li>
            <li>${isEn ? 'Syllogism & Venn Diagram' : 'न्यायवाक्य एवं वेन आरेख'}</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>🌍 ${isEn ? 'GS — History & Polity' : 'सामान्य अध्ययन — इतिहास एवं राजव्यवस्था'}</h5>
          <ul>
            <li>${isEn ? 'Freedom Movement — Gandhi, INC' : 'स्वतंत्रता संग्राम — गांधी, INC'}</li>
            <li>${isEn ? 'Bihar History — Champaran, JP' : 'बिहार इतिहास — चंपारण, जेपी'}</li>
            <li>${isEn ? 'Constitution — FR, DPSP, Amendments' : 'संविधान — मौलिक अधिकार, DPSP, संशोधन'}</li>
            <li>${isEn ? 'Panchayati Raj (73rd, 74th)' : 'पंचायती राज (73वां, 74वां संशोधन)'}</li>
            <li>${isEn ? 'President, PM, Parliament' : 'राष्ट्रपति, प्रधानमंत्री, संसद'}</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>🔬 ${isEn ? 'Science (Easy Marks)' : 'विज्ञान (आसान अंक)'}</h5>
          <ul>
            <li>${isEn ? 'Biology — Diseases, Vitamins, Cells' : 'जीव विज्ञान — रोग, विटामिन, कोशिका'}</li>
            <li>${isEn ? 'Physics — Force, Motion, Light' : 'भौतिकी — बल, गति, प्रकाश'}</li>
            <li>${isEn ? 'Chemistry — Acids, Metals, Reactions' : 'रसायन — अम्ल, धातु, अभिक्रियाएं'}</li>
            <li>${isEn ? 'Environment — Pollution, Ecosystem' : 'पर्यावरण — प्रदूषण, पारिस्थितिकी'}</li>
            <li>${isEn ? 'Current Science News' : 'विज्ञान की समसामयिक घटनाएं'}</li>
          </ul>
        </div>
      </div>
      <div class="ca-box">
        <h4>📰 ${isEn ? 'Daily Current Affairs Strategy' : 'दैनिक समसामयिकी रणनीति'}</h4>
        <ul>
          <li>${isEn ? 'The Hindu / Dainik Jagran — 30 min daily' : 'The Hindu / दैनिक जागरण — रोज़ 30 मिनट'}</li>
          <li>${isEn ? 'Monthly Magazine: Pratiyogita Darpan / Arihant' : 'मासिक पत्रिका: प्रतियोगिता दर्पण / अरिहंत'}</li>
          <li>${isEn ? 'Bihar Current Affairs — Prabhat Khabar' : 'बिहार समसामयिकी — प्रभात खबर'}</li>
          <li>${isEn ? 'Government Schemes — PIB.gov.in' : 'सरकारी योजनाएं — PIB.gov.in'}</li>
        </ul>
      </div>
    </div>`;
  }
  return `<div class="section-block">
    <h3>📝 UPSC CSE — PYQ Analysis & Tips</h3>
    <div class="pyq-grid">
      <div class="pyq-card">
        <h5>🏛️ ${isEn ? 'Polity & Governance (Prelims)' : 'राजव्यवस्था एवं शासन (प्रारंभिक)'}</h5>
        <ul>
          <li>${isEn ? 'Constitution — Articles, Amendments (8–10 Qs)' : 'संविधान — अनुच्छेद, संशोधन (8–10 प्रश्न)'}</li>
          <li>${isEn ? 'Parliament, President, PM (5–6 Qs)' : 'संसद, राष्ट्रपति, प्रधानमंत्री (5–6 प्रश्न)'}</li>
          <li>${isEn ? 'Constitutional Bodies (4–5 Qs)' : 'संवैधानिक निकाय (4–5 प्रश्न)'}</li>
          <li>${isEn ? 'Panchayati Raj, Local Bodies' : 'पंचायती राज, स्थानीय निकाय'}</li>
          <li>${isEn ? 'Recent SC Judgements' : 'सर्वोच्च न्यायालय के हालिया निर्णय'}</li>
        </ul>
      </div>
      <div class="pyq-card">
        <h5>🌿 ${isEn ? 'Environment & Ecology' : 'पर्यावरण एवं पारिस्थितिकी'}</h5>
        <ul>
          <li>${isEn ? 'Biodiversity — IUCN, Ramsar, CITES (5–7 Qs)' : 'जैव विविधता — IUCN, रामसर, CITES (5–7 प्रश्न)'}</li>
          <li>${isEn ? 'Climate Change — Paris, COP (4–5 Qs)' : 'जलवायु परिवर्तन — पेरिस, COP (4–5 प्रश्न)'}</li>
          <li>${isEn ? 'National Parks & Sanctuaries' : 'राष्ट्रीय उद्यान एवं अभयारण्य'}</li>
          <li>${isEn ? 'Environmental Laws' : 'पर्यावरण कानून'}</li>
          <li>${isEn ? 'Pollution & Disaster Management' : 'प्रदूषण एवं आपदा प्रबंधन'}</li>
        </ul>
      </div>
      <div class="pyq-card">
        <h5>📜 ${isEn ? 'History & Culture' : 'इतिहास एवं संस्कृति'}</h5>
        <ul>
          <li>${isEn ? 'Ancient India — Indus, Maurya, Gupta (5–6 Qs)' : 'प्राचीन भारत — सिंधु, मौर्य, गुप्त (5–6 प्रश्न)'}</li>
          <li>${isEn ? 'Medieval — Mughal, Bhakti-Sufi (4–5 Qs)' : 'मध्यकालीन — मुगल, भक्ति-सूफी (4–5 प्रश्न)'}</li>
          <li>${isEn ? 'Modern — Freedom Movement (6–8 Qs)' : 'आधुनिक — स्वतंत्रता संग्राम (6–8 प्रश्न)'}</li>
          <li>${isEn ? 'Art & Architecture (3–4 Qs)' : 'कला एवं स्थापत्य (3–4 प्रश्न)'}</li>
          <li>${isEn ? 'UNESCO Heritage Sites' : 'UNESCO विश्व धरोहर स्थल'}</li>
        </ul>
      </div>
      <div class="pyq-card">
        <h5>💰 ${isEn ? 'Economy (Trending)' : 'अर्थव्यवस्था (ट्रेंडिंग)'}</h5>
        <ul>
          <li>${isEn ? 'Budget — Fiscal Deficit, Taxes (4–5 Qs)' : 'बजट — राजकोषीय घाटा, कर (4–5 प्रश्न)'}</li>
          <li>${isEn ? 'RBI, Monetary Policy, Inflation' : 'RBI, मौद्रिक नीति, मुद्रास्फीति'}</li>
          <li>${isEn ? 'Agriculture — MSP, e-NAM, FCI' : 'कृषि — MSP, e-NAM, FCI'}</li>
          <li>${isEn ? 'International — WTO, IMF, World Bank' : 'अंतर्राष्ट्रीय — WTO, IMF, विश्व बैंक'}</li>
          <li>${isEn ? 'Government Schemes — PLI, PM-KISAN' : 'सरकारी योजनाएं — PLI, PM-KISAN'}</li>
        </ul>
      </div>
    </div>
    <div class="pyq-links">
      <a class="pyq-link" href="https://upsc.gov.in/examinations/previous-question-papers" target="_blank">📄 UPSC Official PYQs</a>
      <a class="pyq-link" href="https://www.insightsonindia.com/upsc-previous-year-question-papers/" target="_blank">📚 Insights PYQ Analysis</a>
    </div>
    <div class="ca-box">
      <h4>📰 ${isEn ? 'Daily Current Affairs Strategy' : 'दैनिक समसामयिकी रणनीति'}</h4>
      <ul>
        <li>${isEn ? 'The Hindu + Indian Express — 1 hr daily' : 'The Hindu + Indian Express — रोज़ 1 घंटा'}</li>
        <li>${isEn ? 'PIB.gov.in — Government press releases' : 'PIB.gov.in — सरकारी प्रेस विज्ञप्तियां'}</li>
        <li>${isEn ? 'Monthly: Vision IAS / Insights Current Affairs' : 'मासिक: Vision IAS / Insights समसामयिकी'}</li>
        <li>${isEn ? 'Yojana & Kurukshetra — Monthly magazines' : 'योजना एवं कुरुक्षेत्र — मासिक पत्रिकाएं'}</li>
      </ul>
    </div>
  </div>`;
}

function generateExamInfoHTML() {
  const isBpsc = userData.exam === 'bpsc';
  const isEn = lang === 'en';
  if (isBpsc) {
    const cls = userData.bpscClass;
    return `<div class="section-block">
      <h3>ℹ️ BPSC TRE 4.0 — ${isEn ? 'Exam Information' : 'परीक्षा जानकारी'}</h3>
      <div class="info-grid">
        <div class="info-card">
          <h4>📅 ${isEn ? 'Important Dates' : 'महत्वपूर्ण तिथियां'}</h4>
          <p><strong>${isEn ? 'Exam Date:' : 'परीक्षा तिथि:'}</strong> Sep 2026 (${isEn ? 'Tentative' : 'संभावित'})</p>
          <p><strong>${isEn ? 'Notification:' : 'अधिसूचना:'}</strong> BPSC Official</p>
          <p><strong>${isEn ? 'Plan Ends:' : 'Plan समाप्त:'}</strong> ${isEn ? '15 days before exam' : 'परीक्षा से 15 दिन पहले'}</p>
        </div>
        <div class="info-card">
          <h4>📝 ${isEn ? 'Exam Pattern' : 'परीक्षा पैटर्न'}</h4>
          ${cls === '1-5' || cls === 'both' ? `<p><strong>Class 1–5 (PRT):</strong></p>
          <p>${isEn ? 'Part I Language: 30 marks' : 'भाग I भाषा: 30 अंक'}</p>
          <p>${isEn ? 'Part II GS: 120 marks' : 'भाग II सामान्य अध्ययन: 120 अंक'}</p>
          <p><strong>${isEn ? 'Total: 150 marks' : 'कुल: 150 अंक'}</strong></p>` : ''}
          ${cls === '6-8' || cls === 'both' ? `<p><strong>Class 6–8 (TGT):</strong></p>
          <p>${isEn ? 'Part I Language: 30 marks' : 'भाग I भाषा: 30 अंक'}</p>
          <p>${isEn ? 'Part II GS: 40 marks' : 'भाग II सामान्य अध्ययन: 40 अंक'}</p>
          <p>${isEn ? 'Part III Subject: 80 marks' : 'भाग III विषय: 80 अंक'}</p>
          <p><strong>${isEn ? 'Total: 150 marks' : 'कुल: 150 अंक'}</strong></p>` : ''}
        </div>
        <div class="info-card">
          <h4>✅ ${isEn ? 'Key Rules' : 'मुख्य नियम'}</h4>
          <p>❌ ${isEn ? 'No Negative Marking' : 'नकारात्मक अंकन नहीं'}</p>
          <p>⏱️ ${isEn ? 'Duration: 2.5 hours' : 'अवधि: 2.5 घंटे'}</p>
          <p>📋 ${isEn ? 'MCQ format' : 'बहुविकल्पीय प्रश्न'}</p>
          <p>🏫 ${isEn ? '46,595 Total Vacancies' : '46,595 कुल रिक्तियां'}</p>
        </div>
        <div class="info-card">
          <h4>📚 ${isEn ? 'Best Books' : 'सर्वश्रेष्ठ पुस्तकें'}</h4>
          <p>• NCERT Class 6–10 (${isEn ? 'all subjects' : 'सभी विषय'})</p>
          <p>• Lucent's GK (Hindi/English)</p>
          <p>• Arihant BPSC TRE Guide</p>
          <p>• R.S. Aggarwal — ${isEn ? 'Maths & Reasoning' : 'गणित एवं तर्कशक्ति'}</p>
        </div>
      </div>
    </div>`;
  }
  const yr = userData.upscYear || '2027';
  const mainYr = parseInt(yr);
  const intYr = mainYr + 1;
  const optNames = {
    history: isEn ? 'History' : 'History (इतिहास)',
    geography: isEn ? 'Geography' : 'Geography (भूगोल)',
    pub_admin: isEn ? 'Public Administration' : 'Public Administration (लोक प्रशासन)',
    sociology: isEn ? 'Sociology' : 'Sociology (समाजशास्त्र)',
    pol_sci: isEn ? 'Political Science & IR' : 'Political Science & IR (राजनीति विज्ञान)',
    anthropology: isEn ? 'Anthropology' : 'Anthropology (मानवशास्त्र)',
    philosophy: isEn ? 'Philosophy' : 'Philosophy (दर्शनशास्त्र)',
    psychology: isEn ? 'Psychology' : 'Psychology (मनोविज्ञान)',
    economics: isEn ? 'Economics' : 'Economics (अर्थशास्त्र)',
    law: isEn ? 'Law' : 'Law (विधि)'
  };
  const optNote = userData.optionalSubject && optNames[userData.optionalSubject]
    ? `<div class="optional-note selected">
        <h4>✅ ${isEn ? 'Optional Subject Selected' : 'Optional Subject चुना गया'}</h4>
        <p>${isEn
          ? `You have selected <strong>${optNames[userData.optionalSubject]}</strong> as your Optional Subject. Both Paper I &amp; Paper II are included in your plan. Optional carries <strong>500 marks</strong> and is a key rank determinant.`
          : `आपने <strong>${optNames[userData.optionalSubject]}</strong> Optional Subject चुना है। इसका syllabus आपके plan में शामिल है — Paper I + Paper II दोनों। Optional में <strong>500 marks</strong> होते हैं जो rank निर्धारित करते हैं।`
        }</p>
      </div>`
    : `<div class="optional-note">
        <h4>⚠️ ${isEn ? 'No Optional Subject Selected' : 'Optional Subject नहीं चुना'}</h4>
        <p>${isEn
          ? 'You have not selected an Optional Subject yet. Popular choices: <strong>History, Geography, Public Administration, Sociology, Political Science &amp; IR, Anthropology, Philosophy, Psychology</strong>. Choose based on your graduation background and interest. Come back and regenerate your plan after selecting.'
          : 'आपने अभी तक Optional Subject नहीं चुना है। Popular choices: <strong>History, Geography, Public Administration, Sociology, Political Science &amp; IR, Anthropology, Philosophy, Psychology</strong>. अपने graduation background और interest के हिसाब से चुनें। Optional चुनने के बाद वापस आकर plan generate करें।'
        }</p>
      </div>`;
  return `<div class="section-block">
    <h3>ℹ️ UPSC CSE ${yr} — ${isEn ? 'Exam Information' : 'परीक्षा जानकारी'}</h3>
    <div class="info-grid">
      <div class="info-card">
        <h4>📅 ${isEn ? 'Important Dates' : 'महत्वपूर्ण तिथियां'}</h4>
        <p><strong>${isEn ? 'Prelims:' : 'प्रारंभिक:'}</strong> May ${yr}</p>
        <p><strong>${isEn ? 'Mains:' : 'मुख्य:'}</strong> Sep–Oct ${mainYr}</p>
        <p><strong>${isEn ? 'Interview:' : 'साक्षात्कार:'}</strong> Jan–Apr ${intYr}</p>
        <p><strong>${isEn ? 'Plan Ends:' : 'Plan समाप्त:'}</strong> ${isEn ? '15 days before Prelims' : 'Prelims से 15 दिन पहले'}</p>
      </div>
      <div class="info-card">
        <h4>📝 ${isEn ? 'Prelims Pattern' : 'प्रारंभिक पैटर्न'}</h4>
        <p>GS Paper I: 200 ${isEn ? 'marks (100 Qs)' : 'अंक (100 प्रश्न)'}</p>
        <p>CSAT Paper II: 200 ${isEn ? 'marks (qualifying 33%)' : 'अंक (33% अर्हक)'}</p>
        <p>${isEn ? 'Negative marking: -0.66 per wrong' : 'नकारात्मक अंकन: -0.66 प्रति गलत'}</p>
        <p>${isEn ? 'Duration: 2 hrs each paper' : 'अवधि: प्रत्येक पेपर 2 घंटे'}</p>
      </div>
      <div class="info-card">
        <h4>📝 ${isEn ? 'Mains Pattern' : 'मुख्य परीक्षा पैटर्न'}</h4>
        <p>${isEn ? 'Qualifying: Paper A + B (300+300)' : 'अर्हक: पेपर A + B (300+300)'}</p>
        <p>${isEn ? 'Essay: 250 marks' : 'निबंध: 250 अंक'}</p>
        <p>GS I–IV: 250×4 = 1000 ${isEn ? 'marks' : 'अंक'}</p>
        <p>${isEn ? 'Optional I+II: 250×2 = 500 marks' : 'Optional I+II: 250×2 = 500 अंक'}</p>
        <p>${isEn ? 'Interview: 275 marks' : 'साक्षात्कार: 275 अंक'}</p>
        <p><strong>${isEn ? 'Total Merit: 2025 marks' : 'कुल मेरिट: 2025 अंक'}</strong></p>
      </div>
      <div class="info-card">
        <h4>📚 ${isEn ? 'Standard Books' : 'मानक पुस्तकें'}</h4>
        <p>• NCERT 6–12 (${isEn ? 'all subjects' : 'सभी विषय'})</p>
        <p>• Laxmikanth — Indian Polity</p>
        <p>• Bipin Chandra — Modern History</p>
        <p>• Ramesh Singh — Indian Economy</p>
        <p>• Shankar IAS — Environment</p>
      </div>
    </div>
    ${optNote}
  </div>`;
}
