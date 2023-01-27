const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.put('/verify/:id', userCtrl.verifyAuth);

router.delete("/signup", userCtrl.delete)
router.get("/", userCtrl.getUser)

module.exports = router;