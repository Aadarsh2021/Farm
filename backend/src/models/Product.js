const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        required: true,
        enum: [
            // Fruits
            'tropical-fruits', 'citrus-fruits', 'berries', 'stone-fruits', 'exotic-fruits',
            // Vegetables
            'leafy-greens', 'root-vegetables', 'cruciferous', 'nightshades', 'alliums',
            // Cereals & Grains
            'rice', 'wheat', 'millets', 'pulses', 'legumes',
            // Dairy & Eggs
            'milk', 'cheese', 'yogurt', 'butter', 'eggs',
            // Meat & Poultry
            'beef', 'pork', 'chicken', 'lamb', 'seafood',
            // Spices & Herbs
            'spices', 'herbs', 'seasonings', 'condiments',
            // Organic & Specialty
            'organic', 'gluten-free', 'vegan', 'keto-friendly',
            // Processed Foods
            'canned-goods', 'frozen-foods', 'snacks', 'beverages'
        ]
    },
    subCategory: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    nutritionalInfo: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        fiber: Number,
        vitamins: [String],
        minerals: [String]
    },
    storageInstructions: String,
    shelfLife: String,
    origin: String,
    isOrganic: {
        type: Boolean,
        default: false
    },
    isGlutenFree: {
        type: Boolean,
        default: false
    },
    isVegan: {
        type: Boolean,
        default: false
    },
    allergens: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema); 