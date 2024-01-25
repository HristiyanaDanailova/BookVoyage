const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const validEmailCheck = () =>
    body('email').notEmpty().isEmail().withMessage('Invalid email address');

const validPasswordCheck = () =>
    body('password').notEmpty().isLength({ min: 5 }).withMessage('Password should be at least 5 symbols long');

const validNameCheck = () =>
    body('name').notEmpty().isLength({ min: 2, max: 256 }).withMessage('Name should be between 2 and 64 symbols long');

const validPhoneNumberCheck = () =>
    body('phoneNumber').notEmpty().isMobilePhone().withMessage('Invalid phone number');

const validDescriptionCheck = () =>
    body('description').optional().isLength({ max: 1024 }).withMessage('Description can\'t be longer than 1024 symbols');

const validAddressCheck = () =>
    body('address').optional().isLength({ max: 256 }).withMessage('Address can\'t be longer than 256 symbols');

const validProfessionCheck = () =>
    body('profession').optional().isLength({ max: 256 }).withMessage('Profession can\'t be longer than 256 symbols');


function validateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors;
    }
    return true;
}
const existingMailCheck = () =>
    validEmailCheck().custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error("User with this email already exists!");
        }
    });
module.exports = {
    validateUserLogIn: [
        validEmailCheck(),
        validPasswordCheck(),
    ],
    validateUserRegister: [
        validPasswordCheck(),
        validNameCheck(),
        existingMailCheck(),
        validPhoneNumberCheck()
    ],
    validateUserUpdate: [
        validEmailCheck(),
        validPhoneNumberCheck(),
        validNameCheck(),
        validDescriptionCheck(),
        validProfessionCheck(),
        validAddressCheck()
    ],
    validateUser
}