const mongoose = require('mongoose');

const penaltyRuleSchema = new mongoose.Schema({
  req: { type: String, required: true },
  freq: { type: String, required: true },
  penalty: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('PenaltyRule', penaltyRuleSchema);
