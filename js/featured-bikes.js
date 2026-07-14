/**
 * Uitgelichte fietsen — renderer
 * Rendert de sectie alleen wanneer FEATURED_BIKES geldige items bevat.
 */
(function () {
    const SECTION_ID = 'featured-bikes';
    const INSERT_AFTER_SELECTOR = '#services';
    const BRAND_LOGOS = {
        victoria: 'assets/images/brands/large/victoriablack.png',
        conway: 'assets/images/brands/large/conway.png',
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

            const brandMeta = el('meta');
            brandMeta.setAttribute('itemprop', 'brand');
            brandMeta.setAttribute('content', brand);
            brandWrap.appendChild(brandMeta);
            body.appendChild(brandWrap);
            return;
        }

        const brandMeta = el('p', 'featured-bike-card__brand featured-bike-card__brandText', brand);
        brandMeta.setAttribute('itemprop', 'brand');
        body.appendChild(brandMeta);
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
        return FEATURED_BIKES.filter(isValidBike).sort((a, b) => getPriceValue(a) - getPriceValue(b));
    }

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null && text !== '') node.textContent = text;
        return node;
    }

    function createBikeCard(bike) {
        const card = el('article', 'featured-bike-card');
        card.setAttribute('itemscope', '');
        card.setAttribute('itemtype', 'https://schema.org/Product');

        const media = el('div', 'featured-bike-card__media');
        const img = document.createElement('img');
        img.src = bike.image.trim();
        img.alt = `${bike.brand.trim()} ${bike.model.trim()}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.className = 'featured-bike-card__img';
        img.setAttribute('itemprop', 'image');
        media.appendChild(img);

        const body = el('div', 'featured-bike-card__body');

        appendBrand(body, bike.brand);

        const title = el('h3', 'featured-bike-card__model', bike.model.trim());
        title.setAttribute('itemprop', 'name');
        body.appendChild(title);

        if (bike.description && String(bike.description).trim()) {
            body.appendChild(el('p', 'featured-bike-card__desc', String(bike.description).trim()));
        }

        const priceWrap = el('div', 'featured-bike-card__priceRow');
        const price = el('p', 'featured-bike-card__price', formatPrice(bike));
        price.setAttribute('itemprop', 'offers');
        price.setAttribute('itemscope', '');
        price.setAttribute('itemtype', 'https://schema.org/Offer');
        const priceMeta = el('meta');
        priceMeta.setAttribute('itemprop', 'price');
        priceMeta.setAttribute('content', formatPrice(bike));
        price.appendChild(priceMeta);
        priceWrap.appendChild(price);
        body.appendChild(priceWrap);

        card.appendChild(media);
        card.appendChild(body);
        return card;
    }

    function buildSection(bikes) {
        const section = el('section', 'featured-bikes py-10 md:py-14');
        section.id = SECTION_ID;
        section.setAttribute('aria-labelledby', 'featured-bikes-heading');

        const container = el('div', 'container mx-auto max-w-7xl px-4 md:px-6');

        const header = el('div', 'featured-bikes__header text-center mb-8 md:mb-10');
        header.appendChild(el('p', 'featured-bikes__eyebrow text-sm font-semibold uppercase tracking-widest text-dcq-red', 'Uitgelichte fietsen'));
        const heading = el('h2', 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2', 'Uit ons aanbod');
        heading.id = 'featured-bikes-heading';
        header.appendChild(heading);
        container.appendChild(header);

        const scroller = el('div', 'featured-bikes__scroller');
        const grid = el('div', 'featured-bikes__grid');
        grid.setAttribute('data-bike-count', String(Math.min(bikes.length, 9)));
        bikes.forEach((bike) => grid.appendChild(createBikeCard(bike)));
        scroller.appendChild(grid);
        container.appendChild(scroller);

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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderFeaturedBikes);
    } else {
        renderFeaturedBikes();
    }
})();
