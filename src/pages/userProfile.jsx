import React, { useEffect, useState } from "react";
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { getUserByUID, updateUserByUID } from "../api/userApi";
import ProfileCard from "../components/profileCard";
import EditProfileForm from "../components/editProfileForm";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const user = useAuthUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [subscriptionStatus, setSubscriptionStatus] = useState(null); // Tambahkan state ini

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserByUID(user.uid);
        setUserData(data);
        setFormData({ name: data.name });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscriptionStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/subscriptionsstatus/${user.uid}`
        );
        const data = await response.json();
        setSubscriptionStatus(data);
      } catch (err) {
        console.error("Error fetching subscription status:", err);
        setError("Failed to fetch subscription status.");
      }
    };

    if (user) {
      fetchUserData();
      fetchSubscriptionStatus();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserByUID(user.uid, formData);
      setUserData((prev) => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user data:", err);
      alert("Failed to update user data.");
    } finally {
      setIsEditing(false);
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
              open={isEditing}
              formData={formData}
              onChange={handleInputChange}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </>
      )}

      {/* Card untuk Status Langganan */}
      {subscriptionStatus && (
        <div className="mt-6 w-full max-w-md">
          {subscriptionStatus.isActive ? (
            <Card className="p-6 bg-green-100 border border-green-400 rounded-md">
              <Typography className="text-green-700 text-lg font-bold">
                Akun Premium
              </Typography>
              <Typography className="text-gray-700 mt-2">
                <strong>Subscription Date:</strong>{" "}
                {new Date(subscriptionStatus.subscriptionDate).toLocaleDateString()}
              </Typography>
              <Typography className="text-gray-700">
                <strong>Expiry Date:</strong>{" "}
                {new Date(subscriptionStatus.expiryDate).toLocaleDateString()}
              </Typography>
            </Card>
          ) : (
            <Card className="p-6 bg-black-100 border border-blue-gray-900 rounded-md">
              <div className="flex items-center gap-3">
                <div className="text-pink-700 text-3xl">👑</div>
                <Typography className="text-pink-700 text-lg font-bold">
                  Upgrade to PetGuardian Plus
                </Typography>
              </div>
              <Typography className="text-gray-700 mt-2">
                Nikmati fitur premium hanya dengan <strong>Rp. 35.000/bln</strong>
              </Typography>
              <Button
                color="pink"
                variant="filled"
                className="mt-4"
                onClick={() => navigate("/subscribe")}
              >
                Lihat Detail
              </Button>
            </Card>
          )}
        </div>
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
