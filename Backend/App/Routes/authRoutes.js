const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../Controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
