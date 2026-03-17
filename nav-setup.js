// ParikshaSathi — Hamburger Menu (Welcome Screen)
// Shows: About, Resources, Contact, Privacy + all plan actions + Google Auth
(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupHamburgerMenu();
  }

  function setupHamburgerMenu() {
    // Only run on welcome screen context (not plan screen which has its own menu)
    const existingHamburger = document.getElementById('hamburgerBtn');
    if (existingHamburger) return; // plan screen already has one

    // Create hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'navHamburgerBtn';
    hamburgerBtn.setAttribute('aria-label', 'Menu');
    hamburgerBtn.style.cssText = `
      position: fixed;
      top: 12px;
      left: 12px;
      background: rgba(15,12,41,0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: white;
      border: 2px solid rgba(245,158,11,0.5);
      border-radius: 10px;
      width: 42px;
      height: 42px;
      font-size: 20px;
      cursor: pointer;
      z-index: 9990;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
      transition: all 0.2s ease;
    `;
    hamburgerBtn.innerHTML = '☰';

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'navMenuOverlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 9991;
      display: none;
    `;

    // Create menu panel
    const panel = document.createElement('div');
    panel.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      max-width: 85vw;
      height: 100%;
      background: rgba(10,8,35,0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-right: 1px solid rgba(255,255,255,0.1);
      z-index: 9992;
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow-y: auto;
      transform: translateX(-100%);
      transition: transform 0.25s ease;
    `;

    panel.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="logo.svg" alt="PS" style="width:28px;height:28px;" />
          <span style="color:#f59e0b;font-weight:800;font-size:16px;font-family:Inter,sans-serif;">ParikshaSathi</span>
        </div>
        <button id="navMenuClose" style="background:none;border:none;color:rgba(255,255,255,0.5);font-size:22px;cursor:pointer;padding:4px;line-height:1;">✕</button>
      </div>

      <!-- Google Auth Section -->
      <div id="navMenuAuthSection" style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <!-- filled by updateNavMenuAuth() -->
      </div>

      <!-- Nav Links -->
      <nav style="padding:12px 12px;flex:1;">
        <div style="color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;letter-spacing:1px;padding:8px 8px 4px;font-family:Inter,sans-serif;">NAVIGATION</div>
        <a href="/pariksha-sathi/about.html" class="nav-menu-link">📘 About</a>
        <a href="/pariksha-sathi/resources.html" class="nav-menu-link">📚 Resources</a>
        <a href="/pariksha-sathi/contact.html" class="nav-menu-link">📧 Contact</a>
        <a href="/pariksha-sathi/privacy.html" class="nav-menu-link">🔒 Privacy Policy</a>

        <div style="color:rgba(255,255,255,0.3);font-size:11px;font-weight:600;letter-spacing:1px;padding:16px 8px 4px;font-family:Inter,sans-serif;">PLAN ACTIONS</div>
        <button class="nav-menu-btn" onclick="if(typeof toggleDailyNotification==='function')toggleDailyNotification(); closeNavMenu();">🔔 Notifications</button>
        <button class="nav-menu-btn" onclick="if(typeof showCalendarModal==='function')showCalendarModal(); closeNavMenu();">📅 Calendar Export</button>
        <button class="nav-menu-btn" onclick="if(typeof downloadPDF==='function')downloadPDF(); closeNavMenu();">📄 PDF Download</button>
        <button class="nav-menu-btn" onclick="if(typeof showScreen==='function')showScreen('formScreen'); closeNavMenu();">✏️ Edit Plan</button>
        <button class="nav-menu-btn" onclick="if(typeof confirmResetPlan==='function')confirmResetPlan(); closeNavMenu();">🔄 Naya Plan</button>

        <div id="navMenuLogoutWrap" style="display:none;margin-top:8px;">
          <button class="nav-menu-btn nav-menu-btn-logout" onclick="if(typeof psSignOut==='function')psSignOut(); closeNavMenu();">🚪 Logout</button>
        </div>
      </nav>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      .nav-menu-link {
        display: block;
        padding: 11px 12px;
        border-radius: 8px;
        text-decoration: none;
        color: rgba(255,255,255,0.8);
        font-size: 14px;
        font-family: Inter, sans-serif;
        font-weight: 500;
        transition: background 0.15s, color 0.15s;
        margin-bottom: 2px;
      }
      .nav-menu-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
      .nav-menu-btn {
        display: block;
        width: 100%;
        padding: 11px 12px;
        border-radius: 8px;
        background: none;
        border: none;
        color: rgba(255,255,255,0.8);
        font-size: 14px;
        font-family: Inter, sans-serif;
        font-weight: 500;
        cursor: pointer;
        text-align: left;
        transition: background 0.15s, color 0.15s;
        margin-bottom: 2px;
      }
      .nav-menu-btn:hover { background: rgba(255,255,255,0.07); color: #fff; }
      .nav-menu-btn-logout { color: #fca5a5 !important; }
      .nav-menu-btn-logout:hover { background: rgba(239,68,68,0.15) !important; }
    `;
    document.head.appendChild(style);

    overlay.appendChild(panel);
    document.body.appendChild(hamburgerBtn);
    document.body.appendChild(overlay);

    // Open/close logic
    function openMenu() {
      overlay.style.display = 'block';
      setTimeout(() => panel.style.transform = 'translateX(0)', 10);
      updateNavMenuAuth();
    }

    window.closeNavMenu = function() {
      panel.style.transform = 'translateX(-100%)';
      setTimeout(() => overlay.style.display = 'none', 250);
    };

    hamburgerBtn.addEventListener('click', openMenu);
    hamburgerBtn.addEventListener('touchend', function(e) { e.preventDefault(); openMenu(); }, { passive: false });

    document.getElementById('navMenuClose').addEventListener('click', closeNavMenu);
    overlay.addEventListener('click', function(e) {
      if (!panel.contains(e.target)) closeNavMenu();
    });
  }

  // Update auth section in nav menu
  function updateNavMenuAuth() {
    const section = document.getElementById('navMenuAuthSection');
    const logoutWrap = document.getElementById('navMenuLogoutWrap');
    if (!section) return;

    const auth = window.psAuth;
    const user = auth ? auth.currentUser : null;

    if (user) {
      const photo = user.photoURL
        ? `<img src="${user.photoURL}" style="width:40px;height:40px;border-radius:50%;border:2px solid #f59e0b;object-fit:cover;" />`
        : `<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:18px;">${(user.displayName||user.email||'U')[0].toUpperCase()}</div>`;
      section.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          ${photo}
          <div>
            <div style="color:#f1f5f9;font-weight:700;font-size:14px;font-family:Inter,sans-serif;">${user.displayName||''}</div>
            <div style="color:rgba(255,255,255,0.45);font-size:12px;font-family:Inter,sans-serif;">${user.email||''}</div>
          </div>
        </div>
        <button onclick="if(typeof psSaveToCloud==='function')psSaveToCloud(); closeNavMenu();" style="width:100%;background:rgba(29,78,216,0.2);color:#93c5fd;border:1px solid rgba(29,78,216,0.3);padding:9px 14px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;text-align:left;font-family:Inter,sans-serif;display:flex;align-items:center;gap:8px;">☁️ Cloud Save karein</button>
      `;
      if (logoutWrap) logoutWrap.style.display = 'block';
    } else {
      section.innerHTML = `
        <button onclick="closeNavMenu(); document.getElementById('loginGate').style.display='flex';" style="width:100%;background:#fff;color:#1f2937;border:none;padding:11px 16px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-family:Inter,sans-serif;">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google se Login karein
        </button>
      `;
      if (logoutWrap) logoutWrap.style.display = 'none';
    }
  }

})();
