const express = require('express');
const router = express.Router();

const { getOrder, updateProductStatus } = require('../Controller/orderController');
const auth = require('../Middleware/auth');

router.get('/myOrders', auth, getOrder);
router.put('/updateOrderProductStatus/:id', auth, updateProductStatus);

module.exports = router;