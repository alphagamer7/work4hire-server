// Libraries
const express = require('express');
const authController = require('../controllers/auth');
const isAuthenticated = require('../middleware/validate_auth');

// Router
const authRoute = express.Router();

// Account Authentication : POST
router.post("/login", authController.login);

// Account Authentication : POST
router.get("/user", auth(), authController.fetchUser);
router.get("/refresh", authController.refreshToken);



module.exports = authRoute;