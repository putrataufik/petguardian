import React, { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPicture, setNewPicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const user = useAuthUser();
  const navigate = useNavigate();

  // Fetch data dari API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/getuserbyuid/ub6fMHWtuuYN8rIuVdJE2zR6AvN2"
        );
        const data = await response.json();

        if (response.ok) {
          setUserData(data.user);
          setNewName(data.user.name);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
      }
    };

    fetchUser();
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPicture(file);
  };

  // Simpan perubahan nama dan gambar
  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", newName);
    if (newPicture) {
      formData.append("picture", newPicture);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/updateuser/ub6fMHWtuuYN8rIuVdJE2zR6AvN2",
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setUserData({ ...userData, name: newName, picture: result.picture });
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      alert("An error occurred while updating the profile.");
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="relative w-full flex justify-center items-center py-4 bg-white shadow-md">
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full absolute right-4 top-4 cursor-pointer"
            onClick={() => navigate("/userProfile")}
          />
        )}
      </div>

      {/* Konten Utama */}
      {userData && (
        <div className="flex items-center justify-center flex-1">
          <div className="bg-white shadow-md rounded-lg p-6 w-80">
            <div className="flex justify-center mb-4">
              <label htmlFor="fileInput" className="cursor-pointer">
                <img
                  src={
                    newPicture
                      ? URL.createObjectURL(newPicture)
                      : userData.picture
                  }
                  alt="User"
                  className="rounded-full w-24 h-24"
                />
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-gray-300 rounded w-full px-3 py-2 mb-2"
              />
            ) : (
              <h2 className="text-xl font-semibold text-center mt-4">
                {userData.name}
              </h2>
            )}

            <p className="text-gray-500 text-center mt-2">{userData.email}</p>
            <p className="text-gray-400 text-center mt-2">
              Member since:{" "}
              {new Date(userData.createdAt._seconds * 1000).toLocaleDateString()}
            </p>

            {/* Edit & Save Buttons */}
            <div className="flex justify-center mt-4">
              {isEditing ? (
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
              )}
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navbar Bottom */}
      <NavbarBottom />
    </div>
  );
};

export default UserProfile;
