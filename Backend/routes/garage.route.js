const express = require('express');
const router = express.Router();
const garCrtl = require('../controllers/garage.controller');
const AuthRF = require('../middleware/AuthRF')
const AuthRA = require('../middleware/AuthRA')
const validateObjectId = require('../middleware/validateObjectId')

router.get('/', [AuthRF], garCrtl.getStat);

router.post('/', [AuthRF], garCrtl.statGarage);
router.get('/carList', [AuthRA], garCrtl.getCarListInGarage);

module.exports = router;