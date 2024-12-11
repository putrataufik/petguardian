import { useState } from "react";
import { auth, googleProvider } from "../api/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import googlelogo from "../assets/google.png";
import fblogo from "../assets/fb.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async () => {
    try {
      // Login with email and password using Firebase Auth SDK
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get Firebase ID Token
      const token = await userCredential.user.getIdToken();

      // Send ID token to backend for verification
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Ensure the body is sent as JSON
        },
        body: JSON.stringify({ idToken: token }), // Send token to backend
      });

      const data = await response.json();
      console.log(data);

      if (data.message === "Login successful!") {
        navigate("/"); // Redirect to home page
      } else {
        setError(data.error); // Show error from backend
      }
    } catch (err) {
      setError(err.message); // Show error from Firebase Auth
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken(); // Dapatkan ID Token dari Firebase
  
      // Kirim ID Token ke backend
      const response = await fetch("http://localhost:5000/api/auth/login/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: token }),
      });
  
      const data = await response.json();
      if (data.message === "Login successful!") {
        console.log("Login berhasil:", data);
        navigate("/"); // Redirect ke halaman utama
      } else {
        setError(data.error); // Tampilkan error dari backend
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F3F4] relative">
      {/* Back Icon */}
      <button
        className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 flex items-center"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-3xl font-bold text-center mb-20">PetGuardian</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <p className="text-gray-600 text-sm text-start font-bold">Login to your Account</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 border rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
        />

        <button
          onClick={handleEmailSignIn}
          className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
        >
          Sign In
        </button>

        <div className="flex items-center justify-center my-4">
          <span className="w-1/4 border-t"></span>
          <span className="mx-2 text-gray-400">- Or Sign In With -</span>
          <span className="w-1/4 border-t"></span>
        </div>

        <div className="flex space-x-5 items-center justify-center w-full py-2">
          <img
            src={googlelogo}
            alt="Google Icon"
            className="w-8 h-8"
            onClick={handleGoogleSignIn}
          />
          <img src={fblogo} alt="fb icon" className="w-8 h-8" />
        </div>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
