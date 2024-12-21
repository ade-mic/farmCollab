import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createUser = (userData) => {
  return api.post('/register', userData)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const loginUser = (userData) => api.post('/login', userData);
export const getUserProfile = () => api.get('/me');

export default api;