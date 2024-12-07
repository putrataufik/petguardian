import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import AiDetection from "./pages/aiDetection";
import Schedule from "./pages/schedule";
import SignUp from "./pages/signUp";
import PetProfile from "./pages/petProfile";
import UserProfile from "./pages/userProfile";
import DetailPetProfile from "./pages/detailPetprofile";
import Subscribe from "./pages/subscribe";
function App() {
  return (
    // Baca README.md untuk memudahkan pekerjaan
    <Routes>
    <Route path="/" element={<AiDetection />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/schedule" element={<Schedule />} />
    <Route path="/petprofile" element={<PetProfile />} /> 
    <Route path="/userProfile" element={<UserProfile />} /> 
    <Route path="/detailpetprofile" element={<DetailPetProfile />} /> 
    <Route path="/subscribe" element={<Subscribe />}/>
  </Routes>
  );
}

export default App;
