import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePetStore = create(
  persist(
    (set) => ({
      pets: [],
      loading: false,
      error: null,

      // Fetch pets for a specific user
      fetchPets: async (uid) => {
        const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
        console.log("Fetching pets for UID:", uid);
        set({ loading: true, error: null });

        try {
          const response = await fetch(`${API_BASE_URL}/pets/owner/${uid}`, {
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420", // Remove if unnecessary
            }),
          }).then((res) => res.json());

          if (response && Array.isArray(response.pets)) {
            console.log("Fetched pets:", response.pets);
            set({ pets: response.pets, loading: false });
          } else {
            throw new Error("Invalid API response format");
          }
        } catch (error) {
          console.error("Error fetching pets:", error);
          set({ error: `Failed to fetch pets: ${error.message}`, loading: false });
        }
      },

      // Add a new pet to the list
      addPet: (newPet) =>
        set((state) => ({
          pets: [...state.pets, newPet],
        })),

      // Clear all pets from the state
      clearPets: () => set({ pets: [], error: null, loading: false }),
    }),
    {
      name: "pet-storage", // Key for localStorage
    }
  )
);

export default usePetStore;
