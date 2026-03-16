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

const TG_BOT_USERNAME = 'parikshaasathi_bot';

async function saveTelegramChatId(chatId) {
  if (!window.psDb || !window.psAuth?.currentUser) return false;
  try {
    const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js');
    await setDoc(
      doc(window.psDb, 'users', window.psAuth.currentUser.uid),
      { telegramChatId: String(chatId), telegramLinkedAt: new Date().toISOString() },
      { merge: true }
    );
    localStorage.setItem('pariksha_tg_chatid', String(chatId));
    return true;
  } catch(e) { console.error('TG save failed:', e); return false; }
}

function showTelegramLinkModal() {
  let modal = document.getElementById('tgLinkModal');
  if (modal) { modal.style.display = 'flex'; return; }
  modal = document.createElement('div');
  modal.id = 'tgLinkModal';
  modal.className = 'tg-modal-overlay';
  modal.innerHTML = `
    <div class="tg-modal">
      <button class="tg-modal-close" onclick="document.getElementById('tgLinkModal').style.display='none'">x</button>
      <div class="tg-modal-icon">📱</div>
      <div class="tg-modal-title">Telegram से जोड़ें</div>
      <div class="tg-modal-sub">Daily study reminder Telegram पर पाएं</div>
      <div class="tg-steps">
        <div class="tg-step"><span class="tg-step-num">1</span><div class="tg-step-text">Telegram पर <a href="https://t.me/${TG_BOT_USERNAME}" target="_blank" class="tg-bot-link">@${TG_BOT_USERNAME}</a> खोलें और <b>/start</b> भेजें</div></div>
        <div class="tg-step"><span class="tg-step-num">2</span><div class="tg-step-text"><a href="https://t.me/userinfobot" target="_blank" class="tg-bot-link">@userinfobot</a> पर भी /start भेजें — वो आपका Chat ID बताएगा</div></div>
        <div class="tg-step"><span class="tg-step-num">3</span><div class="tg-step-text">नीचे Chat ID डालें और Save करें</div></div>
      </div>
      <input type="number" id="tgChatIdInput" class="tg-chat-input" placeholder="Chat ID डालें (जैसे: 123456789)">
      <button class="tg-confirm-btn" onclick="confirmTelegramLink()">✅ Save करें</button>
      <div id="tgLinkStatus" class="tg-link-status"></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
}

async function confirmTelegramLink() {
  const input = document.getElementById('tgChatIdInput');
  const status = document.getElementById('tgLinkStatus');
  const chatId = input?.value?.trim();
  if (!chatId || isNaN(chatId)) {
    if (status) { status.textContent = 'Valid Chat ID डालें'; status.style.color = '#f87171'; }
    return;
  }
  if (status) { status.textContent = 'Saving...'; status.style.color = 'rgba(255,255,255,.5)'; }
  const ok = await saveTelegramChatId(chatId);
  if (ok) {
    if (status) { status.textContent = 'Telegram link हो गया! कल से reminder आएगा।'; status.style.color = '#10b981'; }
    setTimeout(() => { const m = document.getElementById('tgLinkModal'); if(m) m.style.display='none'; }, 2500);
    injectTelegramBadge(true);
  } else {
    if (status) { status.textContent = 'Save नहीं हुआ। Login check करें।'; status.style.color = '#f87171'; }
  }
}

function injectTelegramBadge(linked) {
  const existing = document.getElementById('tgTopbarBtn');
  if (existing) { existing.textContent = linked ? '📱 Telegram ✓' : '📱 Telegram'; existing.classList.toggle('tg-linked', linked); return; }
  const actions = document.querySelector('.plan-topbar-actions');
  if (!actions) return;
  const btn = document.createElement('button');
  btn.id = 'tgTopbarBtn';
  btn.className = 'ptb-btn ptb-tg' + (linked ? ' tg-linked' : '');
  btn.textContent = linked ? '📱 Telegram ✓' : '📱 Telegram';
  btn.onclick = showTelegramLinkModal;
  btn.title = 'Telegram daily reminder';
  const pdfBtn = actions.querySelector('.ptb-download');
  if (pdfBtn) actions.insertBefore(btn, pdfBtn); else actions.appendChild(btn);
}

async function initTelegramIntegration() {
  const localId = localStorage.getItem('pariksha_tg_chatid');
  if (localId) { injectTelegramBadge(true); return; }
  if (!window.psDb || !window.psAuth?.currentUser) { setTimeout(initTelegramIntegration, 1500); return; }
  try {
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js');
    const snap = await getDoc(doc(window.psDb, 'users', window.psAuth.currentUser.uid));
    if (snap.exists() && snap.data().telegramChatId) {
      localStorage.setItem('pariksha_tg_chatid', snap.data().telegramChatId);
      injectTelegramBadge(true);
    } else {
      injectTelegramBadge(false);
    }
  } catch { injectTelegramBadge(false); }
}
