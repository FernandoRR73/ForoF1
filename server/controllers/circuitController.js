// Se importan las bibliotecas necesarias
const path = require('path');
const fs = require('fs');

// Función para obtener la lista de circuitos desde un archivo JSON
const getCircuits = async (req, res) => {
  // Se construye la ruta al archivo JSON de circuitos
  const filePath = path.join(__dirname, '../../public/circuitSprintData.json');

  // Se lee el contenido del archivo JSON de forma asíncrona
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al leer el archivo, se maneja y se devuelve un mensaje de error
      console.error('Error al leer el archivo de circuitos:', err.message);
      res.status(500).json({ message: 'Error en el servidor' });
    } else {
      // Si se lee el archivo correctamente, se parsea el contenido JSON y se envía como respuesta
      const circuits = JSON.parse(data).circuits;
      res.status(200).json(circuits);
    }
  });
};

module.exports = {
  getCircuits
};
