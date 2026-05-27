const express = require('express');
const router = express.Router();
const Company = require('../Models/Company');
const User = require('../Models/User');
const crypto = require('crypto');
const sendEmail = require('../Utils/sendEmail');

// Get all companies
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { sebiRegNo: { $regex: search, $options: 'i' } }
      ];
    }

    const totalCount = await Company.countDocuments(query);
    const companies = await Company.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      data: companies,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new company and auto-generate Admin User
router.post('/', async (req, res) => {
  try {
    const company = new Company({
      companyName: req.body.companyName,
      sebiRegNo: req.body.sebiRegNo,
      bseEnrollment: req.body.bseEnrollment,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address,
      validity: req.body.validity,
      certificateUrl: req.body.certificateUrl,
      isActive: true
    });

    const newCompany = await company.save();

    // Auto-create Admin User
    const rawPassword = crypto.randomBytes(6).toString('hex'); // 12 char password
    const adminUser = new User({
      name: `${req.body.companyName} Admin`,
      email: req.body.email,
      password: rawPassword,
      role: 'Admin',
      companyId: newCompany._id
    });

    await adminUser.save();

    // Determine frontend URL dynamically from the request headers
    const frontendUrl = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

    // Send actual email using the utility
    await sendEmail({
      to: req.body.email,
      subject: "Welcome to RAGCP Platform - Admin Credentials",
      html: `
        <h2>Welcome to RAGCP Platform</h2>
        <p>Dear Admin,</p>
        <p>Your RA Entity <strong>${req.body.companyName}</strong> has been successfully registered on the Compliance Portal.</p>
        <p>Here are your initial login credentials:</p>
        <p><strong>Login URL:</strong> <a href="${frontendUrl}/signin">${frontendUrl}/signin</a></p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Password:</strong> ${rawPassword}</p>
        <p>Please login and complete your First Login Wizard setup.</p>
      `
    });

    console.log(`[AUDIT MOCK] Action: Company Created, ID: ${newCompany._id}, Admin User Created.`);

    res.status(201).json({ company: newCompany, message: "Company and Admin User created successfully. Credentials sent to email." });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "A company or user with this email/SEBI Reg No already exists." });
    }
    res.status(400).json({ message: err.message });
  }
});

// Update a company (Edit)
router.put('/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`[AUDIT MOCK] Action: Company Updated, ID: ${req.params.id}`);
    res.json({ company: updatedCompany, message: "Company details updated successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle Disable/Enable
router.put('/:id/status', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if(!company) return res.status(404).json({message: "Company not found"});
    
    company.isActive = !company.isActive;
    await company.save();

    console.log(`[AUDIT MOCK] Action: Company Status Toggled, ID: ${company._id}, New Status: ${company.isActive ? 'Active' : 'Inactive'}`);
    res.json({ company, message: `Company status changed to ${company.isActive ? 'Active' : 'Inactive'} successfully.` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company was permanently deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
