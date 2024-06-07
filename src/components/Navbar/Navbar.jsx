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
        method: 'POST', // Configura la solicitud como POST
        credentials: 'include' // Incluye las credenciales en la solicitud
      });

      if (response.ok) {
        setUser(null); // Establece el usuario como null en el contexto de autenticación
        window.location.href = '/'; // Redirige a la página de inicio
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error); 
    }
  };

  const handleForumClick = (event) => {
    if (!user) {
      event.preventDefault(); // Previene la acción predeterminada del evento si el usuario no está autenticado
      showNotification('To access the forum, you must be logged in.'); // Muestra una notificación
      navigate('/login'); // Redirige a la página de inicio de sesión
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Muestra el modal de cierre de sesión
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false); // Cierra el modal de cierre de sesión
  };

  return (
    <div className="navbar-container">
      <nav className="container">
        <ul>
          <li>
            <Link to="/">Home</Link>
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
              <Link to="/profile" className="navbar-username"></Link>{user.avatar && <img src={`http://localhost:3001/${user.avatar}`} alt="Avatar" className="navbar-avatar" />}
              <Link to="/profile" className="navbar-username">{user.username}</Link>
              <button onClick={handleLogoutClick} className="logout-button">Log out</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register Now</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Modal de confirmación de cierre de sesión */}
      <Modal show={showLogoutModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button className='c-button' onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navbar;
