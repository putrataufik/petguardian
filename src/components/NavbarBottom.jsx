import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaScissors } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

const NavbarBottom = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-pink-400 flex justify-around items-center py-4 px-6 shadow-md">
      {/* grooming*/}
      <button
        onClick={() => navigate("/subscribe")}
        className="flex flex-col items-center text-black"
      >
        <FaScissors size={25} />
      </button>

      {/* kalender */}
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

      {/* Pet Profile */}
      <button
        onClick={() => navigate("/petprofile")}
        className="flex flex-col items-center text-black"
      >
        <MdPets size={27} />
      </button>

      {/* User Profile */}
      <button
        onClick={() => navigate("/userProfile")}
        className="flex flex-col items-center text-white"
      >
        <FaRegUserCircle size={32} />
      </button>
    </div>
  );
};

export default NavbarBottom;
