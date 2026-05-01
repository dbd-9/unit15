/* ============================================================
   HOT BEANS WEB — components.js
   Injects shared nav + footer, handles mobile menu,
   scroll-hide header, and active nav link detection.
   ============================================================ */

/* ── 1. NAV HTML ─────────────────────────────────────────── */
const headerHTML = `
<header class="site-header" id="site-header">
  <div class="nav-inner">
    <a href="index.html" class="logo" aria-label="Hot Beans Web — Home">
      <span class="logo-beans" aria-hidden="true">☕</span>
      <span class="logo-text">Hot Beans Web</span>
    </a>

    <nav class="nav-links" id="nav-links" role="navigation" aria-label="Main navigation">
      <a href="index.html"     class="nav-link">Home</a>
      <a href="trainees.html"  class="nav-link">Trainees</a>
      <a href="courses.html"   class="nav-link">Courses</a>
      <a href="jobs.html"      class="nav-link">Jobs</a>
      <a href="apply.html"     class="nav-link nav-link--apply">Apply</a>
    </nav>

    <button
      class="hamburger"
      id="hamburger"
      aria-label="Toggle navigation menu"
      aria-expanded="false"
      aria-controls="nav-links"
    >
      <span class="hamburger-icon" aria-hidden="true">☰</span>
    </button>
  </div>
</header>
`;

/* ── 2. FOOTER HTML ──────────────────────────────────────── */
const footerHTML = `
<footer class="site-footer">
  <div class="footer-inner">

    <div class="footer-col footer-brand">
      <span class="footer-name">Hot Beans Web</span>
      <p class="footer-tagline">Building the web, one handcrafted line at a time.</p>
    </div>

    <div class="footer-col footer-social">
      <a href="#" class="social-link" aria-label="Hot Beans Web on Twitter / X"
         target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-x-twitter" aria-hidden="true"></i>
      </a>
      <a href="#" class="social-link" aria-label="Hot Beans Web on LinkedIn"
         target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
      </a>
      <a href="#" class="social-link" aria-label="Hot Beans Web on GitHub"
         target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
      </a>
    </div>

    <div class="footer-col footer-copy">
      <p>&copy; 2026 Hot Beans Web. All rights reserved.</p>
    </div>

  </div>
</footer>
`;

/* ── 3. INJECT NAV + FOOTER ──────────────────────────────── */
document.body.insertAdjacentHTML('afterbegin', headerHTML);
document.body.insertAdjacentHTML('beforeend',  footerHTML);

/* ── 4. ACTIVE NAV LINK ──────────────────────────────────── */
(function setActiveLink() {
  // Handles both "index.html" and bare "/" (root) URLs
  const raw       = window.location.pathname.split('/').pop();
  const current   = raw === '' ? 'index.html' : raw;

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* ── 5. HAMBURGER MENU ───────────────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.querySelector('.hamburger-icon').textContent = isOpen ? '✕' : '☰';
  });

  // Close menu when a nav link is clicked (e.g. same-page anchor)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('.hamburger-icon').textContent = '☰';
    });
  });

  // Close menu on click outside
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('.hamburger-icon').textContent = '☰';
    }
  });
})();

/* ── 6. SCROLL-HIDE HEADER ───────────────────────────────── */
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
