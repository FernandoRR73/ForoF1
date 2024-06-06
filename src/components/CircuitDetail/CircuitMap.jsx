// CircuitMap.jsx
import React from 'react';

// Define un objeto con las URL de los mapas de circuitos
const circuitMaps = {
  bahrain: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245035/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Bahrain%20carbon.png.transform/5col/image.png',
  jeddah: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245030/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Saudi%20Arabia%20carbon.png.transform/5col/image.png',
  albert_park: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245032/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Australia%20carbon.png.transform/5col/image.png',
  suzuka: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245031/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Japan%20carbon.png.transform/5col/image.png',
  shanghai: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/China%20carbon.png.transform/5col/image.png',
  miami: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245035/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Miami%20carbon.png.transform/5col/image.png',
  imola: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684338005/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Emilia%20Romagna%20carbon.png.transform/5col/image.png',
  monaco: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245032/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Monte%20Carlo%20carbon.png.transform/5col/image.png',
  villeneuve: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Canada%20carbon.png.transform/5col/image.png',
  catalunya: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1680529432/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Spain%20carbon.png.transform/5col/image.png',
  red_bull_ring: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Austria%20carbon.png.transform/5col/image.png',
  silverstone: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Great%20Britain%20carbon.png.transform/5col/image.png',
  hungaroring: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Hungar%20carbon.png.transform/5col/image.png',
  spa: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Belgium%20carbon.png.transform/5col/image.png',
  zandvoort: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245033/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Netherlands%20carbon.png.transform/5col/image.png',
  monza: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245031/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Italy%20carbon.png.transform/5col/image.png',
  baku: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245030/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Azerbaijan%20carbon.png.transform/5col/image.png',
  marina_bay: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1683639275/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Singapore%20carbon.png.transform/5col/image.png',
  americas: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245035/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/USA%20carbon.png.transform/5col/image.png',
  rodriguez: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Mexico%20carbon.png.transform/5col/image.png',
  interlagos: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Brazil%20carbon.png.transform/5col/image.png',
  vegas: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677249931/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Las%20Vegas%20carbon.png.transform/5col/image.png',
  losail: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245031/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Qatar%20carbon.png.transform/5col/image.png',
  yas_marina: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Abu%20Dhab%20carbon.png.transform/5col/image.png',
};

// Define un componente funcional CircuitMap que renderiza una imagen de mapa de circuito
const CircuitMap = ({ circuitId }) => {
  return (
    <img
      src={circuitMaps[circuitId] || '/images/circuits/default.png'} // Utiliza la URL del mapa del circuito correspondiente o una imagen por defecto si no se encuentra
      alt={`${circuitId} map`} // Establece el atributo alt con el ID del circuito
      className="circuit-map" // Aplica la clase CSS circuit-map para estilos personalizados
    />
  );
};

export default CircuitMap;
