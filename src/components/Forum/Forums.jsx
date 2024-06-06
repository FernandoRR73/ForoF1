// src/pages/Forums.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Forums = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get('http://localhost:3001/threads');
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Foros</h2>
      <ul className="list-group mt-3">
        {threads.map((thread) => (
          <li key={thread.id} className="list-group-item">
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
            <p>{thread.content}</p>
            <small>{thread.username} en {thread.forum_title} - {new Date(thread.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forums;
