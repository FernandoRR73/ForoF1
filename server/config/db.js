// Se importa la biblioteca sqlite3 para trabajar con bases de datos SQLite
const sqlite3 = require('sqlite3').verbose();
// Se importa la variable DB_FILE desde el archivo de configuración
const { DB_FILE } = require('./config');

// Se crea una nueva instancia de la base de datos SQLite, utilizando el archivo especificado en la configuración
const db = new sqlite3.Database(DB_FILE, (err) => {
  // Se maneja cualquier error que ocurra al abrir la base de datos
  if (err) {
    console.error('Error al abrir la base de datos', err.message);
  } else {
    // Si no hay errores, se muestra un mensaje indicando que la conexión fue exitosa
    console.log('Conexión exitosa a la base de datos SQLite');

    // Se ejecutan consultas para crear las tablas si no existen
    // Cada consulta define la estructura de una tabla en la base de datos
    // También establece relaciones de clave externa (FOREIGN KEY) cuando sea necesario

    // Tabla de usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        role TEXT DEFAULT 'basic',
        avatar TEXT,
        email TEXT
      );
    `);

    // Tabla de foros
    db.run(`
      CREATE TABLE IF NOT EXISTS forums (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT
      );
    `);

    // Tabla de hilos (threads)
    db.run(`
      CREATE TABLE IF NOT EXISTS threads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        forum_id INTEGER,
        user_id INTEGER,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (forum_id) REFERENCES forums (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    // Tabla de mensajes
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        thread_id INTEGER,
        user_id INTEGER,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        image TEXT,
        FOREIGN KEY (thread_id) REFERENCES threads (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    //tabla mensaje
    db.run(`
      CREATE TABLE IF NOT EXISTS mensaje (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        users_id INTEGER REFERENCES users (id),
        contenido TEXT,
        fecha TEXT
      );
    `);

    //tabla de tiempos
    db.run(`
      CREATE TABLE IF NOT EXISTS lap_times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        vehicle_type TEXT,
        tire_type TEXT,
        weather TEXT,
        lap_time TEXT,
        controller TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        circuit TEXT,
        setup_id INTEGER REFERENCES setups (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    //tabla de setups
    db.run(`
      CREATE TABLE IF NOT EXISTS setups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lap_time_id INTEGER,
        front_wing INTEGER,
        rear_wing INTEGER,
        differential_on INTEGER,
        differential_off INTEGER,
        front_camber REAL,
        rear_camber REAL,
        front_toe REAL,
        rear_toe REAL,
        front_suspension INTEGER,
        rear_suspension INTEGER,
        front_antiroll INTEGER,
        rear_antiroll INTEGER,
        front_height INTEGER,
        rear_height INTEGER,
        brake_pressure INTEGER,
        brake_bias INTEGER,
        front_left_pressure REAL,
        front_right_pressure REAL,
        rear_left_pressure REAL,
        rear_right_pressure REAL,
        FOREIGN KEY (lap_time_id) REFERENCES lap_times (id) ON DELETE CASCADE
      );
    `);
  }
});

module.exports = db;
