const express = require('express');
const router = express.Router();
const complianceController = require('../Controllers/complianceController');

router.get('/company/:companyId', complianceController.getComplianceLogsByCompany);
router.post('/', complianceController.createComplianceLog);

module.exports = router;
