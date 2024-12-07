import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/authHooks";
import burgerMenuIcon from "../assets/burgerMenu.png";
import schedule from "../assets/schedule.png";
import logOut from "../assets/logOut.png";
import ai from "../assets/ai.png";

const BurgerMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk menyimpan status menu
  const navigate = useNavigate();
  const logout = useLogout(); // Custom hook untuk handle logout

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle menu

  // Menutup menu saat klik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuElement = document.getElementById("burger-menu");
      if (menuElement && !menuElement.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Icon Burger Menu */}
      {!isOpen && (
        <img
          src={burgerMenuIcon} // Ganti dengan path ke ikon burger menu Anda
          alt="Burger Menu"
          className="w-8 h-8 cursor-pointer"
          onClick={toggleMenu}
        />
      )}

      {/* Full-Screen Menu */}
      {isOpen && (
        <div
          id="burger-menu"
          className={`fixed top-0 left-0 h-full w-1/2 bg-slate-400 shadow-lg z-50 flex flex-col p-4 transform transition-transform duration-1000 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-4 items-start">
            {user ? (
              <>
                <div className="flex gap-2 justify-center items-center">
                  <img
                    src={schedule}
                    height={10}
                    width={10}
                    className="w-5 h-5"
                  />
                  <button
                    onClick={() => {
                      navigate("/schedule");
                      toggleMenu();
                    }}
                    className="text-gray-800 hover:bg-gray-100 rounded-lg"
                  >
                    Schedule
                  </button>
                </div>

                <div className="flex gap-2 justify-center items-center">
                  <img src={ai} height={10} width={10} className="w-5 h-5" />
                  <button
                    onClick={() => {
                      navigate("/");
                      toggleMenu();
                    }}
                    className="text-gray-800 hover:bg-gray-100 rounded-lg"
                  >
                    Ai Detection
                  </button>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <img src={ai} height={10} width={10} className="w-5 h-5" />
                  <button
                    onClick={() => {
                      navigate("/petprofile");
                      toggleMenu();
                    }}
                    className="text-gray-800 hover:bg-gray-100 rounded-lg"
                  >
                    Pet Profile
                  </button>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <img src={ai} height={10} width={10} className="w-5 h-5" />
                  <button
                    onClick={() => {
                      navigate("/subscribe");
                      toggleMenu();
                    }}
                    className="text-gray-800 hover:bg-gray-100 rounded-lg"
                  >
                    Subscribe
                  </button>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <img
                    src={logOut}
                    height={10}
                    width={10}
                    className="w-5 h-5"
                  />
                  <button
                    onClick={() => {
                      logout(); // Panggil fungsi logout
                      toggleMenu(); // Tutup menu setelah logout
                    }}
                    className="text-red-500 hover:bg-red-100 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/signin");
                  toggleMenu();
                }}
                className="text-gray-800 hover:bg-gray-100 py-2 px-4 rounded-lg"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
