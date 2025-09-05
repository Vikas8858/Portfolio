// Skills data
const skillsData = {
    cloud: [
        { title: "C", img: "/assets/C.png" },
        { title: "Python", img: "https://img.icons8.com/?size=160&id=hGdCwhSHUe6L&format=png" },
        { title: "JavaScript", img: "https://img.icons8.com/?size=96&id=108784&format=png" },
        { title: "SQl", img: "https://img.icons8.com/?size=96&id=J6KcaRLsTgpZ&format=png" },
        // { title: "", img: "https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg" },
        // { title: "", img: "https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg" }
    ],
    development: [
        // { title: "Python", img: "https://www.vectorlogo.zone/logos/python/python-icon.svg" },
        { title: "HTML5", img: "https://img.icons8.com/?size=96&id=20909&format=png" },
        { title: "CSS3", img: "https://img.icons8.com/?size=96&id=21278&format=png" },
        { title: "React.js", img: "https://img.icons8.com/?size=128&id=t4YbEbA834uH&format=png" },
        { title: "Tailwind", img: "https://img.icons8.com/?size=96&id=CIAZz2CYc6Kc&format=png" },
        { title: "Bootstrap", img: "https://img.icons8.com/?size=96&id=PndQWK6M1Hjo&format=png" },
        { title: "Git", img: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" },
        { title: "GitHub", img: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },

        // { title: "Grafana", img: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg" },
        // { title: "Nginx", img: "https://www.vectorlogo.zone/logos/nginx/nginx-icon.svg" }
    ]
};

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const themeToggle = document.getElementById('theme-toggle');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSkills();
    initializeNavigation();
    initializeScrollAnimations();
    // initializeContactForm(); // DISABLED - using Gmail redirect instead
    initializeTypingEffect();
    initializeThemeToggle();
    initializeParallaxEffects();
});

// Skills initialization
function initializeSkills() {
    const cloudSkillsContainer = document.getElementById('cloud-skills');
    const devSkillsContainer = document.getElementById('dev-skills');

    // Populate cloud skills
    skillsData.cloud.forEach(skill => {
        const skillElement = createSkillElement(skill);
        cloudSkillsContainer.appendChild(skillElement);
    });

    // Populate development skills
    skillsData.development.forEach(skill => {
        const skillElement = createSkillElement(skill);
        devSkillsContainer.appendChild(skillElement);
    });
}

function createSkillElement(skill) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item';
    skillDiv.innerHTML = `
        <img src="${skill.img}" alt="${skill.title}" loading="lazy">
        <h4>${skill.title}</h4>
    `;
    return skillDiv;
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('skill-item')) {
                    const skillItems = entry.target.parentElement.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe different elements with different animation types
    const fadeElements = document.querySelectorAll('.project-card, .about-text, .contact-info, .contact-form, .resume-preview, .experience-card, .timeline-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const slideLeftElements = document.querySelectorAll('.skill-category:nth-child(odd)');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.skill-category:nth-child(even)');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });

    // Observe skill items individually for staggered effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = ['fullStack Enthusiast', 'React.js Explorer',  'Frontend Specialist'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
}

// Contact form handling
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Submit to Netlify
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        // Submit form data to Netlify
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        })
        .catch((error) => {
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
    });
}


// Enhanced parallax effects (disabled)
function initializeParallaxEffects() {
    // Parallax effects and floating animations removed for cleaner experience
    // Skills will have static hover effects only
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-dependent operations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}
// Populate main skills section when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the DOM to be fully ready
    setTimeout(() => {
        const cloudSkillsMainContainer = document.getElementById('cloud-skills-main');
        const devSkillsMainContainer = document.getElementById('dev-skills-main');

        // Populate cloud skills in main skills section
        if (cloudSkillsMainContainer) {
            skillsData.cloud.forEach(skill => {
                const skillElement = createSkillElement(skill);
                cloudSkillsMainContainer.appendChild(skillElement);
            });
        }

        // Populate development skills in main skills section
        if (devSkillsMainContainer) {
            skillsData.development.forEach(skill => {
                const skillElement = createSkillElement(skill);
                devSkillsMainContainer.appendChild(skillElement);
            });
        }
    }, 100);
});
// Gmail Contact Form Implementation
document.addEventListener('DOMContentLoaded', function() {
    const contactFormElement = document.getElementById('contact-form');
    
    if (contactFormElement) {
        contactFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate required fields
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Get submit button and store original text
            const submitBtn = contactFormElement.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Create professional email body
            const emailBody = `Hello Vikas,

I hope this message finds you well. I'm reaching out regarding potential collaboration opportunities.

Contact Details:
Name: ${name}
Email: ${email}

Message:
${message}

I look forward to hearing from you.

Best regards,
${name}`;
            
            // Create Gmail compose URL
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=amitabhdevops2024@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Show brief loading state
            submitBtn.innerHTML = 'Opening Gmail...';
            submitBtn.disabled = true;
            
            // Open Gmail and immediately reset everything
            window.open(gmailUrl, '_blank');
            
            // Immediately reset button and form (no delay)
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactFormElement.reset();
            
            // Show success notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-family: Inter, sans-serif;
                font-size: 14px;
            `;
            notification.textContent = 'Gmail opened! Please review and send your message.';
            document.body.appendChild(notification);
            
            // Remove notification after 4 seconds
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 4000);
        });
    }
});
// Dark mode functionality
function initializeThemeToggle() {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation to the toggle button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}