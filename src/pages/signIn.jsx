import { useState } from "react";
import { auth, googleProvider } from "../api/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import googlelogo from "../assets/google.png";
import { Input} from "@material-tailwind/react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: token }),
      });

      const data = await response.json();
      if (data.message === "Login successful!") {
        navigate("/aidetection");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: token }),
        }
      );

      const data = await response.json();
      if (data.message === "Login successful!") {
        navigate("/aidetection");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
    >
      <h1 className="text-3xl font-bold text-center mb-20">PetGuardian</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <p className="text-[#F8567B] text-sm text-start font-bold mb-4">
          Login to your Account
        </p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleEmailSignIn}
          className="w-full bg-rose-500 text-white py-2 rounded-lg bg-[#F8567B] transition duration-300"
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
