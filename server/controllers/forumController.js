// Controlador para obtener los foros predefinidos
const getForums = async (req, res) => {
  // Array con los foros predefinidos
  const predefinedForums = [
    { id: 1, title: 'Drivers', description: 'threads about Drivers' },
    { id: 2, title: 'Constructors', description: 'threads about Contructors' },
    { id: 3, title: 'Races', description: 'threads about Races' },
    { id: 4, title: 'ESports', description: 'threads about ESports' }
  ];

  res.status(200).json(predefinedForums);
};

// Controlador para crear un nuevo foro (no permitido)
const createForum = async (req, res) => {

  res.status(405).json({ message: 'No se pueden crear nuevos foros. Utilice los foros predefinidos.' });
};

module.exports = {
  getForums,
  createForum
};
