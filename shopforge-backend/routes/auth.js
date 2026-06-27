const router  = require('express').Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

// ── REGISTER ───────────────────────────────────────────────
// POST /api/auth/register
// Body: { name, email, password }
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user to MongoDB
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log(`✅ New user registered: ${email}`);

    res.status(201).json({
      message: 'Account created successfully! Please login.',
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});


// ── LOGIN ──────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ User logged in: ${email}`);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});


// ── GET ALL USERS (for testing only) ──────────────────────
// GET /api/auth/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // hide passwords
    res.json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
