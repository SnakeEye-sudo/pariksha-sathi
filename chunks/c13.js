// Canvas particle animation + DOMContentLoaded init
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Track mouse for interactive repulsion
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('touchmove', e => {
    if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
  }, { passive: true });

  const COLORS = [
    '245,158,11',  // amber
    '16,185,129',  // green
    '59,130,246',  // blue
    '139,92,246',  // purple
    '236,72,153',  // pink
    '6,182,212',   // cyan
  ];

  function Particle() {
    this.reset = function(born) {
      this.x = born ? Math.random() * W : Math.random() * W;
      this.y = born ? Math.random() * H : Math.random() * H;
      this.r = Math.random() * 1.8 + 0.4;
      this.baseVx = (Math.random() - 0.5) * 0.35;
      this.baseVy = (Math.random() - 0.5) * 0.35;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.alpha = Math.random() * 0.55 + 0.08;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.pulse = Math.random() * Math.PI * 2; // phase offset for pulsing
    };
    this.reset(true);
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Shooting stars
  let stars = [];
  function spawnStar() {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H * 0.5,
      len: Math.random() * 80 + 40,
      speed: Math.random() * 4 + 3,
      alpha: 1,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
    });
  }
  setInterval(spawnStar, 3500);

  let frame = 0;
  function draw() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    // Draw shooting stars
    stars = stars.filter(s => s.alpha > 0.01);
    stars.forEach(s => {
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha -= 0.018;
      const grad = ctx.createLinearGradient(
        s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len,
        s.x, s.y
      );
      grad.addColorStop(0, `rgba(245,158,11,0)`);
      grad.addColorStop(1, `rgba(245,158,11,${s.alpha})`);
      ctx.beginPath();
      ctx.moveTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Draw particles
    particles.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * 0.6;
        p.vy += (dy / dist) * force * 0.6;
      }
      // Dampen back to base velocity
      p.vx += (p.baseVx - p.vx) * 0.04;
      p.vy += (p.baseVy - p.vy) * 0.04;

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Pulsing alpha
      p.pulse += 0.02;
      const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${a})`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = 0.07 * (1 - dist / 110);
          ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  // Apply saved language preference
  applyLang();
  // Set default start date to today
  const today = new Date().toISOString().split('T')[0];
  const sd = document.getElementById('startDate');
  if (sd) { sd.value = today; sd.min = today; }

  // Welcome-back toast: show saved user's name if a plan exists
  const savedRaw = localStorage.getItem('pariksha_sathi_plan');
  if (savedRaw) {
    try {
      const saved = JSON.parse(savedRaw);
      const name = saved.userData && saved.userData.name ? saved.userData.name.split(' ')[0] : null;
      if (name) {
        const toast = document.getElementById('welcomeBackToast');
        const nameEl = document.getElementById('welcomeBackName');
        if (toast && nameEl) {
          nameEl.textContent = name + '!';
          toast.classList.remove('hidden');
        }
      }
    } catch(e) {}
  }

  // Restore saved plan — skip welcome screen entirely
  if (loadPlanFromStorage()) {
    renderPlan();
    showScreen('planScreen');
  }
  // else: welcomeScreen is already active by default in HTML
});
