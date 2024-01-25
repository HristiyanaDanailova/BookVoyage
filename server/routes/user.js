const router = require('express').Router();
const userController = require('../controllers/userController');
const { validateUserRegister, validateUserLogIn, validateUserUpdate } = require('../middleware/user-validation')
const { verifyUser } = require('../middleware/auth');

router.get('/profile-info', verifyUser, userController.profileInfo);

router.post('/register', validateUserRegister, userController.register);
router.post('/login', validateUserLogIn, userController.login);
router.post('/logout', verifyUser, userController.logout);

router.put('/profilePhoto', verifyUser, userController.profilePhoto);
router.put('/update-user', verifyUser, validateUserUpdate, userController.updateUser);

module.exports = router;