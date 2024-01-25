const { body } = require('express-validator');

const validNameCheck = () =>
    body('name').notEmpty().isLength({ min: 3, max: 256 }).withMessage('Name should be between 3 and 256 symbols long');

const validAddressCheck = () =>
    body('address').notEmpty().isLength({ min: 3, max: 256 }).withMessage('Address should be between 3 and 256 symbols long');

const validPhotosCheck = () =>
    body('photos').isArray({ min: 3, max: 20 }).withMessage('You should upload between 3 and 20 photos');

const validDescriptionCheck = () =>
    body('description').notEmpty().isLength({ min: 20, max: 4096 }).withMessage('Description should be between 20 and 4096 symbols long');

const validExtraInfoCheck = () =>
    body('extraInfo').optional().isLength({ max: 2048 }).withMessage('Extra info should be no longer than 2048 symbols long');

const validCheckInCheck = () =>
    body('checkIn').notEmpty().matches(/^[0-2][0-9]:[0-5][0-9]$/).withMessage('Invalid time format. Check in time should be in HH:MM format');

const validCheckOutCheck = () =>
    body('checkOut').notEmpty().matches(/^[0-2][0-9]:[0-5][0-9]$/).withMessage('Invalid time format. Check out time should be in HH:MM format');

const validMaxGuestsCheck = () =>
    body('maxGuests').notEmpty().isInt({ min: 1, max: 50 }).withMessage('Max number of guests should be in the range 1-50');

const validPriceCheck = () =>
    body('price').notEmpty().isInt({ min: 1, max: 10000 }).withMessage('Price should be in range 1-10 000');

module.exports = {
    validatePlaceCreate: [
        validNameCheck(),
        validAddressCheck(),
        validPhotosCheck(),
        validDescriptionCheck(),
        validExtraInfoCheck(),
        validCheckInCheck(),
        validCheckOutCheck(),
        validMaxGuestsCheck(),
        validPriceCheck()
    ]
}