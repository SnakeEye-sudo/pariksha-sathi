// ParikshaSathi — Smart Study Planner | By Er. Sangam Krishna
let selectedExam='',userData={},studyPlan=[];

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function selectExam(exam){
  selectedExam=exam;
  const bg=document.getElementById('bpscClassGroup');
  if(exam==='bpsc'){
    bg.classList.remove('hidden');
    document.getElementById('formHeaderIcon').textContent='🏫';
    document.getElementById('formTitle').textContent='BPSC TRE 4.0 — जानकारी भरें';
    document.getElementById('formSubtitle').textContent='Class 1-5 (PRT) या 6-8 (TGT) चुनें और plan पाएं';
    document.getElementById('nameNum').textContent='02';
    document.getElementById('dateNum').textContent='03';
    document.getElementById('hoursNum').textContent='04';
    document.getElementById('slotNum').textContent='05';
  } else {
    bg.classList.add('hidden');
    document.getElementById('formHeaderIcon').textContent='🏛️';
    document.getElementById('formTitle').textContent='UPSC CSE 2027 — जानकारी भरें';
    document.getElementById('formSubtitle').textContent='Prelims + Mains का personalized plan पाएं';
    document.getElementById('nameNum').textContent='01';
    document.getElementById('dateNum').textContent='02';
    document.getElementById('hoursNum').textContent='03';
    document.getElementById('slotNum').textContent='04';
  }
  showScreen('formScreen');
}

function showTab(tabName){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b=>{
    if(b.getAttribute('onclick')===`showTab('${tabName}')`) b.classList.add('active');
  });
}

function toggleAccordion(el){
  const body=el.nextElementSibling;
  const arrow=el.querySelector('.syl-arrow');
  body.classList.toggle('open');
  arrow.style.transform=body.classList.contains('open')?'rotate(180deg)':'rotate(0deg)';
}
