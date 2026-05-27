const express = require('express');
const router = express.Router();
const Research = require('../Models/Research');

router.get('/company/:companyId', async (req, res) => {
  try {
    const research = await Research.find({ companyId: req.params.companyId });
    res.json(research);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const research = new Research(req.body);
    await research.save();
    res.status(201).json(research);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
