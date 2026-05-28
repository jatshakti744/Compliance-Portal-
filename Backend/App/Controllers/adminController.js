const Client = require('../Models/Client');
const Company = require('../Models/Company');

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
