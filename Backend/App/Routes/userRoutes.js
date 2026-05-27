const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Get all staff for a company
router.get('/company/:companyId', userController.getStaffByCompany);

// Create staff (ensure NISM tracking)
router.post('/', userController.createStaff);

module.exports = router;
