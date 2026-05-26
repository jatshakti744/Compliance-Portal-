const mongoose = require('mongoose');

const complianceLogSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  ruleName: { type: String, required: true },
  violationStatus: { type: Boolean, default: false },
  penaltyAmount: { type: Number, default: 0 },
  details: { type: String },
  resolved: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('ComplianceLog', complianceLogSchema);
