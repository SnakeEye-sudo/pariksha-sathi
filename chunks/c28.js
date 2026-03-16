// c28.js — Feedback Widget + News App URL config

// ── News App URL — replace with actual URL when ready ────────
// Format: NEWS_APP_URL + '?date=YYYY-MM-DD' will be opened on CA card click
const NEWS_APP_URL = 'https://YOUR_NEWS_APP_URL_HERE';

// ── Feedback Widget ───────────────────────────────────────────
// Sends feedback directly to developer's Telegram via bot
const FB_BOT_TOKEN = '8623862519:AAEuV4PC4hJYJP3uaYbC0JEMcFG8IIvUde0';
const FB_CHAT_ID   = '1618744678';

const FB_TYPES = [
  { id: 'bug',     icon: '🐛', label: 'Bug / Galti mili',    color: '#ef4444' },
  { id: 'feature', icon: '💡', label: 'Feature Request',     color: '#f59e0b' },
  { id: 'content', icon: '📚', label: 'Content Galat hai',   color: '#8b5cf6' },
  { id: 'other',   icon: '💬', label: 'Kuch aur batana hai', color: '#10b981' },
];

function injectFeedbackButton() {
  if (document.getElementById('fbFloatBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'fbFloatBtn';
  btn.className = 'fb-float-btn';
  btn.innerHTML = '💬';
  btn.title = 'Feedback / Suggestion bhejein';
  btn.setAttribute('aria-label', 'Feedback bhejein');
  btn.onclick = showFeedbackModal;
  document.body.appendChild(btn);

  // Tooltip that pulses once to draw attention
  const tip = document.createElement('div');
  tip.id = 'fbFloatTip';
  tip.className = 'fb-float-tip';
  tip.textContent = 'Kuch batana hai? 👆';
  document.body.appendChild(tip);
  setTimeout(() => tip.classList.add('fb-tip-hide'), 5000);
}

function showFeedbackModal() {
  // Hide tooltip
  const tip = document.getElementById('fbFloatTip');
  if (tip) tip.classList.add('fb-tip-hide');

  let modal = document.getElementById('fbModal');
  if (modal) { modal.style.display = 'flex'; resetFeedbackModal(); return; }

  modal = document.createElement('div');
  modal.id = 'fbModal';
  modal.className = 'fb-modal-overlay';
  modal.innerHTML = `
    <div class="fb-modal">
      <button class="fb-modal-close" onclick="closeFeedbackModal()" aria-label="Close">✕</button>
      <div class="fb-modal-icon">💬</div>
      <div class="fb-modal-title">Feedback / Suggestion</div>
      <div class="fb-modal-sub">Aapki baat seedhi developer tak pahunchegi</div>

      <div class="fb-type-grid" id="fbTypeGrid">
        ${FB_TYPES.map(t => `
          <button class="fb-type-btn" data-type="${t.id}" onclick="selectFbType('${t.id}')"
            style="--fb-color:${t.color}">
            <span class="fb-type-icon">${t.icon}</span>
            <span class="fb-type-label">${t.label}</span>
          </button>
        `).join('')}
      </div>

      <textarea id="fbTextarea" class="fb-textarea"
        placeholder="Yahan likho — kya galat hai, kya add karna chahte ho, ya koi bhi baat..."
        rows="4" maxlength="1000"></textarea>
      <div class="fb-char-count"><span id="fbCharCount">0</span>/1000</div>

      <div class="fb-name-row">
        <input type="text" id="fbNameInput" class="fb-name-input"
          placeholder="Aapka naam (optional)" maxlength="50">
      </div>

      <button class="fb-submit-btn" id="fbSubmitBtn" onclick="submitFeedback()">
        📤 Bhejo Developer ko
      </button>
      <div id="fbStatus" class="fb-status"></div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) closeFeedbackModal(); });

  // Char counter
  document.getElementById('fbTextarea').addEventListener('input', function() {
    document.getElementById('fbCharCount').textContent = this.value.length;
  });
}

let selectedFbType = 'other';
function selectFbType(type) {
  selectedFbType = type;
  document.querySelectorAll('.fb-type-btn').forEach(b => {
    b.classList.toggle('fb-type-selected', b.dataset.type === type);
  });
}

function resetFeedbackModal() {
  selectedFbType = 'other';
  const ta = document.getElementById('fbTextarea');
  const st = document.getElementById('fbStatus');
  const cc = document.getElementById('fbCharCount');
  const ni = document.getElementById('fbNameInput');
  if (ta) ta.value = '';
  if (st) { st.textContent = ''; st.className = 'fb-status'; }
  if (cc) cc.textContent = '0';
  if (ni) ni.value = '';
  document.querySelectorAll('.fb-type-btn').forEach(b => b.classList.remove('fb-type-selected'));
}

function closeFeedbackModal() {
  const modal = document.getElementById('fbModal');
  if (modal) modal.style.display = 'none';
}

async function submitFeedback() {
  const text = (document.getElementById('fbTextarea')?.value || '').trim();
  const name = (document.getElementById('fbNameInput')?.value || '').trim();
  const status = document.getElementById('fbStatus');
  const btn = document.getElementById('fbSubmitBtn');

  if (!text) {
    if (status) { status.textContent = 'Kuch to likho pehle! 😊'; status.className = 'fb-status fb-error'; }
    return;
  }

  const typeObj = FB_TYPES.find(t => t.id === selectedFbType) || FB_TYPES[3];
  const examInfo = typeof userData !== 'undefined' && userData.exam
    ? `Exam: ${userData.exam.toUpperCase()}` : 'Exam: N/A';
  const userInfo = name ? `User: ${name}` : 'User: Anonymous';
  const loginUser = window.psAuth?.currentUser?.email || '';

  const msg = [
    `${typeObj.icon} <b>ParikshaSathi Feedback</b>`,
    ``,
    `<b>Type:</b> ${typeObj.label}`,
    `<b>${userInfo}</b>${loginUser ? ` (${loginUser})` : ''}`,
    `<b>${examInfo}</b>`,
    ``,
    `<b>Message:</b>`,
    text,
    ``,
    `<i>Sent from pariksha-sathi.in</i>`,
  ].join('\n');

  if (btn) { btn.disabled = true; btn.textContent = 'Bhej raha hoon...'; }
  if (status) { status.textContent = ''; status.className = 'fb-status'; }

  try {
    const res = await fetch(`https://api.telegram.org/bot${FB_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: FB_CHAT_ID, text: msg, parse_mode: 'HTML' }),
    });
    const data = await res.json();
    if (data.ok) {
      if (status) { status.textContent = '✅ Feedback pahunch gaya! Shukriya 🙏'; status.className = 'fb-status fb-success'; }
      if (btn) { btn.textContent = '✅ Bhej diya!'; }
      setTimeout(closeFeedbackModal, 2500);
    } else {
      throw new Error(data.description || 'Failed');
    }
  } catch(e) {
    if (status) { status.textContent = 'Nahi bheja ja saka. Internet check karein.'; status.className = 'fb-status fb-error'; }
    if (btn) { btn.disabled = false; btn.textContent = '📤 Bhejo Developer ko'; }
  }
}

// ── Auto-inject on load ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Inject feedback button after a short delay so page loads first
  setTimeout(injectFeedbackButton, 1500);
});
