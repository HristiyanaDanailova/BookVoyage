const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const { validateBookingCreate } = require('../middleware/booking-validation')
const { verifyUser } = require('../middleware/auth');

router.get('/all-bookings', verifyUser, bookingController.getAllBookings);
router.get('/booking/:id', verifyUser, bookingController.getBookingById);

router.post('/book-place', verifyUser, validateBookingCreate, bookingController.bookPlace);

module.exports = router;