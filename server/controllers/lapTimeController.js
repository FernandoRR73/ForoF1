const db = require('../config/db');

const getLapTimes = async (req, res) => {
  const userId = req.session.userId;

  try {
    const lapTimes = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM lap_times WHERE user_id = ?', [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.status(200).json(lapTimes);
  } catch (err) {
    console.error('Error al obtener los tiempos de vuelta:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getLapTimeById = async (req, res) => {
  const { id } = req.params;

  try {
    const lapTime = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM lap_times WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!lapTime) {
      return res.status(404).json({ message: 'Tiempo de vuelta no encontrado' });
    }

    const setup = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM setups WHERE lap_time_id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    res.status(200).json({ ...lapTime, setup });
  } catch (err) {
    console.error('Error al obtener el tiempo de vuelta:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const addLapTime = async (req, res) => {
  const userId = req.session.userId;
  const {
    vehicle_type, tire_type, weather, lap_time, controller, circuit,
    front_wing, rear_wing, differential_on, differential_off,
    front_camber, rear_camber, front_toe, rear_toe,
    front_suspension, rear_suspension, front_antiroll, rear_antiroll,
    front_height, rear_height, brake_pressure, brake_bias,
    front_left_pressure, front_right_pressure, rear_left_pressure, rear_right_pressure,
    includeSetup
  } = req.body;

  try {
    const lapTimeId = await new Promise((resolve, reject) => {
      db.run(`INSERT INTO lap_times (
        user_id, vehicle_type, tire_type, weather, lap_time, controller, circuit, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, vehicle_type, tire_type, weather, lap_time, controller, circuit, new Date().toISOString()],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
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
              reject(err);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
    }

    res.status(200).json({ message: 'Tiempo de vuelta añadido exitosamente', id: lapTimeId });
  } catch (err) {
    console.error('Error al añadir tiempo de vuelta:', err.message);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const deleteLapTime = async (req, res) => {
  const { id } = req.params;

  try {
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM lap_times WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.run('DELETE FROM setups WHERE lap_time_id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
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
