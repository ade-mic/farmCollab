import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createUser = (userData) => api.post('/register', userData);
export const loginUser = (userData) => api.post('/login', userData);
export const getUserProfile = () => {
  const token = localStorage.getItem("token");
  return api.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = (userData) => api.post('/logout', userData);

// projects Api
export const createProject = (projectData) => api.post('/projects', projectData);
export const getUserProjects = () => {
  const token = localStorage.getItem("token");
  return api.get('/user-projects', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Inventory Api
export const createInventory = (inventoryData) => api.post('/inventory', inventoryData);
export const getUserInventory = () => {
  const token = localStorage.getItem("token");
  return api.get('/user-inventory', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Farm api
export const createFarm = (farmData) => api.post('/farms', farmData);
export const getUserFarms = () => {
  const token = localStorage.getItem("token");
  return api.get('/user-farms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export default api;
