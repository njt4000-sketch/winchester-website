document.addEventListener('DOMContentLoaded', () => {

    // Scroll Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(26, 42, 58, 0.98)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'rgba(26, 42, 58, 0.95)';
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create overlay element for mobile menu
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    body.appendChild(navOverlay);

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');

        // Update aria-expanded
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);

        // Prevent body scroll when menu is open
        body.style.overflow = isExpanded ? 'hidden' : '';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking overlay
        navOverlay.addEventListener('click', closeMobileMenu);

        // Close menu when clicking a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Parallax Effect for feature images (Optional, can be added later or removed if simple is better)
    // Removed Hero Parallax to allow CSS Zoom animation to shine without conflict

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    const thankYouModal = document.getElementById('thank-you-modal');

    if (contactForm && thankYouModal) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show thank you modal
                    thankYouModal.classList.add('active');
                    contactForm.reset();

                    // Redirect to main page after 3 seconds
                    setTimeout(() => {
                        thankYouModal.classList.remove('active');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Sorry, there was an error submitting your form. Please try again.');
                console.error('Form submission error:', error);
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.textContent = originalButtonText;
            }
        });
    }
});
