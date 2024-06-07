import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './LapTimes.css';

const LapTimes = () => {
  const [lapTimes, setLapTimes] = useState([]);
  const [form, setForm] = useState({
    vehicle_type: 'F1',
    tire_type: 'blando',
    weather: 'despejado',
    lap_time: '',
    controller: 'volante',
    circuit: '',
    includeSetup: false,
    front_wing: 25,
    rear_wing: 25,
    differential_on: 75,
    differential_off: 75,
    front_camber: -3.0,
    rear_camber: -1.5,
    front_toe: 0.05,
    rear_toe: 0.2,
    front_suspension: 21,
    rear_suspension: 21,
    front_antiroll: 11,
    rear_antiroll: 11,
    front_height: 40,
    rear_height: 40,
    brake_pressure: 90,
    brake_bias: 60,
    front_left_pressure: 23.0,
    front_right_pressure: 23.0,
    rear_left_pressure: 21.5,
    rear_right_pressure: 21.5
  });
  const [selectedLap, setSelectedLap] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterCircuit, setFilterCircuit] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const circuitOptions = [
    { circuitId: "bahrain", name: "Bahrain International Circuit" },
    { circuitId: "jeddah", name: "Jeddah Street Circuit" },
    { circuitId: "albert_park", name: "Albert Park Circuit" },
    { circuitId: "suzuka", name: "Suzuka International Racing Course" },
    { circuitId: "shanghai", name: "Shanghai International Circuit" },
    { circuitId: "miami", name: "Miami International Autodrome" },
    { circuitId: "imola", name: "Imola Circuit" },
    { circuitId: "monaco", name: "Circuit de Monaco" },
    { circuitId: "villeneuve", name: "Circuit Gilles Villeneuve" },
    { circuitId: "catalunya", name: "Circuit de Barcelona-Catalunya" },
    { circuitId: "red_bull_ring", name: "Red Bull Ring" },
    { circuitId: "silverstone", name: "Silverstone Circuit" },
    { circuitId: "hungaroring", name: "Hungaroring" },
    { circuitId: "spa", name: "Circuit de Spa-Francorchamps" },
    { circuitId: "zandvoort", name: "Circuit Zandvoort" },
    { circuitId: "monza", name: "Autodromo Nazionale Monza" },
    { circuitId: "baku", name: "Baku City Circuit" },
    { circuitId: "marina_bay", name: "Marina Bay Street Circuit" },
    { circuitId: "americas", name: "Circuit of the Americas" },
    { circuitId: "rodriguez", name: "Autódromo Hermanos Rodríguez" },
    { circuitId: "interlagos", name: "Interlagos Circuit" },
    { circuitId: "vegas", name: "Las Vegas Street Circuit" },
    { circuitId: "losail", name: "Losail International Circuit" },
    { circuitId: "yas_marina", name: "Yas Marina Circuit" }
  ];

  useEffect(() => {
    fetch('http://localhost:3001/lapTimes', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setLapTimes(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : (type === 'number' || type === 'range') ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lapTimePattern = /^\d{1,2}:\d{2}:\d{3}$/;
    if (!lapTimePattern.test(form.lap_time)) {
      setErrorMessage('El tiempo de vuelta debe estar en el formato mm:ss:ms');
      return;
    }

    fetch('http://localhost:3001/lapTimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Tiempo de vuelta añadido exitosamente') {
          setLapTimes([...lapTimes, { ...form, id: data.id, created_at: new Date() }]);
          setForm({
            vehicle_type: 'F1',
            tire_type: 'blando',
            weather: 'despejado',
            lap_time: '',
            controller: 'volante',
            circuit: '',
            includeSetup: false,
            front_wing: 25,
            rear_wing: 25,
            differential_on: 75,
            differential_off: 75,
            front_camber: -3.0,
            rear_camber: -1.5,
            front_toe: 0.05,
            rear_toe: 0.2,
            front_suspension: 21,
            rear_suspension: 21,
            front_antiroll: 11,
            rear_antiroll: 11,
            front_height: 40,
            rear_height: 40,
            brake_pressure: 90,
            brake_bias: 60,
            front_left_pressure: 23.0,
            front_right_pressure: 23.0,
            rear_left_pressure: 21.5,
            rear_right_pressure: 21.5
          });
          setShowAddModal(false);
          setErrorMessage('');
        }
      });
  };

  const handleRowClick = (lap) => {
    fetch(`http://localhost:3001/lapTimes/${lap.id}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setSelectedLap(data);
        setShowSetupModal(true);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lap time?')) {
      fetch(`http://localhost:3001/lapTimes/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Lap time successfully removed') {
            setLapTimes(lapTimes.filter(lap => lap.id !== id));
          }
        });
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedLapTimes = [...lapTimes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredLapTimes = filterCircuit
    ? sortedLapTimes.filter((lap) => lap.circuit === filterCircuit)
    : sortedLapTimes;

  const renderSetupFields = (form, handleChange) => (
    <>
      <h3>Aerodynamics</h3>
      <div className="form-group">
        <label>Front Wing: <input type="number" name="front_wing" className="form-control" min="0" max="50" value={form.front_wing} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="front_wing" className="form-control-range" min="0" max="50" value={form.front_wing} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Wing: <input type="number" name="rear_wing" className="form-control" min="0" max="50" value={form.rear_wing} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="rear_wing" className="form-control-range" min="0" max="50" value={form.rear_wing} onChange={handleChange} />
        </div>
      </div>
      <h3>Transmission</h3>
      <div className="form-group">
        <label>Differential On: <input type="number" name="differential_on" className="form-control" min="50" max="100" value={form.differential_on} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="differential_on" className="form-control-range" min="50" max="100" value={form.differential_on} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Differential Off: <input type="number" name="differential_off" className="form-control" min="50" max="100" value={form.differential_off} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="differential_off" className="form-control-range" min="50" max="100" value={form.differential_off} onChange={handleChange} />
        </div>
      </div>
      <h3>Suspensions Geometry</h3>
      <div className="form-group">
        <label>Front Camber: <input type="number" step="0.1" name="front_camber" className="form-control" min="-3.5" max="-2.5" value={form.front_camber} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.1" name="front_camber" className="form-control-range" min="-3.5" max="-2.5" value={form.front_camber} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Camber: <input type="number" step="0.1" name="rear_camber" className="form-control" min="-2.0" max="-1.0" value={form.rear_camber} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.1" name="rear_camber" className="form-control-range" min="-2.0" max="-1.0" value={form.rear_camber} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Front Toe: <input type="number" step="0.01" name="front_toe" className="form-control" min="0.0" max="0.1" value={form.front_toe} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.01" name="front_toe" className="form-control-range" min="0.0" max="0.1" value={form.front_toe} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Toe: <input type="number" step="0.01" name="rear_toe" className="form-control" min="0.1" max="0.3" value={form.rear_toe} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.01" name="rear_toe" className="form-control-range" min="0.1" max="0.3" value={form.rear_toe} onChange={handleChange} />
        </div>
      </div>
      <h3>Suspensions</h3>
      <div className="form-group">
        <label>Front Suspension:<input type="number" name="front_suspension" className="form-control" min="1" max="41" value={form.front_suspension} onChange={handleChange} /></label>
        <div className="range-container" >
          <input type="range" name="front_suspension" className="form-control-range" min="1" max="41" value={form.front_suspension} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Suspension: <input type="number" name="rear_suspension" className="form-control" min="1" max="41" value={form.rear_suspension} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="rear_suspension" className="form-control-range" min="1" max="41" value={form.rear_suspension} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Front Antiroll: <input type="number" name="front_antiroll" className="form-control" min="1" max="21" value={form.front_antiroll} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="front_antiroll" className="form-control-range" min="1" max="21" value={form.front_antiroll} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Antiroll: <input type="number" name="rear_antiroll" className="form-control" min="1" max="21" value={form.rear_antiroll} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="rear_antiroll" className="form-control-range" min="1" max="21" value={form.rear_antiroll} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Front Height: <input type="number" name="front_height" className="form-control" min="30" max="50" value={form.front_height} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="front_height" className="form-control-range" min="30" max="50" value={form.front_height} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Height:<input type="number" name="rear_height" className="form-control" min="30" max="50" value={form.rear_height} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="rear_height" className="form-control-range" min="30" max="50" value={form.rear_height} onChange={handleChange} />
        </div>
      </div>
      <h3>Brakes</h3>
      <div className="form-group">
        <label>Brake Pressure: <input type="number" name="brake_pressure" className="form-control" min="80" max="100" value={form.brake_pressure} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="brake_pressure" className="form-control-range" min="80" max="100" value={form.brake_pressure} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Brake Bias:<input type="number" name="brake_bias" className="form-control" min="50" max="70" value={form.brake_bias} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" name="brake_bias" className="form-control-range" min="50" max="70" value={form.brake_bias} onChange={handleChange} />
        </div>
      </div>
      <h3>Tyre Pressure</h3>
      <div className="form-group">
        <label>Front Left Pressure: <input type="number" step="0.1" name="front_left_pressure" className="form-control" min="22.0" max="25.0" value={form.front_left_pressure} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.1" name="front_left_pressure" className="form-control-range" min="22.0" max="25.0" value={form.front_left_pressure} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Front Right Pressure:<input type="number" step="0.1" name="front_right_pressure" className="form-control" min="22.0" max="25.0" value={form.front_right_pressure} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.1" name="front_right_pressure" className="form-control-range" min="22.0" max="25.0" value={form.front_right_pressure} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Left Pressure:<input type="number" step="0.1" name="rear_left_pressure" className="form-control" min="20.0" max="23.0" value={form.rear_left_pressure} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.1" name="rear_left_pressure" className="form-control-range" min="20.0" max="23.0" value={form.rear_left_pressure} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Rear Right Pressure:<input type="number" step="0.1" name="rear_right_pressure" className="form-control" min="20.0" max="23.0" value={form.rear_right_pressure} onChange={handleChange} /></label>
        <div className="range-container">
          <input type="range" step="0.1" name="rear_right_pressure" className="form-control-range" min="20.0" max="23.0" value={form.rear_right_pressure} onChange={handleChange} />
        </div>
      </div>
    </>
  );

  return (
    <div className="container mt-5">
      <h1>My Lap Times</h1>
      <Button className='c-button' onClick={() => setShowAddModal(true)}>Add Time</Button>
      <div className="form-group mt-3">
        <label>Select track:</label>
        <select
          name="filterCircuit"
          className="form-control"
          value={filterCircuit}
          onChange={(e) => setFilterCircuit(e.target.value)}
        >
          <option value="">All</option>
          {circuitOptions.map(circuit => (
            <option key={circuit.circuitId} value={circuit.circuitId}>{circuit.name}</option>
          ))}
        </select>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th onClick={() => handleSort('created_at')}>Date</th>
            <th onClick={() => handleSort('vehicle_type')}>Car Type</th>
            <th onClick={() => handleSort('tire_type')}>Tyres</th>
            <th onClick={() => handleSort('weather')}>Weather</th>
            <th onClick={() => handleSort('lap_time')}>Time</th>
            <th onClick={() => handleSort('controller')}>Game Controller</th>
            <th onClick={() => handleSort('circuit')}>Track</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredLapTimes.map((lap) => (
            <tr key={lap.id} onClick={() => handleRowClick(lap)}>
              <td>{lap.created_at ? new Date(lap.created_at).toLocaleDateString() : 'N/A'}</td>
              <td>{lap.vehicle_type}</td>
              <td>{lap.tire_type}</td>
              <td>{lap.weather}</td>
              <td>{lap.lap_time}</td>
              <td>{lap.controller}</td>
              <td>{lap.circuit}</td>
              <td><Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(lap.id); }}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Lap Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="form-group">
              <label>Car Type:</label>
              <select name="vehicle_type" className="form-control" value={form.vehicle_type} onChange={handleChange}>
                <option value="F1">F1</option>
                <option value="F2">F2</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tyres:</label>
              <select name="tire_type" className="form-control" value={form.tire_type} onChange={handleChange}>
                <option value="Soft Tyres">Soft Tyres</option>
                <option value="Medium Tyres">Medium Tyres</option>
                <option value="Hard Tyres">Hard Tyres</option>
                <option value="Intermediate Tyres">Intermediate Tyres</option>
                <option value="Wet Tyres">Wet Tyres</option>
              </select>
            </div>
            <div className="form-group">
              <label>Weather:</label>
              <select name="weather" className="form-control" value={form.weather} onChange={handleChange}>
                <option value="Clear">Clear</option>
                <option value="Light Rain">Light Rain</option>
                <option value="Extreme Rain">Extreme Rain</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lap Time (mm:ss:ms):</label>
              <input type="text" name="lap_time" className="form-control" value={form.lap_time} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Game Controller:</label>
              <select name="controller" className="form-control" value={form.controller} onChange={handleChange}>
                <option value="driving Wheel">driving Wheel</option>
                <option value="Gamepad">Gamepad</option>
              </select>
            </div>
            <div className="form-group">
              <label>Track:</label>
              <select name="circuit" className="form-control" value={form.circuit} onChange={handleChange} required>
                <option value="" disabled>Select a Track</option>
                {circuitOptions.map(circuit => (
                  <option key={circuit.circuitId} value={circuit.circuitId}>{circuit.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group form-check">
              <label>
                <input type="checkbox" name="includeSetup" className="form-check-input" checked={form.includeSetup} onChange={handleChange} />
                Add Setup
              </label>
            </div>
            {form.includeSetup && renderSetupFields(form, handleChange)}
            <Button className='c-button' type="submit">Add Time</Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showSetupModal} onHide={() => setShowSetupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Setup Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLap && selectedLap.setup ? (
            <>
              <h3>Aerodynamics</h3>
              <div className="form-group">
                <label>Front Wing: {selectedLap.setup.front_wing}</label>
              </div>
              <div className="form-group">
                <label>Rear Wing: {selectedLap.setup.rear_wing}</label>
              </div>
              <h3>Transmission</h3>
              <div className="form-group">
                <label>Differential On: {selectedLap.setup.differential_on}</label>
              </div>
              <div className="form-group">
                <label>Differential Off: {selectedLap.setup.differential_off}</label>
              </div>
              <h3>Suspensions Geometry</h3>
              <div className="form-group">
                <label>Front Camber: {selectedLap.setup.front_camber}</label>
              </div>
              <div className="form-group">
                <label>Rear Camber: {selectedLap.setup.rear_camber}</label>
              </div>
              <div className="form-group">
                <label>Front Toe: {selectedLap.setup.front_toe}</label>
              </div>
              <div className="form-group">
                <label>Rear Toe: {selectedLap.setup.rear_toe}</label>
              </div>
              <h3>Suspensions</h3>
              <div className="form-group">
                <label>Front Suspension: {selectedLap.setup.front_suspension}</label>
              </div>
              <div className="form-group">
                <label>Rear Suspension: {selectedLap.setup.rear_suspension}</label>
              </div>
              <div className="form-group">
                <label>Front Antiroll: {selectedLap.setup.front_antiroll}</label>
              </div>
              <div className="form-group">
                <label>Rear Antiroll: {selectedLap.setup.rear_antiroll}</label>
              </div>
              <div className="form-group">
                <label>Front Height: {selectedLap.setup.front_height}</label>
              </div>
              <div className="form-group">
                <label>Rear Height: {selectedLap.setup.rear_height}</label>
              </div>
              <h3>Brakes</h3>
              <div className="form-group">
                <label>Brake Pressure: {selectedLap.setup.brake_pressure}</label>
              </div>
              <div className="form-group">
                <label>Brake Bias: {selectedLap.setup.brake_bias}</label>
              </div>
              <h3>Tyre Pressure</h3>
              <div className="form-group">
                <label>Front Left Pressure: {selectedLap.setup.front_left_pressure}</label>
              </div>
              <div className="form-group">
                <label>Front Right Pressure: {selectedLap.setup.front_right_pressure}</label>
              </div>
              <div className="form-group">
                <label>Rear Left Pressure: {selectedLap.setup.rear_left_pressure}</label>
              </div>
              <div className="form-group">
                <label>Rear Right Pressure: {selectedLap.setup.rear_right_pressure}</label>
              </div>
            </>
          ) : (
            <p>No setup details available.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LapTimes;
