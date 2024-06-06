import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircuitFlag from './CircuitFlags';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RaceCalendar.css';

const RaceCalendar = () => {
  const [races, setRaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRaceCalendar = async () => {
      try {
        const response = await fetch('https://ergast.com/api/f1/current.json');
        const data = await response.json();
        const raceData = data.MRData.RaceTable.Races;
        setRaces(raceData);
      } catch (error) {
        console.error('Error fetching race calendar data:', error);
      }
    };

    fetchRaceCalendar();
  }, []);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const handleRowClick = (circuitId) => {
    navigate(`/circuit/${circuitId}`);
  };

  return (
    <div className="container race-calendar">
      <h2 className="my-4">Race Calendar</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Grand Prix</th>
            <th>Circuit</th>
            <th>Date</th>
            <th>Time</th>
            <th>Sprint</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race, index) => (
            <tr key={index} onClick={() => handleRowClick(race.Circuit.circuitId)} style={{ cursor: 'pointer' }}>
              <td>
                <CircuitFlag circuitId={race.Circuit.circuitId} />
                {race.raceName}
              </td>
              <td>{race.Circuit.circuitName}</td>
              <td>{new Date(race.date).toLocaleDateString()}</td>
              <td>{race.time ? formatTime(race.time) : 'N/A'}</td>
              <td>
                {race.Sprint ? (
                  <div>
                    <p>{race.Sprint.circuitName}</p>
                    <p>{new Date(race.Sprint.date).toLocaleDateString()}</p>
                  </div>
                ) : (
                  'No Sprint'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceCalendar;
