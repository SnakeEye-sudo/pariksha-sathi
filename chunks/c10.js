// generateSyllabusHTML()
function generateSyllabusHTML() {
  const syl = getSyllabus();
  const parts = Object.entries(syl).map(([partName, partData]) => {
    const color = partData.color || 'var(--amber)';
    const topics = (partData.topics || []).map(topic => {
      const micros = (topic.micro || []).map(m => `<li>${m}</li>`).join('');
      return `<div class="subtopic">
        <div class="subtopic-name">${topic.name}</div>
        <div class="subtopic-hindi">${topic.hindi || ''}</div>
        <ul class="micro-list">${micros}</ul>
      </div>`;
    }).join('');

    return `<div class="syl-subject" style="border-left-color:${color}">
      <div class="syl-head" onclick="toggleAccordion(this)">
        <div class="syl-head-left">
          <span class="syl-head-title">${partName}</span>
        </div>
        <div class="syl-head-right">
          <span class="syl-marks">${partData.marks} Marks</span>
          <span class="syl-arrow">▼</span>
        </div>
      </div>
      <div class="syl-body">${topics}</div>
    </div>`;
  }).join('');

  return `<div class="section-block">
    <h3>📚 Complete Syllabus</h3>
    ${parts}
  </div>`;
}
