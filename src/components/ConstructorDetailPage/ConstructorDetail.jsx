import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TeamLogo from '../PosicionesComponents/TeamLogo';
import ImgPiloto from '../PosicionesComponents/ImgPiloto';
import DorsalPiloto from '../PosicionesComponents/DorsalPiloto';
import ConstructorCarousel from '../ConstructorCarousel/ConstructorCarousel'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './ConstructorDetailPage.css'; 

const ConstructorDetail = () => {
  const { constructorId } = useParams();
  const [constructor, setConstructor] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [championships, setChampionships] = useState(0);
  const [totalRaces, setTotalRaces] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [driverPoints, setDriverPoints] = useState({});

  useEffect(() => {
    const fetchConstructorData = async () => {
      try {
        const responseConstructor = await fetch(`http://ergast.com/api/f1/current/constructors/${constructorId}.json`);
        const dataConstructor = await responseConstructor.json();
        const constructorData = dataConstructor.MRData.ConstructorTable.Constructors[0];
        setConstructor(constructorData);

        const responseDrivers = await fetch(`http://ergast.com/api/f1/current/constructors/${constructorId}/drivers.json`);
        const driversData = await responseDrivers.json();
        setDrivers(driversData.MRData.DriverTable.Drivers);

        const responseStandings = await fetch(`http://ergast.com/api/f1/constructors/${constructorId}/constructorStandings.json`);
        const standingsData = await responseStandings.json();
        const standings = standingsData.MRData.StandingsTable.StandingsLists;

        let totalChampionships = 0;
        let races = 0;
        let points = 0;

        standings.forEach(season => {
          if (season.ConstructorStandings[0].position === '1') {
            totalChampionships += 1;
          }
          races += parseInt(season.ConstructorStandings[0].wins);
          points += parseFloat(season.ConstructorStandings[0].points);
        });

        setChampionships(totalChampionships);
        setTotalRaces(races);
        setTotalPoints(points);

        // Fetch driver points
        const driverPointsData = {};
        for (const driver of driversData.MRData.DriverTable.Drivers) {
          const responseDriverStandings = await fetch(`http://ergast.com/api/f1/current/drivers/${driver.driverId}/driverStandings.json`);
          const driverStandingsData = await responseDriverStandings.json();
          if (driverStandingsData.MRData.StandingsTable.StandingsLists.length > 0) {
            driverPointsData[driver.driverId] = driverStandingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
          } else {
            driverPointsData[driver.driverId] = 0;
          }
        }
        setDriverPoints(driverPointsData);
      } catch (error) {
        console.error('Error fetching constructor data:', error);
      }
    };

    fetchConstructorData();
  }, [constructorId]);

  return (
    <div className="container constructor-detail-page">
      {constructor && (
        <>
          <div className="constructor-header d-flex align-items-center mb-4">
            <div className="constructor-info">
              <h1 className="mr-3">{constructor.name}</h1>
              <TeamLogo constructorName={constructor.constructorId} className="constructor-logo-detail" />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="drivers">
                <table className="table table-no-border text-center">
                  <thead>
                    <tr>
                      {drivers.map(driver => (
                        <th key={driver.driverId} className="text-center">
                          <Link to={`/drivers/${driver.driverId}`}>
                            <ImgPiloto driverId={driver.driverId} className="driver-photo" />
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {drivers.map(driver => (
                        <td key={driver.driverId} className={`text-center driver-detail hover ${constructor.constructorId}`}>
                          <Link to={`/drivers/${driver.driverId}`}>
                            <p className="mt-2">{driver.givenName} {driver.familyName}</p>
                            <DorsalPiloto driverId={driver.driverId} className="driver-dorsal" />
                            <p><strong>Points:</strong> {driverPoints[driver.driverId]}</p>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <div className="statistics">
                <table className="table table-no-border text-center">
                  <tbody>
                    <tr>
                      <th>Championships Won</th>
                      <td>{championships}</td>
                    </tr>
                    <tr>
                      <th>Total Races</th>
                      <td>{totalRaces}</td>
                    </tr>
                    <tr>
                      <th>Total Points</th>
                      <td>{totalPoints}</td>
                    </tr>
                    <tr>
                      <th>Nationality</th>
                      <td>{constructor.nationality}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}><a href={constructor.url} target="_blank" rel="noopener noreferrer" className="d-block text-center">historia</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ConstructorCarousel constructorId={constructorId} />
        </>
      )}
    </div>
  );
};

export default ConstructorDetail;
