import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/Forums.css'; 

const Forums = () => {
  const [forums, setForums] = useState([]); // Estado para almacenar la lista de foros

  useEffect(() => {
    fetch('http://localhost:3001/forums') // Realiza una solicitud para obtener la lista de foros
      .then(response => response.json()) // Convierte la respuesta en JSON
      .then(data => setForums(data)); // Establece la lista de foros en el estado
  }, []);
  
  return (
    <div className="container mt-4">
      <h1>Forums</h1>
      <ul className="list-group ">
        {forums.map(forum => (
          <li key={forum.id} className="list-group-item forum-item f-list p-0"> {/* Lista los foros */}
            <Link to={`/forums/${forum.id}`} className="forum-link d-block p-3 text-decoration-none">
              {forum.title} {/* Enlace al foro específico */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forums;
