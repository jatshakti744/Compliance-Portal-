const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/clientController');
const { protect } = require('../../middlewares/authMiddleware');

router.use(protect); // Ensure user is authenticated for all client routes

router.get('/', clientController.getAllClients);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);

module.exports = router;
