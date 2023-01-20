const express = require('express');
const router = express.Router();
const facCrtl = require('../controllers/facture.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const Auth =  require ('../middleware/Auth')

router.put('/payement/:id',[validateObjectId, Auth], facCrtl.confirmePay);


module.exports = router;