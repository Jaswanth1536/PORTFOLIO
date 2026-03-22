// Initialize EmailJS
emailjs.init("EhH3dbaU55-HvwvlQ");

// Preloader and Initial Animation
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        
        // Trigger initial hero animations
        document.querySelectorAll('.hero-content .reveal-up, .hero-content .reveal-left, .hero-content .reveal-right').forEach(el => {
            el.classList.add('active');
        });
    }, 500);
});

// Sticky Header & Back to Top Button
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Header
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
});

closeBtn.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

function closeMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations & Progress Bars
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add active class for reveal animations
            if (entry.target.classList.contains('reveal-up') || 
                entry.target.classList.contains('reveal-left') || 
                entry.target.classList.contains('reveal-right')) {
                entry.target.classList.add('active');
            }
            
            // Animate progress bars if inside skill card
            if (entry.target.classList.contains('skill-card')) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
            
            // Stop observing once animated
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select elements to observe
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill-card').forEach(el => {
    observer.observe(el);
});

// Typing Animation for Hero Section Title
const typingTexts = ["Aspiring Data Scientist", "Machine Learning Enthusiast", "Full Stack Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenTexts = 2000;
const typingElement = document.querySelector('.typing-text');

if (typingElement && window.innerWidth < 768) {
    // Only run on mobile where we hide the static dividers and show one role at a time
    function typeEffect() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeTimer = isDeleting ? deleteSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeTimer = delayBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typeTimer = 500;
        }
        
        setTimeout(typeEffect, typeTimer);
    }
    
    // Start typing effect after short delay
    setTimeout(typeEffect, 1500);
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin ml-2"></i>';
        
        const serviceID = 'service_p5m5mpm';
        const contactTemplateID = 'template_o0whrgy'; // Sends message to you
        const autoReplyTemplateID = 'template_zjou298'; // Sends auto-reply to visitor

        // Create a universal parameter object to cover all variables used in both templates
        const templateParams = {
            name: document.getElementById('name').value,
            from_name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            from_email: document.getElementById('email').value,
            reply_to: document.getElementById('email').value,
            message: document.getElementById('message').value,
            title: 'New Portfolio Message'
        };

        // First send the contact message to you
        emailjs.send(serviceID, contactTemplateID, templateParams)
            .then(() => {
                // If successful, trigger the auto-reply to the visitor
                return emailjs.send(serviceID, autoReplyTemplateID, templateParams);
            })
            .then(() => {
                // Both emails sent successfully
                btn.innerHTML = 'Message Sent! <i class="bx bx-check ml-2"></i>';
                btn.classList.replace('btn-primary', 'btn-outline');
                btn.style.borderColor = 'var(--color-green)';
                btn.style.color = 'var(--color-green)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-outline', 'btn-primary');
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 3000);
            })
            .catch((error) => {
                const errText = error.text || error.message || 'Unknown Error';
                btn.innerHTML = 'Error: ' + errText + ' <i class="bx bx-x ml-2"></i>';
                btn.style.backgroundColor = 'var(--color-red)';
                console.error('EmailJS Error:', error);
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 8000);
            });
    });
}
