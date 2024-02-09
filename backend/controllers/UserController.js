const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || '';

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '1h',
  });
};

// Generate password hash
const generatePasswordHash = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
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

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: await generatePasswordHash(password),
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

// Update an user
const update = async (req, res) => {
  const reqUser = req.user;

  const user = await User.findById(new mongoose.Types.ObjectId(reqUser.id))
    .select('-password');

  const { name, password, bio } = req.body;

  if (name) {
    user.name = name;
  }

  if (password) {
    user.password = await generatePasswordHash(password);
  }

  let profileImage;

  if (req.file) {
    profileImage = req.file.filename;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id))
      .select('-password');

    // Check if user exists
    if (!user) {
      res.status(404).json({ errors: ['Usuário inexistente!'] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ errors: ['Id inválido!'] });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
