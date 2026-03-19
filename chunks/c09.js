// renderPlan() + generateDayPlanHTML() — v2 with proper topic display
function renderPlan() {
  const optionalNames = {
    history: 'History', geography: 'Geography', pub_admin: 'Public Administration',
    sociology: 'Sociology', pol_sci: 'Political Science & IR',
    anthropology: 'Anthropology', philosophy: 'Philosophy',
    psychology: 'Psychology', economics: 'Economics', law: 'Law'
  };
  const yr = userData.upscYear || '2027';
  let examLabel;
  if (userData.exam === 'combined' && userData._combinedExam1 && userData._combinedExam2) {
    const COMB_OPTS = typeof COMBINED_EXAM_OPTIONS !== 'undefined' ? COMBINED_EXAM_OPTIONS : [];
    const l1 = COMB_OPTS.find(e=>e.id===userData._combinedExam1)?.label || userData._combinedExam1;
    const l2 = COMB_OPTS.find(e=>e.id===userData._combinedExam2)?.label || userData._combinedExam2;
    examLabel = `${l1} + ${l2} (Combined)`;
  } else {
    examLabel = userData.exam === 'bpsc'
      ? (userData.bpscClass === '1-5' ? 'BPSC TRE 4.0 — Class 1–5 (PRT)'
        : userData.bpscClass === '6-8' ? 'BPSC TRE 4.0 — Class 6–8 (TGT)'
        : 'BPSC TRE 4.0 — Class 1–5 & 6–8')
      : userData.optionalSubject
        ? `UPSC CSE ${yr} • ${optionalNames[userData.optionalSubject] || userData.optionalSubject} Optional`
        : `UPSC CSE ${yr}`;
  }

  const daysUnit = lang === 'en' ? 'days' : 'दिन';
  const hrsUnit  = lang === 'en' ? 'hrs/day' : 'घंटे/दिन';
  document.getElementById('planTitle').textContent = `${userData.name} ${t('planTitle')}`;
  document.getElementById('planSubtitle').textContent =
    `${examLabel} • ${studyPlan.length} ${daysUnit} • ${userData.studyHours} ${hrsUnit}`;

  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((getExamDate() - now) / 86400000));
  updatePlanProgressBar();
  document.getElementById('planProgressLabel').textContent =
    `${getPlanChecklistPct()}% ${t('complete')} • ${lang === 'en' ? 'Exam in' : 'परीक्षा में'} ${daysLeft} ${t('daysLeft')}`;

  document.getElementById('planBody').innerHTML = `
    <div class="tab-bar">
      <button class="tab-btn active" onclick="showTab('tabPlan')">${t('tabPlan')}</button>
      <button class="tab-btn" onclick="showTab('tabSyllabus')">${t('tabSyllabus')}</button>
      <button class="tab-btn" onclick="showTab('tabPYQ')">${t('tabPYQ')}</button>
      <button class="tab-btn" onclick="showTab('tabInfo')">${t('tabInfo')}</button>
    </div>
    <div id="tabPlan" class="tab-content active">${generateDayPlanHTML()}</div>
    <div id="tabSyllabus" class="tab-content">${generateSyllabusHTML()}</div>
    <div id="tabPYQ" class="tab-content">${generatePYQsHTML()}</div>
    <div id="tabInfo" class="tab-content">${generateExamInfoHTML()}</div>
  `;
  // Inject checklist, streak, reschedule features after DOM is ready
  setTimeout(() => {
    if (typeof injectPlanHeaderExtras === 'function') injectPlanHeaderExtras();
    if (typeof patchDayCards === 'function') patchDayCards();
    if (typeof initFeatures === 'function') initFeatures();
    if (typeof initC24Features === 'function') initC24Features();
    if (typeof initTelegramIntegration === 'function') initTelegramIntegration();
  }, 0);
}

const SLOT_META = {
  early_morning: { label:'🌅 Early Morning', cls:'early-slot',     time:'4–6 AM'      },
  morning:       { label:'☀️ Morning',       cls:'morning-slot',   time:'6–9 AM'      },
  forenoon:      { label:'🕙 Forenoon',      cls:'forenoon-slot',  time:'9 AM–12 PM'  },
  afternoon:     { label:'🌤️ Afternoon',     cls:'afternoon-slot', time:'12–3 PM'     },
  evening:       { label:'🌆 Evening',       cls:'evening-slot',   time:'3–6 PM'      },
  night:         { label:'🌙 Night',         cls:'night-slot',     time:'8–11 PM'     },
  revision:      { label:'🔄 Revision',      cls:'revision-slot',  time:'1 hr'        },
  current:       { label:'📰 Current Affairs',cls:'current-slot', time:'30 min'      },
};

function generateDayPlanHTML() {
  if (!studyPlan.length) return '<p class="empty-msg">No plan generated.</p>';

  const todayStr = new Date().toDateString();
  const weeks = [];
  for (let i = 0; i < studyPlan.length; i += 7) weeks.push(studyPlan.slice(i, i + 7));
  const locale = lang === 'en' ? 'en-IN' : 'hi-IN';

  return weeks.map((week, wi) => {
    const wStart = week[0].date.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
    const wEnd   = week[week.length-1].date.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
    const isCurrentWeek = week.some(d => d.date.toDateString() === todayStr);

    const daysHTML = week.map(day => {
      const isToday = day.date.toDateString() === todayStr;
      const dateStr = day.date.toLocaleDateString(locale, { weekday:'long', day:'numeric', month:'long' });

      let dayClass = 'day-card';
      if (isToday) dayClass += ' today-card';
      else if (day.isMock) dayClass += ' mock-day';
      else if (day.isRevision) dayClass += ' revision-day';

      const badge = isToday
        ? `<span class="day-badge badge-today">${t('todayBadge')}</span>`
        : day.isMock
          ? `<span class="day-badge badge-mock">${t('mockBadge')}</span>`
          : day.isRevision
            ? `<span class="day-badge badge-revision">${t('revBadge')}</span>`
            : '';

      const slotsHTML = day.slots.map(slot => {
        const meta = SLOT_META[slot.slotType] || SLOT_META.morning;

        if (slot.type === 'mock') {
          return `<div class="slot-card mock-slot-card">
            <div class="slot-card-header">
              <span class="slot-type-badge" style="background:rgba(239,68,68,.15);color:#f87171;border-color:rgba(239,68,68,.3)">🎯 Mock Test</span>
              <span class="slot-duration">2–3 hrs</span>
            </div>
            <div class="slot-card-title">${t('mockTitle')}</div>
            <div class="slot-card-sub">${t('mockSub')}</div>
          </div>`;
        }

        if (slot.type === 'current_affairs') {
          // Build date string for the news app link — format YYYY-MM-DD
          const caDateStr = day.date.toISOString().slice(0, 10);
          return `<div class="slot-card ca-slot-card" style="cursor:pointer" onclick="openNewsApp('${caDateStr}')" title="News Analysis padhne ke liye click karein">
            <div class="slot-card-header">
              <span class="slot-type-badge" style="background:rgba(239,68,68,.08);color:#fca5a5;border-color:rgba(239,68,68,.2)">📰 Current Affairs</span>
              <span class="slot-duration">30 min</span>
            </div>
            <div class="slot-card-title">${t('caTitle')}</div>
            <div class="slot-card-sub">${t('caSub')}</div>
            <div class="ca-read-link">📖 News Analysis padhein →</div>
          </div>`;
        }

        if (slot.type === 'revision') {
          const revList = Array.isArray(slot.microTopics) && slot.microTopics.length
            ? slot.microTopics.slice(0, 4).map(t2 => `<span class="rev-tag">${t2}</span>`).join('')
            : `<span class="rev-tag">${slot.topic}</span>`;
          return `<div class="slot-card rev-slot-card">
            <div class="slot-card-header">
              <span class="slot-type-badge" style="background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.25)">🔄 ${t('revTitle')}</span>
              <span class="slot-duration">1 hr</span>
            </div>
            <div class="slot-card-title">${t('revTitle')}</div>
            <div class="rev-tags-wrap">${revList}</div>
          </div>`;
        }

        // Normal subject slot — show topic name based on lang
        const topicDisplay = (lang === 'hi' && slot.hindiTopic) ? slot.hindiTopic : slot.topic;
        const topicSub     = (lang === 'hi' && slot.hindiTopic) ? slot.topic : (slot.hindiTopic || '');
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
          <div class="slot-card-title">${topicDisplay}</div>
          ${topicSub ? `<div class="slot-card-hindi">${topicSub}</div>` : ''}
          ${microsHTML}
        </div>`;
      }).join('');

      return `<div class="${dayClass}">
        <div class="day-header">
          <div class="day-header-left">
            <div class="day-num-circle${isToday ? ' today-circle' : ''}">
              <span class="day-num-label">${t('dayLabel')}</span>
              <span class="day-num-val">${day.day}</span>
            </div>
            <div class="day-date-info">
              <div class="day-date-main">${dateStr}</div>
              ${badge}
            </div>
          </div>
          <div class="day-slots-count">${day.slots.filter(s=>s.type==='subject').length} ${t('subjectsCount')}</div>
        </div>
        <div class="slots-grid">${slotsHTML}</div>
      </div>`;
    }).join('');

    const weekLabel = lang === 'en' ? `Week ${wi + 1}` : `सप्ताह ${wi + 1}`;
    return `<div class="week-block${isCurrentWeek ? ' current-week' : ''}">
      <div class="week-header">
        <span class="week-title">${weekLabel}</span>
        <span class="week-range">${wStart} – ${wEnd}</span>
        ${isCurrentWeek ? `<span class="week-now-badge">${lang === 'en' ? 'Current Week' : 'इस सप्ताह'}</span>` : ''}
      </div>
      <div class="week-days">${daysHTML}</div>
    </div>`;
  }).join('');
}
