// src/components/PilotoLogo/PilotoLogo.js
import React from 'react';
import PropTypes from 'prop-types';

// Objeto con las URL de las imágenes de los pilotos de F1
const imgPiloto = {
  'max_verstappen': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/MAXVER01.png',
  'perez': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/SERPER01.png',
  'leclerc': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/CHALEC01.png',
  'norris': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LANNOR01.png',
  'sainz': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/CARSAI01.png',
  'piastri': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/OSCPIA01.png',
  'russell': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/GEORUS01.png',
  'alonso': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/FERALO01.png',
  'hamilton': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LEWHAM01.png',
  'tsunoda': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/YUKTSU01.png',
  'stroll': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LANSTR01.png',
  'bearman': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/OLIBEA01.png',
  'hulkenberg': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/DANRIC01.png',
  'ricciardo': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/DANRIC01.png',
  'ocon': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/ESTOCO01.png',
  'kevin_magnussen': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/KEVMAG01.png',
  'albon': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/ALEALB01.png',
  'zhou': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/GUAZHO01.png',
  'gasly': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/PIEGAS01.png',
  'bottas': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/VALBOT01.png',
  'sargeant': 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LOGSAR01.png',
};

const DorsalPiloto = ({ driverId }) => {
  if (!driverId) {
    console.error('Driver ID is undefined');
    return null; // o puedes mostrar una imagen predeterminada si lo prefieres
  }

  const imgUrl = imgPiloto[driverId.toLowerCase()];

  // Renderizar la imagen si se encuentra la URL
  return (
    <img
      src={imgUrl}
      alt={`Imagen de ${driverId}`}
      style={{ width: '100px', height: 'auto' }} // Estilo para el tamaño de la imagen
    />
  );
};

DorsalPiloto.propTypes = {
  driverId: PropTypes.string.isRequired
};

export default DorsalPiloto;
