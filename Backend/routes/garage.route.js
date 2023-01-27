const express = require('express');
const router = express.Router();
const garCrtl = require('../controllers/garage.controller');
const validateObjectId = require ('../middleware/validateObjectId')
const AuthRF =  require ('../middleware/AuthRF')

router.get('/',[AuthRF], garCrtl.getStat);


module.exports = router;