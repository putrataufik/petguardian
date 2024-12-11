import React from 'react';
import { useAuthUser, useLogout } from "../hooks/authHooks";
import NavbarBottom from "../components/NavbarBottom";
import { useNavigate } from "react-router-dom";
const Subscribe = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  const navigate = useNavigate(); // Hook untuk navigasi
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Bagian Header */}
      <div className="flex justify-between w-full items-center py-6">
      
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full absolute right-4 top-4 cursor-pointer"
            onClick={() => navigate("/userProfile")}
          />
        )}
      </div>

      {/* Konten Utama */}
      <div className="bg-white rounded-lg shadow-md w-screen max-w-md p-8 text-center">
        <h1 className="text-xl font-semibold mb-4">PetGuardian Plus</h1>
        <p className="text-3xl font-bold text-gray-800 mb-2">Rp. 100.000</p>
        <p className="text-gray-600 mb-6">Lifetime</p>
        <ul className="text-left text-gray-700 mb-6">
          <li className="flex items-center mb-2">
            <span className="text-green-500 mr-2">✔</span> Unlock Lorem Ipsum
          </li>
          <li className="flex items-center mb-2">
            <span className="text-green-500 mr-2">✔</span> Unlock Lorem Ipsum
          </li>
          <li className="flex items-center mb-2">
            <span className="text-green-500 mr-2">✔</span> Unlock Lorem Ipsum
          </li>
          <li className="flex items-center mb-2">
            <span className="text-green-500 mr-2">✔</span> Unlock Lorem Ipsum
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✔</span> Unlock Lorem Ipsum
          </li>
        </ul>
        <button className="bg-pink-500 hover:bg-pink-600 text-black font-semibold py-2 px-4 rounded-lg">
          ORDER NOW
        </button>
      </div>
      <NavbarBottom />
    </div>
  );
};

export default Subscribe;
