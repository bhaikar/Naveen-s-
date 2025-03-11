function showAlert(event) {
    event.preventDefault(); // Prevents page refresh
    alert("Thank you for your feedback!"); // Shows alert
    document.querySelector("form").reset(); // Clears the form after submission
}

        // Select all elements with "fade-up" class
        const fadeElements = document.querySelectorAll(".fade-up");

        function revealOnScroll() {
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
        window.addEventListener("scroll", revealOnScroll);

        // Run function once on page load
        revealOnScroll();