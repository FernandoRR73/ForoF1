const db = require('../config/db');

const getLapTimes = async (req, res) => {
  const userId = req.session.userId; // Obtiene el ID del usuario de la sesión

  try {
    const lapTimes = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM lap_times WHERE user_id = ?', [userId], (err, rows) => {
        if (err) {
          reject(err); // Manejo de error
        } else {
          resolve(rows); // Resuelve la promesa con los tiempos de vuelta obtenidos
        }
      });
    });

    res.status(200).json(lapTimes); // Envía los tiempos de vuelta en la respuesta con estado 200
  } catch (err) {
    console.error('Error al obtener los tiempos de vuelta:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getLapTimeById = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del parámetro de la solicitud

  try {
    const lapTime = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM lap_times WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err); // Manejo de error
        } else {
          resolve(row); // Resuelve la promesa con el tiempo de vuelta obtenido
        }
      });
    });

    if (!lapTime) {
      return res.status(404).json({ message: 'Tiempo de vuelta no encontrado' }); // Devuelve 404 si no se encuentra el tiempo de vuelta
    }

    const setup = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM setups WHERE lap_time_id = ?', [id], (err, row) => {
        if (err) {
          reject(err); // Manejo de error
        } else {
          resolve(row); // Resuelve la promesa con la configuración del tiempo de vuelta
        }
      });
    });

    res.status(200).json({ ...lapTime, setup }); // Envía el tiempo de vuelta 
  } catch (err) {
    console.error('Error al obtener el tiempo de vuelta:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const addLapTime = async (req, res) => {
  const userId = req.session.userId; // Obtiene el ID del usuario de la sesión
  const {
    vehicle_type, tire_type, weather, lap_time, controller, circuit,
    front_wing, rear_wing, differential_on, differential_off,
    front_camber, rear_camber, front_toe, rear_toe,
    front_suspension, rear_suspension, front_antiroll, rear_antiroll,
    front_height, rear_height, brake_pressure, brake_bias,
    front_left_pressure, front_right_pressure, rear_left_pressure, rear_right_pressure,
    includeSetup
  } = req.body; // Obtiene los datos del cuerpo de la solicitud

  try {
    const lapTimeId = await new Promise((resolve, reject) => {
      db.run(`INSERT INTO lap_times (
        user_id, vehicle_type, tire_type, weather, lap_time, controller, circuit, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, vehicle_type, tire_type, weather, lap_time, controller, circuit, new Date().toISOString()],
        function (err) {
          if (err) {
            reject(err); // Manejo de error
          } else {
            resolve(this.lastID); // Resuelve la promesa con el ID del tiempo de vuelta recién insertado
          }
        }
      );
    });

    if (includeSetup) {
      await new Promise((resolve, reject) => {
        db.run(`INSERT INTO setups (
          lap_time_id, front_wing, rear_wing, differential_on, differential_off,
          front_camber, rear_camber, front_toe, rear_toe,
          front_suspension, rear_suspension, front_antiroll, rear_antiroll,
          front_height, rear_height, brake_pressure, brake_bias,
          front_left_pressure, front_right_pressure, rear_left_pressure, rear_right_pressure
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            lapTimeId, front_wing, rear_wing, differential_on, differential_off,
            front_camber, rear_camber, front_toe, rear_toe,
            front_suspension, rear_suspension, front_antiroll, rear_antiroll,
            front_height, rear_height, brake_pressure, brake_bias,
            front_left_pressure, front_right_pressure, rear_left_pressure, rear_right_pressure
          ],
          function (err) {
            if (err) {
              reject(err); // Manejo de error
            } else {
              resolve(this.lastID); // Resuelve la promesa con el ID de la configuración recién insertada
            }
          }
        );
      });
    }

    res.status(200).json({ message: 'Tiempo de vuelta añadido exitosamente', id: lapTimeId }); // Envía el ID del nuevo tiempo de vuelta
  } catch (err) {
    console.error('Error al añadir tiempo de vuelta:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const deleteLapTime = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del parámetro de la solicitud

  try {
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM lap_times WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(); // Resuelve la promesa una vez eliminado el tiempo de vuelta
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.run('DELETE FROM setups WHERE lap_time_id = ?', [id], function (err) {
        if (err) {
          reject(err); // Manejo de error
        } else {
          resolve(); // Resuelve la promesa una vez eliminada la configuración del tiempo de vuelta
        }
      });
    });

    res.status(200).json({ message: 'Tiempo de vuelta eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar tiempo de vuelta:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  getLapTimes,
  getLapTimeById,
  addLapTime,
  deleteLapTime
};
