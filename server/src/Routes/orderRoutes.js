const express = require('express');
const router = express.Router();

const { getOrder, updateProductStatus, getUserOrders, rateProduct } = require('../Controller/orderController');
const auth = require('../Middleware/auth');
const { apiLimiter } = require('../Middleware/ratelimit');

router.get('/myOrders',apiLimiter, auth, getOrder);
router.put('/updateOrderProductStatus/:id', apiLimiter, auth, updateProductStatus);
router.get('/orders', apiLimiter, auth, getUserOrders);
router.post('/rateProduct', apiLimiter, auth, rateProduct);

module.exports = router;