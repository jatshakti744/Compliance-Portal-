const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./App/Connection/mongo_db');

// Routes
const authRoutes = require('./App/Routes/authRoutes');
const companyRoutes = require('./App/Routes/companyRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Must match frontend URL exactly
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/users', require('./App/Routes/userRoutes'));
app.use('/api/clients', require('./App/Routes/clientRoutes'));
app.use('/api/research', require('./App/Routes/researchRoutes'));
app.use('/api/compliance', require('./App/Routes/complianceRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
