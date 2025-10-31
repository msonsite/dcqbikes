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
    const basePath = 'gallerysection/';
    const extensions = ['webp', 'jpg', 'jpeg', 'png', 'avif', 'gif'];
    const maxAttempts = 100; // Check up to 100 images
    const discoveredImages = [];
    
    // Try to load a gallery manifest file first (optional)
    try {
        const manifestResponse = await fetch('gallerysection/manifest.json');
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
        galleryItem.className = `gallery-item ${pattern} fade-in`;
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
    
    // Observe gallery items for fade-in animation
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        galleryObserver.observe(item);
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
// Vacation Periods Configuration
// Add your vacation periods here. Format: [year, month (1-12), day]
const VACATION_PERIODS = [
    {
        start: [2025, 12, 24],  
        end: [2026, 1, 1]       
    },
    {
        start: [2026, 7, 14],   
        end: [2026, 7, 31]
    },
    // Add more vacation periods as needed for each year
];

// Helper function to check if current date is within any vacation period
function isOnVacation(currentDate) {
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

// 8000+ Customers Counter Animation & Years of Experience
document.addEventListener('DOMContentLoaded', function() {
    const customerCounter = document.getElementById('customerCounter');
    const yearsCounter = document.getElementById('yearsCounter');
    const heroSection = document.getElementById('home');
    
    if (!customerCounter || !heroSection) return;
    
    let hasAnimated = false;
    const targetValue = 8000;
    const duration = 3000; // 3 seconds for smoother animation
    
    // Calculate years of experience dynamically (starting January 2006)
    const startDate = new Date(2006, 0, 1); // January 2006 (month is 0-indexed)
    const currentDate = new Date();
    
    // Calculate the exact difference in years
    let years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();
    
    // If we haven't reached the anniversary month yet, subtract 1
    if (months < 0 || (months === 0 && currentDate.getDate() < startDate.getDate())) {
        years--;
    }
    
    const targetYears = Math.max(years, 1); // At least 1 year
    
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
    
    // Set years counter to final value immediately (static, no animation)
    if (yearsCounter) {
        yearsCounter.textContent = targetYears;
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

