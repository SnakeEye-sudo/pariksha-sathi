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

function buildPlan() {
  const plan = [];
  const examDate = getExamDate();
  const endDate = new Date(examDate);
  endDate.setDate(endDate.getDate() - 15);

  const totalDays = Math.max(1, Math.ceil((endDate - userData.startDate) / 86400000));
  const subjects = getSubjectsList();

  // Per-subject topic pointer — tracks which topic each subject is currently on
  const topicPointers = subjects.map(() => 0);
  // Flat queue: expand all subjects × topics into ordered task list
  // Each task = { subjIdx, topicIdx, microTopics }
  const taskQueue = [];
  let pass = 0;
  while (taskQueue.length < totalDays * 3 + 30) {
    let added = 0;
    subjects.forEach((subj, si) => {
      if (pass < subj.topics.length) {
        taskQueue.push({ si, topicIdx: pass, topic: subj.topics[pass] });
        added++;
      }
    });
    if (added === 0) break;
    pass++;
  }

  let taskIdx = 0;
  let cur = new Date(userData.startDate);

  for (let d = 1; d <= totalDays; d++) {
    const daysLeft = totalDays - d;
    const isMock = daysLeft <= 14 && daysLeft % 7 === 0;
    const isRevision = !isMock && d % 7 === 0;
    const daySlots = [];

    if (isMock) {
      daySlots.push({ type:'mock', subject:'Mock Test', hindi:'मॉक टेस्ट',
        topic:'Full Syllabus Mock Test', microTopics:[], slotType:'morning' });
    } else if (isRevision) {
      // Revision day: revisit last 3 days' topics
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
      // Normal day: 3 subject slots, each with a specific topic
      const slotTypes = ['morning', 'afternoon', 'evening'];
      for (let s = 0; s < 3; s++) {
        if (taskIdx < taskQueue.length) {
          const task = taskQueue[taskIdx++];
          const subj = subjects[task.si];
          const topic = task.topic;
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
      }
    }

    // 1 hr Revision slot (non-mock, non-revision days)
    if (!isMock && !isRevision && d > 1 && plan[d - 2]) {
      const prev = plan[d - 2].slots.filter(s => s.type === 'subject').map(s => s.topic);
      daySlots.push({ type:'revision', subject:'🔄 Quick Revision', hindi:'दोहराई',
        topic: prev.slice(0, 2).join(' + ') || 'Yesterday\'s topics',
        microTopics: prev, slotType:'revision' });
    }

    // Daily Current Affairs — 30 min every day
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
