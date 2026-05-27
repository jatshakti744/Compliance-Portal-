const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pan: { type: String, required: true },
  aadhaar: { type: String, required: true },
  kycStatus: { type: String, enum: ['Pending', 'Verified', 'Failed'], default: 'Pending' },
  kraStatus: { type: String, enum: ['Pending', 'Verified', 'Failed'], default: 'Pending' },
  agreementSigned: { type: Boolean, default: false },
  agreementUrl: { type: String },
  subscriptionActive: { type: Boolean, default: false },
  subscriptionPlan: { type: String },
  subscriptionExpiry: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);
