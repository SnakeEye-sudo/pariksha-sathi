// Master syllabusData object + helper functions
const syllabusData = {
  bpsc15: syl_bpsc15,
  bpsc68: syl_bpsc68,
  upsc: { prelims: syl_upsc_pre, mains: syl_upsc_mains }
};

function getSyllabus() {
  if (userData.exam === 'bpsc') {
    if (userData.bpscClass === 'both') {
      const merged = {};
      Object.entries(syl_bpsc15).forEach(([k,v]) => { merged['[1-5] '+k] = v; });
      Object.entries(syl_bpsc68).forEach(([k,v]) => { merged['[6-8] '+k] = v; });
      return merged;
    }
    return userData.bpscClass === '1-5' ? syl_bpsc15 : syl_bpsc68;
  }
  // UPSC: merge prelims + mains + optional (if selected)
  const base = { ...syl_upsc_pre, ...syl_upsc_mains };
  if (userData.optionalSubject) {
    const optSyl = getOptionalSyllabus(userData.optionalSubject);
    if (optSyl) Object.assign(base, optSyl);
  }
  return base;
}

function getSubjectsList() {
  const syl = getSyllabus();
  const list = Object.entries(syl).map(([name, data]) => ({
    name, marks: data.marks, color: data.color, topics: data.topics
  }));
  // BPSC: Language is qualifying — schedule last
  if (userData.exam === 'bpsc') {
    const langIdx = list.findIndex(s => s.name.includes('Part I') && s.name.includes('Language'));
    if (langIdx > -1) { const [l] = list.splice(langIdx, 1); list.push(l); }
  }
  return list;
}

function getExamDate() {
  return userData.exam === 'bpsc'
    ? new Date('2026-09-22')
    : new Date('2027-05-16');
}

function generatePlan() {
  const name = document.getElementById('userName').value.trim();
  const startDate = document.getElementById('startDate').value;
  if (!name || !startDate) { alert('कृपया नाम और तारीख भरें!'); return; }

  const hoursEl = document.querySelector('input[name="studyHours"]:checked');
  const hours = hoursEl ? parseInt(hoursEl.value) : 4;

  const slots = [];
  document.querySelectorAll('input[name="slot"]:checked').forEach(s => slots.push(s.value));

  let bpscClass = '', optionalSubject = '';
  if (selectedExam === 'bpsc') {
    const bc = document.querySelector('input[name="bpscClass"]:checked');
    bpscClass = bc ? bc.value : '1-5';
  } else {
    const optEl = document.getElementById('upscOptional');
    optionalSubject = optEl ? optEl.value : '';
  }

  userData = { name, exam: selectedExam, bpscClass, optionalSubject, startDate: new Date(startDate), studyHours: hours, timeSlots: slots };
  studyPlan = buildPlan();
  renderPlan();
  showScreen('planScreen');
}

// Subject priority weights by exam type
// Higher weight = more frequently scheduled
// BPSC TRE & UPSC are ARTS-heavy exams — GS/History/Polity/Geography dominate
function getSubjectWeights(subjects, exam) {
  const bpscPriority = {
    // High weight — core GS subjects, max marks
    'GENERAL STUDIES': 5,
    'HISTORY': 5,
    'POLITY': 5,
    'GEOGRAPHY': 5,
    'ENVIRONMENT': 4,
    'ECONOMY': 4,
    'CHILD DEVELOPMENT': 4,
    'PEDAGOGY': 4,
    // Medium — supporting subjects
    'SCIENCE': 3,
    'REASONING': 3,
    'COMPUTER': 2,
    // Low — maths is small section, language is qualifying
    'MATHEMATICS': 2,
    'MATHS': 2,
    'LANGUAGE': 1,
    'HINDI': 1,
    'ENGLISH': 1,
  };
  const upscPriority = {
    // Very high — core mains subjects
    'HISTORY': 5,
    'POLITY': 5,
    'GEOGRAPHY': 5,
    'ECONOMY': 5,
    'ENVIRONMENT': 5,
    'ETHICS': 5,
    'OPTIONAL': 5,
    // High — prelims + IR
    'PRELIMS': 4,
    'INTERNATIONAL': 4,
    'GOVERNANCE': 4,
    'SOCIAL': 4,
    // Medium — science & tech, security
    'SCIENCE': 3,
    'TECHNOLOGY': 3,
    'SECURITY': 3,
    // Low — no maths in UPSC
    'MATHEMATICS': 1,
    'MATHS': 1,
    'LANGUAGE': 1,
  };

  const priorityMap = exam === 'bpsc' ? bpscPriority : upscPriority;

  return subjects.map(subj => {
    const name = subj.name.toUpperCase();
    let weight = 3; // default medium
    // Match against priority map keys
    for (const [key, w] of Object.entries(priorityMap)) {
      if (name.includes(key)) {
        weight = Math.max(weight, w);
      }
    }
    // Language/qualifying always lowest regardless
    if (name.includes('LANGUAGE') || name.includes('QUALIFYING') ||
        name.includes('PART I') && name.includes('LANG')) {
      weight = 1;
    }
    return weight;
  });
}

function buildPlan() {
  const plan = [];
  const examDate = getExamDate();
  const endDate = new Date(examDate);
  endDate.setDate(endDate.getDate() - 15);

  const totalDays = Math.max(1, Math.ceil((endDate - userData.startDate) / 86400000));
  const subjects = getSubjectsList();
  const weights = getSubjectWeights(subjects, userData.exam);

  // Per-subject topic pointer
  const topicPointers = subjects.map(() => 0);

  // Pick 3 DIFFERENT subjects for a day:
  // Rule 1: Each slot must be a DIFFERENT subject (no same subject twice in one day)
  // Rule 2: If a subject appeared on BOTH yesterday AND day-before, it is blocked today
  // Rule 3: Prefer subjects not seen yesterday (freshness)
  // Rule 4: High-weight subjects get priority in selection order
  function pickDaySubjects(recentDays) {
    const usedYesterday  = new Set(recentDays[0] || []);
    const usedDayBefore  = new Set(recentDays[1] || []);

    // Blocked = appeared 2 days in a row already
    const blocked = new Set(
      [...usedYesterday].filter(si => usedDayBefore.has(si))
    );

    // Build candidate list sorted by priority: fresh > stale > (blocked only if no choice)
    const available = subjects
      .map((_, si) => si)
      .filter(si => topicPointers[si] < subjects[si].topics.length);

    const fresh  = available.filter(si => !usedYesterday.has(si) && !blocked.has(si));
    const stale  = available.filter(si =>  usedYesterday.has(si) && !blocked.has(si));
    const blkd   = available.filter(si =>  blocked.has(si)); // last resort

    // Sort each group by weight descending
    const byWeight = arr => arr.sort((a, b) => weights[b] - weights[a]);
    const ordered = [...byWeight(fresh), ...byWeight(stale), ...byWeight(blkd)];

    // Pick 3 UNIQUE subjects
    const chosen = [];
    const chosenSet = new Set();
    for (const si of ordered) {
      if (chosen.length >= 3) break;
      if (!chosenSet.has(si)) { chosen.push(si); chosenSet.add(si); }
    }

    // Shuffle so same subject isn't always in morning slot
    for (let i = chosen.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
    }

    return chosen;
  }

  const slotTypes = ['morning', 'afternoon', 'evening'];
  let cur = new Date(userData.startDate);
  // Track last 2 days' subject indices for consecutive-day check
  const recentSubjectDays = []; // recentSubjectDays[0] = yesterday, [1] = day before

  for (let d = 1; d <= totalDays; d++) {
    const daysLeft = totalDays - d;
    const isMock = daysLeft <= 14 && daysLeft % 7 === 0;
    const isRevision = !isMock && d % 7 === 0;
    const daySlots = [];

    if (isMock) {
      daySlots.push({ type:'mock', subject:'Mock Test', hindi:'मॉक टेस्ट',
        topic:'Full Syllabus Mock Test', microTopics:[], slotType:'morning' });
    } else if (isRevision) {
      const revTopics = [];
      for (let rb = d - 3; rb < d; rb++) {
        if (plan[rb - 1]) {
          plan[rb - 1].slots.filter(s => s.type === 'subject').forEach(s => {
            revTopics.push(s.topic);
          });
        }
      }
      daySlots.push({ type:'revision', subject:'📖 Revision Day', hindi:'दोहराई',
        topic: revTopics.slice(0, 4).join(' • ') || 'Previous week topics',
        microTopics: revTopics, slotType:'revision' });
    } else {
      // Smart subject selection
      const todaySubjIndices = pickDaySubjects(recentSubjectDays);
      const todayUsed = [];

      todaySubjIndices.forEach((si, s) => {
        const subj = subjects[si];
        const tp = topicPointers[si];
        if (tp < subj.topics.length) {
          const topic = subj.topics[tp];
          topicPointers[si]++;
          todayUsed.push(si);
          daySlots.push({
            type: 'subject',
            subject: subj.name,
            color: subj.color || '#f59e0b',
            topic: topic.name,
            hindiTopic: topic.hindi || '',
            microTopics: topic.micro || [],
            slotType: slotTypes[s]
          });
        }
      });

      // Update recent days tracker
      recentSubjectDays.unshift(todayUsed);
      if (recentSubjectDays.length > 2) recentSubjectDays.pop();
    }

    // Quick Revision slot — yesterday's topics
    if (!isMock && !isRevision && d > 1 && plan[d - 2]) {
      const prev = plan[d - 2].slots.filter(s => s.type === 'subject').map(s => s.topic);
      daySlots.push({ type:'revision', subject:'🔄 Quick Revision', hindi:'दोहराई',
        topic: prev.slice(0, 2).join(' + ') || 'Yesterday\'s topics',
        microTopics: prev, slotType:'revision' });
    }

    // Daily Current Affairs — 30 min
    daySlots.push({ type:'current_affairs', subject:'📰 Current Affairs',
      hindi:'समसामयिक घटनाएं', topic:'Daily News + Monthly Magazine (30 min)',
      microTopics:[], slotType:'current' });

    plan.push({
      day: d, date: new Date(cur),
      dayName: cur.toLocaleDateString('en-IN', { weekday: 'short' }),
      slots: daySlots, isMock, isRevision
    });
    cur.setDate(cur.getDate() + 1);
  }
  return plan;
}
