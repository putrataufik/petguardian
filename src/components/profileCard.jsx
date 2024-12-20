import React from "react";
import { FiEdit3, FiUser } from "react-icons/fi";
import EditProfileForm from "./editProfileForm"; // Import EditProfileForm

const ProfileCard = ({
  userData = {}, // Menambahkan default props untuk mencegah undefined
  isEditing,
  formData,
  toggleEditMode,
  handleInputChange,
  handleSave,
}) => {
  // Buat URL gambar hanya jika userData.picture tersedia
  const imageUrl = userData.picture
    ? `http://localhost:5000/api/images/cache?url=${encodeURIComponent(userData.picture)}`
    : null;

  return (
    <div className="flex flex-col items-center bg-[#1D1D1D] rounded-b-3xl w-full p-6 shadow-lg relative">
      {/* Kondisi untuk memunculkan ikon default jika gambar gagal dimuat */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="User Profile"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = ""; // Set gambar kosong jika gagal
          }}
          className="w-24 h-24 rounded-full border border-gray-300 mb-4"
          crossOrigin="anonymous" // Menambahkan crossOrigin untuk gambar dari sumber eksternal
        />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700 mb-4">
          <FiUser className="text-white text-5xl" />
        </div>
      )}
      <div className="text-center text-black">
        <h2 className="text-xl text-[#F8567B] font-bold mb-2 flex items-center justify-center">
          {userData.name || "Anonymous User"} {/* Default jika name kosong */}
          <FiEdit3
            className="ml-2 text-white cursor-pointer hover:text-black"
            onClick={toggleEditMode}
          />
        </h2>
        <p className="text-[#FB98AD] mb-2">{userData.email || "No Email Available"}</p> {/* Default jika email kosong */}
      </div>

      {/* Tampilkan form edit jika isEditing bernilai true */}
      {isEditing && (
        <EditProfileForm
          formData={formData}
          onChange={handleInputChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProfileCard;
