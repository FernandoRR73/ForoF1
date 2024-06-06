// Se importa la biblioteca dotenv para cargar las variables de entorno desde un archivo .env
require('dotenv').config({ path: '../.env' });

// Se exporta un objeto que contiene las variables de configuración
module.exports = {
  // El puerto de la aplicación se establece en el valor de la variable de entorno PORT, o 3001 si no está definida
  PORT: process.env.PORT || 3001,
  // El archivo de la base de datos se establece en el valor de la variable de entorno DB_FILE, o '../db.db' si no está definida
  DB_FILE: process.env.DB_FILE || '../db.db',
  // El secreto para generar y verificar tokens JWT se toma del valor de la variable de entorno JWT_SECRET
  JWT_SECRET: process.env.JWT_SECRET
};