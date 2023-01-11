const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/car.controller');


router.post('/depot/:id', carCtrl.depotCar);


module.exports = router;