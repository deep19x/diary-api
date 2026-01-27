const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth');

route.post('/register',authController.registerUser);
route.post('/login',authController.loginUser);
route.post('/logout',authController.logoutUser);

module.exports = route;