import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-g7yl.onrender.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
