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
      console.log(username, password);
      const response = await api.post('/user/login', {
        'username': username,
        'password': password
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


export const sendSymptoms = async (symptoms: string) => {
  const response = await api.post('/symptoms', { symptoms });
  return response.data['symptom'];
};

export const fetchMedicalHistory = async () => {
  const response = await api.get('/medical-history');
  return response.data.map(([symptoms, diagnosis, created_at]) => ({
    symptoms,
    diagnosis,
    created_at,
  }));
};

export const deleteSymptomEntry = async (entryId: string) => {
  await api.delete(`/medical-history/${entryId}`);
};