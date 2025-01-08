import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks"; // Sesuaikan dengan package auth yang Anda gunakan
import uploadImage from "../assets/uploadImagge.png";
import { Button } from "@material-tailwind/react";

const AiDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usageToken, setUsageToken] = useState(0); // State untuk menyimpan token
  const navigate = useNavigate();
  const user = useAuthUser(); // Mendapatkan UID pengguna
  const userId = user?.uid; // Pastikan user?.uid sudah ada sebelum digunakan

  useEffect(() => {
    if (userId) {
      // Mengambil data usageToken saat komponen pertama kali dimuat
      getUsageToken();
    }
  }, [userId]);

  const getUsageToken = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/getusagetoken/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUsageToken(data.usageToken); // Menyimpan token yang diterima
      } else {
        alert(data.message || "Failed to fetch token");
      }
    } catch (error) {
      console.error("Error fetching usage token:", error);
    }
  };

  const updateUsageToken = async (newTokenValue) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/updatedatatoken/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usageToken: newTokenValue }),
      });

      const data = await response.json();
      if (response.ok) {
        setUsageToken(newTokenValue); // Mengupdate state token
      } else {
        alert(data.message || "Failed to update token");
      }
    } catch (error) {
      console.error("Error updating usage token:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleIdentifyBreed = async () => {
    if (selectedFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch("http://localhost:5000/api/gemini/detect-animal-breed", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          navigate("/result", {
            state: { result: data.response, previewImage },
          });

          // Kurangi usageToken setelah klik "Identify"
          const updatedToken = usageToken - 20; // Mengurangi 20 token
          if (updatedToken >= 0) {
            updateUsageToken(updatedToken); // Update token jika cukup
          } else {
            alert("Insufficient usage tokens");
          }
        } else {
          alert(data.error || "Failed to identify the pet breed.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while identifying the pet breed.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select an image first.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center mb-4">
      <h1 className="text-2xl font-bold text-center mt-6">
        Get to know your pet with <span className="text-pink-500">Petguard</span>
      </h1>

      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 mt-8 flex flex-col items-center w-80 relative">
        <img src={uploadImage} alt="Upload" className="w-10 h-10 mb-4" />
        <p className="text-gray-600">Drop Your .png or .jpg file here!</p>
        <p className="text-gray-400 text-sm mt-1">Max 5mb each.</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {previewImage && (
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Preview:</h2>
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreviewImage(null);
              }}
              className="text-red-500 font-semibold hover:underline"
            >
              X
            </button>
          </div>
          <img
            src={previewImage}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-lg border border-gray-300"
          />
        </div>
      )}

      <div className="flex flex-row items-center justify-center mt-4 gap-4 w-full">
        <Button
          className="w-full md:w-64 h-16 text-base font-bold"
          onClick={handleIdentifyBreed}
          loading={loading}
          loadingText="Identifying..."
        >
          {loading ? "Identifying..." : "Identify Your Pet"}
        </Button>
      </div>

      {/* Menampilkan jumlah token */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Remaining Tokens: {usageToken}</p>
      </div>
    </div>
  );
};

export default AiDetection;
