// Function to get correct image path based on current location
function getImagePath(imageName) {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        // We're in a subdirectory, go up one level
        return `../assets/${imageName}`;
    } else {
        // We're in the root directory
        return `src/assets/${imageName}`;
    }
}

// Product data
window.products = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 64,
        originalPrice: 80,
        rating: 5,
        image: getImagePath("tomato.jpg"),
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
        image: getImagePath("apple.jpg"),
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
        image: getImagePath("rice.jpg"),
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
        image: getImagePath("moong-dal.jpg"),
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
        image: getImagePath("spinach.jpg"),
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
        image: getImagePath("banana.jpg"),
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
        image: getImagePath("arhar-dal.jpg"),
        description: "Premium quality split pigeon peas, rich in protein.",
        bestseller: true
    },
    {
        id: 8,
        name: "Tomato Seeds",
        category: "seeds",
        price: 169,
        rating: 5,
        image: getImagePath("seeds.jpg"),
        description: "High-quality tomato seeds for home gardening.",
        bestseller: true
    },
    {
        id: 9,
        name: "Assorted Vegetables",
        category: "vegetables",
        price: 299,
        rating: 4.7,
        image: getImagePath("fresh-vegetables.jpg"),
        description: "Freshly harvested mixed vegetables, perfect for daily cooking.",
        bestseller: true
    },
    {
        id: 10,
        name: "Mixed Grains",
        category: "grains",
        price: 349,
        rating: 4.8,
        image: getImagePath("grains.jpg"),
        description: "Nutritionally rich mixed grains for a healthy diet.",
        bestseller: true
    },
    {
        id: 11,
        name: "Organic Farm Products",
        category: "vegetables",
        price: 499,
        rating: 5,
        image: getImagePath("fresh-vegetables.jpg"),
        description: "Premium organic farm products grown without pesticides.",
        bestseller: true
    },
    {
        id: 12,
        name: "Basmati Rice",
        category: "grains",
        price: 299,
        rating: 4.9,
        image: getImagePath("basmati-rice.jpg"),
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
        image: getImagePath("chickpeas.jpg"),
        description: "Split chickpeas, excellent source of protein and fiber.",
        stock: 22,
        bestseller: true
    },
    {
        id: 14,
        name: "Masoor Dal",
        category: "pulses",
        price: 159,
        rating: 4.6,
        image: getImagePath("moong-dal.jpg"),
        description: "Red lentils, quick cooking and nutritious pulse variety.",
        stock: 19,
        bestseller: true
    },
    {
        id: 15,
        name: "Urad Dal",
        category: "pulses",
        price: 189,
        rating: 4.4,
        image: getImagePath("arhar-dal.jpg"),
        description: "Black gram, essential for South Indian cuisine.",
        stock: 16,
        bestseller: true
    },
    // Additional Fruits
    {
        id: 16,
        name: "Fresh Oranges",
        category: "fruits",
        price: 149,
        rating: 4.7,
        image: getImagePath("apple.jpg"),
        description: "Juicy oranges rich in Vitamin C and natural sweetness.",
        stock: 15,
        bestseller: true
    },
    {
        id: 17,
        name: "Fresh Mangoes",
        category: "fruits",
        price: 299,
        rating: 4.8,
        image: getImagePath("mango.jpg"),
        description: "Premium quality mangoes, the king of fruits.",
        stock: 8,
        bestseller: true
    },
    // Additional Vegetables
    {
        id: 18,
        name: "Fresh Potatoes",
        category: "vegetables",
        price: 89,
        rating: 4.2,
        image: getImagePath("fresh-vegetables.jpg"),
        description: "Farm fresh potatoes, perfect for daily cooking.",
        stock: 30,
        bestseller: true
    },
    {
        id: 19,
        name: "Fresh Onions",
        category: "vegetables",
        price: 99,
        rating: 4.1,
        image: getImagePath("onion.jpg"),
        description: "Quality onions, essential for Indian cuisine.",
        stock: 25,
        bestseller: true
    },
    // Additional Cereals
    {
        id: 20,
        name: "Wheat Flour",
        category: "grains",
        price: 199,
        rating: 4.5,
        image: getImagePath("wheat.jpg"),
        description: "Premium quality wheat flour for daily bread making.",
        stock: 20,
        bestseller: true
    },
    {
        id: 21,
        name: "Quinoa",
        category: "grains",
        price: 399,
        rating: 4.9,
        image: getImagePath("brown-rice.jpg"),
        description: "Superfood quinoa, rich in protein and nutrients.",
        stock: 10,
        bestseller: true
    },
    // Fertilizers
    {
        id: 22,
        name: "Organic Compost",
        category: "fertilizers",
        price: 149,
        rating: 4.6,
        image: getImagePath("grains.jpg"),
        description: "100% organic compost for healthy plant growth.",
        stock: 15
    },
    {
        id: 23,
        name: "Bio Fertilizer",
        category: "fertilizers",
        price: 199,
        rating: 4.7,
        image: getImagePath("fresh-vegetables.jpg"),
        description: "Eco-friendly bio fertilizer for sustainable farming.",
        stock: 12
    },
    // Tools
    {
        id: 24,
        name: "Garden Spade",
        category: "tools",
        price: 299,
        rating: 4.4,
        image: getImagePath("hero-farm.jpg"),
        description: "Durable garden spade for digging and planting.",
        stock: 8
    },
    {
        id: 25,
        name: "Pruning Shears",
        category: "tools",
        price: 199,
        rating: 4.5,
        image: getImagePath("about-hero.jpg"),
        description: "Professional pruning shears for garden maintenance.",
        stock: 6
    },
    // Equipment
    {
        id: 26,
        name: "Water Sprinkler",
        category: "equipment",
        price: 599,
        rating: 4.3,
        image: getImagePath("farmease_logo.jpg"),
        description: "Efficient water sprinkler system for garden irrigation.",
        stock: 5
    },
    {
        id: 27,
        name: "Greenhouse Kit",
        category: "equipment",
        price: 2999,
        rating: 4.8,
        image: getImagePath("hero-farm.jpg"),
        description: "Complete greenhouse kit for year-round farming.",
        stock: 3
    },
    // Pesticides
    {
        id: 28,
        name: "Neem Oil",
        category: "pesticides",
        price: 149,
        rating: 4.5,
        image: getImagePath("grains.jpg"),
        description: "Natural neem oil pesticide, safe for organic farming.",
        stock: 18
    },
    {
        id: 29,
        name: "Bio Pesticide",
        category: "pesticides",
        price: 199,
        rating: 4.6,
        image: getImagePath("fresh-vegetables.jpg"),
        description: "Eco-friendly pesticide for pest control without chemicals.",
        stock: 14
    },
    // Home page featured products
    {
        id: 101,
        name: "Premium Organic Vegetables",
        category: "vegetables",
        price: 249,
        originalPrice: 299,
        rating: 4.8,
        image: getImagePath("fresh-vegetables.jpg"),
        description: "Farm-fresh, handpicked vegetables delivered straight to your doorstep.",
        stock: 25,
        bestseller: true
    },
    {
        id: 102,
        name: "Exotic Fresh Fruits",
        category: "fruits",
        price: 349,
        originalPrice: 399,
        rating: 4.9,
        image: getImagePath("apple.jpg"),
        description: "Premium selection of seasonal fruits, handpicked at peak ripeness.",
        stock: 18,
        bestseller: true
    },
    {
        id: 103,
        name: "Premium Grain Collection",
        category: "grains",
        price: 449,
        originalPrice: 499,
        rating: 4.7,
        image: getImagePath("grains.jpg"),
        description: "High-quality grains for a nutritious and healthy diet.",
        stock: 30,
        bestseller: true
    },
    {
        id: 104,
        name: "Organic Pulse Variety",
        category: "pulses",
        price: 299,
        originalPrice: 349,
        rating: 4.6,
        image: getImagePath("moong-dal.jpg"),
        description: "Nutritious mix of organic pulses, rich in protein and fiber.",
        stock: 22,
        bestseller: true
    },
    {
        id: 105,
        name: "Fresh Leafy Greens",
        category: "vegetables",
        price: 179,
        originalPrice: 199,
        rating: 4.5,
        image: getImagePath("spinach.jpg"),
        description: "Fresh, organic leafy greens packed with essential nutrients.",
        stock: 15,
        bestseller: true
    },
    {
        id: 106,
        name: "Heritage Rice Varieties",
        category: "grains",
        price: 399,
        originalPrice: 449,
        rating: 4.8,
        image: getImagePath("basmati-rice.jpg"),
        description: "Traditional rice varieties with exceptional taste and nutrition.",
        stock: 20,
        bestseller: true
    }
]; 
