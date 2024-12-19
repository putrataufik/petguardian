import React, { useEffect } from "react";
import { useAuthUser } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import fotokucing from "../assets/kucing.png";
import NavbarBottom from "../components/NavbarBottom";
import usePetStore from "../hooks/petStore"; // Import store Zustand

const PetProfile = () => {
  const user = useAuthUser(); // Mengambil data pengguna
  const navigate = useNavigate();
  const { pets, loading, error, fetchPets } = usePetStore(); // Gunakan store Zustand

  // Fetch pets saat komponen dimuat, hanya jika belum ada pets
  useEffect(() => {
    if (user?.uid && pets.length === 0) {
      fetchPets(user.uid);
    }
  }, [user?.uid, pets.length, fetchPets]);

  // Fungsi untuk handle klik pet card
  const handleCardClick = (petId) => {
    navigate(`/detailpetprofile/${petId}`); // Navigasi ke detail pet
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-24 flex flex-col items-center relative">
      <div className="flex justify-center items-center mt-6 w-full">
        <h1 className="text-2xl font-bold">Your Pets</h1>
      </div>

      {/* Loading atau Tampilkan pets */}
      {loading && pets.length === 0 ? ( // Hanya tampilkan loading jika `pets` kosong
        <p className="mt-6 text-gray-500">Loading pets...</p>
      ) : error ? (
        <p className="mt-6 text-red-600">{error}</p>
      ) : pets.length > 0 ? (
        pets.map((pet) => (
          <div
            key={pet.petId}
            onClick={() => handleCardClick(pet.petId)}
            className="mt-6 w-full max-w-md flex items-center bg-white rounded-lg overflow-hidden cursor-pointer shadow-md"
          >
            <img src={fotokucing} alt="Pet" className="w-1/3 object-cover" />
            <div className="p-4 flex-grow text-black">
              <h2 className="text-lg font-bold">{pet.name}</h2>
              <p className="text-gray-600">{pet.breed}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-6 text-gray-500">No pets found. Add a new pet!</p>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/addPet")}
        className="fixed bottom-20 right-4 bg-pink-500 text-white font-semibold py-3 px-4 rounded-full shadow-md hover:bg-pink-600 hover:shadow-lg transition duration-300"
      >
        Add +
      </button>

      <NavbarBottom />
    </div>
  );
};

export default PetProfile;
