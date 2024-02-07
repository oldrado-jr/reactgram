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
    res.status(422).json({
      errors: [
        'Por favor, utilize outro e-mail.'
      ]
    });
    return;
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
    res.status(422).json({
      errors: [
        'Houve um erro, por favor tente mais tarde.'
      ]
    });
    return;
  }

  res.status(201).json({
    id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Sign user in
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if credentials are valid
  if (!(user && await bcrypt.compare(password, user.password))) {
    res.status(401).json({ errors: ['Credenciais inválidas.'] });
    return;
  }

  // Return user with token
  res.status(200).json({
    id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Get current logged in user
const getCurrentUser = (req, res) => {
  const { user } = req;

  res.status(200).json(user);
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
