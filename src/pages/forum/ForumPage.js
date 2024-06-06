import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Forums.css'; // Importamos el archivo CSS para los estilos personalizados

const Forums = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/forums')
      .then(response => response.json())
      .then(data => setForums(data));
  }, []);

  return (
    <div className="container mt-4"> {/* Utilizamos clases de Bootstrap para la estructura */}
      <h1>Foros</h1>
      <ul className="list-group"> {/* Clase de Bootstrap para la lista */}
        {forums.map(forum => (
          <li key={forum.id} className="list-group-item"> {/* Clases de Bootstrap para los elementos de la lista */}
            <Link to={`/forums/${forum.id}`} className="forum-link">{forum.title}</Link> {/* Clase personalizada para los enlaces */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forums;
