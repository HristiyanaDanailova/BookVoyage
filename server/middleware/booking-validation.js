const { body } = require('express-validator');

const validCheckInCheck = () =>
    body('checkIn').notEmpty().isISO8601().toDate();

const validCheckOutCheck = () =>
    body('checkOut').notEmpty().isISO8601().toDate();

const validNameCheck = () =>
    body('name').notEmpty().isLength({ min: 3, max: 256 }).withMessage('Name should be between 3 and 256 long');

const validPhoneNumberCheck = () =>
    body('phoneNumber').notEmpty().isMobilePhone().withMessage('Invalid phone number');

const validNumberOfGuestsCheck = () =>
    body('numberOfGuests').notEmpty().isInt({ min: 1, max: 50 }).withMessage('Number of guests should be in range 1-50');

const validPriceCheck = () =>
    body('price').notEmpty().isInt();

module.exports = {
    validateBookingCreate: [
        validCheckInCheck(),
        validCheckOutCheck(),
        validNameCheck(),
        validPhoneNumberCheck(),
        validNumberOfGuestsCheck(),
        validPriceCheck()
    ]
}
