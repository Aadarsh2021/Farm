// Enhanced Hero Slider with Advanced Animations
class HeroSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.slides = this.slider.querySelectorAll('.slide');
        this.dots = this.slider.querySelectorAll('.dot');
        this.prevBtn = this.slider.querySelector('.prev-slide');
        this.nextBtn = this.slider.querySelector('.next-slide');
        
        this.currentSlide = 0;
        this.isTransitioning = false;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 6000; // 6 seconds
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        // Initialize first slide
        this.showSlide(0, false);
        
        // Add event listeners
        this.addEventListeners();
        
        // Start auto slide
        this.startAutoSlide();
        
        // Add intersection observer for performance
        this.setupIntersectionObserver();
        
        // Add touch/swipe support
        this.addTouchSupport();
        
        console.log('Enhanced Hero Slider initialized with', this.slides.length, 'slides');
    }

    addEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.slider.addEventListener('mouseleave', () => this.resumeAutoSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isSliderInView()) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });

        // Window focus events
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoSlide();
            } else {
                this.resumeAutoSlide();
            }
        });
    }

    showSlide(index, animate = true) {
        if (this.isTransitioning && animate) return;
        
        const prevIndex = this.currentSlide;
        this.currentSlide = index;
        
        if (animate) {
            this.isTransitioning = true;
            this.animateSlideTransition(prevIndex, index);
        } else {
            this.setSlideState(index);
        }
        
        this.updateDots();
    }

    animateSlideTransition(fromIndex, toIndex) {
        const fromSlide = this.slides[fromIndex];
        const toSlide = this.slides[toIndex];
        
        // Prepare slides for animation
        this.prepareSlideTransition(fromSlide, toSlide, fromIndex, toIndex);
        
        // Trigger animation
        requestAnimationFrame(() => {
            fromSlide.classList.remove('active');
            toSlide.classList.add('active');
            
            // Animate content elements with stagger
            this.animateSlideContent(toSlide);
            
            // Reset transition flag after animation
            setTimeout(() => {
                this.isTransitioning = false;
                this.cleanupAfterTransition(fromSlide, toSlide);
            }, 800);
        });
    }

    prepareSlideTransition(fromSlide, toSlide, fromIndex, toIndex) {
        // Reset all slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'next', 'prev');
            
            if (i === toIndex) {
                slide.classList.add('next');
            } else if (i === fromIndex) {
                slide.classList.add('active');
            }
        });

        // Add direction-based classes
        const direction = toIndex > fromIndex ? 'next' : 'prev';
        toSlide.classList.add(direction);
    }

    animateSlideContent(slide) {
        const contentElements = slide.querySelectorAll('.slide-content > *');
        
        contentElements.forEach((element, index) => {
            element.style.transform = 'translateY(30px)';
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, index * 100 + 200);
        });
    }

    cleanupAfterTransition(fromSlide, toSlide) {
        fromSlide.classList.remove('prev', 'next');
        toSlide.classList.remove('prev', 'next');
    }

    setSlideState(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active', 'next', 'prev');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    nextSlide() {
        if (this.isTransitioning) return;
        
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
        this.resetAutoSlide();
    }

    prevSlide() {
        if (this.isTransitioning) return;
        
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
        this.resetAutoSlide();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.showSlide(index);
        this.resetAutoSlide();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            if (!this.isTransitioning && this.isSliderInView()) {
                this.nextSlide();
            }
        }, this.autoSlideDelay);
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resumeAutoSlide() {
        if (!this.autoSlideInterval) {
            this.startAutoSlide();
        }
    }

    resetAutoSlide() {
        this.pauseAutoSlide();
        this.resumeAutoSlide();
    }

    isSliderInView() {
        const rect = this.slider.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.resumeAutoSlide();
                } else {
                    this.pauseAutoSlide();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.slider);
    }

    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        this.slider.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;
        }, { passive: true });

        this.slider.addEventListener('touchend', () => {
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Check if horizontal swipe is more prominent than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide(); // Swipe left - next slide
                } else {
                    this.prevSlide(); // Swipe right - previous slide
                }
            }
        }, { passive: true });
    }

    // Public API methods
    destroy() {
        this.pauseAutoSlide();
        // Remove event listeners if needed
    }

    goTo(index) {
        this.goToSlide(index);
    }

    play() {
        this.resumeAutoSlide();
    }

    pause() {
        this.pauseAutoSlide();
    }
}

// Image preloader for better performance
class ImagePreloader {
    static preloadImages(imageUrls) {
        const promises = imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
        });
        
        return Promise.all(promises);
    }
}

// Enhanced initialization function
function initializeEnhancedHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;

    // Add loading state
    const loadingElement = document.createElement('div');
    loadingElement.className = 'slide-loading';
    loadingElement.innerHTML = '<div class="slide-loader"></div>';
    heroSlider.appendChild(loadingElement);

    // Get all slide images for preloading
    const slideImages = Array.from(heroSlider.querySelectorAll('.slide-image img'))
        .map(img => img.src);

    // Preload images and then initialize slider
    ImagePreloader.preloadImages(slideImages)
        .then(() => {
            // Remove loading state
            loadingElement.remove();
            
            // Initialize enhanced slider
            const slider = new HeroSlider(heroSlider);
            
            // Make slider globally accessible for debugging
            window.heroSlider = slider;
            
            console.log('Enhanced hero slider initialized successfully');
        })
        .catch((error) => {
            console.warn('Some images failed to preload, initializing slider anyway:', error);
            loadingElement.remove();
            const slider = new HeroSlider(heroSlider);
            window.heroSlider = slider;
        });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedHeroSlider);
} else {
    initializeEnhancedHeroSlider();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HeroSlider, ImagePreloader };
} 