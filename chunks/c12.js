// downloadPDF() with watermark "Er. Sangam Krishna"
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210, H = 297;
  const margin = 15;
  let y = margin;

  function addWatermark() {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.07 }));
    doc.setFontSize(38);
    doc.setTextColor(180, 120, 0);
    doc.setFont('helvetica', 'bold');
    for (let wy = 50; wy < H; wy += 70) {
      for (let wx = 10; wx < W; wx += 90) {
        doc.text('Er. Sangam Krishna', wx, wy, { angle: 35 });
      }
    }
    doc.restoreGraphicsState();
  }

  function newPage() {
    addWatermark();
    doc.addPage();
    y = margin;
  }

  function checkY(needed) {
    if (y + needed > H - margin) newPage();
  }

  // ── Cover Page ──
  doc.setFillColor(8, 14, 26);
  doc.rect(0, 0, W, H, 'F');
  addWatermark();

  doc.setFontSize(28);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.text('ParikshaSathi', W / 2, 60, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.text('Personalized Study Plan', W / 2, 72, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(userData.name || 'Student', W / 2, 95, { align: 'center' });

  const examLabel = userData.exam === 'bpsc'
    ? ('BPSC TRE 4.0 — Class ' + (userData.bpscClass === 'both' ? '1–5 & 6–8' : userData.bpscClass))
    : 'UPSC CSE 2027';
  doc.setFontSize(13);
  doc.setTextColor(245, 158, 11);
  doc.text(examLabel, W / 2, 108, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, W / 2, 120, { align: 'center' });
  doc.text(`Total Days: ${studyPlan.length} | ${userData.studyHours} hrs/day`, W / 2, 128, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(245, 158, 11);
  doc.text('Made with love by Er. Sangam Krishna', W / 2, H - 25, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('pariksha-sathi.github.io | Free Study Planner', W / 2, H - 17, { align: 'center' });

  // ── Plan Pages ──
  doc.addPage();
  y = margin;
  addWatermark();

  doc.setFontSize(16);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.text('Day-by-Day Study Plan', margin, y);
  y += 10;

  studyPlan.forEach(day => {
    checkY(30);
    doc.setFontSize(10);
    doc.setTextColor(245, 158, 11);
    doc.setFont('helvetica', 'bold');
    const dateStr = day.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
    doc.text(`Day ${day.day} — ${dateStr} (${day.dayName})${day.isMock ? ' [MOCK TEST]' : day.isRevision ? ' [REVISION]' : ''}`, margin, y);
    y += 5;

    day.slots.forEach(slot => {
      checkY(7);
      doc.setFontSize(8.5);
      doc.setTextColor(220, 220, 220);
      doc.setFont('helvetica', 'normal');
      const icon = slot.type === 'mock' ? '[MOCK]'
        : slot.type === 'revision' ? '[REV]'
        : slot.type === 'current_affairs' ? '[CA]'
        : '[' + (slot.slotType || 'study').toUpperCase().slice(0, 3) + ']';
      const line = `  ${icon} ${slot.subject}: ${slot.topic}`;
      doc.text(line.slice(0, 95), margin + 3, y);
      y += 5.5;
    });

    doc.setDrawColor(40, 60, 90);
    doc.line(margin, y, W - margin, y);
    y += 3;
  });

  addWatermark();

  // ── Save ──
  const safeName = (userData.name || 'Student').replace(/\s+/g, '_');
  const filename = userData.exam === 'bpsc'
    ? `BPSC_TRE4_StudyPlan_${safeName}_SangamKrishna.pdf`
    : `UPSC2027_StudyPlan_${safeName}_SangamKrishna.pdf`;
  doc.save(filename);
}
