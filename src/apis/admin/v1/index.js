const express = require('express');
const authRoutes = require('./admin/routes/authRoutes.js');

const router = express.Router();
// Define the base route for admin API
router.use("/user", authRoutes);

module.exports = router