import React, { useState, useEffect } from "react";
import NavbarBottom from "../components/NavbarBottom";
import { useAuthUser } from "../hooks/authHooks";

function UserProfile() {
  const user = useAuthUser(); // Ambil data pengguna
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    gender: "Not specified",
    aboutMe: "Tell us something about yourself.",
    contact: "Not provided",
  });

  useEffect(() => {
    if (user) {
      // Ambil data dari Firestore
      const fetchData = async () => {
        try {
          const docRef = doc(db, "users", user.uid); // "users" adalah nama koleksi
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile: ", error);
        }
      };

      fetchData();
    }
  }, [user]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditing = async () => {
    // Add your save logic here if needed
  };

  // Fungsi untuk menampilkan ikon sesuai gender
  const getGenderIcon = (gender) => {
    switch (gender) {
      case "Male":
        return "♂️";
      case "Female":
        return "♀️";
      case "Other":
        return "⚧️";
      default:
        return "❓";
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Please log in to view your profile.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        {/* Foto Profil */}
        <div className="relative w-32 h-32">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
        </div>

        {/* Nama dan Gender */}
        <div className="mt-4 w-full text-center">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                defaultValue={user.displayName || "Unknown User"}
                className="text-xl font-bold border rounded px-2 py-1 w-full mb-2"
                disabled
              />
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                className="text-gray-600 border rounded px-2 py-1 w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Not specified">Prefer not to say</option>
              </select>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">{user.displayName || "Unknown User"}</h1>
              <p className="text-gray-600 flex items-center justify-center">
                <span className="mr-2">{getGenderIcon(profile.gender)}</span>
                {profile.gender}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Tentang Saya */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">About Me</h2>
        {isEditing ? (
          <textarea
            name="aboutMe"
            value={profile.aboutMe}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 mt-2"
          />
        ) : (
          <p className="mt-2 text-gray-600">{profile.aboutMe}</p>
        )}
      </div>

      {/* Kontak */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Contact</h2>
        {isEditing ? (
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 mt-2"
          />
        ) : (
          <p className="mt-2 text-gray-600">{profile.contact}</p>
        )}
      </div>

      {/* Tombol Edit/Simpan */}
      <div className="mt-6 text-center">
        <button
          onClick={toggleEditing}
          className={`px-4 py-2 rounded ${isEditing ? "bg-rose-500 text-white" : "bg-rose-500 text-white"}`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <NavbarBottom />
    </div>
  );
}

export default UserProfile;
