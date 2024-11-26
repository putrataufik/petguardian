import React from "react";
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";

const AiDetection = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Detection</h1>
      {user ? (
        <div>
          <p className="text-green-600 mb-4">
            Selamat datang, <strong>{user.displayName}</strong>!
          </p>
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2"
          >
            Log Out
          </button>
          <button
            onClick={() => navigate("/schedule")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go to Profile
          </button>
        </div>
      ) : (
        <div>
          <p className="text-red-600">Belum login.</p>
          <button
            onClick={() => navigate("/signin")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go signin
          </button>
        </div>
      )}
    </div>
  );
};

export default AiDetection;
