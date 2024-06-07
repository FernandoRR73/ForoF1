import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/Forums.css'; // Importamos el archivo CSS para los estilos personalizados

const Forums = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/forums')
      .then(response => response.json())
      .then(data => setForums(data));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Forums</h1>
      <ul className="list-group ">
        {forums.map(forum => (
          <li key={forum.id} className="list-group-item forum-item f-list p-0">
            <Link to={`/forums/${forum.id}`} className="forum-link d-block p-3 text-decoration-none">
              {forum.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forums;
