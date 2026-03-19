// ParikshaSathi Clean Hamburger Menu System
// Removes top buttons, implements hamburger menu with Google Auth inside
(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    removeTopButtons();
    setupHamburgerMenu();
    fixMobileMenuTap();
    initThemeSystem();
  }

  function removeTopButtons() {
    const pageNavButtons = document.querySelector('.page-nav-buttons');
    if (pageNavButtons) {
      pageNavButtons.remove();
    }

    const topNavElements = document.querySelectorAll(
      '[class*="nav"][class*="button"], [id*="nav"], .top-nav'
    );
    topNavElements.forEach(el => {
      if (el.textContent.includes('About') ||
          el.textContent.includes('Resources') ||
          el.textContent.includes('Contact') ||
          el.textContent.includes('Privacy')) {
        el.style.display = 'none';
      }
    });
  }

  function setupHamburgerMenu() {
    const topbar = document.querySelector('.plan-topbar');
    if (!topbar) return;

    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.id = 'hamburgerMenu';
    hamburgerBtn.className = 'hamburger-btn';
    hamburgerBtn.innerHTML = '☰';
    hamburgerBtn.style.cssText = `
      position: fixed;
      top: 12px;
      left: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      font-size: 24px;
      cursor: pointer;
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
    `;

    hamburgerBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    hamburgerBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });

    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobileMenu';
    mobileMenu.className = 'mobile-menu';
    mobileMenu.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 80px;
    `;

    const menuContainer = document.createElement('div');
    menuContainer.className = 'menu-container';
    menuContainer.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 20px;
      width: 90%;
      max-width: 400px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;

    const menuHeader = document.createElement('div');
    menuHeader.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f0f0;
    `;

    const menuTitle = document.createElement('h3');
    menuTitle.textContent = 'Menu';
    menuTitle.style.cssText = 'margin: 0; font-size: 20px; color: #333;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 24px;
      color: #999;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
    `;

    menuHeader.appendChild(menuTitle);
    menuHeader.appendChild(closeBtn);

    const menuItems = [
      { text: '📘 About', href: '/pariksha-sathi/about.html' },
      { text: '📚 Resources', href: '/pariksha-sathi/resources.html' },
      { text: '📧 Contact', href: '/pariksha-sathi/contact.html' },
      { text: '🔒 Privacy Policy', href: '/pariksha-sathi/privacy.html' },
      { text: '📄 Terms & Conditions', href: '/pariksha-sathi/terms.html' },
      { text: '🌐 Aapka-Sathi Hub', href: 'https://snakeeye-sudo.github.io/Aapka-Sathi/' }
    ];

    const menuList = document.createElement('div');
    menuList.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    `;

    menuItems.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.text;
      if (item.href.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      link.style.cssText = `
        padding: 12px 16px;
        border-radius: 8px;
        text-decoration: none;
        color: #333;
        background: #f5f5f5;
        border: none;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
        display: block;
        text-align: left;
      `;

      link.addEventListener('mouseenter', function() {
        this.style.background = '#e8e8ff';
        this.style.transform = 'translateX(5px)';
      });
      link.addEventListener('mouseleave', function() {
        this.style.background = '#f5f5f5';
        this.style.transform = 'translateX(0)';
      });
      link.addEventListener('click', function() {
        mobileMenu.style.display = 'none';
      });

      menuList.appendChild(link);
    });

    const divider = document.createElement('div');
    divider.style.cssText = 'height: 1px; background: #f0f0f0; margin: 15px 0;';

    const authSection = document.createElement('div');
    authSection.style.cssText = `
      padding-top: 15px;
      border-top: 2px solid #f0f0f0;
    `;

    const userAvatarBtn = document.getElementById('userAvatarBtn');
    const userNameEl = document.getElementById('userName');
    const userName = userNameEl ? userNameEl.textContent : 'User';

    if (userAvatarBtn) {
      const authDiv = document.createElement('div');
      authDiv.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        background: #f9f9f9;
      `;

      const avatarClone = document.createElement('div');
      avatarClone.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 18px;
      `;
      avatarClone.textContent = userName.charAt(0).toUpperCase();

      const userInfo = document.createElement('div');
      userInfo.style.cssText = 'flex: 1;';

      const nameDiv = document.createElement('div');
      nameDiv.textContent = userName;
      nameDiv.style.cssText = 'font-weight: 600; font-size: 14px; color: #333;';

      const emailDiv = document.createElement('div');
      emailDiv.textContent = 'Logged In';
      emailDiv.style.cssText = 'font-size: 12px; color: #999; margin-top: 2px;';

      userInfo.appendChild(nameDiv);
      userInfo.appendChild(emailDiv);
      authDiv.appendChild(avatarClone);
      authDiv.appendChild(userInfo);
      authSection.appendChild(authDiv);
    }

    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.id = 'psThemeToggleBtn';
    themeBtn.style.cssText = `
      width: 100%;
      margin-top: 14px;
      padding: 12px 16px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: white;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
    `;
    themeBtn.addEventListener('click', function() {
      toggleTheme();
      updateThemeButtonLabel();
    });

    menuContainer.appendChild(menuHeader);
    menuContainer.appendChild(menuList);
    menuContainer.appendChild(divider);
    menuContainer.appendChild(authSection);
    menuContainer.appendChild(themeBtn);
    mobileMenu.appendChild(menuContainer);

    hamburgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'flex' : 'none';
    });

    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.style.display = 'none';
    });

    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    });

    document.body.appendChild(hamburgerBtn);
    document.body.appendChild(mobileMenu);
    updateThemeButtonLabel();
  }

  function fixMobileMenuTap() {
    const hamburgerBtn = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
    }, { passive: false });

    hamburgerBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'flex' : 'none';
    }, { passive: false });

    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('touchstart', function() {
        this.style.background = '#e8e8ff';
        this.style.transform = 'translateX(5px)';
      }, { passive: true });

      link.addEventListener('touchend', function() {
        this.style.background = '#f5f5f5';
        this.style.transform = 'translateX(0)';
      }, { passive: true });
    });
  }

  function initThemeSystem() {
    const savedTheme = localStorage.getItem('ps_theme') || 'dark';
    document.body.classList.toggle('theme-light', savedTheme === 'light');
    updateThemeButtonLabel();
  }

  function toggleTheme() {
    const isLight = document.body.classList.toggle('theme-light');
    localStorage.setItem('ps_theme', isLight ? 'light' : 'dark');
  }

  function updateThemeButtonLabel() {
    const btn = document.getElementById('psThemeToggleBtn');
    if (!btn) return;
    const isLight = document.body.classList.contains('theme-light');
    btn.textContent = isLight ? '🌙 Switch to Night Theme' : '☀️ Switch to Day Theme';
  }
})();
