const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');
const { isAuthenticated } = require('../config/middleware');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', threadController.getAllThreads);
router.get('/:forumId', threadController.getThreads);
router.get('/messages/:threadId', threadController.getThreadMessages);
router.post('/', isAuthenticated, threadController.createThread);
router.post('/messages', isAuthenticated, upload.single('image'), threadController.createMessage);

module.exports = router;
