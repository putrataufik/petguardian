import React from 'react'
import { useAuthUser, useLogout } from "../hooks/authHooks";
import NavbarBottom from "../components/NavbarBottom";
const schedule = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
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
      <NavbarBottom />
    </div>
  )
}

export default schedule
