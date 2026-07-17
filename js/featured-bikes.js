/**
 * Uitgelichte fietsen — renderer
 * Toont een greep uit het aanbod; sectie verdwijnt als FEATURED_BIKES leeg is.
 */
(function () {
    const SECTION_ID = 'featured-bikes';
    const INSERT_AFTER_SELECTOR = '#services';
    const BRAND_LOGOS = {
        victoria: 'assets/images/brands/large/victoriablack.png',
        conway: 'assets/images/brands/large/Conway_Wortmarke.png',
        oxford: 'assets/images/brands/large/oxfordlogo.webp',
        qio: 'assets/images/brands/large/qio.png',
        norta: 'assets/images/brands/large/norta.png',
        ego: 'assets/images/brands/large/ego-logo.png'
    };

    function getBrandLogo(brand) {
        if (!brand || typeof brand !== 'string') return null;
        return BRAND_LOGOS[brand.trim().toLowerCase()] || null;
    }

    function appendBrand(body, brandName) {
        const brand = brandName.trim();
        const logoSrc = getBrandLogo(brand);

        if (logoSrc) {
            const brandWrap = el('div', 'featured-bike-card__brand');
            const logo = document.createElement('img');
            logo.src = logoSrc;
            logo.alt = brand;
            logo.className = 'featured-bike-card__brandLogo';
            logo.loading = 'lazy';
            logo.decoding = 'async';
            brandWrap.appendChild(logo);
            body.appendChild(brandWrap);
            return;
        }

        body.appendChild(el('p', 'featured-bike-card__brand featured-bike-card__brandText', brand));
    }

    function formatPrice(bike) {
        if (bike.priceLabel && String(bike.priceLabel).trim()) {
            return String(bike.priceLabel).trim();
        }
        if (typeof bike.price === 'number' && Number.isFinite(bike.price)) {
            return new Intl.NumberFormat('nl-BE', {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0
            }).format(bike.price);
        }
        return null;
    }

    function getPriceValue(bike) {
        if (typeof bike.price === 'number' && Number.isFinite(bike.price)) {
            return bike.price;
        }
        if (bike.priceLabel && String(bike.priceLabel).trim()) {
            const parsed = Number(String(bike.priceLabel).replace(/[^\d]/g, ''));
            return Number.isFinite(parsed) ? parsed : Infinity;
        }
        return Infinity;
    }

    function isValidBike(bike) {
        if (!bike || typeof bike !== 'object') return false;
        const hasImage = typeof bike.image === 'string' && bike.image.trim();
        const hasBrand = typeof bike.brand === 'string' && bike.brand.trim();
        const hasModel = typeof bike.model === 'string' && bike.model.trim();
        const hasPrice = formatPrice(bike) !== null;
        return Boolean(hasImage && hasBrand && hasModel && hasPrice);
    }

    function getBikes() {
        if (typeof FEATURED_BIKES === 'undefined' || !Array.isArray(FEATURED_BIKES)) {
            return [];
        }
        return FEATURED_BIKES.filter(isValidBike).sort(function (a, b) {
            return getPriceValue(a) - getPriceValue(b);
        });
    }

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null && text !== '') node.textContent = text;
        return node;
    }

    function createBikeCard(bike) {
        // Geen Product/Offer-schema: dit is een fysieke winkel zonder webshop.
        // Merchant-listing markup triggert Google-eisen (shipping, retourbeleid, …)
        // die hier niet van toepassing zijn.
        const card = el('article', 'featured-bike-card');

        const media = el('div', 'featured-bike-card__media');
        const img = document.createElement('img');
        img.src = bike.image.trim();
        img.alt = `${bike.brand.trim()} ${bike.model.trim()}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.className = 'featured-bike-card__img';
        media.appendChild(img);

        const body = el('div', 'featured-bike-card__body');

        appendBrand(body, bike.brand);

        body.appendChild(el('h3', 'featured-bike-card__model', bike.model.trim()));

        if (bike.description && String(bike.description).trim()) {
            body.appendChild(el('p', 'featured-bike-card__desc', String(bike.description).trim()));
        }

        const priceWrap = el('div', 'featured-bike-card__priceRow');
        priceWrap.appendChild(el('p', 'featured-bike-card__price', formatPrice(bike)));
        body.appendChild(priceWrap);

        card.appendChild(media);
        card.appendChild(body);
        return card;
    }

    function createSnapSpacer() {
        const spacer = el('div', 'featured-bikes__snap-spacer');
        spacer.setAttribute('aria-hidden', 'true');
        return spacer;
    }

    function getVisuallyCenteredIndex(scroller, cards) {
        const scrollerRect = scroller.getBoundingClientRect();
        const midX = scrollerRect.left + scroller.clientWidth / 2;
        let bestIndex = 0;
        let bestDistance = Infinity;

        for (let i = 0; i < cards.length; i += 1) {
            const rect = cards[i].getBoundingClientRect();
            if (rect.width < 8) continue;
            const distance = Math.abs(rect.left + rect.width / 2 - midX);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestIndex = i;
            }
        }

        return bestIndex;
    }

    function setupMobileScrollDots(section, scroller, cards) {
        const dotsWrap = section.querySelector('.featured-bikes__dots');
        if (!dotsWrap || cards.length < 2) {
            if (dotsWrap) dotsWrap.hidden = true;
            return;
        }

        const mobileQuery = window.matchMedia('(max-width: 1023px)');
        dotsWrap.hidden = !mobileQuery.matches;
        dotsWrap.replaceChildren();

        let activeIndex = 0;
        let syncRaf = null;

        function setActive(nextIndex) {
            if (nextIndex < 0 || nextIndex >= dots.length || nextIndex === activeIndex) return;
            dots[activeIndex].classList.remove('is-active');
            dots[nextIndex].classList.add('is-active');
            activeIndex = nextIndex;
        }

        function forceActive(nextIndex) {
            if (nextIndex < 0 || nextIndex >= dots.length) return;
            dots.forEach(function (dot, index) {
                dot.classList.toggle('is-active', index === nextIndex);
            });
            activeIndex = nextIndex;
        }

        const dots = cards.map(function (_card, index) {
            const dot = document.createElement('span');
            dot.className = 'featured-bikes__dot' + (index === 0 ? ' is-active' : '');
            dot.setAttribute('aria-hidden', 'true');
            dotsWrap.appendChild(dot);
            return dot;
        });

        function syncActiveDot() {
            if (!mobileQuery.matches) return;
            setActive(getVisuallyCenteredIndex(scroller, cards));
        }

        function scheduleSync() {
            if (syncRaf != null) return;
            syncRaf = window.requestAnimationFrame(function () {
                syncRaf = null;
                syncActiveDot();
            });
        }

        function pinToFirstCard() {
            if (!mobileQuery.matches || !cards[0]) return;
            // scrollLeft 0 + gelijke spacers = eerste kaart gecentreerd (geen scrollIntoView)
            scroller.scrollTo({ left: 0, behavior: 'auto' });
            scroller.scrollLeft = 0;
            forceActive(0);
        }

        scroller.addEventListener('scroll', scheduleSync, { passive: true });
        scroller.addEventListener('scrollend', syncActiveDot);
        window.addEventListener('resize', function () {
            dotsWrap.hidden = !mobileQuery.matches;
            if (mobileQuery.matches) scheduleSync();
        }, { passive: true });
        window.addEventListener('pageshow', pinToFirstCard);
        window.addEventListener('orientationchange', function () {
            window.setTimeout(pinToFirstCard, 50);
        });

        if (typeof mobileQuery.addEventListener === 'function') {
            mobileQuery.addEventListener('change', function (event) {
                dotsWrap.hidden = !event.matches;
                if (event.matches) pinToFirstCard();
            });
        }

        // iOS kan na layout/snap nog opschuiven — opnieuw vastzetten
        pinToFirstCard();
        window.requestAnimationFrame(function () {
            pinToFirstCard();
            window.requestAnimationFrame(pinToFirstCard);
        });
        window.setTimeout(pinToFirstCard, 100);
        window.setTimeout(syncActiveDot, 250);
    }

    function createSectionBridge() {
        const wrap = el('div', 'featured-bikes__bridge');
        wrap.setAttribute('aria-hidden', 'true');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 160 36');
        svg.setAttribute('focusable', 'false');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M8 28 C40 28 52 8 80 10 C108 12 120 28 152 8');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-dasharray', '2.5 5');
        svg.appendChild(path);
        wrap.appendChild(svg);
        return wrap;
    }

    function buildSection(bikes) {
        const section = el('section', 'featured-bikes py-10 md:py-14');
        section.id = SECTION_ID;
        section.setAttribute('aria-labelledby', 'featured-bikes-heading');

        section.appendChild(createSectionBridge());

        const container = el('div', 'container mx-auto max-w-7xl px-4 md:px-6');

        const header = el('div', 'featured-bikes__header text-center mb-8 md:mb-10');
        header.appendChild(el(
            'p',
            'featured-bikes__eyebrow text-sm font-semibold uppercase tracking-widest text-dcq-red',
            'Uitgelichte fietsen'
        ));

        const heading = el('h2', 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-heading', 'Een greep uit ons aanbod');
        heading.id = 'featured-bikes-heading';
        header.appendChild(heading);

        header.appendChild(el(
            'p',
            'featured-bikes__lead text-base md:text-lg',
            'Dit zijn enkele voorbeelden in verschillende prijsklassen. In de winkel vind je tientallen modellen: Victoria, Conway, Norta, QiO en meer.'
        ));
        container.appendChild(header);

        const scroller = el('div', 'featured-bikes__scroller');
        const grid = el('div', 'featured-bikes__grid');
        grid.setAttribute('data-bike-count', String(Math.min(bikes.length, 9)));
        grid.appendChild(createSnapSpacer());
        bikes.forEach(function (bike) {
            grid.appendChild(createBikeCard(bike));
        });
        grid.appendChild(createSnapSpacer());
        scroller.appendChild(grid);
        container.appendChild(scroller);

        const dots = el('div', 'featured-bikes__dots');
        dots.setAttribute('aria-hidden', 'true');
        container.appendChild(dots);

        const footer = el('div', 'featured-bikes__footer');
        footer.appendChild(el(
            'p',
            'featured-bikes__footerText',
            'Op zoek naar iets anders? Kom langs, we tonen je graag het volledige gamma en helpen je de juiste fiets kiezen.'
        ));
        const cta = el('a', 'featured-bikes__cta', 'Contact & openingsuren');
        cta.href = '#contact';
        footer.appendChild(cta);
        container.appendChild(footer);

        section.appendChild(container);
        return section;
    }

    function renderFeaturedBikes() {
        const bikes = getBikes();
        if (bikes.length === 0) return;

        if (document.getElementById(SECTION_ID)) return;

        const anchor = document.querySelector(INSERT_AFTER_SELECTOR);
        if (!anchor || !anchor.parentNode) return;

        const section = buildSection(bikes);
        anchor.insertAdjacentElement('afterend', section);

        const scroller = section.querySelector('.featured-bikes__scroller');
        const cards = scroller ? Array.prototype.slice.call(scroller.querySelectorAll('.featured-bike-card')) : [];
        if (scroller) {
            setupMobileScrollDots(section, scroller, cards);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderFeaturedBikes);
    } else {
        renderFeaturedBikes();
    }
})();
