const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/car.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const Auth =  require ('../middleware/Auth')

router.post('/depot/:id',[validateObjectId, Auth], carCtrl.depotCar);


module.exports = router;