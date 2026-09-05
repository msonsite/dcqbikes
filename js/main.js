(() => {
  const header = document.getElementById("site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.getElementById("nav-panel");
  const cookieBanner = document.getElementById("cookie-banner");

  const COOKIE_KEY = "dcq_cookie_consent";

  /* Header scroll state */
  const getHeaderOffset = () => {
    if (!header) return 0;
    return header.getBoundingClientRect().height;
  };

  const updateStickyOffset = () => {
    document.documentElement.style.setProperty(
      "--sticky-offset",
      `${Math.ceil(getHeaderOffset())}px`
    );
  };

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  updateStickyOffset();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateStickyOffset);

  const scrollToHash = (hash, behavior) => {
    if (!hash || hash === "#") return false;
    if (hash === "#top" || hash === "#main") {
      window.scrollTo({ top: 0, behavior: behavior });
      return true;
    }

    const section = document.querySelector(hash);
    if (!section) return false;

    /* Nudge 2px past the header so a previous-section seam never peeks through. */
    const headerH = getHeaderOffset();
    const top = Math.max(
      0,
      Math.round(window.scrollY + section.getBoundingClientRect().top - headerH) + 2
    );
    window.scrollTo({ top: top, behavior: behavior });
    return true;
  };

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || href === "#" || href === "#!") return;
    if (anchor.origin && anchor.origin !== window.location.origin) return;
    if (anchor.pathname && anchor.pathname !== window.location.pathname) return;

    e.preventDefault();
    if (header && header.classList.contains("is-open") && navToggle) {
      header.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Menu openen");
    }
    const go = () => {
      if (scrollToHash(href, "smooth")) {
        history.pushState(null, "", href);
      }
    };
    window.requestAnimationFrame(() => window.requestAnimationFrame(go));
  });

  if (window.location.hash) {
    window.requestAnimationFrame(() => {
      scrollToHash(window.location.hash, "auto");
    });
  }

  /* Mobile nav */
  if (navToggle && header && navPanel) {
    navToggle.addEventListener("click", () => {
      const open = !header.classList.contains("is-open");
      header.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    });

    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Menu openen");
      });
    });
  }

  /* Cookie banner */
  if (cookieBanner) {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      cookieBanner.hidden = false;
    }

    cookieBanner.querySelectorAll("[data-cookie]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-cookie");
        localStorage.setItem(COOKIE_KEY, value === "accept" ? "accepted" : "rejected");
        cookieBanner.hidden = true;
      });
    });
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* Contact video: ensure play after load */
  const contactVideo = document.querySelector(".contact-media__video");
  if (contactVideo) {
    const tryPlay = () => {
      contactVideo.play().catch(() => {});
    };
    tryPlay();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tryPlay();
    });
  }

  /* Contact form → Formspree (same endpoint as old site) */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const submitBtn = document.getElementById("contact-submit");
    const statusEl = document.getElementById("contact-status");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const action = contactForm.getAttribute("data-formspree");
      if (!action || !action.startsWith("https://formspree.io/")) {
        contactForm.reset();
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.textContent =
            "Bedankt voor je bericht! We nemen zo spoedig mogelijk contact met je op.";
          statusEl.classList.remove("contact-form__status--error");
          statusEl.classList.add("contact-form__status--ok");
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Verzenden...";
      }
      if (statusEl) {
        statusEl.hidden = true;
        statusEl.textContent = "";
        statusEl.classList.remove(
          "contact-form__status--ok",
          "contact-form__status--error"
        );
      }

      try {
        const response = await fetch(action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Formspree error");

        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Verzonden";
        }
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.textContent =
            "Bedankt! Je bericht werd succesvol verzonden.";
          statusEl.classList.add("contact-form__status--ok");
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Probeer opnieuw";
        }
        if (statusEl) {
          statusEl.hidden = false;
          statusEl.textContent =
            "Er ging iets mis. Gelieve later opnieuw te proberen.";
          statusEl.classList.add("contact-form__status--error");
        }
      }
    });
  }

  /* One FAQ open at a time */
  const faq = document.querySelector(".faq");
  if (faq) {
    faq.addEventListener(
      "toggle",
      (event) => {
        const target = event.target;
        if (!(target instanceof HTMLDetailsElement) || !target.open) return;
        faq.querySelectorAll("details[open]").forEach((el) => {
          if (el !== target) el.open = false;
        });
      },
      true
    );
  }

  /* —— Store open/closed status —— */
  let BELGIAN_HOLIDAYS = [];

  function isOnVacation(currentDate) {
    if (typeof VACATION_PERIODS === "undefined") return { isOnVacation: false };

    const currentDateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    for (const period of VACATION_PERIODS) {
      const startDate = new Date(period.start[0], period.start[1] - 1, period.start[2]);
      const endDate = new Date(period.end[0], period.end[1] - 1, period.end[2]);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      currentDateOnly.setHours(0, 0, 0, 0);

      if (currentDateOnly >= startDate && currentDateOnly <= endDate) {
        return { isOnVacation: true, startDate, endDate };
      }
    }
    return { isOnVacation: false };
  }

  async function loadHolidaysFromCSV() {
    try {
      const response = await fetch("/data/belgium_public_holidays_2026_2040.csv");
      if (!response.ok) return;
      const csvText = await response.text();
      const lines = csvText.split("\n");
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const commaIndex = line.indexOf(",");
        if (commaIndex === -1) continue;
        const dateStr = line.substring(0, commaIndex).trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) BELGIAN_HOLIDAYS.push(dateStr);
      }
    } catch {
      /* CSV optional offline */
    }
  }

  function getHolidayDateEntry(currentDate) {
    if (typeof HOLIDAY_DATES === "undefined") return null;
    const targetYear = currentDate.getFullYear();
    const targetMonth = currentDate.getMonth() + 1;
    const targetDay = currentDate.getDate();
    const normalize = (value) => (typeof value === "string" ? parseInt(value, 10) : value);

    for (const holiday of HOLIDAY_DATES) {
      let year;
      let month;
      let day;
      let message = "";

      if (Array.isArray(holiday)) {
        [year, month, day] = holiday;
      } else if (holiday && typeof holiday === "object") {
        if (Array.isArray(holiday.date)) {
          [year, month, day] = holiday.date;
        } else {
          year = holiday.year;
          month = holiday.month;
          day = holiday.day;
        }
        message = holiday.message || holiday.label || "";
      } else if (typeof holiday === "string" && holiday.includes("-")) {
        const parts = holiday.split("-");
        if (parts.length === 3) [year, month, day] = parts.map(normalize);
      }

      year = normalize(year);
      month = normalize(month);
      day = normalize(day);

      if (year === targetYear && month === targetMonth && day === targetDay) {
        return { message: message || null };
      }
    }
    return null;
  }

  function isHoliday(currentDate) {
    if (!BELGIAN_HOLIDAYS.length) return false;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return BELGIAN_HOLIDAYS.includes(`${year}-${month}-${day}`);
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}/${date.getFullYear()}`;
  }

  function getDetailedClosedLabel(message) {
    if (!message) return "Gesloten (Uitzonderlijk)";
    const trimmed = String(message).trim();
    if (/^gesloten\b/i.test(trimmed)) return trimmed;
    return `Gesloten (${trimmed})`;
  }

  function updateStoreStatus() {
    const statusNodes = document.querySelectorAll(".store-status");
    if (!statusNodes.length) return;

    const now = new Date();
    let statusClass = "closed";
    let statusShort = "Gesloten";
    let statusDetailed = "Gesloten";

    const vacationCheck = isOnVacation(now);
    if (vacationCheck.isOnVacation) {
      statusClass = "closed";
      statusShort = "In verlof";
      statusDetailed = `In Verlof (${formatDate(vacationCheck.startDate)} tot ${formatDate(vacationCheck.endDate)})`;
    } else {
      const holidayEntry = getHolidayDateEntry(now);
      if (holidayEntry) {
        statusClass = "closed";
        statusShort = "Gesloten";
        statusDetailed = getDetailedClosedLabel(holidayEntry.message);
      } else if (isHoliday(now)) {
        statusClass = "closed";
        statusShort = "Gesloten";
        statusDetailed = "Gesloten (Feestdag)";
      } else {
        const currentDay = now.getDay();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const applySlot = (morningEnd, afternoonEnd) => {
          const morningStart = 9 * 60;
          const afternoonStart = 13 * 60 + 30;
          const inMorning = currentTime >= morningStart && currentTime < morningEnd;
          const inAfternoon = currentTime >= afternoonStart && currentTime < afternoonEnd;
          if (inMorning || inAfternoon) {
            const untilClose = inMorning ? morningEnd - currentTime : afternoonEnd - currentTime;
            if (untilClose <= 30) {
              statusClass = "warning";
              statusShort = "Sluit binnenkort";
              statusDetailed = "Sluit binnenkort";
            } else {
              statusClass = "open";
              statusShort = "Open";
              statusDetailed = "Open";
            }
          } else {
            statusClass = "closed";
            statusShort = "Gesloten";
            statusDetailed = "Gesloten";
          }
        };

        if (currentDay === 0 || currentDay === 1) {
          statusClass = "closed";
          statusShort = "Gesloten";
          statusDetailed = "Gesloten";
        } else if (currentDay >= 2 && currentDay <= 5) {
          applySlot(12 * 60, 18 * 60);
        } else if (currentDay === 6) {
          applySlot(12 * 60, 17 * 60);
        }
      }
    }

    const useShort = window.matchMedia("(max-width: 720px)").matches;
    statusNodes.forEach((storeStatus) => {
      storeStatus.classList.remove("open", "warning", "closed", "vacation");
      storeStatus.classList.add(statusClass);
      storeStatus.title = statusDetailed;
      const statusText = storeStatus.querySelector(".store-status-text");
      if (statusText) statusText.textContent = useShort ? statusShort : statusDetailed;
    });
  }

  loadHolidaysFromCSV().then(() => {
    updateStoreStatus();
    setInterval(updateStoreStatus, 60 * 1000);
  });

  /* —— Easter egg Kurt —— */
  (function initKurtEgg() {
    const AUDIO_SRC = "/assets/audio/easteregg-kurt.mp3";
    let kurtEggAudio = null;

    function stopKurtEggAudio() {
      if (!kurtEggAudio) return;
      kurtEggAudio.pause();
      kurtEggAudio.currentTime = 0;
      kurtEggAudio = null;
    }

    function playKurtEggAudio() {
      stopKurtEggAudio();
      const audio = new Audio(AUDIO_SRC);
      audio.preload = "auto";
      kurtEggAudio = audio;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }

    function closeKurtEgg(overlay, onKey) {
      if (!overlay || !overlay.parentNode) return;
      stopKurtEggAudio();
      if (onKey) document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      overlay.parentNode.removeChild(overlay);
    }

    function openKurtEgg() {
      if (document.getElementById("dcqKurtEggOverlay")) return;

      const overlay = document.createElement("div");
      overlay.id = "dcqKurtEggOverlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Leuk momentje");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dcq-kurt-egg-close";
      btn.setAttribute("aria-label", "Sluiten");
      btn.textContent = "\u00D7";

      const img = document.createElement("img");
      img.className = "dcq-kurt-egg-img";
      img.src = "/assets/images/profilepictures/eastereggkurt.png";
      img.alt = "Kurt als kind in een skelter, onderonsje bij DCQ Bikes.";

      overlay.appendChild(btn);
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      playKurtEggAudio();

      function onKey(e) {
        if (e.key === "Escape") closeKurtEgg(overlay, onKey);
      }
      document.addEventListener("keydown", onKey);

      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        closeKurtEgg(overlay, onKey);
      });
      overlay.addEventListener("click", (ev) => {
        if (ev.target === overlay) closeKurtEgg(overlay, onKey);
      });
      btn.focus();
    }

    document.querySelectorAll(".dcq-kurt-egg-trigger").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openKurtEgg();
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openKurtEgg();
        }
      });
    });
  })();

  /* Wij staan voor … rotator */
  (function () {
    const root = document.querySelector(".statement-rotate");
    const slot = root && root.querySelector(".statement-rotate__slot");
    if (!slot) return;

    const items = Array.prototype.slice.call(
      slot.querySelectorAll(".statement-rotate__item")
    );
    if (items.length < 2) return;

    const motionQuery =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = () => !!(motionQuery && motionQuery.matches);

    let index = items.findIndex((item) => item.classList.contains("is-active"));
    if (index < 0) index = 0;
    items.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
      item.classList.remove("is-exit");
    });

    const HOLD_MS = 2600;
    const TRANSITION_MS = 480;
    let exitTimer;

    function tick() {
      const current = items[index];
      const nextIndex = (index + 1) % items.length;
      const next = items[nextIndex];

      if (prefersReducedMotion()) {
        current.classList.remove("is-active", "is-exit");
        next.classList.add("is-active");
      } else {
        current.classList.remove("is-active");
        current.classList.add("is-exit");
        next.classList.add("is-active");
        window.clearTimeout(exitTimer);
        exitTimer = window.setTimeout(() => {
          current.classList.remove("is-exit");
        }, TRANSITION_MS);
      }

      index = nextIndex;
      window.setTimeout(tick, HOLD_MS);
    }

    window.setTimeout(tick, HOLD_MS);
  })();
})();
