
import React, { useState, useEffect } from 'react';

function Countdown() {
  const releaseDate = new Date('2026-02-20T00:00:00'); // Tanggal rilis
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = releaseDate - now;

    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    const timer = setInterval(() => calculateTimeLeft(), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="text-center text-black">
        <h1 className="text-6xl font-bold text-pink-100 mb-6 animate__animated animate__fadeIn">
          Coming Soon!
        </h1>

        {/* Countdown */}
        <div className="text-2xl font-semibold text-gray-800">
          <div className="flex justify-center gap-8 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Hari</div>
              <div className="text-2xl font-bold">{timeLeft.days}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Jam</div>
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Menit</div>
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Detik</div>
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
            </div>
          </div>
        </div>

        {/* Tombol Stay Tuned */}
        <div className="mt-6">
          <button className="bg-pink-100 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition duration-300">
            Stay Tuned
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import usePetStore from "../hooks/petStore";
import { useAuthUser } from "../hooks/authHooks";

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
        // Menampilkan data yang akan dikirim
        console.log("Data yang akan dikirim:");
        console.log("Species (Jenis Hewan):", selectedSpecies);
        console.log("Breed (Jenis Ras):", selectedBreed);
        console.log("Selected Grooming (Opsi Grooming):", selectedGrooming);
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
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Pilih Hewan dan Opsi Grooming
            </h1>

            <div className="mb-4">
                <label
                    htmlFor="petSelect"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Nama Hewan
                </label>
                <select
                    id="petSelect"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedPetId}
                    onChange={(e) => setSelectedPetId(e.target.value)}
                >
                    <option value="">-- Pilih Hewan --</option>
                    {pets.map((pet) => (
                        <option key={pet.petId} value={pet.petId}>
                            {pet.name} ({pet.species})
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="groomingSelect"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Opsi Grooming
                </label>
                <select
                    id="groomingSelect"
                    className={`block w-full p-2 border ${groomingOptions.length === 0
                            ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                            : "border-gray-300 bg-white"
                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    disabled={groomingOptions.length === 0}
                    value={selectedGrooming}
                    onChange={(e) => setSelectedGrooming(e.target.value)}
                >
                    <option value="">
                        {groomingOptions.length === 0
                            ? "-- Pilih hewan terlebih dahulu --"
                            : "-- Pilih Opsi Grooming --"}
                    </option>
                    {groomingOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={!selectedPetId || !selectedGrooming || isSubmitting}
                    className={`px-6 py-2 text-white font-bold rounded-md shadow-md ${!selectedPetId || !selectedGrooming || isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                        }`}
                >
                    {isSubmitting ? "Mengirim..." : "Kirim Data"}
                </button>
            </div>

            {generatedText && (
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <h2 className="text-lg font-semibold text-gray-700">Hasil Grooming:</h2>
                    <p className="text-gray-700 mt-2">{generatedText}</p>
                </div>
            )}
        </div>
    );
};

export default Grooming;
