// ============================================================
// BPSC TRE 4.0 Study Planner | Er. Sangam Krishna
// Exam Date: 22-27 September 2026
// ============================================================

const EXAM_DATE = new Date('2026-09-22');
const CUTOFF_DATE = new Date('2026-09-07'); // 15 days before exam

// ============================================================
// COMPLETE SYLLABUS DATA (Hindi + English)
// ============================================================
const SYLLABUS_UNITS = [
  // LANGUAGE SECTION
  {
    id: 'L1', part: 'Language', subject: 'English Grammar',
    hindi: 'अंग्रेजी व्याकरण',
    topics: ['Tenses (काल)', 'Articles (a/an/the)', 'Prepositions', 'Conjunctions', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Comprehension Passage'],
    days: 3, marks: 15, priority: 'high'
  },
  {
    id: 'L2', part: 'Language', subject: 'Hindi Grammar',
    hindi: 'हिंदी व्याकरण',
    topics: ['संज्ञा, सर्वनाम, विशेषण', 'क्रिया, काल', 'संधि, समास', 'मुहावरे, लोकोक्तियाँ', 'अपठित गद्यांश', 'पत्र लेखन', 'वाक्य शुद्धि'],
    days: 3, marks: 15, priority: 'high'
  },
  // MATHEMATICS
  {
    id: 'M1', part: 'General Studies', subject: 'Number System',
    hindi: 'संख्या पद्धति',
    topics: ['Natural, Whole, Integer Numbers', 'HCF & LCM (म.स.प. और ल.स.प.)', 'Fractions & Decimals (भिन्न)', 'Simplification (सरलीकरण)', 'Number Series'],
    days: 3, marks: 12, priority: 'high'
  },
  {
    id: 'M2', part: 'General Studies', subject: 'Arithmetic',
    hindi: 'अंकगणित',
    topics: ['Percentage (प्रतिशत)', 'Profit & Loss (लाभ-हानि)', 'Simple & Compound Interest (ब्याज)', 'Ratio & Proportion (अनुपात)', 'Average (औसत)', 'Time & Work (समय-कार्य)', 'Time & Distance (चाल)'],
    days: 4, marks: 15, priority: 'high'
  },
  {
    id: 'M3', part: 'General Studies', subject: 'Geometry & Mensuration',
    hindi: 'ज्यामिति और क्षेत्रमिति',
    topics: ['Lines & Angles (रेखाएं और कोण)', 'Triangle, Circle (त्रिभुज, वृत्त)', 'Area of Rectangle, Square (क्षेत्रफल)', 'Volume of Cube, Cylinder (आयतन)', 'Perimeter (परिमाप)'],
    days: 3, marks: 10, priority: 'medium'
  },
  // MENTAL ABILITY
  {
    id: 'MA1', part: 'General Studies', subject: 'Mental Ability / Reasoning',
    hindi: 'मानसिक क्षमता / तर्कशक्ति',
    topics: ['Analogy (सादृश्यता)', 'Classification (वर्गीकरण)', 'Series Completion (श्रृंखला)', 'Coding-Decoding', 'Blood Relations (रक्त संबंध)', 'Direction Sense (दिशा ज्ञान)', 'Venn Diagram', 'Puzzle & Seating Arrangement'],
    days: 3, marks: 12, priority: 'high'
  },
  // GENERAL SCIENCE
  {
    id: 'S1', part: 'General Studies', subject: 'Physics Basics',
    hindi: 'भौतिक विज्ञान (मूल)',
    topics: ['Motion & Force (गति और बल)', 'Work, Energy, Power (कार्य, ऊर्जा)', 'Light & Sound (प्रकाश और ध्वनि)', 'Heat & Temperature (ताप)', 'Electricity (विद्युत)', 'Simple Machines (सरल मशीनें)'],
    days: 3, marks: 10, priority: 'high'
  },
  {
    id: 'S2', part: 'General Studies', subject: 'Chemistry Basics',
    hindi: 'रसायन विज्ञान (मूल)',
    topics: ['Matter & Its States (पदार्थ)', 'Acids, Bases, Salts (अम्ल, क्षार, लवण)', 'Chemical Reactions (रासायनिक अभिक्रिया)', 'Metals & Non-metals (धातु-अधातु)', 'Carbon Compounds', 'Common Chemicals in Daily Life'],
    days: 3, marks: 10, priority: 'high'
  },
  {
    id: 'S3', part: 'General Studies', subject: 'Biology Basics',
    hindi: 'जीव विज्ञान (मूल)',
    topics: ['Cell Structure (कोशिका)', 'Plant Kingdom (पादप जगत)', 'Animal Kingdom (जंतु जगत)', 'Human Body Systems (मानव शरीर)', 'Nutrition & Diseases (पोषण और रोग)', 'Reproduction (जनन)', 'Ecosystem & Food Chain'],
    days: 3, marks: 10, priority: 'high'
  },
  // GEOGRAPHY
  {
    id: 'G1', part: 'General Studies', subject: 'Indian Geography',
    hindi: 'भारत का भूगोल',
    topics: ['Physical Features (भौतिक स्वरूप)', 'Rivers of India (नदियाँ)', 'Climate (जलवायु)', 'Soils & Vegetation (मिट्टी)', 'Agriculture (कृषि)', 'Minerals & Industries', 'Population & Urbanization'],
    days: 3, marks: 10, priority: 'high'
  },
  {
    id: 'G2', part: 'General Studies', subject: 'World Geography & Bihar Geography',
    hindi: 'विश्व भूगोल और बिहार भूगोल',
    topics: ['Continents & Oceans (महाद्वीप)', 'Latitude & Longitude (अक्षांश-देशांतर)', 'Bihar Geography (बिहार का भूगोल)', 'Bihar Rivers & Districts', 'Natural Resources of Bihar'],
    days: 2, marks: 8, priority: 'medium'
  },
  // ENVIRONMENT / EVS
  {
    id: 'E1', part: 'General Studies', subject: 'Environment & EVS',
    hindi: 'पर्यावरण अध्ययन',
    topics: ['Ecosystem (पारिस्थितिकी तंत्र)', 'Biodiversity (जैव विविधता)', 'Environmental Pollution (प्रदूषण)', 'Climate Change (जलवायु परिवर्तन)', 'Natural Disasters (प्राकृतिक आपदाएं)', 'Conservation (संरक्षण)', 'EVS Pedagogy (शिक्षाशास्त्र)'],
    days: 2, marks: 8, priority: 'medium'
  },
  // SOCIAL SCIENCE
  {
    id: 'SS1', part: 'General Studies', subject: 'History of India',
    hindi: 'भारत का इतिहास',
    topics: ['Ancient India (प्राचीन भारत)', 'Medieval India (मध्यकालीन भारत)', 'Mughal Empire (मुगल साम्राज्य)', 'Maratha Empire', 'British Rule (ब्रिटिश शासन)', 'Social Reforms (सामाजिक सुधार)'],
    days: 3, marks: 10, priority: 'high'
  },
  {
    id: 'SS2', part: 'General Studies', subject: 'Indian National Movement',
    hindi: 'भारतीय राष्ट्रीय आंदोलन',
    topics: ['1857 Revolt (1857 का विद्रोह)', 'Indian National Congress (INC)', 'Non-Cooperation Movement (असहयोग)', 'Civil Disobedience (सविनय अवज्ञा)', 'Quit India Movement (भारत छोड़ो)', 'Role of Bihar in Freedom Struggle', 'Important Leaders & Events'],
    days: 3, marks: 12, priority: 'high'
  },
  {
    id: 'SS3', part: 'General Studies', subject: 'Indian Polity & Constitution',
    hindi: 'भारतीय राजव्यवस्था और संविधान',
    topics: ['Constitution of India (संविधान)', 'Fundamental Rights (मौलिक अधिकार)', 'Directive Principles (नीति निदेशक तत्व)', 'Parliament (संसद)', 'State Government (राज्य सरकार)', 'Panchayati Raj', 'Elections (चुनाव)'],
    days: 3, marks: 10, priority: 'high'
  },
  // GENERAL AWARENESS
  {
    id: 'GA1', part: 'General Studies', subject: 'General Awareness - Static',
    hindi: 'सामान्य जागरूकता (स्थैतिक)',
    topics: ['National Symbols (राष्ट्रीय प्रतीक)', 'Important Days (महत्वपूर्ण दिवस)', 'Books & Authors', 'Awards & Honours (पुरस्कार)', 'Sports (खेल)', 'Bihar GK (बिहार सामान्य ज्ञान)', 'Famous Personalities'],
    days: 2, marks: 8, priority: 'medium'
  },
  {
    id: 'GA2', part: 'General Studies', subject: 'Current Affairs & Bihar Current',
    hindi: 'समसामयिकी और बिहार करंट अफेयर्स',
    topics: ['National Current Affairs (राष्ट्रीय)', 'International Events (अंतर्राष्ट्रीय)', 'Bihar Government Schemes (बिहार सरकार की योजनाएं)', 'Economic News', 'Science & Technology News'],
    days: 2, marks: 8, priority: 'medium'
  },
  // REVISION & MOCK
  {
    id: 'R1', part: 'Revision', subject: 'Full Revision - Language',
    hindi: 'पूर्ण पुनरावृत्ति - भाषा',
    topics: ['English Grammar Revision', 'Hindi Grammar Revision', 'Practice Questions'],
    days: 2, marks: 0, priority: 'revision'
  },
  {
    id: 'R2', part: 'Revision', subject: 'Full Revision - Maths & Reasoning',
    hindi: 'पूर्ण पुनरावृत्ति - गणित और तर्क',
    topics: ['All Math Topics Revision', 'Reasoning Practice', 'Speed & Accuracy'],
    days: 2, marks: 0, priority: 'revision'
  },
  {
    id: 'R3', part: 'Revision', subject: 'Full Revision - Science & Geography',
    hindi: 'पूर्ण पुनरावृत्ति - विज्ञान और भूगोल',
    topics: ['Physics, Chemistry, Biology Revision', 'Geography Revision', 'EVS Revision'],
    days: 2, marks: 0, priority: 'revision'
  },
  {
    id: 'R4', part: 'Revision', subject: 'Full Revision - History & Polity',
    hindi: 'पूर्ण पुनरावृत्ति - इतिहास और राजव्यवस्था',
    topics: ['History Revision', 'National Movement Revision', 'Polity Revision', 'GK Revision'],
    days: 2, marks: 0, priority: 'revision'
  },
  {
    id: 'MT1', part: 'Mock Test', subject: 'Mock Test 1 + Analysis',
    hindi: 'मॉक टेस्ट 1 + विश्लेषण',
    topics: ['Full Length Mock Test (150 Questions)', 'Answer Analysis', 'Weak Area Identification'],
    days: 1, marks: 0, priority: 'mock'
  },
  {
    id: 'MT2', part: 'Mock Test', subject: 'Mock Test 2 + Analysis',
    hindi: 'मॉक टेस्ट 2 + विश्लेषण',
    topics: ['Full Length Mock Test (150 Questions)', 'PYQ Practice', 'Time Management'],
    days: 1, marks: 0, priority: 'mock'
  },
  {
    id: 'MT3', part: 'Mock Test', subject: 'Mock Test 3 + Final Revision',
    hindi: 'मॉक टेस्ट 3 + अंतिम पुनरावृत्ति',
    topics: ['Final Mock Test', 'Quick Notes Revision', 'Important Formulas & Facts'],
    days: 1, marks: 0, priority: 'mock'
  }
];

// ============================================================
// PYQ DATA (from TRE 1.0, 2.0, 3.0)
// ============================================================
const PYQ_DATA = [
  {
    title: 'Mathematics PYQs (गणित)',
    items: [
      'LCM/HCF based questions (हर बार 3-4 प्रश्न)',
      'Percentage & Profit-Loss (5-6 प्रश्न)',
      'Simple Interest calculations',
      'Area of Triangle & Rectangle',
      'Number Series completion',
      'Average problems (औसत)',
      'Ratio & Proportion'
    ]
  },
  {
    title: 'Reasoning PYQs (तर्कशक्ति)',
    items: [
      'Analogy (सादृश्यता) - 4-5 questions',
      'Coding-Decoding - 3-4 questions',
      'Blood Relations - 2-3 questions',
      'Direction Sense - 2-3 questions',
      'Series (अक्षर/संख्या श्रृंखला)',
      'Odd One Out (विषम पद)',
      'Venn Diagram'
    ]
  },
  {
    title: 'Science PYQs (विज्ञान)',
    items: [
      'Human digestive system (पाचन तंत्र)',
      'Photosynthesis (प्रकाश संश्लेषण)',
      'Newton\'s Laws of Motion',
      'Acids & Bases (pH scale)',
      'Diseases & their causes (रोग)',
      'Food chain & Ecosystem',
      'Electricity & Magnetism'
    ]
  },
  {
    title: 'History & Polity PYQs',
    items: [
      '1857 Revolt leaders & events',
      'Gandhi ji\'s movements (गांधी जी के आंदोलन)',
      'Fundamental Rights (मौलिक अधिकार)',
      'Preamble of Constitution (प्रस्तावना)',
      'Bihar in freedom struggle',
      'Important Articles of Constitution',
      'Rajya Sabha & Lok Sabha'
    ]
  },
  {
    title: 'Geography PYQs (भूगोल)',
    items: [
      'Rivers of Bihar (बिहार की नदियाँ)',
      'Longest/Highest in India',
      'Soil types (मिट्टी के प्रकार)',
      'Climate zones of India',
      'Tropic of Cancer passing states',
      'National Parks & Wildlife',
      'Bihar districts & geography'
    ]
  },
  {
    title: 'Hindi Language PYQs (हिंदी)',
    items: [
      'संधि विच्छेद (3-4 प्रश्न)',
      'समास (2-3 प्रश्न)',
      'मुहावरे और लोकोक्तियाँ',
      'अपठित गद्यांश',
      'वाक्य शुद्धि',
      'पर्यायवाची और विलोम',
      'रस, छंद, अलंकार'
    ]
  }
];

// ============================================================
// SCREEN NAVIGATION
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function showForm() {
  showScreen('formScreen');
  // Set default start date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('startDate').value = today;
  document.getElementById('startDate').min = today;
}

// ============================================================
// PLAN GENERATION
// ============================================================
function generatePlan() {
  const name = document.getElementById('userName').value.trim();
  const startDateVal = document.getElementById('startDate').value;
  const hours = parseInt(document.getElementById('studyHours').value);

  if (!name) { alert('कृपया अपना नाम भरें / Please enter your name'); return; }
  if (!startDateVal) { alert('कृपया शुरुआत की तारीख चुनें / Please select start date'); return; }

  const startDate = new Date(startDateVal);
  const totalDays = Math.floor((CUTOFF_DATE - startDate) / (1000 * 60 * 60 * 24));

  if (totalDays <= 0) {
    alert('शुरुआत की तारीख exam से 15 दिन पहले (7 Sep 2026) से पहले होनी चाहिए।');
    return;
  }

  // Update header
  document.getElementById('planTitle').textContent = `📅 ${name} का Study Plan`;
  document.getElementById('planSubtitle').textContent =
    `${formatDate(startDate)} से ${formatDate(CUTOFF_DATE)} तक | कुल ${totalDays} दिन | ${hours} घंटे/दिन`;

  // Render PYQs
  renderPYQs();

  // Generate day-by-day plan
  renderDayPlan(startDate, totalDays, hours, name);

  showScreen('planScreen');
}

function renderPYQs() {
  const grid = document.getElementById('pyqGrid');
  grid.innerHTML = PYQ_DATA.map(p => `
    <div class="pyq-card">
      <h5>${p.title}</h5>
      <ul>${p.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function renderDayPlan(startDate, totalDays, hoursPerDay, name) {
  // Build schedule: distribute syllabus units across available days
  const schedule = buildSchedule(totalDays, hoursPerDay);
  const container = document.getElementById('planTable');
  container.innerHTML = '';

  let weekDays = [];
  let weekNum = 1;
  let currentDate = new Date(startDate);

  schedule.forEach((entry, idx) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + idx);
    weekDays.push({ day: idx + 1, date: d, entry });

    if (weekDays.length === 7 || idx === schedule.length - 1) {
      const weekEl = document.createElement('div');
      weekEl.className = 'week-block';
      weekEl.innerHTML = `<div class="week-header">📅 Week ${weekNum} (${formatDate(weekDays[0].date)} – ${formatDate(weekDays[weekDays.length-1].date)})</div>`;

      weekDays.forEach(wd => {
        const rowClass = wd.entry.priority === 'revision' ? 'revision' :
                         wd.entry.priority === 'mock' ? 'mock' : '';
        const topicsHtml = wd.entry.topics.slice(0, 3).join(' | ');
        const moreTopics = wd.entry.topics.length > 3 ? ` +${wd.entry.topics.length - 3} more` : '';
        weekEl.innerHTML += `
          <div class="day-row ${rowClass}">
            <div class="day-num">Day ${wd.day}</div>
            <div class="day-date">${formatDate(wd.date)}<br/><small>${getDayName(wd.date)}</small></div>
            <div class="day-topic">
              <strong>${wd.entry.subject} | ${wd.entry.hindi}</strong>
              <span>${topicsHtml}${moreTopics}</span>
            </div>
            <div class="day-hours">⏱ ${wd.entry.hoursToday || hoursPerDay}h</div>
          </div>`;
      });

      container.appendChild(weekEl);
      weekDays = [];
      weekNum++;
    }
  });
}

function buildSchedule(totalDays, hoursPerDay) {
  const schedule = [];
  // Total syllabus days needed
  const totalSyllabusDays = SYLLABUS_UNITS.reduce((s, u) => s + u.days, 0);

  // Scale factor: if we have more days, add buffer/extra revision
  const scaleFactor = totalDays / totalSyllabusDays;

  SYLLABUS_UNITS.forEach(unit => {
    const daysForUnit = Math.max(1, Math.round(unit.days * scaleFactor));
    for (let d = 0; d < daysForUnit; d++) {
      const topicsPerDay = Math.ceil(unit.topics.length / daysForUnit);
      const startTopic = d * topicsPerDay;
      const dayTopics = unit.topics.slice(startTopic, startTopic + topicsPerDay);
      schedule.push({
        subject: unit.subject,
        hindi: unit.hindi,
        part: unit.part,
        topics: dayTopics.length > 0 ? dayTopics : unit.topics,
        priority: unit.priority,
        hoursToday: hoursPerDay
      });
    }
  });

  // Trim or pad to totalDays
  while (schedule.length < totalDays) {
    // Add extra revision days
    const revUnit = SYLLABUS_UNITS.find(u => u.priority === 'revision');
    schedule.push({
      subject: 'Extra Revision & Practice',
      hindi: 'अतिरिक्त पुनरावृत्ति और अभ्यास',
      part: 'Revision',
      topics: ['PYQ Practice', 'Weak Topics Revision', 'Speed Test'],
      priority: 'revision',
      hoursToday: hoursPerDay
    });
  }

  return schedule.slice(0, totalDays);
}

// ============================================================
// PDF DOWNLOAD with Watermark
// ============================================================
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const name = document.getElementById('userName').value.trim();
  const startDateVal = document.getElementById('startDate').value;
  const startDate = new Date(startDateVal);
  const hours = parseInt(document.getElementById('studyHours').value);
  const totalDays = Math.floor((CUTOFF_DATE - startDate) / (1000 * 60 * 60 * 24));
  const schedule = buildSchedule(totalDays, hours);

  const W = 210, H = 297;
  let y = 0;

  function addWatermark() {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.setFontSize(28);
    doc.setTextColor(100, 100, 100);
    for (let wy = 40; wy < H; wy += 55) {
      for (let wx = 10; wx < W; wx += 80) {
        doc.text('Er. Sangam Krishna', wx, wy, { angle: 35 });
      }
    }
    doc.restoreGraphicsState();
  }

  function newPage() {
    doc.addPage();
    y = 20;
    addWatermark();
    // Header on each page
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, W, 15, 'F');
    doc.setFontSize(9);
    doc.setTextColor(245, 158, 11);
    doc.text('BPSC TRE 4.0 Study Plan | Er. Sangam Krishna', 10, 10);
    doc.setTextColor(148, 163, 184);
    doc.text(`${name} | Exam: 22-27 Sep 2026`, W - 10, 10, { align: 'right' });
    y = 22;
  }

  // PAGE 1 - Cover
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, W, H, 'F');
  addWatermark();

  doc.setFillColor(245, 158, 11);
  doc.rect(0, 0, W, 3, 'F');

  doc.setFontSize(11);
  doc.setTextColor(245, 158, 11);
  doc.text('BPSC TRE 4.0 | Class 1-5 | Primary Teacher', W / 2, 40, { align: 'center' });

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('PERSONALIZED STUDY PLAN', W / 2, 60, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(52, 211, 153);
  doc.text(name, W / 2, 80, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(148, 163, 184);
  doc.text(`Study Period: ${formatDate(startDate)} to ${formatDate(CUTOFF_DATE)}`, W / 2, 95, { align: 'center' });
  doc.text(`Total Days: ${totalDays} | Daily Hours: ${hours}`, W / 2, 105, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(251, 191, 36);
  doc.text('Exam Date: 22-27 September 2026', W / 2, 120, { align: 'center' });
  doc.text('Total Vacancies: 46,595', W / 2, 132, { align: 'center' });

  // Syllabus summary box
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(20, 145, W - 40, 80, 4, 4, 'F');
  doc.setFontSize(12);
  doc.setTextColor(245, 158, 11);
  doc.text('EXAM PATTERN', W / 2, 158, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(226, 232, 240);
  const pattern = [
    'Part I: Language (English + Hindi/Urdu/Bengali) - 30 Marks [Qualifying - 30%]',
    'Part II: General Studies - 120 Marks [Negative Marking]',
    '  • Elementary Mathematics | Mental Ability | General Awareness',
    '  • General Science | Social Science | Indian National Movement',
    '  • Geography | Environment (EVS)',
    'Total: 150 Questions | 150 Marks | 2.5 Hours | MCQ Format'
  ];
  pattern.forEach((line, i) => {
    doc.text(line, 25, 168 + i * 8);
  });

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Created by Er. Sangam Krishna | BPSC TRE 4.0 Study Planner', W / 2, H - 15, { align: 'center' });

  // PAGE 2 - Complete Syllabus
  newPage();
  doc.setFontSize(14);
  doc.setTextColor(245, 158, 11);
  doc.text('COMPLETE SYLLABUS | BPSC TRE 4.0 Class 1-5', W / 2, y, { align: 'center' });
  y += 10;

  SYLLABUS_UNITS.filter(u => u.priority !== 'revision' && u.priority !== 'mock').forEach(unit => {
    if (y > H - 40) newPage();
    doc.setFillColor(30, 41, 59);
    doc.rect(10, y, W - 20, 7, 'F');
    doc.setFontSize(10);
    doc.setTextColor(52, 211, 153);
    doc.text(`${unit.subject} | ${unit.hindi}  [${unit.marks} Marks]`, 13, y + 5);
    y += 9;
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    unit.topics.forEach(t => {
      if (y > H - 15) newPage();
      doc.text(`  • ${t}`, 13, y);
      y += 5;
    });
    y += 3;
  });

  // PAGE 3+ - Day by Day Plan
  newPage();
  doc.setFontSize(14);
  doc.setTextColor(245, 158, 11);
  doc.text('DAY-BY-DAY STUDY PLAN', W / 2, y, { align: 'center' });
  y += 10;

  // Table header
  const cols = [12, 35, 65, 155, 185];
  function tableHeader() {
    doc.setFillColor(30, 58, 95);
    doc.rect(10, y, W - 20, 8, 'F');
    doc.setFontSize(9);
    doc.setTextColor(245, 158, 11);
    doc.text('Day', cols[0], y + 5.5);
    doc.text('Date', cols[1], y + 5.5);
    doc.text('Subject', cols[2], y + 5.5);
    doc.text('Topics', cols[3] - 90, y + 5.5);
    doc.text('Hrs', cols[4], y + 5.5);
    y += 10;
  }
  tableHeader();

  let currentDate = new Date(startDate);
  schedule.forEach((entry, idx) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + idx);

    if (y > H - 20) {
      newPage();
      tableHeader();
    }

    const isRev = entry.priority === 'revision';
    const isMock = entry.priority === 'mock';
    if (isRev) doc.setFillColor(245, 158, 11, 0.1);
    else if (isMock) doc.setFillColor(239, 68, 68, 0.1);
    else doc.setFillColor(15, 23, 42);
    doc.rect(10, y - 1, W - 20, 8, 'F');

    doc.setFontSize(8);
    doc.setTextColor(isRev ? 245 : isMock ? 239 : 226, isRev ? 158 : isMock ? 68 : 232, isRev ? 11 : isMock ? 68 : 240);
    doc.text(`${idx + 1}`, cols[0], y + 5);
    doc.setTextColor(100, 116, 139);
    doc.text(formatDateShort(d), cols[1], y + 5);
    doc.setTextColor(isRev ? 245 : isMock ? 239 : 52, isRev ? 158 : isMock ? 68 : 211, isRev ? 11 : isMock ? 68 : 153);
    doc.text(entry.subject.substring(0, 28), cols[2], y + 5);
    doc.setTextColor(148, 163, 184);
    const topicStr = entry.topics.slice(0, 2).join(', ');
    doc.text(topicStr.substring(0, 45), cols[3] - 90, y + 5);
    doc.setTextColor(59, 130, 246);
    doc.text(`${entry.hoursToday || hours}h`, cols[4], y + 5);
    y += 9;
  });

  // Last page footer
  if (y > H - 30) newPage();
  y += 10;
  doc.setFillColor(245, 158, 11);
  doc.rect(10, y, W - 20, 0.5, 'F');
  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(245, 158, 11);
  doc.text('Best of Luck! आपको शुभकामनाएं!', W / 2, y, { align: 'center' });
  y += 7;
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Created by Er. Sangam Krishna | BPSC TRE 4.0 Study Planner', W / 2, y, { align: 'center' });

  doc.save(`BPSC_TRE4_StudyPlan_${name.replace(/\s+/g, '_')}_SangamKrishna.pdf`);
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatDate(d) {
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatDateShort(d) {
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}
function getDayName(d) {
  return d.toLocaleDateString('en-IN', { weekday: 'short' });
}
