import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Buat instance axios dengan konfigurasi dasar
export const api = axios.create({
  // Menggunakan URL dari env untuk production (Vercel), fallback ke localhost untuk local dev
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor Request: Otomatis sisipkan Token JWT ke setiap request API
api.interceptors.request.use(
  (config) => {
    // Ambil token dari state Zustand
    const token = useAuthStore.getState().token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response: Tangani error global seperti token kedaluwarsa
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token tidak valid / kedaluwarsa, paksa logout
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
