import { useState, useEffect } from "react";
import { auth } from "../api/firebaseConfig";
import { signOut } from "firebase/auth";
import usePetStore from "../hooks/petStore"; // Import store Zustand

export const useAuthUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return user;
};

export const useLogout = () => {
  return async () => {
    try {
      // Panggil fungsi signOut dari Firebase
      await signOut(auth);

      const { clearPets } = usePetStore.getState(); // Dapatkan fungsi clearPets dari Zustand store
      clearPets();

      // Redirect ke halaman utama setelah logout
      window.location.href = "/";
    } catch (error) {
      alert("Gagal log out: " + error.message);
    }
  };
};
