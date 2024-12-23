import React, { useEffect, useState } from "react";
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { getUserByUID, updateUserByUID } from "../api/userApi";
import ProfileCard from "../components/profileCard";
import EditProfileForm from "../components/editProfileForm";
import { Button } from "@material-tailwind/react";

const UserProfile = () => {
  const user = useAuthUser();
  const logout = useLogout();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserByUID(user.uid);
        setUserData(data);
        setFormData({ name: data.name });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  const toggleEditMode = () => {
    console.log("Edit button clicked! isEditing:", isEditing);
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("Save button clicked! isEditing:", isEditing);
      await updateUserByUID(user.uid, formData); // Simpan data ke server/api
      setUserData((prev) => ({ ...prev, ...formData })); // Update state dengan data baru
      setIsEditing(false); // Tutup form setelah berhasil simpan
      alert("Data updated successfully!");
    } catch (err) {
      console.error("Error updating user data:", err);
      alert("Failed to update user data.");
    } finally {
      setIsEditing(false); // Pastikan form ditutup terlepas berhasil/gagal
    }
  };

  if (loading) return <p className="mt-6 text-black">Loading user data...</p>;
  if (error) return <p className="mt-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative">
      {userData && (
        <>
          <ProfileCard
            userData={userData}
            toggleEditMode={toggleEditMode}
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
          />
          {isEditing && (
            <EditProfileForm
            open={isEditing} // Mengontrol apakah drawer terbuka
            formData={formData}
            onChange={handleInputChange}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)} // Menutup drawer
          />
          
          )}
        </>
      )}
      <Button
        onClick={handleLogout}
        color="red"
        variant="filled"
        className="mt-6"
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
