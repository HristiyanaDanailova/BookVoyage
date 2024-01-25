const router = require('express').Router();
const multer = require('multer');
const photosMiddleware = multer({ dest: 'uploads/' });

const photoController = require('../controllers/photoController');

router.post('/upload-photo-by-link', photoController.uploadPhotoByLink);
router.post('/upload-photo', photosMiddleware.array('photos', 100), photoController.uploadPhoto);

router.delete('/delete-photo/:photo', photoController.removePhoto);

module.exports = router;