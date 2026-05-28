const express = require('express');
const router = express.Router();
const complianceController = require('../Controllers/complianceController');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect);

router.get('/matrix', complianceController.getPenaltyMatrix);
router.get('/', complianceController.getComplianceLogsByCompany);
router.post('/', complianceController.createComplianceLog);

module.exports = router;
