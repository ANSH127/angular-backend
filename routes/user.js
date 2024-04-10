
const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/userController');
// login route

router.post('/login', UserControllers.loginUser);

// signup route

router.post('/signup', UserControllers.signupUser);

module.exports = router;