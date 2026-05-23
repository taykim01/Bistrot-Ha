document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Header Scroll Effect
    // ==========================================
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once at load

    // ==========================================
    // 2. Mobile Menu Toggle
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        const isOpen = navToggle.classList.contains('open');
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', !isOpen);
    };
    
    navToggle.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ==========================================
    // 3. Navigation Intersection Observer (Active Links)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Adjust to trigger when section occupies middle screen
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // ==========================================
    // 4. Menu Category Tab Switching
    // ==========================================
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const panels = document.querySelectorAll('.menu-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.getAttribute('aria-controls');
            
            // Update active states for tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            // Hide all panels with a fade out effect, then show target
            panels.forEach(panel => {
                panel.classList.remove('active');
                setTimeout(() => {
                    panel.style.display = 'none';
                }, 150); // Matches transitions
            });
            
            setTimeout(() => {
                const targetPanel = document.getElementById(targetPanelId);
                targetPanel.style.display = 'block';
                // Trigger reflow to restart animation
                targetPanel.offsetHeight; 
                targetPanel.classList.add('active');
            }, 150);
        });
    });

    // ==========================================
    // 5. Ambiance Gallery Slider
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 seconds
    
    const goToSlide = (n) => {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };
    
    const nextSlide = () => {
        goToSlide(currentSlide + 1);
    };
    
    const prevSlide = () => {
        goToSlide(currentSlide - 1);
    };
    
    const startSlideShow = () => {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, slideDuration);
    };
    
    const stopSlideShow = () => {
        clearInterval(slideInterval);
    };
    
    // Slide control click handlers
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideShow(); // Reset interval on interaction
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideShow(); // Reset interval on interaction
        });
    }
    
    // Dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            goToSlide(index);
            startSlideShow(); // Reset interval on interaction
        });
    });
    
    // Pause slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideShow);
        sliderContainer.addEventListener('mouseleave', startSlideShow);
    }
    
    // Start slideshow on load
    startSlideShow();

    // ==========================================
    // 6. Interactive Leaflet Map Initialization
    // ==========================================
    const restaurantCoordinates = [40.7191186, -73.9916931]; // Bistrot Ha, 137 Eldridge St
    
    // Initialize map
    const map = L.map('map', {
        center: restaurantCoordinates,
        zoom: 16,
        scrollWheelZoom: false, // Prevent zoom on scroll
        dragging: !L.Browser.mobile, // Disable dragging on mobile to allow scroll
        zoomControl: true
    });

    // Dark thematic tiles from CartoDB (Fits the dark emerald theme perfectly!)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom Gold-themed Pin Marker icon
    const customGoldIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="
            width: 20px; 
            height: 20px; 
            background-color: #d4af37; 
            border: 2px solid #fdfbf7; 
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(212,175,55,0.7);
            animation: pulseMarker 2s infinite ease-in-out;
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // CSS Keyframe animation injection for the pulsing marker
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes pulseMarker {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
            70% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(212, 175, 55, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Add marker to map
    const marker = L.marker(restaurantCoordinates, { icon: customGoldIcon }).addTo(map);
    
    // Add styled Popup
    marker.bindPopup(`
        <div style="text-align: center; padding: 4px;">
            <h4>Bistrot Ha</h4>
            <p>137 Eldridge St, New York, NY 10002</p>
            <p style="margin-top: 5px; font-weight: 500; color: #d4af37;">Tue &ndash; Sat | 5:30 PM &ndash; 10:30 PM</p>
        </div>
    `).openPopup();
});
