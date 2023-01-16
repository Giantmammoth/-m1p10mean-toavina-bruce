const express = require('express');
const router = express.Router();
const facCrtl = require('../controllers/facture.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const Auth =  require ('../middleware/Auth')

router.post('/car/:id',[validateObjectId, Auth], facCrtl.creatFacture);
router.put('/:id/:descri/:prix',[validateObjectId, Auth], facCrtl.addDoneReparation);


module.exports = router;