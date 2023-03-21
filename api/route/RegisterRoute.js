const router = require('express').Router();
const registerUserController = require('../controller/RegisterController');

// add through the email
router.post('/register-user', registerUserController.addUser);
router.post('/add-password', registerUserController.addPassword);

module.exports = router;
