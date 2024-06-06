import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // Verificar la sesión antes de redirigir
        const sessionCheck = await fetch('http://localhost:3001/auth/checkSession', {
          method: 'GET',
          credentials: 'include'
        });
        const sessionData = await sessionCheck.json();
        if (sessionData.sessionActive) {
          const profileResponse = await fetch('http://localhost:3001/auth/profile', {
            method: 'GET',
            credentials: 'include'
          });
          const profileData = await profileResponse.json();
          setUser(profileData); // Actualizar el estado del usuario en AuthContext
          navigate('/profile');
        } else {
          setError('Error al verificar la sesión');
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setError('Error al enviar datos de inicio de sesión');
      console.error('Error al enviar datos de inicio de sesión:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center pt-5">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
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
            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="custom-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-button">
              Iniciar Sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
