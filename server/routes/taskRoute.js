const express = require('express');
const router =  express.Router();

//import Controllers
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTasks);

module.exports = router;