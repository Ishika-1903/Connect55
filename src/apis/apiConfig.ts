import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://3426-2401-4900-883e-769f-288f-1da6-3b35-6694.ngrok-free.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
