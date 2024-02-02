const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || '';

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h',
  });
};

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user) {
    return res.status(422).json({
      errors: [
        'Por favor, utilize outro e-mail.'
      ]
    });
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // If user was created successfully, return the token
  if (!newUser) {
    return res.status(422).json({
      errors: [
        'Houve um erro, por favor tente mais tarde.'
      ]
    });
  }

  return res.status(201).json({
    id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Sign user in
const login = (req, res) => {
  res.send('Login');
};

module.exports = {
  register,
  login,
};
