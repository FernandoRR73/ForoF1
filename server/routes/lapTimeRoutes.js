const express = require('express');
const router = express.Router();
const lapTimeController = require('../controllers/lapTimeController');
const { isAuthenticated } = require('../config/middleware');

router.get('/', isAuthenticated, lapTimeController.getLapTimes);
router.get('/:id', isAuthenticated, lapTimeController.getLapTimeById);
router.post('/', isAuthenticated, lapTimeController.addLapTime);
router.delete('/:id', isAuthenticated, lapTimeController.deleteLapTime);

module.exports = router;