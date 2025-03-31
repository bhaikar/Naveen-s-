// Mobile navigation menu functionality
const hamburger = document.getElementById('hemberger');
const closeBtn = document.getElementById('close');
const navPage = document.getElementById('navpage');
const mobileLinks = document.querySelectorAll('#mobilelinks .link');

// Make sure mobile menu shows when hamburger is clicked
if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navPage) {
            navPage.style.transform = 'translateY(0)';
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
    if (currentScrollY > 50) {
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

// Supabase initialization
const SUPABASE_URL = "https://bjvqrrtpesblwkoteosp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqdnFycnRwZXNibHdrb3Rlb3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDEyNjEsImV4cCI6MjA1Nzk3NzI2MX0.wb_jBjBYmvNlxWcbW07MdIYxGlGlIBQX1XCOuKlsIEA";

// Initialize Supabase client properly for CDN usage
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Status message helper function
function showStatus(message, isError = false) {
    const statusDiv = document.getElementById("submission-status");
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? "#ff3333" : "#28a745";
    statusDiv.style.padding = "10px";
    statusDiv.style.marginTop = "15px";
    statusDiv.style.borderRadius = "5px";
    statusDiv.style.backgroundColor = isError ? "#ffdddd" : "#d4edda";
}

// Form submission handler
document.getElementById("career-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const resumeFile = document.getElementById("resume").files[0];

    if (!resumeFile) {
        showStatus("Please upload a resume file.", true);
        return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.type)) {
        showStatus("Please upload a PDF or Word document.", true);
        return;
    }

    try {
        // Show loading indicator
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Submitting...";
        submitButton.disabled = true;
        showStatus("Uploading your resume...");

        // Step 1: Upload Resume to Supabase Storage
        const fileName = `${Date.now()}_${resumeFile.name.replace(/\s+/g, '_')}`;
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from("resumes")
            .upload(fileName, resumeFile);

        if (uploadError) {
            throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Get the public URL of the uploaded file
        const { data: urlData } = await supabaseClient.storage
            .from("resumes")
            .getPublicUrl(fileName);

        const resumeUrl = urlData.publicUrl;

        showStatus("Saving your application...");

        // Step 2: Insert Form Data into Supabase Database
        const { data, error } = await supabaseClient
            .from("resumes")
            .insert([
                {
                    name: name,
                    email: email,
                    contact: contact,
                    resume_url: resumeUrl
                }
            ]);

        if (error) {
            throw new Error(`Database insertion failed: ${error.message}`);
        }

        showStatus("Resume submitted successfully! We'll get back to you soon.");
        document.getElementById("career-form").reset(); // Reset form after submission

    } catch (error) {
        console.error("Error:", error.message);
        showStatus(`Submission failed: ${error.message}`, true);
    } finally {
        // Reset button state
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = "SUBMIT";
        submitButton.disabled = false;
    }
});