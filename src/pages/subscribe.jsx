import React, { useEffect } from 'react';
import { useAuthUser, useLogout } from "../hooks/authHooks";
// import BurgerMenu from '../components/burgerMenu';
import axios from 'axios';
import NavbarBottom from "../components/NavbarBottom";

const Subscribe = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout

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
    console.log("");
    console.log("name " + user.displayName);
    console.log("name " + user.email);
    try {
      const response = await axios.post(`http://localhost:5000/api/subscriptions/create`, {
        first_name: user.displayName,
        email: user.email,
      });
      const { token } = response.data;
      console.log("Token:", token);
  
      // Redirect ke Midtrans Snap
      window.snap.pay(token, {
        onSuccess: async function (result) {
          console.log(result);
  
          alert("Payment Success!")
          
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
      console.error("Error creating transaction:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="flex justify-between w-full items-center mb-6">
        {/* <BurgerMenu user={user} logout={logout} /> */}
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full absolute right-4 top-4 cursor-pointer"
          />
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md w-screen max-w-md p-6 text-center">
        <h1 className="text-xl font-semibold mb-4">PetGuardian Plus</h1>
        <p className="text-3xl font-bold text-gray-800 mb-2">Rp. 35.000 / bulan</p>
        <p className="text-gray-600 mb-6">Lifetime</p>
        <ul className="text-left text-gray-700 mb-6">
          <li className="flex items-center mb-2">
            <span className="text-green-500 mr-2">✔</span> Unlock premium features
          </li>
          <li className="flex items-center mb-2">
            <span className="text-green-500 mr-2">✔</span> Priority support
          </li>
        </ul>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-black font-semibold py-2 px-4 rounded-lg"
          onClick={handleOrderNow}
        >
          ORDER NOW
        </button>
      </div>
      <NavbarBottom />
    </div>
  );
};

export default Subscribe;