/**
 * Rendert uitgelichte fietsen vanuit data/featured-bikes.js
 * Pas FEATURED_BIKES aan — deze file hoef je normaal niet te wijzigen.
 */
(function () {
  const section = document.getElementById("uitgelicht");
  const grid = document.getElementById("featured-grid");
  if (!section || !grid) return;

  const bikes = typeof FEATURED_BIKES !== "undefined" && Array.isArray(FEATURED_BIKES)
    ? FEATURED_BIKES
    : [];

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
    Qio: null,
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
    article.className = "bike-card reveal";
    article.innerHTML =
      '<div class="bike-card__media">' +
      '<img src="' +
      escapeHtml(src) +
      '" alt="' +
      escapeHtml(title || "Uitgelichte fiets") +
      '" loading="lazy" width="640" height="400" />' +
      "</div>" +
      '<div class="bike-card__body">' +
      brandHtml +
      (model ? "<h4>" + escapeHtml(model) + "</h4>" : "") +
      (priceLabel
        ? '<p class="bike-card__price">' + escapeHtml(priceLabel) + "</p>"
        : "") +
      "</div>";

    fragment.appendChild(article);
  });

  grid.replaceChildren(fragment);

  /* Re-observe new cards for reveal animation if IO exists */
  if ("IntersectionObserver" in window) {
    const cards = grid.querySelectorAll(".reveal");
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
    grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }
})();
