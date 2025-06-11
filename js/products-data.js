// Product data
window.products = [
    {
        id: 1,
        name: "Fresh Apples",
        category: "fruits",
        price: 199,
        rating: 4.5,
        image: "../images/apple.jpg",
        description: "Premium quality apples, hand-picked and carefully selected."
    },
    {
        id: 2,
        name: "Fresh Bananas",
        category: "fruits",
        price: 99,
        rating: 5,
        image: "../images/banana.jpg",
        description: "Naturally ripened bananas, rich in potassium and nutrients."
    },
    {
        id: 3,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 129,
        rating: 4,
        image: "../images/tomato.jpg",
        description: "Juicy, vine-ripened tomatoes perfect for salads and cooking."
    },
    {
        id: 4,
        name: "Fresh Spinach",
        category: "vegetables",
        price: 149,
        rating: 4.5,
        image: "../images/spinach.jpg",
        description: "Organic spinach leaves, packed with essential nutrients."
    },
    {
        id: 5,
        name: "Premium Rice",
        category: "cereals",
        price: 249,
        rating: 5,
        image: "../images/rice.jpg",
        description: "High-quality long grain rice, perfect for daily meals."
    },
    {
        id: 6,
        name: "Brown Rice",
        category: "cereals",
        price: 299,
        rating: 4,
        image: "../images/brown-rice.jpg",
        description: "Nutritious brown rice, rich in fiber and essential minerals."
    },
    {
        id: 7,
        name: "Arhar Dal",
        category: "seeds",
        price: 199,
        rating: 4.5,
        image: "../images/arhar-dal.jpg",
        description: "Premium quality split pigeon peas, rich in protein."
    },
    {
        id: 8,
        name: "Moong Dal",
        category: "seeds",
        price: 169,
        rating: 5,
        image: "../images/moong-dal.jpg",
        description: "Split green gram, a nutritious and versatile pulse."
    },
    {
        id: 9,
        name: "Assorted Vegetables",
        category: "vegetables",
        price: 299,
        rating: 4.7,
        image: "../images/fresh-vegetables.jpg",
        description: "Freshly harvested mixed vegetables, perfect for daily cooking."
    },
    {
        id: 10,
        name: "Mixed Grains",
        category: "cereals",
        price: 349,
        rating: 4.8,
        image: "../images/grains.jpg",
        description: "Nutritionally rich mixed grains for a healthy diet."
    },
    {
        id: 11,
        name: "Organic Farm Products",
        category: "vegetables",
        price: 499,
        rating: 5,
        image: "../images/hero-farm.jpg",
        description: "Premium organic farm products grown without pesticides."
    },
    {
        id: 12,
        name: "Special Farming Package",
        category: "tools",
        price: 999,
        rating: 4.9,
        image: "../images/about-hero.jpg",
        description: "Complete package for starting your own small farm."
    },
    // Additional Seeds/Pulses
    {
        id: 13,
        name: "Chana Dal",
        category: "seeds",
        price: 179,
        rating: 4.3,
        image: "../images/arhar-dal.jpg",
        description: "Split chickpeas, excellent source of protein and fiber."
    },
    {
        id: 14,
        name: "Masoor Dal",
        category: "seeds",
        price: 159,
        rating: 4.6,
        image: "../images/moong-dal.jpg",
        description: "Red lentils, quick cooking and nutritious pulse variety."
    },
    {
        id: 15,
        name: "Urad Dal",
        category: "seeds",
        price: 189,
        rating: 4.4,
        image: "../images/arhar-dal.jpg",
        description: "Black gram, essential for South Indian cuisine."
    },
    // Additional Fruits
    {
        id: 16,
        name: "Fresh Oranges",
        category: "fruits",
        price: 149,
        rating: 4.7,
        image: "../images/apple.jpg",
        description: "Juicy oranges rich in Vitamin C and natural sweetness."
    },
    {
        id: 17,
        name: "Fresh Mangoes",
        category: "fruits",
        price: 299,
        rating: 4.8,
        image: "../images/banana.jpg",
        description: "Premium quality mangoes, the king of fruits."
    },
    // Additional Vegetables
    {
        id: 18,
        name: "Fresh Potatoes",
        category: "vegetables",
        price: 89,
        rating: 4.2,
        image: "../images/tomato.jpg",
        description: "Farm fresh potatoes, perfect for daily cooking."
    },
    {
        id: 19,
        name: "Fresh Onions",
        category: "vegetables",
        price: 99,
        rating: 4.1,
        image: "../images/spinach.jpg",
        description: "Quality onions, essential for Indian cuisine."
    },
    // Additional Cereals
    {
        id: 20,
        name: "Wheat Flour",
        category: "cereals",
        price: 199,
        rating: 4.5,
        image: "../images/rice.jpg",
        description: "Premium quality wheat flour for daily bread making."
    },
    {
        id: 21,
        name: "Quinoa",
        category: "cereals",
        price: 399,
        rating: 4.9,
        image: "../images/brown-rice.jpg",
        description: "Superfood quinoa, rich in protein and nutrients."
    },
    // Fertilizers
    {
        id: 22,
        name: "Organic Compost",
        category: "fertilizers",
        price: 149,
        rating: 4.6,
        image: "../images/grains.jpg",
        description: "100% organic compost for healthy plant growth."
    },
    {
        id: 23,
        name: "Bio Fertilizer",
        category: "fertilizers",
        price: 199,
        rating: 4.7,
        image: "../images/fresh-vegetables.jpg",
        description: "Eco-friendly bio fertilizer for sustainable farming."
    },
    // Tools
    {
        id: 24,
        name: "Garden Spade",
        category: "tools",
        price: 299,
        rating: 4.4,
        image: "../images/hero-farm.jpg",
        description: "Durable garden spade for digging and planting."
    },
    {
        id: 25,
        name: "Pruning Shears",
        category: "tools",
        price: 199,
        rating: 4.5,
        image: "../images/about-hero.jpg",
        description: "Sharp pruning shears for plant maintenance."
    },
    // Equipment
    {
        id: 26,
        name: "Water Sprinkler",
        category: "equipment",
        price: 599,
        rating: 4.3,
        image: "../images/farmease_logo.jpg",
        description: "Efficient water sprinkler system for garden irrigation."
    },
    {
        id: 27,
        name: "Greenhouse Kit",
        category: "equipment",
        price: 2999,
        rating: 4.8,
        image: "../images/hero-farm.jpg",
        description: "Complete greenhouse kit for year-round farming."
    },
    // Pesticides
    {
        id: 28,
        name: "Neem Oil",
        category: "pesticides",
        price: 149,
        rating: 4.5,
        image: "../images/grains.jpg",
        description: "Natural neem oil pesticide, safe for organic farming."
    },
    {
        id: 29,
        name: "Bio Pesticide",
        category: "pesticides",
        price: 199,
        rating: 4.6,
        image: "../images/fresh-vegetables.jpg",
        description: "Eco-friendly pesticide for pest control without chemicals."
    }
]; 