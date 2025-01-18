import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import AiDetection from "./pages/aiDetection";
import Schedule from "./pages/schedule";
import DetailSchedule from "./pages/detailSchedule";
import PetProfile from "./pages/listPet";
import UserProfile from "./pages/userProfile";
import DetailPetProfile from "./pages/detailPetprofile";
import Subscribe from "./pages/subscribe";
import AddPet from "./pages/addPet";
import AddSchedule from "./pages/addschedule";
import EditSchedule from "./pages/EditSchedule";
import NavbarBottom from "./components/NavbarBottom"; // Import NavbarBottom
import ResultPage from "./pages/resultPage";
import Grooming from "./pages/grooming";
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
      <Route path="/detailSchedule/:scheduleId" element={<AuthLayout><DetailSchedule /></AuthLayout>} />
      <Route path="/addPet" element={<AuthLayout><AddPet /></AuthLayout>} />
      <Route path="/result" element={<AuthLayout><ResultPage /></AuthLayout>} />            
      <Route path="/addSchedule" element={<AuthLayout><AddSchedule /></AuthLayout>} />
      <Route path="/editschedule/:scheduleId" element={<AuthLayout><EditSchedule /></AuthLayout>} />
      <Route path="/subscribe" element={<AuthLayout><Subscribe /></AuthLayout>} />
     
      
     

      {/* Halaman dengan NavbarBottom */}
      <Route path="/grooming" element={<MainLayout><Grooming /></MainLayout>} />
      <Route path="/aidetection" element={<MainLayout><AiDetection /></MainLayout>} />
      <Route path="/schedule" element={<MainLayout><Schedule /></MainLayout>} />
      <Route path="/petprofile" element={<MainLayout><PetProfile /></MainLayout>} />
      <Route path="/userProfile" element={<MainLayout><UserProfile /></MainLayout>} />
    </Routes>
  );
}

export default App;
