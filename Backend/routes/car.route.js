const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/car.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const Auth =  require ('../middleware/Auth')

router.post('/depot/:id',[validateObjectId, Auth], carCtrl.depotCar);
router.put('/progress/:id',[validateObjectId, Auth], carCtrl.progressPercentage);
router.put('/listReparation/:id',[validateObjectId, Auth], carCtrl.updateListReparation);


module.exports = router;