import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import TeamLogo from '../TeamLogo';
import TeamCar from '../TeamCar';
import ImgPiloto from '../ImgPiloto';
import './ConstructorCard.css';

const ConstructorCard = ({ constructor, drivers }) => {
  const teamClass = constructor.constructorId.toLowerCase();
  return (
    <div className={`constructor-card ${teamClass}`}>
      <div className="card-header d-flex justify-content-between">
        <div className="position">Posición: {constructor.position}</div>
        <div className="points">Puntos: {constructor.points}</div>
      </div>
      <div className="card-body">
        <div className="constructor-name-logo d-flex justify-content-between align-items-center">
          <span className="constructor-name">{constructor.name}</span>
          {constructor.constructorId && (
            <TeamLogo constructorName={constructor.constructorId} className="constructor-logo ml-2" />
          )}
        </div>
        <div className="drivers mt-3 d-flex justify-content-around">
          {drivers.map(driver => (
            <div key={driver.driverId} className="driver">
              <ImgPiloto driverId={driver.driverId} className="driver-photo" />
              <Link to={`/drivers/${driver.driverId}`} className="driver-name">
                {driver.name}
              </Link>
            </div>
          ))}
        </div>
        {constructor.constructorId && (
          <TeamCar constructorName={constructor.constructorId} className="car-image mt-3" />
        )}
      </div>
    </div>
  );
};

export default ConstructorCard;
