// ParikshaSathi — Smart Study Planner | By Er. Sangam Krishna
let selectedExam='',userData={},studyPlan=[];

// ── LocalStorage helpers ──────────────────────────────────────
const LS_KEY = 'pariksha_sathi_plan';

function savePlanToStorage() {
  try {
    const payload = {
      userData: {
        ...userData,
        startDate: userData.startDate ? userData.startDate.toISOString() : null
      },
      selectedExam,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  } catch(e) {}
}

function loadPlanFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const payload = JSON.parse(raw);
    if (!payload.userData || !payload.userData.name) return false;
    selectedExam = payload.selectedExam || '';
    userData = { ...payload.userData, startDate: new Date(payload.userData.startDate) };
    studyPlan = buildPlan();
    return true;
  } catch(e) { return false; }
}

function clearSavedPlan() {
  localStorage.removeItem(LS_KEY);
  localStorage.removeItem('pariksha_tg_chatid');
  localStorage.removeItem('ps_checklist');
  localStorage.removeItem('ps_streak');
  localStorage.removeItem('ps_reschedule');
  showScreen('welcomeScreen');
}

function confirmResetPlan() {
  const modal = document.getElementById('resetConfirmModal');
  if (modal) {
    modal.classList.add('open');
  } else {
    // fallback if modal not found
    if (confirm(lang === 'hi'
      ? 'सारा progress delete हो जाएगा! क्या आप sure हैं?'
      : 'All progress will be deleted! Are you sure?')) {
      clearSavedPlan();
    }
  }
}

function doResetPlan() {
  document.getElementById('resetConfirmModal').classList.remove('open');
  clearSavedPlan();
}

// ── Screen helpers ────────────────────────────────────────────
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function selectExam(exam){
  selectedExam=exam;
  const bg=document.getElementById('bpscClassGroup');
  const og=document.getElementById('upscOptionalGroup');
  const yg=document.getElementById('upscYearGroup');

  // Get category from registry or legacy
  const cfg = getExamConfig(exam);
  const category = cfg ? cfg.category : (exam === 'bpsc' ? 'teaching' : 'civil_services');
  const icon = cfg ? cfg.icon : (exam === 'bpsc' ? '🏫' : '🏛️');
  const title = cfg ? cfg.title : (exam === 'bpsc' ? 'BPSC TRE 4.0' : 'UPSC CSE');
  const subtitle = cfg ? cfg.subtitle : '';

  // Show/hide form sections based on category
  if (exam === 'bpsc' || exam === 'bpsc_tre') {
    bg.classList.remove('hidden');
    og.classList.add('hidden');
    yg.classList.add('hidden');
    document.getElementById('nameNum').textContent='02';
    document.getElementById('dateNum').textContent='03';
    document.getElementById('hoursNum').textContent='04';
    document.getElementById('slotNum').textContent='05';
  } else if (category === 'civil_services') {
    bg.classList.add('hidden');
    og.classList.remove('hidden');
    yg.classList.remove('hidden');
    document.getElementById('nameNum').textContent='03';
    document.getElementById('dateNum').textContent='04';
    document.getElementById('hoursNum').textContent='05';
    document.getElementById('slotNum').textContent='06';
  } else {
    // Banking, SSC, Defence, State PSC — no special sub-selections
    bg.classList.add('hidden');
    og.classList.add('hidden');
    yg.classList.add('hidden');
    document.getElementById('nameNum').textContent='01';
    document.getElementById('dateNum').textContent='02';
    document.getElementById('hoursNum').textContent='03';
    document.getElementById('slotNum').textContent='04';
  }

  document.getElementById('formHeaderIcon').textContent=icon;
  document.getElementById('formTitle').textContent=title+' — '+(lang==='en'?'Fill Details':'जानकारी भरें');
  document.getElementById('formSubtitle').textContent=subtitle || (lang==='en'?'Fill in your details to get a personalized plan':'सभी जानकारी भरें और अपना personalized plan पाएं');
  showScreen('formScreen');
}

function showTab(tabName){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b=>{
    if(b.getAttribute('onclick')===`showTab('${tabName}')`) b.classList.add('active');
  });
}

function toggleAccordion(el){
  const body=el.nextElementSibling;
  const arrow=el.querySelector('.syl-arrow');
  body.classList.toggle('open');
  arrow.style.transform=body.classList.contains('open')?'rotate(180deg)':'rotate(0deg)';
}

// ── Telegram Bot Integration ──────────────────────────────────
