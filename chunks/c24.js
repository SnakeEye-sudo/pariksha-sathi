// ═══════════════════════════════════════════════════════════════
// c24.js — Today's Focus, Countdown, Badges, Quote, Weak Subject, Weekly Report
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

// ── Daily Quotes ──────────────────────────────────────────────
const DAILY_QUOTES = [
  { q: "सफलता उन्हें मिलती है जो हर दिन थोड़ा-थोड़ा आगे बढ़ते हैं।", a: "IAS Topper" },
  { q: "Consistency beats talent when talent doesn't work consistently.", a: "IPS Officer" },
  { q: "UPSC एक marathon है, sprint नहीं। रोज़ पढ़ो, रोज़ जीतो।", a: "IAS 2022 Topper" },
  { q: "जो आज कठिन लग रहा है, वही कल आपकी ताकत बनेगा।", a: "IFS Officer" },
  { q: "एक दिन की मेहनत छोड़ना आसान है, लेकिन IAS बनना उससे भी आसान नहीं।", a: "IAS Aspirant" },
  { q: "Revision is not repetition — it's reinforcement.", a: "UPSC Mentor" },
  { q: "हर सुबह एक नया मौका है। उसे बर्बाद मत करो।", a: "IAS Topper 2023" },
  { q: "Small daily improvements lead to staggering long-term results.", a: "IPS 2021 Topper" },
  { q: "Current affairs पढ़ना बंद मत करो — यही UPSC का दिल है।", a: "IAS Officer" },
  { q: "आपकी तैयारी आपकी किस्मत से ज़्यादा ताकतवर है।", a: "IAS 2024 Topper" },
  { q: "Mock tests दो, गलतियाँ करो, सीखो — यही formula है।", a: "IPS Topper" },
  { q: "जब थकान लगे, तो याद करो — क्यों शुरू किया था।", a: "IAS Motivator" },
  { q: "Notes बनाना पढ़ाई का सबसे powerful तरीका है।", a: "IAS 2020 Topper" },
  { q: "Prelims में cut-off नहीं, Mains में rank बनती है।", a: "IAS Coach" },
  { q: "हर subject को दोस्त बनाओ, दुश्मन नहीं।", a: "IFS 2023 Topper" },
];

// ── Badges config ─────────────────────────────────────────────
const BADGES = [
  { id: 'first_check',  icon: '✅', title: 'पहला कदम',       titleEn: 'First Step',       desc: 'पहला topic check किया',          descEn: 'Checked first topic',          condition: s => s.count >= 1 },
  { id: 'streak_3',     icon: '⚡', title: '3 दिन की Streak', titleEn: '3-Day Streak',     desc: '3 दिन लगातार पढ़ा',              descEn: 'Studied 3 days in a row',      condition: s => s.streak >= 3 },
  { id: 'streak_7',     icon: '🔥', title: 'Fire Starter',    titleEn: 'Fire Starter',     desc: '7 दिन की streak!',               descEn: '7-day streak!',                condition: s => s.streak >= 7 },
  { id: 'streak_14',    icon: '💪', title: 'Iron Will',       titleEn: 'Iron Will',        desc: '14 दिन लगातार!',                 descEn: '14 days straight!',            condition: s => s.streak >= 14 },
  { id: 'streak_30',    icon: '💎', title: 'Diamond Aspirant',titleEn: 'Diamond Aspirant', desc: '30 दिन की streak — Legend!',     descEn: '30-day streak — Legend!',      condition: s => s.streak >= 30 },
  { id: 'topics_10',    icon: '📚', title: '10 Topics Done',  titleEn: '10 Topics Done',   desc: '10 topics complete किए',         descEn: 'Completed 10 topics',          condition: s => s.count >= 10 },
  { id: 'topics_50',    icon: '🏆', title: 'Half Century',    titleEn: 'Half Century',     desc: '50 topics पढ़ लिए!',             descEn: 'Read 50 topics!',              condition: s => s.count >= 50 },
  { id: 'topics_100',   icon: '🌟', title: 'Century!',        titleEn: 'Century!',         desc: '100 topics — शानदार!',           descEn: '100 topics — Brilliant!',      condition: s => s.count >= 100 },
  { id: 'week_done',    icon: '🗓️', title: 'Week Warrior',    titleEn: 'Week Warrior',     desc: 'पूरा हफ्ता पढ़ा',               descEn: 'Completed a full week',        condition: s => s.streak >= 7 },
];

function getBadgeStats() {
  const cl = getChecklist ? getChecklist() : {};
  const streak = getStreak ? getStreak() : { count: 0 };
  let count = 0;
  Object.keys(cl).forEach(k => { if (!k.includes('rescheduled') && cl[k]) count++; });
  return { count, streak: streak.count };
}

function getEarnedBadges() {
  const stats = getBadgeStats();
  return BADGES.filter(b => b.condition(stats));
}

function renderBadgesWidget() {
  const el = document.getElementById('badgesWidget');
  if (!el) return;
  const earned = getEarnedBadges();
  if (!earned.length) {
    el.innerHTML = `<div class="badges-empty">${lang === 'hi' ? '🎯 पहला topic check करो और badge पाओ!' : '🎯 Check your first topic to earn a badge!'}</div>`;
    return;
  }
  el.innerHTML = earned.map(b => `
    <div class="badge-chip earned" title="${lang === 'hi' ? b.desc : b.descEn}">
      <span class="badge-chip-icon">${b.icon}</span>
      <span class="badge-chip-title">${lang === 'hi' ? b.title : b.titleEn}</span>
    </div>`).join('');
}

// ── Today's Focus Card ────────────────────────────────────────
function renderTodayFocusCard() {
  const el = document.getElementById('todayFocusCard');
  if (!el) return;
  const todayStr = toDateKey(new Date());
  const todayPlan = studyPlan.find(d => toDateKey(d.date) === todayStr);

  if (!todayPlan) {
    el.innerHTML = `<div class="focus-no-plan">${lang === 'hi' ? '📅 आज का कोई plan नहीं मिला।' : '📅 No plan found for today.'}</div>`;
    return;
  }

  const subjects = todayPlan.slots.filter(s => s.type === 'subject');
  const cl = getChecklist ? getChecklist() : {};
  const done = subjects.filter((_, i) => cl[checklistKey(todayStr, i)]).length;
  const pct = subjects.length ? Math.round((done / subjects.length) * 100) : 0;

  const topicsHTML = subjects.slice(0, 4).map((s, i) => {
    const checked = !!cl[checklistKey(todayStr, i)];
    const name = (lang === 'hi' && s.hindiTopic) ? s.hindiTopic : s.topic;
    return `<div class="focus-topic ${checked ? 'focus-topic-done' : ''}">
      <span class="focus-topic-dot" style="background:${s.color || 'var(--amber)'}"></span>
      <span class="focus-topic-name">${name}</span>
      ${checked ? '<span class="focus-topic-check">✓</span>' : ''}
    </div>`;
  }).join('');

  const moreCount = subjects.length > 4 ? subjects.length - 4 : 0;
  const dateDisplay = todayPlan.date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  el.innerHTML = `
    <div class="focus-header">
      <div class="focus-header-left">
        <div class="focus-icon">🎯</div>
        <div>
          <div class="focus-title">${lang === 'hi' ? 'आज क्या पढ़ना है?' : "Today's Focus"}</div>
          <div class="focus-date">${dateDisplay}</div>
        </div>
      </div>
      <div class="focus-pct-ring">
        <svg viewBox="0 0 36 36" class="focus-ring-svg">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="3"/>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--amber)" stroke-width="3"
            stroke-dasharray="${pct} ${100 - pct}" stroke-dashoffset="25" stroke-linecap="round"/>
        </svg>
        <span class="focus-ring-pct">${pct}%</span>
      </div>
    </div>
    <div class="focus-topics">${topicsHTML}${moreCount ? `<div class="focus-more">+${moreCount} ${lang === 'hi' ? 'और topics' : 'more topics'}</div>` : ''}</div>
    <button class="focus-jump-btn" onclick="jumpToToday()">${lang === 'hi' ? '⬇️ आज के दिन पर जाएं' : '⬇️ Jump to Today'}</button>
  `;
}

function jumpToToday() {
  const todayCard = document.querySelector('.today-card');
  if (todayCard) {
    todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    todayCard.classList.add('focus-highlight-pulse');
    setTimeout(() => todayCard.classList.remove('focus-highlight-pulse'), 2000);
  }
}

// ── Exam Countdown Widget ─────────────────────────────────────
let _countdownInterval = null;

function renderCountdownWidget() {
  const el = document.getElementById('countdownWidget');
  if (!el) return;

  function update() {
    const examDate = typeof getExamDate === 'function' ? getExamDate() : null;
    if (!examDate) { el.innerHTML = ''; return; }
    const now = new Date();
    const diff = examDate - now;
    if (diff <= 0) {
      el.innerHTML = `<div class="countdown-done">${lang === 'hi' ? '🎉 परीक्षा का दिन आ गया!' : '🎉 Exam Day is here!'}</div>`;
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hrs  = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    const examName = userData.exam === 'bpsc' ? 'BPSC TRE' : `UPSC ${userData.upscYear || ''}`;
    el.innerHTML = `
      <div class="countdown-label">${lang === 'hi' ? `⏳ ${examName} में बचे:` : `⏳ ${examName} Countdown:`}</div>
      <div class="countdown-units">
        <div class="cd-unit"><span class="cd-num">${days}</span><span class="cd-lbl">${lang === 'hi' ? 'दिन' : 'Days'}</span></div>
        <span class="cd-sep">:</span>
        <div class="cd-unit"><span class="cd-num">${String(hrs).padStart(2,'0')}</span><span class="cd-lbl">${lang === 'hi' ? 'घंटे' : 'Hrs'}</span></div>
        <span class="cd-sep">:</span>
        <div class="cd-unit"><span class="cd-num">${String(mins).padStart(2,'0')}</span><span class="cd-lbl">${lang === 'hi' ? 'मिनट' : 'Min'}</span></div>
        <span class="cd-sep">:</span>
        <div class="cd-unit"><span class="cd-num">${String(secs).padStart(2,'0')}</span><span class="cd-lbl">${lang === 'hi' ? 'सेकंड' : 'Sec'}</span></div>
      </div>`;
  }
  update();
  if (_countdownInterval) clearInterval(_countdownInterval);
  _countdownInterval = setInterval(update, 1000);
}

// ── Daily Quote ───────────────────────────────────────────────
function renderDailyQuote() {
  const el = document.getElementById('dailyQuoteWidget');
  if (!el) return;
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const q = DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
  el.innerHTML = `
    <div class="quote-icon">💬</div>
    <div class="quote-text">"${q.q}"</div>
    <div class="quote-author">— ${q.a}</div>`;
}

// ── Weak Subject Detector ─────────────────────────────────────
function getSubjectCompletionMap() {
  const cl = getChecklist ? getChecklist() : {};
  const map = {}; // { subjectKey: { done, total } }

  studyPlan.forEach(day => {
    const dateStr = toDateKey(day.date);
    const subjects = day.slots.filter(s => s.type === 'subject');
    subjects.forEach((slot, idx) => {
      const key = slot.subject || slot.topic;
      if (!map[key]) map[key] = { done: 0, total: 0, color: slot.color || 'var(--amber)', label: slot.subject || slot.topic };
      map[key].total++;
      if (cl[checklistKey(dateStr, idx)]) map[key].done++;
    });
  });
  return map;
}

function renderWeakSubjectWidget() {
  const el = document.getElementById('weakSubjectWidget');
  if (!el) return;
  const map = getSubjectCompletionMap();
  const entries = Object.values(map).filter(e => e.total >= 2);
  if (!entries.length) {
    el.innerHTML = `<div class="weak-empty">${lang === 'hi' ? '📊 Topics check करने के बाद यहाँ analysis दिखेगा।' : '📊 Analysis will appear after checking topics.'}</div>`;
    return;
  }

  entries.sort((a, b) => (a.done / a.total) - (b.done / b.total));
  const weak = entries.filter(e => (e.done / e.total) < 0.4);
  const strong = entries.filter(e => (e.done / e.total) >= 0.7);

  const makeRow = (e) => {
    const pct = Math.round((e.done / e.total) * 100);
    const label = e.label.replace(/Part [IVX]+ — /g, '').substring(0, 30);
    const barColor = pct < 40 ? 'var(--red)' : pct < 70 ? 'var(--amber)' : 'var(--green)';
    return `<div class="weak-row">
      <div class="weak-row-label">${label}</div>
      <div class="weak-bar-wrap"><div class="weak-bar" style="width:${pct}%;background:${barColor}"></div></div>
      <span class="weak-pct" style="color:${barColor}">${pct}%</span>
    </div>`;
  };

  let html = '';
  if (weak.length) {
    html += `<div class="weak-section-title">⚠️ ${lang === 'hi' ? 'ध्यान चाहिए' : 'Needs Attention'}</div>`;
    html += weak.slice(0, 4).map(makeRow).join('');
  }
  if (strong.length) {
    html += `<div class="weak-section-title" style="color:var(--green);margin-top:.8rem">✅ ${lang === 'hi' ? 'अच्छा चल रहा है' : 'Going Strong'}</div>`;
    html += strong.slice(0, 3).map(makeRow).join('');
  }
  if (!weak.length && !strong.length) {
    html = entries.slice(0, 5).map(makeRow).join('');
  }
  el.innerHTML = html;
}

// ── Weekly Report Card ────────────────────────────────────────
function renderWeeklyReport() {
  const el = document.getElementById('weeklyReportWidget');
  if (!el) return;

  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - dayOfWeek);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  const cl = getChecklist ? getChecklist() : {};
  let topicsRead = 0, totalTopics = 0;
  const subjectMap = {};

  studyPlan.forEach(day => {
    if (day.date < weekStart || day.date > weekEnd) return;
    const dateStr = toDateKey(day.date);
    const subjects = day.slots.filter(s => s.type === 'subject');
    subjects.forEach((slot, idx) => {
      totalTopics++;
      const key = slot.subject || 'Other';
      if (!subjectMap[key]) subjectMap[key] = { done: 0, total: 0, color: slot.color || 'var(--amber)' };
      subjectMap[key].total++;
      if (cl[checklistKey(dateStr, idx)]) { topicsRead++; subjectMap[key].done++; }
    });
  });

  const streak = getStreak ? getStreak() : { count: 0, longest: 0 };
  const pct = totalTopics ? Math.round((topicsRead / totalTopics) * 100) : 0;
  const weekLabel = weekStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' – ' + weekEnd.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  // Bar chart for subjects
  const chartEntries = Object.entries(subjectMap).filter(([, v]) => v.total > 0).slice(0, 5);
  const chartHTML = chartEntries.map(([name, v]) => {
    const p = Math.round((v.done / v.total) * 100);
    const shortName = name.replace(/Part [IVX]+ — /g, '').substring(0, 18);
    return `<div class="wr-chart-row">
      <span class="wr-chart-label">${shortName}</span>
      <div class="wr-chart-bar-wrap"><div class="wr-chart-bar" style="width:${p}%;background:${v.color}"></div></div>
      <span class="wr-chart-pct">${p}%</span>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div class="wr-header">
      <span class="wr-title">${lang === 'hi' ? '📊 इस हफ्ते की Report' : '📊 Weekly Report'}</span>
      <span class="wr-range">${weekLabel}</span>
    </div>
    <div class="wr-stats">
      <div class="wr-stat"><span class="wr-stat-num" style="color:var(--amber)">${topicsRead}</span><span class="wr-stat-lbl">${lang === 'hi' ? 'Topics पढ़े' : 'Topics Read'}</span></div>
      <div class="wr-stat"><span class="wr-stat-num" style="color:var(--green)">${pct}%</span><span class="wr-stat-lbl">${lang === 'hi' ? 'Complete' : 'Complete'}</span></div>
      <div class="wr-stat"><span class="wr-stat-num" style="color:var(--purple-l)">${streak.count}</span><span class="wr-stat-lbl">${lang === 'hi' ? 'Streak' : 'Streak'}</span></div>
    </div>
    ${chartHTML ? `<div class="wr-chart">${chartHTML}</div>` : ''}
    ${pct === 100 ? `<div class="wr-perfect">🏆 ${lang === 'hi' ? 'Perfect Week! शानदार!' : 'Perfect Week! Brilliant!'}</div>` : ''}
  `;
}

// ── Inject all c24 widgets into plan screen ───────────────────
function injectC24Widgets() {
  // Only inject once
  if (document.getElementById('c24WidgetsRow')) return;

  const planHero = document.querySelector('.plan-hero-inner');
  if (!planHero) return;

  // Insert widget container after plan-hero
  const container = document.createElement('div');
  container.id = 'c24WidgetsRow';
  container.className = 'c24-widgets-row';
  container.innerHTML = `
    <!-- Today's Focus Card -->
    <div class="c24-widget focus-card-widget">
      <div id="todayFocusCard" class="today-focus-card"></div>
    </div>
    <!-- Countdown + Quote row -->
    <div class="c24-widget-pair">
      <div class="c24-widget countdown-widget-wrap">
        <div id="countdownWidget" class="countdown-widget"></div>
      </div>
      <div class="c24-widget quote-widget-wrap">
        <div id="dailyQuoteWidget" class="daily-quote-widget"></div>
      </div>
    </div>
    <!-- Badges -->
    <div class="c24-widget badges-widget-wrap">
      <div class="c24-widget-title">${lang === 'hi' ? '🏅 आपके Badges' : '🏅 Your Badges'}</div>
      <div id="badgesWidget" class="badges-widget"></div>
    </div>
    <!-- Weak Subject + Weekly Report row -->
    <div class="c24-widget-pair">
      <div class="c24-widget weak-subject-wrap">
        <div class="c24-widget-title">${lang === 'hi' ? '📉 Subject Analysis' : '📉 Subject Analysis'}</div>
        <div id="weakSubjectWidget" class="weak-subject-widget"></div>
      </div>
      <div class="c24-widget weekly-report-wrap">
        <div id="weeklyReportWidget" class="weekly-report-widget"></div>
      </div>
    </div>
  `;

  const planBodyWrap = document.querySelector('.plan-body-wrap');
  if (planBodyWrap) {
    planBodyWrap.parentNode.insertBefore(container, planBodyWrap);
  }
}

function initC24Features() {
  injectC24Widgets();
  renderTodayFocusCard();
  renderCountdownWidget();
  renderDailyQuote();
  renderBadgesWidget();
  renderWeakSubjectWidget();
  renderWeeklyReport();
}

// Called from c09.js setTimeout hook — refresh widgets when checklist changes
function refreshC24Widgets() {
  renderTodayFocusCard();
  renderBadgesWidget();
  renderWeakSubjectWidget();
  renderWeeklyReport();
}
