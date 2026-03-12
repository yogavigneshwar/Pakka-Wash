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

// Booking Form Logic implementation
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent standard form submission
        
        // Get values from the form inputs
        const name = document.getElementById('bookName').value.trim();
        const phone = document.getElementById('bookPhone').value.trim();
        const service = document.getElementById('bookService').value;

        // Ensure all fields have values
        if (!name || !phone || !service) {
            alert("Please fill in all fields.");
            return;
        }

        // WhatsApp number to send messages to (Use international format without the +)
        const waNumber = "918124022177"; // Hardcoded from the footer
        
        // Construct the custom message
        const messageText = `Hi Pakka Wash Team! I would like to request a booking.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service Required:* ${encodeURIComponent(service)}%0A%0APlease let me know the available time slots.`;
        
        // Construct the universal WhatsApp link
        const whatsappUrl = `https://wa.me/${waNumber}?text=${messageText}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Optional: Reset form after booking request initiated
        bookingForm.reset();
    });
}
