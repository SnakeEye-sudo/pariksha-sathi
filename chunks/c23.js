// ═══════════════════════════════════════════════════════════════
// c23.js — Checklist, Notifications, Reschedule, Streak
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

// ── Storage Keys ──────────────────────────────────────────────
const LS_CHECKLIST  = 'ps_checklist';   // { "YYYY-MM-DD_slotIdx": true }
const LS_STREAK     = 'ps_streak';      // { lastDate, count, longest }
const LS_RESCHEDULE = 'ps_reschedule';  // { "YYYY-MM-DD": [slot, slot, ...] }
const LS_NOTIF      = 'ps_notif';       // { enabled: bool, scheduledFor: dateStr }

// ── Overall plan checklist progress ──────────────────────────
function getPlanChecklistPct() {
  if (!studyPlan || !studyPlan.length) return 0;
  const cl = getChecklist();
  let total = 0, done = 0;
  studyPlan.forEach(day => {
    const dateStr = toDateKey(day.date);
    const subjects = day.slots.filter(s => s.type === 'subject');
    subjects.forEach((_, idx) => {
      total++;
      if (cl[checklistKey(dateStr, idx)]) done++;
    });
  });
  return total ? Math.round((done / total) * 100) : 0;
}

function updatePlanProgressBar() {
  const pct = getPlanChecklistPct();
  const bar = document.getElementById('planProgressBar');
  const label = document.getElementById('planProgressLabel');
  if (bar) bar.style.width = Math.max(2, pct) + '%';
  if (label) {
    const now = new Date();
    const daysLeft = Math.max(0, Math.ceil((getExamDate() - now) / 86400000));
    label.textContent = `${pct}% ${t('complete')} • ${lang === 'en' ? 'Exam in' : 'परीक्षा में'} ${daysLeft} ${t('daysLeft')}`;
  }
}

// ── Checklist helpers ─────────────────────────────────────────
function getChecklist() {
  try { return JSON.parse(localStorage.getItem(LS_CHECKLIST) || '{}'); } catch(e) { return {}; }
}
function saveChecklist(cl) {
  try { localStorage.setItem(LS_CHECKLIST, JSON.stringify(cl)); } catch(e) {}
}
function checklistKey(dateStr, slotIdx) { return `${dateStr}_${slotIdx}`; }

function toggleSlotCheck(dateStr, slotIdx, el) {
  const cl = getChecklist();
  const key = checklistKey(dateStr, slotIdx);
  if (cl[key]) { delete cl[key]; } else { cl[key] = true; }
  saveChecklist(cl);
  updateStreakOnCheck(dateStr);
  // Re-render just the day card's progress
  refreshDayProgress(dateStr);
  // Update top progress bar
  updatePlanProgressBar();
  // Refresh c24 widgets
  if (typeof refreshC24Widgets === 'function') refreshC24Widgets();
  // Animate the checkbox
  if (el) el.classList.toggle('checked', !!cl[key]);
  // Auto-save to cloud on topic check
  if (typeof window.psSaveToCloud === 'function') window.psSaveToCloud();
}

function getDayProgress(dateStr, totalSlots) {
  if (!totalSlots) return 0;
  const cl = getChecklist();
  let done = 0;
  for (let i = 0; i < totalSlots; i++) {
    if (cl[checklistKey(dateStr, i)]) done++;
  }
  return Math.round((done / totalSlots) * 100);
}

function refreshDayProgress(dateStr) {
  const bar = document.querySelector(`[data-day-progress="${dateStr}"]`);
  const label = document.querySelector(`[data-day-progress-label="${dateStr}"]`);
  if (!bar || !label) return;
  const total = parseInt(bar.getAttribute('data-total') || '0');
  const pct = getDayProgress(dateStr, total);
  bar.style.width = pct + '%';
  const isDone = pct === 100;
  bar.style.background = isDone ? 'var(--green)' : '';
  label.textContent = isDone
    ? (lang === 'hi' ? '✅ पूरा हो गया!' : '✅ Done!')
    : `${pct}% ${lang === 'hi' ? 'पढ़ा' : 'done'}`;
  // Mark day card as complete
  const card = document.querySelector(`[data-day-card="${dateStr}"]`);
  if (card) card.classList.toggle('day-completed', isDone);
}

// ── Streak helpers ────────────────────────────────────────────
function getStreak() {
  try { return JSON.parse(localStorage.getItem(LS_STREAK) || '{"lastDate":null,"count":0,"longest":0}'); }
  catch(e) { return { lastDate: null, count: 0, longest: 0 }; }
}
function saveStreak(s) {
  try { localStorage.setItem(LS_STREAK, JSON.stringify(s)); } catch(e) {}
}

function updateStreakOnCheck(dateStr) {
  // Only count today's activity for streak
  const todayStr = toDateKey(new Date());
  if (dateStr !== todayStr) return;

  const s = getStreak();
  if (s.lastDate === todayStr) return; // already counted today

  const yesterday = toDateKey(new Date(Date.now() - 86400000));
  if (s.lastDate === yesterday) {
    s.count++;
  } else {
    s.count = 1; // streak broken or first day
  }
  s.lastDate = todayStr;
  s.longest = Math.max(s.longest, s.count);
  saveStreak(s);
  renderStreakBadge();
}

function toDateKey(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function renderStreakBadge() {
  const el = document.getElementById('streakBadge');
  if (!el) return;
  const s = getStreak();
  const count = s.count || 0;
  const longest = s.longest || 0;

  // Determine tier
  const tier = count >= 30 ? 'diamond' : count >= 14 ? 'gold' : count >= 7 ? 'fire' : count >= 3 ? 'spark' : 'start';
  const tierConfig = {
    diamond: { icon:'💎', color:'#a78bfa', glow:'rgba(167,139,250,.4)', label: lang==='hi'?'Diamond Streak':'Diamond Streak' },
    gold:    { icon:'🏆', color:'#fbbf24', glow:'rgba(251,191,36,.4)',  label: lang==='hi'?'Gold Streak':'Gold Streak' },
    fire:    { icon:'🔥', color:'#f97316', glow:'rgba(249,115,22,.4)',  label: lang==='hi'?'Fire Streak':'Fire Streak' },
    spark:   { icon:'⚡', color:'#facc15', glow:'rgba(250,204,21,.4)',  label: lang==='hi'?'Spark Streak':'Spark Streak' },
    start:   { icon:'📅', color:'#94a3b8', glow:'rgba(148,163,184,.2)', label: lang==='hi'?'Streak':'Streak' },
  };
  const cfg = tierConfig[tier];

  // Build circular progress (max 30 days for full circle)
  const maxDays = tier === 'diamond' ? 60 : tier === 'gold' ? 30 : tier === 'fire' ? 14 : tier === 'spark' ? 7 : 3;
  const pct = Math.min(100, Math.round((count / maxDays) * 100));
  const circumference = 2 * Math.PI * 20; // r=20
  const dashOffset = circumference - (pct / 100) * circumference;

  el.innerHTML = `
    <div class="streak-badge-inner" style="--streak-color:${cfg.color};--streak-glow:${cfg.glow}">
      <div class="streak-ring-wrap">
        <svg class="streak-ring-svg" viewBox="0 0 48 48" width="64" height="64">
          <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="3.5"/>
          <circle cx="24" cy="24" r="20" fill="none" stroke="${cfg.color}" stroke-width="3.5"
            stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"
            stroke-linecap="round" transform="rotate(-90 24 24)"
            style="filter:drop-shadow(0 0 4px ${cfg.color});transition:stroke-dashoffset .6s ease"/>
        </svg>
        <div class="streak-ring-center">
          <span class="streak-ring-icon">${cfg.icon}</span>
          <span class="streak-ring-num" style="color:${cfg.color}">${count}</span>
        </div>
      </div>
      <div class="streak-info">
        <div class="streak-label" style="color:${cfg.color}">${cfg.label}</div>
        <div class="streak-days-text">${lang==='hi' ? `${count} दिन लगातार` : `${count} day${count!==1?'s':''} in a row`}</div>
        <div class="streak-best-text">${lang==='hi' ? `🏅 Best: ${longest} दिन` : `🏅 Best: ${longest} day${longest!==1?'s':''}`}</div>
      </div>
    </div>
  `;
  el.title = lang === 'hi' ? `सबसे लंबी streak: ${longest} दिन` : `Longest streak: ${longest} days`;
}

// ── Reschedule helpers ────────────────────────────────────────
function getRescheduleData() {
  try { return JSON.parse(localStorage.getItem(LS_RESCHEDULE) || '{}'); } catch(e) { return {}; }
}
function saveRescheduleData(d) {
  try { localStorage.setItem(LS_RESCHEDULE, JSON.stringify(d)); } catch(e) {}
}

function rescheduleDay(dateStr) {
  const dayObj = studyPlan.find(d => toDateKey(d.date) === dateStr);
  if (!dayObj) return;

  const subjectSlots = dayObj.slots.filter(s => s.type === 'subject');
  if (!subjectSlots.length) {
    alert(lang === 'hi' ? 'इस दिन कोई subject slot नहीं है।' : 'No subject slots on this day.');
    return;
  }

  // Find next 2 available days (not mock/revision)
  const dayDate = new Date(dateStr);
  const nextDays = [];
  for (const d of studyPlan) {
    if (d.date > dayDate && !d.isMock && !d.isRevision) {
      nextDays.push(d);
      if (nextDays.length === 2) break;
    }
  }
  if (!nextDays.length) {
    alert(lang === 'hi' ? 'Reschedule के लिए कोई अगला दिन नहीं मिला।' : 'No next day found for rescheduling.');
    return;
  }

  // Split slots: first half → day1, second half → day2 (if exists)
  const half = Math.ceil(subjectSlots.length / 2);
  const batch1 = subjectSlots.slice(0, half);
  const batch2 = subjectSlots.slice(half);

  const rd = getRescheduleData();
  const cl = getChecklist();

  // Move batch1 to nextDays[0]
  const d1Str = toDateKey(nextDays[0].date);
  if (!rd[d1Str]) rd[d1Str] = [];
  batch1.forEach((slot, idx) => {
    rd[d1Str].push({ ...slot, rescheduledFrom: dateStr, _origIdx: idx });
    // Move checklist key: original idx → new day
    const origKey = checklistKey(dateStr, dayObj.slots.indexOf(slot));
    const newKey  = checklistKey(d1Str, rd[d1Str].length - 1 + 1000); // offset to avoid collision
    if (cl[origKey]) { cl[newKey] = true; delete cl[origKey]; }
  });

  // Move batch2 to nextDays[1] if exists, else also to nextDays[0]
  if (batch2.length) {
    const d2 = nextDays[1] || nextDays[0];
    const d2Str = toDateKey(d2.date);
    if (!rd[d2Str]) rd[d2Str] = [];
    batch2.forEach((slot, idx) => {
      rd[d2Str].push({ ...slot, rescheduledFrom: dateStr, _origIdx: half + idx });
      const origKey = checklistKey(dateStr, dayObj.slots.indexOf(slot));
      const newKey  = checklistKey(d2Str, rd[d2Str].length - 1 + 1000);
      if (cl[origKey]) { cl[newKey] = true; delete cl[origKey]; }
    });
  }

  saveRescheduleData(rd);

  // Mark original day as rescheduled
  cl[`${dateStr}_rescheduled`] = true;
  saveChecklist(cl);

  renderPlan();

  const d1Display = nextDays[0].date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day:'numeric', month:'long' });
  const d2Display = nextDays[1]
    ? nextDays[1].date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day:'numeric', month:'long' })
    : null;

  const msg = d2Display && batch2.length
    ? (lang === 'hi'
        ? `✅ ${batch1.length} topics → ${d1Display}, ${batch2.length} topics → ${d2Display}`
        : `✅ ${batch1.length} topics → ${d1Display}, ${batch2.length} topics → ${d2Display}`)
    : (lang === 'hi'
        ? `✅ ${subjectSlots.length} topics → ${d1Display} में move हो गए`
        : `✅ ${subjectSlots.length} topics moved to ${d1Display}`);
  showToast(msg, 'green');
}

function getRescheduledSlotsForDay(dateStr) {
  const rd = getRescheduleData();
  return rd[dateStr] || [];
}

// ── Toast helper ──────────────────────────────────────────────
function showToast(msg, color = 'amber') {
  let toast = document.getElementById('psToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'psToast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `ps-toast ps-toast-${color} show`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Browser Notification (4 AM daily) ────────────────────────
function getNotifSettings() {
  try { return JSON.parse(localStorage.getItem(LS_NOTIF) || '{"enabled":false}'); } catch(e) { return { enabled: false }; }
}
function saveNotifSettings(s) {
  try { localStorage.setItem(LS_NOTIF, JSON.stringify(s)); } catch(e) {}
}

async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast(lang === 'hi' ? 'यह browser notifications support नहीं करता।' : 'Browser does not support notifications.', 'red');
    return false;
  }
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') {
    showToast(lang === 'hi' ? 'Notifications blocked हैं। Browser settings से allow करें।' : 'Notifications blocked. Allow in browser settings.', 'red');
    return false;
  }
  const perm = await Notification.requestPermission();
  return perm === 'granted';
}

async function toggleDailyNotification() {
  const btn = document.getElementById('notifToggleBtn');
  const ns = getNotifSettings();

  if (ns.enabled) {
    ns.enabled = false;
    saveNotifSettings(ns);
    if (btn) { btn.textContent = lang === 'hi' ? '🔔 Notification चालू करें' : '🔔 Enable Notification'; btn.classList.remove('notif-on'); }
    showToast(lang === 'hi' ? 'Notifications बंद कर दी गईं।' : 'Notifications disabled.', 'amber');
    return;
  }

  const granted = await requestNotificationPermission();
  if (!granted) return;

  ns.enabled = true;
  saveNotifSettings(ns);
  if (btn) { btn.textContent = lang === 'hi' ? '🔕 Notification बंद करें' : '🔕 Disable Notification'; btn.classList.add('notif-on'); }
  showToast(lang === 'hi' ? '✅ Notifications चालू! रोज़ सुबह 4 बजे reminder आएगा।' : '✅ Notifications on! Daily 4 AM reminder set.', 'green');
  scheduleNextNotification();
}

function scheduleNextNotification() {
  const ns = getNotifSettings();
  if (!ns.enabled || Notification.permission !== 'granted') return;

  const now = new Date();
  const next4am = new Date(now);
  next4am.setHours(4, 0, 0, 0);
  if (next4am <= now) next4am.setDate(next4am.getDate() + 1);

  const msUntil = next4am - now;

  setTimeout(() => {
    fireNotification();
    // Schedule next day
    setInterval(fireNotification, 24 * 60 * 60 * 1000);
  }, msUntil);
}

function fireNotification() {
  const ns = getNotifSettings();
  if (!ns.enabled || Notification.permission !== 'granted') return;

  const todayStr = toDateKey(new Date());
  const todayPlan = studyPlan.find(d => toDateKey(d.date) === todayStr);
  let body = '';
  if (todayPlan) {
    const subjects = todayPlan.slots.filter(s => s.type === 'subject').map(s => s.topic).slice(0, 3);
    body = subjects.length
      ? (lang === 'hi' ? `आज पढ़ें: ${subjects.join(', ')}` : `Today: ${subjects.join(', ')}`)
      : (lang === 'hi' ? 'आज का plan देखें!' : 'Check today\'s plan!');
  } else {
    body = lang === 'hi' ? 'ParikshaSathi — आज का plan देखें!' : 'ParikshaSathi — Check today\'s plan!';
  }

  new Notification(lang === 'hi' ? '📚 ParikshaSathi — सुबह 4 बजे' : '📚 ParikshaSathi — 4 AM Reminder', {
    body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'pariksha-daily',
    renotify: true
  });
}

// ── Init on plan load ─────────────────────────────────────────
function initFeatures() {
  renderStreakBadge();
  // Restore notification button state
  const ns = getNotifSettings();
  const btn = document.getElementById('notifToggleBtn');
  if (btn) {
    if (ns.enabled) {
      btn.textContent = lang === 'hi' ? '🔕 Notification बंद करें' : '🔕 Disable Notification';
      btn.classList.add('notif-on');
      scheduleNextNotification();
    } else {
      btn.textContent = lang === 'hi' ? '🔔 Notification चालू करें' : '🔔 Enable Notification';
      btn.classList.remove('notif-on');
    }
  }
  // Refresh all day progress bars
  studyPlan.forEach(day => {
    const dateStr = toDateKey(day.date);
    refreshDayProgress(dateStr);
  });
}

// ── Patch generateDayPlanHTML to inject checklist + reschedule ─
// We override the slot card rendering by patching renderPlan
const _origRenderPlan = typeof renderPlan === 'function' ? renderPlan : null;

function renderPlanWithFeatures() {
  if (_origRenderPlan) _origRenderPlan();

  // Inject streak badge + notification button into plan header
  injectPlanHeaderExtras();

  // Patch each day card with checklist checkboxes + reschedule button
  patchDayCards();

  // Init feature state
  initFeatures();
}

function injectPlanHeaderExtras() {
  // Add streak badge near plan progress area if not already there
  if (!document.getElementById('streakBadge')) {
    const progressLabel = document.getElementById('planProgressLabel');
    if (progressLabel) {
      const wrap = document.createElement('div');
      wrap.className = 'plan-extras-row';
      wrap.innerHTML = `
        <div id="streakBadge" class="streak-badge"></div>
        <button id="notifToggleBtn" class="notif-btn" onclick="toggleDailyNotification()">
          🔔 ${lang === 'hi' ? 'Notification चालू करें' : 'Enable Notification'}
        </button>
      `;
      progressLabel.parentNode.insertBefore(wrap, progressLabel.nextSibling);
    }
  }
}

function patchDayCards() {
  if (!studyPlan.length) return;
  const cl = getChecklist();

  studyPlan.forEach(day => {
    const dateStr = toDateKey(day.date);
    const isRescheduled = !!cl[`${dateStr}_rescheduled`];

    // Find the day card by looking for day-num-val matching day.day
    // We'll use a data attribute approach — find cards and add data attrs
    const allCards = document.querySelectorAll('.day-card, .today-card, .mock-day, .revision-day');
    allCards.forEach(card => {
      const numEl = card.querySelector('.day-num-val');
      if (!numEl || numEl.textContent.trim() !== String(day.day)) return;
      if (card.getAttribute('data-day-card')) return; // already patched

      card.setAttribute('data-day-card', dateStr);

      // Get subject slots for this day (including rescheduled ones)
      const rescheduledSlots = getRescheduledSlotsForDay(dateStr);
      const allSlots = [...day.slots, ...rescheduledSlots];
      const subjectSlots = allSlots.filter(s => s.type === 'subject');
      const totalSlots = subjectSlots.length;

      if (totalSlots === 0) return;

      // Inject progress bar
      const header = card.querySelector('.day-header');
      if (header && !card.querySelector('.day-checklist-progress')) {
        const pct = getDayProgress(dateStr, totalSlots);
        const isDone = pct === 100;
        const progressHTML = `
          <div class="day-checklist-progress">
            <div class="day-progress-bar-wrap">
              <div class="day-progress-bar ${isDone ? 'done' : ''}"
                   data-day-progress="${dateStr}"
                   data-total="${totalSlots}"
                   style="width:${pct}%;${isDone ? 'background:var(--green)' : ''}">
              </div>
            </div>
            <span class="day-progress-label" data-day-progress-label="${dateStr}">
              ${isDone ? (lang === 'hi' ? '✅ पूरा हो गया!' : '✅ Done!') : `${pct}% ${lang === 'hi' ? 'पढ़ा' : 'done'}`}
            </span>
          </div>`;
        header.insertAdjacentHTML('afterend', progressHTML);
      }

      // Inject checkboxes into each slot card
      const slotCards = card.querySelectorAll('.subject-slot-card');
      slotCards.forEach((slotCard, idx) => {
        if (slotCard.querySelector('.slot-checkbox')) return;
        const key = checklistKey(dateStr, idx);
        const isChecked = !!cl[key];
        const checkHTML = `<label class="slot-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleSlotCheck('${dateStr}', ${idx}, this)" title="${lang === 'hi' ? 'पढ़ लिया' : 'Mark as done'}">
          <span class="checkbox-icon">${isChecked ? '✓' : ''}</span>
        </label>`;
        slotCard.style.position = 'relative';
        slotCard.insertAdjacentHTML('beforeend', checkHTML);
        if (isChecked) slotCard.classList.add('slot-done');
      });

      // Inject reschedule button (only for past/today days that aren't mock/revision)
      const isToday = dateStr === toDateKey(new Date());
      const isPast = day.date < new Date() && !isToday;
      if ((isToday || isPast) && !day.isMock && !day.isRevision) {
        const slotsGrid = card.querySelector('.slots-grid');
        if (slotsGrid && !card.querySelector('.reschedule-btn')) {
          const reschedHTML = isRescheduled
            ? `<div class="reschedule-done-badge">↩️ ${lang === 'hi' ? 'Reschedule हो गया' : 'Rescheduled'}</div>`
            : `<button class="reschedule-btn" onclick="rescheduleDay('${dateStr}')">
                ↩️ ${lang === 'hi' ? 'आज नहीं पढ़ पाया — Reschedule करें' : 'Couldn\'t study today — Reschedule'}
               </button>`;
          slotsGrid.insertAdjacentHTML('afterend', reschedHTML);
        }
      }

      // Show rescheduled slots if any
      if (rescheduledSlots.length > 0) {
        const slotsGrid = card.querySelector('.slots-grid');
        if (slotsGrid && !card.querySelector('.rescheduled-slots-section')) {
          const rHTML = `<div class="rescheduled-slots-section">
            <div class="rescheduled-label">↩️ ${lang === 'hi' ? 'Reschedule किए गए topics:' : 'Rescheduled topics:'}</div>
            ${rescheduledSlots.map(s => `<div class="rescheduled-slot-tag" style="border-color:${s.color||'var(--amber)'}40;color:${s.color||'var(--amber)'}">
              ${s.topic}${s.rescheduledFrom ? ` <span class="from-date">(${s.rescheduledFrom})</span>` : ''}
            </div>`).join('')}
          </div>`;
          slotsGrid.insertAdjacentHTML('afterend', rHTML);
        }
      }
    });
  });
}

// c23 features are injected directly from renderPlan() in c09.js via setTimeout

