// Se importan las bibliotecas necesarias
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Se importa el objeto de base de datos configurado
const path = require('path');

// Controlador para el registro de nuevos usuarios
const register = async (req, res) => {
  const { email, username, password } = req.body;

  // Verifica si se proporcionaron todos los campos necesarios
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Se requiere correo electrónico, nombre de usuario y contraseña.' });
  }

  try {
    // Busca si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    // Si el usuario ya existe, devuelve un mensaje de conflicto
    if (existingUser) {
      return res.status(409).json({ message: 'El nombre de usuario o correo electrónico ya está en uso.' });
    } else {
      // Si el usuario no existe, se procede a crearlo
      const hashedPassword = await bcrypt.hash(password, 10);
      const defaultAvatar = 'default/avatar.png'; // Ruta relativa al avatar predeterminado

      // Se inserta el nuevo usuario en la base de datos
      await new Promise((resolve, reject) => {
        db.run('INSERT INTO users (email, username, password, avatar) VALUES (?, ?, ?, ?)', [email, username, hashedPassword, defaultAvatar], function (err) {
          if (err) {
            reject(err);
          } else {
            console.log(`Se insertó un nuevo usuario con el ID: ${this.lastID}`);
            resolve();
          }
        });
      });

      // Se devuelve un mensaje de éxito
      return res.status(200).json({ message: 'Registro exitoso' });
    }
  } catch (err) {
    // Si ocurre algún error durante el registro, se maneja y se devuelve un mensaje de error
    console.error('Error al registrar usuario:', err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para el inicio de sesión de usuarios
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario por su correo electrónico en la base de datos
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    // Si el usuario no existe, devuelve un mensaje de credenciales inválidas
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Si las contraseñas coinciden, se inicia sesión y se guarda el ID de usuario en la sesión
      req.session.userId = user.id;
      req.session.username = user.username; // Almacena el nombre de usuario en la sesión
      console.log(`Inicio de sesión exitoso. Nombre de usuario: ${user.username}`);
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      // Si las contraseñas no coinciden, devuelve un mensaje de credenciales inválidas
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (err) {
    // Si ocurre algún error durante el inicio de sesión, se maneja y se devuelve un mensaje de error
    console.error('Error al buscar en la base de datos:', err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Función para verificar si hay una sesión activa
const checkSession = (req, res) => {
  const sessionActive = !!req.session.username; // Verifica si existe un nombre de usuario en la sesión
  res.status(200).json({ sessionActive });
};

// Controlador para cerrar sesión
const logout = (req, res) => {
  // Se destruye la sesión del usuario
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    // Se limpia la cookie de sesión
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  });
};

// Función para establecer un nombre de usuario en la sesión
const setSession = (req, res) => {
  const { username } = req.body;
  req.session.username = username; // Establece el nombre de usuario en la sesión
  res.sendStatus(200);
};

// Controlador para cargar el avatar de usuario
const uploadAvatar = (req, res) => {
  const username = req.session.username;
  if (!username) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No se ha proporcionado ningún archivo' });
  }

  const avatarPath = path.join('uploads', req.file.filename);

  // Se actualiza el avatar del usuario en la base de datos
  db.run('UPDATE users SET avatar = ? WHERE username = ?', [avatarPath, username], function(err) {
    if (err) {
      console.error('Error al actualizar el avatar:', err.message);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    res.status(200).json({ message: 'Avatar actualizado exitosamente', avatar: avatarPath });
  });
};

// Controlador para obtener el perfil de usuario
const getUserProfile = (req, res) => {
  const username = req.session.username;
  if (!username) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  // Se obtienen los datos del usuario desde la base de datos y se devuelven como respuesta
  db.get('SELECT username, avatar, email FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('Error al obtener el perfil del usuario:', err.message);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    res.status(200).json(row);
  });
};

// Controlador para actualizar la información de usuario
const updateUser = async (req, res) => {
  const { newEmail, newUsername, newPassword } = req.body;
  const username = req.session.username;

  if (!username) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  try {
    // Se actualiza la información del usuario en la base de datos según los datos proporcionados
    if (newEmail || newUsername) {
      await new Promise((resolve, reject) => {
        db.run(
          'UPDATE users SET email = ?, username = ? WHERE username = ?',
          [newEmail || null, newUsername || username, username],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await new Promise((resolve, reject) => {
        db.run(
          'UPDATE users SET password = ? WHERE username = ?',
          [hashedPassword, username],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    }

    // Se actualiza el nombre de usuario en la sesión si se ha cambiado
    req.session.username = newUsername || username;
    res.status(200).json({ message: 'Perfil actualizado exitosamente' });
  } catch (err) {
    // Si ocurre algún error durante la actualización, se maneja y se devuelve un mensaje de error
    console.error('Error al actualizar usuario:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para eliminar un usuario
const deleteUser = (req, res) => {
  const username = req.session.username;
  if (!username) {
    return res.status(401).json({ message: 'No está autorizado' });
  }

  // Se elimina el usuario de la base de datos
  db.run('DELETE FROM users WHERE username = ?', [username], function(err) {
    if (err) {
      console.error('Error al eliminar usuario:', err.message);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
    // Se destruye la sesión del usuario
    req.session.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  });
};

module.exports = {
  register,
  login,
  checkSession,
  logout,
  setSession,
  uploadAvatar,
  getUserProfile,
  updateUser,
  deleteUser
};

