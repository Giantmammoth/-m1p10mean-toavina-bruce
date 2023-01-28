const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/car.controller');
const validateObjectId = require('../middleware/validateObjectId')
const Auth = require('../middleware/Auth')
const Car = require('../models/car.model');

router.get('/', Auth, carCtrl.getCarList);
router.post('/', Auth, carCtrl.addNewCar);
router.patch('/', Auth, carCtrl.depotCar);
router.put('/progress/:id', [validateObjectId, Auth], carCtrl.progressPercentage);
router.put('/listReparation/:id', [validateObjectId, Auth], carCtrl.updateListReparation);
router.delete('/', (req, res) => {
    Car.deleteMany({}).then(response => res.status(200).send({ message: "Delete all done" })).catch(e => res.status(401).send({ message: e }))
})

module.exports = router;