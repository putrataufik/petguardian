import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Ambil dari .env

export const getPetByOwnerUID = async (uid) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pets/owner/${uid}`,
      {
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    );
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};
