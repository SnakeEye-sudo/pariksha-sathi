// c26.js — Google Calendar Export (.ics) + FCM Push Notifications

// ── ICS helpers ──────────────────────────────────────────────
function icsDate(date) {
  // Format: YYYYMMDDTHHMMSSZ
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function icsEscape(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function generateUID() {
  return 'ps-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9) + '@pariksha-sathi';
}

// ── Build .ics content from studyPlan ────────────────────────
function buildICSContent(mode) {
  // mode: 'full' | 'week' | 'today'
  const now = new Date();
  const todayStr = now.toDateString();

  let days = studyPlan;
  if (mode === 'today') {
    days = studyPlan.filter(d => d.date.toDateString() === todayStr);
  } else if (mode === 'week') {
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);
    days = studyPlan.filter(d => d.date >= now && d.date <= weekEnd);
  }

  if (!days.length) {
    alert(lang === 'en' ? 'No plan found for selected range!' : 'इस range में कोई plan नहीं मिला!');
    return null;
  }

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ParikshaSathi//Study Plan//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:ParikshaSathi Study Plan',
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  // Add exam date event
  const examDate = typeof getExamDate === 'function' ? getExamDate() : null;
  if (examDate && mode === 'full') {
    const examName = userData.exam === 'bpsc' ? 'BPSC TRE 4.0 Exam' :
                     userData.exam === 'upsc_2026' ? 'UPSC CSE 2026 Prelims' :
                     userData.exam === 'upsc_2027' ? 'UPSC CSE 2027 Prelims' :
                     'Exam Day — ParikshaSathi';
    const examStart = new Date(examDate);
    examStart.setHours(9, 0, 0, 0);
    const examEnd = new Date(examDate);
    examEnd.setHours(12, 0, 0, 0);

    lines.push(
      'BEGIN:VEVENT',
      `UID:exam-day-${generateUID()}`,
      `DTSTART;TZID=Asia/Kolkata:${icsDate(examStart).replace('Z', '')}`,
      `DTEND;TZID=Asia/Kolkata:${icsDate(examEnd).replace('Z', '')}`,
      `SUMMARY:🎯 ${icsEscape(examName)}`,
      `DESCRIPTION:${icsEscape('ParikshaSathi — Aapka exam aaj hai! Best of luck!')}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      // Reminder 1 day before
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:${icsEscape('Kal exam hai — last revision karo!')}`,
      'END:VALARM',
      // Reminder 1 week before
      'BEGIN:VALARM',
      'TRIGGER:-P7D',
      'ACTION:DISPLAY',
      `DESCRIPTION:${icsEscape('1 hafte mein exam hai — revision plan ready karo!')}`,
      'END:VALARM',
      'END:VEVENT'
    );
  }

  // Add study slots as events
  days.forEach(day => {
    const dateBase = new Date(day.date);
    dateBase.setHours(0, 0, 0, 0);

    const slotTimes = {
      early_morning: [4, 0, 6, 0],
      morning:       [6, 0, 9, 0],
      forenoon:      [9, 0, 12, 0],
      afternoon:     [12, 0, 15, 0],
      evening:       [15, 0, 18, 0],
      night:         [20, 0, 23, 0],
      revision:      [19, 0, 20, 0],
      current:       [7, 0, 7, 30],
    };

    day.slots.forEach((slot, idx) => {
      const times = slotTimes[slot.slotType] || slotTimes.morning;
      const start = new Date(dateBase);
      start.setHours(times[0], times[1], 0, 0);
      const end = new Date(dateBase);
      end.setHours(times[2], times[3], 0, 0);

      let summary, desc;
      if (slot.type === 'mock') {
        summary = '🎯 Mock Test — ParikshaSathi';
        desc = 'Full mock test + analysis';
      } else if (slot.type === 'current_affairs') {
        summary = '📰 Current Affairs — ParikshaSathi';
        desc = 'Daily current affairs reading (30 min)';
      } else if (slot.type === 'revision') {
        summary = `🔄 Revision — ${slot.topic || 'Previous Topics'}`;
        desc = Array.isArray(slot.microTopics) ? slot.microTopics.slice(0, 5).join(', ') : 'Revision session';
      } else {
        const topicName = slot.topic || slot.subject || 'Study';
        summary = `📚 ${slot.subject ? slot.subject.replace(/Part [IVX]+ — /g,'') : ''} — ${topicName}`;
        desc = Array.isArray(slot.microTopics) && slot.microTopics.length
          ? 'Topics: ' + slot.microTopics.slice(0, 5).join(' | ')
          : topicName;
      }

      lines.push(
        'BEGIN:VEVENT',
        `UID:${generateUID()}`,
        `DTSTART;TZID=Asia/Kolkata:${formatICSLocal(start)}`,
        `DTEND;TZID=Asia/Kolkata:${formatICSLocal(end)}`,
        `SUMMARY:${icsEscape(summary)}`,
        `DESCRIPTION:${icsEscape(desc + '\n\nParikshaSathi — pariksha-sathi.in')}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        // 15 min reminder
        'BEGIN:VALARM',
        'TRIGGER:-PT15M',
        'ACTION:DISPLAY',
        `DESCRIPTION:${icsEscape('Study time! ' + summary)}`,
        'END:VALARM',
        'END:VEVENT'
      );
    });
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function formatICSLocal(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

// ── Download .ics file ────────────────────────────────────────
function downloadICS(mode) {
  const content = buildICSContent(mode);
  if (!content) return;

  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const labels = { full: 'full-plan', week: 'this-week', today: 'today' };
  a.download = `pariksha-sathi-${labels[mode] || 'plan'}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Show success toast
  showCalToast(mode);
}

function showCalToast(mode) {
  let existing = document.getElementById('calToast');
  if (!existing) {
    existing = document.createElement('div');
    existing.id = 'calToast';
    existing.className = 'cal-toast';
    document.body.appendChild(existing);
  }
  const labels = {
    full: lang === 'en' ? 'Full plan downloaded!' : 'पूरा plan download हो गया!',
    week: lang === 'en' ? 'This week downloaded!' : 'इस हफ्ते का plan download हो गया!',
    today: lang === 'en' ? "Today's plan downloaded!" : 'आज का plan download हो गया!',
  };
  existing.innerHTML = `✅ ${labels[mode]} <span style="opacity:.7;font-size:.8em">Google Calendar mein import karein</span>`;
  existing.classList.add('show');
  setTimeout(() => existing.classList.remove('show'), 4000);
}

// ── Show Calendar Export Modal ────────────────────────────────
function showCalendarModal() {
  let modal = document.getElementById('calendarModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'calendarModal';
    modal.className = 'cal-modal-overlay';
    modal.innerHTML = `
      <div class="cal-modal">
        <div class="cal-modal-header">
          <span class="cal-modal-icon">📅</span>
          <div>
            <div class="cal-modal-title">${lang === 'en' ? 'Export to Google Calendar' : 'Google Calendar में Export करें'}</div>
            <div class="cal-modal-sub">${lang === 'en' ? 'Download .ics file and import in Google Calendar' : '.ics file download करें और Google Calendar में import करें'}</div>
          </div>
          <button class="cal-modal-close" onclick="closeCalendarModal()">✕</button>
        </div>

        <div class="cal-options">
          <button class="cal-opt-btn" onclick="downloadICS('today')">
            <span class="cal-opt-icon">📌</span>
            <div class="cal-opt-info">
              <div class="cal-opt-title">${lang === 'en' ? "Today's Plan" : 'आज का Plan'}</div>
              <div class="cal-opt-sub">${lang === 'en' ? "Only today's study slots" : 'सिर्फ आज के topics'}</div>
            </div>
            <span class="cal-opt-arrow">↓</span>
          </button>
          <button class="cal-opt-btn" onclick="downloadICS('week')">
            <span class="cal-opt-icon">📆</span>
            <div class="cal-opt-info">
              <div class="cal-opt-title">${lang === 'en' ? 'This Week' : 'इस हफ्ते का Plan'}</div>
              <div class="cal-opt-sub">${lang === 'en' ? 'Next 7 days study slots' : 'अगले 7 दिनों के topics'}</div>
            </div>
            <span class="cal-opt-arrow">↓</span>
          </button>
          <button class="cal-opt-btn cal-opt-full" onclick="downloadICS('full')">
            <span class="cal-opt-icon">🗓️</span>
            <div class="cal-opt-info">
              <div class="cal-opt-title">${lang === 'en' ? 'Full Study Plan' : 'पूरा Study Plan'}</div>
              <div class="cal-opt-sub">${lang === 'en' ? 'All days + exam date reminder' : 'सभी दिन + exam date reminder'}</div>
            </div>
            <span class="cal-opt-arrow">↓</span>
          </button>
        </div>

        <div class="cal-how-to">
          <div class="cal-how-title">📖 ${lang === 'en' ? 'How to import?' : 'Import कैसे करें?'}</div>
          <ol class="cal-steps">
            <li>${lang === 'en' ? 'Download the .ics file above' : 'ऊपर से .ics file download करें'}</li>
            <li>${lang === 'en' ? 'Open Google Calendar → Settings (⚙️)' : 'Google Calendar खोलें → Settings (⚙️)'}</li>
            <li>${lang === 'en' ? 'Import → Select downloaded file' : 'Import → Downloaded file select करें'}</li>
            <li>${lang === 'en' ? 'Done! All study events added ✅' : 'हो गया! सभी study events add हो गए ✅'}</li>
          </ol>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeCalendarModal(); });
  } else {
    modal.style.display = 'flex';
  }
}

function closeCalendarModal() {
  const modal = document.getElementById('calendarModal');
  if (modal) modal.style.display = 'none';
}

// ── FCM Push Notifications ────────────────────────────────────
const FCM_VAPID_KEY = '0Pkbm-kb7s32ifYoFcC9flRikYHpWPjmcLW6obBVHC0';

async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert(lang === 'en' ? 'Your browser does not support notifications.' : 'आपका browser notifications support नहीं करता।');
    return false;
  }
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

async function setupFCM() {
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return;

    // Use Firebase Messaging if available
    if (window.psMessaging) {
      const { getToken } = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-messaging.js');
      const token = await getToken(window.psMessaging, { vapidKey: FCM_VAPID_KEY });
      if (token && window.psDb && window.psAuth?.currentUser) {
        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js');
        await setDoc(
          doc(window.psDb, 'users', window.psAuth.currentUser.uid, 'fcm', 'token'),
          { token, updatedAt: new Date().toISOString(), exam: userData.exam || '' },
          { merge: true }
        );
      }
    }

    // Schedule local notifications as fallback (Web Notifications API)
    scheduleLocalNotifications();
    updateNotifBtnState(true);
    showNotifToast('enabled');
  } catch(e) {
    console.error('FCM setup failed:', e);
    // Fallback to local notifications only
    scheduleLocalNotifications();
    updateNotifBtnState(true);
    showNotifToast('enabled');
  }
}

function scheduleLocalNotifications() {
  // Store notification preference
  localStorage.setItem('ps_notif_enabled', '1');

  // Use SW to schedule — send message to SW
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    const examDate = typeof getExamDate === 'function' ? getExamDate() : null;
    navigator.serviceWorker.controller.postMessage({
      type: 'SCHEDULE_NOTIFS',
      examDate: examDate ? examDate.toISOString() : null,
      userName: userData.name || '',
      exam: userData.exam || '',
    });
  }
}

function disableNotifications() {
  localStorage.removeItem('ps_notif_enabled');
  updateNotifBtnState(false);
  showNotifToast('disabled');
}

function updateNotifBtnState(enabled) {
  const btn = document.getElementById('notifToggleBtn');
  if (!btn) return;
  if (enabled) {
    btn.textContent = '🔔 Notifications ON';
    btn.classList.add('notif-on');
  } else {
    btn.textContent = '🔕 Notifications OFF';
    btn.classList.remove('notif-on');
  }
}

function showNotifToast(state) {
  let el = document.getElementById('notifToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notifToast';
    el.className = 'cal-toast';
    document.body.appendChild(el);
  }
  el.innerHTML = state === 'enabled'
    ? (lang === 'en' ? '🔔 Notifications enabled! Daily reminders set.' : '🔔 Notifications चालू! Daily reminders set हो गए।')
    : (lang === 'en' ? '🔕 Notifications disabled.' : '🔕 Notifications बंद हो गए।');
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3500);
}

// ── Inject Calendar + Notif buttons into plan topbar ─────────
function injectCalendarAndNotifButtons() {
  if (document.getElementById('calendarExportBtn')) return;

  const actions = document.querySelector('.plan-topbar-actions');
  if (!actions) return;

  // Calendar button
  const calBtn = document.createElement('button');
  calBtn.id = 'calendarExportBtn';
  calBtn.className = 'ptb-btn ptb-calendar';
  calBtn.innerHTML = '📅 Calendar';
  calBtn.onclick = showCalendarModal;
  calBtn.title = lang === 'en' ? 'Export to Google Calendar' : 'Google Calendar में export करें';

  // Notification button
  const notifBtn = document.createElement('button');
  notifBtn.id = 'notifToggleBtn';
  notifBtn.className = 'ptb-btn ptb-notif';
  const notifEnabled = localStorage.getItem('ps_notif_enabled') === '1';
  notifBtn.textContent = notifEnabled ? '🔔 Notifications ON' : '🔕 Notifications';
  if (notifEnabled) notifBtn.classList.add('notif-on');
  notifBtn.onclick = () => {
    if (localStorage.getItem('ps_notif_enabled') === '1') {
      disableNotifications();
    } else {
      setupFCM();
    }
  };

  // Insert before PDF button
  const pdfBtn = actions.querySelector('.ptb-download');
  if (pdfBtn) {
    actions.insertBefore(notifBtn, pdfBtn);
    actions.insertBefore(calBtn, pdfBtn);
  } else {
    actions.appendChild(calBtn);
    actions.appendChild(notifBtn);
  }
}

// ── Auto-init when plan renders ───────────────────────────────
(function initC26() {
  // Patch renderPlan to inject buttons after render
  const origRender = window.renderPlan;
  if (typeof origRender === 'function') {
    window.renderPlan = function() {
      origRender();
      setTimeout(injectCalendarAndNotifButtons, 100);
    };
  }
  // Also try on DOMContentLoaded if plan already shown
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('planScreen')?.classList.contains('active')) {
      setTimeout(injectCalendarAndNotifButtons, 200);
    }
  });
})();
