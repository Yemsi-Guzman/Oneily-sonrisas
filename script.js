// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    initMobileNavigation();
    initStickyHeader();
    initSmoothScrolling();
    initTestimonialsSlider();
    initContactForm();
    initScrollAnimations();
    initServiceCards();
    initGalleryItems();
    updateActiveNavLink();
    setMinimumDate();
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Sticky Header
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }

        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and dot
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
        testimonialSlider.addEventListener('mouseleave', startAutoSlide);
    }
}

// Contact Form Validation and Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;
    
    // Get form fields
    const nombre = form.querySelector('#nombre');
    const email = form.querySelector('#email');
    const telefono = form.querySelector('#telefono');
    const servicio = form.querySelector('#servicio');
    const fecha = form.querySelector('#fecha');
    
    // Validate name
    if (!validateField(nombre)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateField(email)) {
        isValid = false;
    }
    
    // Validate phone
    if (!validateField(telefono)) {
        isValid = false;
    }
    
    // Validate service
    if (!validateField(servicio)) {
        isValid = false;
    }
    
    // Validate date
    if (!validateField(fecha)) {
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const fieldGroup = field.closest('.form-group');
    const errorMessage = fieldGroup.querySelector('.error-message');
    let isValid = true;
    let message = '';
    
    // Clear previous errors
    fieldGroup.classList.remove('error');
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'Este campo es obligatorio';
    }
    
    // Specific field validations
    if (field.value.trim()) {
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    message = 'Ingresa un email válido';
                }
                break;
                
            case 'tel':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    message = 'Ingresa un número de teléfono válido';
                }
                break;
                
            case 'date':
                const selectedDate = new Date(field.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    isValid = false;
                    message = 'Selecciona una fecha futura';
                }
                break;
                
            case 'text':
                if (field.id === 'nombre' && field.value.length < 2) {
                    isValid = false;
                    message = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
        }
    }
    
    // Show/hide error
    if (!isValid) {
        fieldGroup.classList.add('error');
        errorMessage.textContent = message;
    }
    
    return isValid;
}

function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    fieldGroup.classList.remove('error');
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('¡Cita agendada exitosamente! Te contactaremos pronto.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Clear any validation errors
        const errorFields = form.querySelectorAll('.form-group.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }, 2000);
}

function setMinimumDate() {
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formattedDate = tomorrow.toISOString().split('T')[0];
        fechaInput.setAttribute('min', formattedDate);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-large);
        z-index: 10000;
        transform: translateX(400px);
        transition: var(--transition);
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .credential, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Service Cards Interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            showServiceDetails(serviceName);
        });
    });
}

function showServiceDetails(serviceName) {
    showNotification(`Para más información sobre ${serviceName}, contáctanos usando el formulario.`, 'info');
}

// Gallery Items Interaction
function initGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.gallery-overlay h4')?.textContent || 'Imagen';
            showNotification(`Galería: ${title}`, 'info');
        });
    });
}

// Utility Functions
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

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
    // Handle errors gracefully without breaking the user experience
});

// Page Visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations and intervals when page is not visible
        document.querySelectorAll('.testimonials-slider').forEach(slider => {
            slider.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        document.querySelectorAll('.testimonials-slider').forEach(slider => {
            slider.style.animationPlayState = 'running';
        });
    }
});

// Accessibility Improvements
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add ARIA labels where needed
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim() || button.innerHTML.trim();
            if (text) {
                button.setAttribute('aria-label', text.replace(/<[^>]*>/g, ''));
            }
        }
    });
}

// Initialize accessibility features
initAccessibility();

// Smooth loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loading');
});

// Console welcome message
console.log(`
🦷 Oneily Sonrisas - Website Loaded Successfully! 🦷
Desarrollado para la Dra. Oneily Linarez
Visit us for your dental health needs!
`);
