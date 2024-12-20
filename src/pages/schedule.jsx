import React from 'react';
import { useAuthUser } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const navigate = useNavigate(); // Hook untuk navigasi

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full flex justify-center items-center py-4">
        {/* Profil di kanan atas */}
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full absolute right-4 top-4 cursor-pointer"
            onClick={() => navigate("/userProfile")}
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
