// Notification.js
import React, { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import './Notification.css'; // Asegúrate de crear estilos apropiados

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return notification ? (
    <div className="notification">
      {notification}
    </div>
  ) : null;
};

export default Notification;
