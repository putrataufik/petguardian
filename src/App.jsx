import {Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn";
import AiDetection from "./pages/aiDetection";
import Schedule from "./pages/schedule";
import SignUp from "./pages/signUp";
import PetProfile from "./pages/petProfile";
import UserProfile from "./pages/userProfile";
import DetailPetProfile from "./pages/detailPetprofile";
import Subscribe from "./pages/subscribe";
import AddPet from "./pages/addPet";

function App() {
  return (
    // Baca README.md untuk memudahkan pekerjaan
    <Routes>
    <Route path="/aidetection" element={<AiDetection />} />
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/schedule" element={<Schedule />} />
    <Route path="/petprofile" element={<PetProfile />} /> 
    <Route path="/userProfile" element={<UserProfile />} /> 
    <Route path="/detailpetprofile/:petId" element={<DetailPetProfile />} />
    <Route path="/subscribe" element={<Subscribe />}/>
    <Route path="/addPet" element={<AddPet />} />
  </Routes>
  );
}

export default App;
