import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Proxy will forward to http://localhost:5000
  withCredentials: false,
});

export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/signup', formData);

export const addLostItem = (itemData, token) => {
  return API.post('/items', itemData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,  // send token here
    },
  });
};

export const getMyItems = (token) =>
  API.get('/items/my', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


