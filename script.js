
document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('preloader-hidden');
            
            preloader.addEventListener('transitionend', function() {
                document.body.removeChild(preloader);
            });
        }, 1500);
    });

    // Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .suite-btn, .menu-btn, .book-btn, .slide-prev, .slide-next');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('cursor-active');
                cursorFollower.classList.add('cursor-follower-active');
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('cursor-active');
                cursorFollower.classList.remove('cursor-follower-active');
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLines = document.querySelectorAll('.menu-line');
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuLines.forEach(line => line.classList.toggle('active'));
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero slider
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 6000);
    
    heroSlider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 6000);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuLines.forEach(line => line.classList.remove('active'));
            }
        });
    });

 // Animation améliorée avec gestion des erreurs et effets plus fluides
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Text splitting animation avec vérification plus robuste
        if (typeof Splitting === 'function') {
            const splittingResult = Splitting({
                target: document.querySelectorAll('[data-splitting]'),
                by: 'chars',
                key: null
            });

            // Animation des caractères avec GSAP pour plus de fluidité
            if (typeof gsap !== 'undefined') {
                splittingResult.forEach(split => {
                    gsap.from(split.chars, {
                        duration: 0.8,
                        y: 30,
                        opacity: 0,
                        stagger: {
                            amount: 0.6,
                            from: 'random'
                        },
                        ease: 'back.out(1.2)',
                        delay: 0.2
                    });
                });
            }
        }

        // GSAP animations avec configuration optimisée
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Configuration globale des animations
            gsap.config({
                nullTargetWarn: false,
                force3D: true
            });

            // Animation du hero avec effet de cascade amélioré
            const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
            heroTimeline
                .from('.hero-title .char', {
                    y: 80,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.03,
                    rotationX: -90,
                    transformOrigin: '50% 50% -50px'
                })
                .from('.hero-subtitle', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8
                }, '-=0.6')
                .from('.hero-scroll', {
                    y: 20,
                    opacity: 0,
                    duration: 0.6
                }, '-=0.4');

            // Animation des sections avec ScrollTrigger
            const sections = [
                {
                    selector: '.about-content',
                    animation: { 
                        x: -80,
                        opacity: 0,
                        duration: 1.2
                    }
                },
                {
                    selector: '.about-image',
                    animation: {
                        x: 80,
                        opacity: 0,
                        duration: 1.2,
                        delay: 0.3
                    }
                },
                {
                    selector: '.suites-slider',
                    animation: {
                        y: 100,
                        opacity: 0,
                        duration: 1,
                        ease: 'elastic.out(1, 0.5)'
                    }
                },
                {
                    selector: '.experiences .section-header',
                    animation: {
                        y: 60,
                        opacity: 0,
                        duration: 0.8
                    }
                },
                {
                    selector: '.experience-item',
                    animation: {
                        y: 80,
                        opacity: 0,
                        duration: 0.9,
                        stagger: 0.15,
                        ease: 'back.out(1.2)'
                    }
                },
                {
                    selector: '.gallery-item',
                    animation: {
                        y: 60,
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.7,
                        stagger: {
                            amount: 0.6,
                            grid: 'auto',
                            from: 'center'
                        }
                    }
                },
                {
                    selector: '.contact-content',
                    animation: {
                        x: -100,
                        opacity: 0,
                        duration: 1.1
                    }
                },
                {
                    selector: '.contact-form',
                    animation: {
                        x: 100,
                        opacity: 0,
                        duration: 1.1,
                        delay: 0.2
                    }
                }
            ];

            sections.forEach(section => {
                gsap.from(section.selector, {
                    scrollTrigger: {
                        trigger: section.selector,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                        markers: false // À désactiver en production
                    },
                    ...section.animation
                });
            });
            

            // Animation spéciale pour les éléments avec data-animate
            gsap.utils.toArray('[data-animate]').forEach(el => {
                const animationType = el.dataset.animate || 'fadeInUp';
                const delay = parseFloat(el.dataset.delay) || 0;
                
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: animationType.includes('Up') ? 50 : 0,
                    x: animationType.includes('Left') ? -50 : 
                       animationType.includes('Right') ? 50 : 0,
                    opacity: 0,
                    duration: 0.8,
                    delay: delay,
                    ease: 'power3.out'
                });
            });

            // Effet parallaxe amélioré pour certains éléments
            gsap.utils.toArray('[data-parallax]').forEach(el => {
                const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
                
                gsap.to(el, {
                    yPercent: 15 * speed,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }

    } catch (error) {
        console.error('Animation error:', error);
        // Fallback pour les utilisateurs sans JS ou en cas d'erreur
        document.body.classList.add('no-animations');
    }
});

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Merci pour votre message. Nous vous contacterons bientôt.');
            
            // Reset form
            this.reset();
        });
    }
});

// Classe pour l'effet d'étoiles dorées
class GoldenStarsEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createStars();
        this.animate();
        this.handleResize();
    }

    setupCanvas() {
        this.canvas.classList.add('stars-canvas');
        document.querySelector('.hero').appendChild(this.canvas);
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);

        for (let i = 0; i < numberOfStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                twinkleSpeed: Math.random() * 0.05 + 0.01,
                angle: Math.random() * Math.PI * 2,
                opacity: Math.random(),
                hue: Math.random() * 30 + 40 // Variation de couleur dorée
            });
        }
    }

    drawStar(star) {
        const gradient = this.ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 2
        );

        const opacity = (Math.sin(star.angle) + 1) / 2 * star.opacity;
        const color = `hsla(${star.hue}, 80%, 50%, ${opacity})`;
        const colorFade = `hsla(${star.hue}, 80%, 50%, 0)`;

        gradient.addColorStop(0, color);
        gradient.addColorStop(1, colorFade);

        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Effet de rayons
        this.ctx.save();
        this.ctx.translate(star.x, star.y);
        this.ctx.rotate(star.angle);

        this.ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            this.ctx.rotate(Math.PI / 2);
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(star.size * 4, 0);
        }
        this.ctx.strokeStyle = `hsla(${star.hue}, 80%, 50%, ${opacity * 0.5})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.stars.forEach(star => {
            star.angle += star.twinkleSpeed;
            this.drawStar(star);
        });

        // Effet de mouvement subtil
        const time = Date.now() * 0.001;
        this.stars.forEach(star => {
            star.x += Math.sin(time + star.x * 0.01) * 0.2;
            star.y += Math.cos(time + star.y * 0.01) * 0.2;

            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
        });

        requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createStars();
        });
    }
}

// Initialisation de l'effet d'étoiles dorées
document.addEventListener('DOMContentLoaded', () => {
    new GoldenStarsEffect();
});

// Ajout des styles pour l'effet d'étoiles
const starStyles = document.createElement('style');
starStyles.textContent = `
    .stars-canvas {
        mix-blend-mode: screen;
        opacity: 0.8;
        filter: blur(0.5px);
    }
`;
document.head.appendChild(starStyles);

// Effet de particules luxueuses en arrière-plan
class LuxuryParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        document.body.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.25
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Effet de parallaxe 3D
class Parallax3D {
    constructor() {
        this.images = document.querySelectorAll('.about-image, .hero-slider .slide');
        this.init();
    }

    init() {
        this.images.forEach(image => {
            image.addEventListener('mousemove', (e) => this.handleParallax(e, image));
            image.addEventListener('mouseleave', () => this.resetParallax(image));
        });
    }

    handleParallax(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        element.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    resetParallax(element) {
        element.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    }
}

// Animation des textes avec effet de dévoilement
class TextReveal {
    constructor() {
        this.texts = document.querySelectorAll('.section-title, .section-subtitle, .hero-title, .hero-subtitle');
        this.init();
    }

    init() {
        this.texts.forEach(text => {
            text.style.opacity = '0';
            this.createOverlay(text);
        });

        this.observeElements();
    }

    createOverlay(element) {
        const overlay = document.createElement('div');
        overlay.classList.add('text-reveal-overlay');
        element.parentNode.insertBefore(overlay, element.nextSibling);
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const overlay = element.nextSibling;

                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    overlay.style.transform = 'scaleX(0)';

                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.2 });

        this.texts.forEach(text => observer.observe(text));
    }
}

// Effet de transition de page fluide
class PageTransition {
    constructor() {
        this.transition = document.createElement('div');
        this.init();
    }

    init() {
        this.transition.classList.add('page-transition');
        document.body.appendChild(this.transition);

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleTransition(e, link));
        });
    }

    handleTransition(e, link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));

        this.transition.style.transform = 'scaleY(1)';
        
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'auto' });
            this.transition.style.transform = 'scaleY(0)';
        }, 500);
    }
}

// Initialisation des nouvelles fonctionnalités
document.addEventListener('DOMContentLoaded', () => {
    new LuxuryParticles();
    new Parallax3D();
    new TextReveal();
    new PageTransition();
});

// Ajout des styles CSS nécessaires
const luxuryStyles = document.createElement('style');
luxuryStyles.textContent = `
    .text-reveal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #c5a47e, #e5c697);
        transform-origin: right;
        transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1);
    }

    .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #c5a47e, #e5c697);
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1);
        z-index: 9999;
        pointer-events: none;
    }

    .about-image, .hero-slider .slide {
        transition: transform 0.3s cubic-bezier(0.7, 0, 0.3, 1);
    }
`;
document.head.appendChild(luxuryStyles);
