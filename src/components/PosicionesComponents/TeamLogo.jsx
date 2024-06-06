// TeamLogo.js
import React from 'react';
import './teamLogo.css';

// Array con las URL de los logotipos de los equipos de F1
const constructorLogo = {
  'ferrari': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/ferrari',
  'red_bull': 'https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/red%20bull',
  'mercedes': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Mercedes-Benz_logo_2.svg',
  'mclaren': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/McLaren_Speedmark.svg',
  'aston_martin': 'https://upload.wikimedia.org/wikipedia/it/5/5b/Logo_della_Aston_Martin.svg',
  'alpine': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Alpine_F1_Team_Logo.svg',
  'rb': 'https://upload.wikimedia.org/wikipedia/en/0/09/Scuderia_Alpha-Tauri.svg',
  'sauber': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Logo_of_Stake_F1_Team_Kick_Sauber.png',
  'williams': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo_Williams_F1.png',
  'haas': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Haas_F1_Team_logo.png',
};

const TeamLogo = ({ constructorName }) => {
  // Obtener la URL del logo del constructor
  const logoUrl = constructorLogo[constructorName.toLowerCase()];

  // Renderizar el logo si se encuentra la URL
  return (
    <img
      src={logoUrl}
      alt={`Logo de ${constructorName}`}
      className="team-logo"
    />
  );
};

export default TeamLogo;
