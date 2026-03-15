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
    document.getElementById('formHeaderIcon').textContent='🏫';
    document.getElementById('formTitle').textContent='BPSC TRE 4.0 — जानकारी भरें';
    document.getElementById('formSubtitle').textContent='Class 1-5 (PRT) या 6-8 (TGT) चुनें और plan पाएं';
    document.getElementById('nameNum').textContent='02';
    document.getElementById('dateNum').textContent='03';
    document.getElementById('hoursNum').textContent='04';
    document.getElementById('slotNum').textContent='05';
  } else {
    bg.classList.add('hidden');
    og.classList.remove('hidden');
    document.getElementById('formHeaderIcon').textContent='🏛️';
    document.getElementById('formTitle').textContent='UPSC CSE 2027 — जानकारी भरें';
    document.getElementById('formSubtitle').textContent='Prelims + Mains + Optional का personalized plan पाएं';
    document.getElementById('nameNum').textContent='02';
    document.getElementById('dateNum').textContent='03';
    document.getElementById('hoursNum').textContent='04';
    document.getElementById('slotNum').textContent='05';
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
const TG_BOT = '8623862519:AAEuV4PC4hJYJP3uaYbC0JEMcFG8IIvUde0';

async function tgGetChatId(username) {
  // We use getUpdates to find chat_id from recent messages
  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_BOT}/getUpdates`);
    const data = await res.json();
    if (!data.ok || !data.result.length) return null;
    // Find message from this username
    const clean = username.replace('@','').toLowerCase();
    for (const upd of data.result.reverse()) {
      const msg = upd.message || upd.channel_post;
      if (!msg) continue;
      const from = msg.from || msg.chat;
      if ((from.username||'').toLowerCase() === clean) return msg.chat.id;
    }
    return null;
  } catch(e) { return null; }
}

async function sendTelegramMessage(chatId, text) {
  try {
    await fetch(`https://api.telegram.org/bot${TG_BOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
  } catch(e) {}
}

function getTodayPlan() {
  if (!studyPlan.length) return null;
  const todayStr = new Date().toDateString();
  return studyPlan.find(d => d.date.toDateString() === todayStr) || studyPlan[0];
}

function formatTodayMessage(day) {
  if (!day) return '📅 Aaj ka plan nahi mila.';
  const exam = userData.exam === 'bpsc' ? 'BPSC TRE 4.0' : 'UPSC CSE 2027';
  let msg = `🎯 <b>ParikshaSathi — Day ${day.day}</b>\n`;
  msg += `📅 ${day.date.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}\n`;
  msg += `📚 <b>${exam}</b> — ${userData.name}\n\n`;
  const subjects = day.slots.filter(s => s.type === 'subject');
  subjects.forEach((s, i) => {
    const icons = ['☀️','🌤️','🌆'];
    msg += `${icons[i]||'📖'} <b>${s.subject.replace(/\[1-5\] /g,'').replace(/\[6-8\] /g,'')}</b>\n`;
    msg += `   📌 ${s.topic}\n`;
    if (s.microTopics && s.microTopics.length) {
      msg += `   • ${s.microTopics.slice(0,2).join('\n   • ')}\n`;
    }
    msg += '\n';
  });
  msg += `🔄 <b>Revision:</b> Kal ke topics dobara dekho\n`;
  msg += `📰 <b>Current Affairs:</b> 30 min — The Hindu / Jagran\n\n`;
  msg += `💪 All the best, ${userData.name}! — <i>Er. Sangam Krishna</i>`;
  return msg;
}

async function setupTelegramReminder() {
  const modal = document.getElementById('tgModal');
  if (modal) modal.classList.add('active');
}

function closeTgModal() {
  const modal = document.getElementById('tgModal');
  if (modal) modal.classList.remove('active');
}

async function connectTelegram() {
  const input = document.getElementById('tgUsernameInput');
  const statusEl = document.getElementById('tgStatus');
  const username = (input.value || '').trim().replace('@','');
  if (!username) { statusEl.textContent = '❌ Username daalo'; return; }

  statusEl.textContent = '⏳ Bot se connect ho raha hai...';

  // Ask user to message the bot first
  statusEl.innerHTML = `⏳ Pehle Telegram pe <a href="https://t.me/ParikshaSathiBot" target="_blank" style="color:#fbbf24">@ParikshaSathiBot</a> ko <b>/start</b> bhejo, phir OK dabao`;
  document.getElementById('tgConnectBtn').textContent = 'OK — /start bhej diya';
  document.getElementById('tgConnectBtn').onclick = async () => {
    statusEl.textContent = '⏳ Chat ID dhundh raha hai...';
    const chatId = await tgGetChatId(username);
    if (chatId) {
      localStorage.setItem('pariksha_tg_chatid', chatId);
      localStorage.setItem('pariksha_tg_username', username);
      // Send welcome message
      const today = getTodayPlan();
      await sendTelegramMessage(chatId, `✅ <b>ParikshaSathi se connect ho gaye!</b>\n\nNamaste ${userData.name}! 🙏\nAb aapko daily subah aaj ka study plan milega.\n\n` + formatTodayMessage(today));
      statusEl.innerHTML = `✅ <b>Connected!</b> Aapko Telegram pe aaj ka plan bhej diya gaya!`;
      document.getElementById('tgConnectBtn').textContent = 'बंद करें';
      document.getElementById('tgConnectBtn').onclick = closeTgModal;
    } else {
      statusEl.innerHTML = `❌ Chat ID nahi mila. Kya aapne <a href="https://t.me/ParikshaSathiBot" target="_blank" style="color:#fbbf24">@ParikshaSathiBot</a> ko <b>/start</b> bheja? Dobara try karo.`;
      document.getElementById('tgConnectBtn').textContent = 'Dobara Try Karo';
      document.getElementById('tgConnectBtn').onclick = connectTelegram;
    }
  };
}
