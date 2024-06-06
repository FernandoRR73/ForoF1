// Se importa el objeto de base de datos configurado
const db = require('../config/db');

// Controlador para obtener los hilos de un foro específico
const getThreads = async (req, res) => {
  // Se obtiene el ID del foro desde los parámetros de la solicitud
  const { forumId } = req.params;

  try {
    // Se realizan consultas a la base de datos para obtener los hilos del foro especificado
    const threads = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM threads WHERE forum_id = ?', [forumId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Se envían los hilos como respuesta
    res.status(200).json(threads);
  } catch (err) {
    // Si ocurre algún error durante la obtención de los hilos, se maneja y se devuelve un mensaje de error
    console.error('Error al obtener hilos:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para obtener todos los hilos con información adicional sobre el usuario y el foro asociados
const getAllThreads = async (req, res) => {
  try {
    // Se realizan consultas a la base de datos para obtener todos los hilos con información adicional
    const threads = await new Promise((resolve, reject) => {
      db.all('SELECT threads.*, users.username, forums.title as forum_title FROM threads JOIN users ON threads.user_id = users.id JOIN forums ON threads.forum_id = forums.id', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Se envían los hilos como respuesta
    res.status(200).json(threads);
  } catch (err) {
    // Si ocurre algún error durante la obtención de los hilos, se maneja y se devuelve un mensaje de error
    console.error('Error al obtener todos los hilos:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para crear un nuevo hilo en un foro específico
const createThread = async (req, res) => {
  // Se obtienen los datos necesarios para crear el hilo desde el cuerpo de la solicitud
  const { forumId, title, content } = req.body;
  const userId = req.session.userId;

  // Se verifica si el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  // Se verifican si el título y el contenido del hilo están presentes en la solicitud
  if (!title || !content) {
    return res.status(400).json({ message: 'El título y el contenido son obligatorios' });
  }

  try {
    // Se realiza una inserción en la base de datos para crear el nuevo hilo
    const result = await new Promise((resolve, reject) => {
      db.run('INSERT INTO threads (forum_id, user_id, title, content, created_at) VALUES (?, ?, ?, ?, ?)', [forumId, userId, title, content, new Date().toISOString()], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });

    // Se envía una respuesta exitosa junto con el ID del nuevo hilo
    res.status(200).json({ message: 'Hilo creado exitosamente', threadId: result });
  } catch (err) {
    // Si ocurre algún error durante la creación del hilo, se maneja y se devuelve un mensaje de error
    console.error('Error al crear hilo:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para obtener los mensajes de un hilo específico
const getThreadMessages = async (req, res) => {
  // Se obtiene el ID del hilo desde los parámetros de la solicitud
  const { threadId } = req.params;
  // Se configura el límite y el desplazamiento para la paginación
  const { page = 1, limit = 25 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Se realizan consultas a la base de datos para obtener los mensajes del hilo especificado
    const messages = await new Promise((resolve, reject) => {
      db.all(
        'SELECT messages.*, users.username, users.avatar FROM messages JOIN users ON messages.user_id = users.id WHERE thread_id = ? ORDER BY created_at ASC LIMIT ? OFFSET ?',
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

    // Se realiza una consulta adicional para obtener el número total de mensajes del hilo
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

    // Se envían los mensajes, junto con metadatos de paginación, como respuesta
    res.status(200).json({
      messages,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    // Si ocurre algún error durante la obtención de los mensajes del hilo, se maneja y se devuelve un mensaje de error
    console.error('Error al obtener los mensajes del hilo:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para crear un nuevo mensaje en un hilo específico
const createMessage = async (req, res) => {
  // Se obtienen los datos necesarios para crear el mensaje desde el cuerpo de la solicitud
  const { threadId, content } = req.body;
  const userId = req.session.userId;
  // Se maneja la carga de archivos adjuntos al mensaje
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // Se verifica si el usuario está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  // Se verifica si el contenido del mensaje está presente y cumple con los límites establecidos
  if (!content || content.length > 500) {
    return res.status(400).json({ message: 'El contenido es obligatorio y no debe exceder los 500 caracteres' });
  }

  try {
    // Se realiza una inserción en la base de datos para crear el nuevo mensaje
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

    // Se obtiene el avatar del usuario que envió el mensaje
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT avatar FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    // Se envía una respuesta exitosa junto con información del mensaje recién creado
    res.status(200).json({ 
      message: 'Mensaje creado exitosamente', 
      messageId: result,
      image: image,
      content,
      username: req.session.username,
      created_at: new Date().toISOString(),
      avatar: user.avatar
    });
  } catch (err) {
    // Si ocurre algún error durante la creación del mensaje, se maneja y se devuelve un mensaje de error
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
