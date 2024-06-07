import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null); 
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
        } else {
          console.error('Error al obtener el perfil del usuario');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        navigate('/login'); 
      }
    };

    fetchProfile(); 
  }, [navigate]); 

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await fetch('http://localhost:3001/auth/deleteUser', {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          alert('Your account has been deleted successfully.');
          navigate('/'); // Redirige a la página principal después de eliminar la cuenta
        } else {
          console.error('Error al eliminar el usuario');
          alert('There was an error deleting your account. Please try again.');
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        alert('There was an error deleting your account. Please try again.');
      }
    }
  };

  if (!profile) {
    return <div className="text-center mt-5">Loading Profile...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="container mt-5 profile-container">
      <div className="row">
        <div className="col-md-4 text-center">
          {profile.avatar && (
            <img
              src={`http://localhost:3001/${profile.avatar}`} // Muestra el avatar del usuario si está disponible
              alt="Avatar"
              className="img-fluid rounded-circle profile-avatar"
              style={{ width: '150px', height: '150px' }}
            />
          )}
        </div>
        <div className="col-md-8">
          <h2>{profile.username}</h2> {/* Muestra el nombre de usuario */}
          <div className="col-6">
            <Link to="/update-user">
              <button className="btn c-button me-2">Update User</button> {/* Botón para actualizar el usuario */}
            </Link>
            <Link to="/lapTimes">
              <button className="btn c-button">My Lap Times</button> {/* Botón para ver los tiempos de vuelta */}
            </Link>
            <button className="ms-3 mt-3 btn btn-danger me-2" onClick={handleDeleteUser}>Delete User</button> {/* Botón para eliminar el usuario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
