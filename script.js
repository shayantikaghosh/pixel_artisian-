document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.carousel-nav .prev-btn');
    const nextBtn = document.querySelector('.carousel-nav .next-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;
    function updateCarousel() {
        const itemWidth = testimonialItems[0].offsetWidth + parseFloat(getComputedStyle(testimonialItems[0]).marginRight);
        carousel.scrollLeft = currentIndex * itemWidth;
    }
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialItems.length - 1;
        updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < testimonialItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
    const lazyMedia = document.querySelectorAll('img[data-src], video[data-src]');
    const mediaObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const media = entry.target;
                if (media.tagName === 'IMG') {
                    media.src = media.dataset.src;
                } else if (media.tagName === 'VIDEO') {
                     const source = media.querySelector('source');
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        media.load(); 
                    }
                }
                media.removeAttribute('data-src'); 
                observer.unobserve(media); 
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px', 
        threshold: 0.01 
    });

    lazyMedia.forEach(media => {
        mediaObserver.observe(media);
    });
    const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    });
    sections.forEach(section => {
        section.style.opacity = 0; 
        section.style.transform = 'translateY(20px)'; 
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
});