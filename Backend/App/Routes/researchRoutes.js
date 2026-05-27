const express = require('express');
const router = express.Router();
const researchController = require('../Controllers/researchController');

router.get('/company/:companyId', researchController.getResearchByCompany);
router.post('/', researchController.createResearch);

module.exports = router;
