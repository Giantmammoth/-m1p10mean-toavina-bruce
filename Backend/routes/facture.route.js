const express = require('express');
const router = express.Router();
const facCrtl = require('../controllers/facture.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const Auth =  require ('../middleware/Auth')
const AuthRF =  require ('../middleware/AuthRF')

router.put('/confirmeCommande/:id',[validateObjectId, Auth], facCrtl.confirmeCommande);
router.put('/confirmePayement/:id',[validateObjectId, AuthRF], facCrtl.confirmePay);
router.put('/payement/:id',[validateObjectId, Auth], facCrtl.payement);
router.get('/',AuthRF, facCrtl.getAllFacture);


module.exports = router;