document.addEventListener('DOMContentLoaded', function () {
    // All your code here: smooth scrolling, mobile nav events, scroll handlers, typewriter effect, etc.



function showAlert(event) {
    event.preventDefault(); // Prevents page refresh
    alert("Thank you for your feedback!"); // Shows alert
    document.querySelector("form").reset(); // Clears the form after submission
}

// Select all elements with "fade-up" class
const fadeElements = document.querySelectorAll(".fade-up");

function revealFadeElements() {
    fadeElements.forEach((element) => {
        let elementTop = element.getBoundingClientRect().top;
        let elementBottom = element.getBoundingClientRect().bottom;
        let windowHeight = window.innerHeight;

        // When the element is in view
        if (elementTop < windowHeight - 50 && elementBottom > 50) {
            element.classList.add("show");
            element.classList.remove("hide"); // Remove hide class
        }
        // When the element is out of view (Scrolling back up)
        else {
            element.classList.remove("show");
            element.classList.add("hide"); // Reset animation
        }
    });
}

// Run function on scroll
window.addEventListener("scroll", revealFadeElements);

// Run function once on page load
revealFadeElements();


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
});