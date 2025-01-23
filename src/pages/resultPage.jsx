import { useLocation, useNavigate } from "react-router-dom";

const formatResponseText = (text) => {
  const lines = text.split("\n"); // Pisahkan teks berdasarkan newline (\n)
  const elements = [];
  let currentList = null; // Untuk menangani <ul> jika ada daftar

  lines.forEach((line, index) => {
    if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
      // Tangani daftar bernomor
      const listItemText = line.slice(3); // Hapus nomor dan spasi
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

      // Tambahkan item ke dalam daftar <ol>
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
        // Jika sebelumnya ada daftar, tutup <ol> dan tambahkan ke elemen
        elements.push(
          <ol key={`list-${index}`} className="list-decimal pl-6 mb-4">
            {currentList}
          </ol>
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
      <ol key="final-list" className="list-decimal pl-6 mb-4">
        {currentList}
      </ol>
    );
  }

  return elements;
};

const ResultPage = () => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const { diseaseInfo, jenisHewan, imageUrl } = location.state || {};

  if (!diseaseInfo || !jenisHewan || !imageUrl) {
    navigate("/");
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        Hasil Deteksi Penyakit Kulit
      </h1>

      <div className="mb-8">
        <p className="text-md font-bold text-gray-900">
          <strong>Jenis Hewan:</strong> {jenisHewan}
        </p>

        <div className="flex justify-center mb-6">
          <img
            src={imageUrl}
            alt="Gambar yang diunggah"
            className="max-w-full max-h-80 object-contain rounded-lg shadow-lg"
          />
        </div>

        <p className="text-md font-bold text-gray-900">
          <strong>Hasil Deteksi:</strong>
        </p>

        <div className="text-gray-900">
          {typeof diseaseInfo === "string" ? (
            <div>{formatResponseText(diseaseInfo)}</div>
          ) : (
            <div>{formatResponseText(diseaseInfo.description)}</div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/aidetection")}
          className="px-6 py-3 bg-[#F8567B] text-white text-lg font-medium rounded-lg shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Kembali ke Halaman Utama
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
