import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/Threads.css'; // Importamos el archivo CSS para los estilos personalizados

// Componente principal para mostrar los hilos de un foro específico
const Threads = () => {
  const { forumId } = useParams(); // Obtiene el ID del foro de la URL
  const [threads, setThreads] = useState([]); // Estado local para almacenar los hilos

  // useEffect para obtener los hilos del foro cuando cambia el forumId
  useEffect(() => {
    fetch(`http://localhost:3001/threads/${forumId}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => setThreads(data)); // Actualiza el estado con los datos de los hilos
  }, [forumId]);

  return (
    <div className="container mt-4">
      <h1>Threads</h1>
      {/* Enlace para crear un nuevo hilo */}
      <Link to={`/forums/${forumId}/create`} className="btn c-button mb-3">Create new Thread</Link>
      <ul className="list-group">
        {/* Mapea y muestra los hilos en una lista */}
        {threads.map(thread => (
          <li key={thread.id} className="list-group-item">
            <h2>{thread.title}</h2>
            {/* Enlace para mostrar los mensajes del hilo */}
            <Link to={`/threads/${thread.id}`} className="btn c-button">Show Messages</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Threads;
