// renderPlan() + generateDayPlanHTML() — v2 with proper topic display
function renderPlan() {
  const optionalNames = {
    history: 'History', geography: 'Geography', pub_admin: 'Public Administration',
    sociology: 'Sociology', pol_sci: 'Political Science & IR',
    anthropology: 'Anthropology', philosophy: 'Philosophy',
    psychology: 'Psychology', economics: 'Economics', law: 'Law'
  };
  const examLabel = userData.exam === 'bpsc'
    ? (userData.bpscClass === '1-5' ? 'BPSC TRE 4.0 — Class 1–5 (PRT)'
      : userData.bpscClass === '6-8' ? 'BPSC TRE 4.0 — Class 6–8 (TGT)'
      : 'BPSC TRE 4.0 — Class 1–5 & 6–8')
    : userData.optionalSubject
      ? `UPSC CSE 2027 • ${optionalNames[userData.optionalSubject] || userData.optionalSubject} Optional`
      : 'UPSC CSE 2027';

  document.getElementById('planTitle').textContent = `${userData.name} का Study Plan`;
  document.getElementById('planSubtitle').textContent =
    `${examLabel} • ${studyPlan.length} दिन • ${userData.studyHours} घंटे/दिन`;

  const now = new Date();
  const pct = Math.min(100, Math.max(0, Math.round(
    ((now - userData.startDate) / (getExamDate() - userData.startDate)) * 100
  )));
  document.getElementById('planProgressBar').style.width = Math.max(2, pct) + '%';
  const daysLeft = Math.max(0, Math.ceil((getExamDate() - now) / 86400000));
  document.getElementById('planProgressLabel').textContent =
    `${pct}% Complete • परीक्षा में ${daysLeft} दिन बाकी`;

  document.getElementById('planBody').innerHTML = `
    <div class="tab-bar">
      <button class="tab-btn active" onclick="showTab('tabPlan')">📅 Day Plan</button>
      <button class="tab-btn" onclick="showTab('tabSyllabus')">📚 Syllabus</button>
      <button class="tab-btn" onclick="showTab('tabPYQ')">📝 PYQ Tips</button>
      <button class="tab-btn" onclick="showTab('tabInfo')">ℹ️ Exam Info</button>
    </div>
    <div id="tabPlan" class="tab-content active">${generateDayPlanHTML()}</div>
    <div id="tabSyllabus" class="tab-content">${generateSyllabusHTML()}</div>
    <div id="tabPYQ" class="tab-content">${generatePYQsHTML()}</div>
    <div id="tabInfo" class="tab-content">${generateExamInfoHTML()}</div>
  `;
}

const SLOT_META = {
  morning:   { label:'☀️ Morning',   cls:'morning-slot',   time:'6–9 AM'   },
  afternoon: { label:'🌤️ Afternoon', cls:'afternoon-slot', time:'12–3 PM'  },
  evening:   { label:'🌆 Evening',   cls:'evening-slot',   time:'3–6 PM'   },
  revision:  { label:'🔄 Revision',  cls:'revision-slot',  time:'1 hr'     },
  current:   { label:'📰 Current Affairs', cls:'current-slot', time:'30 min' },
};

function generateDayPlanHTML() {
  if (!studyPlan.length) return '<p class="empty-msg">No plan generated.</p>';

  const todayStr = new Date().toDateString();
  const weeks = [];
  for (let i = 0; i < studyPlan.length; i += 7) weeks.push(studyPlan.slice(i, i + 7));

  return weeks.map((week, wi) => {
    const wStart = week[0].date.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
    const wEnd   = week[week.length-1].date.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
    const isCurrentWeek = week.some(d => d.date.toDateString() === todayStr);

    const daysHTML = week.map(day => {
      const isToday = day.date.toDateString() === todayStr;
      const dateStr = day.date.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' });

      let dayClass = 'day-card';
      if (isToday) dayClass += ' today-card';
      else if (day.isMock) dayClass += ' mock-day';
      else if (day.isRevision) dayClass += ' revision-day';

      const badge = isToday
        ? '<span class="day-badge badge-today">⚡ Today</span>'
        : day.isMock
          ? '<span class="day-badge badge-mock">🎯 Mock Test</span>'
          : day.isRevision
            ? '<span class="day-badge badge-revision">🔄 Revision Day</span>'
            : '';

      const slotsHTML = day.slots.map(slot => {
        const meta = SLOT_META[slot.slotType] || SLOT_META.morning;

        if (slot.type === 'mock') {
          return `<div class="slot-card mock-slot-card">
            <div class="slot-card-header">
              <span class="slot-type-badge" style="background:rgba(239,68,68,.15);color:#f87171;border-color:rgba(239,68,68,.3)">🎯 Mock Test</span>
              <span class="slot-duration">2–3 hrs</span>
            </div>
            <div class="slot-card-title">Full Syllabus Mock Test</div>
            <div class="slot-card-sub">सभी topics का full-length practice test दें। Time management practice करें।</div>
          </div>`;
        }

        if (slot.type === 'current_affairs') {
          return `<div class="slot-card ca-slot-card">
            <div class="slot-card-header">
              <span class="slot-type-badge" style="background:rgba(239,68,68,.08);color:#fca5a5;border-color:rgba(239,68,68,.2)">📰 Current Affairs</span>
              <span class="slot-duration">30 min</span>
            </div>
            <div class="slot-card-title">Daily News + Monthly Magazine</div>
            <div class="slot-card-sub">The Hindu / Dainik Jagran पढ़ें। Important events note करें।</div>
          </div>`;
        }

        if (slot.type === 'revision') {
          const revList = Array.isArray(slot.microTopics) && slot.microTopics.length
            ? slot.microTopics.slice(0, 4).map(t => `<span class="rev-tag">${t}</span>`).join('')
            : `<span class="rev-tag">${slot.topic}</span>`;
          return `<div class="slot-card rev-slot-card">
            <div class="slot-card-header">
              <span class="slot-type-badge" style="background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.25)">🔄 Revision</span>
              <span class="slot-duration">1 hr</span>
            </div>
            <div class="slot-card-title">Quick Revision</div>
            <div class="rev-tags-wrap">${revList}</div>
          </div>`;
        }

        // Normal subject slot
        const micros = (slot.microTopics || []).slice(0, 4);
        const microsHTML = micros.length
          ? `<ul class="slot-micro-list">${micros.map(m => `<li>${m}</li>`).join('')}</ul>`
          : '';

        const subjectShort = slot.subject.replace(/Part [IVX]+ — /g, '').replace(/\[1-5\] /g,'').replace(/\[6-8\] /g,'');

        return `<div class="slot-card subject-slot-card" style="--slot-color:${slot.color || '#f59e0b'}">
          <div class="slot-card-header">
            <span class="slot-type-badge" style="background:rgba(245,158,11,.1);color:${slot.color||'#f59e0b'};border-color:${slot.color||'#f59e0b'}40">${meta.label}</span>
            <span class="slot-duration">${meta.time}</span>
          </div>
          <div class="slot-part-label">${subjectShort}</div>
          <div class="slot-card-title">${slot.topic}</div>
          ${slot.hindiTopic ? `<div class="slot-card-hindi">${slot.hindiTopic}</div>` : ''}
          ${microsHTML}
        </div>`;
      }).join('');

      return `<div class="${dayClass}">
        <div class="day-header">
          <div class="day-header-left">
            <div class="day-num-circle${isToday ? ' today-circle' : ''}">
              <span class="day-num-label">Day</span>
              <span class="day-num-val">${day.day}</span>
            </div>
            <div class="day-date-info">
              <div class="day-date-main">${dateStr}</div>
              ${badge}
            </div>
          </div>
          <div class="day-slots-count">${day.slots.filter(s=>s.type==='subject').length} subjects</div>
        </div>
        <div class="slots-grid">${slotsHTML}</div>
      </div>`;
    }).join('');

    return `<div class="week-block${isCurrentWeek ? ' current-week' : ''}">
      <div class="week-header">
        <span class="week-title">Week ${wi + 1}</span>
        <span class="week-range">${wStart} – ${wEnd}</span>
        ${isCurrentWeek ? '<span class="week-now-badge">Current Week</span>' : ''}
      </div>
      <div class="week-days">${daysHTML}</div>
    </div>`;
  }).join('');
}
