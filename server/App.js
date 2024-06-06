require('dotenv').config({ path: '../.env' });

const express = require('express');
const session = require('express-session');
const path = require('path');
const { configureMiddleware } = require('./config/middleware');
const authRoutes = require('./routes/authRoutes');
const forumRoutes = require('./routes/forumRoutes');
const threadRoutes = require('./routes/threadRoutes');
const lapTimeRoutes = require('./routes/lapTimeRoutes');
const circuitRoutes = require('./routes/circuitRoutes');
const { PORT, JWT_SECRET } = require('./config/config');

// Crear la aplicación Express
const app = express();

// Configurar middleware global
configureMiddleware(app);

// Configurar express-session con el secreto proporcionado en el archivo .env
app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Asegúrate de configurar esto correctamente para HTTP o HTTPS
    httpOnly: true, // Las cookies solo pueden ser enviadas por el servidor
  }
}));

// Configurar para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/default', express.static(path.join(__dirname, 'default'))); // Servir el directorio 'default'

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas del Foro
app.use('/forums', forumRoutes);
app.use('/threads', threadRoutes);

//Rutas lista de tiempos
app.use('/lapTimes', lapTimeRoutes);
app.use('/circuits', circuitRoutes); // Añadir las nuevas rutas

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Ruta para manejar la verificación de la sesión
app.get('/checkSession', (req, res) => {
  const sessionActive = !!req.session.username;
  res.status(200).json({ sessionActive });
});

// Ruta para la página de usuario
app.get('/user', (req, res) => {
  const username = req.session.username;
  if (username) {
    res.send(`Bienvenido, ${username}, a la página de usuario`);
  } else {
    res.redirect('/');
  }
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Lo sentimos, no se pudo encontrar la ruta solicitada.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
