const express = require('express');
const router =  express.Router();

//import Controllers
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTasks);
router.put('/edit', taskController.editTask);
router.get('/view', taskController.viewAllTasks);
router.delete('/delete', taskController.deleteTasks);

module.exports = router;