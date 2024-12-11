import React, { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import fotokucing from "../assets/kucing.png";
import NavbarBottom from "../components/NavbarBottom";
import axios from "axios";

const PetProfile = () => {
  const user = useAuthUser(); // Mengambil data pengguna
  const navigate = useNavigate();
  const [pets, setPets] = useState([]); // State untuk pets
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Ambil data pet saat komponen dimuat
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/owner/${user.displayName}`);
        console.log("Pets data:", response.data); // Debugging, cek data yang diterima
        setPets(response.data.pets); // Mengupdate state pets
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Failed to fetch pets.");
        setLoading(false);
      }
    };

    if (user) {
      fetchPets();
    }
  }, [user]); // Bergantung pada user, jika user berubah, ambil data baru

  // Fungsi untuk handle klik pet card
  const handleCardClick = (petId) => {
    navigate(`/detailpetprofile/${petId}`);
  };

  // Loading atau tidak ada pets
  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-20 flex flex-col items-center relative">
      {/* Header */}
      <div className="flex justify-end w-full items-center">
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
            onClick={() => navigate("/userProfile")}
          />
        )}
      </div>

      {/* Title */}
      <div className="flex justify-between items-center mt-6 w-full">
        <h1 className="text-2xl font-bold">Your Pets</h1>
        <button
          onClick={() => navigate("/addPet")}
          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
        >
          Add +
        </button>
      </div>

      {/* Tampilkan loading atau pets */}
      {loading ? (
        <p className="mt-6 text-white">Loading pets...</p>
      ) : error ? (
        <p className="mt-6 text-white">{error}</p>
      ) : pets.length > 0 ? (
        pets.map((pet) => (
          <div
            key={pet.petId}
            onClick={() => handleCardClick(pet.petId)} // Pass pet ID saat klik
            className="mt-6 w-full max-w-md flex items-center bg-black rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={fotokucing}
              alt="Pet"
              className="w-1/3 object-cover"
            />
            <div className="p-4 flex-grow text-white">
              <h2 className="text-lg font-bold">{pet.name}</h2>
              <p>Species: {pet.species}</p>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age} years old</p>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-6 text-white">No pets found. Add a new pet!</p>
      )}
  <NavbarBottom />
    </div>
  );
};

export default PetProfile;
