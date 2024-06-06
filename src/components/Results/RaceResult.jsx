// src/components/RaceResults/RaceResults.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DorsalPiloto from '../PosicionesComponents/DorsalPiloto';

const RaceResults = () => {
  const { gpNumber } = useParams();
  const [raceResults, setRaceResults] = useState(null);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/2024/${gpNumber}/results.xml`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml');

        const results = Array.from(xmlDocument.getElementsByTagName('Result')).map(result => ({
          position: result.getAttribute('position'),
          number: result.getAttribute('number'),
          driverId: result.getElementsByTagName('Driver')[0].getAttribute('driverId'),
          givenName: result.getElementsByTagName('GivenName')[0].textContent,
          familyName: result.getElementsByTagName('FamilyName')[0].textContent,
          constructorName: result.getElementsByTagName('Constructor')[0].getElementsByTagName('Name')[0].textContent,
          time: result.getElementsByTagName('Time')[0] ? result.getElementsByTagName('Time')[0].textContent : 'N/A',
          points: result.getAttribute('points'),
          fastestLap: result.getElementsByTagName('FastestLap')[0]
            ? result.getElementsByTagName('FastestLap')[0].getElementsByTagName('Time')[0].textContent
            : 'N/A'
        }));

        if (results.length > 0) {
          setRaceResults(results);
        }
      } catch (error) {
        console.error('Error fetching race results:', error);
      }
    };

    fetchRaceResults();
  }, [gpNumber]);

  if (!raceResults) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container race-results">
      <h3>Race Results</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Number</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Time</th>
            <th>Fastest Lap</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {raceResults.map((result, index) => (
            <tr key={index}>
              <td>{result.position}</td>
              <td>{result.driverId ? <DorsalPiloto driverId={result.driverId} /> : 'N/A'}</td>
              <td>{result.givenName} {result.familyName}</td>
              <td>{result.constructorName}</td>
              <td>{index < 10 ? result.time : ''}</td>
              <td>{result.fastestLap}</td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceResults;
