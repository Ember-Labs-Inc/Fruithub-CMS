import axios from 'axios';

/// <reference types="vite/client" />

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

export default api;
