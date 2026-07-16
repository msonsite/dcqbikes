/**
 * Ons aanbod — lookbook, licht, afwisselend links/rechts
 * Mobiel: sticky stack; merkenlogo’s staan onder de titel voor leesbaarheid
 */
(function () {
    const HUB_ID = 'offerHub';

    function getItems() {
        if (typeof SERVICES_OFFER === 'undefined' || !Array.isArray(SERVICES_OFFER)) {
            return [];
        }
        return SERVICES_OFFER.filter(function (item) {
            return item && item.id && item.title && item.image && item.description;
        });
    }

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null && text !== '') node.textContent = text;
        return node;
    }

    function padIndex(n) {
        return String(n).padStart(2, '0');
    }

    function createBrandLinks(item) {
        const wrap = el('div', 'offer-entry__brands');
        wrap.appendChild(el('span', 'offer-entry__brandsLabel', item.brandsLabel || 'Merken'));

        const list = el('div', 'offer-entry__brandsList');
        (item.brands || []).forEach(function (brand) {
            if (!brand || !brand.logo) return;
            const link = document.createElement('a');
            link.className = 'offer-entry__brand';
            link.href = brand.url || '#';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', brand.name ? 'Bezoek ' + brand.name : 'Merkwebsite');

            const img = document.createElement('img');
            img.src = brand.logo;
            img.alt = brand.name || '';
            img.loading = 'lazy';
            img.decoding = 'async';
            link.appendChild(img);
            list.appendChild(link);
        });
        wrap.appendChild(list);
        return wrap;
    }

    function createEntry(item, index) {
        const align = index % 2 === 0 ? 'left' : 'right';
        const entry = el('article', 'offer-entry offer-entry--' + align);
        entry.id = 'offer-' + item.id;

        const inner = el('div', 'offer-entry__inner');

        const content = el('div', 'offer-entry__content');
        const head = el('div', 'offer-entry__head');
        head.appendChild(el('span', 'offer-entry__index', padIndex(index + 1)));
        head.appendChild(el('h3', 'offer-entry__title', item.title));
        content.appendChild(head);
        content.appendChild(el('p', 'offer-entry__text', item.description));
        if (item.brands && item.brands.length) {
            content.appendChild(createBrandLinks(item));
        }

        const visualWrap = el('div', 'offer-entry__visualWrap');
        visualWrap.appendChild(el('span', 'offer-entry__accent'));

        const visual = el('div', 'offer-entry__visual');
        const img = document.createElement('img');
        img.className = 'offer-entry__img';
        img.src = item.image;
        img.alt = item.title;
        img.loading = index === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
        visual.appendChild(img);
        visualWrap.appendChild(visual);

        inner.appendChild(content);
        inner.appendChild(visualWrap);
        entry.appendChild(inner);
        return entry;
    }

    function renderServicesOffer() {
        const mount = document.getElementById(HUB_ID);
        const items = getItems();
        if (!mount || !items.length) return;

        const book = el('div', 'offer-lookbook');
        items.forEach(function (item, index) {
            book.appendChild(createEntry(item, index));
        });

        mount.replaceChildren(book);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderServicesOffer);
    } else {
        renderServicesOffer();
    }
})();
