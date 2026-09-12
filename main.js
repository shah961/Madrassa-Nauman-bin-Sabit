// NBS Islamic School System — core site behavior
// Works with no build step. Progressive enhancement: page is usable without this file.

document.documentElement.classList.remove('no-js');

(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var nav = document.querySelector('.navList');
  var btn = document.querySelector('.hamburger');
  var navbar = document.querySelector('.navbar');
  var body = document.body;

  function closeMenu() {
    if (!nav || !btn) return;
    nav.classList.remove('active');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
    body.style.overflow = '';
  }

  function openMenu() {
    if (!nav || !btn) return;
    nav.classList.add('active');
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu(); else openMenu();
    });
  }

  document.querySelectorAll('.navList a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (!nav || !btn) return;
    if (nav.classList.contains('active') && !nav.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
      closeMenu();
      btn.focus();
    }
  });

  // Navbar solid-on-scroll state
  if (navbar) {
    var onScroll = function () {
      if (window.scrollY > 40) navbar.classList.add('is-scrolled');
      else navbar.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mark reduced-motion at the document level so CSS can react without JS animation libraries
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) document.documentElement.classList.add('reduced-motion');

  // Contact form: client-side validation + accessible status message (no backend wired yet)
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['name', 'email', 'message'].forEach(function (id) {
        var field = document.getElementById(id);
        var errorEl = document.getElementById(id + '-error');
        if (!field.value.trim()) {
          valid = false;
          if (errorEl) errorEl.textContent = 'This field is required.';
          field.setAttribute('aria-invalid', 'true');
        } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          valid = false;
          if (errorEl) errorEl.textContent = 'Enter a valid email address.';
          field.setAttribute('aria-invalid', 'true');
        } else {
          if (errorEl) errorEl.textContent = '';
          field.removeAttribute('aria-invalid');
        }
      });

      if (!status) return;
      status.classList.remove('success', 'error');
      if (valid) {
        // NOTE: no submission endpoint is wired up yet — connect this to a real
        // form handler (e.g. an email API or backend route) before launch.
        status.textContent = 'Thank you — your message has been prepared. Form submission is not yet connected to an email service; please contact us directly until this is set up.';
        status.classList.add('success');
        status.setAttribute('role', 'status');
      } else {
        status.textContent = 'Please correct the highlighted fields and try again.';
        status.classList.add('error');
        status.setAttribute('role', 'alert');
      }
    });
  }
})();
