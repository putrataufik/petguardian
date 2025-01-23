import React, { useEffect, useState } from "react";
import { useAuthUser } from "../hooks/authHooks";
import { useParams } from "react-router-dom";
import usePetStore from "../hooks/petStore";
import axios from "axios";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import arrowLeft from "../assets/arrowLeft.png";
const DetailPetProfile = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const user = useAuthUser(); 
  const { petId } = useParams(); 
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState({}); //Form Data nanti pas mau bikin handle SAVE
  const [error, setError] = useState(null);
  const [openRight, setOpenRight] = useState(false);
  const {fetchPets } = usePetStore();
  console.log("form Data : ", formData)

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!user || !petId) {
        return;
      }

      try {
        console.log(user.uid);
        console.log(petId);
        const response = await axios.get(
          `${API_BASE_URL}/pets/owner/${user.uid}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        const foundPet = response.data.pets.find((p) => p.petId === petId);
        if (foundPet) {
          console.log("Pet found:", foundPet);
          setPet(foundPet); // Menyimpan pet yang sesuai dengan petId
          setFormData(foundPet); //
        }else{
          setError("Pet not found.");
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
        setError("Failed to fetch pet details.");
      }
    };

    fetchPetDetails();
  }, [user, petId]);

  // dikasi aktif pas bikin inputan
  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }

   const handleSave = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/pets/updatePet/${petId}`,
        formData,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log("Pet updated:", response.data);
      setPet((prev) => ({ ...prev, ...formData }));
      fetchPets(user.uid);
      setOpenRight(false);
    } catch (error) {
      console.error("Error updating pet:", error);
      setError("Failed to update pet.");
    }
  };

  if (error) {
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  }

  if (!pet) {
    return <p className="text-center text-gray-100 mt-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white relative">
      {/* Tombol Kembali */}

      {/* Card Informasi */}
      <div className="bg-white rounded-t-3xl relative max-w-3xl w-full mx-auto">
        <div className="flex justify-between items-center relative">
          <button
            onClick={() => window.history.back()}
            className="absolute top-6 left-6 flex items-center mb-20 z-10 bg-white rounded-full"
            aria-label="Kembali"
          >
            <img src={arrowLeft} alt="" className="w-10 h-8 mx-2" />
          </button>
          <div className="absolute top-6 right-6 flex items-center mb-20 z-10 bg-white rounded-full">

            <IconButton
              variant="text"
              color="black"
              onClick={() => setOpenRight(true)}
            >
              <PencilIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">
          <img
            src={pet.imageUrl}
            alt="Pet"
            className="w-full h-full object-cover rounded-b-2xl shadow-md"
          />
        </div>
        <div className="p-8">

          {/* Informasi Utama */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{pet.name}</h1>
            <p className="text-sm font-bold text-gray-800">{pet.breed}</p>
          </div>

          {/* Informasi Detail */}
          <div className="flex justify-center items-center mb-8 gap-4">
            {/* Card Age */}
            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg px-4 py-6 w-full max-w-[100px]">
              <h2 className="text-sm font-bold text-gray-800">Age</h2>
              <p className="text-sm font-light text-gray-700">{pet.age} years</p>
            </div>

            {/* Card Species */}
            <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg px-4 py-6 w-full max-w-[100px]">
              <h2 className="text-sm font-bold text-gray-800">Species</h2>
              <p className="text-sm font-light text-gray-700">{pet.species}</p>
            </div>
          </div>


          {/* Deskripsi dan Instruksi */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Pet Description
              </h3>
              <p className="text-gray-600 mt-2">{pet.careInstructions}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Feeding Instructions
              </h3>
              <p className="text-gray-600 mt-2">{pet.feedingInstructions}</p>
            </div>
          </div>
        </div>
      </div>
      <Drawer
      open={openRight}
      onClose={() => setOpenRight(false)}
      placement="right"
      className="h-[80vh] p-6 overflow-y-auto"
      >
        <Typography variant="h5" className="mb-6">
          Edit Pet Proile
        </Typography>
        <div className="space-y-4">
          <Input
          label = "Name"
          name = "name"
          value = {formData.name || ""}
          onChange = {handleInputChange}
          >
          </Input>
          <Input
          label = "Breed"
          name = "breed"
          value = {formData.breed || ""}
          onChange = {handleInputChange}
          >
          </Input>
          <Input
          label = "Age"
          name = "age"
          value = {formData.age || ""}
          onChange = {handleInputChange}
          >
          </Input>
          <Input
          label = "Species"
          name = "species"
          value = {formData.species || ""}
          onChange = {handleInputChange}
          >
          </Input>
          <Textarea
          label = "Care Instructions"
          name = "careInstructions"
          value = {formData.careInstructions || ""}
          onChange = {handleInputChange}
          rows={8}
          className="mt-1 block w-full"
          >

          </Textarea>
          <Textarea
          label = "Feeding Instructions"
          name = "feedingInstructions"
          value = {formData.feedingInstructions || ""}
          onChange = {handleInputChange}
          rows={8}
          className="mt-1 block w-full"
          ></Textarea>
        </div>
        <div className="flex justify-center mt-6">
          <Button color="pink" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default DetailPetProfile;