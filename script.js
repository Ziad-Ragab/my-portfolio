(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("#site-header");
  const themeToggle = document.querySelector("#theme-toggle");
  const navToggle = document.querySelector("#nav-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const floatingContact = document.querySelector(".floating-contact");
  const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getSavedTheme = () => {
    try {
      return window.localStorage.getItem("portfolio-theme");
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The selected theme still applies for the current visit.
    }
  };

  const preferredTheme = () => getSavedTheme() || (systemDark.matches ? "dark" : "light");

  const applyTheme = (theme) => {
    const selected = theme === "light" ? "light" : "dark";
    root.dataset.theme = selected;

    if (colorSchemeMeta) {
      colorSchemeMeta.setAttribute("content", selected === "light" ? "light dark" : "dark light");
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", selected === "light" ? "#f5f8fc" : "#07111f");
    }

    if (themeToggle) {
      const isLight = selected === "light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    }
  };

  applyTheme(preferredTheme());

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  });

  systemDark.addEventListener?.("change", (event) => {
    if (!getSavedTheme()) applyTheme(event.matches ? "dark" : "light");
  });

  const closeNav = () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const willOpen = !body.classList.contains("nav-open");
    body.classList.toggle("nav-open", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
  });

  primaryNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("nav-open")) return;
    if (primaryNav?.contains(event.target) || navToggle?.contains(event.target)) return;
    closeNav();
  });

  window.matchMedia("(min-width: 821px)").addEventListener?.("change", (event) => {
    if (event.matches) closeNav();
  });

  const updateScrollState = () => {
    const hasScrolled = window.scrollY > 12;
    header?.classList.toggle("is-scrolled", hasScrolled);
    floatingContact?.classList.toggle("is-visible", window.scrollY > 620);
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add("is-visible");
      } else {
        revealObserver.observe(item);
      }
    });
  }

  const navLinks = Array.from(document.querySelectorAll("#primary-nav a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    }, { rootMargin: "-35% 0px -55%", threshold: [0.05, 0.25, 0.55] });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
