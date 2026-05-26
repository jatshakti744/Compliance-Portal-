const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const User = require('./models/User');
const Company = require('./models/Company');
const Client = require('./models/Client');
const Research = require('./models/Research');

const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Company.deleteMany();
    await Client.deleteMany();
    await Research.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // 1. Create Super Admin & Company Admin
    const createdUsers = await User.insertMany([
      { name: 'Super Admin', email: 'superadmin@example.com', password: hashedPassword, role: 'Super Admin' },
      { name: 'Company Admin', email: 'admin@example.com', password: hashedPassword, role: 'Admin' },
      { name: 'Principal Officer', email: 'po@example.com', password: hashedPassword, role: 'Principal Officer' },
      { name: 'Compliance Officer', email: 'co@example.com', password: hashedPassword, role: 'Compliance Officer' },
      { name: 'Researcher User', email: 'researcher@example.com', password: hashedPassword, role: 'Researcher' },
      { name: 'Client User 1', email: 'client1@example.com', password: hashedPassword, role: 'Client' },
      { name: 'Client User 2', email: 'client2@example.com', password: hashedPassword, role: 'Client' }
    ]);

    // 2. Create Company
    const company = await Company.create({
      companyName: 'Sample RA Entity',
      sebiRegNo: 'INH000000001',
      bseEnrollment: 'BSE12345',
      email: 'company@example.com',
      mobile: '9876543210',
      address: '123 Wall Street, Financial District',
      validity: new Date('2028-01-01'),
      profileCompleted: true,
      principalOfficer: createdUsers[2]._id,
      complianceOfficer: createdUsers[3]._id,
      policies: [{ title: 'Code of Conduct', content: 'Do no harm' }]
    });

    // Link Company Admin, PO, CO to Company
    await User.updateMany(
      { _id: { $in: [createdUsers[1]._id, createdUsers[2]._id, createdUsers[3]._id, createdUsers[4]._id] } },
      { companyId: company._id }
    );

    // 3. Create Clients
    await Client.insertMany([
      {
        user: createdUsers[5]._id,
        pan: 'ABCDE1234F',
        aadhaar: '123456789012',
        kycStatus: 'Verified',
        kraStatus: 'Verified',
        agreementSigned: true,
        subscriptionActive: true,
        subscriptionPlan: 'Premium',
        subscriptionExpiry: new Date('2025-12-31')
      },
      {
        user: createdUsers[6]._id,
        pan: 'FGHIJ5678K',
        aadhaar: '987654321098',
        kycStatus: 'Pending',
        kraStatus: 'Pending',
        agreementSigned: false,
        subscriptionActive: false
      }
    ]);

    // 4. Create Research Publications
    await Research.insertMany([
      {
        companyId: company._id,
        author: createdUsers[4]._id,
        type: 'Buy',
        title: 'Strong Buy: Tech Innovators Inc',
        content: 'We expect a 30% upside in the next quarter due to AI advancements.',
        tncAccepted: true,
        consentManaged: true,
        status: 'Published'
      },
      {
        companyId: company._id,
        author: createdUsers[4]._id,
        type: 'Model Portfolio',
        title: 'Conservative Dividend Portfolio',
        content: 'A mix of high-yield blue-chip stocks for risk-averse investors.',
        tncAccepted: true,
        consentManaged: true,
        status: 'Draft'
      }
    ]);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Company.deleteMany();
    await Client.deleteMany();
    await Research.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
