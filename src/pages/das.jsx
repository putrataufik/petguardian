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

  const [selectedFile, setSelectedFile] = useState(null); // Untuk menyimpan file
  const [previewImage, setPreviewImage] = useState(null); // Untuk menyimpan URL preview

  // Fungsi untuk menangani perubahan file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Simpan file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk tombol Identify Pet Breed
  const handleIdentifyBreed = () => {
    if (selectedFile) {
      console.log("Identify Pet Breed:", selectedFile); // Log file
    } else {
      console.warn("No file selected for Identify Pet Breed.");
    }
  };

  // Fungsi untuk tombol Check for Health Issues
  const handleCheckHealth = () => {
    if (selectedFile) {
      console.log("Check for Health Issues:", selectedFile); // Log file
    } else {
      console.warn("No file selected for Check for Health Issues.");
    }
  };

  // Fungsi untuk tombol Let's Grooming
  const handleGrooming = () => {
    if (selectedFile) {
      console.log("Let's Grooming:", selectedFile); // Log file
    } else {
      console.warn("No file selected for Let's Grooming.");
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button className="text-black text-2xl font-bold">☰</button>
        <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <img src={iconProfile} alt="" />
        </button>
      </div>

      {/* Judul */}
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold">
          Get to know your pet with <span className="text-pink-500">Petguard</span>
        </h1>
      </div>

      {/* Upload Area */}
      <div className="mt-8 flex flex-col items-center">
        <label
          htmlFor="fileUpload"
          className="w-64 h-32 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
        >
          <span className="text-gray-600">📤</span>
          <span className="text-sm text-gray-500">Drop your .png or .jpg file here!</span>
          <span className="text-xs text-gray-400">Max 5Mb each</span>
        </label>
        <input
          type="file"
          id="fileUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Preview Gambar */}
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

      {/* Tombol Aksi */}
      <div className="mt-8 flex flex-col space-y-4 items-center">
        <button
          onClick={handleIdentifyBreed}
          className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 w-64"
        >
          Identify Pet Breed
        </button>
        <button
          onClick={handleCheckHealth}
          className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 w-64"
        >
          Check for Health Issues
        </button>
        <button
          onClick={handleGrooming}
          className="bg-gray-300 text-gray-600 py-2 px-6 rounded cursor-not-allowed w-64"
        >
          Let's Grooming
        </button>
      </div>
    </div>
  );
};

export default AiDetection;
