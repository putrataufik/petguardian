import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import AiDetection from "./pages/aiDetection";
import Schedule from "./pages/schedule";
import SignUp from "./pages/signUp";
import PetProfile from "./pages/petProfile";
function App() {
  return (
    //
    <Routes>
    <Route path="/" element={<AiDetection />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/schedule" element={<Schedule />} />
    <Route path="/petprofile" element={<PetProfile />} /> 
  </Routes>
  );
}

export default App;
