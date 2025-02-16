const express = require('express');
const router =  express.Router();

//import Controllers
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTasks);
router.put('/update/:id', taskController.editTask);
router.get('/get/:id', taskController.viewById);
router.get('/view', taskController.viewAllTasks);
router.delete('/delete/:id', taskController.deleteTasks);

module.exports = router;