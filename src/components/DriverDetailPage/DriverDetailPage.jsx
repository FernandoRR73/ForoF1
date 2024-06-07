import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImgPiloto from '../../components/PosicionesComponents/ImgPiloto';
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
        }; // Extrae los datos del piloto del XML

        const responseConstructor = await fetch(`http://ergast.com/api/f1/current/drivers/${driverId}/constructors.json`);
        const constructorData = await responseConstructor.json();
        const constructorName = constructorData.MRData.ConstructorTable.Constructors[0].name;

        setDriver(driverData); // Establece el estado del piloto
        setTeam(constructorName); // Establece el estado del equipo
      } catch (error) {
        console.error('Error fetching or parsing XML:', error);
      }
    };

    fetchDriver();
  }, [driverId]); // Ejecuta el efecto cuando cambia driverId

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

      setVictories(totalVictories); // Establece el estado de las victorias
      setPodiums(totalPodiums); // Establece el estado de los podios
    };

    if (driver) {
      fetchPodiums(driver.name); // Llama a fetchPodiums si driver está definido
    }
  }, [driver]); // Ejecuta el efecto cuando cambia driver

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
          <ImgPiloto driverId={driverId} className="img-fluid driver-image" /> {/* Muestra la imagen del piloto */}
          {driver && (
            <div className="driver-name mt-3">
              <h2>{driver.name}</h2>
              <div className="driver-details-horizontal">
                <DorsalPiloto driverId={driverId} /> {/* Muestra el dorsal del piloto */}
                <CountryFlag nationality={driver.nationality} /> {/* Muestra la bandera del país del piloto */}
              </div>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div className="driver-details mt-4">
            {driver && (
              <>
                <p><strong>Team:</strong> {team}</p> {/* Muestra el equipo del piloto */}
                <p><strong>Nationality:</strong> {driver.nationality}</p> {/* Muestra la nacionalidad del piloto */}
                <p><strong>Birthdate:</strong> {driver.dateOfBirth}</p> {/* Muestra la fecha de nacimiento del piloto */}
                <p><strong>Total Wins:</strong> {victories}</p> {/* Muestra el total de victorias del piloto */}
                <p><strong>Total podiums:</strong> {podiums}</p> {/* Muestra el total de podios del piloto */}
                <p><a href={driver.wikipediaUrl} target="_blank" rel="noopener noreferrer" className='btn c-button'>Biography</a></p> {/* Enlace a la biografía del piloto */}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <DriverCarousel images={images} /> {/* Muestra el carrusel de imágenes del piloto */}
        </div>
      </div>
    </div>
  );
};

export default DriverDetailPage;