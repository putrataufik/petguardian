import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, previewImage } = location.state || {}; // Mendapatkan data dari state navigate

  if (!result) {
    // Jika tidak ada data, arahkan kembali ke halaman utama
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Result Found</h1>
          <button
            onClick={() => navigate("/aidetection")}
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Fungsi untuk memformat teks respons menjadi JSX dengan gaya bold dan italic
  const formatResponseText = (text) => {
    const lines = text.split("\n"); // Pisahkan teks berdasarkan newline (\n)
    const elements = [];
    let currentList = null; // Untuk menangani <ul> jika ada daftar
  
    lines.forEach((line, index) => {
      if (line.startsWith("* ")) {
        // Jika baris dimulai dengan "* ", berarti ini adalah item daftar
        const listItemText = line.slice(2); // Hapus tanda "* " di awal
        const formattedListItem = listItemText.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={idx}>{part.slice(2, -2)}</strong> // Bold
            );
          } else if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <em key={idx}>{part.slice(1, -1)}</em> // Italic
            );
          } else {
            return part; // Teks biasa
          }
        });
  
        // Tambahkan item ke dalam daftar <ul>
        if (!currentList) {
          currentList = [];
        }
        currentList.push(
          <li key={index} className="mb-2 leading-relaxed">
            {formattedListItem}
          </li>
        );
      } else {
        // Jika bukan item daftar
        if (currentList) {
          // Jika sebelumnya ada daftar, tutup <ul> dan tambahkan ke elemen
          elements.push(
            <ul key={`list-${index}`} className="list-disc pl-6 mb-4">
              {currentList}
            </ul>
          );
          currentList = null; // Reset daftar
        }
  
        // Pisahkan teks berdasarkan ** (bold) dan * (italic)
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/);
        const formattedLine = parts.map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={idx}>{part.slice(2, -2)}</strong> // Bold
            );
          } else if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <em key={idx}>{part.slice(1, -1)}</em> // Italic
            );
          } else {
            return part; // Teks biasa
          }
        });
  
        // Tambahkan baris ke elemen
        elements.push(
          <p key={index} className="mb-4 leading-relaxed">
            {formattedLine}
          </p>
        );
      }
    });
  
    // Tambahkan daftar terakhir jika ada
    if (currentList) {
      elements.push(
        <ul key="final-list" className="list-disc pl-6 mb-4">
          {currentList}
        </ul>
      );
    }
  
    return elements;
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center mb-24">
      <h1 className="text-2xl font-bold text-center mb-6">
        Results from <span className="text-pink-500">Petguard</span>
      </h1>

      <img
        src={previewImage}
        alt="Uploaded Pet"
        className="w-64 h-64 object-cover rounded-lg border border-gray-300 mb-6"
      />

      <div className="bg-white shadow-md rounded-lg p-4 max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">Breed Information:</h2>
        <div className="text-gray-700">{formatResponseText(result)}</div>
      </div>

      <button
        onClick={() => navigate("/aidetection")}
        className="bg-black text-white py-3 px-4 rounded hover:bg-gray-800 mt-6"
      >
        Identify Another Pet
      </button>
    </div>
  );
};

export default ResultPage;
