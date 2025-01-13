import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks";
import { getUsageToken, updateUsageToken } from "../api/userApi";
import FileUpload from "../components/FileUpload";
import PreviewImage from "../components/PreviewImage";
import RemainingTokens from "../components/RemainingTokens";
import LoaderButton from "../components/LoaderButton";
import { scabiesDog, fleaAllergyDog, dermatitisDog ,ringwormDog 
  , scabiesCat, fleaAllergyCat ,ringwormCat, dermatitisCat
} from "../assets/answerDisease";

const AiDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usageToken, setUsageToken] = useState(0);
  const [diseaseResult, setDiseaseResult] = useState(null);

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

  const parseBreedResponse = (response) => {
    const hewanMatch = response.match(/Hewan:\s*(.+)/);
    const rasMatch = response.match(/Jenis ras:\s*(.+)/);
    const caraMerawatMatch = response.match(/Cara merawatnya:\s*([\s\S]*)/);

    const jenisHewan = hewanMatch ? hewanMatch[1].trim() : null;
    const jenisRas = rasMatch ? rasMatch[1].trim() : null;
    const caraMerawat = caraMerawatMatch ? caraMerawatMatch[1].trim() : null;

    return { jenisHewan, jenisRas, caraMerawat };
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
        }
  
        // Navigate to result page dengan membawa data
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
      alert("Please select an image first.");
      return;
    }

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
        const { jenisHewan, jenisRas } = parseBreedResponse(data.response);

        console.log("jenis hewan :"+ jenisHewan);
        console.log("jenis ras :"+ jenisRas);
        
        if (jenisHewan) {
          await handleDetectDisease(jenisHewan);

          const updatedToken = usageToken - 20; // Mengurangi 20 token
          if (updatedToken >= 0) {
            await updateUsageToken(userId, updatedToken);
            setUsageToken(updatedToken);
          } else {
            alert("Insufficient usage tokens.");
          }
        } else {
          alert("Jenis hewan tidak terdeteksi.");
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
      <div className="my-4">
        <LoaderButton loading={loading} onClick={handleIdentifyBreed} label="Identify Your Pet" />
      </div>
      <RemainingTokens usageToken={usageToken} />
    </div>
  );
};

export default AiDetection;
