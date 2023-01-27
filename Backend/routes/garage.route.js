const express = require('express');
const router = express.Router();
const garCrtl = require('../controllers/garage.controller');
const validateObjectId = require('../middleware/validateObjectId')
const AuthRF = require('../middleware/AuthRF')

router.post('/', [AuthRF], garCrtl.statGarage);
router.get('/', [AuthRF], garCrtl.getCarListInGarage);

module.exports = router;