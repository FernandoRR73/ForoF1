const express = require('express');
const router = express.Router();
const circuitController = require('../controllers/circuitController');
const { isAuthenticated } = require('../config/middleware');

router.get('/', isAuthenticated, circuitController.getCircuits);

module.exports = router;
