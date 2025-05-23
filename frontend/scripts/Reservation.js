// Initialisation du preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                preloader.style.display = 'none';
            }
        });
    }
});

// Gestion du menu mobile
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

// Animation au scroll
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// Variables CSS
document.documentElement.style.setProperty('--primary-color', '#b89f7a');
document.documentElement.style.setProperty('--primary-dark', '#9c8665');
document.documentElement.style.setProperty('--light-color', '#ffffff');
document.documentElement.style.setProperty('--dark-color', '#1a1a1a');
document.documentElement.style.setProperty('--text-light', '#6e6e6e');