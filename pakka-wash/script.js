// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const hamburger = document.querySelector('.hamburger');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add('active');
        // Simple animation for hamburger icon
        hamburger.style.backgroundColor = 'transparent';
        hamburger.style.transform = 'rotate(45deg)';
        const before = document.styleSheets[0].cssRules;
        // Basic fallback for visual feedback
    } else {
        mobileMenu.classList.remove('active');
        hamburger.style.backgroundColor = 'var(--clr-gray-900)';
        hamburger.style.transform = 'rotate(0deg)';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Carousel Logic
const track = document.getElementById('promise-carousel');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateCarousel();
    });

    // Auto slide optional (disabled initially for pure button control, or we can leave it)
    setInterval(() => {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }, 5000);
}
