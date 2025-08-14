// Main JavaScript functionality for DeckPatioMasters
(function() {
    'use strict';

    // DOM Elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const floatingCTA = document.getElementById('floating-cta');

    // Initialize the application
    function init() {
        setupNavigation();
        setupSmoothScrolling();
        setupFloatingCTA();
        setupModals();
        setupImageLazyLoading();
        
        // Initialize page-specific functionality
        const pathname = window.location.pathname;
        if (pathname.includes('contractor-profile.html')) {
            setupGallery();
        }
    }

    // Navigation functionality
    function setupNavigation() {
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', toggleMobileMenu);
            
            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideNav = navMenu.contains(event.target);
                const isClickOnHamburger = hamburger.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
        
        // Update active nav link based on current page
        updateActiveNavLink();
    }

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        const anchorsLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            });
        });
    }

    // Floating CTA visibility on mobile
    function setupFloatingCTA() {
        if (!floatingCTA) return;
        
        let lastScrollTop = 0;
        const showThreshold = 500; // Show after scrolling 500px
        
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show/hide based on scroll position and direction
            if (scrollTop > showThreshold && scrollTop > lastScrollTop) {
                floatingCTA.style.opacity = '1';
                floatingCTA.style.visibility = 'visible';
                floatingCTA.style.transform = 'translateY(0)';
            } else if (scrollTop < lastScrollTop - 50) {
                floatingCTA.style.opacity = '0';
                floatingCTA.style.visibility = 'hidden';
                floatingCTA.style.transform = 'translateY(20px)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, 100));
    }

    // Modal functionality
    function setupModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.modal-close');
            const okBtn = modal.querySelector('#modal-ok, #quote-modal-ok');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => closeModal(modal));
            }
            
            if (okBtn) {
                okBtn.addEventListener('click', () => closeModal(modal));
            }
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    closeModal(activeModal);
                }
            }
        });
    }

    function showModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus the modal for accessibility
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Gallery functionality for contractor profiles
    function setupGallery() {
        const galleryThumbs = document.querySelectorAll('.gallery-thumb');
        const mainImage = document.getElementById('main-gallery-image');
        const mainTitle = document.getElementById('main-project-title');
        const mainDescription = document.getElementById('main-project-description');
        
        if (!galleryThumbs.length || !mainImage) return;
        
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbs
                galleryThumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumb
                this.classList.add('active');
                
                // Update main image with animation
                mainImage.style.opacity = '0.5';
                
                setTimeout(() => {
                    mainImage.src = this.dataset.main;
                    if (mainTitle) mainTitle.textContent = this.dataset.title;
                    if (mainDescription) mainDescription.textContent = this.dataset.description;
                    
                    mainImage.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Lazy loading for images
    function setupImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Form validation utilities
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[\s\-\.\(\)]?[0-9][\s\-\.\(\)0-9]{8,15}$/;
        return phoneRegex.test(phone);
    }

    function validateZipCode(zipCode) {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(zipCode);
    }

    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    function hideFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    // Utility functions
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // API simulation utilities
    function simulateApiCall(endpoint, data, delay = 1000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional failures
                if (Math.random() > 0.9) {
                    reject(new Error('Network error. Please try again.'));
                    return;
                }
                
                // Simulate successful response
                resolve({
                    success: true,
                    message: 'Request processed successfully',
                    data: data,
                    timestamp: new Date().toISOString()
                });
            }, delay);
        });
    }

    // Toast notification system
    function showToast(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        // Add toast styles if not already present
        if (!document.getElementById('toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 9999;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    padding: 16px;
                    min-width: 300px;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .toast.toast-success {
                    border-left: 4px solid #22C55E;
                }
                .toast.toast-error {
                    border-left: 4px solid #EF4444;
                }
                .toast.show {
                    transform: translateX(0);
                }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .toast-message {
                    color: #374151;
                    font-weight: 500;
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(toast);
        
        // Show toast
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Remove toast after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    // Local storage utilities
    function saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    function loadFromLocalStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return defaultValue;
        }
    }

    function removeFromLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    // Export functions for use in other scripts
    window.DeckPatioMasters = {
        showModal,
        closeModal,
        validateEmail,
        validatePhone,
        validateZipCode,
        showFieldError,
        hideFieldError,
        simulateApiCall,
        showToast,
        saveToLocalStorage,
        loadFromLocalStorage,
        removeFromLocalStorage,
        throttle,
        debounce
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();