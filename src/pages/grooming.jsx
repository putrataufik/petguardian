import React, { useState, useEffect } from "react";
import usePetStore from "../hooks/petStore";
import { useAuthUser } from "../hooks/authHooks";
import { Select, Option } from "@material-tailwind/react";
const Grooming = () => {
  const user = useAuthUser();
  const { pets, loading, error, fetchPets } = usePetStore();
  const [selectedPetId, setSelectedPetId] = useState("");
  const [groomingOptions, setGroomingOptions] = useState([]);
  const [selectedGrooming, setSelectedGrooming] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedText, setGeneratedText] = useState(""); // Menyimpan hasil dari AI
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    if (user?.uid && pets.length === 0) {
      fetchPets(user.uid);
    }
  }, [user?.uid, pets.length, fetchPets]);

  useEffect(() => {
    const selectedPet = pets.find((pet) => pet.petId === selectedPetId);
    if (selectedPet) {
      setSelectedSpecies(selectedPet.species);
      setSelectedBreed(selectedPet.breed);
      setGroomingOptions(selectedPet.groomingOptions || []);
      setSelectedGrooming(""); // Reset opsi grooming jika hewan baru dipilih
    }
  }, [selectedPetId, pets]);

  const handleSubmit = async () => {
    if (!selectedPetId || !selectedGrooming) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/generative/grooming", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          species: selectedSpecies,
          breed: selectedBreed,
          grooming: selectedGrooming,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedText(result.generatedText); // Simpan hasil dari AI
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert(`Error saat mengirim data: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-4">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center mb-4">

      <h1 className="text-2xl font-bold text-center my-6">
        Model Grooming Generator
      </h1>

      <div className="mb-6">
        <label
          htmlFor="petSelect"
          className="block text-sm font-medium text-black mb-2"
        >
          Pet Name
        </label>
        <Select
          id="petSelect"
          color="pink"
          value={selectedPetId || ""}
          onChange={(value) => setSelectedPetId(value)}
          label="select animal"
        >
          {pets.map((pet) => (
            <Option key={pet.petId || ""} value={pet.petId || ""}>
              {pet.name} ({pet.species})
            </Option>
          ))}
        </Select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="groomingSelect"
          className="block text-sm font-medium text-black mb-2"
        >
          Grooming Models
        </label>
        <Select
          id="groomingSelect"
          color="pink"
          disabled={groomingOptions.length === 0}
          value={selectedGrooming}
          onChange={(value) => setSelectedGrooming(value)}
          label={
            groomingOptions.length === 0
              ? "select animal first"
              : "Select Grooming Model"
          }
        >
          {groomingOptions.map((option, index) => (
            <Option key={index} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={!selectedPetId || !selectedGrooming || isSubmitting}
          className={`px-6 py-2 text-white font-bold rounded-md shadow-md ${!selectedPetId || !selectedGrooming || isSubmitting
            ? "bg-[#fb98ad] cursor-not-allowed"
            : "bg-pink-500 hover:bg-[#d94768] focus:ring-2 focus:ring-[#F8567B]"
            }`}
        >
          {isSubmitting ? "Mengirim..." : "Kirim Data"}
        </button>
      </div>

      {generatedText && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h2 className="text-lg font-semibold text-[#F8567B]">Hasil Grooming:</h2>
          <p className="text-black mt-2">{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Grooming;
