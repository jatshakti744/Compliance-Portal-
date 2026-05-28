const ComplianceLog = require('../Models/ComplianceLog');

exports.getComplianceLogsByCompany = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied." });

    const logs = await ComplianceLog.find({ companyId })
      .populate('performedBy', 'name email role')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createComplianceLog = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const performedBy = req.user._id;

    const log = new ComplianceLog({
      ...req.body,
      companyId,
      performedBy
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
