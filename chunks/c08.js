// Master syllabusData object + helper functions
const syllabusData = {
  bpsc15: syl_bpsc15,
  bpsc68: syl_bpsc68,
  upsc: { prelims: syl_upsc_pre, mains: syl_upsc_mains }
};

function getSyllabus() {
  if (userData.exam === 'bpsc') {
    if (userData.bpscClass === 'both') {
      // Merge 1-5 and 6-8
      const merged = {};
      Object.entries(syl_bpsc15).forEach(([k,v]) => { merged['[1-5] '+k] = v; });
      Object.entries(syl_bpsc68).forEach(([k,v]) => { merged['[6-8] '+k] = v; });
      return merged;
    }
    return userData.bpscClass === '1-5' ? syl_bpsc15 : syl_bpsc68;
  }
  // UPSC — prelims + mains combined
  return { ...syl_upsc_pre, ...syl_upsc_mains };
}

function getSubjectsList() {
  const syl = getSyllabus();
  return Object.entries(syl).map(([name, data]) => ({
    name, marks: data.marks, color: data.color, topics: data.topics
  }));
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

  let bpscClass = '';
  if (selectedExam === 'bpsc') {
    const bc = document.querySelector('input[name="bpscClass"]:checked');
    bpscClass = bc ? bc.value : '1-5';
  }

  userData = {
    name, exam: selectedExam, bpscClass,
    startDate: new Date(startDate),
    studyHours: hours, timeSlots: slots
  };

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
  let cur = new Date(userData.startDate);
  let subIdx = 0;

  for (let d = 1; d <= totalDays; d++) {
    const daysLeft = totalDays - d;
    const isMock = daysLeft <= 14 && daysLeft % 7 === 0;
    const isRevision = !isMock && d % 7 === 0;

    const daySlots = [];

    if (isMock) {
      daySlots.push({ type:'mock', subject:'Mock Test', hindi:'मॉक टेस्ट',
        topic:'Full Syllabus Mock Test', slotType:'morning' });
    } else {
      // 3 subject slots
      for (let s = 0; s < 3; s++) {
        const subj = subjects[subIdx % subjects.length];
        const topicIdx = Math.floor(subIdx / subjects.length) % subj.topics.length;
        const topic = subj.topics[topicIdx];
        daySlots.push({
          type:'subject', subject: subj.name, hindi:'',
          topic: topic.name, hindiTopic: topic.hindi || '',
          microTopics: topic.micro || [],
          slotType: s===0?'morning': s===1?'afternoon':'evening'
        });
        subIdx++;
      }
      // Revision slot
      if (d > 1 && plan[d-2]) {
        const prev = plan[d-2].slots.filter(s=>s.type==='subject').map(s=>s.subject);
        daySlots.push({ type:'revision', subject:'Revision', hindi:'दोहराई',
          topic: prev.slice(0,2).join(', ') || 'Previous topics',
          slotType:'revision' });
      }
    }

    // Daily Current Affairs (30 min) — every day
    daySlots.push({ type:'current_affairs', subject:'Current Affairs',
      hindi:'समसामयिक घटनाएं', topic:'Daily News + Monthly Magazine (30 min)',
      slotType:'current' });

    plan.push({
      day: d, date: new Date(cur),
      dayName: cur.toLocaleDateString('en-IN',{weekday:'short'}),
      slots: daySlots, isMock, isRevision
    });
    cur.setDate(cur.getDate() + 1);
  }
  return plan;
}
