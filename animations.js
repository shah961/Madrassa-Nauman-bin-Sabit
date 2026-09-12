// NBS Islamic School System — animation layer
// Uses GSAP + ScrollTrigger where available. If GSAP fails to load, or the
// visitor prefers reduced motion, content is already visible (see style.css
// .js-reveal rules), so nothing breaks.

(function () {
  if (typeof gsap === 'undefined') return;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // One orchestrated hero entrance (only on pages with a .hero)
  var hero = document.querySelector('.hero, .page-hero');
  if (hero) {
    var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    var logo = hero.querySelector('.hero-logo');
    var heading = hero.querySelector('.hero-heading, h1');
    var sub = hero.querySelector('.hero-subheading, .breadcrumb + p, p');
    var ctas = hero.querySelector('.hero-ctas');

    gsap.set([logo, heading, sub, ctas].filter(Boolean), { opacity: 0, y: 16 });

    if (logo) tl.to(logo, { opacity: 1, y: 0, duration: 0.7 });
    if (heading) tl.to(heading, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
    if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35');
    if (ctas) tl.to(ctas, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
  }

  // Section-level reveal: each section fades/rises into place once, on scroll.
  // Deliberately restrained: one treatment, applied consistently, not a
  // different effect per element.
  if (window.ScrollTrigger) {
    document.querySelectorAll('.js-reveal').forEach(function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  } else {
    document.querySelectorAll('.js-reveal').forEach(function (el) {
      el.style.opacity = 1;
    });
  }
})();
