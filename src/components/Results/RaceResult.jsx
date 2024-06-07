import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DorsalPiloto from '../PosicionesComponents/DorsalPiloto';

const RaceResults = () => {
  const { gpNumber } = useParams(); // Obtiene el número del Gran Premio de los parámetros de la URL
  const [raceResults, setRaceResults] = useState(null); // Estado para almacenar los resultados de la carrera

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/2024/${gpNumber}/results.xml`); // Solicita los resultados de la carrera en formato XML
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml'); // Parsea el texto XML a un documento XML

        const results = Array.from(xmlDocument.getElementsByTagName('Result')).map(result => ({
          position: result.getAttribute('position'), // Obtiene la posición en la carrera
          number: result.getAttribute('number'), // Obtiene el número del piloto
          driverId: result.getElementsByTagName('Driver')[0].getAttribute('driverId'), // Obtiene el ID del piloto
          givenName: result.getElementsByTagName('GivenName')[0].textContent, // Obtiene el nombre del piloto
          familyName: result.getElementsByTagName('FamilyName')[0].textContent, // Obtiene el apellido del piloto
          constructorName: result.getElementsByTagName('Constructor')[0].getElementsByTagName('Name')[0].textContent, // Obtiene el nombre del constructor
          time: result.getElementsByTagName('Time')[0] ? result.getElementsByTagName('Time')[0].textContent : 'N/A', // Obtiene el tiempo de carrera
          points: result.getAttribute('points'), // Obtiene los puntos obtenidos
          fastestLap: result.getElementsByTagName('FastestLap')[0]
            ? result.getElementsByTagName('FastestLap')[0].getElementsByTagName('Time')[0].textContent
            : 'N/A' // Obtiene el tiempo de la vuelta más rápida
        }));

        if (results.length > 0) {
          setRaceResults(results);
        }
      } catch (error) {
        console.error('Error fetching race results:', error); 
      }
    };

    fetchRaceResults(); // Llama a la función para obtener los resultados de la carrera
  }, [gpNumber]); // El efecto se ejecuta cuando cambia gpNumber

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
            <th>Dorsal</th>
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
