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
        const response = await fetch('http://ergast.com/api/f1/current/driverStandings');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'text/xml');

        const driverStandingsArray = Array.from(xmlDocument.getElementsByTagName('DriverStanding')).map(driverStanding => ({
          position: driverStanding.getAttribute('position'),
          points: driverStanding.getAttribute('points'),
          wins: driverStanding.getAttribute('wins'),
          driverId: driverStanding.getElementsByTagName('Driver')[0].getAttribute('driverId'),
          givenName: driverStanding.getElementsByTagName('GivenName')[0].textContent,
          familyName: driverStanding.getElementsByTagName('FamilyName')[0].textContent,
          constructor: driverStanding.getElementsByTagName('Constructor')[0].getAttribute('constructorId'),
          constructorName: driverStanding.getElementsByTagName('Name')[0].textContent
        }));

        setDriverStandings(driverStandingsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getColorClass = (constructorId) => {
    switch (constructorId) {
      case 'red_bull': return 'red-bull';
      case 'ferrari': return 'ferrari';
      case 'mercedes': return 'mercedes';
      case 'mclaren': return 'mclaren';
      // Añade más casos según los equipos
      default: return 'default';
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tabla de Posiciones</h1>
      <div className="row">
        {driverStandings.map((driver, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <Link to={`/drivers/${driver.driverId}`} className="card-link">
              <div className={`card ${driver.constructor}`}>
                <div className="card-header">
                  <h5 className="card-title">Posición: {driver.position}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Puntos: {driver.points}</h6>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{driver.givenName} {driver.familyName}</h5>
                  <DriverImage driverId={driver.driverId} />
                  <DorsalPiloto driverId={driver.driverId} />
                  <TeamLogo constructorName={driver.constructor} />
                </div>
                <div className="card-footer">
                  <small className="text-muted">Victorias: {driver.wins}</small>
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
