import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Posiciones.css';
import TeamLogo from '../../components/PosicionesComponents/TeamLogo';
import DorsalPiloto from '../../components/PosicionesComponents/DorsalPiloto';
import DriverImage from '../../components/PosicionesComponents/ImgPiloto';

const Posiciones = () => {
  const [driverStandings, setDriverStandings] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ergast.com/api/f1/current/driverStandings'); // Realiza una solicitud para obtener las posiciones de los pilotos
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'text/xml'); // Parsea el texto XML a un documento XML

        const driverStandingsArray = Array.from(xmlDocument.getElementsByTagName('DriverStanding')).map(driverStanding => ({
          position: driverStanding.getAttribute('position'), // Obtiene la posición del piloto
          points: driverStanding.getAttribute('points'), // Obtiene los puntos del piloto
          wins: driverStanding.getAttribute('wins'), // Obtiene las victorias del piloto
          driverId: driverStanding.getElementsByTagName('Driver')[0].getAttribute('driverId'), // Obtiene el ID del piloto
          givenName: driverStanding.getElementsByTagName('GivenName')[0].textContent, // Obtiene el nombre del piloto
          familyName: driverStanding.getElementsByTagName('FamilyName')[0].textContent, // Obtiene el apellido del piloto
          constructor: driverStanding.getElementsByTagName('Constructor')[0].getAttribute('constructorId'), // Obtiene el ID del constructor
          constructorName: driverStanding.getElementsByTagName('Name')[0].textContent // Obtiene el nombre del constructor
        }));

        setDriverStandings(driverStandingsArray); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Llama a la función para obtener las posiciones de los pilotos
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Driver Standings</h1>
      <div className="row">
        {driverStandings.map((driver, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <Link to={`/drivers/${driver.driverId}`} className="card-link">
              <div className={`card ${driver.constructor}`}>
                <div className="card-header">
                  <h5 className="card-title">Position: {driver.position}</h5> {/* Muestra la posición del piloto */}
                  <h6 className="card-subtitle mb-2 text-muted">Points: {driver.points}</h6> {/* Muestra los puntos del piloto */}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{driver.givenName} {driver.familyName}</h5> {/* Muestra el nombre completo del piloto */}
                  <DriverImage className="imagenpiloto" driverId={driver.driverId} /> {/* Muestra la imagen del piloto */}
                  <DorsalPiloto driverId={driver.driverId} /> {/* Muestra el dorsal del piloto */}
                  <TeamLogo constructorName={driver.constructor} /> {/* Muestra el logo del equipo */}
                </div>
                <div className="card-footer">
                  <small className="text-muted">Wins: {driver.wins}</small> {/* Muestra las victorias del piloto */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posiciones;
