import React from 'react';
import { Button } from 'react-bootstrap';
import './DeleteUser.css'

const DeleteUser = ({ onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      try {
        const response = await fetch('http://localhost:3001/auth/deleteUser', {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          onDelete();
          alert(data.message);
        } else {
          console.error('Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  return (
    <Button className='delete' onClick={handleDelete}>
      Eliminar Cuenta
    </Button>
  );
};

export default DeleteUser;