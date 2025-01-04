import React, { useEffect } from "react";
import { useAuthUser } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import fotokucing from "../assets/kucing.png";
import usePetStore from "../hooks/petStore"; // Import store Zustand
import { FaRegTrashAlt } from "react-icons/fa";

const PetProfile = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const { pets, loading, error, fetchPets } = usePetStore(); // Ambil data pets dari store Zustand

  // Fetch pets saat komponen dimuat
  useEffect(() => {
    if (user?.uid && pets.length === 0) {
      fetchPets(user.uid); // Fetch pets hanya jika belum ada data
    }
  }, [user?.uid, pets.length, fetchPets]);

  // Fungsi untuk menghapus pet
  const handleDeletePet = async (petId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pets/deletePet/${petId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }

      // Filter pet yang dihapus dari local state
      fetchPets(user.uid); // Refresh pet data setelah penghapusan berhasil
    } catch (error) {
      console.error("Error deleting pet:", error);
      alert("Failed to delete pet. Please try again.");
    }
  };

  // Fungsi untuk menavigasi ke detail pet profile
  const handlePetClick = (petId) => {
    navigate(`/detailPetProfile/${petId}`); // Menavigasi ke halaman detail dengan petId
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-24 flex flex-col items-center relative">
      <div className="flex justify-center items-center mt-6 w-full">
        <h1 className="text-2xl font-bold">Your Pets</h1>
      </div>

      {loading && pets.length === 0 ? (
        <p className="mt-6 text-gray-500">Loading pets...</p>
      ) : error ? (
        <p className="mt-6 text-red-600">{error}</p>
      ) : pets.length > 0 ? (
        pets.map((pet) => (
          <div
            key={pet.petId}
            className="mt-6 w-full max-w-md flex items-center bg-[#1D1D1D] rounded-r-lg overflow-hidden cursor-pointer"
            onClick={() => handlePetClick(pet.petId)} // Add click event to navigate to pet detail
          >
            <img src={fotokucing} alt="Pet" className="w-1/3 object-cover" />
            <div className="p-4 flex-grow text-white">
              <h2 className="text-lg font-bold text-white">{pet.name || "Unnamed Pet"}</h2>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the onClick event for navigation
                handleDeletePet(pet.petId);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
            >
               <FaRegTrashAlt />
            </button>
          </div>
        ))
      ) : (
        <p className="mt-6 text-gray-500">No pets found. Add a new pet!</p>
      )}

      <button
        onClick={() => navigate("/addPet")}
        className="fixed bottom-20 right-4 bg-pink-500 text-white font-semibold py-3 px-4 rounded-full shadow-md hover:bg-pink-600 hover:shadow-lg transition duration-300"
      >
        Add +
      </button>
    </div>
  );
};

export default PetProfile;
