const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  sebiRegNo: { type: String, required: true, unique: true },
  bseEnrollment: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  certificateUrl: { type: String },
  validity: { type: Date, required: true },
  profileCompleted: { type: Boolean, default: false },
  principalOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  complianceOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  policies: [{ title: String, content: String }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
