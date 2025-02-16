const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notifyController');

router.get('/notify', NotificationController.getAllNotify);

module.exports = router;