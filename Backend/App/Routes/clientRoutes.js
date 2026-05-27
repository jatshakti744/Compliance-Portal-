const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/clientController');

router.get('/', clientController.getAllClients);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);

module.exports = router;
