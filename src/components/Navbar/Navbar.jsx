import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { NotificationContext } from '../Notifications/NotificationContext';
import { Modal, Button } from 'react-bootstrap';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser(null);
        window.location.href = '/';
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleForumClick = (event) => {
    if (!user) {
      event.preventDefault();
      showNotification('Para acceder al foro, debes estar logueado.');
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="navbar-container">
      <nav className="container">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/about">Acerca de</Link>
          </li>
          <li className="dropdown">
            <span className="dropdown-title">Standings</span>
            <div className="dropdown-content">
              <Link to="/standings/drivers">Drivers</Link>
              <Link to="/standings/constructors">Teams</Link>
            </div>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/forums" onClick={handleForumClick}>Forum</Link>
          </li>
          {user ? (
            <li className="user-info">
              {user.avatar && <img src={`http://localhost:3001/${user.avatar}`} alt="Avatar" className="navbar-avatar" />}
              <Link to="/profile" className="navbar-username">{user.username}</Link>
              <button onClick={handleLogoutClick} className="logout-button">Cerrar Sesión</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Regístrate</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Modal de confirmación de cierre de sesión */}
      <Modal show={showLogoutModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cerrar sesión?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navbar;
