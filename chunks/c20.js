// ═══════════════════════════════════════════════════════════════
// c20.js — NEET UG 2026 Syllabus
// By Er. Sangam Krishna | ParikshaSathi
// ═══════════════════════════════════════════════════════════════

const syl_neet = {

  'Physics — Class 11': {
    marks: 90, color: '#3b82f6',
    topics: [
      { name: 'Physical World & Measurement', hindi: 'भौतिक जगत और मापन', micro: ['Units & Dimensions','Errors in Measurement','Significant Figures'] },
      { name: 'Kinematics', hindi: 'गतिकी', micro: ['Motion in a Straight Line','Motion in a Plane','Projectile Motion','Relative Motion'] },
      { name: 'Laws of Motion', hindi: 'गति के नियम', micro: ['Newton\'s Laws','Friction','Circular Motion','Pseudo Force'] },
      { name: 'Work, Energy & Power', hindi: 'कार्य, ऊर्जा और शक्ति', micro: ['Work-Energy Theorem','Conservative Forces','Collisions','Power'] },
      { name: 'System of Particles & Rotational Motion', hindi: 'कणों का निकाय और घूर्णन गति', micro: ['Centre of Mass','Torque','Moment of Inertia','Rolling Motion'] },
      { name: 'Gravitation', hindi: 'गुरुत्वाकर्षण', micro: ['Kepler\'s Laws','Gravitational Potential','Satellites','Escape Velocity'] },
      { name: 'Properties of Bulk Matter', hindi: 'स्थूल पदार्थ के गुण', micro: ['Elasticity','Fluid Pressure','Viscosity','Surface Tension'] },
      { name: 'Thermodynamics', hindi: 'ऊष्मागतिकी', micro: ['Laws of Thermodynamics','Carnot Engine','Entropy','Heat Transfer'] },
      { name: 'Behaviour of Perfect Gas & Kinetic Theory', hindi: 'आदर्श गैस और गतिज सिद्धांत', micro: ['Kinetic Theory','Gas Laws','Degrees of Freedom','Mean Free Path'] },
      { name: 'Oscillations & Waves', hindi: 'दोलन और तरंगें', micro: ['SHM','Damped Oscillations','Wave Motion','Doppler Effect'] }
    ]
  },

  'Physics — Class 12': {
    marks: 90, color: '#3b82f6',
    topics: [
      { name: 'Electrostatics', hindi: 'स्थिरवैद्युतिकी', micro: ['Coulomb\'s Law','Electric Field','Gauss\'s Law','Capacitors'] },
      { name: 'Current Electricity', hindi: 'विद्युत धारा', micro: ['Ohm\'s Law','Kirchhoff\'s Laws','Wheatstone Bridge','Potentiometer'] },
      { name: 'Magnetic Effects of Current & Magnetism', hindi: 'धारा का चुंबकीय प्रभाव', micro: ['Biot-Savart Law','Ampere\'s Law','Moving Coil Galvanometer','Magnetism'] },
      { name: 'Electromagnetic Induction & AC', hindi: 'विद्युत चुंबकीय प्रेरण', micro: ['Faraday\'s Laws','Lenz\'s Law','AC Circuits','Transformers'] },
      { name: 'Electromagnetic Waves', hindi: 'विद्युत चुंबकीय तरंगें', micro: ['EM Spectrum','Properties of EM Waves'] },
      { name: 'Optics', hindi: 'प्रकाशिकी', micro: ['Ray Optics','Wave Optics','Interference','Diffraction','Polarization'] },
      { name: 'Dual Nature of Matter & Radiation', hindi: 'द्रव्य और विकिरण की द्वैत प्रकृति', micro: ['Photoelectric Effect','de Broglie Wavelength','Davisson-Germer'] },
      { name: 'Atoms & Nuclei', hindi: 'परमाणु और नाभिक', micro: ['Bohr Model','Nuclear Reactions','Radioactivity','Binding Energy'] },
      { name: 'Electronic Devices', hindi: 'इलेक्ट्रॉनिक युक्तियाँ', micro: ['Semiconductors','p-n Junction','Transistors','Logic Gates'] }
    ]
  },

  'Chemistry — Class 11': {
    marks: 90, color: '#10b981',
    topics: [
      { name: 'Basic Concepts of Chemistry', hindi: 'रसायन की मूल अवधारणाएं', micro: ['Mole Concept','Stoichiometry','Limiting Reagent'] },
      { name: 'Structure of Atom', hindi: 'परमाणु की संरचना', micro: ['Bohr Model','Quantum Numbers','Orbitals','Electronic Configuration'] },
      { name: 'Classification of Elements & Periodicity', hindi: 'तत्वों का वर्गीकरण', micro: ['Periodic Table','Periodic Trends','Ionization Energy'] },
      { name: 'Chemical Bonding & Molecular Structure', hindi: 'रासायनिक आबंधन', micro: ['VSEPR','Hybridization','Molecular Orbital Theory','Hydrogen Bond'] },
      { name: 'States of Matter', hindi: 'पदार्थ की अवस्थाएं', micro: ['Gas Laws','Kinetic Theory','Liquefaction','Solid State'] },
      { name: 'Thermodynamics', hindi: 'ऊष्मागतिकी', micro: ['Enthalpy','Entropy','Gibbs Energy','Hess\'s Law'] },
      { name: 'Equilibrium', hindi: 'साम्यावस्था', micro: ['Chemical Equilibrium','Le Chatelier\'s Principle','Ionic Equilibrium','pH'] },
      { name: 'Redox Reactions', hindi: 'रेडॉक्स अभिक्रियाएं', micro: ['Oxidation State','Balancing Redox','Electrochemistry Basics'] },
      { name: 'Hydrogen', hindi: 'हाइड्रोजन', micro: ['Properties','Hydrides','Water','Hydrogen Peroxide'] },
      { name: 's-Block Elements', hindi: 's-ब्लॉक तत्व', micro: ['Alkali Metals','Alkaline Earth Metals','Compounds'] },
      { name: 'p-Block Elements (Group 13–14)', hindi: 'p-ब्लॉक तत्व', micro: ['Boron Family','Carbon Family','Allotropes'] },
      { name: 'Organic Chemistry Basics', hindi: 'कार्बनिक रसायन की मूल बातें', micro: ['IUPAC Nomenclature','Isomerism','Reaction Mechanisms','Inductive Effect'] },
      { name: 'Hydrocarbons', hindi: 'हाइड्रोकार्बन', micro: ['Alkanes','Alkenes','Alkynes','Aromatic Compounds'] }
    ]
  },

  'Chemistry — Class 12': {
    marks: 90, color: '#10b981',
    topics: [
      { name: 'Solid State', hindi: 'ठोस अवस्था', micro: ['Crystal Systems','Defects','Electrical Properties'] },
      { name: 'Solutions', hindi: 'विलयन', micro: ['Colligative Properties','Raoult\'s Law','Osmosis','Van\'t Hoff Factor'] },
      { name: 'Electrochemistry', hindi: 'विद्युत रसायन', micro: ['Galvanic Cells','Nernst Equation','Electrolysis','Corrosion'] },
      { name: 'Chemical Kinetics', hindi: 'रासायनिक बलगतिकी', micro: ['Rate Laws','Activation Energy','Arrhenius Equation','Catalysis'] },
      { name: 'Surface Chemistry', hindi: 'पृष्ठ रसायन', micro: ['Adsorption','Colloids','Emulsions','Catalysis'] },
      { name: 'd & f Block Elements', hindi: 'd और f ब्लॉक तत्व', micro: ['Transition Metals','Lanthanides','Actinides','Coordination Compounds'] },
      { name: 'Coordination Compounds', hindi: 'उपसहसंयोजन यौगिक', micro: ['IUPAC Naming','Isomerism','Bonding Theories','Stability'] },
      { name: 'Haloalkanes & Haloarenes', hindi: 'हैलोऐल्केन और हैलोऐरीन', micro: ['Nucleophilic Substitution','Elimination','Reactions'] },
      { name: 'Alcohols, Phenols & Ethers', hindi: 'ऐल्कोहॉल, फीनॉल और ईथर', micro: ['Preparation','Properties','Reactions'] },
      { name: 'Aldehydes, Ketones & Carboxylic Acids', hindi: 'ऐल्डिहाइड, कीटोन और कार्बोक्सिलिक अम्ल', micro: ['Nucleophilic Addition','Aldol Condensation','Reactions'] },
      { name: 'Amines', hindi: 'ऐमीन', micro: ['Classification','Preparation','Reactions','Diazonium Salts'] },
      { name: 'Biomolecules', hindi: 'जैव अणु', micro: ['Carbohydrates','Proteins','Nucleic Acids','Vitamins','Enzymes'] },
      { name: 'Polymers', hindi: 'बहुलक', micro: ['Addition Polymers','Condensation Polymers','Rubber','Plastics'] },
      { name: 'Chemistry in Everyday Life', hindi: 'दैनिक जीवन में रसायन', micro: ['Drugs','Food Additives','Cleansing Agents'] }
    ]
  },

  'Biology — Botany (Class 11)': {
    marks: 90, color: '#22c55e',
    topics: [
      { name: 'The Living World', hindi: 'जीव जगत', micro: ['Taxonomy','Nomenclature','Classification Systems'] },
      { name: 'Biological Classification', hindi: 'जीवों का वर्गीकरण', micro: ['Five Kingdom Classification','Monera','Protista','Fungi','Plantae','Animalia'] },
      { name: 'Plant Kingdom', hindi: 'पादप जगत', micro: ['Algae','Bryophytes','Pteridophytes','Gymnosperms','Angiosperms'] },
      { name: 'Morphology of Flowering Plants', hindi: 'पुष्पी पादपों की आकारिकी', micro: ['Root','Stem','Leaf','Flower','Fruit','Seed'] },
      { name: 'Anatomy of Flowering Plants', hindi: 'पुष्पी पादपों की शारीरिकी', micro: ['Meristems','Tissues','Secondary Growth'] },
      { name: 'Cell: The Unit of Life', hindi: 'कोशिका: जीवन की इकाई', micro: ['Cell Theory','Prokaryotic Cell','Eukaryotic Cell','Cell Organelles'] },
      { name: 'Cell Cycle & Cell Division', hindi: 'कोशिका चक्र और कोशिका विभाजन', micro: ['Mitosis','Meiosis','Cell Cycle Regulation'] },
      { name: 'Transport in Plants', hindi: 'पादपों में परिवहन', micro: ['Osmosis','Plasmolysis','Transpiration','Phloem Transport'] },
      { name: 'Mineral Nutrition', hindi: 'खनिज पोषण', micro: ['Essential Elements','Nitrogen Fixation','Deficiency Symptoms'] },
      { name: 'Photosynthesis', hindi: 'प्रकाश संश्लेषण', micro: ['Light Reactions','Calvin Cycle','C4 Pathway','CAM Plants'] },
      { name: 'Respiration in Plants', hindi: 'पादपों में श्वसन', micro: ['Glycolysis','Krebs Cycle','Electron Transport Chain','Fermentation'] },
      { name: 'Plant Growth & Development', hindi: 'पादप वृद्धि और विकास', micro: ['Growth Regulators','Auxins','Gibberellins','Cytokinins','Photoperiodism'] }
    ]
  },

  'Biology — Zoology (Class 11)': {
    marks: 90, color: '#22c55e',
    topics: [
      { name: 'Animal Kingdom', hindi: 'प्राणि जगत', micro: ['Classification Basis','Phyla','Chordates','Non-Chordates'] },
      { name: 'Structural Organisation in Animals', hindi: 'प्राणियों में संरचनात्मक संगठन', micro: ['Tissues','Organ Systems','Earthworm','Cockroach','Frog'] },
      { name: 'Biomolecules', hindi: 'जैव अणु', micro: ['Carbohydrates','Proteins','Lipids','Nucleic Acids','Enzymes'] },
      { name: 'Digestion & Absorption', hindi: 'पाचन और अवशोषण', micro: ['Alimentary Canal','Digestive Enzymes','Absorption','Disorders'] },
      { name: 'Breathing & Exchange of Gases', hindi: 'श्वास और गैसों का विनिमय', micro: ['Respiratory Organs','Mechanism of Breathing','Transport of Gases','Disorders'] },
      { name: 'Body Fluids & Circulation', hindi: 'शरीर द्रव और परिसंचरण', micro: ['Blood','Lymph','Heart','Cardiac Cycle','ECG','Disorders'] },
      { name: 'Excretory Products & Elimination', hindi: 'उत्सर्जी उत्पाद और उनका निष्कासन', micro: ['Kidney','Urine Formation','Tubular Reabsorption','Disorders'] },
      { name: 'Locomotion & Movement', hindi: 'गमन और संचलन', micro: ['Muscle Types','Skeletal System','Joints','Disorders'] },
      { name: 'Neural Control & Coordination', hindi: 'तंत्रिका नियंत्रण और समन्वय', micro: ['Neuron','Nerve Impulse','Brain','Spinal Cord','Sense Organs'] },
      { name: 'Chemical Coordination & Integration', hindi: 'रासायनिक समन्वय और एकीकरण', micro: ['Endocrine Glands','Hormones','Feedback Mechanisms'] }
    ]
  },

  'Biology — Botany (Class 12)': {
    marks: 90, color: '#16a34a',
    topics: [
      { name: 'Reproduction in Organisms', hindi: 'जीवों में जनन', micro: ['Asexual Reproduction','Sexual Reproduction','Life Cycles'] },
      { name: 'Sexual Reproduction in Flowering Plants', hindi: 'पुष्पी पादपों में लैंगिक जनन', micro: ['Flower Structure','Pollination','Fertilization','Embryo Development'] },
      { name: 'Principles of Inheritance & Variation', hindi: 'वंशागति और विविधता के सिद्धांत', micro: ['Mendel\'s Laws','Chromosomal Theory','Linkage','Mutation'] },
      { name: 'Molecular Basis of Inheritance', hindi: 'वंशागति का आणविक आधार', micro: ['DNA Structure','Replication','Transcription','Translation','Gene Regulation'] },
      { name: 'Microbes in Human Welfare', hindi: 'मानव कल्याण में सूक्ष्मजीव', micro: ['Fermentation','Antibiotics','Biogas','Sewage Treatment'] },
      { name: 'Biotechnology: Principles & Processes', hindi: 'जैव प्रौद्योगिकी: सिद्धांत और प्रक्रम', micro: ['Recombinant DNA','PCR','Gel Electrophoresis','Cloning Vectors'] },
      { name: 'Biotechnology & Its Applications', hindi: 'जैव प्रौद्योगिकी और उसके उपयोग', micro: ['Bt Crops','Gene Therapy','Insulin Production','Ethical Issues'] }
    ]
  },

  'Biology — Zoology (Class 12)': {
    marks: 90, color: '#16a34a',
    topics: [
      { name: 'Human Reproduction', hindi: 'मानव जनन', micro: ['Male Reproductive System','Female Reproductive System','Gametogenesis','Fertilization','Pregnancy'] },
      { name: 'Reproductive Health', hindi: 'जनन स्वास्थ्य', micro: ['Contraception','STDs','Infertility','MTP','Population Control'] },
      { name: 'Evolution', hindi: 'विकास', micro: ['Origin of Life','Darwin\'s Theory','Natural Selection','Hardy-Weinberg','Human Evolution'] },
      { name: 'Human Health & Disease', hindi: 'मानव स्वास्थ्य और रोग', micro: ['Immunity','Vaccines','AIDS','Cancer','Drugs & Alcohol'] },
      { name: 'Strategies for Enhancement in Food Production', hindi: 'खाद्य उत्पादन में वृद्धि की कार्यनीति', micro: ['Animal Husbandry','Plant Breeding','Tissue Culture','Biofortification'] },
      { name: 'Organisms & Populations', hindi: 'जीव और समष्टियाँ', micro: ['Ecology','Population Attributes','Population Growth','Interactions'] },
      { name: 'Ecosystem', hindi: 'पारितंत्र', micro: ['Food Chains','Energy Flow','Nutrient Cycling','Ecological Pyramids'] },
      { name: 'Biodiversity & Conservation', hindi: 'जैव विविधता और संरक्षण', micro: ['Biodiversity Types','Threats','Conservation Methods','Hotspots'] },
      { name: 'Environmental Issues', hindi: 'पर्यावरणीय मुद्दे', micro: ['Air Pollution','Water Pollution','Ozone Depletion','Global Warming','Biomagnification'] }
    ]
  }
};
