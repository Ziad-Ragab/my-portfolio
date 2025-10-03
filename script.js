(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Theme handling
  const root = document.documentElement;
  const colorSchemeMeta = qs('meta[name="color-scheme"]');
  const systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');

  const getStoredTheme = () => localStorage.getItem('theme');
  const getPreferredTheme = () => getStoredTheme() || (systemLight && systemLight.matches ? 'light' : 'dark');
  const applyTheme = (theme) => {
    const t = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = t;
    if (colorSchemeMeta) colorSchemeMeta.setAttribute('content', t === 'light' ? 'light dark' : 'dark light');
    const btn = qs('#theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(t === 'light'));
      btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  };

  applyTheme(getPreferredTheme());

  const toggleBtn = qs('#theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }
  if (systemLight && systemLight.addEventListener) {
    systemLight.addEventListener('change', (e) => {
      if (!getStoredTheme()) applyTheme(e.matches ? 'light' : 'dark');
    });
  }

  // Year in footer
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header shrink / background on scroll
  const header = qs('#site-header');
  const setHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 4) header.classList.add('header--scrolled');
    else header.classList.remove('header--scrolled');
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  // Mobile navigation toggle
  const navToggle = qs('#nav-toggle');
  const primaryNav = qs('#primary-nav');
  const body = document.body;
  const closeNav = () => {
    body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };
  const openNav = () => {
    body.classList.add('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  };
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = body.classList.contains('nav-open');
      isOpen ? closeNav() : openNav();
    });
    // Close when clicking any nav link
    qsa('.nav-link', primaryNav).forEach((a) => a.addEventListener('click', () => closeNav()));
    // Close on Escape
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
    // Reset to desktop state on resize
    const mq = window.matchMedia('(min-width: 981px)');
    const handleResize = () => { if (mq.matches) closeNav(); };
    if (mq.addEventListener) mq.addEventListener('change', handleResize); else mq.addListener(handleResize);
  }

  // Reveal on scroll (sections, cards, posts, skills)
  const revealTargets = qsa('.reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          // Animate skill bars when revealed
          qsa('.skill-level', entry.target).forEach((bar) => {
            const target = parseInt(bar.getAttribute('data-target') || '0', 10);
            bar.style.width = Math.max(0, Math.min(100, target)) + '%';
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    // Immediately show anything already in the initial viewport
    const initialH = window.innerHeight || document.documentElement.clientHeight;
    revealTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < initialH * 0.9) {
        el.classList.add('show');
        qsa('.skill-level', el).forEach((bar) => {
          const target = parseInt(bar.getAttribute('data-target') || '0', 10);
          bar.style.width = Math.max(0, Math.min(100, target)) + '%';
        });
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    // Fallback: show immediately
    revealTargets.forEach((el) => el.classList.add('show'));
    qsa('.skill-level').forEach((bar) => {
      const target = parseInt(bar.getAttribute('data-target') || '0', 10);
      bar.style.width = Math.max(0, Math.min(100, target)) + '%';
    });
  }

  // Active nav link highlighting based on section in view
  const navLinks = qsa('.nav-link');
  const sections = qsa('section[id]');
  const byId = (id) => navLinks.find((a) => a.getAttribute('href') === `#${id}`);

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = byId(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0% -50% 0%', threshold: [0, 0.25, 0.6, 1] });

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // Contact form (frontend-only demo)
  const form = qs('#contact-form');
  if (form) {
    const status = qs('#form-status');

    const setError = (input, message) => {
      const span = input.closest('.field')?.querySelector('.error');
      if (span) span.textContent = message || '';
    };

    const validate = () => {
      let ok = true;
      const name = qs('#name');
      const email = qs('#email');
      const message = qs('#message');

      if (name) {
        if (!name.value.trim()) { setError(name, 'Please enter your name.'); ok = false; }
        else setError(name, '');
      }
      if (email) {
        const v = email.value.trim();
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(v)) { setError(email, 'Enter a valid email address.'); ok = false; }
        else setError(email, '');
      }
      if (message) {
        if (!message.value.trim()) { setError(message, 'Please write a message.'); ok = false; }
        else setError(message, '');
      }
      return ok;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      if (status) {
        status.textContent = 'Sending…';
      }

      // Simulate async; replace with EmailJS/Formspree/etc. when ready
      setTimeout(() => {
        if (status) status.textContent = 'Thanks! Your message has been sent.';
        form.reset();
      }, 700);
    });
  }

  // Hero typing effect: types, holds, then deletes words in a loop
  // Target HTML structure:
  // <p class="hero-typing">I'm a <span id="typing-text" class="word"></span><span class="typing-cursor">|</span></p>
  const typingTarget = qs('#typing-text');
  if (typingTarget) {
    // Words to cycle through
    const words = [
      'Web Developer',
      'Web Designer',
      'Freelancer',
      'Graphic Designer'
    ];

    // Timings (tweak to taste)
    const speed = {
      type: 90,    // ms per letter when typing
      erase: 55,   // ms per letter when deleting
      hold: 1100,  // ms to hold when a word is fully typed
      gap: 300     // ms before starting next word after delete
    };

    // Respect reduced motion preferences: show first word without animation
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      typingTarget.textContent = words[0];
    } else {
      let wordIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const current = words[wordIndex];
        if (!deleting) {
          // Type next letter
          typingTarget.textContent = current.slice(0, charIndex + 1);
          charIndex++;
          if (charIndex === current.length) {
            // Word complete: hold, then start deleting
            deleting = true;
            setTimeout(tick, speed.hold);
            return;
          }
          setTimeout(tick, speed.type);
        } else {
          // Delete previous letter
          typingTarget.textContent = current.slice(0, Math.max(0, charIndex - 1));
          charIndex--;
          if (charIndex === 0) {
            // Word deleted: move to next
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(tick, speed.gap);
            return;
          }
          setTimeout(tick, speed.erase);
        }
      };

      // Kick off the loop
      tick();
    }
  }
})();
