import { useState, useEffect } from "react";
import { auth } from "../api/firebaseConfig";
import { signOut } from "firebase/auth";

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
      await signOut(auth);
      window.location.href = "/"; // Redirect ke halaman utama setelah logout
    } catch (error) {
      alert("Gagal log out: " + error.message);
    }
  };
};
