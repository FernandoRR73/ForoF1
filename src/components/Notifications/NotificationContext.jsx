import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000); // Oculta la notificación después de 3 segundos
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
