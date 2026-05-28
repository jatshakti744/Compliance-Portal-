const express = require('express');
const router = express.Router();
const researchController = require('../Controllers/researchController');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect);

router.get('/', researchController.getResearchByCompany);
router.post('/', researchController.createResearch);

module.exports = router;
