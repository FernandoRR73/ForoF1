import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateUserForm = ({ onUpdate }) => {
  const [newUsername, setNewUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ newUsername })
      });

      if (response.ok) {
        if (onUpdate) onUpdate(newUsername); // Añadir verificación
        navigate('/profile');
      } else {
        console.error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nuevo nombre de usuario:
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        />
      </label>
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default UpdateUserForm;
