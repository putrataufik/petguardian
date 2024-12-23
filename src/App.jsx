import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import AiDetection from "./pages/aiDetection";
import Schedule from "./pages/schedule";
import PetProfile from "./pages/petProfile";
import UserProfile from "./pages/userProfile";
import DetailPetProfile from "./pages/detailPetprofile";
import Subscribe from "./pages/subscribe";
import AddPet from "./pages/addPet";
import AddSchedule from "./pages/addschedule";
import NavbarBottom from "./components/NavbarBottom"; // Import NavbarBottom
import React from "react";

// Layout untuk halaman dengan NavbarBottom
function MainLayout({ children }) {
  return (
    <>
      {children}
      <NavbarBottom />
    </>
  );
}

// Layout untuk halaman tanpa NavbarBottom
function AuthLayout({ children }) {
  return <>{children}</>;
}


function App() {
  return (
    <Routes>
      {/* Halaman tanpa NavbarBottom */}
      <Route path="/" element={<AuthLayout><SignIn /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
      <Route path="/detailpetprofile/:petId" element={<AuthLayout><DetailPetProfile /></AuthLayout>} />

      {/* Halaman dengan NavbarBottom */}
      <Route path="/aidetection" element={<MainLayout><AiDetection /></MainLayout>} />
      <Route path="/schedule" element={<MainLayout><Schedule /></MainLayout>} />
      <Route path="/petprofile" element={<MainLayout><PetProfile /></MainLayout>} />
      <Route path="/userProfile" element={<MainLayout><UserProfile /></MainLayout>} />
      <Route path="/subscribe" element={<MainLayout><Subscribe /></MainLayout>} />
      <Route path="/addPet" element={<MainLayout><AddPet /></MainLayout>} />
<Route path="/addSchedule" element={<MainLayout><AddSchedule /></MainLayout>} />
                                          
    </Routes>
  );
}

export default App;
