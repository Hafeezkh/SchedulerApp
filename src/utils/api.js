import axios from 'axios';

export const baseURL = 'http://localhost:8080'; 

export const api = axios.create({
  baseURL,
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
  } catch (error) {
    throw new Error('Invalid email or password');
  }
};
