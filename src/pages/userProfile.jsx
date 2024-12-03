import React, { useState } from "react";

function UserProfile() {
  const [profile, setProfile] = useState({
    photo: "https://via.placeholder.com/150",
    name: "John Doe",
    gender: "Male",
    aboutMe: "I love pets and enjoy taking care of them.",
    location: "New York",
    contact: "johndoe@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <img
            src={profile.photo}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
          <label className="absolute bottom-0 right-0 bg-rose-500 text-white p-1 rounded-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            ✎
          </label>
        </div>

        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="mt-4 text-xl font-bold border rounded px-2 py-1"
          />
        ) : (
          <h1 className="mt-4 text-xl font-bold">{profile.name}</h1>
        )}

        {isEditing ? (
          <select
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
            className="text-gray-600 border rounded px-2 py-1 mt-2"
          >
           <option value="Male">♂️ Male</option>
           <option value="Female">♀️ Female</option>
            
          </select>
        ) : (
          <p className="text-gray-600">{profile.gender}</p>
        )}
      </div>

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

        <h2 className="text-lg font-semibold text-gray-700 mt-4">Location</h2>
        {isEditing ? (
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            className="w-full border rounded px-2 py-1 mt-2"
          />
        ) : (
          <p className="mt-2 text-gray-600">{profile.location}</p>
        )}

        <h2 className="text-lg font-semibold text-gray-700 mt-4">Contact</h2>
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

      <div className="mt-6 text-center">
        <button
          onClick={toggleEditing}
          className={`px-4 py-2 rounded ${
            isEditing ? "bg-rose-500 text-white" : "bg-rose-500 text-white"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
