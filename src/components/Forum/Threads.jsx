import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="container mt-4">
      <h1>Threads</h1>
      <Link to={`/forums/${forumId}/create`} className="btn c-button mb-3">Create new Thread</Link>
      <ul className="list-group">
        {threads.map(thread => (
          <li key={thread.id} className="list-group-item">
            <h2>{thread.title}</h2>
            <Link to={`/threads/${thread.id}`} className="btn c-button">Show Messages</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Threads;
