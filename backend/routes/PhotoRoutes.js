const express = require('express');
const router = express.Router();

// Controller
const {
  insertPhoto,
  deletePhoto
} = require('../controllers/PhotoController');

// Middlewares
const authGuard = require('../middlewares/authGuard');
const imageUpload = require('../middlewares/imageUpload');
const validate = require('../middlewares/handleValidation');
const { photoInsertValidation } = require('../middlewares/photoValidations');

// Routes
router.post(
  '/',
  authGuard,
  imageUpload.single('image'),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.delete('/:id', authGuard, deletePhoto);

module.exports = router;
