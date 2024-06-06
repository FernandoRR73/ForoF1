import React from 'react';

const UploadAvatar = ({ onUpload }) => {
  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await fetch('http://localhost:3001/auth/uploadAvatar', {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          onUpload(data.avatar);
        } else {
          console.error('Error al subir el avatar');
        }
      } catch (error) {
        console.error('Error al subir el avatar:', error);
      }
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      id="avatarInput"
      onChange={handleChange}
    />
  );
};

export default UploadAvatar;
