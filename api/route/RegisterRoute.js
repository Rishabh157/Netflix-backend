const router = require('express').Router();
const registerController = require('../controller/RegisterController');

// add through the email
router.post('/register-user', registerController.addUser);
router.post('/add-password', registerController.addPassword);
router.post('/user-login', registerController.isUserLogin);
router.get('/varify-token', registerController.isAuththicationCheck);
router.post('/subscribe', registerController.isAuththicationCheck);

module.exports = router;
