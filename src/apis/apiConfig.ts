import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://35a5-2401-4900-883e-e48f-9517-c795-1f07-4cb4.ngrok-free.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
