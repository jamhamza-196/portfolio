/* =========================================
   MOBILE MENU TOGGLE
========================================= */
const mobileBtn = document.getElementById('mobile-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-links li a');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

/* =========================================
   STICKY NAVBAR & ACTIVE LINK HIGHLIGHT
========================================= */
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active Link Highlight
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

/* =========================================
   PORTFOLIO FILTER
========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */
function revealElements() {
    const reveals = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right, .fade-in');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; // Offset before element appears
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active-reveal');
        }
    }
}

window.addEventListener('scroll', revealElements);
// Trigger once on load
revealElements();


/* =========================================
   CONTACT FORM VALIDATION
========================================= */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // simple validation check
        const inputs = [
            document.getElementById('fName'),
            document.getElementById('lName'),
            document.getElementById('email'),
            document.getElementById('message')
        ];
        
        inputs.forEach(input => {
            const group = input.parentElement;
            if (input.value.trim() === '') {
                group.classList.add('error');
                isValid = false;
            } else {
                group.classList.remove('error');
            }
            
            // Email Check
            if (input.type === 'email' && input.value.trim() !== '') {
                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!input.value.match(emailPattern)) {
                    group.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                formSuccess.classList.add('show');
                
                // Hide success message after 4 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 4000);
            }, 1500);
        }
    });

    // Remove error class on input
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('error');
        });
    });
}
