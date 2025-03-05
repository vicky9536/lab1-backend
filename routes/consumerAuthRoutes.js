const express = require('express');
const router = express.Router();
const consumerAuthCtrl = require('../controllers/consumerAuthCtrl');

router.post('/consumer/signup', consumerAuthCtrl.consumerSignup);
router.post('/consumer/login', consumerAuthCtrl.consumerLogin);
router.post('/consumer/logout', consumerAuthCtrl.consumerLogout);

module.exports = router;