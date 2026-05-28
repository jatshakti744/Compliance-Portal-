const mongoose = require('mongoose');

const complianceLogSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  action: { type: String, required: true }, // e.g. 'RESEARCH_PUBLISHED', 'CLIENT_ONBOARDED', 'VIOLATION'
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ruleName: { type: String }, // Optional, if it's related to a specific rule
  violationStatus: { type: Boolean, default: false },
  penaltyAmount: { type: Number, default: 0 },
  details: { type: String },
  resolved: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('ComplianceLog', complianceLogSchema);
