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
  showScreen('welcomeScreen');
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
  if(exam==='bpsc'){
    bg.classList.remove('hidden');
    og.classList.add('hidden');
    document.getElementById('upscYearGroup').classList.add('hidden');
    document.getElementById('formHeaderIcon').textContent='🏫';
    document.getElementById('formTitle').textContent=t('formTitleBpsc');
    document.getElementById('formSubtitle').textContent=t('formSubBpsc');
    document.getElementById('nameNum').textContent='02';
    document.getElementById('dateNum').textContent='03';
    document.getElementById('hoursNum').textContent='04';
    document.getElementById('slotNum').textContent='05';
  } else {
    bg.classList.add('hidden');
    og.classList.remove('hidden');
    document.getElementById('upscYearGroup').classList.remove('hidden');
    document.getElementById('formHeaderIcon').textContent='🏛️';
    document.getElementById('formTitle').textContent=t('formTitleUpsc');
    document.getElementById('formSubtitle').textContent=t('formSubUpsc');
    document.getElementById('nameNum').textContent='03';
    document.getElementById('dateNum').textContent='04';
    document.getElementById('hoursNum').textContent='05';
    document.getElementById('slotNum').textContent='06';
  }
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
