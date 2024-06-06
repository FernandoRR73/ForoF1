import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const { forumId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Incluir credenciales en la solicitud
      body: JSON.stringify({ forumId, title, content }),
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error('No está autorizado');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Hilo creado exitosamente') {
          navigate(`/forums/${forumId}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Crear Nuevo Hilo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Crear Hilo</button>
      </form>
    </div>
  );
};

export default CreateThread;
