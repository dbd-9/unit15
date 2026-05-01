/* ============================================================
   HOT BEANS WEB — components.js
   Behaviour only. Nav and footer are inlined in each HTML
   file so they exist without JavaScript.
   ============================================================ */

/* ── HAMBURGER MENU ──────────────────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.querySelector('.hamburger-icon').textContent = isOpen ? '✕' : '☰';
  });

  // Close when any nav link is tapped (useful for same-page anchors)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('.hamburger-icon').textContent = '☰';
    });
  });

  // Close when clicking anywhere outside the menu
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('.hamburger-icon').textContent = '☰';
    }
  });
})();

/* ── SCROLL-HIDE HEADER ──────────────────────────────────── */
(function initScrollHide() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking     = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down — hide
          header.classList.add('header--hidden');
        } else {
          // Scrolling up — reveal
          header.classList.remove('header--hidden');
        }
      } else {
        // Near the top — always show
        header.classList.remove('header--hidden');
      }

      lastScrollY = currentScrollY;
      ticking     = false;
    });

    ticking = true;
  }, { passive: true });
})();
