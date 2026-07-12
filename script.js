/* ============ HoodAI — interactions ============ */
(function () {
  "use strict";

  /* ---- inline SVG icon set (stroke, currentColor via CSS) ---- */
  const ICONS = {
    spark:  '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.9L18.7 9l-4.9 1.8L12 15.7l-1.8-4.9L5.3 9l4.9-1.1L12 3z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><circle cx="12" cy="10" r="2.4"/><path d="M8.4 16c.8-1.7 2.1-2.5 3.6-2.5s2.8.8 3.6 2.5"/></svg>',
    gift:   '<svg viewBox="0 0 24 24"><rect x="3.5" y="9" width="17" height="12" rx="1.5"/><path d="M3 13h18M12 9v12"/><path d="M12 9C10.5 5 6 5 6 7.5S9.5 9 12 9zM12 9c1.5-4 6-4 6-1.5S14.5 9 12 9z"/></svg>',
    bag:    '<svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6.5A3 3 0 0 1 15 6.5V8"/></svg>',
    chart:  '<svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h16"/><path d="M7 15l4-5 3 3 5-7"/><path d="M19 6v4h-4"/></svg>',
    fire:   '<svg viewBox="0 0 24 24"><path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.7-2.6 1.5-3.5C9.5 8.8 10.8 7 12 3z"/><path d="M12 21a5 5 0 0 0 5-5c0-1.2-.4-2.2-1-3-.2 2-1.6 3-3 3s-2.5-1-2.5-2.5c0-1 .3-1.6.8-2.3C9 13 8 14.5 8 16.5A4.5 4.5 0 0 0 12 21z"/></svg>',
    rocket: '<svg viewBox="0 0 24 24"><path d="M12 3c3 1 6 4 6 8l-3 3H9l-3-3c0-4 3-7 6-8z"/><circle cx="12" cy="9" r="1.6"/><path d="M9 14l-2 5 4-2M15 14l2 5-4-2"/></svg>',
    people: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M4 19c0-3 2.2-5 5-5s5 2 5 5"/><circle cx="17" cy="8.5" r="2.3"/><path d="M15 14c3 0 5 2 5 5"/></svg>',
    brain:  '<svg viewBox="0 0 24 24"><path d="M9.5 5A2.5 2.5 0 0 0 7 7.5 2.5 2.5 0 0 0 5.5 12 2.5 2.5 0 0 0 7 16.5 2.5 2.5 0 0 0 9.5 19c1 0 1.5-.5 2.5-.5V5.5C11 5.5 10.5 5 9.5 5z"/><path d="M14.5 5A2.5 2.5 0 0 1 17 7.5 2.5 2.5 0 0 1 18.5 12 2.5 2.5 0 0 1 17 16.5 2.5 2.5 0 0 1 14.5 19c-1 0-1.5-.5-2.5-.5"/></svg>',
    phone:  '<svg viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2.4"/><path d="M11 18h2"/></svg>',
    watch:  '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="3"/><path d="M9 7l.5-3h5L15 7M9 17l.5 3h5l.5-3"/><path d="M12 10v2.2l1.4.8"/></svg>',
    globe:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17"/></svg>',
    x:      '<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-7-6.2 7H1.3l8.1-9.3L1 2h7.1l4.9 6.4L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z"/></svg>',
    tg:     '<svg viewBox="0 0 24 24"><path d="M21.9 4.3L18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9L17.6 6c.4-.3-.1-.5-.6-.2L6.9 12.1l-4.8-1.5c-1-.3-1-1 .2-1.5L20.5 2c.9-.3 1.6.2 1.4 2.3z"/></svg>',
    dc:     '<svg viewBox="0 0 24 24"><path d="M19.3 5.3A16 16 0 0 0 15.3 4l-.2.4a12 12 0 0 1 3.5 1.7 15 15 0 0 0-13.2 0A12 12 0 0 1 8.9 4.4L8.7 4a16 16 0 0 0-4 1.3C1.9 9.5 1.1 13.6 1.5 17.6a16 16 0 0 0 4.9 2.5l.9-1.5c-.5-.2-1-.4-1.5-.7l.4-.3a11 11 0 0 0 9.5 0l.4.3c-.5.3-1 .5-1.5.7l.9 1.5a16 16 0 0 0 4.9-2.5c.5-4.7-.8-8.8-3.2-12.3zM8.5 15.2c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>',
    bolt:   '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
    heart:  '<svg viewBox="0 0 24 24"><path d="M12 20.5C7 16.5 3.5 13 3.5 9.3 3.5 6.6 5.6 4.5 8.1 4.5c1.6 0 3 .8 3.9 2.1.9-1.3 2.3-2.1 3.9-2.1 2.5 0 4.6 2.1 4.6 4.8 0 3.7-3.5 7.2-8.5 11.2z"/><path d="M6 12h3l1.5-3 2.5 5 1.5-2.8H18"/></svg>',
    food:   '<svg viewBox="0 0 24 24"><path d="M7 3v7M4.5 3v4.5a2.5 2.5 0 0 0 5 0V3M7 10v11"/><path d="M19.5 3.5c-4 1-5.5 4-5.5 8.5v9M14 12h5.5V3.5"/></svg>',
    mind:   '<svg viewBox="0 0 24 24"><circle cx="12" cy="6.2" r="2.6"/><path d="M12 9.5c-1.7 0-2.8 1-3.3 2.7l-1 3.6M12 9.5c1.7 0 2.8 1 3.3 2.7l1 3.6"/><path d="M5 18.8c2-1.5 4.4-2.3 7-2.3s5 .8 7 2.3M9.4 14.5c.8.6 1.7.9 2.6.9s1.8-.3 2.6-.9"/></svg>',
    shieldcheck: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M8.8 12l2.2 2.3 4.2-4.6"/></svg>'
  };
  document.querySelectorAll("[data-ic]").forEach((el) => {
    const k = el.getAttribute("data-ic");
    if (ICONS[k]) el.innerHTML = ICONS[k];
  });

  /* ---- nav: always sticky/dark + active link + burger ---- */
  const nav = document.getElementById("nav");
  const links = document.getElementById("navLinks");
  const burger = document.getElementById("burger");
  nav.classList.add("scrolled");

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    })
  );

  /* ---- trust bar: tap to expand (mobile only, CSS gates the visual effect) ---- */
  document.querySelectorAll(".trust__item-head").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".trust__item").classList.toggle("open");
    });
  });

  /* ---- roadmap: mobile swipe carousel — dots + auto-advance ---- */
  (function () {
    const track = document.querySelector(".roadmap__track");
    const dotsWrap = document.getElementById("roadmapDots");
    if (!track || !dotsWrap) return;
    const phases = [...track.children];
    const carouselMQ = matchMedia("(max-width:640px)");

    const scrollToPhase = (i) => {
      const el = phases[i];
      const target = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
      track.scrollTo({ left: target, behavior: "smooth" });
    };

    phases.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => scrollToPhase(i));
      dotsWrap.appendChild(dot);
    });
    const dots = [...dotsWrap.children];

    const setActive = (i) => dots.forEach((d, di) => d.classList.toggle("active", di === i));

    const closestIndex = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0,
        bestDist = Infinity;
      phases.forEach((el, i) => {
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    let current = 0;
    setActive(0);
    let scrollTimer;
    track.addEventListener(
      "scroll",
      () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          current = closestIndex();
          setActive(current);
        }, 100);
      },
      { passive: true }
    );

    /* auto-advance, only on mobile carousel, paused on user interaction */
    let autoplay;
    let pausedUntil = 0;
    const startAutoplay = () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => {
        if (!carouselMQ.matches || Date.now() < pausedUntil) return;
        current = (current + 1) % phases.length;
        scrollToPhase(current);
      }, 3500);
    };
    const pauseAutoplay = () => (pausedUntil = Date.now() + 6000);
    track.addEventListener("touchstart", pauseAutoplay, { passive: true });
    track.addEventListener("pointerdown", pauseAutoplay);
    dotsWrap.addEventListener("click", pauseAutoplay);
    startAutoplay();
  })();

  /* active section highlight */
  const navItems = [...links.querySelectorAll("a")];
  const sections = navItems
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = "#" + e.target.id;
          navItems.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---- scroll reveal (staggered per container) ---- */
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    // stagger siblings inside grids/rows
    const parent = el.parentElement;
    const sibs = [...parent.children].filter((c) => c.classList.contains("reveal"));
    const idx = sibs.indexOf(el);
    el.style.transitionDelay = (idx > 0 ? Math.min(idx, 6) * 70 : 0) + "ms";
    revealObs.observe(el);
  });

  /* ---- roadmap progress line fills when in view ---- */
  const roadmap = document.getElementById("roadmap");
  if (roadmap) {
    const prog = roadmap.querySelector(".roadmap__progress");
    const rObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            prog.style.width = "100%";
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    rObs.observe(roadmap);
  }

  /* ---- count-up for total supply ---- */
  const counters = document.querySelectorAll("[data-count]");
  const cObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.getAttribute("data-count");
        const dur = 1600;
        let start;
        const step = (t) => {
          if (!start) start = t;
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(target * eased).toLocaleString("en-US");
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString("en-US");
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => cObs.observe(c));

  /* ---- buy modal (pre-launch: token not live yet) ---- */
  (function () {
    const modal = document.getElementById("buyModal");
    if (!modal) return;
    const openModal = (e) => {
      e.preventDefault();
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    document.querySelectorAll("[data-buy]").forEach((b) => b.addEventListener("click", openModal));
    modal.querySelectorAll("[data-close]").forEach((c) => c.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  })();

  /* ---- newsletter (demo, no backend) ---- */
  const news = document.getElementById("news");
  const msg = document.getElementById("newsMsg");
  if (news) {
    news.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = news.querySelector("input");
      if (input.value && input.checkValidity()) {
        msg.textContent = "🎉 You're on the list! Welcome to the flock.";
        input.value = "";
      } else {
        msg.style.color = "#ff8a8a";
        msg.textContent = "Please enter a valid email.";
      }
    });
  }
})();
