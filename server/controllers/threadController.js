const db = require('../config/db');

const getThreads = async (req, res) => {
  const { forumId } = req.params;

  try {
    const threads = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM threads WHERE forum_id = ?', [forumId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.status(200).json(threads);
  } catch (err) {
    console.error('Error al obtener hilos:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getAllThreads = async (req, res) => {
  try {
    const threads = await new Promise((resolve, reject) => {
      db.all('SELECT threads.*, users.username, forums.title as forum_title FROM threads JOIN users ON threads.user_id = users.id JOIN forums ON threads.forum_id = forums.id', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.status(200).json(threads);
  } catch (err) {
    console.error('Error al obtener todos los hilos:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const createThread = async (req, res) => {
  const { forumId, title, content } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  if (!title || !content) {
    return res.status(400).json({ message: 'El título y el contenido son obligatorios' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      db.run('INSERT INTO threads (forum_id, user_id, title, content, created_at) VALUES (?, ?, ?, ?, ?)', [forumId, userId, title, content, new Date().toISOString()], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });

    res.status(200).json({ message: 'Hilo creado exitosamente', threadId: result });
  } catch (err) {
    console.error('Error al crear hilo:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getThreadMessages = async (req, res) => {
  const { threadId } = req.params;
  const { page = 1, limit = 25 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const messages = await new Promise((resolve, reject) => {
      db.all(
        `SELECT messages.*, 
                COALESCE(users.username, 'Deleted User') AS username, 
                COALESCE(users.avatar, 'default/avatar.png') AS avatar 
         FROM messages 
         LEFT JOIN users ON messages.user_id = users.id 
         WHERE thread_id = ? 
         ORDER BY created_at ASC 
         LIMIT ? OFFSET ?`,
        [threadId, limit, offset],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    const totalMessages = await new Promise((resolve, reject) => {
      db.get(
        'SELECT COUNT(*) as count FROM messages WHERE thread_id = ?',
        [threadId],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row.count);
          }
        }
      );
    });

    res.status(200).json({
      messages,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    console.error('Error al obtener los mensajes del hilo:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const createMessage = async (req, res) => {
  const { threadId, content } = req.body;
  const userId = req.session.userId;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!userId) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  if (!content || content.length > 500) {
    return res.status(400).json({ message: 'El contenido es obligatorio y no debe exceder los 500 caracteres' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      db.run('INSERT INTO messages (thread_id, user_id, content, image, created_at) VALUES (?, ?, ?, ?, ?)', 
        [threadId, userId, content, image, new Date().toISOString()], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });

    const user = await new Promise((resolve, reject) => {
      db.get('SELECT avatar FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    res.status(200).json({ 
      message: 'Mensaje creado exitosamente', 
      messageId: result,
      image: image,
      content,
      username: req.session.username,
      created_at: new Date().toISOString(),
      avatar: user ? user.avatar : 'default/avatar.png'
    });
  } catch (err) {
    console.error('Error al crear mensaje:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  getThreads,
  createThread,
  getAllThreads,
  getThreadMessages,
  createMessage
};
