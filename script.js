/* ============================================================
   GSC COPRONET — Refonte 2026
   Interactions: sticky nav, mobile menu, reveal on scroll,
   smooth-scroll anchors, current year.
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Nav : état "scrolled" ---------- */
  const nav = document.querySelector('[data-nav]');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu   = document.querySelector('.nav__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // léger stagger pour les groupes de cards
          const siblings = entry.target.parentElement?.querySelectorAll('[data-reveal]') || [];
          const idx = Array.from(siblings).indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(idx * 60, 240)}ms`;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Parallax fluide (transform-only, rAF, GPU) ---------- */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = document.querySelectorAll('[data-parallax]');

  if (sections.length && !reduced) {
    const SHIFT = 150;          // px — doit correspondre à --shift dans le CSS
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const layers = [];          // { section, layer, visible }

    sections.forEach(section => {
      const layer = section.querySelector('.parallax__bg');
      if (layer) layers.push({ section, layer, visible: true });
    });

    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      layers.forEach(item => {
        if (!item.visible) return;
        const rect = item.section.getBoundingClientRect();
        // p : +1 quand la section vient d'entrer par le bas, -1 quand elle sort par le haut
        const p = clamp(
          (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2),
          -1, 1
        );
        // l'image dérive vers le haut quand on descend → effet parallaxe
        item.layer.style.transform = `translate3d(0, ${(p * SHIFT).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };

    // ne calcule que pour les sections réellement à l'écran
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const item = layers.find(l => l.section === entry.target);
        if (item) item.visible = entry.isIntersecting;
      });
      requestTick();
    }, { rootMargin: '15% 0px 15% 0px' });

    layers.forEach(l => io.observe(l.section));
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    update();
  }

  /* ---------- Year auto ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
