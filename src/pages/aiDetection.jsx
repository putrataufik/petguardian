import React, { useState } from "react";
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import burgerMenu from "../assets/burgerMenu.png";
import iconProfile from "../assets/iconProfile.png";
import uploadImage from "../assets/uploadImagge.png";

const AiDetection = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null); // State untuk menyimpan file yang dipilih
  const [previewImage, setPreviewImage] = useState(null); // State untuk menyimpan URL preview gambar

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Membuat URL sementara untuk preview gambar
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Membuat URL sementara untuk preview gambar
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between w-full items-center">
        <img src={burgerMenu} alt="Menu" className="w-8 h-8" />
        {user ? (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <img
            src={iconProfile}
            alt="User Profile"
            className="w-10 h-10"
            onClick={() => navigate("/signin")}
          />
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mt-6">
        Get to know your pet with{" "}
        <span className="text-pink-500">Petguard</span>
      </h1>

      {/* Drag and Drop Box */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 mt-8 flex flex-col items-center w-80 relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <img src={uploadImage} alt="User Profile" className="w-10 h-10 mb-4" />
        <p className="text-gray-600">Drop Your .png or .jpg file here!</p>
        <p className="text-gray-400 text-sm mt-1">Max 5mb each.</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Preview Image */}
      {previewImage && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-2">Preview:</h2>
            <button
              onClick={() => setPreviewImage(null) && setSelectedFile(null)} // Menghapus gambar
              className="text-red-500 font-semibold hover:underline"
            >
              X
            </button>
          </div>
          <img
            src={previewImage}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-lg border border-gray-300"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-row items-center justify-center mt-4 gap-4 w-full">
  <button className="bg-black text-white py-3 px-4 rounded hover:bg-gray-800 w-full md:w-64 h-16 text-base font-bold">
    Identify Pet Breed
  </button>
  <button className="bg-pink-500 text-white py-3 px-4 rounded hover:bg-pink-600 w-full md:w-64 h-16 text-base font-bold">
    Check for Health Issues
  </button>
</div>

<div className="flex flex-row items-center justify-center mt-8 w-50">
  <button className="bg-gray-300 text-gray-600 py-3 px-4 rounded cursor-not-allowed w-full md:w-64 h-14 text-base font-bold">
    Let's Grooming
  </button>
</div>


      {/* Logout */}
      {user && (
        <button
          onClick={logout}
          className="mt-8 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default AiDetection;
