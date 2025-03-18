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

 // Mobile navigation menu functionality - FIXED
 const hamburger = document.getElementById('hemberger');
 const closeBtn = document.getElementById('close');
 const navPage = document.getElementById('navpage');
 const mobileLinks = document.querySelectorAll('#mobilelinks .link');

 // Make sure mobile menu shows when hamburger is clicked
 if (hamburger) {
     hamburger.addEventListener('click', () => {
         if (navPage) {
             navPage.style.transform = 'translateY(0)';
             navPage.style.display = 'flex'; // Ensure it's displayed
         }
     });
 }

 // Close mobile menu when X is clicked
 if (closeBtn) {
     closeBtn.addEventListener('click', () => {
         if (navPage) {
             navPage.style.transform = 'translateY(-100%)';
         }
     });
 }

 // Close mobile menu when a link is clicked
 mobileLinks.forEach(link => {
     link.addEventListener('click', () => {
         if (navPage) {
             navPage.style.transform = 'translateY(-100%)';
             setTimeout(() => { navPage.style.display = 'none'; }, 300); // Allow animation to finish   
         }
     });
 });



 // Navbar transparency and visibility control
 let lastScrollY = window.scrollY;
 const navbar = document.getElementById("navbar");

 // Debounce function to improve scroll performance
 function debounce(func, wait = 10, immediate = true) {
     let timeout;
     return function () {
         const context = this, args = arguments;
         const later = function () {
             timeout = null;
             if (!immediate) func.apply(context, args);
         };
         const callNow = immediate && !timeout;
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
         if (callNow) func.apply(context, args);
     };
 }

 // Optimized scroll handler with debounce
 const handleScroll = debounce(() => {
     let currentScrollY = window.scrollY;

     // Change background to black when scrolled down
     if (currentScrollY > 100) {
         navbar.classList.add("scrolled");
     } else {
         navbar.classList.remove("scrolled");
     }

     // Hide navbar when scrolling down past 200px, show when scrolling up
     if (currentScrollY > lastScrollY && currentScrollY > 200) {
         navbar.classList.add("hidden");
     } else {
         navbar.classList.remove("hidden");
     }

     lastScrollY = currentScrollY;
 }, 10);

 window.addEventListener("scroll", handleScroll);

 // Implement smooth reveal animations for sections
 const revealElements = document.querySelectorAll('.card, #about img, .about-text');

 const revealOnScroll = debounce(() => {
     const windowHeight = window.innerHeight;
     revealElements.forEach(element => {
         const elementTop = element.getBoundingClientRect().top;
         if (elementTop < windowHeight - 100) {
             element.classList.add('revealed');
         }
     });
 }, 10);

 window.addEventListener('scroll', revealOnScroll);

 // Call once to check initial state
 revealOnScroll();