const express = require('express');
const router = express.Router();
const EmcCrtl = require('../controllers/employer.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const Auth =  require ('../middleware/Auth')
const AuthRF =  require ('../middleware/AuthRF')

router.post('/',[AuthRF], EmcCrtl.newEmployer);
router.get('/',[AuthRF], EmcCrtl.getAllEmployer);



module.exports = router;