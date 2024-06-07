// src/components/SprintResults/SprintResults.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DorsalPiloto from '../PosicionesComponents/DorsalPiloto';

const SprintResults = () => {
  const { gpNumber } = useParams();
  const [sprintResults, setSprintResults] = useState(null);

  useEffect(() => {
    const fetchSprintResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/2024/${gpNumber}/sprint.xml`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml');

        const results = Array.from(xmlDocument.getElementsByTagName('SprintResult')).map(result => ({
          position: result.getAttribute('position'),
          driverId: result.getElementsByTagName('Driver')[0].getAttribute('driverId'),
          givenName: result.getElementsByTagName('GivenName')[0].textContent,
          familyName: result.getElementsByTagName('FamilyName')[0].textContent,
          constructorName: result.getElementsByTagName('Constructor')[0].getElementsByTagName('Name')[0].textContent,
          time: result.getElementsByTagName('Time')[0] ? result.getElementsByTagName('Time')[0].textContent : 'N/A',
          points: result.getAttribute('points')
        }));

        if (results.length > 0) {
          setSprintResults(results);
        }
      } catch (error) {
        console.error('Error fetching sprint results:', error);
      }
    };

    fetchSprintResults();
  }, [gpNumber]);

  if (!sprintResults) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container sprint-results">
      <h3>Sprint Results</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Dorsal</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Time</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sprintResults.map((result, index) => (
            <tr key={index}>
              <td>{result.position}</td>
              <td>{result.driverId ? <DorsalPiloto driverId={result.driverId} /> : 'N/A'}</td>
              <td>{result.givenName} {result.familyName}</td>
              <td>{result.constructorName}</td>
              <td>{result.time}</td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SprintResults;
