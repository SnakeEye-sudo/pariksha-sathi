// c12.js — PDF Download (1 week, visual/styled, html2canvas + jsPDF)

function getExamDisplayLabel() {
  if (userData.exam === 'bpsc' || userData.exam === 'bpsc_tre') {
    return 'BPSC TRE 4.0 — Class ' + (userData.bpscClass === 'both' ? '1–5 & 6–8' : userData.bpscClass);
  }
  if (userData.exam === 'upsc' || userData.exam === 'upsc_2027') return 'UPSC CSE 2027';
  if (userData.exam === 'upsc_2026') return 'UPSC CSE 2026';
  const cfg = (typeof getExamConfig === 'function') ? getExamConfig(userData.exam) : null;
  if (cfg) return cfg.title;
  return userData.exam.toUpperCase();
}

const _pdfSlugMap = {
  bpsc:'BPSC_TRE4',bpsc_tre:'BPSC_TRE4',upsc_2026:'UPSC_CSE2026',
  upsc_2027:'UPSC_CSE2027',bpsc_71:'BPSC_71CCE',bpsc_72:'BPSC_72CCE',
  ssc_cgl:'SSC_CGL2026',ibps_po:'IBPS_PO2026',sbi_po:'SBI_PO2026',
  ibps_rrb:'IBPS_RRB2026',ibps_clerk:'IBPS_Clerk2026',nda_2026:'NDA_2026',
  uppsc_2026:'UPPSC_PCS2026',mppsc_2026:'MPPSC_SSE2026',
  rpsc_ras_2026:'RPSC_RAS2026',mpsc_2026:'MPSC_2026',
};

// ── Load html2canvas dynamically ──────────────────────────────
function loadHtml2Canvas() {
  return new Promise((resolve, reject) => {
    if (window.html2canvas) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function loadJsPDF() {
  return new Promise((resolve, reject) => {
    if (window.jspdf) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── Get this week's days (today → today+6) ────────────────────
function getWeekDays() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);
  return studyPlan.filter(d => {
    const dd = new Date(d.date);
    dd.setHours(0, 0, 0, 0);
    return dd >= today && dd < weekEnd;
  });
}

// ── Build styled HTML for PDF capture ────────────────────────
function buildWeekHTML(weekDays) {
  const cl = (typeof getChecklist === 'function') ? getChecklist() : {};
  const toKey = (d) => d.toISOString().split('T')[0];
  const todayStr = new Date().toDateString();
  const locale = 'en-IN';

  const SLOT_META = {
    early_morning:{ label:'🌅 Early Morning', time:'4–6 AM' },
    morning:      { label:'☀️ Morning',       time:'6–9 AM' },
    forenoon:     { label:'🕙 Forenoon',      time:'9 AM–12 PM' },
    afternoon:    { label:'🌤️ Afternoon',     time:'12–3 PM' },
    evening:      { label:'🌆 Evening',       time:'3–6 PM' },
    night:        { label:'🌙 Night',         time:'8–11 PM' },
    revision:     { label:'🔄 Revision',      time:'1 hr' },
    current:      { label:'📰 Current Affairs',time:'30 min' },
  };

  const daysHTML = weekDays.map((day, di) => {
    const dateStr = toKey(day.date);
    const isToday = day.date.toDateString() === todayStr;
    const dateLabel = day.date.toLocaleDateString(locale, { weekday:'long', day:'numeric', month:'long' });

    const slotsHTML = day.slots.map((slot, si) => {
      const meta = SLOT_META[slot.slotType] || SLOT_META.morning;
      const key = `${dateStr}_${si}`;
      const isDone = !!cl[key];
      const color = slot.color || '#f59e0b';

      if (slot.type === 'mock') {
        return `<div class="pdf-slot mock-slot">
          <div class="pdf-slot-header"><span class="pdf-slot-badge" style="color:#f87171">🎯 Mock Test</span><span class="pdf-slot-time">2–3 hrs</span></div>
          <div class="pdf-slot-title">Full Mock Test + Analysis</div>
        </div>`;
      }
      if (slot.type === 'current_affairs') {
        return `<div class="pdf-slot ca-slot">
          <div class="pdf-slot-header"><span class="pdf-slot-badge" style="color:#fca5a5">📰 Current Affairs</span><span class="pdf-slot-time">30 min</span></div>
          <div class="pdf-slot-title">Daily News + Monthly Magazine</div>
        </div>`;
      }
      if (slot.type === 'revision') {
        return `<div class="pdf-slot rev-slot">
          <div class="pdf-slot-header"><span class="pdf-slot-badge" style="color:#fbbf24">🔄 Revision</span><span class="pdf-slot-time">1 hr</span></div>
          <div class="pdf-slot-title">${slot.topic || 'Previous Topics'}</div>
        </div>`;
      }

      const micros = (slot.microTopics || []).slice(0, 4);
      const subShort = (slot.subject || '').replace(/Part [IVX]+ — /g,'').replace(/\[1-5\] /g,'').replace(/\[6-8\] /g,'');
      return `<div class="pdf-slot subject-slot ${isDone ? 'slot-done' : ''}" style="border-left:3px solid ${color}">
        <div class="pdf-slot-header">
          <span class="pdf-slot-badge" style="color:${color}">${meta.label}</span>
          <span class="pdf-slot-time">${meta.time}</span>
          ${isDone ? '<span class="pdf-check">✓</span>' : '<span class="pdf-uncheck"></span>'}
        </div>
        <div class="pdf-slot-part">${subShort}</div>
        <div class="pdf-slot-title">${slot.topic || ''}</div>
        ${micros.length ? `<ul class="pdf-micros">${micros.map(m=>`<li>${m}</li>`).join('')}</ul>` : ''}
      </div>`;
    }).join('');

    return `<div class="pdf-day ${isToday ? 'pdf-today' : ''}">
      <div class="pdf-day-header">
        <div class="pdf-day-num">${day.day}</div>
        <div class="pdf-day-info">
          <div class="pdf-day-date">${dateLabel}</div>
          ${isToday ? '<span class="pdf-today-badge">TODAY</span>' : ''}
        </div>
      </div>
      <div class="pdf-slots">${slotsHTML}</div>
    </div>`;
  }).join('');

  return daysHTML;
}

// ── Main downloadPDF ──────────────────────────────────────────
async function downloadPDF() {
  const btn = document.querySelector('.ptb-download');
  if (btn) { btn.textContent = '⏳ Generating…'; btn.disabled = true; }

  try {
    await Promise.all([loadHtml2Canvas(), loadJsPDF()]);
  } catch(e) {
    alert('PDF library load failed. Check internet connection.');
    if (btn) { btn.textContent = '⬇️ PDF'; btn.disabled = false; }
    return;
  }

  const weekDays = getWeekDays();
  if (!weekDays.length) {
    alert('No plan found for this week!');
    if (btn) { btn.textContent = '⬇️ PDF'; btn.disabled = false; }
    return;
  }

  const examLabel = getExamDisplayLabel();
  const dateRange = `${weekDays[0].date.toLocaleDateString('en-IN',{day:'numeric',month:'short'})} – ${weekDays[weekDays.length-1].date.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}`;

  // Build off-screen container
  const wrap = document.createElement('div');
  wrap.id = 'pdfCapture';
  wrap.style.cssText = 'position:fixed;left:-9999px;top:0;width:900px;background:#080e1a;font-family:Inter,sans-serif;padding:0;z-index:-1;';

  wrap.innerHTML = `
    <style>
      #pdfCapture *{box-sizing:border-box;font-family:Inter,sans-serif;}
      .pdf-cover{background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%);padding:48px 40px 36px;position:relative;overflow:hidden;}
      .pdf-cover::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(245,158,11,.12) 0%,transparent 60%);}
      .pdf-cover-logo{font-size:32px;font-weight:900;color:#f59e0b;letter-spacing:-1px;margin-bottom:6px;}
      .pdf-cover-sub{font-size:13px;color:rgba(255,255,255,.5);margin-bottom:28px;}
      .pdf-cover-name{font-size:22px;font-weight:700;color:#fff;margin-bottom:4px;}
      .pdf-cover-exam{font-size:14px;color:#f59e0b;font-weight:600;margin-bottom:4px;}
      .pdf-cover-range{font-size:12px;color:rgba(255,255,255,.45);}
      .pdf-watermark{position:absolute;bottom:20px;right:28px;font-size:11px;color:rgba(245,158,11,.35);font-weight:600;text-align:right;line-height:1.6;}
      .pdf-body{padding:24px 28px;background:#080e1a;}
      .pdf-week-title{font-size:15px;font-weight:700;color:#f59e0b;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid rgba(245,158,11,.2);}
      .pdf-day{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;margin-bottom:16px;overflow:hidden;}
      .pdf-today{border-color:rgba(245,158,11,.4);box-shadow:0 0 0 1px rgba(245,158,11,.15);}
      .pdf-day-header{display:flex;align-items:center;gap:14px;padding:12px 16px;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(255,255,255,.05);}
      .pdf-day-num{width:38px;height:38px;border-radius:10px;background:rgba(245,158,11,.15);color:#f59e0b;font-size:16px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
      .pdf-today .pdf-day-num{background:#f59e0b;color:#000;}
      .pdf-day-date{font-size:13px;font-weight:600;color:#f1f5f9;}
      .pdf-today-badge{display:inline-block;background:#f59e0b;color:#000;font-size:9px;font-weight:800;padding:2px 7px;border-radius:20px;margin-left:8px;letter-spacing:.5px;}
      .pdf-slots{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 14px;}
      .pdf-slot{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px 12px;position:relative;}
      .pdf-slot.slot-done{opacity:.65;}
      .pdf-slot.slot-done::after{content:'✓ Done';position:absolute;top:6px;right:8px;font-size:9px;color:#10b981;font-weight:700;}
      .pdf-slot-header{display:flex;align-items:center;gap:6px;margin-bottom:5px;}
      .pdf-slot-badge{font-size:10px;font-weight:600;flex:1;}
      .pdf-slot-time{font-size:9px;color:rgba(255,255,255,.35);}
      .pdf-check{font-size:12px;color:#10b981;font-weight:700;}
      .pdf-uncheck{width:12px;height:12px;border:1.5px solid rgba(255,255,255,.2);border-radius:3px;display:inline-block;}
      .pdf-slot-part{font-size:9px;color:rgba(255,255,255,.4);margin-bottom:3px;}
      .pdf-slot-title{font-size:11px;font-weight:700;color:#f1f5f9;line-height:1.4;margin-bottom:4px;}
      .pdf-micros{margin:0;padding-left:12px;list-style:disc;}
      .pdf-micros li{font-size:9px;color:rgba(255,255,255,.45);margin-bottom:2px;line-height:1.4;}
      .mock-slot{border-color:rgba(239,68,68,.2);}
      .ca-slot{border-color:rgba(239,68,68,.15);}
      .rev-slot{border-color:rgba(245,158,11,.2);}
      .pdf-footer{background:#0a0f1e;padding:14px 28px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,.06);}
      .pdf-footer-left{font-size:10px;color:rgba(255,255,255,.35);}
      .pdf-footer-right{font-size:10px;color:rgba(245,158,11,.6);font-weight:600;}
    </style>
    <div class="pdf-cover">
      <div class="pdf-cover-logo">ParikshaSathi</div>
      <div class="pdf-cover-sub">Personalized Weekly Study Plan</div>
      <div class="pdf-cover-name">${userData.name || 'Student'}</div>
      <div class="pdf-cover-exam">${examLabel}</div>
      <div class="pdf-cover-range">📅 ${dateRange}</div>
      <div class="pdf-watermark">Er. Sangam Krishna<br>Pariksha-Sathi</div>
    </div>
    <div class="pdf-body">
      <div class="pdf-week-title">📅 Weekly Study Plan — ${dateRange}</div>
      ${buildWeekHTML(weekDays)}
    </div>
    <div class="pdf-footer">
      <div class="pdf-footer-left">Generated: ${new Date().toLocaleDateString('en-IN')} • pariksha-sathi.github.io</div>
      <div class="pdf-footer-right">Er. Sangam Krishna • Pariksha-Sathi</div>
    </div>
  `;

  document.body.appendChild(wrap);

  try {
    const canvas = await html2canvas(wrap, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#080e1a',
      logging: false,
      width: 900,
    });

    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdfW = 210; // A4 mm
    const pdfH = (canvas.height / canvas.width) * pdfW;

    const doc = new jsPDF({ orientation: pdfH > 297 ? 'portrait' : 'portrait', unit: 'mm', format: 'a4' });
    const pageH = 297;
    let imgY = 0;
    const imgHeightMm = pdfH;

    // Split into pages if content taller than A4
    let remaining = imgHeightMm;
    let srcY = 0;
    let firstPage = true;

    while (remaining > 0) {
      if (!firstPage) doc.addPage();
      firstPage = false;

      const sliceH = Math.min(pageH, remaining);
      const sliceRatio = sliceH / imgHeightMm;
      const srcSliceH = canvas.height * sliceRatio;

      // Crop canvas slice
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = srcSliceH;
      const ctx = sliceCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, srcY, canvas.width, srcSliceH, 0, 0, canvas.width, srcSliceH);
      const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.92);

      doc.addImage(sliceData, 'JPEG', 0, 0, pdfW, sliceH);

      srcY += srcSliceH;
      remaining -= sliceH;
    }

    const safeName = (userData.name || 'Student').replace(/\s+/g,'_');
    const slug = _pdfSlugMap[userData.exam] || userData.exam.toUpperCase();
    const d = new Date();
    const ds = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
    doc.save(`${slug}_${safeName}_Week_${ds}_SangamKrishna.pdf`);

  } finally {
    document.body.removeChild(wrap);
    if (btn) { btn.textContent = '⬇️ PDF'; btn.disabled = false; }
  }
}
