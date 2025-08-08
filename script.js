// Research Helpdesk - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initScrollToTop();
    initContactForm();
    initAnimations();
    initParallax();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        updateThemeIcon(themeToggle, true);
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(themeToggle, isDark);
        
        // Add transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(toggle, isDark) {
    const icon = toggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Update icon
        const icon = mobileToggle.querySelector('i');
        const isOpen = navMenu.classList.contains('active');
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });
    
    // Close menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Top Functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const fileInput = document.getElementById('attachments');
    const fileList = document.getElementById('fileList');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    let attachedFiles = [];
    
    // Handle file uploads
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        attachedFiles = [...attachedFiles, ...files];
        updateFileList();
    });
    
    function updateFileList() {
        fileList.innerHTML = '';
        
        if (attachedFiles.length > 0) {
            fileList.innerHTML = '<h4>Attached Files:</h4>';
            
            attachedFiles.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <div class="file-info">
                        <i class="fas fa-file"></i>
                        <div>
                            <p class="file-name">${file.name}</p>
                            <p class="file-size">${formatFileSize(file.size)}</p>
                        </div>
                    </div>
                    <button type="button" class="remove-file" data-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                fileList.appendChild(fileItem);
            });
            
            // Add event listeners for remove buttons
            const removeButtons = fileList.querySelectorAll('.remove-file');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    attachedFiles.splice(index, 1);
                    updateFileList();
                });
            });
        }
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Update submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission (replace with actual implementation)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            contactForm.reset();
            attachedFiles = [];
            updateFileList();
        } catch (error) {
            // Error
            showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Animation on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.service-card, .process-step, .feature, .achievement');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Parallax Effect for Background Elements
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-img, .floating-shapes, .morphing-shapes');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Newsletter Subscription
document.querySelector('.newsletter-form button').addEventListener('click', function(e) {
    e.preventDefault();
    const emailInput = document.querySelector('.newsletter-form input');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Simulate subscription
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        emailInput.value = '';
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .file-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        background: rgba(241, 245, 249, 0.5);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        margin-bottom: 0.5rem;
    }
    
    .dark .file-item {
        background: rgba(30, 41, 59, 0.5);
    }
    
    .file-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .file-info i {
        color: var(--primary);
    }
    
    .file-name {
        font-weight: 500;
        font-size: 0.875rem;
        margin: 0;
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .file-size {
        font-size: 0.75rem;
        color: var(--muted-foreground);
        margin: 0;
    }
    
    .remove-file {
        background: none;
        border: none;
        color: var(--muted-foreground);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: color 0.3s ease;
    }
    
    .remove-file:hover {
        color: #ef4444;
    }
`;

document.head.appendChild(notificationStyles);

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = 'none';
    }
    
    // Dark mode header
    if (document.body.classList.contains('dark')) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    }
});

// Service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Process step hover effects
document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.transform = 'translateX(-50%) scale(1.1)';
        stepNumber.style.background = 'var(--accent)';
    });
    
    step.addEventListener('mouseleave', function() {
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.transform = 'translateX(-50%) scale(1)';
        stepNumber.style.background = 'var(--primary)';
    });
});

// Dynamic background particles
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: 100%;
        z-index: -1;
    `;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle);
        }
    }, 30000);
}

// Add particle animation CSS
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Create particles periodically
setInterval(createFloatingParticle, 3000);

console.log('Research Helpdesk - Website loaded successfully! 🚀');