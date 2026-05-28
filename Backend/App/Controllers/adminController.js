const Client = require('../Models/Client');
const Company = require('../Models/Company');
const User = require('../Models/User');

exports.getDashboardData = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied. No company associated with this user." });

    // Total Clients
    const totalClients = await Client.countDocuments({ companyId });

    const Company = require('../Models/Company');
    const company = await Company.findById(companyId);

    // Active Subscriptions
    const activeSubscriptions = await Client.countDocuments({ companyId, subscriptionActive: true });

    // Pending KYC
    const pendingKYC = await Client.countDocuments({ companyId, kycStatus: 'Pending' });

    // Alerts / Compliance (Mocking this for now until compliance module is fully wired)
    const alerts = 0; // Replace with actual query against Compliance Logs later
    
    // Mocking Advanced Analytics for now
    const sales = 150000; // ₹1,50,000
    const revenue = 125000;
    const complianceScore = company.completionPercentage || 0; // use completion percentage as base

    // Candlestick data format for ApexCharts
    const researchAnalytics = [
      { x: new Date('2023-01-01'), y: [120, 130, 110, 125] },
      { x: new Date('2023-02-01'), y: [125, 140, 120, 135] },
      { x: new Date('2023-03-01'), y: [135, 150, 130, 145] },
      { x: new Date('2023-04-01'), y: [145, 160, 140, 155] },
      { x: new Date('2023-05-01'), y: [155, 170, 150, 165] },
      { x: new Date('2023-06-01'), y: [165, 180, 160, 175] }
    ];

    res.json({
      clients: totalClients,
      subscriptions: activeSubscriptions,
      pending: pendingKYC,
      alerts,
      sales,
      revenue,
      complianceScore,
      researchAnalytics
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStaffList = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied." });

    const staff = await User.find({ companyId, role: { $in: ['Principal Officer', 'Compliance Officer', 'Researcher', 'Staff'] } }).select('-password');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied." });

    const { name, email, role, nismCertificateNumber, nismExpiryDate } = req.body;
    
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User with this email already exists." });

    const password = Math.random().toString(36).slice(-8); // Generate random password

    const newStaff = new User({
      name, email, role, nismCertificateNumber, nismExpiryDate, password, companyId
    });
    
    await newStaff.save();

    const ComplianceLog = require('../Models/ComplianceLog');
    await ComplianceLog.create({
      companyId,
      action: 'STAFF_CREATED',
      performedBy: req.user._id,
      details: `Created new staff member: ${email} as ${role}`
    });

    res.status(201).json({ message: "Staff created successfully", staff: newStaff });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyCompany = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied." });
    const company = await Company.findById(companyId);
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMyCompany = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied." });
    const company = await Company.findByIdAndUpdate(companyId, req.body, { new: true });
    
    const ComplianceLog = require('../Models/ComplianceLog');
    await ComplianceLog.create({
      companyId,
      action: 'COMPANY_PROFILE_UPDATED',
      performedBy: req.user._id,
      details: `Updated company profile information`
    });

    res.json({ message: "Profile updated successfully", company });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
