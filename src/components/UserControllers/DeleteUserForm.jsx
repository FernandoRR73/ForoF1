import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteUserForm = ({ onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/deleteUser', {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        if (onDelete) onDelete(); // Añadir verificación
        navigate('/');
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Eliminar Usuario</button>
  );
};

export default DeleteUserForm;
