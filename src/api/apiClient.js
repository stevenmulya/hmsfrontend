// --- Centralized API Client using Axios ---
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Your Laravel backend URL
  withCredentials: true,
  headers: { 'Accept': 'application/json' }
});

// Interceptor to automatically attach the auth token to every request
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('customer_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default apiClient;