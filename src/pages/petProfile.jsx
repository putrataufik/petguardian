import React from 'react';
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom"; // Tambahkan useNavigate untuk navigasi
import BurgerMenu from '../components/burgerMenu';
import fotokucing from '../assets/kucing.png';

const PetProfile = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangani navigasi saat div diklik
  const handleCardClick = () => {
    navigate("/detailpetprofile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between w-full items-center">
        <BurgerMenu user={user} logout={logout} />
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mt-6">Your Pets</h1>

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
      <div className="flex justify-center mt-6">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300">
          Add New Pet
        </button>
      </div>
    </div>
  );
};

export default PetProfile;
