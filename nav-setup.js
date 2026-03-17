// ParikshaSathi Navigation & Avatar Setup
// Adds page navigation buttons and repositions Google Auth avatar

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    addPageNavigation();
    setupAvatarButton();
  }

  // Add navigation buttons for new pages (About, Resources, Contact, Privacy)
  function addPageNavigation() {
    // Find the login gate topbar where buttons should be added
    const loginGate = document.getElementById('loginGate');
    if (!loginGate) return;

    // Find the topbar inside login gate
    const topbar = loginGate.querySelector('.topbar, [style*="display"][style*="flex"]');
    if (!topbar) return;

    // Create navigation container
    const navContainer = document.createElement('div');
    navContainer.className = 'page-nav-buttons';
    navContainer.innerHTML = `
      <a href="/pariksha-sathi/about.html" class="page-nav-btn">📘 About</a>
      <a href="/pariksha-sathi/resources.html" class="page-nav-btn">📚 Resources</a>
      <a href="/pariksha-sathi/contact.html" class="page-nav-btn">📧 Contact</a>
      <a href="/pariksha-sathi/privacy.html" class="page-nav-btn">🔒 Privacy</a>
    `;

    // Insert after the logo/brand section
    const logoSection = topbar.querySelector('h1, .logo, [style*="font-size"]');
    if (logoSection && logoSection.parentElement) {
      logoSection.parentElement.insertBefore(navContainer, logoSection.nextSibling);
    } else {
      // Fallback: append to topbar
      topbar.appendChild(navContainer);
    }
  }

  // Setup avatar button with circular styling and proper positioning
  function setupAvatarButton() {
    const avatarBtn = document.getElementById('userAvatarBtn');
    if (!avatarBtn) return;

    // Ensure the avatar button has the correct structure
    // Add initial if no image exists
    if (!avatarBtn.querySelector('img') && !avatarBtn.querySelector('.uAInitial')) {
      const userName = document.querySelector('#userName');
      if (userName && userName.textContent) {
        const initial = userName.textContent.trim().charAt(0).toUpperCase();
        const initialDiv = document.createElement('div');
        initialDiv.className = 'uAInitial';
        initialDiv.textContent = initial;
        avatarBtn.appendChild(initialDiv);
      }
    }
  }

  // Add navigation to hamburger menu for mobile
  function addToHamburgerMenu() {
    const hamburgerMenu = document.getElementById('mobileMenu');
    if (!hamburgerMenu) return;

    const navLinks = `
      <a href="/pariksha-sathi/about.html" class="mobile-menu-item">
        <span class="menu-icon">📘</span> About
      </a>
      <a href="/pariksha-sathi/resources.html" class="mobile-menu-item">
        <span class="menu-icon">📚</span> Resources
      </a>
      <a href="/pariksha-sathi/contact.html" class="mobile-menu-item">
        <span class="menu-icon">📧</span> Contact
      </a>
      <a href="/pariksha-sathi/privacy.html" class="mobile-menu-item">
        <span class="menu-icon">🔒</span> Privacy Policy
      </a>
    `;

    const divider = document.createElement('div');
    divider.innerHTML = navLinks;
    hamburgerMenu.appendChild(divider);
  }

  // Call mobile menu setup
  addToHamburgerMenu();

})();
