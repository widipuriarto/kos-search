import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand store untuk global state Auth
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,       // Berisi { id, name, email, role }
      token: null,      // Berisi token JWT
      isAuthenticated: false,

      // Action saat login sukses
      setLogin: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
      }),

      // Action saat logout
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
      }),

      // Action update user (nama, phone, dll) tanpa ubah token
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
    }),
    {
      name: 'kossearch-auth-storage', // Nama key yang akan tersimpan di LocalStorage
    }
  )
);
