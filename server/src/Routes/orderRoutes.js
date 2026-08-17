const express = require('express');
const router = express.Router();

const { getOrder, updateProductStatus, getUserOrders, rateProduct } = require('../Controller/orderController');
const auth = require('../Middleware/auth');

router.get('/myOrders', auth, getOrder);
router.put('/updateOrderProductStatus/:id', auth, updateProductStatus);
router.get('/orders', auth, getUserOrders);
router.post('/rateProduct', auth, rateProduct);

module.exports = router;