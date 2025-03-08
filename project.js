 // Smooth scroll for CTA buttons (optional enhancement)
 document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Trigger animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});