// generateSyllabusHTML()
function generateSyllabusHTML() {
  const syl = getSyllabus();
  const parts = Object.entries(syl).map(([partName, partData]) => {
    const color = partData.color || 'var(--amber)';
    const topics = (partData.topics || []).map(topic => {
      // In Hindi mode: show hindi name as title, English as subtitle
      // In English mode: show English name as title, hindi as subtitle
      const titleText = (lang === 'hi' && topic.hindi) ? topic.hindi : topic.name;
      const subText   = (lang === 'hi' && topic.hindi) ? topic.name : (topic.hindi || '');
      const micros = (topic.micro || []).map(m => `<li>${m}</li>`).join('');
      return `<div class="subtopic">
        <div class="subtopic-name">${titleText}</div>
        ${subText ? `<div class="subtopic-hindi">${subText}</div>` : ''}
        <ul class="micro-list">${micros}</ul>
      </div>`;
    }).join('');

    return `<div class="syl-subject" style="border-left-color:${color}">
      <div class="syl-head" onclick="toggleAccordion(this)">
        <div class="syl-head-left">
          <span class="syl-head-title">${partName}</span>
        </div>
        <div class="syl-head-right">
          <span class="syl-marks">${partData.marks} ${t('marksLabel')}</span>
          <span class="syl-arrow">▼</span>
        </div>
      </div>
      <div class="syl-body">${topics}</div>
    </div>`;
  }).join('');

  return `<div class="section-block">
    <h3>${t('sylHeading')}</h3>
    ${parts}
  </div>`;
}
