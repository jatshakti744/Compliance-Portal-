const express = require('express');
const router = express.Router();
const stockController = require('../Controllers/stockController');
const { protect } = require('../../middlewares/authMiddleware');

router.get('/search', protect, stockController.searchStocks);
router.post('/seed', stockController.seedStocks);

module.exports = router;
