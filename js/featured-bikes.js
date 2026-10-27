/**
 * Rendert uitgelichte fietsen vanuit data/featured-bikes.js
 * Pas FEATURED_BIKES aan: deze file hoef je normaal niet te wijzigen.
 */
(function () {
  const section = document.getElementById("uitgelicht");
  const grid = document.getElementById("featured-grid");
  if (!section || !grid) return;

  const bikes = (
    typeof FEATURED_BIKES !== "undefined" && Array.isArray(FEATURED_BIKES)
      ? FEATURED_BIKES.slice()
      : []
  ).sort((a, b) => {
    const priceA = Number(a && a.price);
    const priceB = Number(b && b.price);
    const hasA = Number.isFinite(priceA);
    const hasB = Number.isFinite(priceB);
    if (hasA && hasB) return priceA - priceB;
    if (hasA) return -1;
    if (hasB) return 1;
    return 0;
  });

  if (!bikes.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  function imageSrc(image) {
    if (!image) return "";
    if (/^https?:\/\//i.test(image) || image.startsWith("/")) return image;
    if (image.includes("/")) return "/" + image.replace(/^\.\//, "");
    return "/assets/images/uitgelicht/" + image;
  }

  function formatPrice(price) {
    if (price == null || price === "") return "";
    const num = Number(price);
    if (Number.isNaN(num)) return String(price);
    return (
      "€\u00a0" +
      num.toLocaleString("nl-BE", {
        maximumFractionDigits: 0,
      })
    );
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const BRAND_LOGOS = {
    Victoria: "/assets/images/brands/large/victoriablack.png",
    Conway: "/assets/images/brands/large/Conway_Wortmarke.png",
    Norta: "/assets/images/brands/large/norta.png",
    Oxford: "/assets/images/brands/large/oxfordlogo.webp",
    Qio: "/assets/images/brands/large/qio.png",
    Trenergy: "/assets/images/brands/large/trenergylogo.webp",
    Aureus: "/assets/images/brands/large/aureus.webp",
  };

  function brandLogoSrc(bike) {
    if (bike.brandLogo) return imageSrc(bike.brandLogo);
    const brand = (bike.brand || "").trim();
    const mapped = BRAND_LOGOS[brand];
    if (mapped === null) return "";
    return mapped || "";
  }

  const fragment = document.createDocumentFragment();
  const occasionFragment = document.createDocumentFragment();
  const occasionWrap = document.getElementById("occasion");
  const occasionGrid = document.getElementById("occasion-grid");

  bikes.forEach((bike) => {
    const brand = (bike.brand || "").trim();
    const model = (bike.model || "").trim();
    const title = [brand, model].filter(Boolean).join(" ");
    const src = imageSrc(bike.image);
    const priceLabel = formatPrice(bike.price);
    const logoSrc = brandLogoSrc(bike);

    const brandHtml = logoSrc
      ? '<p class="bike-card__brand"><img src="' +
        escapeHtml(logoSrc) +
        '" alt="' +
        escapeHtml(brand || "Merk") +
        '" loading="lazy" height="22" /></p>'
      : brand
        ? '<p class="bike-card__brand bike-card__brand--text">' +
          escapeHtml(brand) +
          "</p>"
        : "";

    const article = document.createElement("article");
    article.className = "bike-card reveal" + (bike.highlight ? " bike-card--highlight" : "");

    function mediaButton(photo, alt, extraClass) {
      return (
        '<button type="button" class="bike-card__media' +
        (extraClass ? " " + extraClass : "") +
        '" aria-label="Vergroot foto van ' +
        escapeHtml(title || "uitgelichte fiets") +
        '">' +
        '<img src="' +
        escapeHtml(imageSrc(photo)) +
        '" alt="' +
        escapeHtml(alt) +
        '" loading="lazy" width="640" height="400" />' +
        "</button>"
      );
    }

    const gallery = Array.isArray(bike.gallery) ? bike.gallery : [];
    const smallPhotos = bike.highlight ? gallery : [];

    const mediaHtml = mediaButton(bike.image, title || "Uitgelichte fiets");

    const thumbsHtml = smallPhotos.length
      ? '<div class="bike-card__thumbs" role="group" aria-label="Meer foto\'s">' +
        smallPhotos
          .map(
            (g, i) =>
              '<button type="button" class="bike-card__thumb" data-src="' +
              escapeHtml(imageSrc(g)) +
              '" aria-label="Vergroot extra foto ' +
              (i + 1) +
              '"><img src="' +
              escapeHtml(imageSrc(g)) +
              '" alt="" loading="lazy" width="120" height="80" /></button>'
          )
          .join("") +
        "</div>"
      : "";

    const specs = Array.isArray(bike.specs) ? bike.specs : [];
    const specsHtml = specs.length
      ? '<ul class="bike-card__specs">' +
        specs.map((s) => "<li>" + escapeHtml(s) + "</li>").join("") +
        "</ul>"
      : "";

    const tagHtml = bike.tag
      ? '<p class="bike-card__tag">' + escapeHtml(bike.tag) + "</p>"
      : "";

    article.innerHTML =
      mediaHtml +
      '<div class="bike-card__body">' +
      tagHtml +
      (bike.highlight ? "" : brandHtml) +
      '<div class="bike-card__meta">' +
      (model || bike.highlight
        ? "<h4>" + escapeHtml(bike.highlight ? title : model) + "</h4>"
        : "") +
      (priceLabel
        ? '<p class="bike-card__price">' + escapeHtml(priceLabel) + "</p>"
        : "") +
      "</div>" +
      (bike.description
        ? '<p class="bike-card__desc">' + escapeHtml(bike.description) + "</p>"
        : "") +
      specsHtml +
      thumbsHtml +
      "</div>";

    (bike.highlight && occasionGrid ? occasionFragment : fragment).appendChild(article);
  });

  grid.replaceChildren(fragment);
  if (occasionGrid) {
    occasionGrid.replaceChildren(occasionFragment);
    if (occasionWrap) occasionWrap.hidden = !occasionGrid.children.length;
  }
  if (!grid.children.length) grid.hidden = true;

  /* Lightbox for featured bike photos */
  (function initFeaturedLightbox() {
    let activeOverlay = null;
    let lastFocus = null;
    let onKey = null;

    function closeLightbox() {
      if (!activeOverlay) return;
      const overlay = activeOverlay;
      activeOverlay = null;
      if (onKey) {
        document.removeEventListener("keydown", onKey);
        onKey = null;
      }
      document.body.style.overflow = "";
      overlay.remove();
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
      lastFocus = null;
    }

    function openLightbox(src, alt, caption) {
      if (!src) return;
      closeLightbox();
      lastFocus = document.activeElement;

      const overlay = document.createElement("div");
      overlay.className = "bike-lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", caption || alt || "Vergrote fietsfoto");

      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "bike-lightbox__close";
      closeBtn.setAttribute("aria-label", "Sluiten");
      closeBtn.textContent = "\u00D7";

      const figure = document.createElement("figure");
      figure.className = "bike-lightbox__figure";

      const img = document.createElement("img");
      img.className = "bike-lightbox__img";
      img.src = src;
      img.alt = alt || "";

      figure.appendChild(img);
      if (caption) {
        const figcaption = document.createElement("figcaption");
        figcaption.className = "bike-lightbox__caption";
        figcaption.textContent = caption;
        figure.appendChild(figcaption);
      }

      overlay.appendChild(closeBtn);
      overlay.appendChild(figure);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      activeOverlay = overlay;
      closeBtn.focus();

      onKey = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          closeLightbox();
        }
      };
      document.addEventListener("keydown", onKey);

      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeLightbox();
      });
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeLightbox();
      });
    }

    section.addEventListener("click", (e) => {
      const thumb = e.target.closest(".bike-card__thumb");
      if (thumb && section.contains(thumb)) {
        const card = thumb.closest(".bike-card");
        const h4 = card && card.querySelector("h4");
        const name = (h4 && h4.textContent.trim()) || "";
        openLightbox(thumb.getAttribute("data-src"), name, name);
        return;
      }
      const trigger = e.target.closest(".bike-card__media");
      if (!trigger || !section.contains(trigger)) return;
      const img = trigger.querySelector("img");
      if (!img) return;
      const card = trigger.closest(".bike-card");
      const modelEl = card && card.querySelector("h4");
      const brandEl =
        card && card.querySelector(".bike-card__brand img, .bike-card__brand--text");
      const brand =
        (brandEl && (brandEl.getAttribute("alt") || brandEl.textContent || "").trim()) ||
        "";
      const model = (modelEl && modelEl.textContent.trim()) || "";
      const caption = [brand, model].filter(Boolean).join(" ");
      openLightbox(img.currentSrc || img.src, img.alt, caption);
    });
  })();

  /* Re-observe new cards for reveal animation if IO exists */
  if ("IntersectionObserver" in window) {
    const cards = section.querySelectorAll(".bike-card.reveal");
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
    cards.forEach((el) => io.observe(el));
  } else {
    section.querySelectorAll(".bike-card.reveal").forEach((el) => el.classList.add("is-in"));
  }
})();
