// generatePYQsHTML() + generateExamInfoHTML()
function generatePYQsHTML() {
  const isBpsc = userData.exam === 'bpsc';
  if (isBpsc) {
    return `<div class="section-block">
      <h3>📝 BPSC TRE — PYQ Analysis & Tips</h3>
      <div class="pyq-grid">
        <div class="pyq-card">
          <h5>🔢 Mathematics (Most Asked)</h5>
          <ul>
            <li>Percentage & Profit-Loss (8–10 Qs)</li>
            <li>Time & Work, Speed-Distance (6–8 Qs)</li>
            <li>Number System & Simplification</li>
            <li>Mensuration — Area, Volume</li>
            <li>Average, Ratio & Proportion</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>🧠 Reasoning (High Scoring)</h5>
          <ul>
            <li>Series — Number & Letter (5–6 Qs)</li>
            <li>Blood Relations (3–4 Qs)</li>
            <li>Coding-Decoding (3–4 Qs)</li>
            <li>Direction Sense (2–3 Qs)</li>
            <li>Syllogism & Venn Diagram</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>🌍 GS — History & Polity</h5>
          <ul>
            <li>Freedom Movement — Gandhi, INC</li>
            <li>Bihar History — Champaran, JP</li>
            <li>Constitution — FR, DPSP, Amendments</li>
            <li>Panchayati Raj (73rd, 74th)</li>
            <li>President, PM, Parliament</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>🔬 Science (Easy Marks)</h5>
          <ul>
            <li>Biology — Diseases, Vitamins, Cells</li>
            <li>Physics — Force, Motion, Light</li>
            <li>Chemistry — Acids, Metals, Reactions</li>
            <li>Environment — Pollution, Ecosystem</li>
            <li>Current Science News</li>
          </ul>
        </div>
      </div>
      <div class="ca-box">
        <h4>📰 Daily Current Affairs Strategy</h4>
        <ul>
          <li>The Hindu / Dainik Jagran — 30 min daily</li>
          <li>Monthly Magazine: Pratiyogita Darpan / Arihant</li>
          <li>Bihar Current Affairs — Prabhat Khabar</li>
          <li>Government Schemes — PIB.gov.in</li>
        </ul>
      </div>
    </div>`;
  }
  return `<div class="section-block">
    <h3>📝 UPSC CSE — PYQ Analysis & Tips</h3>
    <div class="pyq-grid">
      <div class="pyq-card">
        <h5>🏛️ Polity & Governance (Prelims)</h5>
        <ul>
          <li>Constitution — Articles, Amendments (8–10 Qs)</li>
          <li>Parliament, President, PM (5–6 Qs)</li>
          <li>Constitutional Bodies (4–5 Qs)</li>
          <li>Panchayati Raj, Local Bodies</li>
          <li>Recent SC Judgements</li>
        </ul>
      </div>
      <div class="pyq-card">
        <h5>🌿 Environment & Ecology</h5>
        <ul>
          <li>Biodiversity — IUCN, Ramsar, CITES (5–7 Qs)</li>
          <li>Climate Change — Paris, COP (4–5 Qs)</li>
          <li>National Parks & Sanctuaries</li>
          <li>Environmental Laws</li>
          <li>Pollution & Disaster Management</li>
        </ul>
      </div>
      <div class="pyq-card">
        <h5>📜 History & Culture</h5>
        <ul>
          <li>Ancient India — Indus, Maurya, Gupta (5–6 Qs)</li>
          <li>Medieval — Mughal, Bhakti-Sufi (4–5 Qs)</li>
          <li>Modern — Freedom Movement (6–8 Qs)</li>
          <li>Art & Architecture (3–4 Qs)</li>
          <li>UNESCO Heritage Sites</li>
        </ul>
      </div>
      <div class="pyq-card">
        <h5>💰 Economy (Trending)</h5>
        <ul>
          <li>Budget — Fiscal Deficit, Taxes (4–5 Qs)</li>
          <li>RBI, Monetary Policy, Inflation</li>
          <li>Agriculture — MSP, e-NAM, FCI</li>
          <li>International — WTO, IMF, World Bank</li>
          <li>Government Schemes — PLI, PM-KISAN</li>
        </ul>
      </div>
    </div>
    <div class="pyq-links">
      <a class="pyq-link" href="https://upsc.gov.in/examinations/previous-question-papers" target="_blank">📄 UPSC Official PYQs</a>
      <a class="pyq-link" href="https://www.insightsonindia.com/upsc-previous-year-question-papers/" target="_blank">📚 Insights PYQ Analysis</a>
    </div>
    <div class="ca-box">
      <h4>📰 Daily Current Affairs Strategy</h4>
      <ul>
        <li>The Hindu + Indian Express — 1 hr daily</li>
        <li>PIB.gov.in — Government press releases</li>
        <li>Monthly: Vision IAS / Insights Current Affairs</li>
        <li>Yojana & Kurukshetra — Monthly magazines</li>
      </ul>
    </div>
  </div>`;
}

function generateExamInfoHTML() {
  const isBpsc = userData.exam === 'bpsc';
  if (isBpsc) {
    const cls = userData.bpscClass;
    return `<div class="section-block">
      <h3>ℹ️ BPSC TRE 4.0 — Exam Information</h3>
      <div class="info-grid">
        <div class="info-card">
          <h4>📅 Important Dates</h4>
          <p><strong>Exam Date:</strong> 22–27 Sep 2026</p>
          <p><strong>Notification:</strong> BPSC Official</p>
          <p><strong>Plan Ends:</strong> 7 Sep 2026 (15 days before)</p>
        </div>
        <div class="info-card">
          <h4>📝 Exam Pattern</h4>
          ${cls === '1-5' || cls === 'both' ? `<p><strong>Class 1–5 (PRT):</strong></p>
          <p>Part I Language: 30 marks</p>
          <p>Part II GS: 120 marks</p>
          <p><strong>Total: 150 marks</strong></p>` : ''}
          ${cls === '6-8' || cls === 'both' ? `<p><strong>Class 6–8 (TGT):</strong></p>
          <p>Part I Language: 30 marks</p>
          <p>Part II GS: 40 marks</p>
          <p>Part III Subject: 80 marks</p>
          <p><strong>Total: 150 marks</strong></p>` : ''}
        </div>
        <div class="info-card">
          <h4>✅ Key Rules</h4>
          <p>❌ No Negative Marking</p>
          <p>⏱️ Duration: 2.5 hours</p>
          <p>📋 MCQ format</p>
          <p>🏫 46,595 Total Vacancies</p>
        </div>
        <div class="info-card">
          <h4>📚 Best Books</h4>
          <p>• NCERT Class 6–10 (all subjects)</p>
          <p>• Lucent's GK (Hindi/English)</p>
          <p>• Arihant BPSC TRE Guide</p>
          <p>• R.S. Aggarwal — Maths & Reasoning</p>
        </div>
      </div>
    </div>`;
  }
  return `<div class="section-block">
    <h3>ℹ️ UPSC CSE 2027 — Exam Information</h3>
    <div class="info-grid">
      <div class="info-card">
        <h4>📅 Important Dates</h4>
        <p><strong>Prelims:</strong> May 2027</p>
        <p><strong>Mains:</strong> Sep–Oct 2027</p>
        <p><strong>Interview:</strong> Jan–Apr 2028</p>
        <p><strong>Plan Ends:</strong> 15 days before Prelims</p>
      </div>
      <div class="info-card">
        <h4>📝 Prelims Pattern</h4>
        <p>GS Paper I: 200 marks (100 Qs)</p>
        <p>CSAT Paper II: 200 marks (qualifying 33%)</p>
        <p>Negative marking: -0.66 per wrong</p>
        <p>Duration: 2 hrs each paper</p>
      </div>
      <div class="info-card">
        <h4>📝 Mains Pattern</h4>
        <p>Qualifying: Paper A + B (300+300)</p>
        <p>Essay: 250 marks</p>
        <p>GS I–IV: 250×4 = 1000 marks</p>
        <p>Optional I+II: 250×2 = 500 marks</p>
        <p>Interview: 275 marks</p>
        <p><strong>Total Merit: 2025 marks</strong></p>
      </div>
      <div class="info-card">
        <h4>📚 Standard Books</h4>
        <p>• NCERT 6–12 (all subjects)</p>
        <p>• Laxmikanth — Indian Polity</p>
        <p>• Bipin Chandra — Modern History</p>
        <p>• Ramesh Singh — Indian Economy</p>
        <p>• Shankar IAS — Environment</p>
      </div>
    </div>
    <div class="optional-note">
      <h4>⚠️ Optional Subject</h4>
      <p>आपने अभी तक Optional Subject नहीं चुना है। Popular choices: <strong>History, Geography, Public Administration, Sociology, Political Science & IR, Anthropology, Philosophy, Psychology</strong>. अपने graduation background और interest के हिसाब से चुनें। Optional चुनने के बाद वापस आकर plan generate करें।</p>
    </div>
  </div>`;
}
