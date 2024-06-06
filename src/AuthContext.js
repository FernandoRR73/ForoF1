// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar la sesión cuando la aplicación se carga por primera vez
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/checkSession', { withCredentials: true });
        if (response.data.sessionActive) {
          const profileResponse = await axios.get('http://localhost:3001/auth/profile', { withCredentials: true });
          setUser(profileResponse.data);
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
