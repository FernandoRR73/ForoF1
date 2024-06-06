import React from 'react';
import LoginForm from '../components/UserControllers/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Asegúrate de enviar las cookies de sesión
      });

      if (response.ok) {
        navigate('/profile'); // Redirige al usuario a la página de perfil después de un inicio de sesión exitoso
        return true;
      } else {
        const data = await response.json();
        console.error('Error en el inicio de sesión:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error al enviar datos de inicio de sesión:', error);
      return false;
    }
  };

  return (
    <div>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;
