// Set current year dynamically
(function() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
})();

// Cookie Banner Functionality
(function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    // Show banner if no consent is stored
    if (!cookieConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 500);
    }
    
    // Accept cookies
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
        loadNonEssentialScripts();
    });
    
    // Decline cookies
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
    });
    
    // Load non-essential scripts after consent
    function loadNonEssentialScripts() {
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            console.log('Loading non-essential scripts...');
            // Here you would load analytics, marketing scripts, etc.
            // Example: loadGoogleAnalytics();
        }
    }
    
    // Load scripts if consent was already given
    if (cookieConsent === 'accepted') {
        loadNonEssentialScripts();
    }
})();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Anker-navigatie: altijd directe scroll (geen smooth) — stabiel op mobiel en desktop
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        
        if (href === '#home') {
            /* Bovenaan document = openingsuren-balk (#headerRibbon) + nav + hero zichtbaar */
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            const mainNav = document.getElementById('mainNav');
            if (!mainNav) return;
            
            const navHeight = mainNav.offsetHeight;
            const rect = target.getBoundingClientRect();
            const y = rect.top + (window.scrollY || document.documentElement.scrollTop);
            
            let scrollOffset = navHeight;
            const scrollMtClass = Array.from(target.classList).find(cls => cls.startsWith('scroll-mt-'));
            if (scrollMtClass) {
                const mtValue = parseInt(scrollMtClass.replace('scroll-mt-', ''), 10);
                if (!isNaN(mtValue)) {
                    scrollOffset = navHeight + (mtValue * 4);
                }
            }
            
            window.scrollTo({
                top: Math.max(0, y - scrollOffset),
                behavior: 'auto'
            });
        }
    });
});

// Hero Video Setup
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    // Video source is set in HTML, ensure it plays properly
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });
    });
    
    // Fallback if video fails to load
    heroVideo.addEventListener('error', () => {
        console.log('Video failed to load, using fallback');
            heroVideo.style.display = 'none';
            const heroSection = heroVideo.closest('section');
            if (heroSection && !heroSection.querySelector('.hero-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'hero-fallback absolute inset-0 bg-gradient-to-br from-dcq-black to-gray-800';
                heroSection.appendChild(fallback);
            }
    });
    
    // Ensure video plays on mobile
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
}

// Dynamic Brand Image Loading
async function loadBrandImages() {
    // Define the actual brand images that are available
    const brandImages = {
        'large': [
            { src: 'assets/images/brands/large/conway.png', name: 'Conway', alt: 'Conway Logo', url: 'https://www.conway-bikes.com/nl/' },
            { src: 'assets/images/brands/large/ego-logo.png', name: 'EGO', alt: 'EGO Logo', url: 'https://egopowerplus.be/' },
            { src: 'assets/images/brands/large/norta.png', name: 'Norta', alt: 'Norta Logo', url: 'https://norta.be/nl/home' },
            { src: 'assets/images/brands/large/oxfordlogo.webp', name: 'Oxford', alt: 'Oxford Logo', url: 'https://www.oxfordbikes.be/' },
            { src: 'assets/images/brands/large/qio.png', name: 'Qio', alt: 'Qio Logo', url: 'https://www.qio-bikes.com/nl/' },
            { src: 'assets/images/brands/large/victoria-groot.png', name: 'Victoria', alt: 'Victoria Logo', url: 'https://www.victoria-bikes.com/nl/' }
        ],
        'medium': [
            { src: 'assets/images/brands/medium/abus.webp', name: 'Abus', alt: 'Abus Logo', url: 'https://www.abus.com/be_nl/' },
            { src: 'assets/images/brands/medium/axa.avif', name: 'Axa', alt: 'Axa Logo', url: 'https://axabikesecurity.com/nl/' },
            { src: 'assets/images/brands/medium/basil.webp', name: 'Basil', alt: 'Basil Logo', url: 'https://www.basil.com/nl/' },
            { src: 'assets/images/brands/medium/bollé.png', name: 'Bollé', alt: 'Bollé Logo', url: 'https://www.bolle.com/' },
            { src: 'assets/images/brands/medium/contec.webp', name: 'Contec', alt: 'Contec Logo', url: 'https://www.contec-parts.com/nl/' },
            { src: 'assets/images/brands/medium/dandell.png', name: 'Dandell', alt: 'Dandell Logo', url: 'https://www.dandell.be/' },
            { src: 'assets/images/brands/medium/polisport.png', name: 'Polisport', alt: 'Polisport Logo', url: 'https://www.polisport.com/en/' },
            { src: 'assets/images/brands/medium/selleroyal.png', name: 'Selle Royal', alt: 'Selle Royal Logo', url: 'https://www.selleroyal.com/nl_nl/' },
            { src: 'assets/images/brands/medium/sks.png', name: 'SKS', alt: 'SKS Logo', url: 'https://www.sks-germany.com/nl/' }
        ],
        'small': [
            { src: 'assets/images/brands/small/bosch.png', name: 'Bosch', alt: 'Bosch Logo', url: 'https://www.bosch-ebike.com/be/' },
            { src: 'assets/images/brands/small/continental.png', name: 'Continental', alt: 'Continental Logo', url: 'https://www.continental-tires.com/products/b2c/bicycle/' },
            { src: 'assets/images/brands/small/cst.png', name: 'CST', alt: 'CST Logo', url: 'https://www.csttires.com/int/' },
            { src: 'assets/images/brands/small/descheemaeker.png', name: 'Descheemaeker', alt: 'Descheemaeker Logo', url: 'https://www.descheemaeker.be/nl' },
            { src: 'assets/images/brands/small/kmc.png', name: 'KMC', alt: 'KMC Logo', url: 'https://www.kmcchain.eu/' },
            { src: 'assets/images/brands/small/magura.svg', name: 'Magura', alt: 'Magura Logo', url: 'https://www.magura.com/' },
            { src: 'assets/images/brands/small/michelin.png', name: 'Michelin', alt: 'Michelin Logo', url: 'https://www.michelin.nl/bicycle/fietsbanden' },
            { src: 'assets/images/brands/small/morganblue.png', name: 'Morgan Blue', alt: 'Morgan Blue Logo', url: 'https://www.morganblue.net/' },
            { src: 'assets/images/brands/small/sapim.png', name: 'Sapim', alt: 'Sapim Logo', url: 'https://www.sapim.be/' },
            { src: 'assets/images/brands/small/schwalbe.webp', name: 'Schwalbe', alt: 'Schwalbe Logo', url: 'https://www.schwalbe.com/nl/' },
            { src: 'assets/images/brands/small/shimano.png', name: 'Shimano', alt: 'Shimano Logo', url: 'https://bike.shimano.com/nl-NL/home.html' }
        ]
    };
    
    const mobileMarquee = document.getElementById('brandsMarqueeTrack');
    const mobileLogos = [];
    for (const [size, images] of Object.entries(brandImages)) {
        const container = document.getElementById(`brands-${size}`);
        if ((!container && !mobileMarquee) || images.length === 0) continue;
        
        images.forEach((brand, index) => {
            // Create anchor tag for clickable brand logo
            const brandLink = document.createElement('a');
            brandLink.href = brand.url || '#';
            brandLink.target = '_blank';
            brandLink.rel = 'noopener noreferrer';
            brandLink.className = 'brand-item';
            brandLink.setAttribute('data-brand-name', brand.name);
            brandLink.setAttribute('data-brand-image', brand.src);
            brandLink.setAttribute('aria-label', `Visit ${brand.name} website`);
            
            // Create brand image wrapper div
            const brandWrapper = document.createElement('div');
            brandWrapper.className = 'brand-item-inner';
            
            // Create image element
            const img = document.createElement('img');
            img.src = brand.src;
            img.alt = brand.alt;
            // Use eager loading for mobile marquee, lazy for desktop
            img.loading = mobileMarquee ? 'eager' : 'lazy';
            
            brandWrapper.appendChild(img);
            brandLink.appendChild(brandWrapper);
            
            // Handle image load error
            img.addEventListener('error', () => {
                console.warn(`Failed to load brand image: ${brand.src}`);
                brandLink.style.display = 'none';
            });
            
            // Add staggered animation delay
            brandLink.style.animationDelay = `${index * 0.1}s`;
            brandLink.style.opacity = '0';
            brandLink.style.animation = 'fadeInUp 0.6s ease forwards';
            // Set CSS variable for pulse animation delay
            brandLink.style.setProperty('--index', index);
            
            if (container) container.appendChild(brandLink);
            if (mobileMarquee) {
                const clone = brandLink.cloneNode(true);
                // Remove stagger animation styles from desktop marquee clone
                clone.style.animation = 'none';
                clone.style.opacity = '1';
                clone.style.transform = 'none';
                const imgEl = clone.querySelector('img');
                if (imgEl) {
                    // Force eager loading for mobile carousel to prevent white boxes
                    // Using eager + high priority without preload links to avoid competing with hero video
                    imgEl.loading = 'eager';
                    imgEl.fetchPriority = 'high';
                }
                mobileLogos.push(clone);
            }
        });
    }

    // Build mobile carousel: single sequence (no duplicates needed with transform-based approach)
    if (mobileMarquee && mobileLogos.length) {
        mobileLogos.forEach(node => {
            node.style.animation = 'none';
            node.style.opacity = '1';
            node.style.transform = 'none';
            mobileMarquee.appendChild(node);
        });
    }
}

// Initialize mobile brands scroll with native scrolling
let mobileCarouselInitialized = false;
let mobileCarouselCleanup = null;

function initMobileBrandsCarousel() {
    const brandsMobile = document.getElementById('brands-mobile');
    const brandsTrack = document.getElementById('brandsMarqueeTrack');
    const progressBar = document.getElementById('brandCarouselProgressBar');
    
    if (!brandsMobile || !brandsTrack || window.innerWidth >= 768) {
        // Cleanup if switching to desktop
        if (mobileCarouselCleanup) {
            mobileCarouselCleanup();
            mobileCarouselCleanup = null;
            mobileCarouselInitialized = false;
        }
        return;
    }
    
    // Cleanup previous initialization if exists
    if (mobileCarouselCleanup) {
        mobileCarouselCleanup();
        mobileCarouselCleanup = null;
    }
    
    const brandItems = brandsTrack.querySelectorAll('.brand-item');
    if (brandItems.length === 0) return;
    
    // Calculate dimensions for progress bar
    const itemWidth = 140; // from CSS
    const itemGap = 24; // 1.5rem = 24px
    const itemTotalWidth = itemWidth + itemGap;
    
    // Update progress bar based on scroll position
    let rafId = null;
    function updateProgress() {
        if (!progressBar || !brandsMobile) return;
        
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
            const scrollLeft = brandsMobile.scrollLeft;
            const scrollWidth = brandsMobile.scrollWidth - brandsMobile.clientWidth;
            const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        });
    }
    
    // Scroll event handler
    const scrollHandler = () => {
        updateProgress();
    };
    
    brandsMobile.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initialize progress bar
    updateProgress();
    
    // Cleanup function
    mobileCarouselCleanup = () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        if (brandsMobile) {
            brandsMobile.removeEventListener('scroll', scrollHandler);
        }
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    };
    
    mobileCarouselInitialized = true;
}

// Brand Modal Functionality
const brandModal = document.getElementById('brandModal');
const brandModalTitle = document.getElementById('brandModalTitle');
const brandModalContent = document.getElementById('brandModalContent');
const closeBrandModal = document.getElementById('closeBrandModal');

function openBrandModal(brandName, brandImage, brandInfo) {
    if (!brandModal) return;
    
    brandModalTitle.textContent = brandName || 'Merk Informatie';
    brandModalContent.innerHTML = `
        <div class="mb-6">
            <img src="${brandImage}" alt="${brandName}" class="w-full h-64 object-contain bg-gray-100 rounded-lg">
        </div>
        <div class="prose max-w-none">
            <p class="text-gray-600 mb-4">
                ${brandInfo || 'Meer informatie over dit merk komt binnenkort beschikbaar.'}
            </p>
            <button class="px-6 py-2 bg-dcq-red text-white rounded-lg hover:bg-opacity-90 transition-colors">
                Meer Informatie
            </button>
        </div>
    `;
    
    brandModal.classList.add('show');
    brandModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeBrandModalFunc() {
    if (!brandModal) return;
    brandModal.classList.remove('show');
    brandModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (closeBrandModal) {
    closeBrandModal.addEventListener('click', closeBrandModalFunc);
}

if (brandModal) {
    brandModal.addEventListener('click', (e) => {
        if (e.target === brandModal) {
            closeBrandModalFunc();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && brandModal.classList.contains('show')) {
            closeBrandModalFunc();
        }
    });
}

// Gallery Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxVideo = document.getElementById('lightboxVideo');
const closeLightbox = document.getElementById('closeLightbox');
const prevLightbox = document.getElementById('prevLightbox');
const nextLightbox = document.getElementById('nextLightbox');

let galleryItems = [];
let currentLightboxIndex = 0;

// Helper function to check if an image exists
async function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// Dynamically discover images in the gallerysection folder
async function discoverGalleryImages() {
    const basePath = 'assets/images/gallery/';
    const extensions = ['webp', 'jpg', 'jpeg', 'png', 'avif', 'gif'];
    const maxAttempts = 100; // Check up to 100 images
    const discoveredImages = [];
    
    // Try to load a gallery manifest file first (optional)
    try {
        const manifestResponse = await fetch('assets/images/gallery/manifest.json');
        if (manifestResponse.ok) {
            const manifest = await manifestResponse.json();
            if (manifest.images && Array.isArray(manifest.images)) {
                return manifest.images.map((img, idx) => ({
                    src: basePath + img,
                    alt: `DCQ Bikes Gallery Image ${idx + 1}`,
                    filename: img
                }));
            }
        }
    } catch (e) {
        // No manifest file, continue with auto-discovery
    }
    
    // Auto-discover images by trying different patterns
    // Pattern 1: picture1.webp, picture2.jpg, etc.
    for (let i = 1; i <= maxAttempts; i++) {
        let found = false;
        for (const ext of extensions) {
            const testPath = `${basePath}picture${i}.${ext}`;
            const exists = await imageExists(testPath);
            if (exists) {
                discoveredImages.push({
                    src: testPath,
                    alt: `DCQ Bikes Gallery Image ${discoveredImages.length + 1}`,
                    filename: `picture${i}.${ext}`
                });
                found = true;
                break;
            }
        }
        // If no image found after trying multiple patterns, stop
        if (!found && i > 20) {
            break;
        }
    }
    
    // Pattern 2: Try numbered files (1.jpg, 2.webp, etc.)
    if (discoveredImages.length === 0) {
        for (let i = 1; i <= maxAttempts; i++) {
            let found = false;
            for (const ext of extensions) {
                const testPath = `${basePath}${i}.${ext}`;
                const exists = await imageExists(testPath);
                if (exists) {
                    discoveredImages.push({
                        src: testPath,
                        alt: `DCQ Bikes Gallery Image ${discoveredImages.length + 1}`,
                        filename: `${i}.${ext}`
                    });
                    found = true;
                    break;
                }
            }
            if (!found && i > 20) {
                break;
            }
        }
    }
    
    return discoveredImages;
}

async function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // Dynamically discover images from gallerysection folder
    const galleryImages = await discoverGalleryImages();
    
    if (galleryImages.length === 0) {
        console.warn('No gallery images found. Please add images to the gallerysection folder.');
        return;
    }
    
    // Tile size patterns for varied, interesting layout
    // Patterns: normal, wide, tall, large
    const tilePatterns = ['normal', 'wide', 'tall', 'normal', 'large', 'normal', 'wide', 'tall'];
    
    galleryItems = [];
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const item = {
            src: image.src,
            alt: image.alt,
            type: 'image',
            index: index
        };
        
        galleryItems.push(item);
        
        const galleryItem = document.createElement('div');
        const pattern = tilePatterns[index % tilePatterns.length];
        
        // Special handling for picture9 (last item) - make it fill gaps better
        const isLastItem = index === galleryImages.length - 1;
        let finalPattern = pattern;
        if (isLastItem && galleryImages.length > 8) {
            // Use a pattern that fills gaps - try 'tall' or 'wide' to fill vertical/horizontal gaps
            finalPattern = 'tall';
        }
        
        galleryItem.className = `gallery-item ${finalPattern}`;
        galleryItem.setAttribute('role', 'button');
        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('aria-label', `Bekijk afbeelding ${index + 1}`);
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        
        // Handle image load errors
        img.onerror = function() {
            this.style.display = 'none';
            galleryItem.style.backgroundColor = '#f3f4f6';
            const errorDiv = document.createElement('div');
            errorDiv.className = 'absolute inset-0 flex items-center justify-center text-gray-400';
            errorDiv.innerHTML = '<i class="fas fa-image text-4xl"></i>';
            galleryItem.appendChild(errorDiv);
        };
        
        galleryItem.appendChild(img);
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

function openLightbox(index) {
    if (!lightbox || galleryItems.length === 0) return;
    
    currentLightboxIndex = index;
    const item = galleryItems[index];
    
    if (item.type === 'image') {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt || 'Galerij afbeelding';
        lightboxImage.classList.remove('hidden');
        lightboxVideo.classList.add('hidden');
    } else if (item.type === 'video') {
        lightboxVideo.src = item.src;
        lightboxVideo.classList.remove('hidden');
        lightboxImage.classList.add('hidden');
    }
    
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightboxFunc() {
    if (!lightbox) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxVideo) {
        lightboxVideo.pause();
    }
}

function showPrevLightbox() {
    if (galleryItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentLightboxIndex);
}

function showNextLightbox() {
    if (galleryItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    openLightbox(currentLightboxIndex);
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFunc);
}

if (prevLightbox) {
    prevLightbox.addEventListener('click', showPrevLightbox);
}

if (nextLightbox) {
    nextLightbox.addEventListener('click', showNextLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            closeLightboxFunc();
        } else if (e.key === 'ArrowLeft') {
            showPrevLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextLightbox();
        }
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('contactSubmit');
        const statusEl = document.getElementById('contactStatus');
        const action = contactForm.getAttribute('data-formspree');

        if (!action || !action.startsWith('https://formspree.io/')) {
            // Fallback: demo mode
        const formData = new FormData(contactForm);
            console.log('Form submitted (demo):', Object.fromEntries(formData.entries()));
            contactForm.reset();
            if (statusEl) {
                statusEl.textContent = 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.';
                statusEl.classList.remove('hidden', 'text-red-600');
            }
            return;
        }

        // Disable + loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Verzenden...';
            submitBtn.classList.add('opacity-80');
        }
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.classList.add('hidden');
        }

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Success: set green button and message
                if (submitBtn) {
                    submitBtn.textContent = 'Verzonden';
                    submitBtn.classList.remove('bg-dcq-red', 'hover:bg-opacity-90', 'hover:scale-105', 'opacity-80');
                    submitBtn.classList.add('bg-green-600');
                }
                if (statusEl) {
                    statusEl.textContent = 'Bedankt! Uw bericht werd succesvol verzonden.';
                    statusEl.classList.remove('hidden', 'text-red-600');
                }
        contactForm.reset();
            } else {
                throw new Error('Formspree error');
            }
        } catch (err) {
            if (submitBtn) {
                submitBtn.textContent = 'Probeer opnieuw';
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-80');
                submitBtn.classList.add('bg-dcq-red');
            }
            if (statusEl) {
                statusEl.textContent = 'Er ging iets mis. Gelieve later opnieuw te proberen.';
                statusEl.classList.remove('hidden');
                statusEl.classList.add('text-red-600');
            }
        }
    });
}

// Navbar: schaduw bij scroll — passive + één rAF om main-thread te sparen
const mainNav = document.getElementById('mainNav');
if (mainNav) {
    let navScrollRaf = null;
    window.addEventListener('scroll', () => {
        if (navScrollRaf != null) return;
        navScrollRaf = requestAnimationFrame(() => {
            navScrollRaf = null;
            const y = window.scrollY || document.documentElement.scrollTop;
            if (y > 100) {
                mainNav.classList.add('shadow-lg');
            } else {
                mainNav.classList.remove('shadow-lg');
            }
        });
    }, { passive: true });
}

// Store Status Checker
// Configuration is in store-config.js - modify that file to change holidays/vacations

// Helper function to check if current date is within any vacation period
function isOnVacation(currentDate) {
    if (typeof VACATION_PERIODS === 'undefined') return { isOnVacation: false };
    
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const currentDateOnly = new Date(currentYear, currentMonth, currentDay);
    
    for (const period of VACATION_PERIODS) {
        // Convert 1-indexed month (1-12) to 0-indexed (0-11) for JavaScript Date
        const startDate = new Date(period.start[0], period.start[1] - 1, period.start[2]);
        const endDate = new Date(period.end[0], period.end[1] - 1, period.end[2]);
        
        // Set time to beginning of day for accurate comparison
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        currentDateOnly.setHours(0, 0, 0, 0);
        
        if (currentDateOnly >= startDate && currentDateOnly <= endDate) {
            return {
                isOnVacation: true,
                startDate: startDate,
                endDate: endDate
            };
        }
    }
    
    return { isOnVacation: false };
}

// Belgian public holidays loaded from CSV
let BELGIAN_HOLIDAYS = [];

// Load public holidays from CSV file
async function loadHolidaysFromCSV() {
    try {
        const response = await fetch('../data/belgium_public_holidays_2026_2040.csv');
        if (!response.ok) {
            console.warn('Could not load holidays CSV file');
            return;
        }
        
        const csvText = await response.text();
        const lines = csvText.split('\n');
        
        // Skip header line (line 0) and process data
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Parse CSV line (format: Date,Holiday)
            const commaIndex = line.indexOf(',');
            if (commaIndex === -1) continue;
            
            const dateStr = line.substring(0, commaIndex).trim();
            
            // Date format: YYYY-MM-DD
            if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
                BELGIAN_HOLIDAYS.push(dateStr);
            }
        }
        
        console.log(`Loaded ${BELGIAN_HOLIDAYS.length} public holidays from CSV`);
    } catch (error) {
        console.error('Error loading holidays CSV:', error);
    }
}

// Helper to find today's entry in HOLIDAY_DATES (supports multiple formats)
function getHolidayDateEntry(currentDate) {
    if (typeof HOLIDAY_DATES === 'undefined') return null;
    
    const targetYear = currentDate.getFullYear();
    const targetMonth = currentDate.getMonth() + 1; // 1-indexed
    const targetDay = currentDate.getDate();
    
    const normalize = (value) => (typeof value === 'string' ? parseInt(value, 10) : value);
    
    for (const holiday of HOLIDAY_DATES) {
        let year, month, day, message = '';
        
        if (Array.isArray(holiday)) {
            [year, month, day] = holiday;
        } else if (holiday && typeof holiday === 'object') {
            if (Array.isArray(holiday.date)) {
                [year, month, day] = holiday.date;
            } else {
                year = holiday.year;
                month = holiday.month;
                day = holiday.day;
            }
            message = holiday.message || holiday.label || '';
        } else if (typeof holiday === 'string' && holiday.includes('-')) {
            const parts = holiday.split('-');
            if (parts.length === 3) {
                [year, month, day] = parts.map(normalize);
            }
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

// Helper function to check if current date is a holiday
function isHoliday(currentDate) {
    if (BELGIAN_HOLIDAYS.length === 0) return false;
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    return BELGIAN_HOLIDAYS.includes(dateString);
}

// Helper function to format date in Dutch format (DD/MM/YYYY)
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function updateStoreStatus() {
    const storeStatus = document.getElementById('storeStatus');
    const statusText = storeStatus.querySelector('.store-status-text');
    if (!storeStatus || !statusText) return;
    
    const now = new Date();
    
    // Check if currently on vacation
    const vacationCheck = isOnVacation(now);
    if (vacationCheck.isOnVacation) {
        // Remove all status classes and add vacation styling
        storeStatus.classList.remove('open', 'warning', 'closed');
        storeStatus.classList.add('closed'); // Use closed styling for vacation
        const startDateStr = formatDate(vacationCheck.startDate);
        const endDateStr = formatDate(vacationCheck.endDate);
        statusText.textContent = `In Verlof (${startDateStr} - ${endDateStr})`;
        return;
    }
    
    // Check if today is in HOLIDAY_DATES from store-config.js (always override)
    const holidayEntry = getHolidayDateEntry(now);
    if (holidayEntry) {
        storeStatus.classList.remove('open', 'warning', 'closed');
        storeStatus.classList.add('closed');
        statusText.textContent = holidayEntry.message
            ? `Gesloten (${holidayEntry.message})`
            : 'Gesloten (Uitzonderlijk)';
        return;
    }
    
    // Check if today is a holiday from CSV file (show "Gesloten (Feestdag)")
    if (isHoliday(now)) {
        storeStatus.classList.remove('open', 'warning', 'closed');
        storeStatus.classList.add('closed');
        statusText.textContent = 'Gesloten (Feestdag)';
        return;
    }
    
    // Continue with normal opening hours logic
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Time in minutes
    
    // Remove all status classes
    storeStatus.classList.remove('open', 'warning', 'closed', 'vacation');
    
    // Opening hours:
    // Monday (1): Closed
    // Tuesday-Friday (2-5): 09:00-12:00, 13:30-18:00
    // Saturday (6): 09:00-12:00, 13:30-17:00
    // Sunday (0): Closed
    
    let isOpen = false;
    let isClosingSoon = false;
    let statusMessage = '';
    
    if (currentDay === 0 || currentDay === 1) {
        // Sunday or Monday - Closed
        storeStatus.classList.add('closed');
        statusMessage = currentDay === 0 ? 'Gesloten' : 'Gesloten';
    } else if (currentDay >= 2 && currentDay <= 5) {
        // Tuesday to Friday
        const morningStart = 9 * 60; // 09:00
        const morningEnd = 12 * 60; // 12:00
        const afternoonStart = 13 * 60 + 30; // 13:30
        const afternoonEnd = 18 * 60; // 18:00
        
        if ((currentTime >= morningStart && currentTime < morningEnd) || 
            (currentTime >= afternoonStart && currentTime < afternoonEnd)) {
            isOpen = true;
            // Check if closing within 30 minutes
            const timeUntilClose = (currentTime >= morningStart && currentTime < morningEnd) 
                ? morningEnd - currentTime 
                : afternoonEnd - currentTime;
            
            if (timeUntilClose <= 30) {
                isClosingSoon = true;
            }
            
            if (isClosingSoon) {
                storeStatus.classList.add('warning');
                statusMessage = 'Sluit binnenkort';
            } else {
                storeStatus.classList.add('open');
                statusMessage = 'Open';
            }
        } else {
            storeStatus.classList.add('closed');
            statusMessage = 'Gesloten';
        }
    } else if (currentDay === 6) {
        // Saturday
        const morningStart = 9 * 60; // 09:00
        const morningEnd = 12 * 60; // 12:00
        const afternoonStart = 13 * 60 + 30; // 13:30
        const afternoonEnd = 17 * 60; // 17:00
        
        if ((currentTime >= morningStart && currentTime < morningEnd) || 
            (currentTime >= afternoonStart && currentTime < afternoonEnd)) {
            isOpen = true;
            // Check if closing within 30 minutes
            const timeUntilClose = (currentTime >= morningStart && currentTime < morningEnd) 
                ? morningEnd - currentTime 
                : afternoonEnd - currentTime;
            
            if (timeUntilClose <= 30) {
                isClosingSoon = true;
            }
            
            if (isClosingSoon) {
                storeStatus.classList.add('warning');
                statusMessage = 'Sluit binnenkort';
            } else {
                storeStatus.classList.add('open');
                statusMessage = 'Open';
            }
        } else {
            storeStatus.classList.add('closed');
            statusMessage = 'Gesloten';
        }
    }
    
    statusText.textContent = statusMessage;
}

// Load service block and service card background images
async function loadServiceBackgroundImages() {
    // Map service blocks to their corresponding images
    const serviceImageMap = {
        'service-block-1': 'assets/images/gallery/picture7.jpg', // Electric bikes hero section
        'service-card-1': 'assets/images/onsaanbod/verkoop.avif', // Stadsfietsen
        'service-card-2': 'assets/images/onsaanbod/herstellingen.jpg', // Onderhoud & Herstel
        'service-card-3': 'assets/images/onsaanbod/onderdelen.jpg', // Onderdelen & Accessoires
        'service-card-4': 'assets/images/onsaanbod/grasmaaiers.jpg' // Grasmaaiers & Tuin
    };
    
    // Get all service blocks
    const serviceBlocks = document.querySelectorAll('.service-block');
    
    // Get all service cards (new design)
    const serviceCards = document.querySelectorAll('.service-card-new');
    
    // Load images for service blocks (hero sections)
    serviceBlocks.forEach((block) => {
        let imagePath = null;
        for (const className of block.classList) {
            if (serviceImageMap[className]) {
                imagePath = serviceImageMap[className];
                break;
            }
        }
        
        if (imagePath) {
            const img = new Image();
            img.onload = () => {
                block.setAttribute('data-bg-image', imagePath);
                block.style.setProperty('--bg-image', `url(${imagePath})`);
            };
            img.onerror = () => {
                console.warn(`Failed to load service image: ${imagePath}`);
            };
            img.src = imagePath;
        }
    });
    
    // Service cards now use img tags directly in HTML, no need to set background images
}

// Initialize on DOM load
// FAQ Accordion Functionality
function initFAQ() {
    // Individual FAQ item accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering parent toggle
            
            const isActive = item.classList.contains('active');
            
            // Sluit alle andere items (uitklapbaar via .active + CSS max-height)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    loadBrandImages();

    // Hero vult ruimte onder ribbon + nav. Op mobiel triggert scrollen vaak 'resize' door
    // veranderende innerHeight (browser-UI) → elke herberekening van --hero-h verschuift het document.
    // Debounce + negeer kleine hoogte-jitter zolang de breedte gelijk blijft (touch).
    let heroResizeTimer = null;
    let lastHeroInnerW = -1;
    let lastHeroInnerH = -1;

    function applyHeroHeight() {
        const hero = document.getElementById('home');
        if (!hero) return;
        const ribbon = document.getElementById('headerRibbon');
        const nav = document.getElementById('mainNav');
        const ribbonH = ribbon ? ribbon.offsetHeight : 0;
        const navH = nav ? nav.offsetHeight : 0;
        const viewportH = window.innerHeight || document.documentElement.clientHeight || 0;
        const target = Math.max(420, viewportH - ribbonH - navH);
        document.documentElement.style.setProperty('--hero-h', `${target}px`);
        lastHeroInnerW = window.innerWidth;
        lastHeroInnerH = window.innerHeight;
    }

    function isCoarseTouch() {
        return typeof window.matchMedia === 'function'
            && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }

    function shouldIgnoreHeroResizeForViewportJitter() {
        if (!isCoarseTouch()) return false;
        if (lastHeroInnerW < 0) return false;
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w !== lastHeroInnerW) return false;
        return Math.abs(h - lastHeroInnerH) < 100;
    }

    function scheduleHeroResize() {
        if (shouldIgnoreHeroResizeForViewportJitter()) return;
        clearTimeout(heroResizeTimer);
        const delay = isCoarseTouch() ? 400 : 120;
        heroResizeTimer = setTimeout(() => {
            heroResizeTimer = null;
            applyHeroHeight();
        }, delay);
    }

    applyHeroHeight();
    window.addEventListener('resize', scheduleHeroResize, { passive: true });
    window.addEventListener('orientationchange', () => {
        clearTimeout(heroResizeTimer);
        heroResizeTimer = null;
        setTimeout(() => {
            applyHeroHeight();
        }, 350);
    }, { passive: true });
    
    // Initialize mobile brands carousel after images are loaded
    setTimeout(() => {
        initMobileBrandsCarousel();
    }, 500);
    
    await loadGalleryImages();
    await loadServiceBackgroundImages();
    
    // Load holidays from CSV file
    await loadHolidaysFromCSV();
    
    // Update store status (will show "Gesloten (Feestdag)" if today is a holiday from CSV)
    updateStoreStatus();
    
    initFAQ();
    
    // Update store status every minute
    setInterval(updateStoreStatus, 60000);
    
    // Make store status button clickable on mobile to navigate to contact section
    const storeStatus = document.getElementById('storeStatus');
    if (storeStatus) {
        const isMobile = () => window.innerWidth < 768;
        
        // Add click handler for mobile
        storeStatus.addEventListener('click', () => {
            if (isMobile()) {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const navHeight = document.getElementById('mainNav')?.offsetHeight || 0;
                    const rect = contactSection.getBoundingClientRect();
                    const y = rect.top + (window.scrollY || document.documentElement.scrollTop);
                    window.scrollTo({
                        top: Math.max(0, y - navHeight),
                        behavior: 'auto'
                    });
                }
            }
        });
        
        // Handle keyboard navigation
        storeStatus.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && isMobile()) {
                e.preventDefault();
                storeStatus.click();
            }
        });
        
        // Update cursor based on screen size
        const updateCursor = () => {
            storeStatus.style.cursor = isMobile() ? 'pointer' : 'default';
        };
        updateCursor();
        window.addEventListener('resize', updateCursor);
    }
    
    // Merken-carrousel: alleen bij breedtewijziging (niet bij pure innerHeight-jitter)
    let lastBrandResizeW = window.innerWidth;
    let brandResizeTimeout;
    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        if (w === lastBrandResizeW) return;
        lastBrandResizeW = w;
        clearTimeout(brandResizeTimeout);
        brandResizeTimeout = setTimeout(() => {
            if (window.innerWidth < 768) {
                initMobileBrandsCarousel();
            }
        }, 300);
    });
    
});

// Mobile brand chips filtering
// Removed chip interactions: mobile marquee is non-interactive

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 8000+ Customers Counter Animation & Years of Experience
document.addEventListener('DOMContentLoaded', function() {
    const customerCounter = document.getElementById('customerCounter');
    const heroSection = document.getElementById('home');
    
    if (!customerCounter || !heroSection) return;
    
    let hasAnimated = false;
    const targetValue = 8000;
    const duration = 3000; // 3 seconds for smoother animation
    
    // easing function (ease-out-cubic)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function animateCounters() {
        if (hasAnimated) return;
        hasAnimated = true;
        
        const startTime = performance.now();
        let lastCustomerValue = 0;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // easing
            const easedProgress = easeOutCubic(progress);
            
            // Update customer counter only - round to nearest 50 to reduce jitter
            const currentCustomerValue = Math.floor(easedProgress * targetValue);
            // Only update if change is significant enough (reduces jitter)
            if (Math.abs(currentCustomerValue - lastCustomerValue) >= 50 || currentCustomerValue === targetValue) {
                const displayValue = Math.round(currentCustomerValue / 50) * 50;
                customerCounter.textContent = `+${displayValue.toLocaleString('nl-BE')}`;
                lastCustomerValue = currentCustomerValue;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exact
                customerCounter.textContent = `+${targetValue.toLocaleString('nl-BE')}`;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Intersection Observer to trigger animation when hero section is visible
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
            }
        });
    }, observerOptions);
    
    sectionObserver.observe(heroSection);
});

// Image Protection - Prevent right-click and dragging
document.addEventListener('DOMContentLoaded', function() {
    // Prevent context menu (right-click) on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || e.target.closest('img')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevent dragging images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.closest('img')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevent text selection on images (for additional protection)
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.closest('img')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable keyboard shortcuts for saving images (Ctrl+S, Ctrl+Shift+S, etc.)
    document.addEventListener('keydown', function(e) {
        // Disable F12 (developer tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I (developer tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+J (developer console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (view source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
    });
});

// Sfeer-sectie #sfeer: video loop bij zichtbaarheid; start stom; geluid via knop
(function() {
    const wrap = document.querySelector('.about-showcase-media--section');
    const video = document.getElementById('aboutShowcaseVideo');
    const soundBtn = document.getElementById('aboutShowcaseSoundBtn');
    if (!wrap || !video || !soundBtn) return;

    const icon = soundBtn.querySelector('i');
    const label = soundBtn.querySelector('.about-showcase-sound-label');

    function setSoundUi(isUnmuted) {
        soundBtn.setAttribute('aria-pressed', isUnmuted ? 'true' : 'false');
        if (icon) {
            icon.classList.toggle('fa-volume-mute', !isUnmuted);
            icon.classList.toggle('fa-volume-up', isUnmuted);
        }
        if (label) {
            label.textContent = isUnmuted ? 'Geluid uit' : 'Geluid aan';
        }
        soundBtn.setAttribute('title', isUnmuted ? 'Geluid uit' : 'Geluid aan');
    }

    soundBtn.addEventListener('click', function() {
        video.muted = !video.muted;
        setSoundUi(!video.muted);
        video.play().catch(function() {});
    });

    setSoundUi(false);

    function tryPlay() {
        video.play().catch(function() {});
    }

    if (!('IntersectionObserver' in window)) {
        tryPlay();
        return;
    }

    const observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    tryPlay();
                } else {
                    video.pause();
                }
            });
        },
        { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(wrap);
})();

// Easter egg Kurt: klik of Enter/Spatie op Kurts naam in "Over DCQ Bikes"
(function() {
    function closeKurtEgg(overlay, onKey) {
        if (!overlay || !overlay.parentNode) return;
        if (onKey) document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
        overlay.parentNode.removeChild(overlay);
    }

    function openKurtEgg() {
        if (document.getElementById('dcqKurtEggOverlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'dcqKurtEggOverlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Leuk momentje');

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dcq-kurt-egg-close';
        btn.setAttribute('aria-label', 'Sluiten');
        btn.appendChild(document.createTextNode('\u00D7'));

        const img = document.createElement('img');
        img.className = 'dcq-kurt-egg-img';
        img.src = 'assets/images/profilepictures/eastereggkurt.png';
        img.alt = 'Kurt als kind in een skelter — onderonsje bij DCQ Bikes.';

        overlay.appendChild(btn);
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        function onKey(e) {
            if (e.key === 'Escape') {
                closeKurtEgg(overlay, onKey);
            }
        }
        document.addEventListener('keydown', onKey);

        btn.addEventListener('click', function(ev) {
            ev.stopPropagation();
            closeKurtEgg(overlay, onKey);
        });
        overlay.addEventListener('click', function(ev) {
            if (ev.target === overlay) {
                closeKurtEgg(overlay, onKey);
            }
        });

        btn.focus();
    }

    document.querySelectorAll('.dcq-kurt-egg-trigger').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            openKurtEgg();
        });
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openKurtEgg();
            }
        });
    });
})();


