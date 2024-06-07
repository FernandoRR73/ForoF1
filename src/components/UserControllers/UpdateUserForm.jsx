import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUserForm = ({ onUpdate }) => {
  const [profile, setProfile] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/profile', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data); // Establece el perfil del usuario en el estado
          setNewUsername(data.username); // Establece el nombre de usuario en el estado
        } else {
          console.error('Error al obtener el perfil del usuario');
          navigate('/login'); // Redirige a la página de inicio de sesión si no se puede obtener el perfil
        }
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        navigate('/login'); // Redirige a la página de inicio de sesión en caso de error
      }
    };

    fetchProfile();
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!newUsername.trim()) {
      newErrors.newUsername = 'El nombre de usuario es obligatorio'; // Valida que el nombre de usuario no esté vacío
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'; // Valida que las contraseñas coincidan
    }

    setErrors(newErrors); // Establece los errores en el estado
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Si el formulario no es válido, no continúa
    }

    try {
      const response = await fetch('http://localhost:3001/auth/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ newUsername, newPassword }) // Envía los datos del formulario al servidor
      });

      if (response.ok) {
        if (onUpdate) onUpdate(newUsername); // Llama a la función onUpdate con el nuevo nombre de usuario
        navigate('/profile'); // Redirige a la página de perfil
      } else {
        console.error('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error); // Maneja el error de la solicitud
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click(); // Simula un clic en el input de archivo
  };

  const handleAvatarChange = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]); // Agrega el archivo al objeto FormData

    try {
      const response = await fetch('http://localhost:3001/auth/uploadAvatar', {
        method: 'POST',
        credentials: 'include',
        body: formData // Envía el FormData al servidor
      });

      if (response.ok) {
        const data = await response.json();
        setProfile({ ...profile, avatar: data.avatar }); // Actualiza el avatar en el perfil del usuario
      } else {
        console.error('Error al subir el avatar');
      }
    } catch (error) {
      console.error('Error al subir el avatar:', error);
    }
  };

  if (!profile) {
    return <div className="text-center mt-5">Cargando perfil...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="container mt-5">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          {profile.avatar && (
            <img
              src={`http://localhost:3001/${profile.avatar}`}
              alt="Avatar"
              className="img-fluid rounded-circle profile-avatar border border-dark"
              onClick={handleAvatarClick}
              style={{ cursor: 'pointer', width: '150px', height: '150px' }}
            />
          )}
          <input
            type="file"
            id="avatarInput"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Username:</label>
          <input
            type="text"
            className={`form-control ${errors.newUsername ? 'is-invalid' : ''}`}
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
          {errors.newUsername && <div className="invalid-feedback">{errors.newUsername}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">New Password:</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm new Password:</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <button type="submit" className="btn c-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
