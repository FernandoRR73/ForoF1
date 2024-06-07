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

  const handleDeleteUser = () => {
    if (window.confirm('Are you sure you want to delete your account? This action can not be undone.')) {
      navigate('/delete-user');
    }
  };

  if (!profile) {
    return <div className="text-center mt-5">Loading Profile...</div>;
  }

  return (
    <div className="container mt-5 profile-container">
      <div className="row">
        <div className="col-md-4 text-center">
          {profile.avatar && (
            <img
              src={`http://localhost:3001/${profile.avatar}`}
              alt="Avatar"
              className="img-fluid rounded-circle profile-avatar"
              style={{ width: '150px', height: '150px' }}
            />
          )}
        </div>
        <div className="col-md-8">
          <h2>{profile.username}</h2>
          <div className="col-6">
            <Link to="/update-user">
              <button className="btn c-button me-2">Update User</button>
            </Link>
            <Link to="/lapTimes">
              <button className="btn c-button">My Lap Times</button>
            </Link>
            <button className="ms-3 mt-3 btn btn-danger me-2" onClick={handleDeleteUser}>Delete User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
