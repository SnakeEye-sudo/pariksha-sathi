// ═══════════════════════════════════════════════════════════════
// c19.js — Exam Registry Extension: NEET, JEE Main, JEE Advanced,
//           UPPSC, MPPSC, RPSC RAS, MPSC
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

Object.assign(EXAM_REGISTRY, {

  // ── NEET UG 2026 ─────────────────────────────────────────────
  neet_2026: {
    id: 'neet_2026', title: 'NEET UG 2026', subtitle: 'National Eligibility cum Entrance Test',
    icon: '🩺', color: '#10b981', cardClass: 'neet-card',
    examDate: new Date('2026-05-03'), category: 'medical',
    vacancies: '1 Lakh+ MBBS/BDS/AYUSH Seats', pattern: 'MCQ • 720 Marks • Offline',
    getSyllabus: () => syl_neet,
    priorityMap: {
      'BIOLOGY':5,'BOTANY':5,'ZOOLOGY':5,'PHYSICS':4,'CHEMISTRY':4,
      'ORGANIC':4,'INORGANIC':3,'PHYSICAL':4,'MECHANICS':4,'OPTICS':3,
      'GENETICS':5,'ECOLOGY':4,'HUMAN PHYSIOLOGY':5,'CELL':5,'EVOLUTION':4
    }
  },

  // ── JEE Main 2026 ────────────────────────────────────────────
  jee_main_2026: {
    id: 'jee_main_2026', title: 'JEE Main 2026', subtitle: 'Joint Entrance Exam — NITs/IIITs/GFTIs',
    icon: '⚙️', color: '#3b82f6', cardClass: 'jee-card',
    examDate: new Date('2026-04-02'), category: 'engineering',
    vacancies: 'NITs / IIITs / GFTIs', pattern: 'CBT • 300 Marks • Session 2: Apr 2–9, 2026',
    getSyllabus: () => syl_jee_main,
    priorityMap: {
      'MATHEMATICS':5,'MATHS':5,'PHYSICS':5,'CHEMISTRY':4,
      'ORGANIC':4,'INORGANIC':3,'PHYSICAL':4,'CALCULUS':5,'ALGEBRA':5,
      'MECHANICS':5,'ELECTROSTATICS':4,'OPTICS':3,'THERMODYNAMICS':4
    }
  },

  // ── JEE Advanced 2026 ────────────────────────────────────────
  jee_advanced_2026: {
    id: 'jee_advanced_2026', title: 'JEE Advanced 2026', subtitle: 'Joint Entrance Exam — IITs (IIT Roorkee)',
    icon: '🎓', color: '#f59e0b', cardClass: 'jee-adv-card',
    examDate: new Date('2026-05-17'), category: 'engineering',
    vacancies: 'IIT Seats (~17,000)', pattern: 'Paper 1 + Paper 2 • CBT',
    getSyllabus: () => syl_jee_advanced,
    priorityMap: {
      'MATHEMATICS':5,'MATHS':5,'PHYSICS':5,'CHEMISTRY':4,
      'ORGANIC':5,'INORGANIC':4,'PHYSICAL':5,'CALCULUS':5,'ALGEBRA':5,
      'MECHANICS':5,'ELECTROSTATICS':5,'OPTICS':4,'THERMODYNAMICS':5
    }
  },

  // ── UPPSC PCS 2026 ───────────────────────────────────────────
  uppsc_2026: {
    id: 'uppsc_2026', title: 'UPPSC PCS 2026', subtitle: 'Uttar Pradesh Public Service Commission',
    icon: '⚖️', color: '#8b5cf6', cardClass: 'uppsc-card',
    examDate: new Date('2026-12-06'), category: 'state_psc',
    vacancies: '~500+', pattern: 'Pre + Mains + Interview',
    getSyllabus: () => syl_uppsc,
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':4,
      'SCIENCE':4,'CURRENT':4,'UP':5,'UTTAR PRADESH':5,'ETHICS':4,
      'REASONING':3,'MATHEMATICS':2,'LANGUAGE':1,'HINDI':2,'ENGLISH':1
    }
  },

  // ── MPPSC SSE 2026 ───────────────────────────────────────────
  mppsc_2026: {
    id: 'mppsc_2026', title: 'MPPSC SSE 2026', subtitle: 'Madhya Pradesh State Service Exam',
    icon: '⚖️', color: '#f97316', cardClass: 'mppsc-card',
    examDate: new Date('2026-04-26'), category: 'state_psc',
    vacancies: '155–191', pattern: 'Pre + Mains + Interview',
    getSyllabus: () => syl_mppsc,
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':4,
      'SCIENCE':4,'CURRENT':4,'MP':5,'MADHYA PRADESH':5,'APTITUDE':4,
      'REASONING':4,'HINDI':3,'MATHEMATICS':2,'LANGUAGE':1
    }
  },

  // ── RPSC RAS 2026 ────────────────────────────────────────────
  rpsc_ras_2026: {
    id: 'rpsc_ras_2026', title: 'RPSC RAS 2026', subtitle: 'Rajasthan Administrative Service',
    icon: '⚖️', color: '#ec4899', cardClass: 'rpsc-card',
    examDate: new Date('2026-06-15'), category: 'state_psc',
    vacancies: '~500+', pattern: 'Pre + Mains + Interview (New Syllabus 2026)',
    getSyllabus: () => syl_rpsc_ras,
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':4,
      'SCIENCE':4,'CURRENT':4,'RAJASTHAN':5,'CULTURE':5,'ETHICS':4,
      'REASONING':3,'MATHEMATICS':2,'LANGUAGE':1,'HINDI':2,'ENGLISH':1
    }
  },

  // ── MPSC Rajyaseva 2026 ──────────────────────────────────────
  mpsc_2026: {
    id: 'mpsc_2026', title: 'MPSC Rajyaseva 2026', subtitle: 'Maharashtra Public Service Commission',
    icon: '⚖️', color: '#06b6d4', cardClass: 'mpsc-card',
    examDate: new Date('2026-03-29'), category: 'state_psc',
    vacancies: '79 (Group A & B)', pattern: 'Pre + Mains + Interview',
    getSyllabus: () => syl_mpsc,
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':4,
      'SCIENCE':4,'CURRENT':4,'MAHARASHTRA':5,'MARATHI':3,'ETHICS':4,
      'REASONING':3,'MATHEMATICS':2,'LANGUAGE':1,'ENGLISH':2
    }
  }

});
