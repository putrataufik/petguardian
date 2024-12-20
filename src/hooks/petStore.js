import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const usePetStore = create(
  persist(
    (set) => ({
      pets: [],
      loading: false,
      error: null,

      fetchPets: async (uid) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get(
            `http://localhost:5000/api/pets/owner/${uid}`
          );
          set({ pets: response.data.pets, loading: false });
        } catch (error) {
          console.error("Error fetching pets:", error);
          set({ error: "Failed to fetch pets.", loading: false });
        }
      },
      
      addPet: (newPet) =>
        set((state) => ({
          pets: [...state.pets, newPet], // Tambahkan pet baru ke array pets
        })),

      clearPets: () => set({ pets: [], error: null, loading: false }), // Fungsi untuk menghapus data pets
    }),
    {
      name: "pet-storage", // Key untuk localStorage
    }
  )
);

export default usePetStore;
