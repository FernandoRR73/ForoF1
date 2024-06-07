import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const { forumId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
    <div className="container mt-5">
      <h1>Create thread</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            title:
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Subtitle:
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="btn c-button">Create thread</button>
      </form>
    </div>
  );
};

export default CreateThread;
