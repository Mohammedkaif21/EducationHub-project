const express = require('express');
const { login, refreshToken, forgotPassword, resetPassword } = require('../controller/authController.js');
const validateResetPassword = require('../middlewares/validateResetPassword.js');
const validateForgotPassword = require('../middlewares/validateForgotPassword.js');

const router = express.Router();

router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password",validateForgotPassword, forgotPassword);
router.post("/reset-password",validateResetPassword, resetPassword)

module.exports = router;