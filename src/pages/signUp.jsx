import { useState } from "react";
import { auth } from "../api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import googlelogo from "../assets/google.png";
import logo from "../assets/logo.jpeg";
function SignUp() {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
      // Kirim data registrasi ke backend
      const registerResponse = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
          }),
        }
      );

      const registerData = await registerResponse.json();
      console.log("Register Response:", registerResponse);
      console.log("Register Data:", registerData);
      if (registerResponse.ok) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const token = await userCredential.user.getIdToken();
        const loginResponse = await fetch(
          `${API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify({ idToken: token }),
          }
        );

        const loginData = await loginResponse.json();
        console.log(loginData);

        if (loginResponse.ok) {
          navigate("/aidetection");
        } else {
          setError(loginData.error);
        }
      } else {
        setError(registerData.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F3F4] relative px-8">

      <img src={logo} alt="" className="rounded-lg mb-5 mt-20" />
      <div className="flex items-center justify-center relative">

        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <p className="text-[#F8567B] text-start font-bold mb-4">
            Create your Account
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4"
            />

            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />

            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-6"
            />
            <button
              onClick={handleSignUp}
              className="w-full bg-rose-500 text-white py-2 rounded-lg bg-[#F8567B] transition duration-300"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center my-4">
            <span className="w-1/4 border-t"></span>
            <span className="mx-2 text-gray-400">- Or Sign Up With -</span>
            <span className="w-1/4 border-t"></span>
          </div>

          <div className="flex space-x-5 items-center justify-center w-full py-2">
            <img src={googlelogo} alt="Google" className="w-8 h-8" />
          </div>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="text-blue-500 hover:underline hover:text-blue-600"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
