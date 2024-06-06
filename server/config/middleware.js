// Se importan las bibliotecas express y cors
const express = require('express');
const cors = require('cors');

// Función para configurar el middleware de la aplicación Express
const configureMiddleware = (app) => {
  // Se habilita CORS con la configuración específica
  app.use(cors({
    origin: 'http://localhost:3002', // Se permite solo esta URL de origen
    credentials: true // Se permiten credenciales en las solicitudes CORS
  }));
  // Se habilita el middleware para manejar solicitudes JSON
  app.use(express.json());
  // Se habilita el middleware para analizar datos de formularios codificados en la URL
  app.use(express.urlencoded({ extended: true }));
};

// Middleware para verificar la autenticación del usuario
const isAuthenticated = (req, res, next) => {
  // Si existe una sesión y el usuario está autenticado
  if (req.session && req.session.userId) {
    // Se permite continuar con la solicitud
    return next();
  }
  // Si no está autenticado, se devuelve un código de estado 401 (No autorizado)
  return res.status(401).json({ message: 'No está autorizado' });
};

// Se exportan las funciones de middleware para que puedan ser utilizadas en otras partes de la aplicación
module.exports = {
  configureMiddleware,
  isAuthenticated 
};
