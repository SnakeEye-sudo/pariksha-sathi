// renderPlan() + generateDayPlanHTML()
function renderPlan() {
  const exam = userData.exam === 'bpsc'
    ? (userData.bpscClass === '1-5' ? 'BPSC TRE 4.0 — Class 1–5 (PRT)'
      : userData.bpscClass === '6-8' ? 'BPSC TRE 4.0 — Class 6–8 (TGT)'
      : 'BPSC TRE 4.0 — Class 1–5 & 6–8')
    : 'UPSC CSE 2027';

  document.getElementById('planTitle').textContent = `📅 ${userData.name} का Study Plan`;
  document.getElementById('planSubtitle').textContent =
    `${exam} • ${studyPlan.length} Days • ${userData.studyHours} hrs/day`;

  const pct = Math.min(100, Math.round(
    ((new Date() - userData.startDate) / (getExamDate() - userData.startDate)) * 100
  ));
  const bar = document.getElementById('planProgressBar');
  bar.style.setProperty('--w', Math.max(2, pct) + '%');
  bar.style.width = Math.max(2, pct) + '%';
  document.getElementById('planProgressLabel').textContent =
    `${Math.max(0, pct)}% Complete • ${studyPlan.length} days remaining`;

  const body = document.getElementById('planBody');
  body.innerHTML = `
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

function getSlotTime(slotType) {
  const times = {
    early_morning: '4–6 AM', morning: '6–9 AM', forenoon: '9 AM–12 PM',
    afternoon: '12–3 PM', evening: '3–6 PM', night: '8–11 PM',
    revision: '1 hr Revision', current: '30 min'
  };
  return times[slotType] || '';
}

function generateDayPlanHTML() {
  if (!studyPlan.length) return '<p style="color:var(--t3);text-align:center;padding:2rem">No plan generated.</p>';

  const weeks = [];
  for (let i = 0; i < studyPlan.length; i += 7) {
    weeks.push(studyPlan.slice(i, i + 7));
  }

  return weeks.map((week, wi) => {
    const wStart = week[0].date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const wEnd = week[week.length - 1].date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const days = week.map(day => {
      const dateStr = day.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
      const typeBadge = day.isMock
        ? '<span class="day-type-badge badge-mock">🎯 Mock Test</span>'
        : day.isRevision
          ? '<span class="day-type-badge badge-revision">🔄 Revision Day</span>'
          : '';

      const slotPills = day.slots.map(slot => {
        const cls = slot.slotType === 'morning' ? 'morning-slot'
          : slot.slotType === 'afternoon' ? 'afternoon-slot'
          : slot.slotType === 'evening' ? 'evening-slot'
          : slot.slotType === 'revision' ? 'revision-slot'
          : 'current-slot';

        const icon = slot.type === 'mock' ? '🎯'
          : slot.type === 'revision' ? '🔄'
          : slot.type === 'current_affairs' ? '📰'
          : '📖';

        const label = slot.type === 'mock' ? 'Mock Test'
          : slot.type === 'revision' ? 'Revision'
          : slot.type === 'current_affairs' ? 'Current Affairs'
          : slot.slotType === 'morning' ? '☀️ Morning'
          : slot.slotType === 'afternoon' ? '🌤️ Afternoon'
          : '🌆 Evening';

        const micro = slot.microTopics && slot.microTopics.length
          ? slot.microTopics.slice(0, 2).join(', ')
          : '';

        return `<div class="slot-pill ${cls}">
          <span class="slot-label">${label}</span>
          <span class="slot-subject">${icon} ${slot.subject}</span>
          <span class="slot-topics">${slot.topic}${micro ? ' — ' + micro : ''}</span>
          <span class="slot-time-disp">${getSlotTime(slot.slotType)}</span>
        </div>`;
      }).join('');

      return `<div class="day-card${day.isMock ? ' mock-day' : day.isRevision ? ' revision-day' : ''}">
        <div class="day-top">
          <span class="day-num">Day ${day.day}</span>
          <span class="day-date">📅 ${dateStr} (${day.dayName})</span>
          ${typeBadge}
        </div>
        <div class="slots-row">${slotPills}</div>
      </div>`;
    }).join('');

    return `<div class="week-block">
      <div class="week-header">
        Week ${wi + 1} <span class="week-count">${wStart} – ${wEnd} • ${week.length} days</span>
      </div>
      ${days}
    </div>`;
  }).join('');
}
