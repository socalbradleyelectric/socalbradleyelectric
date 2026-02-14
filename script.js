// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Progressive Disclosure for Service Details
const serviceToggles = document.querySelectorAll('.service-toggle');

serviceToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Close all other service details
        serviceToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
                otherToggle.nextElementSibling.style.maxHeight = null;
            }
        });
        
        // Toggle current service detail
        if (isExpanded) {
            toggle.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = null;
        } else {
            toggle.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// Smooth Scroll with Offset for Fixed Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // TODO: Replace with actual form submission endpoint
            // For now, we'll simulate a successful submission
            await simulateFormSubmission(data);
            
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent. We\'ll get back to you soon.';
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Sorry, there was an error sending your message. Please call us at 619-333-6470.';
        } finally {
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}

// Simulate form submission (replace with actual implementation)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Form data:', data);
        setTimeout(resolve, 1000);
    });
}

// Active Navigation Highlight on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Auto-resize service content when window resizes
window.addEventListener('resize', () => {
    serviceToggles.forEach(toggle => {
        if (toggle.getAttribute('aria-expanded') === 'true') {
            const content = toggle.nextElementSibling;
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});
