const Client = require('../Models/Client');
const User = require('../Models/User');

exports.getAllClients = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied. No company associated with this user." });
    
    const clients = await Client.find({ companyId }).populate('user', '-password');
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    if (!companyId) return res.status(403).json({ message: "Access denied." });

    // Step 1: Create User Account for the client
    const { name, email, phone, pan, aadhaar } = req.body;
    
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User with this email already exists." });

    // Generate random password
    const password = Math.random().toString(36).slice(-8);

    const newUser = new User({
      name, email, phone, password, role: 'Client', companyId
    });
    await newUser.save();

    // Step 2: Create Client Profile
    const client = new Client({
      user: newUser._id,
      companyId,
      pan,
      aadhaar,
      kycStatus: 'Pending',
      kraStatus: 'Pending'
    });
    await client.save();

    // TODO: Email the password to the client

    const ComplianceLog = require('../Models/ComplianceLog');
    await ComplianceLog.create({
      companyId,
      action: 'CLIENT_ONBOARDED',
      performedBy: req.user._id,
      details: `Onboarded new client: ${email}`
    });

    res.status(201).json({ message: "Client created successfully", client });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, companyId }, 
      req.body, 
      { new: true }
    );
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client updated successfully", client });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
