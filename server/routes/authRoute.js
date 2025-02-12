const express = require('express')
const router = express.Router();

//import Controller
const UserController = require("../controllers/userController")

// router.post('/register', userController.register)
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;