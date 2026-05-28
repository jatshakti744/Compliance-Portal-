const Company = require('../Models/Company');
const User = require('../Models/User');
const crypto = require('crypto');
const sendEmail = require('../Utils/sendEmail');

exports.getAllCompanies = async (req, res) => {
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
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCompany = async (req, res) => {
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

    const rawPassword = crypto.randomBytes(6).toString('hex');
    const adminUser = new User({
      name: `${req.body.companyName} Admin`,
      email: req.body.email,
      password: rawPassword,
      role: 'Admin',
      companyId: newCompany._id
    });

    await adminUser.save();

    const frontendUrl = req.headers.origin || process.env.FRONTEND_URL || 'http://localhost:5173';

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
};

exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`[AUDIT MOCK] Action: Company Updated, ID: ${req.params.id}`);
    res.json({ company: updatedCompany, message: "Company details updated successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.toggleCompanyStatus = async (req, res) => {
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
};

exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'Company was permanently deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setupAdminProfile = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { principalOfficer, complianceOfficer, grievanceOfficer, policies } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    let completionScore = 10; // Basic details present gives 10%
    if (principalOfficer?.name && principalOfficer?.email) completionScore += 20;
    if (complianceOfficer?.name && complianceOfficer?.email) completionScore += 20;
    if (grievanceOfficer?.name && grievanceOfficer?.email) completionScore += 20;
    
    let validPolicies = 0;
    if (policies && Array.isArray(policies)) {
      validPolicies = policies.filter(p => p.content && p.content.trim().length > 10).length;
    }
    completionScore += (validPolicies * 10); // max 3 policies = 30%

    // Generate random passwords
    const poPassword = crypto.randomBytes(6).toString('hex');
    const coPassword = crypto.randomBytes(6).toString('hex');

    // Create Principal Officer
    const poUser = new User({
      name: principalOfficer.name,
      email: principalOfficer.email,
      password: poPassword,
      role: 'Principal Officer',
      companyId: companyId,
      nismCertificateNumber: principalOfficer.nismCertificateNumber,
      nismExpiryDate: principalOfficer.nismExpiryDate
    });
    await poUser.save();

    // Create Compliance Officer
    const coUser = new User({
      name: complianceOfficer?.name,
      email: complianceOfficer?.email,
      password: coPassword,
      role: 'Compliance Officer',
      companyId: companyId,
      nismCertificateNumber: complianceOfficer?.nismCertificateNumber,
      nismExpiryDate: complianceOfficer?.nismExpiryDate
    });
    if (complianceOfficer?.email) await coUser.save();

    // Create Grievance Officer
    const goPassword = crypto.randomBytes(6).toString('hex');
    const goUser = new User({
      name: grievanceOfficer?.name,
      email: grievanceOfficer?.email,
      password: goPassword,
      role: 'Staff', // Or perhaps Grievance Officer if that's a distinct role. Document just says Grievance Officer
      companyId: companyId,
      nismCertificateNumber: grievanceOfficer?.nismCertificateNumber,
      nismExpiryDate: grievanceOfficer?.nismExpiryDate
    });
    if (grievanceOfficer?.email) await goUser.save();

    // In a real scenario, we would send emails to PO, CO, GO with their passwords here.
    if (principalOfficer?.email) console.log(`[EMAIL MOCK] PO Password for ${poUser.email}: ${poPassword}`);
    if (complianceOfficer?.email) console.log(`[EMAIL MOCK] CO Password for ${coUser.email}: ${coPassword}`);
    if (grievanceOfficer?.email) console.log(`[EMAIL MOCK] GO Password for ${goUser.email}: ${goPassword}`);

    // Update Company
    if (principalOfficer?.email) company.principalOfficer = poUser._id;
    if (complianceOfficer?.email) company.complianceOfficer = coUser._id;
    if (grievanceOfficer?.email) company.grievanceOfficer = goUser._id;
    company.policies = policies || [];
    company.completionPercentage = Math.min(100, completionScore);
    company.profileCompleted = true;

    await company.save();

    res.json({ message: "Admin setup completed successfully", company });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }
    res.status(500).json({ message: err.message });
  }
};
