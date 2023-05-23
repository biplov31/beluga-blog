const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.post('/register', homeController.registerUser);
router.post('/login', homeController.loginUser);
router.post('/logout', homeController.logoutUser);

module.exports = router;

