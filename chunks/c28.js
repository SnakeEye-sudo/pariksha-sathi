// c28.js — Feedback Widget + News App URL config

// ── News App URL — replace with actual URL when ready ────────
const NEWS_APP_URL = 'https://YOUR_NEWS_APP_URL_HERE';

// ── Feedback config ───────────────────────────────────────────
// Uses GitHub Actions webhook → Python → Telegram (no CORS issues)
// Set FEEDBACK_REPO to your GitHub repo (owner/repo format)
const FEEDBACK_REPO = 'snakeeyesudo/pariksha-sathi';
const FEEDBACK_GH_TOKEN = ''; // Leave empty — handled via public workflow_dispatch

const FB_TYPES = [
  { id: 'bug',     icon: '🐛', label: 'Bug / Galti mili',    color: '#ef4444' },
  { id: 'feature', icon: '💡', label: 'Feature Request',     color: '#f59e0b' },
  { id: 'content', icon: '📚', label: 'Content Galat hai',   color: '#8b5cf6' },
  { id: 'other',   icon: '💬', label: 'Kuch aur batana hai', color: '#10b981' },
];

let selectedFbType = 'other';

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

  const tip = document.createElement('div');
  tip.id = 'fbFloatTip';
  tip.className = 'fb-float-tip';
  tip.textContent = 'Kuch batana hai? 👆';
  document.body.appendChild(tip);
  setTimeout(() => tip.classList.add('fb-tip-hide'), 5000);
}

function showFeedbackModal() {
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
        placeholder="Yahan likho — kya galat hai, kya add karna chahte ho..."
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
  document.getElementById('fbTextarea').addEventListener('input', function() {
    document.getElementById('fbCharCount').textContent = this.value.length;
  });
}

function selectFbType(type) {
  selectedFbType = type;
  document.querySelectorAll('.fb-type-btn').forEach(b => {
    b.classList.toggle('fb-type-selected', b.dataset.type === type);
  });
}

function resetFeedbackModal() {
  selectedFbType = 'other';
  ['fbTextarea','fbNameInput'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  const st = document.getElementById('fbStatus'); if(st){st.textContent='';st.className='fb-status';}
  const cc = document.getElementById('fbCharCount'); if(cc) cc.textContent='0';
  document.querySelectorAll('.fb-type-btn').forEach(b => b.classList.remove('fb-type-selected'));
  const btn = document.getElementById('fbSubmitBtn');
  if(btn){btn.disabled=false;btn.textContent='📤 Bhejo Developer ko';}
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
  const examInfo = typeof userData !== 'undefined' && userData?.exam ? `Exam: ${userData.exam.toUpperCase()}` : 'Exam: N/A';
  const userInfo = name ? `User: ${name}` : 'User: Anonymous';
  const loginUser = window.psAuth?.currentUser?.email || '';

  const msgText = [
    `${typeObj.icon} ParikshaSathi Feedback`,
    `Type: ${typeObj.label}`,
    `${userInfo}${loginUser ? ` (${loginUser})` : ''}`,
    `${examInfo}`,
    ``,
    `Message:`,
    text,
    ``,
    `Sent from pariksha-sathi.in`,
  ].join('\n');

  if (btn) { btn.disabled = true; btn.textContent = 'Bhej raha hoon...'; }
  if (status) { status.textContent = ''; status.className = 'fb-status'; }

  // Send via GitHub Actions workflow_dispatch (no CORS issues)
  try {
    const res = await fetch(
      `https://api.github.com/repos/${FEEDBACK_REPO}/actions/workflows/send-feedback.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getFeedbackToken()}`,
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            message: msgText.substring(0, 1000),
            type: typeObj.id,
          }
        }),
      }
    );

    if (res.status === 204 || res.ok) {
      if (status) { status.textContent = '✅ Feedback pahunch gaya! Shukriya 🙏'; status.className = 'fb-status fb-success'; }
      if (btn) btn.textContent = '✅ Bhej diya!';
      setTimeout(closeFeedbackModal, 2500);
      return;
    }
  } catch(e) {}

  // Fallback: open Telegram directly
  if (status) {
    status.innerHTML = `Seedha Telegram pe bhejein:<br>
      <a href="https://t.me/snakeeyesudo" target="_blank" rel="noopener"
        style="color:var(--amber);font-weight:700;text-decoration:none">
        👉 t.me/snakeeyesudo
      </a>`;
    status.className = 'fb-status fb-error';
  }
  try { await navigator.clipboard.writeText(msgText); } catch(e) {}
  if (btn) { btn.disabled = false; btn.textContent = '📤 Bhejo Developer ko'; }
}

// Gets a public read-only token from meta tag (injected at build time or via env)
async function getFeedbackToken() {
  const meta = document.querySelector('meta[name="gh-feedback-token"]');
  return meta ? meta.content : '';
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(injectFeedbackButton, 1500);
});
