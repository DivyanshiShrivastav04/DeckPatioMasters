// Contractors page functionality
(function() {
    'use strict';

    // Sample contractor data
    const contractorsData = [
        {
            id: 1,
            name: 'Elite Deck Builders',
            avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.9,
            reviewCount: 127,
            services: ['Deck Construction', 'Repairs'],
            startingPrice: 85,
            priceUnit: 'sq ft',
            location: 'Denver, CO',
            distance: '5 miles',
            licensed: true,
            insured: true,
            yearsExperience: 15,
            projectsCompleted: 250,
            responseTime: '2 hours',
            specialties: ['deck-construction', 'repairs'],
            description: 'Professional deck construction specialists with 15+ years of experience.',
            badges: ['Licensed', 'Insured', 'Background Checked']
        },
        {
            id: 2,
            name: 'Patio Pros Inc.',
            avatar: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.8,
            reviewCount: 95,
            services: ['Patio Installation', 'Design'],
            startingPrice: 65,
            priceUnit: 'sq ft',
            location: 'Denver, CO',
            distance: '8 miles',
            licensed: true,
            insured: true,
            yearsExperience: 12,
            projectsCompleted: 180,
            responseTime: '4 hours',
            specialties: ['patio-installation', 'design'],
            description: 'Award-winning patio installation and design specialists.',
            badges: ['Licensed', 'Insured', 'EPA Certified']
        },
        {
            id: 3,
            name: 'Outdoor Living Experts',
            avatar: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.7,
            reviewCount: 203,
            services: ['Complete Outdoor Spaces'],
            startingPrice: 75,
            priceUnit: 'sq ft',
            location: 'Denver, CO',
            distance: '12 miles',
            licensed: true,
            insured: true,
            yearsExperience: 20,
            projectsCompleted: 400,
            responseTime: '3 hours',
            specialties: ['deck-construction', 'patio-installation', 'design'],
            description: 'Complete outdoor living transformation specialists.',
            badges: ['Licensed', 'Insured', 'Award Winner']
        },
        {
            id: 4,
            name: 'Mountain View Decks',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.9,
            reviewCount: 156,
            services: ['Custom Decks', 'Pergolas'],
            startingPrice: 95,
            priceUnit: 'sq ft',
            location: 'Boulder, CO',
            distance: '25 miles',
            licensed: true,
            insured: true,
            yearsExperience: 18,
            projectsCompleted: 300,
            responseTime: '1 hour',
            specialties: ['deck-construction', 'design'],
            description: 'Luxury deck and pergola specialists serving the Boulder area.',
            badges: ['Licensed', 'Insured', 'Premium Service']
        },
        {
            id: 5,
            name: 'Affordable Patios Plus',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.6,
            reviewCount: 89,
            services: ['Budget Patios', 'Repairs'],
            startingPrice: 45,
            priceUnit: 'sq ft',
            location: 'Aurora, CO',
            distance: '15 miles',
            licensed: true,
            insured: true,
            yearsExperience: 8,
            projectsCompleted: 120,
            responseTime: '6 hours',
            specialties: ['patio-installation', 'repairs'],
            description: 'Quality patio solutions at affordable prices.',
            badges: ['Licensed', 'Insured']
        },
        {
            id: 6,
            name: 'Premier Outdoor Construction',
            avatar: 'https://images.pexels.com/photos/1516930/pexels-photo-1516930.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.8,
            reviewCount: 174,
            services: ['High-end Decks', 'Outdoor Kitchens'],
            startingPrice: 120,
            priceUnit: 'sq ft',
            location: 'Denver, CO',
            distance: '7 miles',
            licensed: true,
            insured: true,
            yearsExperience: 22,
            projectsCompleted: 350,
            responseTime: '2 hours',
            specialties: ['deck-construction', 'design'],
            description: 'Luxury outdoor construction and design services.',
            badges: ['Licensed', 'Insured', 'Luxury Specialist']
        },
        {
            id: 7,
            name: 'Rocky Mountain Outdoor',
            avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.7,
            reviewCount: 98,
            services: ['Deck & Patio Combo'],
            startingPrice: 80,
            priceUnit: 'sq ft',
            location: 'Lakewood, CO',
            distance: '18 miles',
            licensed: true,
            insured: true,
            yearsExperience: 14,
            projectsCompleted: 200,
            responseTime: '4 hours',
            specialties: ['deck-construction', 'patio-installation'],
            description: 'Specialists in combined deck and patio projects.',
            badges: ['Licensed', 'Insured', 'Combo Specialist']
        },
        {
            id: 8,
            name: 'Quick Fix Outdoor Repair',
            avatar: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.5,
            reviewCount: 67,
            services: ['Repairs & Maintenance'],
            startingPrice: 55,
            priceUnit: 'hour',
            location: 'Westminster, CO',
            distance: '20 miles',
            licensed: true,
            insured: true,
            yearsExperience: 10,
            projectsCompleted: 500,
            responseTime: '1 hour',
            specialties: ['repairs'],
            description: 'Fast and reliable outdoor repair services.',
            badges: ['Licensed', 'Insured', 'Same Day Service']
        }
    ];

    let currentPage = 1;
    const contractorsPerPage = 6;
    let filteredContractors = [...contractorsData];
    let currentFilters = {};

    // Initialize contractors page
    function initContractors() {
        setupSearchForm();
        setupFilters();
        setupSorting();
        setupPagination();
        
        // Initial render
        renderContractors();
        updateResultsInfo();
    }

    // Search form setup
    function setupSearchForm() {
        const searchForm = document.getElementById('contractor-search-form');
        if (!searchForm) return;

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });

        // Real-time filtering
        const locationInput = searchForm.querySelector('#location');
        const serviceSelect = searchForm.querySelector('#service');
        const radiusSelect = searchForm.querySelector('#radius');
        const ratingSelect = searchForm.querySelector('#min-rating');
        const licensedCheckbox = searchForm.querySelector('#licensed');
        const insuredCheckbox = searchForm.querySelector('#insured');

        if (locationInput) {
            locationInput.addEventListener('input', window.DeckPatioMasters.debounce(applyFilters, 500));
        }
        
        [serviceSelect, radiusSelect, ratingSelect, licensedCheckbox, insuredCheckbox].forEach(element => {
            if (element) {
                element.addEventListener('change', applyFilters);
            }
        });

        // Clear filters
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearAllFilters);
        }
    }

    // Apply filters
    function applyFilters() {
        const form = document.getElementById('contractor-search-form');
        if (!form) return;

        const formData = new FormData(form);
        currentFilters = {
            location: formData.get('location') || '',
            service: formData.get('service') || '',
            radius: formData.get('radius') || '25',
            minRating: parseFloat(formData.get('minRating')) || 0,
            licensed: formData.get('licensed') === 'on',
            insured: formData.get('insured') === 'on'
        };

        filterContractors();
        currentPage = 1; // Reset to first page
        renderContractors();
        updateResultsInfo();
        showLoadingState();
    }

    function filterContractors() {
        filteredContractors = contractorsData.filter(contractor => {
            // Location filter (basic simulation)
            if (currentFilters.location && currentFilters.location.length > 2) {
                const locationMatch = contractor.location.toLowerCase().includes(currentFilters.location.toLowerCase()) ||
                                    contractor.name.toLowerCase().includes(currentFilters.location.toLowerCase());
                if (!locationMatch) return false;
            }

            // Service filter
            if (currentFilters.service) {
                if (!contractor.specialties.includes(currentFilters.service)) return false;
            }

            // Rating filter
            if (currentFilters.minRating > 0) {
                if (contractor.rating < currentFilters.minRating) return false;
            }

            // Licensed filter
            if (currentFilters.licensed && !contractor.licensed) return false;

            // Insured filter
            if (currentFilters.insured && !contractor.insured) return false;

            return true;
        });
    }

    function clearAllFilters() {
        const form = document.getElementById('contractor-search-form');
        if (!form) return;

        form.reset();
        
        // Reset checkboxes to checked state (default)
        const licensedCheckbox = form.querySelector('#licensed');
        const insuredCheckbox = form.querySelector('#insured');
        
        if (licensedCheckbox) licensedCheckbox.checked = true;
        if (insuredCheckbox) insuredCheckbox.checked = true;

        currentFilters = {};
        filteredContractors = [...contractorsData];
        currentPage = 1;
        renderContractors();
        updateResultsInfo();
    }

    // Sorting setup
    function setupSorting() {
        const sortSelect = document.getElementById('sort-by');
        if (!sortSelect) return;

        sortSelect.addEventListener('change', function() {
            sortContractors(this.value);
            renderContractors();
        });
    }

    function sortContractors(sortBy) {
        filteredContractors.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'reviews':
                    return b.reviewCount - a.reviewCount;
                case 'price-low':
                    return a.startingPrice - b.startingPrice;
                case 'price-high':
                    return b.startingPrice - a.startingPrice;
                case 'distance':
                    return parseFloat(a.distance) - parseFloat(b.distance);
                default:
                    return b.rating - a.rating;
            }
        });
    }

    // Render contractors
    function renderContractors() {
        const grid = document.getElementById('contractors-grid');
        if (!grid) return;

        const startIndex = (currentPage - 1) * contractorsPerPage;
        const endIndex = startIndex + contractorsPerPage;
        const pageContractors = filteredContractors.slice(startIndex, endIndex);

        if (pageContractors.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No contractors found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                    <button class="btn btn-primary" onclick="clearAllFilters()">Clear Filters</button>
                </div>
            `;
            return;
        }

        grid.innerHTML = pageContractors.map(contractor => createContractorCard(contractor)).join('');
    }

    function createContractorCard(contractor) {
        const starsHTML = generateStars(contractor.rating);
        const badgesHTML = contractor.badges.map(badge => 
            `<span class="contractor-badge">${badge}</span>`
        ).join('');

        return `
            <div class="contractor-card glass-card" data-contractor-id="${contractor.id}">
                <div class="contractor-avatar">
                    <img src="${contractor.avatar}" alt="${contractor.name}" loading="lazy">
                </div>
                <div class="contractor-info">
                    <h4>${contractor.name}</h4>
                    <div class="rating">
                        <span class="stars">${starsHTML}</span>
                        <span class="rating-text">${contractor.rating} (${contractor.reviewCount} reviews)</span>
                    </div>
                    <div class="contractor-badges">
                        ${badgesHTML}
                    </div>
                    <p class="contractor-services">${contractor.services.join(', ')}</p>
                    <div class="contractor-price">Starting at $${contractor.startingPrice}/${contractor.priceUnit}</div>
                    <div class="contractor-location">📍 ${contractor.location} • ${contractor.distance} away</div>
                </div>
                <div class="contractor-actions">
                    <a href="contractor-profile.html?id=${contractor.id}" class="btn btn-outline">View Profile</a>
                    <button class="btn btn-primary" onclick="requestQuote(${contractor.id})">Request Quote</button>
                </div>
            </div>
        `;
    }

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }

        if (hasHalfStar && fullStars < 5) {
            stars += '⭐'; // Using full star for simplicity
        }

        return stars;
    }

    // Pagination setup
    function setupPagination() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderContractors();
                    updatePagination();
                    scrollToTop();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(filteredContractors.length / contractorsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderContractors();
                    updatePagination();
                    scrollToTop();
                }
            });
        }

        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredContractors.length / contractorsPerPage);
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageNumbers = document.getElementById('page-numbers');

        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }

        // Update page numbers
        if (pageNumbers) {
            let numbersHTML = '';
            
            // Always show first page
            numbersHTML += `<button class="page-number ${currentPage === 1 ? 'active' : ''}" onclick="goToPage(1)">1</button>`;
            
            if (totalPages > 1) {
                // Show dots if there's a gap
                if (currentPage > 3) {
                    numbersHTML += '<span class="page-dots">...</span>';
                }
                
                // Show current page and neighbors
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                
                for (let i = start; i <= end; i++) {
                    numbersHTML += `<button class="page-number ${currentPage === i ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
                }
                
                // Show dots before last page
                if (currentPage < totalPages - 2) {
                    numbersHTML += '<span class="page-dots">...</span>';
                }
                
                // Always show last page
                if (totalPages > 1) {
                    numbersHTML += `<button class="page-number ${currentPage === totalPages ? 'active' : ''}" onclick="goToPage(${totalPages})">${totalPages}</button>`;
                }
            }
            
            pageNumbers.innerHTML = numbersHTML;
        }
    }

    // Global function for page navigation
    window.goToPage = function(page) {
        currentPage = page;
        renderContractors();
        updatePagination();
        scrollToTop();
    };

    function scrollToTop() {
        const contractorsGrid = document.getElementById('contractors-grid');
        if (contractorsGrid) {
            contractorsGrid.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update results information
    function updateResultsInfo() {
        const resultsCount = document.getElementById('results-count');
        const resultsLocation = document.getElementById('results-location');

        if (resultsCount) {
            const total = filteredContractors.length;
            const text = total === 1 ? 'contractor found' : 'contractors found';
            resultsCount.textContent = `${total} ${text}`;
        }

        if (resultsLocation) {
            const location = currentFilters.location || 'Denver, CO area';
            resultsLocation.textContent = `in ${location}`;
        }
    }

    // Show loading state
    function showLoadingState() {
        const grid = document.getElementById('contractors-grid');
        const loadingSkeleton = document.getElementById('loading-skeleton');
        
        if (grid && loadingSkeleton) {
            loadingSkeleton.style.display = 'block';
            
            setTimeout(() => {
                loadingSkeleton.style.display = 'none';
            }, 800);
        }
    }

    // Request quote functionality
    window.requestQuote = function(contractorId) {
        const contractor = contractorsData.find(c => c.id === contractorId);
        if (!contractor) return;

        // Store contractor info for the quote form
        sessionStorage.setItem('selectedContractor', JSON.stringify(contractor));
        
        // Redirect to contractor profile with quote focus
        window.location.href = `contractor-profile.html?id=${contractorId}#quote`;
    };

    // Search suggestions (basic implementation)
    function setupSearchSuggestions() {
        const locationInput = document.getElementById('location');
        if (!locationInput) return;

        const suggestions = [
            'Denver, CO',
            'Boulder, CO',
            'Aurora, CO',
            'Lakewood, CO',
            'Westminster, CO',
            'Arvada, CO',
            'Thornton, CO',
            'Centennial, CO'
        ];

        let suggestionsContainer;

        locationInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            
            if (!suggestionsContainer) {
                suggestionsContainer = document.createElement('div');
                suggestionsContainer.className = 'search-suggestions';
                locationInput.parentNode.appendChild(suggestionsContainer);
            }

            if (value.length < 2) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            const matches = suggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(value)
            );

            if (matches.length > 0) {
                suggestionsContainer.innerHTML = matches.map(match => 
                    `<div class="suggestion-item" onclick="selectLocation('${match}')">${match}</div>`
                ).join('');
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!locationInput.contains(e.target) && suggestionsContainer) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    window.selectLocation = function(location) {
        const locationInput = document.getElementById('location');
        if (locationInput) {
            locationInput.value = location;
            applyFilters();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContractors);
    } else {
        initContractors();
    }

    // Export functions for external use
    window.DeckPatioMasters = window.DeckPatioMasters || {};
    Object.assign(window.DeckPatioMasters, {
        contractorsData,
        filterContractors,
        renderContractors,
        requestQuote: window.requestQuote
    });

})();

// Add CSS for search suggestions
if (!document.getElementById('contractors-search-styles')) {
    const styles = document.createElement('style');
    styles.id = 'contractors-search-styles';
    styles.textContent = `
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #E5E7EB;
            border-top: none;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 100;
            display: none;
        }
        
        .suggestion-item {
            padding: 12px;
            cursor: pointer;
            transition: background-color 0.15s ease;
        }
        
        .suggestion-item:hover {
            background-color: #F3F4F6;
        }
        
        .suggestion-item:last-child {
            border-radius: 0 0 8px 8px;
        }
        
        .search-group {
            position: relative;
        }
        
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            color: #6B7280;
        }
        
        .no-results-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        .no-results h3 {
            margin-bottom: 0.5rem;
            color: #374151;
        }
        
        .no-results p {
            margin-bottom: 2rem;
        }
    `;
    document.head.appendChild(styles);
}