import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Untuk navigasi ke petProfile
import axios from "axios";
import { useAuthUser } from "../hooks/authHooks";

const AddPet = () => {
    const user = useAuthUser();
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pastikan semua input valid
        if (!name || !species || !breed || !age) {
            alert("Please fill all fields");
            return;
        }

        const petData = {
            uid: user.uid,
            name: name,
            species: species,
            breed: breed,
            age: parseInt(age),
        };

        try {
            // Kirim data pet ke API
            const response = await axios.post("http://localhost:5000/api/pets/add", petData);
            console.log("Pet added successfully:", response.data);
            navigate("/petProfile"); // Kembali ke pet profile setelah berhasil menambahkan pet
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Add a New Pet</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Pet Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Species (e.g., dog, cat)"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Breed (e.g., Labrador)"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    placeholder="Age (in years)"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Add Pet
                </button>
            </form>
        </div>
    );
};

export default AddPet;
