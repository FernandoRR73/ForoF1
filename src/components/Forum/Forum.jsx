// src/pages/forum/Forum.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostMessage from './PostMessage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forum.css';

const Forum = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/forum/getMessages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Foro</h2>
      <ul className="list-group mt-4">
        {messages.map((message) => (
          <li key={message.id} className="list-group-item message-item">
            <strong>{message.username}:</strong> {message.contenido} <em>({new Date(message.fecha).toLocaleString()})</em>
          </li>
        ))}
      </ul>
      <PostMessage addMessage={addMessage} />
    </div>
  );
};

export default Forum;
