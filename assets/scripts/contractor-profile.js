// Contractor profile page functionality
(function() {
    'use strict';

    // Get contractor ID from URL
    function getContractorId() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1;
    }

    // Sample contractor data (would typically come from API)
    const contractorProfiles = {
        1: {
            id: 1,
            name: 'Elite Deck Builders',
            avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.9,
            reviewCount: 127,
            description: 'Professional deck construction specialists with 15+ years of experience. We create custom outdoor living spaces using premium materials and expert craftsmanship.',
            services: [
                {
                    icon: '🏗️',
                    name: 'Deck Construction',
                    description: 'Custom deck building with premium materials',
                    priceRange: '$85 - $150/sq ft'
                },
                {
                    icon: '🔧',
                    name: 'Deck Repairs',
                    description: 'Professional repair and maintenance services',
                    priceRange: '$45 - $85/sq ft'
                },
                {
                    icon: '✏️',
                    name: 'Design Consultation',
                    description: 'Custom design and planning services',
                    priceRange: '$150 - $300/hour'
                }
            ],
            startingPrice: 85,
            priceUnit: 'sq ft',
            location: 'Denver, CO',
            serviceArea: 'Denver & Surrounding Areas (50 mi radius)',
            phone: '(555) 123-DECK',
            email: 'info@elitedecks.com',
            website: 'www.elitedeckbuilders.com',
            license: '#CO-123456789',
            insurance: '$2M General Liability',
            yearsExperience: 15,
            projectsCompleted: 250,
            responseTime: '2hrs',
            hours: 'Mon-Fri: 8AM-6PM<br>Sat: 9AM-4PM',
            gallery: [
                {
                    main: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
                    thumb: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=300',
                    title: 'Custom Multi-Level Deck',
                    description: '350 sq ft deck with built-in seating and lighting'
                },
                {
                    main: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                    thumb: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
                    title: 'Modern Composite Deck',
                    description: '280 sq ft composite deck with glass railings'
                },
                {
                    main: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
                    thumb: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=300',
                    title: 'Elevated Deck Design',
                    description: '420 sq ft elevated deck with pergola'
                },
                {
                    main: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
                    thumb: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=300',
                    title: 'Hardwood Deck Installation',
                    description: 'Premium hardwood deck with custom features'
                }
            ],
            reviews: [
                {
                    author: 'Sarah M.',
                    date: '3 weeks ago',
                    rating: 5,
                    content: 'Exceptional work! The team was professional, on time, and delivered exactly what we wanted. Our new deck is beautiful and has become the centerpiece of our backyard. Highly recommend!'
                },
                {
                    author: 'Mike T.',
                    date: '1 month ago',
                    rating: 5,
                    content: 'Great communication throughout the project. They kept us informed at every step and the quality of work exceeded our expectations. The deck looks amazing!'
                },
                {
                    author: 'Jennifer R.',
                    date: '2 months ago',
                    rating: 5,
                    content: 'Professional, reliable, and fair pricing. They finished the project on schedule and cleaned up thoroughly. Our family loves spending time on the new deck.'
                }
            ],
            certifications: [
                {
                    icon: '🏆',
                    title: 'Best of Denver 2024',
                    subtitle: 'HomeAdvisor Elite Service'
                },
                {
                    icon: '✅',
                    title: 'EPA Lead-Safe Certified',
                    subtitle: 'Environmental Protection'
                },
                {
                    icon: '🔒',
                    title: 'BBB A+ Rating',
                    subtitle: 'Better Business Bureau'
                }
            ]
        },
        2: {
            id: 2,
            name: 'Patio Pros Inc.',
            avatar: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.8,
            reviewCount: 95,
            description: 'Award-winning patio installation and design specialists. We transform outdoor spaces with beautiful, durable patio solutions.',
            services: [
                {
                    icon: '🏡',
                    name: 'Patio Installation',
                    description: 'Professional patio installation with quality materials',
                    priceRange: '$25 - $85/sq ft'
                },
                {
                    icon: '✏️',
                    name: 'Design Services',
                    description: 'Custom patio design and planning',
                    priceRange: '$100 - $200/hour'
                }
            ],
            startingPrice: 65,
            priceUnit: 'sq ft',
            location: 'Denver, CO',
            serviceArea: 'Denver Metro Area (30 mi radius)',
            phone: '(555) 789-PATIO',
            email: 'info@patiopros.com',
            license: '#CO-987654321',
            insurance: '$1.5M General Liability',
            yearsExperience: 12,
            projectsCompleted: 180,
            responseTime: '4hrs',
            hours: 'Mon-Fri: 7AM-5PM<br>Sat: 8AM-3PM'
        }
        // Add more contractor profiles as needed
    };

    // Initialize contractor profile page
    function initContractorProfile() {
        const contractorId = getContractorId();
        const contractor = contractorProfiles[contractorId];

        if (!contractor) {
            showNotFound();
            return;
        }

        populateContractorData(contractor);
        setupGallery(contractor.gallery);
        setupQuoteForm();
        setupReviews();
        updatePageMeta(contractor);
        
        // Check if we should focus on quote form (from URL hash)
        if (window.location.hash === '#quote') {
            setTimeout(() => {
                document.getElementById('contractor-quote-form')?.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 500);
        }
    }

    // Populate contractor data
    function populateContractorData(contractor) {
        // Basic info
        updateElement('contractor-name', contractor.name);
        updateElement('contractor-breadcrumb', contractor.name);
        updateElement('contractor-description', contractor.description);
        updateElement('starting-price', `$${contractor.startingPrice}/${contractor.priceUnit}`);
        updateElement('projects-completed', `${contractor.projectsCompleted}+`);
        updateElement('years-experience', `${contractor.yearsExperience}+`);
        updateElement('response-time', contractor.responseTime);
        updateElement('service-area', contractor.serviceArea);
        updateElement('contractor-phone', `📞 ${contractor.phone}`);
        updateElement('contractor-email', `📧 ${contractor.email}`);

        // Avatar
        const avatar = document.getElementById('contractor-avatar');
        if (avatar) {
            avatar.src = contractor.avatar;
            avatar.alt = contractor.name;
        }

        // Rating
        const ratingElement = document.getElementById('contractor-rating');
        if (ratingElement) {
            const stars = generateStars(contractor.rating);
            ratingElement.innerHTML = `
                <span class="stars">${stars}</span>
                <span class="rating-text">${contractor.rating} (${contractor.reviewCount} reviews)</span>
            `;
        }

        // Services
        populateServices(contractor.services);

        // Company details
        populateCompanyDetails(contractor);

        // Set contractor ID in quote form
        const contractorIdInput = document.getElementById('contractor-id');
        if (contractorIdInput) {
            contractorIdInput.value = contractor.id;
        }
    }

    function updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = content;
        }
    }

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        return stars;
    }

    function populateServices(services) {
        const servicesContainer = document.getElementById('contractor-services');
        if (!servicesContainer || !services) return;

        servicesContainer.innerHTML = services.map(service => `
            <div class="service-item">
                <span class="service-icon">${service.icon}</span>
                <div class="service-info">
                    <h4>${service.name}</h4>
                    <p>${service.description}</p>
                    <span class="service-price">${service.priceRange}</span>
                </div>
            </div>
        `).join('');
    }

    function populateCompanyDetails(contractor) {
        const detailsContainer = document.querySelector('.company-details');
        if (!detailsContainer) return;

        const details = [
            { label: '📍 Service Area', value: contractor.serviceArea },
            { label: '📞 Phone', value: contractor.phone },
            { label: '📧 Email', value: contractor.email },
            { label: '🕒 Hours', value: contractor.hours },
            { label: '💼 License', value: contractor.license },
            { label: '🛡️ Insurance', value: contractor.insurance }
        ];

        detailsContainer.innerHTML = details.map(detail => `
            <div class="detail-item">
                <span class="detail-label">${detail.label}</span>
                <span class="detail-value">${detail.value}</span>
            </div>
        `).join('');
    }

    // Gallery functionality
    function setupGallery(gallery) {
        if (!gallery || gallery.length === 0) return;

        const mainImage = document.getElementById('main-gallery-image');
        const mainTitle = document.getElementById('main-project-title');
        const mainDescription = document.getElementById('main-project-description');
        const thumbsContainer = document.querySelector('.gallery-thumbs');

        if (!mainImage || !thumbsContainer) return;

        // Set initial main image
        mainImage.src = gallery[0].main;
        if (mainTitle) mainTitle.textContent = gallery[0].title;
        if (mainDescription) mainDescription.textContent = gallery[0].description;

        // Create thumbnails
        thumbsContainer.innerHTML = gallery.map((item, index) => `
            <img src="${item.thumb}" 
                 alt="${item.title}" 
                 class="gallery-thumb ${index === 0 ? 'active' : ''}"
                 data-main="${item.main}"
                 data-title="${item.title}"
                 data-description="${item.description}">
        `).join('');

        // Add click handlers to thumbnails
        const thumbs = thumbsContainer.querySelectorAll('.gallery-thumb');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbs
                thumbs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumb
                this.classList.add('active');
                
                // Update main image with fade effect
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

    // Quote form setup
    function setupQuoteForm() {
        const quoteForm = document.getElementById('contractor-quote-form');
        if (!quoteForm) return;

        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());

                // Add contractor info
                const contractorId = getContractorId();
                const contractor = contractorProfiles[contractorId];
                data.contractorName = contractor?.name || 'Unknown';
                data.contractorId = contractorId;
                data.timestamp = new Date().toISOString();

                // Validate form
                if (!validateQuoteForm(data)) {
                    return;
                }

                // Simulate API submission
                const response = await window.DeckPatioMasters.simulateApiCall('/api/contractor-quote', data, 1000);

                if (response.success) {
                    // Save to localStorage
                    window.DeckPatioMasters.saveQuoteToLocalStorage(data);
                    
                    // Reset form
                    this.reset();
                    
                    // Show success modal
                    const modal = document.getElementById('quote-success-modal');
                    const contractorNameSpan = document.getElementById('modal-contractor-name');
                    
                    if (contractorNameSpan) {
                        contractorNameSpan.textContent = contractor?.name || 'the contractor';
                    }
                    
                    if (modal) {
                        window.DeckPatioMasters.showModal(modal);
                    }
                    
                    window.DeckPatioMasters.showToast('Quote request sent successfully!', 'success');
                }
            } catch (error) {
                window.DeckPatioMasters.showToast(error.message || 'Error sending quote request. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function validateQuoteForm(data) {
        const errors = [];

        if (!data.projectType) errors.push('Project type is required');
        if (!data.name || data.name.trim().length < 2) errors.push('Valid name is required');
        if (!data.phone || !window.DeckPatioMasters.validatePhone(data.phone)) errors.push('Valid phone number is required');
        if (!data.email || !window.DeckPatioMasters.validateEmail(data.email)) errors.push('Valid email address is required');

        if (errors.length > 0) {
            window.DeckPatioMasters.showToast(errors[0], 'error');
            return false;
        }

        return true;
    }

    // Reviews functionality
    function setupReviews() {
        const loadMoreBtn = document.getElementById('load-more-reviews');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreReviews);
        }
    }

    function loadMoreReviews() {
        const reviewsList = document.getElementById('reviews-list');
        const loadMoreBtn = document.getElementById('load-more-reviews');
        
        if (!reviewsList || !loadMoreBtn) return;

        // Additional reviews (would come from API)
        const additionalReviews = [
            {
                author: 'David K.',
                date: '3 months ago',
                rating: 5,
                content: 'Outstanding service from start to finish. The crew was knowledgeable, efficient, and respectful of our property. The deck turned out even better than we imagined.'
            },
            {
                author: 'Maria L.',
                date: '4 months ago',
                rating: 4,
                content: 'Very happy with our new deck. The project took a bit longer than expected due to weather, but the final result was worth the wait. Quality craftsmanship throughout.'
            },
            {
                author: 'Tom R.',
                date: '5 months ago',
                rating: 5,
                content: 'Excellent work and fair pricing. They helped us design a deck that maximized our small backyard space. The team was professional and cleaned up thoroughly each day.'
            }
        ];

        // Add new reviews
        const newReviewsHTML = additionalReviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div class="reviewer-info">
                        <strong>${review.author}</strong>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <div class="review-rating">${generateStars(review.rating)}</div>
                </div>
                <div class="review-content">
                    <p>${review.content}</p>
                </div>
            </div>
        `).join('');

        reviewsList.insertAdjacentHTML('beforeend', newReviewsHTML);
        
        // Hide load more button (or implement pagination)
        loadMoreBtn.style.display = 'none';
        
        window.DeckPatioMasters.showToast('More reviews loaded', 'success', 2000);
    }

    // Update page meta data
    function updatePageMeta(contractor) {
        const title = document.getElementById('page-title');
        const description = document.getElementById('page-description');
        const ogTitle = document.getElementById('og-title');
        const ogDescription = document.getElementById('og-description');

        if (title) {
            title.textContent = `${contractor.name} - Professional Deck & Patio Services | DeckPatioMasters`;
        }

        if (description) {
            description.content = `${contractor.name} - ${contractor.description} ${contractor.rating}-star rating with ${contractor.reviewCount}+ reviews. Get free quotes.`;
        }

        if (ogTitle) {
            ogTitle.content = `${contractor.name} - Professional Deck & Patio Services`;
        }

        if (ogDescription) {
            ogDescription.content = `${contractor.description} ${contractor.rating}-star rating with ${contractor.reviewCount}+ reviews.`;
        }

        // Update JSON-LD structured data
        const businessSchema = document.getElementById('business-schema');
        if (businessSchema) {
            const schemaData = {
                "@context": "https://schema.org",
                "@type": "HomeAndConstructionBusiness",
                "name": contractor.name,
                "image": contractor.avatar,
                "description": contractor.description,
                "telephone": contractor.phone,
                "url": `https://deckpatiomasters.com/contractor-profile.html?id=${contractor.id}`,
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": contractor.rating.toString(),
                    "reviewCount": contractor.reviewCount.toString()
                },
                "priceRange": `$${contractor.startingPrice}-200 per sq ft`
            };
            
            businessSchema.textContent = JSON.stringify(schemaData);
        }
    }

    // Show not found message
    function showNotFound() {
        const mainContent = document.querySelector('.profile-content .container');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="not-found-container" style="text-align: center; padding: 4rem 2rem;">
                    <h2>Contractor Not Found</h2>
                    <p>The contractor you're looking for doesn't exist or may have been removed.</p>
                    <a href="contractors.html" class="btn btn-primary">Browse All Contractors</a>
                </div>
            `;
        }
    }

    // Call/Email buttons functionality
    function setupContactButtons() {
        const callBtn = document.getElementById('call-contractor');
        const requestQuoteBtn = document.getElementById('request-quote');

        if (callBtn) {
            callBtn.addEventListener('click', function() {
                const contractorId = getContractorId();
                const contractor = contractorProfiles[contractorId];
                if (contractor && contractor.phone) {
                    // Format phone number for tel: link
                    const phoneNumber = contractor.phone.replace(/[^\d]/g, '');
                    window.location.href = `tel:+1${phoneNumber}`;
                }
            });
        }

        if (requestQuoteBtn) {
            requestQuoteBtn.addEventListener('click', function() {
                const quoteForm = document.getElementById('contractor-quote-form');
                if (quoteForm) {
                    quoteForm.scrollIntoView({ behavior: 'smooth' });
                    
                    // Focus on first input after scroll
                    setTimeout(() => {
                        const firstInput = quoteForm.querySelector('select, input');
                        if (firstInput) firstInput.focus();
                    }, 500);
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initContractorProfile();
            setupContactButtons();
        });
    } else {
        initContractorProfile();
        setupContactButtons();
    }

    // Export for external use
    window.DeckPatioMasters = window.DeckPatioMasters || {};
    Object.assign(window.DeckPatioMasters, {
        contractorProfiles,
        initContractorProfile
    });

})();