import { useState } from "react";
import { auth, googleProvider } from "../api/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
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
    {/* Icon Back */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>

  {/* Title */}
  <h1 className="text-3xl font-semibold text-center mb-4">PetGuardian</h1>

  {/* Subtitle */}
  <p className="text-gray-600 text-center mb-6">Login to your Account</p>

  <div className="bg-[#000000] p-8 rounded-lg w-96">
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

    {/* Input Email */}
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="block w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
    />

    {/* Input Password */}
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="block w-full p-3 border rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
    />

    {/* Sign In Button */}
    <button
      onClick={handleEmailSignIn}
      className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition duration-300"
    >
      Sign In
    </button>

    {/* Divider */}
    <div className="flex items-center justify-center my-6">
      <span className="w-1/4 border-t"></span>
      <span className="mx-2 text-gray-400">- Or Sign In With -</span>
      <span className="w-1/4 border-t"></span>
    </div>

    {/* Google Sign In */}
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
    >
      Google
    </button>

    {/* Sign Up Link */}
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
