// Smart Study Planner - Complete Application
// By Er. Sangam Krishna

// Global variables
let selectedExam = '';
let userData = {};
let studyPlan = [];

// Screen navigation
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// Exam selection
function selectExam(exam) {
  selectedExam = exam;
  const formTitle = document.getElementById('formTitle');
  const bpscClassGroup = document.getElementById('bpscClassGroup');
  
  if (exam === 'bpsc') {
    formTitle.textContent = '📝 BPSC TRE 4.0 - अपनी जानकारी भरें';
    bpscClassGroup.classList.remove('hidden');
  } else {
    formTitle.textContent = '📝 UPSC CSE 2027 - अपनी जानकारी भरें';
    bpscClassGroup.classList.add('hidden');
  }
  
  showScreen('formScreen');
}

// Complete syllabus data
const syllabusData = {
  bpsc: {
    '1-5': {
      'Language': {
        marks: 30,
        hindi: true,
        topics: [
          {
            name: 'English Grammar',
            hindi: 'अंग्रेजी व्याकरण',
            micro: [
              'Tenses (all 12 types)',
              'Parts of Speech',
              'Articles',
              'Voice (Active/Passive)',
              'Narration (Direct/Indirect)',
              'Sentence Correction',
              'Comprehension',
              'Synonyms & Antonyms',
              'One-word substitution',
              'Idioms'
            ]
          },
          {
            name: 'Hindi Grammar',
            hindi: 'हिंदी व्याकरण',
            micro: [
              'वर्ण विचार',
              'संधि (स्वर/व्यंजन/विसर्ग)',
              'समास (6 प्रकार)',
              'उपसर्ग-प्रत्यय',
              'पर्यायवाची-विलोम (100-100)',
              'मुहावरे-लोकोक्तियाँ (100+50)',
              'वाक्य शुद्धि',
              'रस-छंद-अलंकार',
              'अपठित गद्यांश'
            ]
          }
        ]
      },
      'General Studies': {
        marks: 120,
        hindi: false,
        topics: [
          {
            name: 'Elementary Mathematics',
            hindi: 'प्रारंभिक गणित',
            micro: [
              'Number System (types, HCF/LCM, fractions, BODMAS, series)',
              'Percentage',
              'Profit & Loss',
              'Simple & Compound Interest',
              'Ratio & Proportion',
              'Average',
              'Time & Work',
              'Speed, Distance & Time',
              'Pipes & Cisterns',
              'Boat & Stream',
              'Geometry & Mensuration (2D & 3D shapes)'
            ]
          },
          {
            name: 'Mental Ability/Reasoning',
            hindi: 'मानसिक क्षमता/तर्क',
            micro: [
              'Analogy',
              'Classification',
              'Series',
              'Coding-Decoding',
              'Blood Relations',
              'Direction-Distance',
              'Ranking',
              'Venn Diagram',
              'Syllogism',
              'Seating Arrangement',
              'Puzzles',
              'Statement-Conclusion'
            ]
          },
          {
            name: 'General Science - Physics',
            hindi: 'सामान्य विज्ञान - भौतिकी',
            micro: [
              'Motion, Force, Newton\'s Laws',
              'Work, Energy, Power',
              'Light (reflection, refraction, lenses)',
              'Sound (wave properties, echo)',
              'Heat (conduction, convection, radiation)',
              'Electricity (Ohm\'s law, circuits)',
              'Magnetism',
              'Simple Machines'
            ]
          },
          {
            name: 'General Science - Chemistry',
            hindi: 'सामान्य विज्ञान - रसायन',
            micro: [
              'Matter & States',
              'Atoms & Molecules',
              'Acids, Bases, Salts (pH scale)',
              'Chemical Reactions',
              'Metals & Non-metals',
              'Carbon Compounds',
              'Everyday Chemistry'
            ]
          },
          {
            name: 'General Science - Biology',
            hindi: 'सामान्य विज्ञान - जीव विज्ञान',
            micro: [
              'Cell (structure, organelles, division)',
              'Plant Kingdom (photosynthesis, transpiration, reproduction)',
              'Animal Kingdom (classification)',
              'Human Body Systems (digestive, respiratory, circulatory, nervous, excretory, reproductive)',
              'Diseases (bacterial, viral, deficiency)',
              'Nutrition',
              'Ecosystem & Food Chain',
              'Biodiversity'
            ]
          },
          {
            name: 'Social Science - History',
            hindi: 'सामाजिक विज्ञान - इतिहास',
            micro: [
              'Ancient India (Indus Valley, Vedic, Maurya, Gupta)',
              'Medieval India (Delhi Sultanate, Mughal Empire, Bhakti-Sufi)',
              'Modern India (British rule, social reforms, 1857 revolt)',
              'Indian National Movement (INC formation, Partition of Bengal, Non-Cooperation, Civil Disobedience, Quit India)',
              'Role of Bihar (Champaran, JP Narayan, Rajendra Prasad)',
              'Important Leaders'
            ]
          },
          {
            name: 'Social Science - Polity',
            hindi: 'सामाजिक विज्ञान - राजनीति',
            micro: [
              'Constitution (Preamble, Fundamental Rights Art 12-35, DPSP Art 36-51, Fundamental Duties)',
              'Parliament (Lok Sabha, Rajya Sabha)',
              'President, Prime Minister, Cabinet',
              'Supreme Court, High Court',
              'Panchayati Raj (73rd, 74th amendment)',
              'Elections (Election Commission)',
              'Emergency Provisions'
            ]
          },
          {
            name: 'Social Science - Geography',
            hindi: 'सामाजिक विज्ञान - भूगोल',
            micro: [
              'Physical India (mountains, plateaus, plains, rivers, lakes, coastline)',
              'Climate (monsoon, seasons, rainfall)',
              'Soils (alluvial, black, red, laterite)',
              'Natural Vegetation',
              'Agriculture (crops, irrigation)',
              'Minerals & Industries',
              'Population',
              'World Geography (continents, oceans, lat-long, time zones)',
              'Bihar Geography (location, rivers, districts, agriculture, industries)'
            ]
          },
          {
            name: 'Environment/EVS',
            hindi: 'पर्यावरण/EVS',
            micro: [
              'Ecosystem (components, food chain/web, energy flow)',
              'Biodiversity (hotspots, endemic species, IUCN categories)',
              'Pollution (air, water, soil, noise - causes, effects, control)',
              'Climate Change (greenhouse gases, global warming, ozone depletion)',
              'Natural Disasters (earthquake, flood, drought, cyclone - India focus)',
              'Conservation (national parks, wildlife sanctuaries, biosphere reserves)',
              'EVS Pedagogy (scope, importance, integrated approach)'
            ]
          },
          {
            name: 'General Awareness',
            hindi: 'सामान्य जागरूकता',
            micro: [
              'National Symbols',
              'Important Days',
              'Books & Authors',
              'Awards (Bharat Ratna, Padma, Nobel)',
              'Sports (Olympics, CWG, Asian Games)',
              'Bihar GK (history, culture, famous personalities, schemes)',
              'Science & Technology News',
              'Government Schemes (PM Awas, Ujjwala, Jan Dhan, Ayushman Bharat)'
            ]
          }
        ]
      }
    },
    '6-8': {
      'Language': {
        marks: 30,
        hindi: true,
        topics: [
          {
            name: 'English Grammar (Advanced)',
            hindi: 'अंग्रेजी व्याकरण (उच्च स्तर)',
            micro: [
              'Advanced Tenses & Structures',
              'Complex Parts of Speech',
              'Advanced Articles Usage',
              'Complex Voice Patterns',
              'Advanced Narration',
              'Sentence Transformation',
              'Advanced Comprehension',
              'Sophisticated Vocabulary',
              'Complex One-word Substitution',
              'Literary Idioms'
            ]
          },
          {
            name: 'Hindi Grammar (Advanced)',
            hindi: 'हिंदी व्याकरण (उच्च स्तर)',
            micro: [
              'उन्नत वर्ण विचार',
              'जटिल संधि नियम',
              'उन्नत समास प्रकार',
              'जटिल उपसर्ग-प्रत्यय',
              'व्यापक पर्यायवाची-विलोम',
              'साहित्यिक मुहावरे-लोकोक्तियाँ',
              'उन्नत वाक्य शुद्धि',
              'गूढ़ रस-छंद-अलंकार',
              'साहित्यिक अपठित गद्यांश'
            ]
          }
        ]
      },
      'General Studies': {
        marks: 40,
        hindi: false,
        topics: [
          // Same topics as 1-5 but at higher difficulty level
          {
            name: 'Mathematics (Class 6-8 Level)',
            hindi: 'गणित (कक्षा 6-8 स्तर)',
            micro: [
              'Integers & Rational Numbers',
              'Fractions & Decimals',
              'Basic Algebra (Linear Equations)',
              'Geometry (Lines, Angles, Triangles, Quadrilaterals)',
              'Mensuration (Area, Volume, Surface Area)',
              'Data Handling (Graphs, Charts)',
              'Ratio & Proportion',
              'Percentage & Applications',
              'Practical Geometry',
              'Exponents & Powers'
            ]
          },
          {
            name: 'Science (Class 6-8 Level)',
            hindi: 'विज्ञान (कक्षा 6-8 स्तर)',
            micro: [
              'Food & Nutrition',
              'Materials & Classification',
              'The World of Living (Plants & Animals)',
              'Moving Things, People & Ideas',
              'Natural Phenomena',
              'Natural Resources',
              'Basic Physics Concepts',
              'Basic Chemistry Concepts',
              'Environmental Science'
            ]
          },
          {
            name: 'Social Science - History',
            hindi: 'सामान्य विज्ञान - इतिहास',
            micro: [
              'Our Pasts I, II, III (Class 6-8)',
              'Ancient Civilizations',
              'Medieval Kingdoms',
              'Modern Indian History',
              'Freedom Struggle',
              'World History Overview',
              'Bihar in National Context'
            ]
          },
          {
            name: 'Social Science - Geography',
            hindi: 'सामान्य विज्ञान - भूगोल',
            micro: [
              'The Earth Our Habitat',
              'Our Environment',
              'Resources & Development',
              'Physical Geography',
              'Human Geography',
              'Indian Geography',
              'Bihar Geography'
            ]
          },
          {
            name: 'Social Science - Civics',
            hindi: 'सामान्य विज्ञान - नागरिक शास्त्र',
            micro: [
              'Social & Political Life I, II, III',
              'Democracy & Government',
              'Constitution & Rights',
              'Local Government',
              'Judiciary',
              'Media & Communication'
            ]
          }
        ]
      },
      'Subject Concerned': {
        marks: 80,
        hindi: false,
        topics: [
          {
            name: 'Mathematics-Science (Combined)',
            hindi: 'गणित-विज्ञान (संयुक्त)',
            micro: [
              'Class 6-8 NCERT Mathematics Complete',
              'Class 6-8 NCERT Science Complete',
              'Problem Solving Techniques',
              'Practical Applications',
              'Conceptual Understanding'
            ]
          },
          {
            name: 'Social Science',
            hindi: 'सामाजिक विज्ञान',
            micro: [
              'History Complete (Class 6-8)',
              'Geography Complete (Class 6-8)',
              'Civics Complete (Class 6-8)',
              'Integrated Approach',
              'Concept Mapping'
            ]
          },
          {
            name: 'Hindi',
            hindi: 'हिंदी',
            micro: [
              'Vasant, Durva, Bal Mahabharat Textbooks',
              'Grammar & Literature',
              'Comprehension Skills',
              'Writing Skills',
              'Cultural Context'
            ]
          },
          {
            name: 'English',
            hindi: 'अंग्रेजी',
            micro: [
              'Honeysuckle, It So Happened, Honeydew',
              'Grammar & Literature',
              'Comprehension Skills',
              'Writing Skills',
              'Communication Skills'
            ]
          }
        ]
      }
    }
  },
  upsc: {
    prelims: {
      'GS Paper I': {
        marks: 200,
        hindi: false,
        topics: [
          {
            name: 'History',
            hindi: 'इतिहास',
            micro: [
              'Ancient India (sources, Indus Valley, Vedic, Buddhism/Jainism, Maurya, Sangam, Gupta, Harsha)',
              'Medieval India (Rajputs, Delhi Sultanate, Vijayanagara, Mughal, Maratha, Bhakti-Sufi)',
              'Modern India (British expansion, economic impact, social reforms, 1857, nationalist movements)',
              'Post-independence India (integration of states, constitution making)'
            ]
          },
          {
            name: 'Geography',
            hindi: 'भूगोल',
            micro: [
              'Physical Geography (geomorphology, climatology, oceanography, biogeography)',
              'Indian Geography (physiography, drainage, climate, soils, vegetation, resources)',
              'World Geography (continents, countries, economic geography)'
            ]
          },
          {
            name: 'Polity & Governance',
            hindi: 'राजनीति एवं शासन',
            micro: [
              'Constitution (historical background, features, amendments)',
              'Fundamental Rights, Duties, DPSP',
              'Parliament, President, PM, Judiciary',
              'Federalism, Local self-government',
              'Elections, Constitutional & Non-constitutional bodies',
              'Government schemes & policies'
            ]
          },
          {
            name: 'Economy',
            hindi: 'अर्थव्यवस्था',
            micro: [
              'Basic concepts (GDP, GNP, NNP, inflation, deflation)',
              'Planning (Five Year Plans, NITI Aayog)',
              'Agriculture (Green Revolution, land reforms, food security)',
              'Industry (industrial policy, MSMEs, Make in India)',
              'Banking (RBI, monetary policy, types of banks)',
              'Capital markets, International trade (WTO, FDI, FII)',
              'Budget (fiscal policy, taxes, deficit)',
              'Poverty & unemployment, Social sector schemes'
            ]
          },
          {
            name: 'Environment & Ecology',
            hindi: 'पर्यावरण एवं पारिस्थितिकी',
            micro: [
              'Ecology basics',
              'Biodiversity (CBD, CITES, Ramsar, World Heritage)',
              'Climate change (UNFCCC, Kyoto, Paris Agreement)',
              'Environmental laws (EPA, Forest Act, Wildlife Protection Act)',
              'Pollution, Disaster management'
            ]
          },
          {
            name: 'Science & Technology',
            hindi: 'विज्ञान एवं प्रौद्योगिकी',
            micro: [
              'Space (ISRO missions - Chandrayaan, Mangalyaan, Gaganyaan)',
              'Defence (DRDO, missiles, nuclear)',
              'Biotechnology (GMO, stem cells, CRISPR)',
              'IT & AI, Nanotechnology',
              'Energy (solar, nuclear, renewable)',
              'Health (vaccines, diseases, WHO)'
            ]
          },
          {
            name: 'Current Affairs',
            hindi: 'समकालीन घटनाएँ',
            micro: [
              'National & International events (last 12 months)',
              'Government schemes',
              'Awards, Sports, Important appointments',
              'India\'s foreign policy',
              'International organisations (UN, IMF, World Bank, WTO, SCO, BRICS, G20)'
            ]
          }
        ]
      },
      'CSAT Paper II': {
        marks: 200,
        hindi: false,
        topics: [
          {
            name: 'Reading Comprehension',
            hindi: 'अपठित गद्यांश',
            micro: [
              'English Comprehension Passages',
              'Hindi Comprehension Passages',
              'Critical Reasoning',
              'Inference Drawing'
            ]
          },
          {
            name: 'Logical Reasoning & Analytical Ability',
            hindi: 'तार्किक तर्क एवं विश्लेषणात्मक क्षमता',
            micro: [
              'Logical Deduction',
              'Analytical Reasoning',
              'Critical Thinking',
              'Problem Solving'
            ]
          },
          {
            name: 'Decision Making',
            hindi: 'निर्णय लेना',
            micro: [
              'Ethical Decision Making',
              'Situational Analysis',
              'Problem Solving',
              'Managerial Skills'
            ]
          },
          {
            name: 'General Mental Ability',
            hindi: 'सामान्य मानसिक क्षमता',
            micro: [
              'Numerical Ability',
              'Pattern Recognition',
              'Series Completion',
              'Analogies'
            ]
          },
          {
            name: 'Basic Numeracy',
            hindi: 'आधारभूत संख्यात्मकता',
            micro: [
              'Class 10 Level Mathematics',
              'Arithmetic Operations',
              'Data Interpretation',
              'Graph Analysis'
            ]
          },
          {
            name: 'Data Interpretation',
            hindi: 'आँकड़ा व्याख्या',
            micro: [
              'Tables, Charts, Graphs',
              'Statistical Analysis',
              'Data Sufficiency',
              'Logical Data Arrangement'
            ]
          }
        ]
      }
    },
    mains: {
      'GS I': {
        marks: 250,
        hindi: false,
        topics: [
          {
            name: 'Indian Heritage & Culture',
            hindi: 'भारतीय विरासत एवं संस्कृति',
            micro: [
              'Art Forms (Classical, Folk, Tribal)',
              'Literature (Ancient, Medieval, Modern)',
              'Architecture (Temple, Sultanate, Mughal, Colonial)',
              'Cultural Diversity (Religion, Language, Customs)',
              'Philosophy & Religion'
            ]
          },
          {
            name: 'History',
            hindi: 'इतिहास',
            micro: [
              'Ancient & Medieval World',
              'Indian History - Comprehensive',
              'Modern Indian History - Detailed',
              'Post-independence Consolidation',
              'World History - Revolutions, Wars'
            ]
          },
          {
            name: 'Geography',
            hindi: 'भूगोल',
            micro: [
              'Physical Geography - Detailed',
              'Human Geography',
              'Economic Geography',
              'Indian Geography - Comprehensive',
              'Geographical Thought'
            ]
          }
        ]
      },
      'GS II': {
        marks: 250,
        hindi: false,
        topics: [
          {
            name: 'Governance',
            hindi: 'शासन',
            micro: [
              'Constitution - Detailed Analysis',
              'Federal Structure',
              'Separation of Powers',
              'Dispute Resolution',
              'Decentralized Governance'
            ]
          },
          {
            name: 'Constitution',
            hindi: 'संविधान',
            micro: [
              'Fundamental Rights - Detailed',
              'Directive Principles',
              'Fundamental Duties',
              'Constitutional Amendments',
              'Judicial Review'
            ]
          },
          {
            name: 'Polity',
            hindi: 'राजनीति',
            micro: [
              'Executive, Legislature, Judiciary',
              'Election Commission',
              'Political Parties',
              'Pressure Groups',
              'Good Governance'
            ]
          },
          {
            name: 'Social Justice',
            hindi: 'सामाजिक न्याय',
            micro: [
              'Welfare Schemes',
              'Vulnerable Sections',
              'Development Policies',
              'Health & Education',
              'Poverty Alleviation'
            ]
          },
          {
            name: 'International Relations',
            hindi: 'अंतर्राष्ट्रीय संबंध',
            micro: [
              'India & Neighbours',
              'Global Groupings',
              'Foreign Policy',
              'Diaspora',
              'International Law'
            ]
          }
        ]
      },
      'GS III': {
        marks: 250,
        hindi: false,
        topics: [
          {
            name: 'Technology',
            hindi: 'प्रौद्योगिकी',
            micro: [
              'IT & Communication',
              'Space Technology',
              'Biotechnology',
              'Nanotechnology',
              'Robotics & AI'
            ]
          },
          {
            name: 'Economic Development',
            hindi: 'आर्थिक विकास',
            micro: [
              'Indian Economy - Structure',
              'Planning & Liberalization',
              'Inclusive Growth',
              'Investment Models',
              'Monetary & Fiscal Policy'
            ]
          },
          {
            name: 'Biodiversity',
            hindi: 'जैव विविधता',
            micro: [
              'Conservation Strategies',
              'Protected Areas',
              'Endangered Species',
              'Biodiversity Hotspots',
              'Traditional Knowledge'
            ]
          },
          {
            name: 'Environment',
            hindi: 'पर्यावरण',
            micro: [
              'Environmental Pollution',
              'Climate Change',
              'Disaster Management',
              'Sustainable Development',
              'Environmental Laws'
            ]
          },
          {
            name: 'Security',
            hindi: 'सुरक्षा',
            micro: [
              'Internal Security',
              'External Security',
              'Terrorism & Naxalism',
              'Border Management',
              'Cyber Security'
            ]
          },
          {
            name: 'Disaster Management',
            hindi: 'आपदा प्रबंधन',
            micro: [
              'Disaster Types',
              'Response Mechanisms',
              'Mitigation Strategies',
              'Rehabilitation',
              'International Cooperation'
            ]
          }
        ]
      },
      'GS IV': {
        marks: 250,
        hindi: false,
        topics: [
          {
            name: 'Ethics',
            hindi: 'नीतिशास्त्र',
            micro: [
              'Ethical Concepts',
              'Moral Thinkers',
              'Ethical Dilemmas',
              'Public Service Values',
              'Integrity in Governance'
            ]
          },
          {
            name: 'Integrity',
            hindi: 'ईमानदारी',
            micro: [
              'Corruption',
              'Work Culture',
              'Citizen Charter',
              'Information Sharing',
              'Transparency'
            ]
          },
          {
            name: 'Aptitude',
            hindi: 'अभिरुचि',
            micro: [
              'Emotional Intelligence',
              'Moral Reasoning',
              'Attitude & Foundation',
              'Contributions of Moral Thinkers',
              'Case Studies'
            ]
          }
        ]
      },
      'Essay': {
        marks: 250,
        hindi: false,
        topics: [
          {
            name: 'Essay Writing',
            hindi: 'निबंध लेखन',
            micro: [
              'Current Issues',
              'Philosophical Topics',
              'Administrative Topics',
              'Social Issues',
              'International Relations'
            ]
          }
        ]
      }
    }
  }
};

// Time slot configurations
const timeSlots = {
  early_morning: { display: 'Early Morning', time: '4–6 AM', hindi: 'प्रातः काल' },
  morning: { display: 'Morning', time: '6–9 AM', hindi: 'सुबह' },
  forenoon: { display: 'Forenoon', time: '9 AM–12 PM', hindi: 'दोपहर' },
  afternoon: { display: 'Afternoon', time: '12–3 PM', hindi: 'अपराह्न' },
  evening: { display: 'Evening', time: '3–6 PM', hindi: 'शाम' },
  night: { display: 'Night', time: '8–11 PM', hindi: 'रात्रि' }
};

// Generate study plan
function generatePlan() {
  // Collect user data
  const userName = document.getElementById('userName').value.trim();
  const startDate = document.getElementById('startDate').value;
  const studyHours = document.getElementById('studyHours').value;
  
  // Validation
  if (!userName || !startDate) {
    alert('कृपया सभी आवश्यक जानकारी भरें!');
    return;
  }
  
  // Get selected time slots
  const selectedSlots = [];
  document.querySelectorAll('input[name="slot"]:checked').forEach(slot => {
    selectedSlots.push(slot.value);
  });
  
  // Get BPSC class if applicable
  let bpscClass = '';
  if (selectedExam === 'bpsc') {
    bpscClass = document.querySelector('input[name="bpscClass"]:checked').value;
  }
  
  // Store user data
  userData = {
    name: userName,
    exam: selectedExam,
    bpscClass: bpscClass,
    startDate: new Date(startDate),
    studyHours: parseInt(studyHours),
    timeSlots: selectedSlots
  };
  
  // Generate the actual plan
  studyPlan = createStudyPlan();
  
  // Display the plan
  displayPlan();
  
  // Navigate to plan screen
  showScreen('planScreen');
}

// Create study plan based on user data
function createStudyPlan() {
  const plan = [];
  const startDate = userData.startDate;
  const examDate = userData.exam === 'bpsc' ? 
    new Date('2026-09-22') : 
    new Date('2027-05-15'); // Approximate UPSC prelims date
  
  const endDate = new Date(examDate);
  endDate.setDate(endDate.getDate() - 15); // 15 days before exam
  
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  // Get subjects based on exam and class
  const subjects = getSubjectsList();
  
  // Create day-by-day plan
  let currentDate = new Date(startDate);
  let subjectIndex = 0;
  
  for (let day = 1; day <= totalDays; day++) {
    const dayPlan = {
      day: day,
      date: new Date(currentDate),
      dayName: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
      slots: [],
      isRevisionDay: false,
      isMockDay: false
    };
    
    // Determine if this is a revision or mock test day
    const daysLeft = totalDays - day;
    if (daysLeft <= 14 && daysLeft % 5 === 0) {
      dayPlan.isMockDay = true;
    } else if (daysLeft <= 21 && daysLeft % 3 === 0) {
      dayPlan.isRevisionDay = true;
    }
    
    // Create 3 subject slots per day
    if (!dayPlan.isMockDay) {
      for (let slot = 0; slot < 3; slot++) {
        const subject = subjects[subjectIndex % subjects.length];
        const topic = getTopicForSubject(subject, day, slot);
        
        dayPlan.slots.push({
          type: 'subject',
          subject: subject.name,
          hindi: subject.hindi || '',
          topic: topic.name,
          hindiTopic: topic.hindi || '',
          microTopics: topic.micro || [],
          slotType: slot === 0 ? 'morning' : slot === 1 ? 'afternoon' : 'evening'
        });
        
        subjectIndex++;
      }
    }
    
    // Add revision slot
    if (day > 1 && !dayPlan.isMockDay) {
      const previousDay = plan[day - 2];
      if (previousDay && previousDay.slots.length > 0) {
        dayPlan.slots.push({
          type: 'revision',
          subject: 'Revision',
          hindi: 'अभ्यास',
          topic: 'Previous Day Topics',
          hindiTopic: 'पिछले दिन के विषय',
          previousTopics: previousDay.slots.map(s => s.subject).join(', '),
          slotType: 'revision'
        });
      }
    }
    
    // Add current affairs slot
    dayPlan.slots.push({
      type: 'current_affairs',
      subject: 'Current Affairs',
      hindi: 'समकालीन घटनाएँ',
      topic: 'Daily Current Affairs',
      hindiTopic: 'दैनिक समकालीन घटनाएँ',
      duration: '30 min',
      slotType: 'current'
    });
    
    plan.push(dayPlan);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return plan;
}

// Get subjects list based on exam and class
function getSubjectsList() {
  const subjects = [];
  
  if (userData.exam === 'bpsc') {
    let syllabus;
    if (userData.bpscClass === 'both') {
      // Merge both objects — later keys (6-8) override if same name
      syllabus = Object.assign({}, syllabusData.bpsc['1-5'], syllabusData.bpsc['6-8']);
    } else {
      syllabus = syllabusData.bpsc[userData.bpscClass];
    }
    
    Object.entries(syllabus).forEach(([subjectName, subjectData]) => {
      subjects.push({
        name: subjectName,
        hindi: getSubjectHindiName(subjectName),
        marks: subjectData.marks,
        topics: subjectData.topics
      });
    });
  } else if (userData.exam === 'upsc') {
    // UPSC Prelims subjects
    Object.entries(syllabusData.upsc.prelims).forEach(([subjectName, subjectData]) => {
      subjects.push({
        name: subjectName,
        hindi: getSubjectHindiName(subjectName),
        marks: subjectData.marks,
        topics: subjectData.topics
      });
    });
  }
  
  return subjects;
}

// Get Hindi name for subject
function getSubjectHindiName(subjectName) {
  const hindiNames = {
    'Language': 'भाषा',
    'General Studies': 'सामान्य अध्ययन',
    'Subject Concerned': 'विषय विशेष',
    'GS Paper I': 'जीएस पेपर I',
    'CSAT Paper II': 'सीएसएटी पेपर II'
  };
  return hindiNames[subjectName] || subjectName;
}

// Get topic for subject
function getTopicForSubject(subject, day, slot) {
  const topicIndex = (day - 1) * 3 + slot;
  const topics = subject.topics;
  return topics[topicIndex % topics.length];
}

// Display the plan
function displayPlan() {
  const planBody = document.getElementById('planBody');
  const planTitle = document.getElementById('planTitle');
  const planSubtitle = document.getElementById('planSubtitle');
  
  // Set title
  if (userData.exam === 'bpsc') {
    planTitle.textContent = `📅 ${userData.name} का BPSC TRE 4.0 Study Plan`;
    planSubtitle.textContent = `${userData.bpscClass === 'both' ? 'Class 1-5 & 6-8' : `Class ${userData.bpscClass}`} | ${userData.studyHours} घंटे प्रतिदिन`;
  } else {
    planTitle.textContent = `📅 ${userData.name} का UPSC CSE 2027 Study Plan`;
    planSubtitle.textContent = `Prelims Focus | ${userData.studyHours} घंटे प्रतिदिन`;
  }
  
  // Create tabs
  const tabsHTML = `
    <div class="tab-bar">
      <button class="tab-btn active" onclick="showTab('dayPlan')">📅 Day Plan</button>
      <button class="tab-btn" onclick="showTab('syllabus')">📖 Syllabus</button>
      <button class="tab-btn" onclick="showTab('pyqs')">🔥 PYQs</button>
      <button class="tab-btn" onclick="showTab('examInfo')">ℹ️ Exam Info</button>
    </div>
  `;
  
  // Create content sections
  const dayPlanHTML = generateDayPlanHTML();
  const syllabusHTML = generateSyllabusHTML();
  const pyqsHTML = generatePYQsHTML();
  const examInfoHTML = generateExamInfoHTML();
  
  planBody.innerHTML = tabsHTML + `
    <div id="dayPlan" class="tab-content active">${dayPlanHTML}</div>
    <div id="syllabus" class="tab-content">${syllabusHTML}</div>
    <div id="pyqs" class="tab-content">${pyqsHTML}</div>
    <div id="examInfo" class="tab-content">${examInfoHTML}</div>
  `;
  
  // Update progress
  updateProgress();
}

// Generate day plan HTML
function generateDayPlanHTML() {
  let html = '';
  let currentWeek = 0;
  
  studyPlan.forEach((day, index) => {
    const weekNumber = Math.floor(index / 7) + 1;
    
    if (weekNumber !== currentWeek) {
      currentWeek = weekNumber;
      html += `
        <div class="week-block">
          <div class="week-header">Week ${weekNumber}</div>
      `;
    }
    
    const dayClasses = [];
    if (day.isRevisionDay) dayClasses.push('revision-day');
    if (day.isMockDay) dayClasses.push('mock-day');
    
    html += `
      <div class="day-card ${dayClasses.join(' ')}">
        <div class="day-top">
          <span class="day-num">Day ${day.day}</span>
          <span class="day-date">${day.date.toLocaleDateString()} ${day.dayName}</span>
        </div>
        <div class="day-slots-label">Daily Schedule:</div>
        <div class="slots-row">
    `;
    
    day.slots.forEach(slot => {
      const timeDisplay = userData.timeSlots.length > 0 ? 
        getTimeDisplay(slot.slotType) : 
        getGenericSlotDisplay(slot.slotType);
      
      const slotClass = `${slot.slotType}-slot`;
      
      html += `
        <div class="slot-pill ${slotClass}">
          <span class="slot-label">${timeDisplay}</span>
          <span class="slot-subject">${slot.subject}</span>
          <span class="slot-topics">${slot.topic}</span>
          ${timeDisplay.includes('AM') || timeDisplay.includes('PM') ? `<span class="slot-time">${timeDisplay}</span>` : ''}
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
    
    // Close week block if last day of week or last day overall
    if ((index + 1) % 7 === 0 || index === studyPlan.length - 1) {
      html += '</div>';
    }
  });
  
  return html;
}

// Get time display for slot
function getTimeDisplay(slotType) {
  const slotMapping = {
    'morning': userData.timeSlots.includes('morning') ? 'Morning Slot' : 'Slot 1',
    'afternoon': userData.timeSlots.includes('afternoon') ? 'Afternoon Slot' : 'Slot 2',
    'evening': userData.timeSlots.includes('evening') ? 'Evening Slot' : 'Slot 3',
    'revision': userData.timeSlots.includes('night') ? 'Night Revision' : 'Revision',
    'current': userData.timeSlots.includes('forenoon') ? 'Forenoon CA' : 'Current Affairs'
  };
  return slotMapping[slotType] || 'Study Slot';
}

// Get generic slot display
function getGenericSlotDisplay(slotType) {
  const genericMapping = {
    'morning': 'Slot 1',
    'afternoon': 'Slot 2',
    'evening': 'Slot 3',
    'revision': 'Revision',
    'current': 'Current Affairs'
  };
  return genericMapping[slotType] || 'Study Slot';
}

// Generate syllabus HTML
function generateSyllabusHTML() {
  let html = '';
  
  if (userData.exam === 'bpsc') {
    const syllabusKey = userData.bpscClass === 'both' ? 
      ['1-5', '6-8'] : [userData.bpscClass];
    
    syllabusKey.forEach(classLevel => {
      html += `<div class="section-block">`;
      html += `<h3>BPSC TRE 4.0 - Class ${classLevel} Syllabus</h3>`;
      
      const syllabus = syllabusData.bpsc[classLevel];
      Object.entries(syllabus).forEach(([subjectName, subjectData]) => {
        const borderColors = ['f59e0b', '10b981', '8b5cf6', 'ef4444', '3b82f6'];
        const borderColor = borderColors[Object.keys(syllabus).indexOf(subjectName) % borderColors.length];
        
        html += `
          <div class="syl-subject" style="border-left-color: #${borderColor}">
            <div class="syl-head" onclick="toggleAccordion(this)">
              <div class="syl-head-left">
                <span class="syl-head-title">${subjectName}</span>
                ${subjectData.hindi ? `<span class="syl-head-hindi">${getSubjectHindiName(subjectName)}</span>` : ''}
              </div>
              <div>
                <span class="syl-marks">${subjectData.marks} marks</span>
                <span class="syl-arrow">▼</span>
              </div>
            </div>
            <div class="syl-body">
        `;
        
        subjectData.topics.forEach(topic => {
          html += `
            <div class="subtopic">
              <div class="subtopic-name">${topic.name}</div>
              ${topic.hindi ? `<div class="subtopic-hindi">${topic.hindi}</div>` : ''}
              <ul class="micro-list">
                ${topic.micro.map(micro => `<li>${micro}</li>`).join('')}
              </ul>
            </div>
          `;
        });
        
        html += `
            </div>
          </div>
        `;
      });
      
      html += `</div>`;
    });
  } else if (userData.exam === 'upsc') {
    // Prelims syllabus
    html += `<div class="section-block">`;
    html += `<h3>UPSC CSE 2027 - Prelims Syllabus</h3>`;
    
    Object.entries(syllabusData.upsc.prelims).forEach(([subjectName, subjectData]) => {
      const borderColors = ['f59e0b', '10b981', '8b5cf6', 'ef4444', '3b82f6', '06b6d4'];
      const borderColor = borderColors[Object.keys(syllabusData.upsc.prelims).indexOf(subjectName) % borderColors.length];
      
      html += `
        <div class="syl-subject" style="border-left-color: #${borderColor}">
          <div class="syl-head" onclick="toggleAccordion(this)">
            <div class="syl-head-left">
              <span class="syl-head-title">${subjectName}</span>
              <span class="syl-head-hindi">${getSubjectHindiName(subjectName)}</span>
            </div>
            <div>
              <span class="syl-marks">${subjectData.marks} marks</span>
              <span class="syl-arrow">▼</span>
            </div>
          </div>
          <div class="syl-body">
      `;
      
      subjectData.topics.forEach(topic => {
        html += `
          <div class="subtopic">
            <div class="subtopic-name">${topic.name}</div>
            ${topic.hindi ? `<div class="subtopic-hindi">${topic.hindi}</div>` : ''}
            <ul class="micro-list">
              ${topic.micro.map(micro => `<li>${micro}</li>`).join('')}
            </ul>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    });
    
    html += `</div>`;
    
    // Mains syllabus note
    html += `
      <div class="optional-note">
        <h4>📝 Mains & Optional Subject</h4>
        <p>Mains syllabus (GS I, II, III, IV + Essay) will be covered after Prelims. Please select your optional subject and visit the planner again for comprehensive Mains preparation.</p>
        <p><strong>Popular Optional Subjects:</strong> History, Geography, Public Administration, Sociology, Political Science, PSIR, Anthropology, Philosophy</p>
      </div>
    `;
  }
  
  return html;
}

// Generate PYQs HTML
function generatePYQsHTML() {
  let html = '<div class="section-block">';
  
  if (userData.exam === 'bpsc') {
    html += '<h3>📚 BPSC TRE 4.0 - Previous Year Questions</h3>';
    html += `
      <div class="pyq-grid">
        <div class="pyq-card">
          <h5>BPSC TRE 3.0 (2024)</h5>
          <ul>
            <li>Class 1-5 PRT Question Paper</li>
            <li>Class 6-8 TGT Question Paper</li>
            <li>Subject-wise Papers</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>BPSC TRE 2.0 (2023)</h5>
          <ul>
            <li>Language Papers</li>
            <li>General Studies Papers</li>
            <li>Subject Papers</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>BPSC TRE 1.0 (2022)</h5>
          <ul>
            <li>All Previous Papers</li>
            <li>Answer Keys</li>
            <li>Solution Papers</li>
          </ul>
        </div>
      </div>
    `;
    
    html += `
      <div class="pyq-links">
        <a href="https://www.adda247.com/teaching-jobs-exam/bpsc-teacher-previous-year-question-papers/" target="_blank" class="pyq-link">📖 Adda247 BPSC Papers</a>
        <a href="https://www.adda247.com/teaching-jobs-exam/bpsc-tre-3-0-question-papers-2024/" target="_blank" class="pyq-link">📖 BPSC TRE 3.0 Papers</a>
        <a href="https://testbook.com/bihar-teacher/test-series" target="_blank" class="pyq-link">📖 Testbook BPSC Papers</a>
      </div>
    `;
  } else {
    html += '<h3>📚 UPSC CSE - Previous Year Questions</h3>';
    html += `
      <div class="pyq-grid">
        <div class="pyq-card">
          <h5>UPSC Prelims 2024</h5>
          <ul>
            <li>GS Paper I</li>
            <li>CSAT Paper II</li>
            <li>Answer Keys</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>UPSC Prelims 2023</h5>
          <ul>
            <li>GS Paper I</li>
            <li>CSAT Paper II</li>
            <li>Solution Papers</li>
          </ul>
        </div>
        <div class="pyq-card">
          <h5>UPSC Prelims 2022</h5>
          <ul>
            <li>GS Paper I</li>
            <li>CSAT Paper II</li>
            <li>Analysis Papers</li>
          </ul>
        </div>
      </div>
    `;
    
    html += `
      <div class="pyq-links">
        <a href="https://upsc.gov.in/examinations/previous-question-papers" target="_blank" class="pyq-link">📖 Official UPSC Papers</a>
        <a href="https://www.insightsonindia.com/upsc-previous-year-question-papers/" target="_blank" class="pyq-link">📖 Insights on India</a>
        <a href="https://www.drishtiias.com/free-downloads/upsc-previous-years-papers/prelims" target="_blank" class="pyq-link">📖 Drishti IAS Papers</a>
      </div>
    `;
  }
  
  html += '</div>';
  return html;
}

// Generate exam info HTML
function generateExamInfoHTML() {
  let html = '<div class="section-block">';
  
  if (userData.exam === 'bpsc') {
    html += '<h3>📋 BPSC TRE 4.0 Exam Information</h3>';
    html += `
      <div class="info-grid">
        <div class="info-card">
          <h4>📅 Exam Dates</h4>
          <p><strong>Examination:</strong> 22–27 September 2026</p>
          <p><strong>Admit Card:</strong> 2 weeks before exam</p>
          <p><strong>Result:</strong> November 2026 (Expected)</p>
        </div>
        <div class="info-card">
          <h4>📝 Exam Pattern</h4>
          <p><strong>Total Marks:</strong> 150</p>
          <p><strong>Duration:</strong> 2.5 hours</p>
          <p><strong>Type:</strong> MCQ Objective</p>
          <p><strong>Language:</strong> Hindi & English</p>
        </div>
        <div class="info-card">
          <h4>🎯 Vacancies</h4>
          <p><strong>Total Posts:</strong> 46,595</p>
          <p><strong>Class 1-5 (PRT):</strong> ~25,000</p>
          <p><strong>Class 6-8 (TGT):</strong> ~21,595</p>
        </div>
      </div>
    `;
  } else {
    html += '<h3>📋 UPSC CSE 2027 Exam Information</h3>';
    html += `
      <div class="info-grid">
        <div class="info-card">
          <h4>📅 Exam Timeline</h4>
          <p><strong>Prelims:</strong> May 2027 (Expected)</p>
          <p><strong>Mains:</strong> September 2027 (Expected)</p>
          <p><strong>Interview:</strong> February-March 2028</p>
          <p><strong>Final Result:</strong> May 2028 (Expected)</p>
        </div>
        <div class="info-card">
          <h4>📝 Prelims Pattern</h4>
          <p><strong>GS Paper I:</strong> 200 marks, 100 questions</p>
          <p><strong>CSAT Paper II:</strong> 200 marks, 80 questions</p>
          <p><strong>Negative Marking:</strong> GS-I: -0.66/wrong | CSAT: -0.83/wrong</p>
          <p><strong>Duration:</strong> 2 hours each paper</p>
        </div>
        <div class="info-card">
          <h4>📝 Mains Pattern</h4>
          <p><strong>GS Papers (I-IV):</strong> 250×4 = 1000 marks</p>
          <p><strong>Essay:</strong> 250 marks</p>
          <p><strong>Optional:</strong> 500 marks (2 papers)</p>
          <p><strong>Interview:</strong> 275 marks</p>
        </div>
      </div>
    `;
  }
  
  html += '</div>';
  return html;
}

// Toggle accordion
function toggleAccordion(element) {
  const body = element.nextElementSibling;
  const arrow = element.querySelector('.syl-arrow');
  
  body.classList.toggle('open');
  arrow.style.transform = body.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
}

// Show tab
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  document.getElementById(tabName).classList.add('active');
  
  // Add active class to matching button
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.getAttribute('onclick') === `showTab('${tabName}')`) {
      btn.classList.add('active');
    }
  });
}

// Update progress
function updateProgress() {
  const today = new Date();
  const startDate = userData.startDate;
  const totalDays = studyPlan.length;
  const daysPassed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
  const progress = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  
  // You can add a progress bar to the UI if needed
  console.log(`Progress: ${progress.toFixed(1)}%`);
}

// Download PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Add watermark
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(8);
  doc.text('Er. Sangam Krishna', 105, 140, { align: 'center', angle: 45 });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Cover page
  doc.setFontSize(20);
  doc.text('Smart Study Plan', 105, 30, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text(`By: ${userData.name}`, 105, 45, { align: 'center' });
  doc.text(`Exam: ${userData.exam === 'bpsc' ? 'BPSC TRE 4.0' : 'UPSC CSE 2027'}`, 105, 55, { align: 'center' });
  
  if (userData.exam === 'bpsc') {
    doc.text(`Class: ${userData.bpscClass}`, 105, 65, { align: 'center' });
  }
  
  doc.text(`Start Date: ${userData.startDate.toLocaleDateString()}`, 105, 75, { align: 'center' });
  doc.text(`Daily Study: ${userData.studyHours} hours`, 105, 85, { align: 'center' });
  
  // Add syllabus summary
  doc.setFontSize(12);
  doc.text('Syllabus Overview:', 20, 110);
  
  let yPos = 120;
  const subjects = getSubjectsList();
  subjects.forEach(subject => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(10);
    doc.text(`• ${subject.name} (${subject.marks} marks)`, 25, yPos);
    yPos += 8;
  });
  
  // Add day plan summary
  doc.addPage();
  doc.setFontSize(12);
  doc.text('Study Plan Summary:', 20, 20);
  
  yPos = 30;
  doc.setFontSize(9);
  studyPlan.slice(0, 30).forEach((day, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(`Day ${day.day}: ${day.date.toLocaleDateString()}`, 25, yPos);
    yPos += 6;
    
    day.slots.forEach(slot => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`  - ${slot.subject}: ${slot.topic}`, 30, yPos);
      yPos += 5;
    });
    yPos += 3;
  });
  
  // Add PYQ links
  doc.addPage();
  doc.setFontSize(12);
  doc.text('Previous Year Question Papers:', 20, 20);
  
  yPos = 30;
  doc.setFontSize(9);
  
  if (userData.exam === 'bpsc') {
    doc.text('BPSC TRE 4.0 PYQ Links:', 25, yPos);
    yPos += 10;
    doc.text('https://www.adda247.com/teaching-jobs-exam/bpsc-teacher-previous-year-question-papers/', 25, yPos);
    yPos += 8;
    doc.text('https://testbook.com/bihar-teacher/test-series', 25, yPos);
  } else {
    doc.text('UPSC CSE PYQ Links:', 25, yPos);
    yPos += 10;
    doc.text('https://upsc.gov.in/examinations/previous-question-papers', 25, yPos);
    yPos += 8;
    doc.text('https://www.insightsonindia.com/upsc-previous-year-question-papers/', 25, yPos);
    yPos += 8;
    doc.text('https://www.drishtiias.com/free-downloads/upsc-previous-years-papers/prelims', 25, yPos);
  }
  
  // Save PDF
  const filename = userData.exam === 'bpsc' ? 
    `BPSC_TRE4_StudyPlan_${userData.name.replace(/\s+/g, '_')}_SangamKrishna.pdf` :
    `UPSC2027_StudyPlan_${userData.name.replace(/\s+/g, '_')}_SangamKrishna.pdf`;
  
  doc.save(filename);
}

// Initialize date input with today's date
document.addEventListener('DOMContentLoaded', function() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('startDate').value = today;
  document.getElementById('startDate').min = today;
  
  // Create animated particles
  createParticles();
});

// Create animated particles background
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }
}