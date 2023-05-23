const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/profile', userController.verifyLogin);

module.exports = router;