/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ThreadMessages.css'; // Importa los estilos personalizados

// Componente principal para mostrar los mensajes del hilo
const ThreadMessages = () => {
  // Obtiene el ID del hilo de la URL
  const { threadId } = useParams();
  // Define estados locales para los datos y controles del componente
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [page, setPage] = useState(0); // Cambia a índice basado en 0 para react-paginate
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 25;
  const [image, setImage] = useState(null);

  const defaultAvatar = 'http://localhost:3001/default/avatar.png'; // URL del avatar por defecto

  // Función para obtener los mensajes de la API
  const fetchMessages = (page) => {
    setLoading(true);
    fetch(`http://localhost:3001/threads/messages/${threadId}?page=${page + 1}&limit=${limit}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        // Actualiza los mensajes con las URLs correctas para avatar e imagen
        const updatedMessages = data.messages.map(message => ({
          ...message,
          avatar: message.avatar ? `http://localhost:3001/${message.avatar}` : defaultAvatar,
          username: message.username || 'Deleted User',
          image: message.image ? `http://localhost:3001${message.image}` : null
        }));
        setMessages(updatedMessages);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  };

  // useEffect para obtener los mensajes y el perfil del usuario cuando cambia la página o el threadId
  useEffect(() => {
    fetchMessages(page);

    fetch('http://localhost:3001/auth/profile', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
        setAvatar(`http://localhost:3001/${data.avatar}`);
      });
  }, [page, threadId]);

  // Maneja el envío de un nuevo mensaje
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('threadId', threadId);
    formData.append('content', newMessage);
    if (image) {
      formData.append('image', image);
    }

    fetch('http://localhost:3001/threads/messages', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Mensaje creado exitosamente') {
          const newMessageData = {
            id: data.messageId,
            content: data.content,
            username: data.username || 'Deleted User',
            created_at: data.created_at,
            avatar: data.avatar ? `http://localhost:3001/${data.avatar}` : defaultAvatar,
            image: data.image ? `http://localhost:3001${data.image}` : null
          };

          // Si el límite de mensajes se ha alcanzado, actualiza la página, de lo contrario, agrega el nuevo mensaje
          if (messages.length + 1 >= limit) {
            setPage(page + 1);
            setMessages([newMessageData]);
          } else {
            setMessages([...messages, newMessageData]);
          }

          setNewMessage('');
          setImage(null);
        }
      });
  };

  // Maneja el cambio de página en la paginación
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPage(selectedPage);
  };

  return (
    <div className="container mt-4">
      <h1>Thread Messages</h1>
      {loading ? (
        <p>Loading Messages...</p>
      ) : (
        <>
          <ul className="list-group">
            {messages.map(message => (
              <li key={message.id} className="list-group-item">
                <div className="d-flex align-items-center mb-2">
                  <img 
                    src={message.avatar} 
                    alt="Avatar" 
                    className="rounded-circle mr-3 border border-dark" 
                    style={{ width: '50px', height: '50px' }} 
                  />
                  <div>
                    <div className="d-flex align-items-center">
                      <strong>{message.username}</strong>
                      <small className="text-muted ml-2">{new Date(message.created_at).toLocaleString()}</small>
                    </div>
                    <p className="mt-2 mb-0">{message.content}</p>
                    {message.image && <img src={message.image} alt="Mensaje" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }} />}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ReactPaginate
            previousLabel={'Back'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={page} // Asegura que la página actual esté resaltada
          />
        </>
      )}
      {(totalPages === 0 || page === totalPages - 1) && ( // Muestra el área de texto si no hay páginas o si está en la última página
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="form-control mt-3"
            placeholder="Write your Post"
            maxLength="500"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control mt-3"
          />
          <button type="submit" className="btn c-button mt-3">Send</button>
        </form>
      )}
    </div>
  );
};

export default ThreadMessages;
