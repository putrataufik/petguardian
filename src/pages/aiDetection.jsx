import React, { useState } from "react";
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import BurgerMenu from "../components/burgerMenu"; // Import BurgerMenu
import uploadImage from "../assets/uploadImagge.png";

const AiDetection = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null); // State untuk menyimpan file yang dipilih
  const [previewImage, setPreviewImage] = useState(null); // State untuk menyimpan URL preview gambar

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Simpan file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set gambar ke preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentifyBreed = () => {
    if (selectedFile) {
      console.log("Identify Pet Breed:", selectedFile); // Log file
    } else {
      console.warn("No file selected for Identify Pet Breed.");
    }
  };

  const handleCheckHealth = () => {
    if (selectedFile) {
      console.log("Check for Health Issues:", selectedFile); // Log file
    } else {
      console.warn("No file selected for Check for Health Issues.");
    }
  };

  const handleGrooming = () => {
    if (selectedFile) {
      console.log("Let's Grooming:", selectedFile); // Log file
    } else {
      console.warn("No file selected for Let's Grooming.");
    }
  };
//cobaa
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
            onClick={() => {
              navigate("/userProfile");
            }}
          />
        )}
      </div>

      {/* Rest of the page */}
      <h1 className="text-2xl font-bold text-center mt-6">
        Get to know your pet with{" "}
        <span className="text-pink-500">Petguard</span>
      </h1>

      {/* Drag and Drop Box */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 mt-8 flex flex-col items-center w-80 relative"
      >
        <img src={uploadImage} alt="Upload" className="w-10 h-10 mb-4" />
        <p className="text-gray-600">Drop Your .png or .jpg file here!</p>
        <p className="text-gray-400 text-sm mt-1">Max 5mb each.</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {previewImage && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Preview:</h2>
            <button
              onClick={() => {
                setSelectedFile(null); // Hapus file
                setPreviewImage(null); // Hapus preview
              }}
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
        <button
          className="bg-black text-white py-3 px-4 rounded hover:bg-gray-800 w-full md:w-64 h-16 text-base font-bold"
          onClick={handleIdentifyBreed}
        >
          Identify Pet Breed
        </button>
        <button
          className="bg-pink-500 text-white py-3 px-4 rounded hover:bg-pink-600 w-full md:w-64 h-16 text-base font-bold"
          onClick={handleCheckHealth}
        >
          Check for Health Issues
        </button>
      </div>

      <div className="flex flex-row items-center justify-center mt-8 w-full">
        <button
          className="bg-gray-300 text-gray-600 py-3 px-4 rounded cursor-not-allowed w-full md:w-64 h-14 text-base font-bold"
          onClick={handleGrooming}
        >
          Let's Grooming
        </button>
      </div>
    </div>
  );
};

export default AiDetection;
