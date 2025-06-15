// Product data
window.products = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 64,
        originalPrice: 80,
        rating: 5,
        image: "../assets/tomato.jpg",
        description: "Juicy, vine-ripened tomatoes perfect for salads and cooking.",
        stock: 15,
        bestseller: true
    },
    {
        id: 2,
        name: "Fresh Apples",
        category: "fruits",
        price: 170,
        originalPrice: 200,
        rating: 4,
        image: "../assets/apple.jpg",
        description: "Premium quality apples, hand-picked and carefully selected.",
        stock: 20,
        bestseller: true
    },
    {
        id: 3,
        name: "Premium Rice",
        category: "grains",
        price: 108,
        originalPrice: 120,
        rating: 5,
        image: "../assets/rice.jpg",
        description: "High-quality long grain rice, perfect for daily meals.",
        stock: 25,
        bestseller: true
    },
    {
        id: 4,
        name: "Organic Moong Dal",
        category: "pulses",
        price: 120,
        originalPrice: 160,
        rating: 4,
        image: "../assets/moong-dal.jpg",
        description: "Split green gram, a nutritious and versatile pulse.",
        stock: 18,
        bestseller: true
    },
    {
        id: 5,
        name: "Fresh Spinach",
        category: "vegetables",
        price: 42,
        originalPrice: 60,
        rating: 5,
        image: "../assets/spinach.jpg",
        description: "Organic spinach leaves, packed with essential nutrients.",
        stock: 12,
        bestseller: true
    },
    {
        id: 6,
        name: "Fresh Bananas",
        category: "fruits",
        price: 64,
        originalPrice: 80,
        rating: 4,
        image: "../assets/banana.jpg",
        description: "Naturally ripened bananas, rich in potassium and nutrients.",
        stock: 22,
        bestseller: true
    },
    {
        id: 7,
        name: "Arhar Dal",
        category: "pulses",
        price: 199,
        rating: 4.5,
        image: "../assets/moong-dal.jpg",
        description: "Premium quality split pigeon peas, rich in protein.",
        bestseller: true
    },
    {
        id: 8,
        name: "Tomato Seeds",
        category: "vegetables",
        price: 169,
        rating: 5,
        image: "../assets/tomato.jpg",
        description: "High-quality tomato seeds for home gardening.",
        bestseller: true
    },
    {
        id: 9,
        name: "Assorted Vegetables",
        category: "vegetables",
        price: 299,
        rating: 4.7,
        image: "../assets/spinach.jpg",
        description: "Freshly harvested mixed vegetables, perfect for daily cooking.",
        bestseller: true
    },
    {
        id: 10,
        name: "Mixed Grains",
        category: "grains",
        price: 349,
        rating: 4.8,
        image: "../assets/rice.jpg",
        description: "Nutritionally rich mixed grains for a healthy diet.",
        bestseller: true
    },
    {
        id: 11,
        name: "Organic Farm Products",
        category: "vegetables",
        price: 499,
        rating: 5,
        image: "../assets/spinach.jpg",
        description: "Premium organic farm products grown without pesticides.",
        bestseller: true
    },
    {
        id: 12,
        name: "Basmati Rice",
        category: "grains",
        price: 299,
        rating: 4.9,
        image: "../assets/rice.jpg",
        description: "Premium basmati rice with aromatic fragrance.",
        bestseller: true
    },
    // Additional Seeds/Pulses
    {
        id: 13,
        name: "Chana Dal",
        category: "pulses",
        price: 179,
        rating: 4.3,
        image: "../assets/moong-dal.jpg",
        description: "Split chickpeas, excellent source of protein and fiber.",
        bestseller: true
    },
    {
        id: 14,
        name: "Masoor Dal",
        category: "pulses",
        price: 159,
        rating: 4.6,
        image: "../assets/moong-dal.jpg",
        description: "Red lentils, quick cooking and nutritious pulse variety.",
        bestseller: true
    },
    {
        id: 15,
        name: "Urad Dal",
        category: "pulses",
        price: 189,
        rating: 4.4,
        image: "../assets/arhar-dal.jpg",
        description: "Black gram, essential for South Indian cuisine.",
        bestseller: true
    },
    // Additional Fruits
    {
        id: 16,
        name: "Fresh Oranges",
        category: "fruits",
        price: 149,
        rating: 4.7,
        image: "../assets/apple.jpg",
        description: "Juicy oranges rich in Vitamin C and natural sweetness.",
        bestseller: true
    },
    {
        id: 17,
        name: "Fresh Mangoes",
        category: "fruits",
        price: 299,
        rating: 4.8,
        image: "../assets/banana.jpg",
        description: "Premium quality mangoes, the king of fruits.",
        bestseller: true
    },
    // Additional Vegetables
    {
        id: 18,
        name: "Fresh Potatoes",
        category: "vegetables",
        price: 89,
        rating: 4.2,
        image: "../assets/tomato.jpg",
        description: "Farm fresh potatoes, perfect for daily cooking.",
        bestseller: true
    },
    {
        id: 19,
        name: "Fresh Onions",
        category: "vegetables",
        price: 99,
        rating: 4.1,
        image: "../assets/spinach.jpg",
        description: "Quality onions, essential for Indian cuisine.",
        bestseller: true
    },
    // Additional Cereals
    {
        id: 20,
        name: "Wheat Flour",
        category: "grains",
        price: 199,
        rating: 4.5,
        image: "../assets/rice.jpg",
        description: "Premium quality wheat flour for daily bread making.",
        bestseller: true
    },
    {
        id: 21,
        name: "Quinoa",
        category: "grains",
        price: 399,
        rating: 4.9,
        image: "../assets/brown-rice.jpg",
        description: "Superfood quinoa, rich in protein and nutrients.",
        bestseller: true
    },
    // Fertilizers
    {
        id: 22,
        name: "Organic Compost",
        category: "fertilizers",
        price: 149,
        rating: 4.6,
        image: "../assets/grains.jpg",
        description: "100% organic compost for healthy plant growth."
    },
    {
        id: 23,
        name: "Bio Fertilizer",
        category: "fertilizers",
        price: 199,
        rating: 4.7,
        image: "../assets/fresh-vegetables.jpg",
        description: "Eco-friendly bio fertilizer for sustainable farming."
    },
    // Tools
    {
        id: 24,
        name: "Garden Spade",
        category: "tools",
        price: 299,
        rating: 4.4,
        image: "../assets/hero-farm.jpg",
        description: "Durable garden spade for digging and planting."
    },
    {
        id: 25,
        name: "Pruning Shears",
        category: "tools",
        price: 199,
        rating: 4.5,
        image: "../assets/about-hero.jpg",
        description: "Professional pruning shears for garden maintenance."
    },
    // Equipment
    {
        id: 26,
        name: "Water Sprinkler",
        category: "equipment",
        price: 599,
        rating: 4.3,
        image: "../assets/farmease_logo.jpg",
        description: "Efficient water sprinkler system for garden irrigation."
    },
    {
        id: 27,
        name: "Greenhouse Kit",
        category: "equipment",
        price: 2999,
        rating: 4.8,
        image: "../assets/hero-farm.jpg",
        description: "Complete greenhouse kit for year-round farming."
    },
    // Pesticides
    {
        id: 28,
        name: "Neem Oil",
        category: "pesticides",
        price: 149,
        rating: 4.5,
        image: "../assets/grains.jpg",
        description: "Natural neem oil pesticide, safe for organic farming."
    },
    {
        id: 29,
        name: "Bio Pesticide",
        category: "pesticides",
        price: 199,
        rating: 4.6,
        image: "../assets/fresh-vegetables.jpg",
        description: "Eco-friendly pesticide for pest control without chemicals."
    }
];

// Sample product data
window.products = [
    {
        id: 1,
        name: "Organic Tomato Seeds",
        category: "vegetables",
        price: 120,
        originalPrice: 150,
        discount: 20,
        rating: 4.5,
        reviews: 128,
        image: "src/assets/tomato.jpg",
        description: "High-quality organic tomato seeds, perfect for home gardening. Produces juicy, flavorful tomatoes.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 2,
        name: "Fresh Apples Pack",
        category: "fruits",
        price: 199,
        originalPrice: 299,
        discount: 35,
        rating: 4.8,
        reviews: 167,
        image: "src/assets/apple.jpg",
        description: "Premium quality apples, handpicked from our organic orchards. Sweet, crisp, and nutritious.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 3,
        name: "Premium Rice Collection",
        category: "grains",
        price: 449,
        originalPrice: 499,
        discount: 10,
        rating: 4.7,
        reviews: 89,
        image: "src/assets/rice.jpg",
        description: "Premium quality rice, carefully selected and processed. Perfect for daily consumption.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 4,
        name: "Organic Spinach Bundle",
        category: "vegetables",
        price: 69,
        originalPrice: 129,
        discount: 45,
        rating: 4.6,
        reviews: 98,
        image: "src/assets/spinach.jpg",
        description: "Fresh, organic spinach, rich in iron and vitamins. Perfect for salads and cooking.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 5,
        name: "Organic Bananas",
        category: "fruits",
        price: 89,
        originalPrice: 119,
        discount: 20,
        rating: 4.4,
        reviews: 143,
        image: "src/assets/banana.jpg",
        description: "Sweet and nutritious organic bananas. Perfect for snacking and smoothies.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 6,
        name: "Premium Grains Collection",
        category: "grains",
        price: 499,
        originalPrice: 799,
        discount: 40,
        rating: 4.5,
        reviews: 89,
        image: "src/assets/grains.jpg",
        description: "A premium collection of various grains, perfect for a healthy diet.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 7,
        name: "Fresh Vegetables Pack",
        category: "vegetables",
        price: 249,
        originalPrice: 349,
        discount: 25,
        rating: 4.7,
        reviews: 156,
        image: "src/assets/fresh-vegetables.jpg",
        description: "A variety of fresh, seasonal vegetables, perfect for daily cooking.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 8,
        name: "Organic Pulses Mix",
        category: "pulses",
        price: 299,
        originalPrice: 399,
        discount: 25,
        rating: 4.6,
        reviews: 112,
        image: "src/assets/moong-dal.jpg",
        description: "A nutritious mix of organic pulses, rich in protein and fiber.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 9,
        name: "Premium Brown Rice",
        category: "grains",
        price: 399,
        originalPrice: 499,
        discount: 20,
        rating: 4.8,
        reviews: 134,
        image: "src/assets/brown-rice.jpg",
        description: "Premium quality brown rice, rich in fiber and nutrients.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 10,
        name: "Organic Arhar Dal",
        category: "pulses",
        price: 199,
        originalPrice: 249,
        discount: 20,
        rating: 4.5,
        reviews: 98,
        image: "src/assets/arhar-dal.jpg",
        description: "High-quality organic arhar dal, perfect for daily cooking.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 11,
        name: "Fresh Carrots",
        category: "vegetables",
        price: 79,
        originalPrice: 99,
        discount: 20,
        rating: 4.4,
        reviews: 87,
        image: "src/assets/carrots.jpg",
        description: "Fresh, crunchy carrots, rich in vitamins and minerals.",
        isNew: false,
        isBestseller: true
    },
    {
        id: 12,
        name: "Organic Mangoes",
        category: "fruits",
        price: 299,
        originalPrice: 399,
        discount: 25,
        rating: 4.9,
        reviews: 178,
        image: "src/assets/mango.jpg",
        description: "Sweet and juicy organic mangoes, perfect for summer.",
        isNew: false,
        isBestseller: true
    }
]; 