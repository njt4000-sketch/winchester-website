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

    // Mobile Menu Toggle (Simple)
    const hamburger = document.querySelector('.hamburger');
    // Note: Hamburger CSS/JS logic specific can be added if needed, sticking to desktop focus for 'luxury' vibe first pass.
});
