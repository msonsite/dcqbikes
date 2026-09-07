/**
 * Contact map (MapLibre + OpenFreeMap Positron).
 * Loads on desktop when the map container is ready/visible.
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
  let watching = false;

  function desktopMapVisible() {
    return window.matchMedia("(min-width: 901px)").matches;
  }

  function loadAssets(done) {
    if (window.maplibregl) {
      done(null);
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
      if (existing.dataset.loaded === "1") {
        done(window.maplibregl ? null : new Error("MapLibre ontbreekt"));
        return;
      }
      existing.addEventListener("load", () => done(null));
      existing.addEventListener("error", () => done(new Error("MapLibre laden mislukt")));
      return;
    }

    const script = document.createElement("script");
    script.src = ML_JS;
    script.async = true;
    script.setAttribute("data-dcq-maplibre", "1");
    script.addEventListener("load", () => {
      script.dataset.loaded = "1";
      done(null);
    });
    script.addEventListener("error", () => {
      loading = false;
      done(new Error("MapLibre laden mislukt"));
    });
    document.head.appendChild(script);
  }

  function createMarkerElement() {
    const el = document.createElement("a");
    el.className = "contact-map-marker";
    el.href = "https://maps.google.com/?q=Gistelsteenweg+282,+8490+Jabbeke";
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

  function scheduleResize() {
    if (!map) return;
    requestAnimationFrame(() => {
      map.resize();
      requestAnimationFrame(() => map && map.resize());
    });
  }

  function initMap() {
    if (map || loading || !desktopMapVisible()) return;
    loading = true;

    loadAssets((err) => {
      if (err || map || !window.maplibregl || !desktopMapVisible()) {
        loading = false;
        return;
      }

      try {
        map = new maplibregl.Map({
          container: canvas,
          style: STYLE,
          center: [LNG, LAT],
          zoom: 14.4,
          cooperativeGestures: true,
          attributionControl: { compact: true },
        });
      } catch (e) {
        loading = false;
        return;
      }

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

      map.on("load", scheduleResize);
      map.on("idle", scheduleResize);

      if (typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(() => scheduleResize());
        ro.observe(container);
      }

      loading = false;
      scheduleResize();
    });
  }

  function watch() {
    if (!desktopMapVisible()) return;

    // Already visible (or about to be): start immediately as fallback
    const rect = container.getBoundingClientRect();
    const inView =
      rect.height > 0 &&
      rect.bottom > 0 &&
      rect.top < (window.innerHeight || document.documentElement.clientHeight) + 200;

    if (inView) initMap();

    if (watching) return;
    watching = true;

    if (!("IntersectionObserver" in window)) {
      initMap();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0)) {
          initMap();
          io.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: [0, 0.01] }
    );
    io.observe(container);
  }

  // Wait a tick so desktop display:block layout is applied
  requestAnimationFrame(() => {
    watch();
    setTimeout(watch, 250);
  });

  const mq = window.matchMedia("(min-width: 901px)");
  const onMq = () => {
    if (mq.matches) {
      watching = false;
      watch();
      scheduleResize();
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
      scheduleResize();
    },
    { passive: true }
  );
})();
