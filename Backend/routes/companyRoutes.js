const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new company
router.post('/', async (req, res) => {
  const company = new Company({
    companyName: req.body.companyName,
    sebiRegNo: req.body.sebiRegNo,
    bseEnrollment: req.body.bseEnrollment,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
    validity: req.body.validity,
    isActive: true
  });

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a company
router.put('/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
