/* ============================================================
   GSC COPRONET — Refonte 2026
   Interactions: sticky nav, mobile menu, reveal on scroll,
   smooth-scroll anchors, current year.
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Nav : état "scrolled" ---------- */
  const nav = document.querySelector('[data-nav]');
  const SCROLL_ENTER = 32;
  const SCROLL_EXIT = 4;
  const onScroll = () => {
    if (!nav) return;
    const isScrolled = nav.classList.contains('is-scrolled');
    if (!isScrolled && window.scrollY > SCROLL_ENTER) {
      nav.classList.add('is-scrolled');
    } else if (isScrolled && window.scrollY < SCROLL_EXIT) {
      nav.classList.remove('is-scrolled');
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu   = document.querySelector('.nav__menu');

  if (toggle && menu) {
    const mobileNav = window.matchMedia('(max-width: 1080px)');
    let resizeFrame = 0;

    const setMenuOpen = (open) => {
      const nextOpen = Boolean(open && mobileNav.matches);
      menu.classList.toggle('is-open', nextOpen);
      toggle.classList.toggle('is-open', nextOpen);
      toggle.setAttribute('aria-expanded', String(nextOpen));
      toggle.setAttribute('aria-label', nextOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('is-menu-open', nextOpen);
      document.body.style.overflow = '';
    };

    const closeMenu = () => setMenuOpen(false);
    const syncMenuWithViewport = () => {
      if (!mobileNav.matches || !menu.classList.contains('is-open')) {
        closeMenu();
      }
    };
    const syncMenuSoon = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(syncMenuWithViewport);
    };

    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-open');
    document.body.style.overflow = '';

    toggle.addEventListener('click', () => {
      setMenuOpen(!menu.classList.contains('is-open'));
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    if (mobileNav.addEventListener) {
      mobileNav.addEventListener('change', syncMenuWithViewport);
    } else {
      mobileNav.addListener(syncMenuWithViewport);
    }

    window.addEventListener('resize', syncMenuSoon, { passive: true });
    window.addEventListener('orientationchange', syncMenuSoon, { passive: true });
    window.addEventListener('pageshow', syncMenuWithViewport);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', syncMenuSoon, { passive: true });
    }

    syncMenuWithViewport();
  }

  /* ---------- Devis : estimation adaptée au besoin ---------- */
  const serviceSelect = document.querySelector('[data-service-select]');
  const estimateRow = document.querySelector('[data-estimate-row]');
  const estimateField = document.querySelector('[data-estimate-field]');
  const estimateLabel = document.querySelector('[data-estimate-label]');
  const estimateInput = document.querySelector('[data-estimate-input]');
  const estimateError = document.querySelector('[data-estimate-error]');
  const estimateModes = {
    surface: {
      name: 'surface',
      label: 'Surface approximative (m²)',
      placeholder: 'Ex. 450'
    },
    height: {
      name: 'height',
      label: 'Hauteur approximative (m)',
      placeholder: 'Ex. 12'
    },
    buildings: {
      name: 'buildings',
      label: 'Nombre de bâtiments',
      placeholder: 'Ex. 3'
    }
  };
  const estimateModeByService = {
    'remise-en-etat': 'surface',
    'nettoyage-medical': 'surface',
    'nettoyage-industriel': 'surface',
    'nettoyage-alimentaire': 'surface',
    'traitement-sols': 'surface',
    'nettoyage-bureaux': 'surface',
    'nettoyage-commerces': 'surface',
    'nettoyage-parkings': 'surface',
    'vitrerie-hauteur': 'height',
    'entretien-copropriete': 'buildings'
  };

  const updateEstimateField = () => {
    if (!serviceSelect || !estimateRow || !estimateField || !estimateLabel || !estimateInput || !estimateError) return;
    const mode = estimateModeByService[serviceSelect.value];
    const config = estimateModes[mode];

    if (!config) {
      estimateRow.classList.remove('has-estimate');
      estimateField.hidden = true;
      estimateField.setAttribute('aria-hidden', 'true');
      estimateInput.value = '';
      estimateInput.disabled = true;
      estimateInput.required = false;
      estimateInput.removeAttribute('name');
      estimateInput.removeAttribute('placeholder');
      estimateInput.setCustomValidity('');
      estimateInput.dataset.mode = '';
      estimateError.textContent = '';
      estimateError.hidden = true;
      return;
    }

    if (estimateInput.dataset.mode !== mode) estimateInput.value = '';
    estimateRow.classList.add('has-estimate');
    estimateField.hidden = false;
    estimateField.setAttribute('aria-hidden', 'false');
    estimateLabel.textContent = config.label;
    estimateInput.name = config.name;
    estimateInput.placeholder = config.placeholder;
    estimateInput.disabled = false;
    estimateInput.required = true;
    estimateInput.dataset.mode = mode;
    estimateInput.setAttribute('aria-label', config.label);
    estimateError.textContent = '';
    estimateError.hidden = true;
  };

  if (serviceSelect && estimateInput) {
    serviceSelect.addEventListener('change', updateEstimateField);
    estimateInput.addEventListener('keydown', event => {
      if (['e', 'E', '+', '-'].includes(event.key)) event.preventDefault();
    });
    estimateInput.addEventListener('input', () => {
      const hasDecimal = estimateInput.value !== '' && !Number.isInteger(estimateInput.valueAsNumber);
      const message = hasDecimal ? 'Veuillez saisir un nombre entier.' : '';
      estimateInput.setCustomValidity(message);
      estimateError.textContent = message;
      estimateError.hidden = !message;
    });
    serviceSelect.value = '';
    updateEstimateField();
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

  /* ---------- Bandeau "aucun cookie" ----------
     Sans stockage (conformément au brief : pas de localStorage/sessionStorage).
     Auto-fermeture après 10 s, ou clic sur le bouton ×. */
  const cookieNotice = document.querySelector('[data-cookie-notice]');
  if (cookieNotice) {
    const hide = () => {
      cookieNotice.classList.add('is-hidden');
      setTimeout(() => cookieNotice.remove(), 400);
    };
    cookieNotice.querySelector('[data-cookie-notice-close]')?.addEventListener('click', hide);
    setTimeout(hide, 10000);
  }

})();
