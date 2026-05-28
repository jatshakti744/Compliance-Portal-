const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true, index: true },
  companyName: { type: String, required: true },
  exchange: { type: String, default: 'NSE' },
});

module.exports = mongoose.model('Stock', stockSchema);
