import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks";
import usePetStore from "../hooks/petStore"; // Store Zustand
import axios from "axios";
import { Input, Button } from "@material-tailwind/react";
import uploadImage from "../assets/uploadImagge.png";
import arrowLeft from "../assets/arrowLeft.png";

const AddPet = () => {
    const user = useAuthUser();
    const { fetchPets } = usePetStore(); // Ambil fungsi fetch pets
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [species, setSpecies] = useState("Tidak diketahui");
    const [breed, setBreed] = useState("Tidak diketahui");
    const [careInstructions, setCareInstructions] = useState("Informasi cara merawat tidak tersedia.");
    const [feedingInstructions, setFeedingInstructions] = useState("Informasi cara memberi makan tidak tersedia.");
    const [groomingOptions, setGroomingOptions] = useState(["Model grooming tidak tersedia."]);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };


    const handleDeleteFile = () => {
        setSelectedFile(null); // Reset selectedFile ke null
    };

    const parseBreedResponse = (response) => {
        // Match patterns from responseText
        const hewanMatch = response.match(/Hewan:\s*(.+)/);
        const rasMatch = response.match(/Jenis ras:\s*(.+)/);
        const caraMerawatMatch = response.match(/Cara merawatnya:\s*([\s\S]+?)\n\nCara memberi makan:/);
        const caraMemberiMakanMatch = response.match(/Cara memberi makan:\s*([\s\S]+?)\n\nModel Grooming:/);
        const jenisGroomingMatch = response.match(/Model Grooming:\s*([\s\S]*)/);

        // Function to clean and trim text
        const cleanText = (text) => text.replace(/[\*\d\.]/g, "").trim();


        // Parse and clean each section
        const species = hewanMatch ? cleanText(hewanMatch[1]) : "Tidak diketahui";
        const breed = rasMatch ? cleanText(rasMatch[1]) : "Tidak diketahui";
        const careInstructions = caraMerawatMatch ? caraMerawatMatch[1] : "Informasi cara merawat tidak tersedia.";
        const feedingInstructions = caraMemberiMakanMatch ? caraMemberiMakanMatch[1] : "Informasi cara memberi makan tidak tersedia.";
        const groomingOptions = jenisGroomingMatch
            ? jenisGroomingMatch[1]
                .split("\n")
                .map((item) => cleanText(item))
                .filter(Boolean)
            : ["Model grooming tidak tersedia."];
        return {
            species,
            breed,
            careInstructions,
            feedingInstructions,
            groomingOptions
        };
    };


    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please upload a photo!");
            return;
        }

        // Validasi ukuran file (maks 5MB)
        const MAX_FILE_SIZE_MB = 5;
        if (selectedFile.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
            alert("File terlalu besar! Harap unggah file dengan ukuran maksimal 5MB.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            setIsLoading(true); // Set tombol dalam mode loading
            const response = await fetch("http://localhost:5000/api/gemini/detect-animal-breed", {
                method: "POST",
                body: formData,
            });


            if (!response.ok) {
                throw new Error(`Gagal mendeteksi breed: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Respons penuh:", data.response);

            if (!data || !data.response) {
                throw new Error("Respons API tidak valid atau kosong.");
            }

            const {
                species,
                breed,
                careInstructions,
                feedingInstructions,
                groomingOptions
            } = parseBreedResponse(data.response);

            // Set nilai ke state atau variabel dengan fallback jika data tidak ditemukan
            setSpecies(species || "Tidak diketahui");
            setBreed(breed || "Tidak diketahui");
            setCareInstructions(careInstructions || "Informasi cara merawat tidak tersedia.");
            setFeedingInstructions(feedingInstructions || "Informasi cara memberi makan tidak tersedia.");
            setGroomingOptions(groomingOptions.length > 0 ? groomingOptions : ["Model grooming tidak tersedia."]);

            handleNext(); // Lanjut ke langkah konfirmasi
        } catch (error) {
            console.error("Error detecting breed:", error);
            alert("Terjadi kesalahan saat mendeteksi breed. Silakan coba lagi.");
        } finally {
            setIsLoading(false); // Hentikan mode loading
        }
    };


    const handleSave = async () => {
        if (!name || !species || !breed || !age) {
          alert("Harap lengkapi semua data sebelum menyimpan!");
          return;
        }
      
        if (!selectedFile) {
          alert("Harap unggah gambar sebelum menyimpan!");
          return;
        }
      
        const petData = new FormData();
        petData.append("uid", user?.uid);
        petData.append("name", name);
        petData.append("species", species);
        petData.append("breed", breed);
        petData.append("age", parseInt(age, 10));
        petData.append("careInstructions", careInstructions);
        petData.append("feedingInstructions", feedingInstructions);
        petData.append("groomingOptions", groomingOptions);
        petData.append("image", selectedFile);
      
        try {
          const response = await axios.post("http://localhost:5000/api/pets/add", petData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      
          if (response.status === 201 || response.status === 200) {
            console.log("Data hewan berhasil ditambahkan:", response.data);
      
            fetchPets(user?.uid); // Fetch ulang data hewan
            navigate("/petProfile"); // Arahkan ke halaman profil hewan
          } else {
            throw new Error("Gagal menyimpan data hewan.");
          }
        } catch (error) {
          console.error("Error saving pet:", error);
          alert("Terjadi kesalahan saat menyimpan data hewan. Silakan coba lagi.");
        }
      };
      


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex max-w-md mx-auto bg-[#f1f1f1] p-6 rounded-lg shadow-lg items-center justify-center" style={{
                minWidth: "350px", // Lebar minimum card
                maxWidth: "350px", // Lebar maksimum card
                minHeight: "300px", // Tinggi minimum cards
                maxHeight: "600px", // Tinggi maksimum card
                overflow: "hidden", // Mencegah konten keluar dari card
            }} >
                {step === 1 && (
                    <div>
                        <button
                            onClick={() => navigate(-1)} // Navigasi ke halaman sebelumnya
                            className="absolute top-6 left-6 flex items-center mb-20"
                        >
                            <img
                                src={arrowLeft}
                                alt="Back"
                                className="w-10 h-10 mr-2"
                            />
                        </button>
                        <h1 className="text-xl font-bold mb-6">What’s Your Pet Name ?</h1>
                        <div className="mb-6">

                            <Input
                                label="Pet Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mb-6"
                                color="pink"
                            />
                        </div>
                        <Button
                            onClick={handleNext}
                            disabled={!name}
                            className="w-full bg-[#F8567B] text-white py-2 rounded-lg"
                        >
                            Next
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h1 className="text-xl font-bold mb-6">What’s Your Pet Age ?</h1>
                        <div className="mb-6">

                            <Input
                                label="Pet Age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="mb-6"
                                color="pink"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button
                                onClick={handlePrev}
                                className="bg-black text-[#F8567B] py-2 px-4 rounded-lg"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={!age}
                                className="bg-[#F8567B] text-white py-2 px-4 rounded-lg"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h1 className="text-xl font-bold mb-6">Detect Your Pet Breed With AI</h1>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center w-full relative">
                            {selectedFile ? (
                                // Menampilkan pratinjau gambar jika ada file yang dipilih
                                <div className="w-full flex flex-col items-center">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        className="w-full h-auto rounded-lg mb-4"
                                    />
                                    <button
                                        onClick={handleDeleteFile}
                                        className="mt-2 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                // Menampilkan input file jika belum ada file yang dipilih
                                <>
                                    <img src={uploadImage} alt="Upload" className="w-10 h-10 mb-4" />
                                    <p className="text-gray-600">Drop Your .png or .jpg file here!</p>
                                    <p className="text-gray-400 text-sm mt-1">Max 5mb each.</p>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleFileChange}
                                        className="absolute w-full h-full opacity-0 cursor-pointer"
                                    />
                                </>
                            )}
                        </div>
                        <div className="flex justify-between mt-6">
                            <Button
                                onClick={handlePrev}
                                className="bg-black text-[#F8567B] py-2 px-4 rounded-lg"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleFileUpload}
                                className={`py-2 px-4 rounded-lg ${isLoading
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-[#F8567B] text-white"
                                    }`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Detect Breed"}
                            </Button>

                        </div>
                    </div>


                )}

                {step === 4 && (
                    <div className="">
                        <h1 className="text-xl font-bold mb-4 text-center text-gray-800">
                            Confirm Your Pet's Details
                        </h1>
                        <div className="mb-4">
                            <Input
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                                color="pink"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full"
                                color="pink"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Species"
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                className="w-full"
                                color="pink"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label="Breed"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                                className="w-full"
                                color="pink"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button
                                onClick={handlePrev}
                                className="bg-black text-[#F8567B] py-2 px-6 rounded-lg hover:bg-gray-600"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-[#F8567B] text-white py-2 px-6 rounded-lg hover:bg-[#83263b]"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AddPet;