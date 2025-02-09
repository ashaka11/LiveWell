import axios from 'axios';

// Configure base URL (adjust to your Flask server)
const api = axios.create({
  baseURL: 'http://localhost:5000', // Flask default port
});

// Add JWT token to requests (after login)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (username: string, password: string) => {
    try {
      const response = await api.post('/user/register', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/user/login', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  validateToken: async () => {
    try {
      const response = await api.get('/user/validate');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Token validation failed';
    }
  }
};

// Mock API calls (replace with your Flask endpoints)
export const sendMessage = async (message: string) => {
  const response = await axios.post('/api/chat', { message });
  return response.data.reply;
};

export const fetchHistory = async () => {
  const response = await axios.get('/api/history');
  return response.data;
};