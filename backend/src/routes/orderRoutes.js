const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// User routes
router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

// Admin routes
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);

module.exports = router; 