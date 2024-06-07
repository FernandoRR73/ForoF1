import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const UpdateUser = ({ onUpdate }) => {
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (newPassword && newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden'); // Verifica si las contraseñas coinciden
      return;
    }

    setError(''); // Limpia cualquier error previo

    try {
      const response = await fetch('http://localhost:3001/auth/updateUser', {
        method: 'PUT', // Configura la solicitud como PUT
        headers: {
          'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
        },
        credentials: 'include', // Incluir las cookies de sesión
        body: JSON.stringify({ newEmail, newUsername, newPassword }) // Convierte el cuerpo de la solicitud a JSON
      });

      if (response.ok) {
        onUpdate(newUsername); // Actualiza el nombre de usuario en el contexto
        setSuccess('Perfil actualizado exitosamente');
        setError(''); 
      } else {
        const data = await response.json();
        setError(data.message || 'Error al actualizar usuario');
        setSuccess(''); 
      }
    } catch (error) {
      setError('Error al actualizar usuario'); 
      setSuccess('');
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center form-container">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <h3>Actualizar Usuario</h3>
            {error && <Alert variant="danger">{error}</Alert>} {/* Muestra mensaje de error */}
            {success && <Alert variant="success">{success}</Alert>} {/* Muestra mensaje de éxito */}
            <Form.Group controlId="formNewEmail">
              <Form.Label>Nuevo Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="formNewUsername">
              <Form.Label>Nuevo Usuario:</Form.Label>
              <Form.Control
                type="text"
                value={newUsername}
                onChange={(event) => setNewUsername(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Nueva Contraseña (opcional):</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirmar Nueva Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-button">
              Actualizar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateUser;
