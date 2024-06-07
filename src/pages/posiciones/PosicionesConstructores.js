import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ConstructorCard from '../../components/PosicionesComponents/constructorCard/ConstructorCard';
import ApiConstructor from '../../components/ApiConstructor';
import ApiPiloto from '../../components/ApiPiloto';
import './PosicionesConstructores.css';

const PosicionesConstructores = () => {
  const [constructorStandings, setConstructorStandings] = useState([]); // Estado para almacenar las posiciones de los constructores
  const [driverStandings, setDriverStandings] = useState([]); // Estado para almacenar las posiciones de los pilotos

  const handleConstructorDataFetched = (data) => {
    setConstructorStandings(data); // Actualiza el estado con los datos de los constructores
  };

  const handleDriverDataFetched = (data) => {
    setDriverStandings(data); // Actualiza el estado con los datos de los pilotos
  };

  const combinedData = constructorStandings.map(constructor => ({
    ...constructor,
    drivers: driverStandings.filter(driver => driver.constructorId === constructor.constructorId) // Combina los datos de constructores con los pilotos correspondientes
  }));

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Teams Standings</h1>
      <ApiConstructor onDataFetched={handleConstructorDataFetched} /> {/* Componente que obtiene los datos de los constructores */}
      <ApiPiloto onDataFetched={handleDriverDataFetched} /> {/* Componente que obtiene los datos de los pilotos */}
      <div className="row">
        {combinedData.map((constructor, index) => (
          <div key={index} className={`col-md-6 col-lg-6 ${index % 2 !== 0 ? 'offset-top' : ''}`}>
            <Link to={`/constructor/${constructor.constructorId}`} className={` ${constructor.constructorId}`}>
              <ConstructorCard constructor={constructor} drivers={constructor.drivers} /> {/* Muestra la tarjeta del constructor con sus pilotos */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PosicionesConstructores;
