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
      setError('Las contraseñas no coinciden');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:3001/auth/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Asegúrate de incluir las cookies de sesión
        body: JSON.stringify({ newEmail, newUsername, newPassword })
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(newUsername);
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
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
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
