import React, { useEffect, useState } from "react";
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { getUserByUID, updateUserByUID, getSubscriptionStatusByUID } from "../api/userApi";
import ProfileCard from "../components/profileCard";
import EditProfileForm from "../components/editProfileForm";
import { Button, Card, Typography } from "@material-tailwind/react";
import crownIcon from "../assets/king.png";
import axios from "axios";

const UserProfile = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const user = useAuthUser();
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
        console.log("User Data:", data);
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
  // Muat script Snap secara dinamis
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-3CAhyKw4uF9Nfb43");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Bersihkan script saat komponen di-unmount
    };
  }, []);

  const handleOrderNow = async () => {
    console.log("name " + user.displayName);
    console.log("email " + user.email);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/subscriptions/create`,
        {
          first_name: user.displayName,
          email: user.email,
          user_id: user.uid,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const { token } = response.data;
      
      console.log("Token:", token);

      // Redirect ke Midtrans Snap
      window.snap.pay(token, {
        onSuccess: async function (result) {
          console.log(result);

          alert("Payment Success!");
        },
        onPending: function (result) {
          alert("Payment Pending!");
          console.log(result);
        },
        onError: function (result) {
          alert("Payment Error!");
          console.log(result);
        },
        onClose: function () {
          alert("Payment closed!");
        },
      });
    } catch (error) {
      console.error(
        "Error creating transaction:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) return
  <div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
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
            <Card className="p-6 bg-[#eeeeee] rounded-3xl mx-4">
              <div className="flex gap-6 items-center">
                <div>
                  <img src={crownIcon} alt="" className="w-12 mb-2" />
                </div>

                <div>

                  <Typography className="text-[#000000] text-lg font-bold">
                    Akun Premium
                  </Typography>
                  <Typography className="text-black mt-2">
                    <strong>Expiry Date:</strong>{" "}
                    {new Date(subscriptionStatus.expiryDate).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-pink-50 rounded-3xl mx-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="text-pink-700 text-4xl">👑</div>
                <Typography className="text-pink-600 text-2xl font-extrabold">
                  Upgrade to PetGuardian Plus
                </Typography>
              </div>
              <div className="flex flex-col justify-center items-center gap-4 mt-4">
                <Typography className="text-gray-800 text-center text-lg font-medium">
                  Enjoy exclusive benefits:
                </Typography>
                <ul className="text-gray-800 text-lg list-disc list-inside">
                  <li>Increase token usage up to <b>600/day</b></li>
                  <li>Unlock Grooming features</li>
                </ul>
                <Typography className="text-pink-600 font-bold text-xl mt-2">
                  Only Rp. 35.000/month
                </Typography>
              </div>
              <Button
                color="pink"
                variant="filled"
                className="mt-6 px-6 py-3 text-white font-bold rounded-full shadow-lg hover:bg-pink-700"
                onClick={handleOrderNow}
              >
                Upgrade Now
              </Button>
            </Card>

          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
