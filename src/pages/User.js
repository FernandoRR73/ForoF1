import React from 'react';

const User = () => {
  const handleLogout = () => {
    // Limpiar la sesión del usuario
    localStorage.removeItem('token'); // Por ejemplo, eliminar el token de autenticación del almacenamiento local

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Bienvenido a la página de usuario</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default User;
