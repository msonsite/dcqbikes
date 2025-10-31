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

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Hero Video Fallback
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    // Try to load videos from videos folder
    const videoSources = [
        'videos/hero1.mp4',
        'videos/hero2.mp4',
        'videos/drone-shot.mp4',
        'videos/insta360.mp4'
    ];
    
    let currentVideoIndex = 0;
    
    function tryLoadVideo() {
        if (currentVideoIndex >= videoSources.length) {
            // All videos failed, use fallback image
            heroVideo.style.display = 'none';
            const heroSection = heroVideo.closest('section');
            if (heroSection && !heroSection.querySelector('.hero-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'hero-fallback absolute inset-0 bg-gradient-to-br from-dcq-black to-gray-800';
                heroSection.appendChild(fallback);
            }
            return;
        }
        
        const video = document.createElement('source');
        video.src = videoSources[currentVideoIndex];
        video.type = 'video/mp4';
        video.addEventListener('error', () => {
            currentVideoIndex++;
            tryLoadVideo();
        });
        video.addEventListener('load', () => {
            heroVideo.appendChild(video);
            heroVideo.load();
        });
        heroVideo.appendChild(video);
        heroVideo.load();
        currentVideoIndex++;
    }
    
    heroVideo.addEventListener('error', () => {
        currentVideoIndex++;
        tryLoadVideo();
    });
    
    // Start loading
    tryLoadVideo();
}

// Dynamic Brand Image Loading
async function loadBrandImages() {
    // Define the actual brand images that are available
    const brandImages = {
        'large': [
            { src: 'images/brands/large/conway.png', name: 'Conway', alt: 'Conway Logo' },
            { src: 'images/brands/large/ego-logo.png', name: 'EGO', alt: 'EGO Logo' },
            { src: 'images/brands/large/norta.png', name: 'Norta', alt: 'Norta Logo' },
            { src: 'images/brands/large/oxfordlogo.webp', name: 'Oxford', alt: 'Oxford Logo' },
            { src: 'images/brands/large/qio.png', name: 'Qio', alt: 'Qio Logo' },
            { src: 'images/brands/large/victoria-groot.png', name: 'Victoria', alt: 'Victoria Logo' }
        ],
        'medium': [
            { src: 'images/brands/medium/abus.webp', name: 'Abus', alt: 'Abus Logo' },
            { src: 'images/brands/medium/basil.webp', name: 'Basil', alt: 'Basil Logo' },
            { src: 'images/brands/medium/bollé.png', name: 'Bollé', alt: 'Bollé Logo' },
            { src: 'images/brands/medium/contec.webp', name: 'Contec', alt: 'Contec Logo' },
            { src: 'images/brands/medium/dandell.png', name: 'Dandell', alt: 'Dandell Logo' },
            { src: 'images/brands/medium/polisport.png', name: 'Polisport', alt: 'Polisport Logo' },
            { src: 'images/brands/medium/selleroyal.png', name: 'Selle Royal', alt: 'Selle Royal Logo' },
            { src: 'images/brands/medium/sks.png', name: 'SKS', alt: 'SKS Logo' }
        ],
        'small': [
            { src: 'images/brands/small/bosch.png', name: 'Bosch', alt: 'Bosch Logo' },
            { src: 'images/brands/small/continental.png', name: 'Continental', alt: 'Continental Logo' },
            { src: 'images/brands/small/cst.png', name: 'CST', alt: 'CST Logo' },
            { src: 'images/brands/small/kmc.png', name: 'KMC', alt: 'KMC Logo' },
            { src: 'images/brands/small/magura.svg', name: 'Magura', alt: 'Magura Logo' },
            { src: 'images/brands/small/michelin.png', name: 'Michelin', alt: 'Michelin Logo' },
            { src: 'images/brands/small/sapim.png', name: 'Sapim', alt: 'Sapim Logo' },
            { src: 'images/brands/small/schwalbe.webp', name: 'Schwalbe', alt: 'Schwalbe Logo' },
            { src: 'images/brands/small/shimano.png', name: 'Shimano', alt: 'Shimano Logo' }
        ]
    };
    
    const mobileMarquee = document.getElementById('brandsMarqueeTrack');
    const mobileLogos = [];
    for (const [size, images] of Object.entries(brandImages)) {
        const container = document.getElementById(`brands-${size}`);
        if ((!container && !mobileMarquee) || images.length === 0) continue;
        
        images.forEach((brand, index) => {
            // Create brand image wrapper
            const brandWrapper = document.createElement('div');
            brandWrapper.className = 'brand-item';
            brandWrapper.setAttribute('data-brand-name', brand.name);
            brandWrapper.setAttribute('data-brand-image', brand.src);
            
            // Create image element
            const img = document.createElement('img');
            img.src = brand.src;
            img.alt = brand.alt;
            img.loading = 'lazy';
            
            brandWrapper.appendChild(img);
            
            // Handle image load error
            img.addEventListener('error', () => {
                console.warn(`Failed to load brand image: ${brand.src}`);
                brandWrapper.style.display = 'none';
            });
            
            // Add staggered animation delay
            brandWrapper.style.animationDelay = `${index * 0.1}s`;
            brandWrapper.style.opacity = '0';
            brandWrapper.style.animation = 'fadeInUp 0.6s ease forwards';
            
            if (container) container.appendChild(brandWrapper);
            if (mobileMarquee) {
                const clone = brandWrapper.cloneNode(true);
                // Remove any fade-in inline animation styles from desktop rendering
                clone.style.animation = 'none';
                clone.style.opacity = '1';
                clone.style.transform = 'none';
                const imgEl = clone.querySelector('img');
                if (imgEl) imgEl.loading = 'lazy';
                mobileLogos.push(clone);
            }
        });
    }

    // Build infinite marquee: duplicate sequence to allow seamless loop
    if (mobileMarquee && mobileLogos.length) {
        const sequence = document.createDocumentFragment();
        mobileLogos.forEach(node => {
            const c = node.cloneNode(true);
            c.style.animation = 'none';
            c.style.opacity = '1';
            c.style.transform = 'none';
            sequence.appendChild(c);
        });
        const sequence2 = document.createDocumentFragment();
        mobileLogos.forEach(node => {
            const c2 = node.cloneNode(true);
            c2.style.animation = 'none';
            c2.style.opacity = '1';
            c2.style.transform = 'none';
            sequence2.appendChild(c2);
        });
        mobileMarquee.appendChild(sequence);
        mobileMarquee.appendChild(sequence2);
    }
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

async function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // In production, fetch actual file list from server
    // For now, create a system that will work when images are added
    // This would typically be done via a server-side API
    
    // Example placeholder that demonstrates the structure
    // Replace this with actual file loading logic when images are available
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

// Navbar Scroll Effect
let lastScroll = 0;
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        mainNav.classList.add('shadow-lg');
    } else {
        mainNav.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Store Status Checker
function updateStoreStatus() {
    const storeStatus = document.getElementById('storeStatus');
    const statusText = storeStatus.querySelector('.store-status-text');
    if (!storeStatus || !statusText) return;
    
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Time in minutes
    
    // Remove all status classes
    storeStatus.classList.remove('open', 'warning', 'closed');
    
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
        statusMessage = currentDay === 0 ? 'Gesloten (Zondag)' : 'Gesloten (Maandag)';
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadBrandImages();
    loadGalleryImages();
    updateStoreStatus();
    
    // Update store status every minute
    setInterval(updateStoreStatus, 60000);
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

