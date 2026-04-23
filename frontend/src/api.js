import axios from 'axios';

// Temporary local fallback for development.
// const RENDER_API_URL = 'https://todo-backend-latest-kr1t.onrender.com';
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const getTasks = () => api.get('/tasks');

export const createTask = (taskData) => api.post('/tasks', taskData);

export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
