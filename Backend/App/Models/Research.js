const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Buy', 'Sell', 'Hold', 'Trading Call', 'Model Portfolio'], required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tncAccepted: { type: Boolean, default: false },
  consentManaged: { type: Boolean, default: false },
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Research', researchSchema);
