const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderCtrl');

router.get('/viewOrder', orderCtrl.viewOrder);
router.post('/create', orderCtrl.createOrder);
router.put('/update/:id', orderCtrl.updateOrderStatus);

module.exports = router;