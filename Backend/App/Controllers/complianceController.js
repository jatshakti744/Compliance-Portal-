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

exports.getPenaltyMatrix = async (req, res) => {
  try {
    const PenaltyRule = require('../Models/PenaltyRule');
    const rules = await PenaltyRule.find({});
    
    // Auto-seed if empty
    if (rules.length === 0) {
      const defaultRules = [
        { req: "SEBI registration mandatory", freq: "Before commencement", penalty: "Heavy Penalty / Block" },
        { req: "Minimum qualification requirements for RA", freq: "At appointment", penalty: "₹10,000 per violation" },
        { req: "Mandatory NISM certifications", freq: "Before acting as RA", penalty: "Block Onboarding" },
        { req: "Designation of Principal Officer", freq: "Continuous compliance", penalty: "₹5,000 per violation" },
        { req: "Appointment of Compliance Officer", freq: "Continuous compliance", penalty: "₹20,000" },
        { req: "Part-time RA client limit ≤75", freq: "Continuous compliance", penalty: "₹10,000 per violation" },
        { req: "Terms and conditions disclosure", freq: "Before onboarding", penalty: "₹1,000 per client" }
      ];
      await PenaltyRule.insertMany(defaultRules);
      return res.json(defaultRules);
    }
    
    res.json(rules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
