import React from 'react';
import { Button } from 'react-bootstrap';
import './LogoutButton.css';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        window.location.href = '/'; // Redirige al usuario a la página de inicio después de cerrar sesión
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Button variant="primary" onClick={handleLogout} className="logout-c-button">
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
