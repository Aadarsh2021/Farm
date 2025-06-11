// SEO and Meta Tags Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add structured data for better SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Farmease",
        "description": "Your trusted agricultural marketplace for seeds, fruits, vegetables, tools and farming equipment",
        "url": window.location.origin,
        "logo": window.location.origin + "/images/farmease_logo.jpg",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Farm Street",
            "addressLocality": "Agriculture City",
            "postalCode": "12345",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-234-567-890",
            "contactType": "customer service",
            "email": "support@farmease.com"
        },
        "openingHours": "Mo-Sa 08:00-20:00",
        "priceRange": "₹"
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add Open Graph meta tags for better social sharing
    const metaTags = [
        { property: 'og:title', content: document.title },
        { property: 'og:description', content: 'Your trusted agricultural marketplace for high-quality farming products and equipment' },
        { property: 'og:image', content: window.location.origin + '/images/hero-farm.jpg' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Farmease' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: document.title },
        { name: 'twitter:description', content: 'Your trusted agricultural marketplace for high-quality farming products and equipment' },
        { name: 'twitter:image', content: window.location.origin + '/images/hero-farm.jpg' }
    ];

    metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        if (tag.property) meta.setAttribute('property', tag.property);
        if (tag.name) meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
    });

    // Add canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href.split('?')[0]; // Remove query parameters
    document.head.appendChild(canonical);

    // Add performance optimization meta tags
    const preloadLinks = [
        { href: '/css/main.css', as: 'style' },
        { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' },
        { href: '/js/script.js', as: 'script' }
    ];

    preloadLinks.forEach(link => {
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.href = link.href;
        preload.as = link.as;
        if (link.as === 'style') preload.onload = () => { preload.rel = 'stylesheet'; };
        document.head.appendChild(preload);
    });
});

// Product page specific SEO
if (window.location.pathname.includes('products.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            // Update title for better SEO
            document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - Farmease Agricultural Products`;
            
            // Update meta description
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = `Shop premium ${category} at Farmease. High-quality agricultural products delivered fresh to your doorstep.`;
        }
    });
} 