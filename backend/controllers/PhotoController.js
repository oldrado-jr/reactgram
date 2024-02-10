const User = require('../models/User');
const Photo = require('../models/Photo');
const mongoose = require('mongoose');

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  const reqUser = req.user;
  const user = await User.findById(reqUser.id).select('-password');

  const { title } = req.body;
  const image = req.file.filename;

  // Create a photo
  const newPhoto = await Photo.create({
    title,
    image,
    userId: user._id,
    userName: user.name,
  });

  // If photo was created successfully, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: [
        'Houve um problema. Por favor, tente novamente mais tarde.'
      ]
    });
    return;
  }

  res.status(201).json(newPhoto);
};

// Remove a photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ['Foto não encontrada!'] });
      return;
    }

    const reqUser = req.user;

    // Check if photo belongs to the user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: [
          'Ocorreu um erro. Por favor, tente novamente mais tarde.'
        ]
      });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res.status(200).json({
      id: photo._id,
      message: 'Foto excluída com sucesso.',
    });
  } catch (error) {
    res.status(400).json({ errors: ['Id inválido!'] });
  }
};

// Get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort([['createdAt', -1]]).exec();
  res.status(200).json(photos);
};

// Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ['Foto não encontrada!'] });
      return;
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(400).json({ errors: ['Id inválido!'] });
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotoById,
};
