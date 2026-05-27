const ComplianceLog = require('../Models/ComplianceLog');

exports.getComplianceLogsByCompany = async (req, res) => {
  try {
    const logs = await ComplianceLog.find({ companyId: req.params.companyId });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createComplianceLog = async (req, res) => {
  try {
    const log = new ComplianceLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
