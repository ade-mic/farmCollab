import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const getToken = () => localStorage.getItem("token");

export const createUser = (userData) => api.post('/register', userData);
export const loginUser = (userData) => api.post('/login', userData);
export const getUserProfile = () => {
  const token = getToken();
  return api.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutUser = (userData) => api.post('/logout', userData);

// Projects API
export const createProject = (projectData) => {
  const token = getToken();
  return api.post('/projects', projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserProjects = () => {
  const token = getToken();
  return api.get('/user-projects', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateProject = (projectId, projectData) => {
  console.log(projectData);
  const token = getToken();
  return api.put(`/projects/${projectId}`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const deleteProject = (projectId) => {
  const token = getToken();
  return api.delete(`/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const getAllProjects = () => {
  return api.get('/projects');
}
export const supportProject = (projectId, supportData) => {
  const token = getToken();
  return api.post(`/projects/${projectId}/subscribe`, supportData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const getProjectSupported = () => {
  const token = getToken();
  return api.get('/user-subscriptions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
// Inventory API
export const createInventory = (inventoryData) => {
  const token = getToken();
  console.log(inventoryData);
  return api.post('/inventory', inventoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserInventory = () => {
  const token = getToken();
  return api.get('/user-inventory', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateInventory = (inventoryId, inventoryData) => {
  const token = getToken();
  return api.put(`/inventory/${inventoryId}`, inventoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const deleteInventory = (inventoryId) => {
  const token = getToken();
  return api.delete(`/inventory/${inventoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const getAllInventory = () => {
  return api.get('/inventory');
}

// Farm API
export const createFarm = (farmData) => {
  const token = getToken();
  return api.post('/farms', farmData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserFarms = () => {
  const token = getToken();
  return api.get('/user-farms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateFarm = (farmId, farmData) => {
  const token = getToken();
  return api.put(`/farms/${farmId}`, farmData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
} 
export const deleteFarm = (farmId) => {
  const token = getToken();
  return api.delete(`/farms/${farmId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Orders API
export const createOrder = (orderData) => {
  const token = getToken();
  return api.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserOrders = () => {
  const token = getToken();
  return api.get('/user-orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getSellerOrders = () => {
  const token = getToken();
  return api.get('/seller-orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateOrder = (orderId, orderData) => {
  const token = getToken();
  return api.put(`/orders/${orderId}`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const updateOrderStatus = (orderId, orderData) => {
  const token = getToken();
  return api.put(`/orders/${orderId}/status`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const deleteOrder = (orderId) => {
  const token = getToken();
  return api.delete(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const paymentIntent = (orderData) => {
  const token = getToken();
  return api.post('/payment', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Fetch entity data
export const getEntityData = (entity) => {
  const token = getToken();
  return api.get(`/user-${entity}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export default api;
