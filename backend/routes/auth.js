const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth');

route.post('/register',authController.registerUser);

module.exports = route;