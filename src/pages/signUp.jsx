import { useState } from "react";
import { auth } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import googlelogo from "../assets/google.png";
import fblogo from "../assets/fb.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username,
      });

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
      <p className="text-gray-600 text-start font-bold mb-4">Create your Account</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
        />

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
          className="block w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:border-blue-300"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full p-3 border rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition duration-300"
        >
          Sign Up
        </button>

        <div className="flex items-center justify-center my-4">
          <span className="w-1/4 border-t"></span>
          <span className="mx-2 text-gray-400">- Or Sign Up With -</span>
          <span className="w-1/4 border-t"></span>
        </div>

        <div className="flex space-x-5 items-center justify-center w-full py-2">
            <img src={googlelogo} alt="Google" className="w-8 h-8 " />
        

            <img src={fblogo} alt="Facebook" className="w-8 h-8" />
         
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
