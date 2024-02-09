const User = require('../models/User');
const Photo = require('../models/Photo');

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

module.exports = {
  insertPhoto,
};
