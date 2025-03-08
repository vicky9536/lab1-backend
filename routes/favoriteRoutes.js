const express = require('express');
const router = express.Router();
const favoriteCtrl = require('../controllers/favoriteCtrl');

router.post('/addFavorite', favoriteCtrl.addFavorite);
router.delete('/removeFavorite/:id', favoriteCtrl.removeFavorite);

module.exports = router;