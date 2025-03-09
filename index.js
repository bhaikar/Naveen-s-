document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

//     const mobileMenuButton = document.querySelector('.mobile-menu-button');
//     const menu = document.querySelector('.menu');
//     mobileMenuButton.addEventListener('click', () => {
//         menu.classList.toggle('show');
//     });
 });

//  navbar transparent to solid color
let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
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
});



