const express = require('express');
const router = express.Router();

// Controller
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto
} = require('../controllers/PhotoController');

// Middlewares
const authGuard = require('../middlewares/authGuard');
const imageUpload = require('../middlewares/imageUpload');
const validate = require('../middlewares/handleValidation');
const {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation
} = require('../middlewares/photoValidations');

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
router.get('/:id', authGuard, getPhotoById);
router.get('/', authGuard, getAllPhotos);
router.put(
  '/:id',
  authGuard,
  photoUpdateValidation(),
  validate,
  updatePhoto
);
router.patch('/:id/likes', authGuard, likePhoto);
router.patch(
  '/:id/comments',
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);

module.exports = router;
