import axios from 'axios';

// Mock API calls (replace with your Flask endpoints)
export const sendMessage = async (message: string) => {
  const response = await axios.post('/api/chat', { message });
  return response.data.reply;
};

export const fetchHistory = async () => {
  const response = await axios.get('/api/history');
  return response.data;
};