/**
 * Clean contact map (MapLibre + OpenFreeMap Positron).
 * Loads only on desktop when the map enters the viewport.
 */
(function () {
  const container = document.querySelector(".contact-map");
  const canvas = document.getElementById("contact-map-canvas");
  if (!container || !canvas) return;

  const LNG = 3.0999836;
  const LAT = 51.1799715;
  const STYLE = "https://tiles.openfreemap.org/styles/positron";
  const ML_VERSION = "4.7.1";
  const ML_CSS = "https://unpkg.com/maplibre-gl@" + ML_VERSION + "/dist/maplibre-gl.css";
  const ML_JS = "https://unpkg.com/maplibre-gl@" + ML_VERSION + "/dist/maplibre-gl.js";
  const LOGO = "/assets/images/logo/dcqbikeslogotransparent.webp";

  let map = null;
  let loading = false;
  let observed = false;

  function desktopMapVisible() {
    return window.matchMedia("(min-width: 901px)").matches;
  }

  function loadAssets(done) {
    if (window.maplibregl) {
      done();
      return;
    }

    if (!document.querySelector('link[data-dcq-maplibre]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = ML_CSS;
      link.setAttribute("data-dcq-maplibre", "1");
      document.head.appendChild(link);
    }

    const existing = document.querySelector("script[data-dcq-maplibre]");
    if (existing) {
      existing.addEventListener("load", done);
      return;
    }

    const script = document.createElement("script");
    script.src = ML_JS;
    script.defer = true;
    script.setAttribute("data-dcq-maplibre", "1");
    script.addEventListener("load", done);
    script.addEventListener("error", () => {
      loading = false;
    });
    document.head.appendChild(script);
  }

  function createMarkerElement() {
    const el = document.createElement("a");
    el.className = "contact-map-marker";
    el.href =
      "https://maps.google.com/?q=Gistelsteenweg+282,+8490+Jabbeke";
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.setAttribute("aria-label", "Open route naar DCQ Bikes in Google Maps");
    el.title = "Route plannen";

    const badge = document.createElement("span");
    badge.className = "contact-map-marker__badge";

    const img = document.createElement("img");
    img.src = LOGO;
    img.alt = "";
    img.width = 72;
    img.height = 29;
    img.decoding = "async";
    badge.appendChild(img);

    const tip = document.createElement("span");
    tip.className = "contact-map-marker__tip";
    tip.setAttribute("aria-hidden", "true");

    el.appendChild(badge);
    el.appendChild(tip);
    return el;
  }

  function initMap() {
    if (map || loading || !desktopMapVisible()) return;
    loading = true;

    loadAssets(() => {
      if (map || !window.maplibregl || !desktopMapVisible()) {
        loading = false;
        return;
      }

      map = new maplibregl.Map({
        container: canvas,
        style: STYLE,
        center: [LNG, LAT],
        zoom: 14.4,
        cooperativeGestures: true,
        attributionControl: {
          compact: true,
        },
      });

      map.addControl(
        new maplibregl.NavigationControl({
          showCompass: false,
          visualizePitch: false,
        }),
        "top-right"
      );

      new maplibregl.Marker({
        element: createMarkerElement(),
        anchor: "bottom",
      })
        .setLngLat([LNG, LAT])
        .addTo(map);

      map.on("load", () => {
        map.resize();
      });

      loading = false;
    });
  }

  function watch() {
    if (!desktopMapVisible()) return;
    if (observed) {
      initMap();
      return;
    }
    observed = true;

    if (!("IntersectionObserver" in window)) {
      initMap();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          initMap();
          io.disconnect();
        }
      },
      { rootMargin: "160px 0px" }
    );
    io.observe(container);
  }

  watch();

  const mq = window.matchMedia("(min-width: 901px)");
  const onMq = () => {
    if (mq.matches) {
      watch();
      if (map) {
        requestAnimationFrame(() => map.resize());
      }
    }
  };
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onMq);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(onMq);
  }

  window.addEventListener(
    "resize",
    () => {
      if (map) map.resize();
    },
    { passive: true }
  );
})();
