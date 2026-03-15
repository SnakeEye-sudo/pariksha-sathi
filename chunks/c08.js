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
// Higher weight = more slots allocated = more important for exam
function getSubjectWeights(subjects, exam) {
  const bpscPriority = {
    'Mathematics': 5, 'Reasoning': 4, 'General Science': 4,
    'General Studies': 4, 'History': 3, 'Geography': 3,
    'Polity': 3, 'Economy': 3, 'Environment': 2,
    'Computer': 2, 'Child Development': 3, 'Language': 1
  };
  const upscPriority = {
    'Prelims': 5, 'History': 4, 'Geography': 4, 'Polity': 5,
    'Economy': 4, 'Environment': 4, 'Science': 3, 'Ethics': 3,
    'IR': 3, 'Internal Security': 2, 'Optional': 5
  };
  const priorityMap = exam === 'bpsc' ? bpscPriority : upscPriority;

  return subjects.map(subj => {
    let weight = 2; // default
    const name = subj.name.toUpperCase();
    Object.entries(priorityMap).forEach(([key, w]) => {
      if (name.includes(key.toUpperCase())) weight = Math.max(weight, w);
    });
    // Optional subject always high priority
    if (name.includes('OPTIONAL') || name.includes('PAPER I') || name.includes('PAPER II')) weight = 5;
    // Language/qualifying always lowest
    if (name.includes('LANGUAGE') || name.includes('QUALIFYING')) weight = 1;
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

  // Build weighted slot pool: subject appears weight times per cycle
  // This ensures high-priority subjects get more coverage
  function buildSlotPool(excludeRecent) {
    const pool = [];
    subjects.forEach((subj, si) => {
      if (topicPointers[si] >= subj.topics.length) return; // exhausted
      const w = weights[si];
      for (let i = 0; i < w; i++) pool.push(si);
    });
    // Shuffle pool for randomness
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  }

  // Pick 3 subjects for a day with these constraints:
  // 1. Min 2 different subjects per day
  // 2. No subject that appeared in BOTH of the last 2 days (max 2 consecutive days)
  // 3. Prefer subjects not seen yesterday
  function pickDaySubjects(recentDays) {
    // recentDays = array of last 2 days' subject indices used
    const usedYesterday = recentDays[0] || [];
    const usedDayBefore = recentDays[1] || [];

    // Subjects that appeared both yesterday AND day before = blocked (2 consecutive days done)
    const blocked = new Set(
      usedYesterday.filter(si => usedDayBefore.includes(si))
    );

    const pool = buildSlotPool();
    const chosen = [];
    const chosenSet = new Set();

    // Try to pick 3 slots ensuring min 2 different subjects
    // Pass 1: prefer subjects NOT seen yesterday
    const fresh = pool.filter(si => !usedYesterday.includes(si) && !blocked.has(si));
    const stale = pool.filter(si => usedYesterday.includes(si) && !blocked.has(si));
    const ordered = [...fresh, ...stale];

    for (const si of ordered) {
      if (chosen.length >= 3) break;
      if (topicPointers[si] >= subjects[si].topics.length) continue;
      chosen.push(si);
      chosenSet.add(si);
    }

    // If we couldn't fill 3 slots (all exhausted), allow blocked subjects
    if (chosen.length < 3) {
      for (const si of pool) {
        if (chosen.length >= 3) break;
        if (topicPointers[si] >= subjects[si].topics.length) continue;
        if (!chosenSet.has(si)) { chosen.push(si); chosenSet.add(si); }
        else if (chosen.length < 3) chosen.push(si); // allow repeat if no choice
      }
    }

    // Enforce min 2 different subjects: if all 3 are same, swap slot 2
    const uniqueInDay = new Set(chosen);
    if (uniqueInDay.size < 2 && chosen.length >= 2) {
      // Find any different subject
      for (const si of pool) {
        if (!uniqueInDay.has(si) && topicPointers[si] < subjects[si].topics.length) {
          chosen[1] = si;
          break;
        }
      }
    }

    // Shuffle the 3 chosen slots so same subject isn't always morning
    for (let i = chosen.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
    }

    return chosen.slice(0, 3);
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
