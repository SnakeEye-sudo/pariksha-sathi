// ═══════════════════════════════════════════════════════════════
// c21.js — JEE Main 2026 + JEE Advanced 2026 Syllabuses
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

const syl_jee_main = {

  'Mathematics': {
    marks: 100, color: '#3b82f6',
    topics: [
      { name: 'Sets, Relations & Functions', hindi: 'समुच्चय, संबंध और फलन', micro: ['Sets','Relations','Functions','Inverse Functions'] },
      { name: 'Complex Numbers & Quadratic Equations', hindi: 'सम्मिश्र संख्याएं और द्विघात समीकरण', micro: ['Argand Plane','Modulus','Roots of Quadratic','Discriminant'] },
      { name: 'Matrices & Determinants', hindi: 'आव्यूह और सारणिक', micro: ['Matrix Operations','Determinants','Inverse','Cramer\'s Rule'] },
      { name: 'Permutations & Combinations', hindi: 'क्रमचय और संचय', micro: ['Fundamental Principle','nPr','nCr','Circular Permutations'] },
      { name: 'Mathematical Induction & Binomial Theorem', hindi: 'गणितीय आगमन और द्विपद प्रमेय', micro: ['Principle of Induction','Binomial Expansion','General Term','Middle Term'] },
      { name: 'Sequences & Series', hindi: 'अनुक्रम और श्रेणी', micro: ['AP','GP','HP','Sum of Series','AM-GM Inequality'] },
      { name: 'Limit, Continuity & Differentiability', hindi: 'सीमा, सांतत्य और अवकलनीयता', micro: ['Limits','L\'Hopital Rule','Continuity','Differentiability'] },
      { name: 'Integral Calculus', hindi: 'समाकल कलन', micro: ['Indefinite Integration','Definite Integration','Area Under Curves','Differential Equations'] },
      { name: 'Differential Equations', hindi: 'अवकल समीकरण', micro: ['Order & Degree','Variable Separable','Linear DE','Homogeneous DE'] },
      { name: 'Coordinate Geometry', hindi: 'निर्देशांक ज्यामिति', micro: ['Straight Lines','Circles','Parabola','Ellipse','Hyperbola'] },
      { name: 'Three Dimensional Geometry', hindi: 'त्रिविमीय ज्यामिति', micro: ['Direction Cosines','Lines in 3D','Planes','Distance Formula'] },
      { name: 'Vector Algebra', hindi: 'सदिश बीजगणित', micro: ['Vectors','Dot Product','Cross Product','Scalar Triple Product'] },
      { name: 'Statistics & Probability', hindi: 'सांख्यिकी और प्रायिकता', micro: ['Mean','Variance','Probability','Bayes Theorem','Distributions'] },
      { name: 'Trigonometry', hindi: 'त्रिकोणमिति', micro: ['Trigonometric Functions','Identities','Inverse Trig','Heights & Distances'] },
      { name: 'Mathematical Reasoning', hindi: 'गणितीय तर्क', micro: ['Statements','Connectives','Tautology','Contradiction'] }
    ]
  },

  'Physics': {
    marks: 100, color: '#f59e0b',
    topics: [
      { name: 'Mechanics — Kinematics & Laws of Motion', hindi: 'यांत्रिकी — गतिकी और गति के नियम', micro: ['Projectile Motion','Newton\'s Laws','Friction','Circular Motion'] },
      { name: 'Work, Energy, Power & Rotational Motion', hindi: 'कार्य, ऊर्जा, शक्ति और घूर्णन', micro: ['Work-Energy Theorem','Collisions','Moment of Inertia','Rolling'] },
      { name: 'Gravitation & Properties of Matter', hindi: 'गुरुत्वाकर्षण और पदार्थ के गुण', micro: ['Kepler\'s Laws','Satellites','Elasticity','Fluid Mechanics'] },
      { name: 'Thermodynamics & Kinetic Theory', hindi: 'ऊष्मागतिकी और गतिज सिद्धांत', micro: ['Laws of Thermodynamics','Carnot Engine','Kinetic Theory','Gas Laws'] },
      { name: 'Oscillations & Waves', hindi: 'दोलन और तरंगें', micro: ['SHM','Damped Oscillations','Wave Motion','Doppler Effect','Beats'] },
      { name: 'Electrostatics & Current Electricity', hindi: 'स्थिरवैद्युतिकी और विद्युत धारा', micro: ['Coulomb\'s Law','Capacitors','Ohm\'s Law','Kirchhoff\'s Laws','Wheatstone Bridge'] },
      { name: 'Magnetic Effects & Electromagnetic Induction', hindi: 'चुंबकीय प्रभाव और विद्युत चुंबकीय प्रेरण', micro: ['Biot-Savart','Ampere\'s Law','Faraday\'s Laws','AC Circuits'] },
      { name: 'Optics', hindi: 'प्रकाशिकी', micro: ['Ray Optics','Wave Optics','Interference','Diffraction','Polarization'] },
      { name: 'Modern Physics', hindi: 'आधुनिक भौतिकी', micro: ['Photoelectric Effect','Bohr Model','Radioactivity','Nuclear Reactions','Semiconductors'] }
    ]
  },

  'Chemistry': {
    marks: 100, color: '#10b981',
    topics: [
      { name: 'Physical Chemistry — Basics', hindi: 'भौतिक रसायन — मूल बातें', micro: ['Mole Concept','Stoichiometry','Atomic Structure','Chemical Bonding'] },
      { name: 'States of Matter & Thermodynamics', hindi: 'पदार्थ की अवस्थाएं और ऊष्मागतिकी', micro: ['Gas Laws','Liquid State','Thermodynamics','Hess\'s Law'] },
      { name: 'Equilibrium & Electrochemistry', hindi: 'साम्यावस्था और विद्युत रसायन', micro: ['Chemical Equilibrium','Ionic Equilibrium','Electrochemical Cells','Electrolysis'] },
      { name: 'Chemical Kinetics & Surface Chemistry', hindi: 'रासायनिक बलगतिकी और पृष्ठ रसायन', micro: ['Rate Laws','Activation Energy','Catalysis','Colloids'] },
      { name: 'Inorganic Chemistry — s & p Block', hindi: 'अकार्बनिक रसायन — s और p ब्लॉक', micro: ['Alkali Metals','Alkaline Earth','Boron Family','Carbon Family','Nitrogen Family','Oxygen Family','Halogens','Noble Gases'] },
      { name: 'Inorganic Chemistry — d, f Block & Coordination', hindi: 'd, f ब्लॉक और उपसहसंयोजन', micro: ['Transition Metals','Lanthanides','Coordination Compounds','Isomerism'] },
      { name: 'Organic Chemistry — Basics & Hydrocarbons', hindi: 'कार्बनिक रसायन — मूल बातें और हाइड्रोकार्बन', micro: ['IUPAC','Isomerism','Reaction Mechanisms','Alkanes','Alkenes','Alkynes','Benzene'] },
      { name: 'Organic Chemistry — Functional Groups', hindi: 'कार्यात्मक समूह', micro: ['Alcohols','Aldehydes','Ketones','Carboxylic Acids','Amines','Polymers','Biomolecules'] }
    ]
  }
};

const syl_jee_advanced = {

  'Mathematics (Advanced)': {
    marks: 120, color: '#3b82f6',
    topics: [
      { name: 'Algebra — Complex Numbers & Polynomials', hindi: 'बीजगणित — सम्मिश्र संख्याएं और बहुपद', micro: ['Complex Number Geometry','Roots of Unity','Polynomial Equations','Vieta\'s Formulas'] },
      { name: 'Algebra — Matrices & Determinants', hindi: 'आव्यूह और सारणिक', micro: ['Matrix Algebra','Eigenvalues','System of Equations','Rank'] },
      { name: 'Algebra — Probability & Statistics', hindi: 'प्रायिकता और सांख्यिकी', micro: ['Conditional Probability','Bayes Theorem','Distributions','Expectation'] },
      { name: 'Trigonometry & Inverse Trig', hindi: 'त्रिकोणमिति', micro: ['Trigonometric Equations','Inverse Functions','Properties of Triangles'] },
      { name: 'Analytical Geometry — 2D', hindi: 'विश्लेषणात्मक ज्यामिति — 2D', micro: ['Conics','Tangents','Normals','Chord of Contact','Locus Problems'] },
      { name: 'Analytical Geometry — 3D', hindi: 'विश्लेषणात्मक ज्यामिति — 3D', micro: ['Lines & Planes','Skew Lines','Angle Between Planes','Distance Formulas'] },
      { name: 'Differential Calculus', hindi: 'अवकल कलन', micro: ['Limits','Continuity','Differentiability','Rolle\'s Theorem','LMVT','Maxima-Minima'] },
      { name: 'Integral Calculus', hindi: 'समाकल कलन', micro: ['Integration Techniques','Definite Integrals','Area','Differential Equations'] },
      { name: 'Vectors', hindi: 'सदिश', micro: ['Vector Algebra','Dot & Cross Product','Triple Products','Applications'] }
    ]
  },

  'Physics (Advanced)': {
    marks: 120, color: '#f59e0b',
    topics: [
      { name: 'Mechanics — Kinematics, NLM & Friction', hindi: 'यांत्रिकी — गतिकी, NLM और घर्षण', micro: ['Relative Motion','Constraint Motion','Pseudo Force','Friction Types'] },
      { name: 'Mechanics — Work, Energy & Rotational Dynamics', hindi: 'कार्य, ऊर्जा और घूर्णन गतिकी', micro: ['Work-Energy Theorem','Collisions','Moment of Inertia','Angular Momentum','Rolling'] },
      { name: 'Mechanics — Gravitation & Fluid Mechanics', hindi: 'गुरुत्वाकर्षण और तरल यांत्रिकी', micro: ['Orbital Mechanics','Bernoulli\'s Theorem','Viscosity','Surface Tension'] },
      { name: 'Thermal Physics', hindi: 'ऊष्मीय भौतिकी', micro: ['Calorimetry','Heat Transfer','Thermodynamic Processes','Carnot Cycle','Kinetic Theory'] },
      { name: 'Waves & Oscillations', hindi: 'तरंगें और दोलन', micro: ['SHM','Superposition','Standing Waves','Doppler Effect','Resonance'] },
      { name: 'Electricity & Magnetism', hindi: 'विद्युत और चुंबकत्व', micro: ['Gauss\'s Law','Capacitors','RC Circuits','Biot-Savart','Faraday\'s Law','LCR Circuits'] },
      { name: 'Optics (Advanced)', hindi: 'प्रकाशिकी (उन्नत)', micro: ['Geometrical Optics','Wave Optics','Interference','Diffraction','Polarization'] },
      { name: 'Modern Physics', hindi: 'आधुनिक भौतिकी', micro: ['Photoelectric Effect','Bohr Model','X-Rays','Nuclear Physics','Radioactivity','Semiconductors'] }
    ]
  },

  'Chemistry (Advanced)': {
    marks: 120, color: '#10b981',
    topics: [
      { name: 'Physical Chemistry — Atomic Structure & Bonding', hindi: 'परमाणु संरचना और आबंधन', micro: ['Quantum Numbers','Orbital Shapes','VSEPR','MO Theory','Hybridization'] },
      { name: 'Physical Chemistry — Thermodynamics & Equilibrium', hindi: 'ऊष्मागतिकी और साम्यावस्था', micro: ['Hess\'s Law','Gibbs Energy','Equilibrium Constants','Le Chatelier'] },
      { name: 'Physical Chemistry — Electrochemistry & Kinetics', hindi: 'विद्युत रसायन और बलगतिकी', micro: ['Nernst Equation','Electrolysis','Rate Laws','Arrhenius Equation'] },
      { name: 'Inorganic Chemistry — Periodic Table & s,p Block', hindi: 'आवर्त सारणी और s,p ब्लॉक', micro: ['Periodic Trends','Anomalous Properties','Compounds of s,p Block'] },
      { name: 'Inorganic Chemistry — d Block & Coordination', hindi: 'd ब्लॉक और उपसहसंयोजन', micro: ['Transition Metal Properties','Crystal Field Theory','Coordination Isomerism'] },
      { name: 'Organic Chemistry — Mechanisms & Reactions', hindi: 'कार्बनिक रसायन — क्रियाविधि और अभिक्रियाएं', micro: ['SN1/SN2','E1/E2','Electrophilic Addition','Electrophilic Aromatic Substitution'] },
      { name: 'Organic Chemistry — Named Reactions & Synthesis', hindi: 'नामित अभिक्रियाएं और संश्लेषण', micro: ['Aldol Condensation','Cannizzaro','Grignard','Diels-Alder','Retrosynthesis'] },
      { name: 'Organic Chemistry — Biomolecules & Polymers', hindi: 'जैव अणु और बहुलक', micro: ['Carbohydrates','Amino Acids','Nucleic Acids','Polymers'] }
    ]
  }
};
