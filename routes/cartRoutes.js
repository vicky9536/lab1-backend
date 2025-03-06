const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartCtrl');

router.get('/getCart/:consumerId', cartCtrl.getCart);
router.post('/addCart', cartCtrl.addCart);
router.delete('/deleteCart/:id', cartCtrl.deleteCart);

module.exports = router;