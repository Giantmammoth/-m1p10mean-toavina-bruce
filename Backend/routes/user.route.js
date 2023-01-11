const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.put('/verify/:id', userCtrl.verifyAuth);

module.exports = router;