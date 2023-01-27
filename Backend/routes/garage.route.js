const express = require('express');
const router = express.Router();
const garCrtl = require('../controllers/garage.controller');
<<<<<<< HEAD
const validateObjectId = require('../middleware/validateObjectId')
const AuthRF = require('../middleware/AuthRF')
=======
const validateObjectId = require ('../middleware/validateObjectId')
const AuthRF =  require ('../middleware/AuthRF')

router.get('/',[AuthRF], garCrtl.getStat);
>>>>>>> 3fdae6a33f9b1866b5dec782bc0d5547e6e6fe04

router.post('/', [AuthRF], garCrtl.statGarage);
router.get('/', [AuthRF], garCrtl.getCarListInGarage);

module.exports = router;