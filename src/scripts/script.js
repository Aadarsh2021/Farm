// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the cart page
    if (window.location.pathname.includes('cart.html')) {
        return; // Skip initialization for cart page
    }

    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme based on system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Initialize Hero Slider
    initializeHeroSlider();

    // Update cart count
    updateCartCount();

    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            const productId = parseInt(button.getAttribute('data-id'));
            
            // Add to cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Show notification
            showNotification('Product added to cart!');
        }
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send the email to your server
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        });
    }

    // Countdown Timer
    initializeCountdown();

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        }
    }

    // Quick View Modal
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view') || e.target.closest('.quick-view')) {
            const button = e.target.classList.contains('quick-view') ? e.target : e.target.closest('.quick-view');
            const productId = parseInt(button.getAttribute('data-id'));
            const product = window.products.find(p => p.id === productId);
            
            if (product) {
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="product-details">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="details">
                                <h2>${product.name}</h2>
                                <p class="price">₹${product.price.toLocaleString('en-IN')}/kg</p>
                                <div class="rating">
                                    ${renderStars(product.rating)}
                                </div>
                                <p class="description">${product.description}</p>
                                <button class="add-to-cart" data-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                const closeModal = modal.querySelector('.close-modal');
                closeModal.addEventListener('click', () => {
                    modal.remove();
                });
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            }
        }
    });

    // Wishlist functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-btn') || e.target.closest('.wishlist-btn')) {
            const button = e.target.classList.contains('wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
            const productId = parseInt(button.getAttribute('data-id'));
            
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const index = wishlist.indexOf(productId);
            
            if (index === -1) {
                wishlist.push(productId);
                button.classList.add('active');
                showNotification('Added to wishlist!', 'success');
            } else {
                wishlist.splice(index, 1);
                button.classList.remove('active');
                showNotification('Removed from wishlist!', 'info');
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    });

    // Product Filters
    initializeProductFilters();

    // Load More Functionality
    initializeLoadMore();

    // Today's Deals Section
    const dealsSection = {
        init() {
            this.setupCountdown();
            this.setupCategoryFilters();
            this.setupLoadMore();
            this.setupProductActions();
        },

        setupCountdown() {
            function updateCountdown() {
                const now = new Date();
                const endTime = new Date();
                endTime.setHours(23, 59, 59); // Set to end of day

                const timeLeft = endTime - now;
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            }

            setInterval(updateCountdown, 1000);
            updateCountdown();
        },

        setupCategoryFilters() {
            const categoryButtons = document.querySelectorAll('.category-btn');
            const productCards = document.querySelectorAll('.product-card');

            categoryButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active state
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const category = button.textContent.toLowerCase();
                    
                    // Filter products
                    productCards.forEach(card => {
                        const cardCategory = card.querySelector('.product-category').textContent.toLowerCase();
                        if (category === 'all products' || cardCategory === category) {
                            card.style.display = 'block';
                            setTimeout(() => card.style.opacity = '1', 50);
                        } else {
                            card.style.opacity = '0';
                            setTimeout(() => card.style.display = 'none', 300);
                        }
                    });
                });
            });
        },

        setupLoadMore() {
            const loadMoreBtn = document.querySelector('.load-more-btn');
            if (!loadMoreBtn) return;

            loadMoreBtn.addEventListener('click', () => {
                // Simulate loading more products
                loadMoreBtn.textContent = 'Loading...';
                loadMoreBtn.disabled = true;

                setTimeout(() => {
                    // Add animation class to existing products
                    const products = document.querySelectorAll('.product-card');
                    products.forEach(product => {
                        product.classList.add('fade-in');
                    });

                    loadMoreBtn.textContent = 'Load More Deals';
                    loadMoreBtn.disabled = false;
                }, 1000);
            });
        },

        setupProductActions() {
            document.querySelectorAll('.action-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = button.classList.contains('wishlist') ? 'wishlist' :
                                 button.classList.contains('quick-view') ? 'quick-view' : 'cart';
                    
                    const productCard = button.closest('.product-card');
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    
                    switch(action) {
                        case 'wishlist':
                            // Toggle wishlist state
                            button.classList.toggle('active');
                            const icon = button.querySelector('i');
                            icon.classList.toggle('fas');
                            icon.classList.toggle('far');
                            this.showNotification(`${productTitle} ${button.classList.contains('active') ? 'added to' : 'removed from'} wishlist`);
                            break;
                            
                        case 'quick-view':
                            // Show quick view modal
                            this.showQuickView(productCard);
                            break;
                            
                        case 'cart':
                            // Add to cart
                            this.addToCart(productCard);
                            break;
                    }
                });
            });
        },

        showQuickView(productCard) {
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productDescription = "This premium product is part of our limited-time deals. Don't miss out on this amazing offer!";

            // Create modal HTML
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="modal-body">
                        <div class="product-image">
                            <img src="${productImage}" alt="${productTitle}">
                        </div>
                        <div class="product-details">
                            <h2>${productTitle}</h2>
                            <div class="price">${productPrice}</div>
                            <p>${productDescription}</p>
                            <button class="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('show'), 50);

            // Close modal functionality
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            });

            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        },

        addToCart(productCard) {
            const productId = parseInt(productCard.getAttribute('data-id'));
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            if (productId && window.addToCart) {
                window.addToCart(productId, 1);
                this.showNotification(`${productTitle} added to cart`);
            } else {
                // Fallback: add to localStorage directly
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ id: productId, quantity: 1 });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                this.showNotification(`${productTitle} added to cart`);
                
                // Update cart count if function exists
                if (window.updateCartCount) {
                    window.updateCartCount();
                }
            }
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.classList.add('bounce');
                setTimeout(() => cartIcon.classList.remove('bounce'), 1000);
            }
        },

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    // Initialize Today's Deals section
    dealsSection.init();

    // Add styles for new components
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        @media (prefers-color-scheme: dark) {
            .notification {
                background: var(--primary-dark);
            }
        }
    `;
    document.head.appendChild(style);

    // Featured Products Section
    const featuredProducts = {
        init() {
            this.setupFilters();
            this.setupProductActions();
            this.setupQuickView();
            this.setupLoadMore();
        },

        setupFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const productCards = document.querySelectorAll('.product-card');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');

                    const category = button.dataset.category;

                    // Filter products with animation
                    productCards.forEach(card => {
                        if (category === 'all' || card.dataset.category === category) {
                            card.style.display = 'block';
                            setTimeout(() => card.style.opacity = '1', 50);
                        } else {
                            card.style.opacity = '0';
                            setTimeout(() => card.style.display = 'none', 300);
                        }
                    });
                });
            });
        },

        setupProductActions() {
            const wishlistButtons = document.querySelectorAll('.wishlist-btn');
            const addToCartButtons = document.querySelectorAll('.add-to-cart');

            wishlistButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const icon = button.querySelector('i');
                    icon.classList.toggle('far');
                    icon.classList.toggle('fas');
                    icon.classList.toggle('text-danger');
                    
                    const productName = button.closest('.product-card').querySelector('h3').textContent;
                    const action = icon.classList.contains('fas') ? 'added to' : 'removed from';
                    this.showNotification(`${productName} ${action} wishlist`);
                });
            });

            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productName = button.closest('.product-card').querySelector('h3').textContent;
                    this.showNotification(`${productName} added to cart`);
                    
                    // Add animation to cart icon
                    const cartIcon = button.querySelector('i');
                    cartIcon.style.transform = 'scale(1.2)';
                    setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
                });
            });
        },

        setupQuickView() {
            const quickViewButtons = document.querySelectorAll('.quick-view-btn');
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="modal-body"></div>
                </div>
            `;
            document.body.appendChild(modal);

            quickViewButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const card = button.closest('.product-card');
                    const productData = {
                        image: card.querySelector('.product-image img').src,
                        name: card.querySelector('h3').textContent,
                        category: card.querySelector('.product-category').textContent,
                        price: card.querySelector('.price').textContent,
                        originalPrice: card.querySelector('.original-price').textContent,
                        rating: card.querySelector('.stars').textContent,
                        reviews: card.querySelector('.reviews').textContent,
                        stock: card.querySelector('.stock-count').textContent
                    };

                    const modalBody = modal.querySelector('.modal-body');
                    modalBody.innerHTML = `
                        <div class="quick-view-content">
                            <div class="quick-view-image">
                                <img src="${productData.image}" alt="${productData.name}">
                            </div>
                            <div class="quick-view-details">
                                <h2>${productData.name}</h2>
                                <div class="category">${productData.category}</div>
                                <div class="rating">
                                    <span class="stars">${productData.rating}</span>
                                    <span class="reviews">${productData.reviews}</span>
                                </div>
                                <div class="price-container">
                                    <span class="original-price">${productData.originalPrice}</span>
                                    <span class="price">${productData.price}</span>
                                </div>
                                <div class="stock-info">
                                    <span class="stock-badge in-stock">In Stock</span>
                                    <span class="stock-count">${productData.stock}</span>
                                </div>
                                <div class="quantity-selector">
                                    <button class="quantity-btn minus">-</button>
                                    <input type="number" value="1" min="1" max="10">
                                    <button class="quantity-btn plus">+</button>
                                </div>
                                <button class="add-to-cart">
                                    <i class="fas fa-shopping-cart"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    `;

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Setup quantity selector
                    const quantityInput = modalBody.querySelector('input[type="number"]');
                    const minusBtn = modalBody.querySelector('.minus');
                    const plusBtn = modalBody.querySelector('.plus');

                    minusBtn.addEventListener('click', () => {
                        const currentValue = parseInt(quantityInput.value);
                        if (currentValue > 1) {
                            quantityInput.value = currentValue - 1;
                        }
                    });

                    plusBtn.addEventListener('click', () => {
                        const currentValue = parseInt(quantityInput.value);
                        if (currentValue < 10) {
                            quantityInput.value = currentValue + 1;
                        }
                    });

                    // Setup add to cart in modal
                    const addToCartBtn = modalBody.querySelector('.add-to-cart');
                    addToCartBtn.addEventListener('click', () => {
                        const quantity = quantityInput.value;
                        this.showNotification(`${productData.name} (${quantity}) added to cart`);
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
            });

            // Close modal
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });

            // Close modal on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        },

        setupLoadMore() {
            const loadMoreBtn = document.querySelector('.load-more-btn');
            if (!loadMoreBtn) return;

            loadMoreBtn.addEventListener('click', () => {
                loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Simulate loading more products
                setTimeout(() => {
                    // Add new products here
                    loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Products';
                    this.showNotification('More products loaded successfully');
                }, 1500);
            });
        },

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    // Initialize Featured Products section
    featuredProducts.init();

    // Shop by Category Section
    const categorySection = {
        init() {
            this.setupCategoryCards();
            this.setupIntersectionObserver();
        },

        setupCategoryCards() {
            const categoryCards = document.querySelectorAll('.category-card');
            
            categoryCards.forEach(card => {
                // Add hover animation class
                card.addEventListener('mouseenter', () => {
                    card.classList.add('hover');
                });

                card.addEventListener('mouseleave', () => {
                    card.classList.remove('hover');
                });

                // Add click animation
                card.addEventListener('click', (e) => {
                    const overlay = card.querySelector('.category-overlay');
                    if (overlay) {
                        e.preventDefault();
                        this.animateClick(card, () => {
                            window.location.href = card.getAttribute('href');
                        });
                    }
                });
            });
        },

        animateClick(card, callback) {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
                if (callback) callback();
            }, 200);
        },

        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            document.querySelectorAll('.category-card').forEach(card => {
                observer.observe(card);
            });
        }
    };

    // Initialize category section when DOM is loaded
    categorySection.init();

    // Bestsellers Section
    const bestsellersSection = {
        init() {
            this.setupFilters();
            this.setupProductActions();
            this.setupLoadMore();
            this.loadInitialProducts();
        },

        setupFilters() {
            const filterButtons = document.querySelectorAll('.bestsellers .filter-btn');
            const productGrid = document.querySelector('.bestsellers .product-grid');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const category = button.getAttribute('data-category');
                    this.filterProducts(category);
                });
            });
        },

        filterProducts(category) {
            const products = document.querySelectorAll('.bestsellers .product-card');
            products.forEach(product => {
                if (category === 'all' || product.getAttribute('data-category') === category) {
                    product.style.display = 'block';
                    setTimeout(() => product.style.opacity = '1', 50);
                } else {
                    product.style.opacity = '0';
                    setTimeout(() => product.style.display = 'none', 300);
                }
            });
        },

        setupProductActions() {
            const productGrid = document.querySelector('.bestsellers .product-grid');
            if (!productGrid) return;

            productGrid.addEventListener('click', (e) => {
                const wishlistBtn = e.target.closest('.wishlist-btn');
                const quickViewBtn = e.target.closest('.quick-view-btn');
                const addToCartBtn = e.target.closest('.add-to-cart-btn');

                if (wishlistBtn) {
                    this.toggleWishlist(wishlistBtn);
                } else if (quickViewBtn) {
                    this.showQuickView(quickViewBtn.closest('.product-card'));
                } else if (addToCartBtn) {
                    this.addToCart(addToCartBtn.closest('.product-card'));
                }
            });
        },

        toggleWishlist(button) {
            const productId = button.getAttribute('data-id');
            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const index = wishlist.indexOf(productId);

            if (index === -1) {
                wishlist.push(productId);
                button.classList.add('active');
                showNotification('Added to wishlist!', 'success');
            } else {
                wishlist.splice(index, 1);
                button.classList.remove('active');
                showNotification('Removed from wishlist!', 'info');
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        },

        showQuickView(productCard) {
            const productId = productCard.getAttribute('data-id');
            const product = window.products.find(p => p.id === parseInt(productId));

            if (product) {
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="product-details">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="details">
                                <h2>${product.name}</h2>
                                <p class="price">₹${product.price.toLocaleString('en-IN')}/kg</p>
                                <div class="rating">
                                    ${renderStars(product.rating)}
                                </div>
                                <p class="description">${product.description}</p>
                                <button class="add-to-cart" data-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                document.body.appendChild(modal);

                const closeModal = modal.querySelector('.close-modal');
                closeModal.addEventListener('click', () => {
                    modal.remove();
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            }
        },

        addToCart(productCard) {
            const productId = productCard.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === parseInt(productId));

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: parseInt(productId),
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification('Product added to cart!', 'success');
        },

        setupLoadMore() {
            const loadMoreBtn = document.querySelector('.bestsellers .load-more-btn');
            if (!loadMoreBtn) return;

            loadMoreBtn.addEventListener('click', () => {
                loadMoreBtn.textContent = 'Loading...';
                loadMoreBtn.disabled = true;

                // Simulate loading more products
                setTimeout(() => {
                    this.loadMoreProducts();
                    loadMoreBtn.textContent = 'Load More Products';
                    loadMoreBtn.disabled = false;
                }, 1000);
            });
        },

        loadInitialProducts() {
            const productGrid = document.querySelector('.bestsellers .product-grid');
            if (!productGrid) return;

            // Get bestseller products (you can replace this with your actual data source)
            const bestsellerProducts = window.products.filter(product => product.isBestseller);

            // Display initial products
            bestsellerProducts.slice(0, 8).forEach(product => {
                const productCard = this.createProductCard(product);
                productGrid.appendChild(productCard);
            });
        },

        loadMoreProducts() {
            const productGrid = document.querySelector('.bestsellers .product-grid');
            if (!productGrid) return;

            // Get more bestseller products
            const bestsellerProducts = window.products.filter(product => product.isBestseller);
            const currentCount = productGrid.children.length;
            const nextProducts = bestsellerProducts.slice(currentCount, currentCount + 4);

            nextProducts.forEach(product => {
                const productCard = this.createProductCard(product);
                productGrid.appendChild(productCard);
            });
        },

        createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-category', product.category);
            card.setAttribute('data-id', product.id);

            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-badges">
                        ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                        ${product.isNew ? '<span class="new-badge">New</span>' : ''}
                        ${product.isBestseller ? '<span class="best-seller-badge">Best Seller</span>' : ''}
                    </div>
                    <div class="product-actions">
                        <button class="wishlist-btn" title="Add to Wishlist" data-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="quick-view-btn" title="Quick View">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${renderStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        ${product.discount ? `
                            <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                            <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                        ` : `
                            <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                        `}
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            `;

            return card;
        },

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    // Initialize bestsellers section
    bestsellersSection.init();

    // Enhanced Product Card Functionality
    initializeEnhancedProductCards();
});

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function initializeHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;

    const slides = heroSlider.querySelectorAll('.slide');
    const dots = heroSlider.querySelectorAll('.dot');
    const prevBtn = heroSlider.querySelector('.prev-slide');
    const nextBtn = heroSlider.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function startSlideInterval() {
        stopSlideInterval();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideInterval() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideInterval();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startSlideInterval();
        });
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', stopSlideInterval);
    heroSlider.addEventListener('mouseleave', startSlideInterval);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    heroSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
        startSlideInterval();
    }

    // Initialize
    showSlide(currentSlide);
    startSlideInterval();
}

// Countdown Timer
function initializeCountdown() {
    const countdownElements = document.querySelectorAll('.countdown-value');
    if (!countdownElements.length) return;

    // Set end time to 24 hours from now
    const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElements[0].textContent = hours.toString().padStart(2, '0');
        countdownElements[1].textContent = minutes.toString().padStart(2, '0');
        countdownElements[2].textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElements.forEach(el => el.textContent = '00');
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Product Filters
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productGrids = document.querySelectorAll('.product-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;
            
            productGrids.forEach(grid => {
                const products = grid.querySelectorAll('.product-card');
                products.forEach(product => {
                    if (category === 'all' || product.dataset.category === category) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    });
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;

    let currentPage = 1;
    const productsPerPage = 8;

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        // Here you would typically fetch more products from your backend
        // For now, we'll just show a loading state
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            // Reset button state
            loadMoreBtn.innerHTML = 'Load More <i class="fas fa-arrow-down"></i>';
            
            // If we've loaded all products (for demo purposes)
            if (currentPage >= 3) {
                loadMoreBtn.style.display = 'none';
            }
        }, 1000);
    });
}

// Today's Deals Countdown Timer
function updateCountdown() {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(23, 59, 59); // Set to end of day

    const timeLeft = endTime - now;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Product Actions
document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.classList.contains('wishlist') ? 'wishlist' :
                      button.classList.contains('quick-view') ? 'quick-view' : 'cart';
        
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        switch(action) {
            case 'wishlist':
                // Toggle wishlist state
                button.classList.toggle('active');
                const icon = button.querySelector('i');
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
                showNotification(`${productTitle} ${button.classList.contains('active') ? 'added to' : 'removed from'} wishlist`);
                break;
                
            case 'quick-view':
                // Show quick view modal (to be implemented)
                showNotification(`Quick view for ${productTitle}`);
                break;
                
            case 'cart':
                // Add to cart
                showNotification(`${productTitle} added to cart`);
                break;
        }
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    @media (prefers-color-scheme: dark) {
        .notification {
            background: var(--primary-dark);
        }
    }
`;
document.head.appendChild(style);

// Enhanced Product Card Functionality
function initializeEnhancedProductCards() {
    // Initialize wishlist functionality
    initializeWishlist();
    
    // Initialize quick view functionality
    initializeQuickView();
    
    // Initialize share functionality
    initializeShare();
    
    // Initialize enhanced cart functionality
    initializeEnhancedCart();
    
    // Initialize stock bar animations
    initializeStockAnimations();
}

// Wishlist Functionality
function initializeWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Update wishlist button states
    updateWishlistStates();
    
    // Add event listeners to wishlist buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.wishlist-btn')) {
            e.preventDefault();
            const btn = e.target.closest('.wishlist-btn');
            const productId = btn.dataset.id;
            toggleWishlist(productId, btn);
        }
    });
    
    function toggleWishlist(productId, btn) {
        const icon = btn.querySelector('i');
        
        if (wishlist.includes(productId)) {
            // Remove from wishlist
            wishlist = wishlist.filter(id => id !== productId);
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.classList.remove('active');
            showNotification('Removed from wishlist', 'info');
        } else {
            // Add to wishlist
            wishlist.push(productId);
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.classList.add('active');
            showNotification('Added to wishlist', 'success');
            
            // Add animation
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCounter();
    }
    
    function updateWishlistStates() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const productId = btn.dataset.id;
            const icon = btn.querySelector('i');
            
            if (wishlist.includes(productId)) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.classList.add('active');
            }
        });
    }
    
    function updateWishlistCounter() {
        const counter = document.querySelector('.wishlist-count');
        if (counter) {
            counter.textContent = wishlist.length;
        }
    }
}

// Quick View Functionality
function initializeQuickView() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quick-view-btn')) {
            e.preventDefault();
            const btn = e.target.closest('.quick-view-btn');
            const productId = btn.dataset.id;
            openQuickView(productId);
        }
    });
    
    function openQuickView(productId) {
        // Find product data
        const product = window.products?.find(p => p.id == productId);
        if (!product) {
            showNotification('Product not found', 'error');
            return;
        }
        
        // Create modal HTML
        const modalHTML = `
            <div class="quick-view-modal" id="quick-view-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="quick-view-content">
                        <div class="quick-view-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="quick-view-info">
                            <div class="product-category">
                                <i class="fas fa-seedling"></i>
                                <span>${product.category}</span>
                            </div>
                            <h2>${product.name}</h2>
                            <div class="rating">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                <span>(${product.rating})</span>
                            </div>
                            <div class="price-display">
                                ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                                <span class="current-price">₹${product.price}</span>
                            </div>
                            <p class="description">${product.description}</p>
                            <div class="stock-status">
                                <span class="stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                                    ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                                ${product.stock > 0 ? `<span class="stock-count">${product.stock} available</span>` : ''}
                            </div>
                            <div class="quick-actions">
                                <div class="quantity-selector">
                                    <button type="button" class="qty-btn minus">-</button>
                                    <input type="number" class="qty-input" value="1" min="1" max="${product.stock}">
                                    <button type="button" class="qty-btn plus">+</button>
                                </div>
                                <button class="btn-primary add-to-cart-quick" data-id="${product.id}">
                                    <i class="fas fa-shopping-cart"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert modal into DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Show modal with animation
        const modal = document.getElementById('quick-view-modal');
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
        
        // Add event listeners
        setupQuickViewListeners(modal);
    }
    
    function setupQuickViewListeners(modal) {
        // Close modal
        modal.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-overlay') || e.target.closest('.modal-close')) {
                closeQuickView(modal);
            }
        });
        
        // Quantity controls
        const qtyInput = modal.querySelector('.qty-input');
        const minusBtn = modal.querySelector('.qty-btn.minus');
        const plusBtn = modal.querySelector('.qty-btn.plus');
        
        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(qtyInput.value);
            const maxValue = parseInt(qtyInput.max);
            if (currentValue < maxValue) {
                qtyInput.value = currentValue + 1;
            }
        });
        
        // Add to cart from quick view
        modal.querySelector('.add-to-cart-quick').addEventListener('click', function() {
            const productId = this.dataset.id;
            const quantity = parseInt(qtyInput.value);
            addToCart(productId, quantity);
            closeQuickView(modal);
        });
    }
    
    function closeQuickView(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Share Functionality
function initializeShare() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.share-btn')) {
            e.preventDefault();
            const btn = e.target.closest('.share-btn');
            const productId = btn.dataset.id;
            shareProduct(productId);
        }
    });
    
    function shareProduct(productId) {
        const product = window.products?.find(p => p.id == productId);
        if (!product) return;
        
        const shareData = {
            title: product.name,
            text: `Check out this amazing product: ${product.name}`,
            url: `${window.location.origin}${window.location.pathname}?product=${productId}`
        };
        
        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(shareData.url).then(() => {
                showNotification('Product link copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Could not copy link', 'error');
            });
        }
    }
}

// Enhanced Cart Functionality
function initializeEnhancedCart() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-btn') || e.target.closest('.add-to-cart-overlay')) {
            e.preventDefault();
            const btn = e.target.closest('.add-to-cart-btn, .add-to-cart-overlay');
            const productId = btn.dataset.id;
            addToCartWithAnimation(btn, productId);
        }
    });
    
    function addToCartWithAnimation(btn, productId, quantity = 1) {
        // Add loading state
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        btn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Add to cart
            addToCart(productId, quantity);
            
            // Success animation
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            btn.classList.add('success');
            
            // Reset button after delay
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                btn.classList.remove('success');
            }, 2000);
            
            // Animate the button
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
        }, 500);
    }
}

// Stock Bar Animations
function initializeStockAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stockFill = entry.target.querySelector('.stock-fill');
                if (stockFill) {
                    stockFill.style.transition = 'width 1s ease-out';
                    const targetWidth = stockFill.style.width;
                    stockFill.style.width = '0%';
                    
                    setTimeout(() => {
                        stockFill.style.width = targetWidth;
                    }, 100);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stock-indicator').forEach(indicator => {
        observer.observe(indicator);
    });
}

// Enhanced CSS for notifications and modals
const enhancedStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10000;
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left: 4px solid #4caf50;
}

.notification.error {
    border-left: 4px solid #f44336;
}

.notification.info {
    border-left: 4px solid #2196f3;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.quick-view-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.quick-view-modal.active {
    opacity: 1;
    pointer-events: all;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    background: white;
    border-radius: 12px;
    max-width: 800px;
    width: 90%;
    max-height: 80vh;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.quick-view-modal.active .modal-content {
    transform: translate(-50%, -50%) scale(1);
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 10;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
}

.quick-view-content {
    display: flex;
    min-height: 400px;
}

.quick-view-image {
    flex: 1;
    background: #f8f9fa;
}

.quick-view-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.quick-view-info {
    flex: 1;
    padding: 30px;
}

.quick-actions {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-top: 20px;
}

.quantity-selector {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
}

.qty-btn {
    border: none;
    background: #f8f9fa;
    width: 35px;
    height: 35px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qty-btn:hover {
    background: #e9ecef;
}

.qty-input {
    border: none;
    width: 50px;
    height: 35px;
    text-align: center;
    background: white;
}

.btn-primary.success {
    background: #4caf50 !important;
}

.wishlist-btn.active {
    background: #ff6b6b !important;
    color: white !important;
}

@media (max-width: 768px) {
    .quick-view-content {
        flex-direction: column;
    }
    
    .quick-view-image {
        height: 250px;
    }
    
    .quick-actions {
        flex-direction: column;
        align-items: stretch;
    }
    
    .quantity-selector {
        justify-content: center;
    }
}
</style>
`;

// Inject enhanced styles
if (!document.querySelector('#enhanced-product-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'enhanced-product-styles';
    styleElement.innerHTML = enhancedStyles;
    document.head.appendChild(styleElement);
} 