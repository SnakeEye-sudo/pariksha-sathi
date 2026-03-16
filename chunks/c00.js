// ── Language System — ParikshaSathi ──────────────────────────
// lang: 'hi' (default) | 'en'
let lang = localStorage.getItem('ps_lang') || 'hi';

function setLang(l) {
  lang = l;
  localStorage.setItem('ps_lang', l);
  applyLang();
  // Re-render plan if on plan screen
  if (document.getElementById('planScreen').classList.contains('active') && studyPlan.length) {
    renderPlan();
  }
}

function t(key) { return (T[lang] && T[lang][key]) ? T[lang][key] : (T['hi'][key] || key); }

// ── All UI strings ────────────────────────────────────────────
const T = {
  hi: {
    // Hero
    badge:          '🎯 Er. Sangam Krishna — 100% Free Study Planner',
    heroTitle1:     'आपकी परीक्षा,',
    heroTitle2:     'आपका Plan',
    heroSub:        'Personalized Day-by-Day Study Plan • Daily Revision • Time Slots • PDF Download',
    chooseLabel:    'अपना Exam चुनें 👇',
    statExams:      '11+ Exams',
    statVacancies:  'BPSC Vacancies',
    statFree:       'Free',
    statPlans:      'Plans',
    // Exam cards
    bpscTitle:      'BPSC TRE 4.0',
    bpscSub:        'Bihar Primary/Middle Teacher',
    bpscDate:       'Exam: Sep 2026 (Tentative)',
    bpscVac:        '46,595 Vacancies',
    bpscClass:      'Class 1–5 (PRT) & 6–8 (TGT)',
    bpscBtn:        'Plan बनाएं',
    upscTitle:      'UPSC CSE 2026/27',
    upscSub:        'Civil Services Examination',
    upscDate:       'Prelims: May 2026 or 2027',
    upscService:    'IAS / IPS / IFS',
    upscPattern:    'Pre + Mains + Interview',
    upscBtn:        'Plan बनाएं',
    ribbon:         'Most Popular',
    // Footer note
    footerNote:     'Er. Sangam Krishna ने ParikshaSathi इसलिए बनाया क्योंकि उनका मानना है कि हर aspirant को एक बराबर मौका मिलना चाहिए — चाहे उनकी आर्थिक स्थिति कुछ भी हो। किसी की तैयारी पैसों की वजह से नहीं रुकनी चाहिए। इसीलिए यह tool हमेशा 100% Free रहेगा।',
    footerBy:       'Made with ❤️ by',
    footerSub:      'BPSC TRE 4.0 | UPSC CSE 2026/27 | BPSC CCE 71st/72nd | SSC CGL | IBPS PO | SBI PO | IBPS RRB | IBPS Clerk | NDA 2026',
    // Form
    backBtn:        '← वापस',
    formTitleBpsc:  'BPSC TRE 4.0 — जानकारी भरें',
    formSubBpsc:    'Class 1-5 (PRT) या 6-8 (TGT) चुनें और plan पाएं',
    formTitleUpsc:  'UPSC CSE — जानकारी भरें',
    formSubUpsc:    'Prelims + Mains + Optional का personalized plan पाएं',
    bpscClassQ:     'किस Class का Syllabus चाहिए?',
    upscYearQ:      'आप UPSC CSE किस साल दे रहे हैं?',
    optionalQ:      'Optional Subject चुनें',
    optionalHint:   'Optional subject 500 marks का होता है — plan में शामिल होगा',
    optionalTip:    'Popular choices: Anthropology, PSIR, Geography, Sociology, Public Administration — अपने graduation background के हिसाब से चुनें',
    nameQ:          'आपका नाम',
    namePlaceholder:'जैसे: Rahul Kumar',
    dateQ:          'पढ़ाई शुरू करने की तारीख',
    hoursQ:         'रोज़ कितने घंटे पढ़ सकते हैं?',
    slotsQ:         'आप किस समय पढ़ सकते हैं?',
    slotsHint:      'इससे आपका plan और personalized बनेगा',
    generateBtn:    'Plan Generate करें',
    // Plan screen
    pdfBtn:         '⬇️ PDF',
    editBtn:        '✏️ Edit',
    resetBtn:       '🔄 Naya Plan',
    planTitle:      'का Study Plan',
    daysLeft:       'दिन बाकी',
    complete:       'Complete',
    tabPlan:        '📅 Day Plan',
    tabSyllabus:    '📚 Syllabus',
    tabPYQ:         '📝 PYQ Tips',
    tabInfo:        'ℹ️ Exam Info',
    // Day plan
    dayLabel:       'Day',
    todayBadge:     '⚡ Today',
    mockBadge:      '🎯 Mock Test',
    revBadge:       '🔄 Revision Day',
    subjectsCount:  'subjects',
    mockTitle:      'Full Syllabus Mock Test',
    mockSub:        'सभी topics का full-length practice test दें। Time management practice करें।',
    caTitle:        'Daily News + Monthly Magazine',
    caSub:          'The Hindu / Dainik Jagran पढ़ें। Important events note करें।',
    revTitle:       'Quick Revision',
    // Syllabus
    sylHeading:     '📚 Complete Syllabus',
    marksLabel:     'Marks',
    // Lang toggle
    langToggleHi:   'हिंदी',
    langToggleEn:   'English',
  },
  en: {
    // Hero
    badge:          '🎯 Er. Sangam Krishna — 100% Free Study Planner',
    heroTitle1:     'Your Exam,',
    heroTitle2:     'Your Plan',
    heroSub:        'Personalized Day-by-Day Study Plan • Daily Revision • Time Slots • PDF Download',
    chooseLabel:    'Choose Your Exam 👇',
    statExams:      '11+ Exams',
    statVacancies:  'BPSC Vacancies',
    statFree:       'Free',
    statPlans:      'Plans',
    // Exam cards
    bpscTitle:      'BPSC TRE 4.0',
    bpscSub:        'Bihar Primary/Middle Teacher',
    bpscDate:       'Exam: Sep 2026 (Tentative)',
    bpscVac:        '46,595 Vacancies',
    bpscClass:      'Class 1–5 (PRT) & 6–8 (TGT)',
    bpscBtn:        'Build My Plan',
    upscTitle:      'UPSC CSE 2026/27',
    upscSub:        'Civil Services Examination',
    upscDate:       'Prelims: May 2026 or 2027',
    upscService:    'IAS / IPS / IFS',
    upscPattern:    'Pre + Mains + Interview',
    upscBtn:        'Build My Plan',
    ribbon:         'Most Popular',
    // Footer note
    footerNote:     'Er. Sangam Krishna built ParikshaSathi because he believes every aspirant deserves a fair shot — regardless of their financial background. Quality preparation guidance should never be a privilege. That\'s why this tool is, and will always remain, 100% Free.',
    footerBy:       'Made with ❤️ by',
    footerSub:      'BPSC TRE 4.0 | UPSC CSE 2026/27 | BPSC CCE 71st/72nd | SSC CGL | IBPS PO | SBI PO | IBPS RRB | IBPS Clerk | NDA 2026',
    // Form
    backBtn:        '← Back',
    formTitleBpsc:  'BPSC TRE 4.0 — Fill Details',
    formSubBpsc:    'Choose Class 1-5 (PRT) or 6-8 (TGT) and get your plan',
    formTitleUpsc:  'UPSC CSE — Fill Details',
    formSubUpsc:    'Get a personalized plan for Prelims + Mains + Optional',
    bpscClassQ:     'Which Class Syllabus do you need?',
    upscYearQ:      'Which year are you appearing for UPSC CSE?',
    optionalQ:      'Choose Optional Subject',
    optionalHint:   'Optional subject carries 500 marks — it will be included in your plan',
    optionalTip:    'Popular choices: Anthropology, PSIR, Geography, Sociology, Public Administration — choose based on your graduation background',
    nameQ:          'Your Name',
    namePlaceholder:'e.g. Rahul Kumar',
    dateQ:          'Study Start Date',
    hoursQ:         'How many hours can you study daily?',
    slotsQ:         'When can you study?',
    slotsHint:      'This will make your plan more personalized',
    generateBtn:    'Generate My Plan',
    // Plan screen
    pdfBtn:         '⬇️ PDF',
    editBtn:        '✏️ Edit',
    resetBtn:       '🔄 New Plan',
    planTitle:      '\'s Study Plan',
    daysLeft:       'days left',
    complete:       'Complete',
    tabPlan:        '📅 Day Plan',
    tabSyllabus:    '📚 Syllabus',
    tabPYQ:         '📝 PYQ Tips',
    tabInfo:        'ℹ️ Exam Info',
    // Day plan
    dayLabel:       'Day',
    todayBadge:     '⚡ Today',
    mockBadge:      '🎯 Mock Test',
    revBadge:       '🔄 Revision Day',
    subjectsCount:  'subjects',
    mockTitle:      'Full Syllabus Mock Test',
    mockSub:        'Attempt a full-length practice test covering all topics. Focus on time management.',
    caTitle:        'Daily News + Monthly Magazine',
    caSub:          'Read The Hindu / Indian Express. Note important events.',
    revTitle:       'Quick Revision',
    // Syllabus
    sylHeading:     '📚 Complete Syllabus',
    marksLabel:     'Marks',
    // Lang toggle
    langToggleHi:   'हिंदी',
    langToggleEn:   'English',
  }
};

// ── Apply language to all data-i18n elements ──────────────────
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[lang] && T[lang][key] !== undefined) el.textContent = T[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (T[lang] && T[lang][key] !== undefined) el.placeholder = T[lang][key];
  });
  // Update lang toggle button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  // Update html lang attribute
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
}
