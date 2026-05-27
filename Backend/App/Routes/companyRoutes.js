const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/companyController');

router.get('/', companyController.getAllCompanies);
router.post('/', companyController.createCompany);
router.put('/:id', companyController.updateCompany);
router.put('/:id/status', companyController.toggleCompanyStatus);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;
