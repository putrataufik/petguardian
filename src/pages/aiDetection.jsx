import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks";
import { getUsageToken, updateUsageToken } from "../api/userApi";
import FileUpload from "../components/FileUpload";
import PreviewImage from "../components/PreviewImage";
import RemainingTokens from "../components/RemainingTokens";
import LoaderButton from "../components/LoaderButton";
import { Select, Option } from "@material-tailwind/react";
import {
  scabiesDog, fleaAllergyDog, dermatitisDog, ringwormDog,
  scabiesCat, fleaAllergyCat, ringwormCat, dermatitisCat
} from "../assets/answerDisease";

const AiDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usageToken, setUsageToken] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState(""); // Menyimpan jenis hewan yang dipilih

  const navigate = useNavigate();
  const user = useAuthUser();
  const userId = user?.uid;

  useEffect(() => {
    if (userId) {
      fetchUsageToken();
    }
  }, [userId]);

  const fetchUsageToken = async () => {
    try {
      const token = await getUsageToken(userId);
      setUsageToken(token);
    } catch (error) {
      console.error("Error fetching usage token:", error);
    }
  };

  const handleDetectDisease = async (jenisHewan) => {
    const endpoint =
      jenisHewan === "Anjing"
        ? "http://localhost:5000/api/dogskindisease/detectdog"
        : "http://localhost:5000/api/catskindisease/detectcat";

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Deteksi penyakit berhasil:", data);

        const detectedClass = data.response.predictions[0]?.class;
        let diseaseInfo;

        // Deteksi penyakit berdasarkan jenis hewan
        if (jenisHewan === "Anjing") {
          switch (detectedClass) {
            case "scabies":
              diseaseInfo = scabiesDog;
              break;
            case "fleaAllergy":
              diseaseInfo = fleaAllergyDog;
              break;
            case "dermatitis":
              diseaseInfo = dermatitisDog;
              break;
            case "ringworm":
              diseaseInfo = ringwormDog;
              break;
            default:
              diseaseInfo = "Penyakit kulit tidak terdeteksi atau tidak dikenal.";
          }
        } else if (jenisHewan === "Kucing") {
          switch (detectedClass) {
            case "scabies":
              diseaseInfo = scabiesCat;
              break;
            case "fleaAllergy":
              diseaseInfo = fleaAllergyCat;
              break;
            case "dermatitis":
              diseaseInfo = dermatitisCat;
              break;
            case "ringworm":
              diseaseInfo = ringwormCat;
              break;
            default:
              diseaseInfo = "Penyakit kulit tidak terdeteksi atau tidak dikenal.";
          }
        }else{
          alert("Hewan tidak Diketahui Silahkan Unggah Gambar Peliharaan anda yang lain");
        }

        // Navigate ke halaman result dengan membawa data
        navigate('/result', {
          state: {
            diseaseInfo,
            jenisHewan,
            imageUrl: previewImage
          }
        });
      } else {
        alert(data.error || "Gagal mendeteksi penyakit kulit.");
      }
    } catch (error) {
      console.error("Error detecting disease:", error);
      alert("Terjadi kesalahan saat mendeteksi penyakit.");
    }
  };

  const handleIdentifyBreed = async () => {
    if (!selectedFile) {
      alert("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    if (!selectedAnimal) {
      alert("Silakan pilih jenis hewan (Anjing atau Kucing).");
      return;
    }

    setLoading(true);
    try {
      // Panggil deteksi penyakit berdasarkan pilihan hewan
      await handleDetectDisease(selectedAnimal);

      const updatedToken = usageToken - 20; // Mengurangi 20 token
      if (updatedToken >= 0) {
        await updateUsageToken(userId, updatedToken);
        setUsageToken(updatedToken);
      } else {
        alert("Token penggunaan tidak mencukupi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mendeteksi penyakit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center mb-4">
      <h1 className="text-2xl font-bold text-center mt-6">
        Get to know your pet with <span className="text-pink-500">Petguard</span>
      </h1>
      {!previewImage && (
        <FileUpload onFileChange={setSelectedFile} onPreviewChange={setPreviewImage} />
      )}
      {previewImage && (
        <PreviewImage
          previewImage={previewImage}
          onRemovePreview={() => {
            setSelectedFile(null);
            setPreviewImage(null);
          }}
        />
      )}
      {/* Select options untuk memilih jenis hewan */}
      <div className="my-4">
        <Select
          label="Pilih Jenis Hewan"
          value={selectedAnimal}
          onChange={(value) => setSelectedAnimal(value)}
        >
          <Option value="Anjing">Anjing</Option>
          <Option value="Kucing">Kucing</Option>
        </Select>
      </div>
      <div className="mt-40">
        <LoaderButton loading={loading} onClick={handleIdentifyBreed} label="Identify Your Pet" />
      </div>
      <RemainingTokens usageToken={usageToken} />
    </div>
  );
};

export default AiDetection;
