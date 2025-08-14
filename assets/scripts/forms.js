// Form handling for DeckPatioMasters
(function() {
    'use strict';

    let currentStep = 1;
    const totalSteps = 4;
    let formData = {};

    // Initialize form functionality
    function initForms() {
        setupMultiStepForm();
        setupFormPersistence();
        setupAllForms();
    }

    // Multi-step form functionality
    function setupMultiStepForm() {
        const form = document.getElementById('leadForm');
        if (!form) return;

        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (nextBtn) nextBtn.addEventListener('click', nextStep);
        if (prevBtn) prevBtn.addEventListener('click', prevStep);
        if (submitBtn) submitBtn.addEventListener('click', submitLeadForm);

        // Load saved progress
        loadFormProgress();
        updateFormDisplay();
    }

    function nextStep() {
        if (validateCurrentStep()) {
            saveFormProgress();
            if (currentStep < totalSteps) {
                currentStep++;
                updateFormDisplay();
            }
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateFormDisplay();
        }
    }

    function updateFormDisplay() {
        // Hide all steps
        const steps = document.querySelectorAll('.form-step');
        steps.forEach(step => step.classList.remove('active'));

        // Show current step
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
        }

        // Update button visibility
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (prevBtn) {
            prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
        }

        if (nextBtn) {
            nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-flex';
        }

        if (submitBtn) {
            submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
        }
    }

    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (!currentStepElement) return false;

        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const value = field.value.trim();
            const fieldName = field.name;

            // Clear previous errors
            window.DeckPatioMasters.hideFieldError(fieldName);

            if (!value) {
                window.DeckPatioMasters.showFieldError(fieldName, 'This field is required');
                isValid = false;
                return;
            }

            // Field-specific validation
            switch (fieldName) {
                case 'email':
                    if (!window.DeckPatioMasters.validateEmail(value)) {
                        window.DeckPatioMasters.showFieldError(fieldName, 'Please enter a valid email address');
                        isValid = false;
                    }
                    break;
                case 'phone':
                    if (!window.DeckPatioMasters.validatePhone(value)) {
                        window.DeckPatioMasters.showFieldError(fieldName, 'Please enter a valid phone number');
                        isValid = false;
                    }
                    break;
                case 'zipCode':
                    if (!window.DeckPatioMasters.validateZipCode(value)) {
                        window.DeckPatioMasters.showFieldError(fieldName, 'Please enter a valid ZIP code');
                        isValid = false;
                    }
                    break;
            }
        });

        // Validate radio buttons for project type in step 1
        if (currentStep === 1) {
            const projectTypeRadios = currentStepElement.querySelectorAll('input[name="projectType"]');
            const isProjectTypeSelected = Array.from(projectTypeRadios).some(radio => radio.checked);
            
            if (!isProjectTypeSelected) {
                window.DeckPatioMasters.showToast('Please select a project type', 'error');
                isValid = false;
            }
        }

        return isValid;
    }

    // Form persistence
    function saveFormProgress() {
        const form = document.getElementById('leadForm');
        if (!form) return;

        const formData = new FormData(form);
        const data = {
            currentStep,
            fields: Object.fromEntries(formData.entries()),
            timestamp: new Date().toISOString()
        };

        window.DeckPatioMasters.saveToLocalStorage('leadFormProgress', data);
    }

    function loadFormProgress() {
        const savedData = window.DeckPatioMasters.loadFromLocalStorage('leadFormProgress');
        if (!savedData) return;

        // Don't load if data is older than 24 hours
        const savedTime = new Date(savedData.timestamp);
        const currentTime = new Date();
        const hoursDiff = (currentTime - savedTime) / (1000 * 60 * 60);

        if (hoursDiff > 24) {
            window.DeckPatioMasters.removeFromLocalStorage('leadFormProgress');
            return;
        }

        currentStep = savedData.currentStep || 1;

        // Populate form fields
        Object.entries(savedData.fields).forEach(([name, value]) => {
            const field = document.querySelector(`[name="${name}"]`);
            if (field) {
                if (field.type === 'radio') {
                    const radio = document.querySelector(`[name="${name}"][value="${value}"]`);
                    if (radio) radio.checked = true;
                } else {
                    field.value = value;
                }
            }
        });
    }

    function clearFormProgress() {
        window.DeckPatioMasters.removeFromLocalStorage('leadFormProgress');
    }

    // Form submission
    async function submitLeadForm(e) {
        e.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }

        const form = document.getElementById('leadForm');
        const submitBtn = document.getElementById('submit-btn');
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Add timestamp and form identifier
            data.formType = 'leadGeneration';
            data.timestamp = new Date().toISOString();
            data.source = 'homepage';

            // Simulate API submission
            const response = await window.DeckPatioMasters.simulateApiCall('/api/lead', data, 1500);

            if (response.success) {
                // Save lead to local storage for admin
                saveLeadToLocalStorage(data);
                
                // Clear form progress
                clearFormProgress();
                
                // Reset form
                form.reset();
                currentStep = 1;
                updateFormDisplay();
                
                // Show success modal
                const successModal = document.getElementById('success-modal');
                if (successModal) {
                    window.DeckPatioMasters.showModal(successModal);
                }
                
                // Track conversion (would integrate with analytics)
                trackConversion('lead_submitted', data);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            window.DeckPatioMasters.showToast(error.message || 'There was an error submitting your request. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Contractor quote form
    async function submitContractorQuoteForm(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Add additional data
            data.formType = 'contractorQuote';
            data.timestamp = new Date().toISOString();
            data.contractorName = document.getElementById('contractor-name')?.textContent || 'Unknown';

            // Simulate API submission
            const response = await window.DeckPatioMasters.simulateApiCall('/api/contractor-quote', data, 1000);

            if (response.success) {
                // Save quote request to local storage
                saveQuoteToLocalStorage(data);
                
                // Reset form
                form.reset();
                
                // Show success modal
                const successModal = document.getElementById('quote-success-modal');
                const contractorNameSpan = document.getElementById('modal-contractor-name');
                
                if (successModal) {
                    if (contractorNameSpan) {
                        contractorNameSpan.textContent = data.contractorName;
                    }
                    window.DeckPatioMasters.showModal(successModal);
                }
                
                // Track conversion
                trackConversion('quote_requested', data);
            }
        } catch (error) {
            console.error('Quote form submission error:', error);
            window.DeckPatioMasters.showToast(error.message || 'There was an error sending your quote request. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Contact form submission
    async function submitContactForm(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Add additional data
            data.formType = 'contact';
            data.timestamp = new Date().toISOString();

            // Simulate API submission
            const response = await window.DeckPatioMasters.simulateApiCall('/api/contact', data, 1000);

            if (response.success) {
                // Save contact message to local storage
                saveContactToLocalStorage(data);
                
                // Reset form
                form.reset();
                
                // Show success message
                window.DeckPatioMasters.showToast('Thank you for your message! We\'ll get back to you within 24 hours.', 'success', 5000);
                
                // Track conversion
                trackConversion('contact_submitted', data);
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            window.DeckPatioMasters.showToast(error.message || 'There was an error sending your message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Generic form validation
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const value = field.value.trim();
            const fieldName = field.name;

            // Clear previous errors
            clearFieldError(field);

            if (!value) {
                showFieldError(field, 'This field is required');
                isValid = false;
                return;
            }

            // Field-specific validation
            switch (field.type) {
                case 'email':
                    if (!window.DeckPatioMasters.validateEmail(value)) {
                        showFieldError(field, 'Please enter a valid email address');
                        isValid = false;
                    }
                    break;
                case 'tel':
                    if (!window.DeckPatioMasters.validatePhone(value)) {
                        showFieldError(field, 'Please enter a valid phone number');
                        isValid = false;
                    }
                    break;
            }

            // Custom validation for specific fields
            if (fieldName === 'zipCode' && !window.DeckPatioMasters.validateZipCode(value)) {
                showFieldError(field, 'Please enter a valid ZIP code');
                isValid = false;
            }
        });

        return isValid;
    }

    function showFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        field.classList.add('error');
    }

    function clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        field.classList.remove('error');
    }

    // Data storage functions
    function saveLeadToLocalStorage(data) {
        const existingLeads = window.DeckPatioMasters.loadFromLocalStorage('leads', []);
        existingLeads.push({
            ...data,
            id: Date.now(),
            status: 'new'
        });
        window.DeckPatioMasters.saveToLocalStorage('leads', existingLeads);
    }

    function saveQuoteToLocalStorage(data) {
        const existingQuotes = window.DeckPatioMasters.loadFromLocalStorage('quotes', []);
        existingQuotes.push({
            ...data,
            id: Date.now(),
            status: 'pending'
        });
        window.DeckPatioMasters.saveToLocalStorage('quotes', existingQuotes);
    }

    function saveContactToLocalStorage(data) {
        const existingContacts = window.DeckPatioMasters.loadFromLocalStorage('contacts', []);
        existingContacts.push({
            ...data,
            id: Date.now(),
            status: 'new'
        });
        window.DeckPatioMasters.saveToLocalStorage('contacts', existingContacts);
    }

    // Analytics tracking (placeholder)
    function trackConversion(event, data) {
        // This would integrate with Google Analytics, Facebook Pixel, etc.
        console.log('Conversion tracked:', event, data);
        
        // Example GA4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                custom_parameter_1: data.projectType || data.formType,
                value: 1
            });
        }
    }

    // Setup all forms
    function setupAllForms() {
        // Lead form is handled by multi-step setup
        
        // Contractor quote forms
        const contractorQuoteForms = document.querySelectorAll('#contractor-quote-form');
        contractorQuoteForms.forEach(form => {
            form.addEventListener('submit', submitContractorQuoteForm);
        });
        
        // Contact forms
        const contactForms = document.querySelectorAll('#contact-form');
        contactForms.forEach(form => {
            form.addEventListener('submit', submitContactForm);
        });
        
        // Add real-time validation for all forms
        const allForms = document.querySelectorAll('form');
        allForms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.hasAttribute('required') && this.value.trim()) {
                        clearFieldError(this);
                    }
                });
            });
        });
    }

    // Form persistence for other forms
    function setupFormPersistence() {
        const forms = document.querySelectorAll('form:not(#leadForm)');
        forms.forEach(form => {
            const formId = form.id;
            if (!formId) return;

            // Load saved data
            const savedData = window.DeckPatioMasters.loadFromLocalStorage(`form_${formId}`);
            if (savedData) {
                Object.entries(savedData.fields).forEach(([name, value]) => {
                    const field = form.querySelector(`[name="${name}"]`);
                    if (field && field.type !== 'hidden') {
                        field.value = value;
                    }
                });
            }

            // Save data on input
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', window.DeckPatioMasters.throttle(() => {
                    const formData = new FormData(form);
                    const data = {
                        fields: Object.fromEntries(formData.entries()),
                        timestamp: new Date().toISOString()
                    };
                    window.DeckPatioMasters.saveToLocalStorage(`form_${formId}`, data);
                }, 500));
            });

            // Clear on successful submission
            form.addEventListener('submit', function() {
                setTimeout(() => {
                    window.DeckPatioMasters.removeFromLocalStorage(`form_${formId}`);
                }, 2000);
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForms);
    } else {
        initForms();
    }

    // Export functions for external use
    window.DeckPatioMasters = window.DeckPatioMasters || {};
    Object.assign(window.DeckPatioMasters, {
        submitLeadForm,
        submitContractorQuoteForm,
        submitContactForm,
        validateForm,
        saveLeadToLocalStorage,
        saveQuoteToLocalStorage,
        saveContactToLocalStorage
    });

})();