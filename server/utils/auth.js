const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

// Función para generar un nuevo token JWT para un usuario
const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        jwtSecret,
        { expiresIn: '1h' } // Puedes ajustar la duración del token según tus necesidades
    );
};

// Función para verificar y decodificar un token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        return null; // Retorna null si el token es inválido o ha expirado
    }
};

module.exports = {
    generateToken,
    verifyToken
};
