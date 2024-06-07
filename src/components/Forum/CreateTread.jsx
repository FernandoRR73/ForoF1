import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateThread = () => {
  const { forumId } = useParams(); 
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    fetch('http://localhost:3001/threads', {
      method: 'POST', // Configura la solicitud como POST
      headers: {
        'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
      },
      credentials: 'include', // Incluye las credenciales en la solicitud
      body: JSON.stringify({ forumId, title, content }), // Convierte el cuerpo de la solicitud a JSON
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error('No está autorizado');
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then(data => {
        if (data.message === 'Hilo creado exitosamente') {
          navigate(`/forums/${forumId}`); // Redirige al foro si el hilo se creó exitosamente
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
            Title:
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required // Campo obligatorio
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Content:
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required // Campo obligatorio
            />
          </label>
        </div>
        <button type="submit" className="btn c-button">Create thread</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

export default CreateThread;
