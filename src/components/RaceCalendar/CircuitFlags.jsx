// CircuitFlag.jsx
import React from 'react';

const circuitFlags = {
  bahrain: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg',
  jeddah: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg',
  albert_park: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
  suzuka: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg',
  shanghai: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
  miami: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
  imola: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
  monaco: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg',
  villeneuve: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
  catalunya: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
  red_bull_ring: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg',
  silverstone: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg',
  hungaroring: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg',
  spa: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
  zandvoort: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg',
  monza: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg',
  baku: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg',
  marina_bay: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg',
  americas: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
  rodriguez: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
  interlagos: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
  vegas: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
  losail: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg',
  yas_marina: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg',
};

const CircuitFlag = ({ circuitId }) => {
  return (
    <img
      src={circuitFlags[circuitId] || '/flags/default.png'}
      alt={`${circuitId} flag`}
      className="flag-icon"
    />
  );
};

export default CircuitFlag;
