// ═══════════════════════════════════════════════════════════════
// c25.js — Combined Dual Exam Plan + Year Picker
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

// ── Combined Exam State ───────────────────────────────────────
let combinedExamMode = false;
let combinedExam1 = '', combinedExam2 = '';

// ── All selectable exams for combined picker ──────────────────
const COMBINED_EXAM_OPTIONS = [
  { id: 'upsc_2026', label: 'UPSC CSE 2026', icon: '🏛️' },
  { id: 'upsc_2027', label: 'UPSC CSE 2027', icon: '🏛️' },
  { id: 'bpsc_72',   label: 'BPSC 72nd CCE', icon: '⚖️' },
  { id: 'bpsc_71',   label: 'BPSC 71st CCE', icon: '⚖️' },
  { id: 'bpsc_tre',  label: 'BPSC TRE 4.0',  icon: '🏫' },
  { id: 'ssc_cgl',   label: 'SSC CGL 2026',  icon: '📋' },
  { id: 'ibps_po',   label: 'IBPS PO 2026',  icon: '🏦' },
  { id: 'sbi_po',    label: 'SBI PO 2026',   icon: '🏦' },
  { id: 'ibps_rrb',  label: 'IBPS RRB PO',   icon: '🌾' },
  { id: 'ibps_clerk',label: 'IBPS Clerk',    icon: '📑' },
  { id: 'nda_2026',  label: 'NDA 2026',      icon: '⚔️' },
  { id: 'uppsc_2026',label: 'UPPSC PCS 2026',icon: '⚖️' },
  { id: 'mppsc_2026',label: 'MPPSC SSE 2026',icon: '⚖️' },
  { id: 'rpsc_ras_2026', label: 'RPSC RAS 2026', icon: '⚖️' },
  { id: 'mpsc_2026', label: 'MPSC 2026',     icon: '⚖️' },
];

// ── Recommended study hours per exam ─────────────────────────
const EXAM_RECOMMENDED_HOURS = {
  upsc_2026: 8, upsc_2027: 8,
  bpsc_72: 6, bpsc_71: 6, bpsc_tre: 5,
  ssc_cgl: 5, ibps_po: 5, sbi_po: 5,
  ibps_rrb: 4, ibps_clerk: 4,
  nda_2026: 6, uppsc_2026: 6, mppsc_2026: 6,
  rpsc_ras_2026: 6, mpsc_2026: 6,
};

function selectCombinedExam() {
  combinedExamMode = true;
  showCombinedModal();
}

function showCombinedModal() {
  // Remove existing modal if any
  const existing = document.getElementById('combinedExamModal');
  if (existing) existing.remove();

  const optionsHTML = COMBINED_EXAM_OPTIONS.map(e =>
    `<label class="comb-exam-opt" data-id="${e.id}">
      <input type="checkbox" name="combExam" value="${e.id}" onchange="updateCombinedSelection()"/>
      <span class="comb-opt-icon">${e.icon}</span>
      <span class="comb-opt-label">${e.label}</span>
      <span class="comb-opt-check">✓</span>
    </label>`
  ).join('');

  const modal = document.createElement('div');
  modal.id = 'combinedExamModal';
  modal.className = 'combined-modal-overlay';
  modal.innerHTML = `
    <div class="combined-modal-box" onclick="event.stopPropagation()">
      <button class="combined-modal-close" onclick="closeCombinedModal()">✕</button>
      <div class="combined-modal-header">
        <div class="combined-modal-icon">🔗</div>
        <h2>Combined Dual Exam Plan</h2>
        <p>Exactly 2 exams chunein — hum aapko batayenge kitne ghante padhna hoga</p>
      </div>
      <div class="combined-selection-info" id="combinedSelInfo">
        <span class="comb-sel-count">0/2 selected</span>
      </div>
      <div class="combined-exam-grid">${optionsHTML}</div>
      <div class="combined-hours-preview hidden" id="combinedHoursPreview">
        <div class="chp-icon">⏰</div>
        <div class="chp-text" id="combinedHoursText"></div>
      </div>
      <button class="combined-proceed-btn" id="combinedProceedBtn" disabled onclick="proceedCombinedPlan()">
        Combined Plan बनाएं →
      </button>
    </div>
  `;
  modal.setAttribute('onclick', 'closeCombinedModal()');
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('open'), 10);
}

function closeCombinedModal() {
  const modal = document.getElementById('combinedExamModal');
  if (modal) { modal.classList.remove('open'); setTimeout(() => modal.remove(), 300); }
  combinedExamMode = false;
}

function updateCombinedSelection() {
  const checked = Array.from(document.querySelectorAll('input[name="combExam"]:checked'));
  const selInfo = document.getElementById('combinedSelInfo');
  const preview = document.getElementById('combinedHoursPreview');
  const proceedBtn = document.getElementById('combinedProceedBtn');
  const hoursText = document.getElementById('combinedHoursText');

  // Max 2 selections
  if (checked.length > 2) {
    // Uncheck the last one
    checked[checked.length - 1].checked = false;
    return;
  }

  // Update visual state
  document.querySelectorAll('.comb-exam-opt').forEach(opt => {
    const cb = opt.querySelector('input');
    opt.classList.toggle('selected', cb.checked);
    if (checked.length >= 2 && !cb.checked) opt.classList.add('disabled');
    else opt.classList.remove('disabled');
  });

  selInfo.innerHTML = `<span class="comb-sel-count">${checked.length}/2 selected</span>`;

  if (checked.length === 2) {
    const id1 = checked[0].value;
    const id2 = checked[1].value;
    combinedExam1 = id1;
    combinedExam2 = id2;

    const h1 = EXAM_RECOMMENDED_HOURS[id1] || 5;
    const h2 = EXAM_RECOMMENDED_HOURS[id2] || 5;
    // Combined = max of both + 1 overlap bonus, capped at 12
    const combined = Math.min(12, Math.max(h1, h2) + Math.round(Math.min(h1, h2) * 0.4));

    const label1 = COMBINED_EXAM_OPTIONS.find(e => e.id === id1)?.label || id1;
    const label2 = COMBINED_EXAM_OPTIONS.find(e => e.id === id2)?.label || id2;

    hoursText.innerHTML = `
      <strong>${label1}</strong> ke liye ~${h1} hrs/day chahiye<br/>
      <strong>${label2}</strong> ke liye ~${h2} hrs/day chahiye<br/>
      <span class="chp-combined">Combined preparation ke liye minimum <strong>${combined} hrs/day</strong> recommended hai</span>
    `;
    preview.classList.remove('hidden');
    proceedBtn.disabled = false;
    proceedBtn.textContent = `${combined} hrs/day — Combined Plan बनाएं →`;
    proceedBtn.setAttribute('data-hours', combined);
  } else {
    preview.classList.add('hidden');
    proceedBtn.disabled = true;
    proceedBtn.textContent = 'Combined Plan बनाएं →';
  }
}

function proceedCombinedPlan() {
  if (!combinedExam1 || !combinedExam2) return;
  const btn = document.getElementById('combinedProceedBtn');
  const recommendedHours = parseInt(btn.getAttribute('data-hours') || '6');

  closeCombinedModal();

  // Set up combined exam in form
  selectedExam = 'combined';
  userData._combinedExam1 = combinedExam1;
  userData._combinedExam2 = combinedExam2;
  userData._combinedRecommendedHours = recommendedHours;

  const label1 = COMBINED_EXAM_OPTIONS.find(e => e.id === combinedExam1)?.label || combinedExam1;
  const label2 = COMBINED_EXAM_OPTIONS.find(e => e.id === combinedExam2)?.label || combinedExam2;

  // Show combined form
  document.getElementById('bpscClassGroup').classList.add('hidden');
  document.getElementById('upscOptionalGroup').classList.add('hidden');
  document.getElementById('upscYearGroup').classList.add('hidden');
  document.getElementById('formHeaderIcon').textContent = '🔗';
  document.getElementById('formTitle').textContent = `${label1} + ${label2} — Combined Plan`;
  document.getElementById('formSubtitle').textContent = `Minimum ${recommendedHours} hrs/day recommended — aap apna time chunein`;

  // Pre-select recommended hours
  const hoursRadios = document.querySelectorAll('input[name="studyHours"]');
  let bestMatch = null, bestDiff = Infinity;
  hoursRadios.forEach(r => {
    const diff = Math.abs(parseInt(r.value) - recommendedHours);
    if (diff < bestDiff) { bestDiff = diff; bestMatch = r; }
  });
  if (bestMatch) bestMatch.checked = true;

  // Show combined hours warning banner
  let banner = document.getElementById('combinedHoursBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'combinedHoursBanner';
    banner.className = 'combined-hours-banner';
    const formCard = document.querySelector('.form-card');
    const generateBtn = formCard.querySelector('.generate-btn');
    formCard.insertBefore(banner, generateBtn);
  }
  banner.innerHTML = `
    <span class="chb-icon">⚠️</span>
    <span><strong>${label1} + ${label2}</strong> ke liye minimum <strong>${recommendedHours} hrs/day</strong> padhna zaroori hai. Kam time chunne par plan adjust ho jayega.</span>
  `;

  showScreen('formScreen');
}

// ── Override getSyllabus for combined mode ────────────────────
const _origGetSyllabus = typeof getSyllabus === 'function' ? getSyllabus : null;

function getCombinedSyllabus(exam1Id, exam2Id) {
  const cfg1 = getExamConfig(exam1Id);
  const cfg2 = getExamConfig(exam2Id);
  const syl1 = cfg1 ? cfg1.getSyllabus(userData) : {};
  const syl2 = cfg2 ? cfg2.getSyllabus(userData) : {};

  // Merge: if same subject key exists, keep higher marks version
  const merged = { ...syl1 };
  Object.entries(syl2).forEach(([key, val]) => {
    if (!merged[key]) {
      merged[`[${COMBINED_EXAM_OPTIONS.find(e=>e.id===exam2Id)?.label||exam2Id}] ${key}`] = val;
    }
    // else: already covered by exam1
  });
  return merged;
}

// ── Year Picker for exam dates (2026-2029) ────────────────────
// Exams that support year selection (not BPSC TRE which has fixed date)
const YEAR_PICKER_EXAMS = [
  'bpsc_72','bpsc_71','ssc_cgl','ibps_po','sbi_po','ibps_rrb','ibps_clerk',
  'nda_2026','uppsc_2026','mppsc_2026','rpsc_ras_2026','mpsc_2026',
  'neet_2026','jee_main_2026','jee_advanced_2026'
];

// Base month/day for each exam (year will be user-selected)
const EXAM_BASE_DATES = {
  bpsc_72:        { month: 7,  day: 26 },
  bpsc_71:        { month: 4,  day: 25 },
  ssc_cgl:        { month: 5,  day: 20 },
  ibps_po:        { month: 8,  day: 22 },
  sbi_po:         { month: 9,  day: 1  },
  ibps_rrb:       { month: 11, day: 21 },
  ibps_clerk:     { month: 10, day: 10 },
  nda_2026:       { month: 4,  day: 12 },
  uppsc_2026:     { month: 12, day: 6  },
  mppsc_2026:     { month: 4,  day: 26 },
  rpsc_ras_2026:  { month: 6,  day: 15 },
  mpsc_2026:      { month: 3,  day: 15 },
  neet_2026:      { month: 5,  day: 3  },
  jee_main_2026:  { month: 4,  day: 2  },
  jee_advanced_2026: { month: 5, day: 17 },
};

// Inject year picker into form when applicable
function injectYearPickerIfNeeded() {
  const exam = selectedExam;
  if (!YEAR_PICKER_EXAMS.includes(exam)) return;

  const existing = document.getElementById('examYearPickerGroup');
  if (existing) existing.remove();

  const base = EXAM_BASE_DATES[exam];
  if (!base) return;

  const group = document.createElement('div');
  group.id = 'examYearPickerGroup';
  group.className = 'form-section';
  group.innerHTML = `
    <div class="section-label">
      <span class="section-num">📅</span>
      <span>Exam Year चुनें</span> <span class="req-star">*</span>
    </div>
    <p class="section-hint">2026 से 2029 तक — जिस साल आप exam दे रहे हैं</p>
    <div class="year-picker-grid">
      ${[2026,2027,2028,2029].map(yr => `
        <label class="year-pick-card">
          <input type="radio" name="examYear" value="${yr}" ${yr===2026?'checked':''}
            onchange="updateExamYearDate(${yr}, ${base.month}, ${base.day})"/>
          <div class="ypc-content">
            <div class="ypc-year">${yr}</div>
            <div class="ypc-date">${getMonthName(base.month)} ${base.day}, ${yr}</div>
          </div>
          <div class="ypc-check">✓</div>
        </label>`).join('')}
    </div>
  `;

  // Insert before name section
  const nameSection = document.getElementById('userName')?.closest('.form-section');
  if (nameSection) nameSection.parentNode.insertBefore(group, nameSection);

  // Set initial date
  updateExamYearDate(2026, base.month, base.day);
}

function getMonthName(m) {
  return ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m];
}

function updateExamYearDate(year, month, day) {
  // Store selected year in userData for getExamDate override
  userData._selectedExamYear = year;
  userData._selectedExamMonth = month;
  userData._selectedExamDay = day;
}

// Override getExamDate to use year picker selection
const _origGetExamDate = typeof getExamDate === 'function' ? getExamDate : null;

function getExamDateWithYearPicker() {
  if (userData._selectedExamYear && userData._selectedExamMonth && userData._selectedExamDay) {
    return new Date(userData._selectedExamYear, userData._selectedExamMonth - 1, userData._selectedExamDay);
  }
  if (_origGetExamDate) return _origGetExamDate();
  return new Date(Date.now() + 365 * 86400000);
}

// Patch selectExam to inject year picker
const _origSelectExam = typeof selectExam === 'function' ? selectExam : null;

function selectExamWithYearPicker(exam) {
  if (_origSelectExam) _origSelectExam(exam);
  // After form is shown, inject year picker
  setTimeout(() => injectYearPickerIfNeeded(), 50);
}

// ── Init: patch functions on load ────────────────────────────
(function patchC25() {
  if (typeof window === 'undefined') return;

  // ── Single unified getExamDate patch ──────────────────────
  const origGED = window.getExamDate;
  window.getExamDate = function() {
    // Combined mode: use earlier of two exam dates
    if (userData.exam === 'combined' && userData._combinedExam1 && userData._combinedExam2) {
      const cfg1 = typeof getExamConfig === 'function' ? getExamConfig(userData._combinedExam1) : null;
      const cfg2 = typeof getExamConfig === 'function' ? getExamConfig(userData._combinedExam2) : null;
      const d1 = cfg1 ? new Date(cfg1.examDate) : null;
      const d2 = cfg2 ? new Date(cfg2.examDate) : null;
      if (d1 && d2) return d1 < d2 ? d1 : d2;
      return d1 || d2 || new Date(Date.now() + 365 * 86400000);
    }
    // Year picker mode: use user-selected year/month/day
    if (userData._selectedExamYear && userData._selectedExamMonth && userData._selectedExamDay) {
      return new Date(userData._selectedExamYear, userData._selectedExamMonth - 1, userData._selectedExamDay);
    }
    // Fallback to original
    return origGED ? origGED() : new Date(Date.now() + 365 * 86400000);
  };

  // ── Patch selectExam to inject year picker ─────────────────
  const origSE = window.selectExam;
  window.selectExam = function(exam) {
    if (origSE) origSE(exam);
    setTimeout(() => injectYearPickerIfNeeded(), 50);
  };

  // ── Patch getSyllabus for combined mode ────────────────────
  const origGS = window.getSyllabus;
  window.getSyllabus = function() {
    if (userData.exam === 'combined' && userData._combinedExam1 && userData._combinedExam2) {
      return getCombinedSyllabus(userData._combinedExam1, userData._combinedExam2);
    }
    return origGS ? origGS() : {};
  };
})();
