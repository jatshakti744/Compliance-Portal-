const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect);

router.get('/dashboard', adminController.getDashboardData);

module.exports = router;
