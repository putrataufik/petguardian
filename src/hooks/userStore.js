import create from 'zustand';
import { persist } from 'zustand/middleware';

// Store untuk data user dan pets
export const useUserStore = create(
  persist(
    (set) => ({
      user: null, // Data user yang akan disimpan
      pets: [],   // Data pets yang akan disimpan
      setUser: (user) => set({ user }), // Fungsi untuk set user
      setPets: (pets) => set({ pets }), // Fungsi untuk set pets
      clearUser: () => set({ user: null, pets: [] }), // Fungsi untuk clear user dan pets
    }),
    {
      name: 'user-storage', // Nama key untuk menyimpan data di localStorage
    }
  )
);
