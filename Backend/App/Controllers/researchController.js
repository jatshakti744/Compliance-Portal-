const Research = require('../Models/Research');

exports.getResearchByCompany = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const research = await Research.find({ companyId }).populate('author', 'name email').sort({ createdAt: -1 });
    res.json(research);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createResearch = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const author = req.user._id;

    if (!req.body.tncAccepted || !req.body.conflictOfInterest) {
      return res.status(400).json({ message: "SEBI mandatory disclosures must be accepted." });
    }

    const research = new Research({
      ...req.body,
      companyId,
      author
    });
    
    await research.save();

    const ComplianceLog = require('../Models/ComplianceLog');
    await ComplianceLog.create({
      companyId,
      action: 'RESEARCH_PUBLISHED',
      performedBy: author,
      details: `Published ${req.body.type} call for ${req.body.title}`
    });

    res.status(201).json({ message: "Research call published successfully", research });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
