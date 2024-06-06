import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
      });
      
      if (response.ok) {
        navigate('/login'); // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
      } else {
        const data = await response.json();
        if (response.status === 409) {
          setError(data.message); // Muestra el mensaje de error del servidor
        } else {
          setError('Error en el registro');
        }
      }
    } catch (error) {
      setError('Error al enviar datos de registro');
      console.error('Error al enviar datos de registro:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center pt-5">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Nombre de Usuario:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-button">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
