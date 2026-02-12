import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost/hmsbackend/public/api', 

  withCredentials: true,
  headers: { 'Accept': 'application/json' }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('customer_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default apiClient;