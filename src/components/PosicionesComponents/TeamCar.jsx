// TeamCar.js
import React from 'react';

// Array con las URL de las imágenes de los coches de los equipos de F1
const carImages = {
  'ferrari': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/ferrari.png',
  'red_bull': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png',
  'mercedes': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mercedes.png',
  'mclaren': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mclaren.png',
  'aston_martin': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/aston-martin.png',
  'alpine': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/alpine.png',
  'rb': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/rb.png',
  'sauber': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/kick-sauber.png',
  'williams': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/williams.png',
  'haas': 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/haas.png',
};

const TeamCar = ({ constructorName }) => { 
  // Obtener la URL de la imagen del coche del constructor
  const carUrl = carImages[constructorName.toLowerCase()];

  // Renderizar la imagen del coche si se encuentra la URL
  return (
    <img
      src={carUrl}
      alt={`Coche de ${constructorName}`}
      className="team-car"
    />
  );
};

export default TeamCar;
