const Stock = require('../Models/Stock');

exports.searchStocks = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q || q.length < 2) return res.json([]);
    
    // Search by symbol or companyName
    const stocks = await Stock.find({
      $or: [
        { symbol: { $regex: new RegExp(q, 'i') } },
        { companyName: { $regex: new RegExp(q, 'i') } }
      ]
    }).limit(10);
    
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.seedStocks = async (req, res) => {
  try {
    const existing = await Stock.countDocuments();
    if (existing > 0) return res.json({ message: 'Already seeded' });

    const dummyStocks = [];
    const prefixes = ['RELIANCE', 'TCS', 'HDFC', 'INFY', 'ICICI', 'SBI', 'WIPRO', 'BAJAJ', 'TATA', 'ADANI'];
    const suffixes = ['IND', 'TECH', 'BANK', 'FIN', 'POWER', 'STEEL', 'MOTORS', 'CHEM'];
    
    // Generate ~2000 unique mock stocks
    for (let i = 1; i <= 2000; i++) {
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      dummyStocks.push({
        symbol: `${p}${s}${i}`,
        companyName: `${p} ${s} Corporation Ltd. ${i}`,
        exchange: Math.random() > 0.5 ? 'NSE' : 'BSE'
      });
    }

    // Add some common ones specifically for testing
    dummyStocks.push({ symbol: 'RELIANCE', companyName: 'Reliance Industries Ltd.', exchange: 'NSE' });
    dummyStocks.push({ symbol: 'TCS', companyName: 'Tata Consultancy Services', exchange: 'NSE' });
    dummyStocks.push({ symbol: 'HDFCBANK', companyName: 'HDFC Bank Ltd.', exchange: 'NSE' });
    dummyStocks.push({ symbol: 'INFY', companyName: 'Infosys Ltd.', exchange: 'NSE' });
    dummyStocks.push({ symbol: 'NIFTY50', companyName: 'Nifty 50 Index', exchange: 'NSE' });

    await Stock.insertMany(dummyStocks);
    res.json({ message: 'Seeded 2000+ stocks successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
