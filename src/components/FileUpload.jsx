import React from "react";
import uploadImage from "../assets/uploadImagge.png";

const FileUpload = ({ onFileChange, onPreviewChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => onPreviewChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
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
  );
};

export default FileUpload;
