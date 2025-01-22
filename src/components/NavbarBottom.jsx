import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Mengimpor Link dari react-router-dom
import { AiFillSchedule } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaScissors } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { useAuthUser } from "../hooks/authHooks"; // Mengimpor hook untuk autentikasi
import iconProfile from "../assets/iconProfile.png"; // Mengimpor gambar profil
const NavbarBottom = () => {
  const user = useAuthUser(); // Ambil data pengguna
  const [imageUrl, setImageUrl] = useState(""); // State untuk menyimpan URL gambar user
  console.log("User:", user);

  // Menetapkan URL gambar profil jika user.photoURL ada
  useEffect(() => {
    if (user && user.photoURL) {
      
      const url = user.photoURL
    ? `http://localhost:5000/api/images/cache?url=${encodeURIComponent(user.photoURL)}`
    : user.photoURL;
      setImageUrl(url);
      console.log("URL: ", url);
    } else {
      setImageUrl(""); // Reset jika user atau photoURL tidak ada
    }
  }, [user]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#E0A0AE] flex justify-around items-center py-4 px-6 shadow-md rounded-t-3xl">
      {/* Grooming Button */}
      <Link to="/grooming" className="flex flex-col items-center text-black">
        <FaScissors size={25} />
      </Link>

      {/* Kalender Button */}
      <Link to="/schedule" className="flex flex-col items-center text-black">
        <AiFillSchedule size={35} />
      </Link>

      {/* Center Button */}
      <div className="relative flex items-center justify-center w-1/5">
        <Link
          to="/aidetection"
          className="absolute -top-12 w-16 h-16 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-[#F8567B] hover:bg-gray-800"
        >
          <BsStars size={32} />
        </Link>
      </div>

      {/* Pet Profile Button */}
      <Link to="/petprofile" className="flex flex-col items-center text-black">
        <MdPets size={30} />
      </Link>

      {/* User Profile Button */}
      <Link to="/userProfile" className="flex flex-col items-center text-white">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="User Profile"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = ""; // Set gambar kosong jika gagal dimuat
            }}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <img src={iconProfile} alt="" className="w-8 h-8"/> // Icon fallback jika gambar tidak ada
        )}
      </Link>
    </div>
  );
};

export default NavbarBottom;
