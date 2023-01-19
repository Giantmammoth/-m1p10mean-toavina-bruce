const express = require('express');
const router = express.Router();
const serviceCrtl = require('../controllers/service.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const AuthRA =  require ('../middleware/AuthRA')

router.post('/add',[AuthRA], serviceCrtl.addNewService);
router.delete('/delete/:id',[validateObjectId, AuthRA], serviceCrtl.deleteService);
router.put('/update/:id',[validateObjectId, AuthRA], serviceCrtl.updateService);


module.exports = router;