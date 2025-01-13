const router = require('express').Router();
const userController = require('../controller/user');
const { verifyToken } = require('../utils/middleware');
const userValidation = require('../validation/user');
// API

router.post('/signup', userValidation.signUpValidation, userController.signup);
router.post('/login', userValidation.loginValidation, userController.login);
router.get('/getAll', verifyToken, userController.getUser);

module.exports = router;
