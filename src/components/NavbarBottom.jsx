import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Mengimpor Link dari react-router-dom
import { AiOutlineCalendar } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaScissors } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { useAuthUser } from "../hooks/authHooks"; // Mengimpor hook untuk autentikasi

const NavbarBottom = () => {
  const user = useAuthUser(); // Ambil data pengguna
  const [userPicture, setUserPicture] = useState(""); // State untuk menyimpan gambar user

  // Menetapkan gambar profil jika user photoURL ada
  useEffect(() => {
    if (user && user.photoURL) {
      setUserPicture(user.photoURL); // Menetapkan foto profil jika ada
    }
  }, [user]);

  return (
    <div className="fixed bottom-0 left-0 w-full 
    bg-[#E0A0AE] flex justify-around items-center py-4 px-6 shadow-md">
      {/* Grooming Button */}
      <Link to="/subscribe" className="flex flex-col items-center text-black">
        <FaScissors size={25} />
      </Link>

      {/* Kalender Button */}
      <Link to="/schedule" className="flex flex-col items-center text-white">
        <AiOutlineCalendar size={30} />
      </Link>

      {/* Center Button */}
      <div className="relative flex items-center justify-center w-1/5">
        <Link
          to="/aidetection"
          className="absolute -top-12 w-16 h-16 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-pink-400 hover:bg-gray-800"
        >
          <BsStars size={32} />
        </Link>
      </div>

      {/* Pet Profile Button */}
      <Link to="/petprofile" className="flex flex-col items-center text-black">
        <MdPets size={27} />
      </Link>

      {/* User Profile Button */}
      <Link to="/userProfile" className="flex flex-col items-center text-white">
        {userPicture ? (
          <img
            src={userPicture}
            alt="User Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <FaScissors size={32} /> // Icon fallback jika gambar tidak ada
        )}
      </Link>
    </div>
  );
};

export default NavbarBottom;
