const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id, rememberMe = false) => {
  // If rememberMe is true, expire in 5 days, else expire in 8 hours
  const expiresIn = rememberMe ? '5d' : '8h';
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

const setTokenCookie = (res, token, rememberMe) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: rememberMe ? 5 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000 // 5 days or 8 hours in ms
  };
  res.cookie('token', token, options);
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });

    if (user) {
      const token = generateToken(user._id, false);
      setTokenCookie(res, token, false);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id, rememberMe);
      setTokenCookie(res, token, rememberMe);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
exports.logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
