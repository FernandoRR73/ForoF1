import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImgPiloto from '../../components/PosicionesComponents/ImgPiloto';//fall
import DorsalPiloto from '../../components/PosicionesComponents/DorsalPiloto';
import CountryFlag from '../CountryFlag';
import DriverCarousel from '../DriverCarousel/DriverCarousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DriverDetailPage.css';

const DriverDetailPage = () => {
  const { driverId } = useParams();
  const [driver, setDriver] = useState(null);
  const [victories, setVictories] = useState(0);
  const [podiums, setPodiums] = useState(0);
  const [team, setTeam] = useState('');

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await fetch(`http://ergast.com/api/f1/drivers/${driverId}.xml`);
        const xmlString = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        const driverNode = xmlDoc.querySelector('Driver');
        const driverData = {
          name: driverNode.querySelector('GivenName').textContent + ' ' + driverNode.querySelector('FamilyName').textContent,
          nationality: driverNode.querySelector('Nationality').textContent,
          dateOfBirth: driverNode.querySelector('DateOfBirth').textContent,
          wikipediaUrl: driverNode.getAttribute('url'),
        };

        const responseConstructor = await fetch(`http://ergast.com/api/f1/current/drivers/${driverId}/constructors.json`);
        const constructorData = await responseConstructor.json();
        const constructorName = constructorData.MRData.ConstructorTable.Constructors[0].name;

        setDriver(driverData);
        setTeam(constructorName);
      } catch (error) {
        console.error('Error fetching or parsing XML:', error);
      }
    };

    fetchDriver();
  }, [driverId]);

  useEffect(() => {
    const fetchPodiums = async (driverName) => {
      let totalVictories = 0;
      let totalPodiums = 0;

      const fetchYearResults = async (year) => {
        const response = await fetch(`http://ergast.com/api/f1/${year}/results.json?limit=1000`);
        const data = await response.json();

        const races = data.MRData.RaceTable.Races;
        races.forEach(race => {
          race.Results.forEach(result => {
            const driver = result.Driver;
            const position = result.position;

            if (`${driver.givenName} ${driver.familyName}` === driverName) {
              if (position === '1') {
                totalVictories++;
                totalPodiums++;
              } else if (position === '2' || position === '3') {
                totalPodiums++;
              }
            }
          });
        });
      };

      for (let year = 2000; year <= new Date().getFullYear(); year++) {
        await fetchYearResults(year);
      }

      setVictories(totalVictories);
      setPodiums(totalPodiums);
    };

    if (driver) {
      fetchPodiums(driver.name);
    }
  }, [driver]);

  // URLs de imágenes para el carrusel
  const images = [
    `/images/${driverId}/${driverId}_1.jpg`,
    `/images/${driverId}/${driverId}_2.jpg`,
    `/images/${driverId}/${driverId}_3.jpg`
  ];

  return (
    <div className="container driver-detail-page">
      <div className="row">
        <div className="col-md-4 text-center">
          <ImgPiloto driverId={driverId} className="img-fluid driver-image" />
          {driver && (
            <div className="driver-name mt-3">
              <h2>{driver.name}</h2>
              <div className="driver-details-horizontal">
                <DorsalPiloto driverId={driverId} />
                <CountryFlag nationality={driver.nationality} />
              </div>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div className="driver-details mt-4">
            {driver && (
              <>
                <p><strong>Equipo:</strong> {team}</p>
                <p><strong>Nacionalidad:</strong> {driver.nationality}</p>
                <p><strong>Fecha de Nacimiento:</strong> {driver.dateOfBirth}</p>
                <p><strong>Victorias:</strong> {victories}</p>
                <p><strong>Podios:</strong> {podiums}</p>
                <p><a href={driver.wikipediaUrl} target="_blank" rel="noopener noreferrer">Biografía</a></p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <DriverCarousel images={images} />
        </div>
      </div>
    </div>
  );
};

export default DriverDetailPage;
