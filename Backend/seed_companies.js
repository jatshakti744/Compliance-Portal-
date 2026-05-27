const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Company = require('./models/Company');

dotenv.config();
connectDB();

const seed = async () => {
  try {
    const companies = [];
    for(let i=1; i<=20; i++) {
      companies.push({
        companyName: `Test Company ${i}`,
        sebiRegNo: `TEST000000${i.toString().padStart(3, '0')}`,
        email: `test${i}@company.com`,
        mobile: `98765432${i.toString().padStart(2, '0')}`,
        address: `${i} Test Street, Test City`,
        validity: new Date(2028, 0, i),
        isActive: true
      });
    }
    await Company.insertMany(companies);
    console.log("Seeded 20 companies");
    process.exit();
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
seed();
