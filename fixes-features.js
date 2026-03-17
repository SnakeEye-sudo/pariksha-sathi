// ParikshaSathi Feature Fixes
// 1. Add navigation buttons (About, Resources, Contact, Privacy) to main page topbar
// 2. Reposition Google Auth avatar above Feedback button
// 3. Change Calendar button to open Google Calendar instead of PDF download

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setTimeout(() => {
      addNavigationToTopbar();
      repositionAvatarButton();
      fixCalendarButton();
    }, 1000); // Give time for app.js to initialize
  }

  // FIX 1: Add navigation buttons to main page topbar (plan-topbar)
  function addNavigationToTopbar() {
    // Find the plan-topbar which has the buttons
    const planTopbar = document.querySelector('.plan-topbar');
    if (!planTopbar) {
      console.log('plan-topbar not found, retrying...');
      setTimeout(addNavigationToTopbar, 1000);
      return;
    }

    // Check if navigation already exists
    if (planTopbar.querySelector('.page-nav-links')) {
      return;
    }

    // Create navigation links container
    const navLinks = document.createElement('div');
    navLinks.className = 'page-nav-links';
    navLinks.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto; margin-right: 12px;';
    navLinks.innerHTML = `
      <a href="/pariksha-sathi/about.html" class="topbar-btn" style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; color: white; text-decoration: none; font-size: 13px; font-weight: 500; transition: all 0.3s ease;">📘 About</a>
      <a href="/pariksha-sathi/resources.html" class="topbar-btn" style="background: linear-gradient(135deg, #0f766e, #14b8a6); border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; color: white; text-decoration: none; font-size: 13px; font-weight: 500; transition: all 0.3s ease;">📚 Resources</a>
      <a href="/pariksha-sathi/contact.html" class="topbar-btn" style="background: linear-gradient(135deg, #7c2d12, #ea580c); border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; color: white; text-decoration: none; font-size: 13px; font-weight: 500; transition: all 0.3s ease;">📧 Contact</a>
      <a href="/pariksha-sathi/privacy.html" class="topbar-btn" style="background: linear-gradient(135deg, #6b21a8, #a855f7); border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; color: white; text-decoration: none; font-size: 13px; font-weight: 500; transition: all 0.3s ease;">🔒 Privacy</a>
    `;

    // Add hover effects
    const style = document.createElement('style');
    style.textContent = `
      .topbar-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
      }
      @media (max-width: 768px) {
        .page-nav-links { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    // Insert before the last child (logout button or last element)
    const lastChild = planTopbar.lastElementChild;
    planTopbar.insertBefore(navLinks, lastChild);
    
    console.log('✅ Navigation buttons added to topbar');
  }

  // FIX 2: Reposition Google Auth avatar above Feedback button
  function repositionAvatarButton() {
    const avatarBtn = document.getElementById('userAvatarBtn');
    if (!avatarBtn) {
      console.log('userAvatarBtn not found, retrying...');
      setTimeout(repositionAvatarButton, 1000);
      return;
    }

    // Position avatar above feedback button
    avatarBtn.style.cssText = `
      position: fixed !important;
      bottom: 160px !important;
      right: 20px !important;
      width: 52px !important;
      height: 52px !important;
      border-radius: 50% !important;
      padding: 0 !important;
      background: linear-gradient(135deg, #3b82f6, #60a5fa) !important;
      border: 3px solid rgba(255, 255, 255, 0.3) !important;
      box-shadow: 0 4px 16px rgba(59, 130, 246, 0.5) !important;
      cursor: pointer !important;
      z-index: 9998 !important;
      overflow: hidden !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    `;

    // Ensure image fills the circle
    const img = avatarBtn.querySelector('img');
    if (img) {
      img.style.cssText = 'width: 100% !important; height: 100% !important; border-radius: 50% !important; object-fit: cover !important;';
    }

    // Add hover effect
    avatarBtn.addEventListener('mouseenter', () => {
      avatarBtn.style.transform = 'translateY(-2px) scale(1.05)';
      avatarBtn.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.7)';
    });
    avatarBtn.addEventListener('mouseleave', () => {
      avatarBtn.style.transform = '';
      avatarBtn.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.5)';
    });

    // Position dropdown menu above avatar
    const dropMenu = document.getElementById('userDropMenu');
    if (dropMenu) {
      dropMenu.style.cssText = `
        position: fixed !important;
        bottom: 220px !important;
        right: 20px !important;
        background: rgba(10, 8, 35, 0.97) !important;
        backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 12px !important;
        padding: 8px !important;
        min-width: 180px !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;
        z-index: 9999 !important;
      `;
    }

    console.log('✅ Avatar button repositioned above feedback');
  }

  // FIX 3: Change Calendar button to open Google Calendar
  function fixCalendarButton() {
    // Find all calendar buttons
    const calendarBtns = document.querySelectorAll('[onclick*="downloadCalendar"], [onclick*="Calendar"], .topbar-btn:has([class*="calendar"])');
    
    // Also search by text content
    const allButtons = document.querySelectorAll('.topbar-btn, button');
    let calendarBtn = null;
    
    allButtons.forEach(btn => {
      const text = btn.textContent.toLowerCase();
      if (text.includes('calendar') || text.includes('कैलेंडर')) {
        calendarBtn = btn;
      }
    });

    if (!calendarBtn && calendarBtns.length > 0) {
      calendarBtn = calendarBtns[0];
    }

    if (!calendarBtn) {
      console.log('Calendar button not found, retrying...');
      setTimeout(fixCalendarButton, 1000);
      return;
    }

    // Remove old click handler
    const newBtn = calendarBtn.cloneNode(true);
    calendarBtn.parentNode.replaceChild(newBtn, calendarBtn);

    // Add new click handler for Google Calendar
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get study plan details from the app
      const examName = document.querySelector('[class*="exam"]')?.textContent || 'Study Plan';
      const today = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 6); // 6 months study plan

      // Create Google Calendar event URL
      const title = encodeURIComponent('📚 ' + examName);
      const details = encodeURIComponent('Daily study plan from ParikshaSathi - Check your dashboard for today\'s tasks');
      const startDate = formatGoogleCalendarDate(today);
      const endDateStr = formatGoogleCalendarDate(endDate);
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDateStr}&recur=RRULE:FREQ=DAILY`;
      
      // Open Google Calendar in new tab
      window.open(googleCalendarUrl, '_blank');
    });

    console.log('✅ Calendar button now opens Google Calendar');
  }

  // Helper function to format date for Google Calendar
  function formatGoogleCalendarDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  console.log('✅ ParikshaSathi Feature Fixes loaded');
})();
