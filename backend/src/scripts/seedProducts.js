const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
    // Tropical Fruits
    {
        name: 'Organic Mango',
        description: 'Sweet and juicy organic mangoes from India',
        price: 2.99,
        originalPrice: 3.99,
        discount: 25,
        category: 'tropical-fruits',
        subCategory: 'mango',
        image: 'images/mango.jpg',
        stock: 100,
        nutritionalInfo: {
            calories: 60,
            protein: 0.8,
            carbs: 15,
            fat: 0.4,
            fiber: 1.6,
            vitamins: ['Vitamin C', 'Vitamin A'],
            minerals: ['Potassium', 'Magnesium']
        },
        storageInstructions: 'Store at room temperature until ripe, then refrigerate',
        shelfLife: '5-7 days',
        origin: 'India',
        isOrganic: true,
        isGlutenFree: true,
        isVegan: true,
        allergens: []
    },
    // Citrus Fruits
    {
        name: 'Premium Navel Oranges',
        description: 'Sweet and seedless navel oranges from California',
        price: 1.99,
        originalPrice: 2.49,
        discount: 20,
        category: 'citrus-fruits',
        subCategory: 'orange',
        image: 'images/orange.jpg',
        stock: 150,
        nutritionalInfo: {
            calories: 62,
            protein: 1.2,
            carbs: 15.4,
            fat: 0.2,
            fiber: 3.1,
            vitamins: ['Vitamin C', 'Vitamin B6'],
            minerals: ['Potassium', 'Calcium']
        },
        storageInstructions: 'Store in a cool, dry place',
        shelfLife: '2-3 weeks',
        origin: 'California, USA',
        isOrganic: false,
        isGlutenFree: true,
        isVegan: true,
        allergens: []
    },
    // Leafy Greens
    {
        name: 'Organic Baby Spinach',
        description: 'Fresh organic baby spinach leaves',
        price: 3.49,
        originalPrice: 3.99,
        discount: 12,
        category: 'leafy-greens',
        subCategory: 'spinach',
        image: 'images/spinach.jpg',
        stock: 80,
        nutritionalInfo: {
            calories: 23,
            protein: 2.9,
            carbs: 3.6,
            fat: 0.4,
            fiber: 2.2,
            vitamins: ['Vitamin K', 'Vitamin A', 'Vitamin C'],
            minerals: ['Iron', 'Calcium', 'Magnesium']
        },
        storageInstructions: 'Refrigerate in a sealed container',
        shelfLife: '5-7 days',
        origin: 'Local Farm',
        isOrganic: true,
        isGlutenFree: true,
        isVegan: true,
        allergens: []
    },
    // Dairy
    {
        name: 'Organic Whole Milk',
        description: 'Fresh organic whole milk from grass-fed cows',
        price: 4.99,
        originalPrice: 5.49,
        discount: 9,
        category: 'milk',
        subCategory: 'whole-milk',
        image: 'images/milk.jpg',
        stock: 50,
        nutritionalInfo: {
            calories: 150,
            protein: 8,
            carbs: 12,
            fat: 8,
            fiber: 0,
            vitamins: ['Vitamin D', 'Vitamin B12', 'Calcium'],
            minerals: ['Calcium', 'Phosphorus', 'Potassium']
        },
        storageInstructions: 'Keep refrigerated at all times',
        shelfLife: '7-10 days',
        origin: 'Local Dairy',
        isOrganic: true,
        isGlutenFree: true,
        isVegan: false,
        allergens: ['Milk']
    },
    // Meat
    {
        name: 'Grass-Fed Beef Steak',
        description: 'Premium grass-fed beef steak, tender and flavorful',
        price: 12.99,
        originalPrice: 14.99,
        discount: 13,
        category: 'beef',
        subCategory: 'steak',
        image: 'images/beef-steak.jpg',
        stock: 30,
        nutritionalInfo: {
            calories: 250,
            protein: 26,
            carbs: 0,
            fat: 17,
            fiber: 0,
            vitamins: ['Vitamin B12', 'Vitamin B6', 'Niacin'],
            minerals: ['Iron', 'Zinc', 'Selenium']
        },
        storageInstructions: 'Keep refrigerated or frozen',
        shelfLife: '3-5 days refrigerated, 6-12 months frozen',
        origin: 'Local Ranch',
        isOrganic: true,
        isGlutenFree: true,
        isVegan: false,
        allergens: []
    },
    // Spices
    {
        name: 'Organic Turmeric Powder',
        description: 'Premium organic turmeric powder with high curcumin content',
        price: 5.99,
        originalPrice: 6.99,
        discount: 14,
        category: 'spices',
        subCategory: 'turmeric',
        image: 'images/turmeric.jpg',
        stock: 200,
        nutritionalInfo: {
            calories: 29,
            protein: 0.9,
            carbs: 6.3,
            fat: 0.3,
            fiber: 2.1,
            vitamins: ['Vitamin C', 'Vitamin B6'],
            minerals: ['Iron', 'Manganese', 'Potassium']
        },
        storageInstructions: 'Store in a cool, dry place in an airtight container',
        shelfLife: '2-3 years',
        origin: 'India',
        isOrganic: true,
        isGlutenFree: true,
        isVegan: true,
        allergens: []
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farmease', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new products
        await Product.insertMany(sampleProducts);
        console.log('Successfully seeded products');

        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts(); 