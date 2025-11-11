import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,       // dados do usuário (id, email, tipo)
      token: null,  
      isLoggedIn : false,    // token JWT

      // Ações:
      login: (userData, token) => set({ user: userData, token, isLoggedIn: true }),
      logout: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: 'auth', // nome da chave no localStorage
      getStorage: () => localStorage, // padrão
    }
  )
);
