import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const  createUser = (userData) =>  api.post('/register', userData)
export const loginUser = (userData) => api.post('/login', userData);
export const getUserProfile = () => api.get('/me');

export default api;