// CountryFlag.jsx
import React from 'react';

const flags = {
  Dutch: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg',
  Mexican: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
  Monegasque: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg',
  British: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg',
  Spanish: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
  Australian: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg',
  Japanese: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
  Canadian: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg',
  German: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
  Thai: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg',
  Chinese: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
  French: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
  Finnish: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg',
  American: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
};

const CountryFlag = ({ nationality }) => {
  const flagUrl = flags[nationality];

  return (
    <img
      src={flagUrl}
      alt={`Flag of ${nationality}`}
      className="country-flag"
    />
  );
};

export default CountryFlag;
