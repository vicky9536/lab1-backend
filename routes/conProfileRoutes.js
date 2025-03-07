const express = require('express');
const router = express.Router();
const conProfileCtrl = require('../controllers/conProfileCtrl');

router.get('/viewCon/:id', conProfileCtrl.viewConProfile);
router.put('/updateCon/:id', conProfileCtrl.updateConProfile);