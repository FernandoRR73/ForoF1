import React from 'react';

const UploadAvatar = ({ onUpload }) => {
  const handleChange = async (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado por el usuario
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file); // Agrega el archivo al objeto FormData con la clave 'avatar'

      try {
        const response = await fetch('http://localhost:3001/auth/uploadAvatar', {
          method: 'POST', // Configura la solicitud como POST
          credentials: 'include', // Incluye las credenciales en la solicitud
          body: formData 
        });

        if (response.ok) {
          const data = await response.json();
          onUpload(data.avatar); // Llama a la función onUpload con el avatar subido
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
      accept="image/*" // Acepta solo archivos de imagen
      style={{ display: 'none' }} // Oculta el input de archivo
      id="avatarInput"
      onChange={handleChange} // Llama a handleChange cuando cambia el valor del input
    />
  );
};

export default UploadAvatar; 
