import React, { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/authHooks";
import { useParams } from "react-router-dom";
import axios from "axios";
import fotokucing from "../assets/kucing.png"; // Ganti dengan path gambar yang sesuai

const DetailPetProfile = () => {
  const user = useAuthUser(); // Mengambil data pengguna
  const { petId } = useParams(); // Menangkap petId dari URL
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!user || !petId) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/pets/owner/${user.uid}`
        );
        const foundPet = response.data.pets.find((p) => p.petId === petId);
        setPet(foundPet); // Menyimpan pet yang sesuai dengan petId
      } catch (error) {
        console.error("Error fetching pet details:", error);
        setError("Failed to fetch pet details.");
      }
    };

    fetchPetDetails();
  }, [user, petId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!pet) {
    return <p></p>;
  }

  return (
    <div className="min-h-screen pb-20 flex flex-col items-center relative">
      {/* Tombol Kembali */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 text-2xl text-gray-500 hover:text-gray-700 z-30"
      >
        &#x2190; {/* Icon kembali */}
      </button>

      {/* Gambar */}
      <div className="w-full h-[500px] sm:h-[600px] lg:h-[700px] relative">
  <img
    src={fotokucing}
    alt="Pet"
    className="w-full h-full object-cover absolute top-0 left-0"
  />
</div>
      {/* Card Below Image */}
      <div className="bg-white rounded-t-[50px] shadow-lg p-8 relative -top-20 max-w-4xl w-full mx-auto">
        <div className="text-center mt-4 ml-8">
          <h1 className="text-3xl font-semibold">{pet.name}</h1>
          <p className="text-gray-500">{pet.species}</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-sm text-gray-500">Age</h2>
            <p className="font-medium">{pet.age} years</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-500">Breed</h2>
            <p className="font-medium">{pet.breed}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-500">Species</h2>
            <p className="font-medium">{pet.species}</p>
          </div>
        </div>

        {/* Pet description */}
        <div className="mt-8 space-y-4">
          <div>
            <h3 className="text-sm text-gray-500">Pet Description</h3>
            <p className="border-b border-gray-200 pb-2">{pet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPetProfile;
