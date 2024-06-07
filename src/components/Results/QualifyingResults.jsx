import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DorsalPiloto from '../PosicionesComponents/DorsalPiloto';

const QualifyingResults = () => {
  const { gpNumber } = useParams(); // Obtiene el número del Gran Premio de los parámetros de la URL
  const [qualifyingResults, setQualifyingResults] = useState(null);

  useEffect(() => {
    const fetchQualifyingResults = async () => {
      try {
        const response = await fetch(`https://ergast.com/api/f1/2024/${gpNumber}/qualifying.xml`); // Solicita los resultados de clasificación en formato XML
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'application/xml'); // Parsea el texto XML a un documento XML

        const results = Array.from(xmlDocument.getElementsByTagName('QualifyingResult')).map(result => ({
          position: result.getAttribute('position'), // Obtiene la posición de clasificación
          driverId: result.getElementsByTagName('Driver')[0].getAttribute('driverId'), // Obtiene el ID del piloto
          givenName: result.getElementsByTagName('GivenName')[0].textContent, // Obtiene el nombre del piloto
          familyName: result.getElementsByTagName('FamilyName')[0].textContent, // Obtiene el apellido del piloto
          constructorName: result.getElementsByTagName('Constructor')[0].getElementsByTagName('Name')[0].textContent, // Obtiene el nombre del constructor
          q1: result.getElementsByTagName('Q1')[0] ? result.getElementsByTagName('Q1')[0].textContent : 'N/A', // Obtiene el tiempo de Q1
          q2: result.getElementsByTagName('Q2')[0] ? result.getElementsByTagName('Q2')[0].textContent : 'N/A', // Obtiene el tiempo de Q2
          q3: result.getElementsByTagName('Q3')[0] ? result.getElementsByTagName('Q3')[0].textContent : 'N/A' // Obtiene el tiempo de Q3
        }));

        if (results.length > 0) {
          setQualifyingResults(results); // Establece los resultados de clasificación en el estado
        }
      } catch (error) {
        console.error('Error fetching qualifying results:', error); // Manejo de errores
      }
    };

    fetchQualifyingResults(); // Llama a la función para obtener los resultados de clasificación
  }, [gpNumber]); // El efecto se ejecuta cuando cambia gpNumber

  if (!qualifyingResults) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="container qualifying-results">
      <h3>Qualifying Results</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Dorsal</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
          </tr>
        </thead>
        <tbody>
          {qualifyingResults.map((result, index) => (
            <tr key={index}>
              <td>{result.position}</td>
              <td>{result.driverId ? <DorsalPiloto driverId={result.driverId} /> : 'N/A'}</td> {/* Muestra el dorsal del piloto */}
              <td>{result.givenName} {result.familyName}</td> {/* Muestra el nombre completo del piloto */}
              <td>{result.constructorName}</td> {/* Muestra el nombre del constructor */}
              <td>{result.q1}</td> {/* Muestra el tiempo de Q1 */}
              <td>{result.q2}</td> {/* Muestra el tiempo de Q2 */}
              <td>{result.q3}</td> {/* Muestra el tiempo de Q3 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QualifyingResults;
