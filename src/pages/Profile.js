import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UploadAvatar from '../components/Profile/UploadAvatar';
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
          setProfile(data);
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

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  if (!profile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <UploadAvatar onUpload={newAvatar => setProfile({ ...profile, avatar: newAvatar })} />
      {profile.avatar && (
        <img
          src={`http://localhost:3001/${profile.avatar}`}
          alt="Avatar"
          className="profile-avatar"
          onClick={handleAvatarClick}
          style={{ cursor: 'pointer' }}
        />
      )}
      <h2>{profile.username}</h2>
      <Link to="/update-user">
        <button>Modificar Usuario</button>
      </Link>
      <Link to="/delete-user">
        <button>Eliminar Usuario</button>
      </Link>
      <Link to="/lapTimes">
        <button>Mis Tiempos de Vuelta</button>
      </Link>
    </div>
  );
};

export default Profile;
