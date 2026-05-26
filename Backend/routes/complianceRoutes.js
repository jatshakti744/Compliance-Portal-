const express = require('express');
const router = express.Router();
const ComplianceLog = require('../models/ComplianceLog');

router.get('/company/:companyId', async (req, res) => {
  try {
    const logs = await ComplianceLog.find({ companyId: req.params.companyId });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const log = new ComplianceLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
