const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect);

router.get('/dashboard', adminController.getDashboardData);

router.get('/staff', adminController.getStaffList);
router.post('/staff', adminController.createStaff);

router.get('/company/profile', adminController.getMyCompany);
router.put('/company/profile', adminController.updateMyCompany);

module.exports = router;
