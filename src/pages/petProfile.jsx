import React from 'react';
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom"; // Tambahkan useNavigate untuk navigasi
import fotokucing from '../assets/kucing.png';
import NavbarBottom from '../components/NavbarBottom'; // Import NavbarBottom

const PetProfile = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangani navigasi saat div diklik
  const handleCardClick = () => {
    navigate("/detailpetprofile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-20 flex flex-col items-center relative">
      {/* Header */}
      <div className="flex justify-end w-full items-center">
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
            onClick={() => navigate("/userProfile")}
          />
        )}
      </div>

      {/* Title */}
      <div className="flex justify-between items-center mt-6 w-full">
        <h1 className="text-2xl font-bold">Your Pets</h1>
        <button className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300">
          Add +
        </button>
      </div>

      {/* Pet Card 1 */}
      <div
        onClick={handleCardClick} // Menambahkan event onClick
        className="mt-6 w-full max-w-md flex items-center bg-black rounded-lg overflow-hidden cursor-pointer"
      >
        <img
          src={fotokucing}
          alt="Pet"
          className="w-1/3 object-cover"
        />
        <div className="p-4 flex-grow text-white">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold">Noozy</h2>
            <span className="text-pink-400">♀</span>
          </div>
        </div>
      </div>

      {/* Pet Card 2 */}
      <div
        onClick={handleCardClick} // Menambahkan event onClick
        className="mt-6 w-full max-w-md flex items-center bg-black rounded-lg overflow-hidden cursor-pointer"
      >
        <img
          src={fotokucing}
          alt="Pet"
          className="w-1/3 object-cover"
        />
        <div className="p-4 flex-grow text-white">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold">Noozy</h2>
            <span className="text-pink-400">♀</span>
          </div>
        </div>
      </div>

      {/* Navbar Bottom */}
      <NavbarBottom />
    </div>
  );
};

export default PetProfile;
