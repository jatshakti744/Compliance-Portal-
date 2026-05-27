const User = require('../Models/User');

exports.getStaffByCompany = async (req, res) => {
  try {
    const staff = await User.find({ companyId: req.params.companyId });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStaff = async (req, res) => {
  const { name, email, password, role, companyId, nismCertificateNumber, nismExpiryDate } = req.body;
  try {
    const user = new User({ name, email, password, role, companyId, nismCertificateNumber, nismExpiryDate });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
