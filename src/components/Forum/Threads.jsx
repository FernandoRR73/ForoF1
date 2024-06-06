import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../Styles/Threads.css'; // Importamos el archivo CSS para los estilos personalizados

const Threads = () => {
  const { forumId } = useParams();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/threads/${forumId}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setThreads(data));
  }, [forumId]);

  return (
    <div className="container mt-4"> {/* Utilizamos clases de Bootstrap para la estructura */}
      <h1>Hilos del Foro</h1>
      <Link to={`/forums/${forumId}/create`} className="btn btn-primary mb-3">Crear nuevo hilo</Link> {/* Clases de Bootstrap para el botón */}
      <ul className="list-group"> {/* Clase de Bootstrap para la lista */}
        {threads.map(thread => (
          <li key={thread.id} className="list-group-item"> {/* Clases de Bootstrap para los elementos de la lista */}
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
            <Link to={`/threads/${thread.id}`} className="btn btn-info">Ver discusión</Link> {/* Clases de Bootstrap para el botón */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Threads;
