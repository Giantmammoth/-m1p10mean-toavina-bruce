const express = require('express');
const router = express.Router();
const garCrtl = require('../controllers/garage.controller');
const AuthRF = require('../middleware/AuthRF')
const validateObjectId = require('../middleware/validateObjectId')

router.get('/', [AuthRF], garCrtl.getStat);

router.post('/', [AuthRF], garCrtl.statGarage);
router.get('/', [AuthRF], garCrtl.getCarListInGarage);

module.exports = router;