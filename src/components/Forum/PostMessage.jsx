// src/pages/forum/PostMessage.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostMessage.css';

const PostMessage = ({ addMessage }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/forum/postMessage', { contenido: content }, { withCredentials: true });
      if (response.data.messageId) {
        const newMessage = {
          id: response.data.messageId,
          contenido: content,
          fecha: new Date().toISOString(),
          username: response.data.username // Asumiendo que el backend devuelve el nombre de usuario
        };
        addMessage(newMessage); // Añadir el nuevo mensaje al estado
        setContent('');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Escribe tu mensaje aquí..."
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Publicar</button>
    </form>
  );
};

export default PostMessage;
