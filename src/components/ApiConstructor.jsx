// ApiConstructor.js
import { useEffect } from 'react';

const ApiConstructor = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ergast.com/api/f1/current/constructorStandings');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlText, 'text/xml');

        // Extraer los datos necesarios del XML
        const constructorStandingsArray = Array.from(xmlDocument.getElementsByTagName('ConstructorStanding')).map(constructorStanding => ({
          position: constructorStanding.getAttribute('position'),
          points: constructorStanding.getAttribute('points'),
          wins: constructorStanding.getAttribute('wins'),
          constructorId: constructorStanding.getElementsByTagName('Constructor')[0].getAttribute('constructorId'),
          name: constructorStanding.getElementsByTagName('Name')[0].textContent,
          nationality: constructorStanding.getElementsByTagName('Nationality')[0].textContent
        }));

        onDataFetched(constructorStandingsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataFetched]);

  return null;
};

export default ApiConstructor;
