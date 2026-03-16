// ═══════════════════════════════════════════════════════════════
// c14.js — Exam Registry: All exams March 2026 – Dec 2027
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

// ── EXAM REGISTRY ────────────────────────────────────────────
// Each entry: { id, title, subtitle, icon, color, examDate, category,
//               vacancies, pattern, cardClass, syllabus }
const EXAM_REGISTRY = {

  // ── 1. BPSC TRE 4.0 ─────────────────────────────────────────
  bpsc_tre: {
    id: 'bpsc_tre', title: 'BPSC TRE 4.0', subtitle: 'Bihar Primary/Middle Teacher',
    icon: '🏫', color: '#f59e0b', cardClass: 'bpsc-card',
    examDate: new Date('2026-09-22'), category: 'teaching',
    vacancies: '46,595', pattern: 'MCQ • 150 Marks • No Negative',
    ribbon: 'Most Popular',
    getSyllabus: (ud) => {
      if (ud.bpscClass === 'both') {
        const m = {};
        Object.entries(syl_bpsc15).forEach(([k,v]) => { m['[1-5] '+k] = v; });
        Object.entries(syl_bpsc68).forEach(([k,v]) => { m['[6-8] '+k] = v; });
        return m;
      }
      return ud.bpscClass === '1-5' ? syl_bpsc15 : syl_bpsc68;
    },
    priorityMap: {
      'GENERAL STUDIES':5,'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,
      'ENVIRONMENT':4,'ECONOMY':4,'CHILD DEVELOPMENT':4,'PEDAGOGY':4,
      'SCIENCE':3,'REASONING':3,'COMPUTER':2,'MATHEMATICS':2,'MATHS':2,
      'LANGUAGE':1,'HINDI':1,'ENGLISH':1
    }
  },

  // ── 2. UPSC CSE 2026 ─────────────────────────────────────────
  upsc_2026: {
    id: 'upsc_2026', title: 'UPSC CSE 2026', subtitle: 'Civil Services Examination',
    icon: '🏛️', color: '#10b981', cardClass: 'upsc-card',
    examDate: new Date('2026-05-24'), category: 'civil_services',
    vacancies: '~1000+', pattern: 'Pre + Mains + Interview',
    getSyllabus: (ud) => {
      const base = { ...syl_upsc_pre, ...syl_upsc_mains };
      if (ud.optionalSubject) { const o = getOptionalSyllabus(ud.optionalSubject); if (o) Object.assign(base, o); }
      return base;
    },
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':5,
      'ETHICS':5,'OPTIONAL':5,'PRELIMS':4,'INTERNATIONAL':4,'GOVERNANCE':4,
      'SOCIAL':4,'SCIENCE':3,'TECHNOLOGY':3,'SECURITY':3,'MATHEMATICS':1,'LANGUAGE':1
    }
  },

  // ── 3. UPSC CSE 2027 ─────────────────────────────────────────
  upsc_2027: {
    id: 'upsc_2027', title: 'UPSC CSE 2027', subtitle: 'Civil Services Examination',
    icon: '🏛️', color: '#10b981', cardClass: 'upsc-card',
    examDate: new Date('2027-05-16'), category: 'civil_services',
    vacancies: '~1000+', pattern: 'Pre + Mains + Interview',
    getSyllabus: (ud) => {
      const base = { ...syl_upsc_pre, ...syl_upsc_mains };
      if (ud.optionalSubject) { const o = getOptionalSyllabus(ud.optionalSubject); if (o) Object.assign(base, o); }
      return base;
    },
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':5,
      'ETHICS':5,'OPTIONAL':5,'PRELIMS':4,'INTERNATIONAL':4,'GOVERNANCE':4,
      'SOCIAL':4,'SCIENCE':3,'TECHNOLOGY':3,'SECURITY':3,'MATHEMATICS':1,'LANGUAGE':1
    }
  },

  // ── 4. BPSC 72nd CCE ─────────────────────────────────────────
  bpsc_72: {
    id: 'bpsc_72', title: 'BPSC 72nd CCE', subtitle: 'Bihar Combined Competitive Exam',
    icon: '⚖️', color: '#8b5cf6', cardClass: 'bpsc72-card',
    examDate: new Date('2026-07-26'), category: 'state_psc',
    vacancies: '~1500+', pattern: 'Pre + Mains + Interview',
    getSyllabus: () => syl_bpsc_cce,
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':4,
      'SCIENCE':4,'CURRENT':4,'BIHAR':5,'REASONING':3,'MATHEMATICS':3,
      'LANGUAGE':1,'HINDI':1,'ENGLISH':1
    }
  },

  // ── 5. SSC CGL 2026 ──────────────────────────────────────────
  ssc_cgl: {
    id: 'ssc_cgl', title: 'SSC CGL 2026', subtitle: 'Combined Graduate Level',
    icon: '📋', color: '#3b82f6', cardClass: 'ssc-card',
    examDate: new Date('2026-05-15'), category: 'ssc',
    vacancies: '~17,000+', pattern: 'Tier 1 + Tier 2 (MCQ)',
    getSyllabus: () => syl_ssc_cgl,
    priorityMap: {
      'GENERAL AWARENESS':5,'HISTORY':4,'POLITY':4,'GEOGRAPHY':4,'ECONOMY':4,
      'SCIENCE':4,'CURRENT':4,'REASONING':5,'QUANTITATIVE':5,'ENGLISH':4,
      'MATHEMATICS':5,'MATHS':5,'COMPUTER':3,'STATISTICS':3
    }
  },

  // ── 6. IBPS PO 2026 ──────────────────────────────────────────
  ibps_po: {
    id: 'ibps_po', title: 'IBPS PO 2026', subtitle: 'Probationary Officer — Public Sector Banks',
    icon: '🏦', color: '#06b6d4', cardClass: 'ibps-card',
    examDate: new Date('2026-08-22'), category: 'banking',
    vacancies: '~4000+', pattern: 'Prelims + Mains + Interview',
    getSyllabus: () => syl_ibps_po,
    priorityMap: {
      'REASONING':5,'QUANTITATIVE':5,'ENGLISH':4,'GENERAL AWARENESS':5,
      'BANKING':5,'ECONOMY':4,'CURRENT':4,'COMPUTER':3,'MATHEMATICS':5,'MATHS':5
    }
  },

  // ── 7. SBI PO 2026 ───────────────────────────────────────────
  sbi_po: {
    id: 'sbi_po', title: 'SBI PO 2026', subtitle: 'Probationary Officer — State Bank of India',
    icon: '🏦', color: '#22c55e', cardClass: 'sbi-card',
    examDate: new Date('2026-09-01'), category: 'banking',
    vacancies: '~2000+', pattern: 'Prelims + Mains + Interview',
    getSyllabus: () => syl_sbi_po,
    priorityMap: {
      'REASONING':5,'QUANTITATIVE':5,'ENGLISH':4,'GENERAL AWARENESS':5,
      'BANKING':5,'ECONOMY':4,'CURRENT':4,'COMPUTER':3,'MATHEMATICS':5,'MATHS':5,
      'DATA':4,'ANALYSIS':4
    }
  },

  // ── 8. IBPS RRB PO 2026 ──────────────────────────────────────
  ibps_rrb: {
    id: 'ibps_rrb', title: 'IBPS RRB PO 2026', subtitle: 'Officer Scale-I — Regional Rural Banks',
    icon: '🌾', color: '#f97316', cardClass: 'rrb-card',
    examDate: new Date('2026-11-21'), category: 'banking',
    vacancies: '~8000+', pattern: 'Prelims + Mains',
    getSyllabus: () => syl_ibps_rrb,
    priorityMap: {
      'REASONING':5,'QUANTITATIVE':5,'GENERAL AWARENESS':5,'BANKING':5,
      'HINDI':3,'ENGLISH':3,'COMPUTER':3,'MATHEMATICS':5,'MATHS':5,'ECONOMY':4
    }
  },

  // ── 9. IBPS Clerk 2026 ───────────────────────────────────────
  ibps_clerk: {
    id: 'ibps_clerk', title: 'IBPS Clerk 2026', subtitle: 'Clerical Cadre — Public Sector Banks',
    icon: '📑', color: '#a855f7', cardClass: 'clerk-card',
    examDate: new Date('2026-12-06'), category: 'banking',
    vacancies: '~6000+', pattern: 'Prelims + Mains',
    getSyllabus: () => syl_ibps_clerk,
    priorityMap: {
      'REASONING':5,'QUANTITATIVE':5,'ENGLISH':4,'GENERAL AWARENESS':5,
      'BANKING':4,'COMPUTER':3,'MATHEMATICS':5,'MATHS':5,'CURRENT':4
    }
  },

  // ── 10. NDA 2026 (I) ─────────────────────────────────────────
  nda_2026: {
    id: 'nda_2026', title: 'NDA 2026 (I)', subtitle: 'National Defence Academy',
    icon: '⚔️', color: '#ef4444', cardClass: 'nda-card',
    examDate: new Date('2026-04-12'), category: 'defence',
    vacancies: '~400+', pattern: 'Maths + GAT (Written) + SSB',
    getSyllabus: () => syl_nda,
    priorityMap: {
      'MATHEMATICS':5,'MATHS':5,'PHYSICS':5,'CHEMISTRY':4,'BIOLOGY':3,
      'HISTORY':4,'POLITY':4,'GEOGRAPHY':4,'ECONOMY':3,'ENGLISH':4,
      'REASONING':4,'CURRENT':4,'SCIENCE':4,'GENERAL':4
    }
  },

  // ── 11. BPSC 71st CCE Mains ──────────────────────────────────
  bpsc_71: {
    id: 'bpsc_71', title: 'BPSC 71st CCE', subtitle: 'Bihar Combined Competitive Exam',
    icon: '⚖️', color: '#ec4899', cardClass: 'bpsc71-card',
    examDate: new Date('2026-04-25'), category: 'state_psc',
    vacancies: '1,298', pattern: 'Mains + Interview',
    getSyllabus: () => syl_bpsc_cce,
    priorityMap: {
      'HISTORY':5,'POLITY':5,'GEOGRAPHY':5,'ECONOMY':5,'ENVIRONMENT':4,
      'SCIENCE':4,'CURRENT':4,'BIHAR':5,'REASONING':3,'MATHEMATICS':3,
      'LANGUAGE':1,'HINDI':1,'ENGLISH':1
    }
  }
};

// Helper: get exam config by id
function getExamConfig(examId) {
  return EXAM_REGISTRY[examId] || null;
}
