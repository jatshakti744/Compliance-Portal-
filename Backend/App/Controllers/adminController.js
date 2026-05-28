const Client = require('../Models/Client');
const Company = require('../Models/Company');
const User = require('../Models/User');

exports.getDashboardData = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied. No company associated with this user." });

    // Total Clients
    const totalClients = await Client.countDocuments({ companyId });

    // Active Subscriptions
    const activeSubscriptions = await Client.countDocuments({ companyId, subscriptionActive: true });

    // Pending KYC
    const pendingKYC = await Client.countDocuments({ companyId, kycStatus: 'Pending' });

    // Alerts / Compliance (Mocking this for now until compliance module is fully wired)
    const alerts = 0; // Replace with actual query against Compliance Logs later

    res.json({
      clients: totalClients,
      subscriptions: activeSubscriptions,
      pending: pendingKYC,
      alerts
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

    res.status(201).json({ message: "Staff created successfully", staff: newStaff });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
