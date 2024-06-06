// ApiPilotos.js
import { useEffect } from 'react';

const ApiPilotos = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ergast.com/api/f1/current/driverStandings');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'text/xml');

        // Extraer los datos necesarios del XML
        const driverStandingsArray = Array.from(xmlDocument.getElementsByTagName('DriverStanding')).map(driverStanding => ({
          position: driverStanding.getAttribute('position'),
          points: driverStanding.getAttribute('points'),
          wins: driverStanding.getAttribute('wins'),
          driverId: driverStanding.getElementsByTagName('Driver')[0].getAttribute('driverId'),
          givenName: driverStanding.getElementsByTagName('GivenName')[0].textContent,
          familyName: driverStanding.getElementsByTagName('FamilyName')[0].textContent,
          constructorId: driverStanding.getElementsByTagName('Constructor')[0].getAttribute('constructorId')
        }));

        onDataFetched(driverStandingsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataFetched]);

  return null;
};

export default ApiPilotos;
