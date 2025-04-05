document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.className = 'mobile-nav-overlay';
    document.body.appendChild(mobileNavOverlay);
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileNavOverlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    // Course section accordion
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (sectionHeaders.length > 0) {
        sectionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const sectionContent = this.nextElementSibling;
                this.classList.toggle('active');
                sectionContent.classList.toggle('active');
            });
        });
    }
    
    // Course tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    if (courseTabs.length > 0) {
        const tabContents = document.querySelectorAll('.tab-content');
        
        courseTabs.forEach((tab, index) => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs and contents
                courseTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (courseTabs.length > 0 && tabContents.length > 0) {
            courseTabs[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }
    
    // Cart quantity controls
    const quantityMinus = document.querySelectorAll('.quantity-minus');
    const quantityPlus = document.querySelectorAll('.quantity-plus');
    
    if (quantityMinus.length > 0) {
        quantityMinus.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.nextElementSibling;
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            });
        });
    }
    
    if (quantityPlus.length > 0) {
        quantityPlus.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                input.value = parseInt(input.value) + 1;
            });
        });
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    if (paymentMethods.length > 0) {
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    paymentMethods.forEach(m => m.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
    
    // Initialize any active payment method
    const activePaymentMethod = document.querySelector('.payment-method input[type="radio"]:checked');
    if (activePaymentMethod) {
        activePaymentMethod.closest('.payment-method').classList.add('active');
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredInputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Image preview for file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        if (input.dataset.preview) {
            const preview = document.getElementById(input.dataset.preview);
            if (preview) {
                input.addEventListener('change', function() {
                    if (this.files && this.files[0]) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            preview.src = e.target.result;
                            preview.style.display = 'block';
                        }
                        reader.readAsDataURL(this.files[0]);
                    }
                });
            }
        }
    });
});