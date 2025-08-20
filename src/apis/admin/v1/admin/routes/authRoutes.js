const express = require('express');
const { login, refreshToken, forgotPassword, resetPassword } = require('../controller/authController.js')

const router = express.Router();

router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword)

module.exports = router;