const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

router.post('/create', dishController.createDish);
router.post('/update/:id', dishController.updateDish);
router.delete('/delete/:id', dishController.deleteDish);

module.exports = router;
