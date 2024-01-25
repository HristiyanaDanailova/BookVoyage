const router = require('express').Router();
const placeController = require('../controllers/placeController');
const { validatePlaceCreate } = require('../middleware/place-validation');
const { verifyUser } = require('../middleware/auth')

router.get('/user-places', verifyUser, placeController.getUserPlaces);
router.get('/places/:id', placeController.getPlaceById);
router.get('/all-places', placeController.getAllPlaces);

router.post('/places', verifyUser, validatePlaceCreate, placeController.addPlace);

router.put('/places', verifyUser, placeController.updatePlace);


module.exports = router;