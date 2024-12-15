import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaScissors } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { useAuthUser } from "../hooks/authHooks"; // Mengimpor hook untuk autentikasi

const NavbarBottom = () => {
  const navigate = useNavigate();
  const user = useAuthUser(); // Ambil data pengguna
  const [userPicture, setUserPicture] = useState(""); // State untuk menyimpan gambar user

  // Menetapkan gambar profil jika user photoURL ada
  useEffect(() => {
    if (user && user.photoURL) {
      setUserPicture(user.photoURL); // Menetapkan foto profil jika ada
    }
  }, [user]); 

  return (
    <div className="fixed bottom-0 left-0 w-full bg-pink-400 flex justify-around items-center py-4 px-6 shadow-md">
      {/* Grooming Button */}
      <button
        onClick={() => navigate("/subscribe")}
        className="flex flex-col items-center text-black"
      >
        <FaScissors size={25} />
      </button>

      {/* Kalender Button */}
      <button
        onClick={() => navigate("/schedule")}
        className="flex flex-col items-center text-white"
      >
        <AiOutlineCalendar size={30} />
      </button>

      {/* Center Button */}
      <div className="relative flex items-center justify-center w-1/5">
        <button
          onClick={() => navigate("/")}
          className="absolute -top-12 w-16 h-16 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-pink-400 hover:bg-gray-800"
        >
          <BsStars size={32} />
        </button>
      </div>

      {/* Pet Profile Button */}
      <button
        onClick={() => navigate("/petprofile")}
        className="flex flex-col items-center text-black"
      >
        <MdPets size={27} />
      </button>

      {/* User Profile Button */}
      <button
        onClick={() => navigate("/userProfile")}
        className="flex flex-col items-center text-white"
      >
        
        {userPicture ? (
          <img
            src={userPicture}
            alt="User Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <FaScissors size={32} /> // Icon fallback jika gambar tidak ada
        )}
      </button>
    </div>
  );
};

export default NavbarBottom;
