import React, { useEffect, useState } from "react";
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { getUserByUID, updateUserByUID, getSubscriptionStatusByUID} from "../api/userApi";
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
    
    const fetchSubscription = async () => {
      try {
        const subscriptionStatus = await getSubscriptionStatusByUID(user.uid);
        console.log("Status Langganan:", subscriptionStatus);
        setSubscriptionStatus(subscriptionStatus);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (user) {
      fetchUserData();
      fetchSubscription();
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

  if (loading) return 
  <div role="status">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
  </div>
  ;
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
