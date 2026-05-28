const Client = require('../Models/Client');
const User = require('../Models/User');
const Company = require('../Models/Company');

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

    const company = await Company.findById(companyId);
    if (!company || company.completionPercentage < 80) {
      return res.status(403).json({ message: "Company profile completion is less than 80%. Cannot onboard clients." });
    }

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

exports.completeOnboarding = async (req, res) => {
  try {
    const userId = req.user._id;
    const { kycData, agreementsSigned, subscriptionPlan } = req.body;

    const client = await Client.findOne({ user: userId });
    if (!client) {
      return res.status(404).json({ message: "Client profile not found. Please contact admin." });
    }

    if (kycData?.pan) client.pan = kycData.pan;
    if (kycData?.aadhaar) client.aadhaar = kycData.aadhaar;
    client.kycStatus = 'Verified';
    client.kraStatus = 'Verified';

    if (agreementsSigned) {
      client.agreementSigned = true;
      client.agreementUrl = 'https://mock-s3-bucket.com/agreements/signed.pdf'; 
    }

    if (subscriptionPlan) {
      client.subscriptionPlan = subscriptionPlan;
      client.subscriptionActive = true;
      const expiry = new Date();
      if (subscriptionPlan === 'Premium') {
        expiry.setFullYear(expiry.getFullYear() + 1);
      } else {
        expiry.setMonth(expiry.getMonth() + 1);
      }
      client.subscriptionExpiry = expiry;
    }

    await client.save();
    res.json({ message: "Onboarding completed successfully", client });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const client = await Client.findOne({ user: userId }).populate('user', '-password');
    if (!client) {
      return res.status(404).json({ message: "Client profile not found." });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClientResearchCalls = async (req, res) => {
  try {
    const userId = req.user._id;
    const client = await Client.findOne({ user: userId });
    
    if (!client) return res.status(404).json({ message: "Profile not found." });
    
    if (!client.subscriptionActive) {
      return res.status(403).json({ message: "Active subscription required to view research calls." });
    }

    const Research = require('../Models/Research');
    // Fetch only published calls for the company
    const calls = await Research.find({ companyId: client.companyId, status: 'Published' })
                                .sort({ createdAt: -1 })
                                .populate('author', 'name role');
    
    res.json(calls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
