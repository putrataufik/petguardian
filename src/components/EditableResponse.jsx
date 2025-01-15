import React, { useState } from "react";

const EditableResponse = ({ initialText }) => {
  const [lines, setLines] = useState(initialText.split("\n")); // Pisahkan teks awal berdasarkan newline

  const handleInputChange = (value, index) => {
    const updatedLines = [...lines];
    updatedLines[index] = value; // Perbarui baris tertentu
    setLines(updatedLines);
  };

  const renderEditableText = (text, index) => {
    // Periksa apakah ini adalah item daftar
    if (text.startsWith("* ")) {
      return (
        <li key={index} className="mb-2 leading-relaxed list-disc pl-6">
          <input
            type="text"
            value={text.slice(2)} // Hapus tanda "* " untuk input
            onChange={(e) => handleInputChange(`* ${e.target.value}`, index)}
            className="w-full bg-transparent border-b focus:outline-none"
          />
        </li>
      );
    }

    // Jika bukan daftar, render sebagai textarea untuk teks biasa
    return (
      <textarea
        key={index}
        value={text}
        onChange={(e) => handleInputChange(e.target.value, index)}
        className="w-full bg-transparent border-b focus:outline-none mb-4 leading-relaxed"
      />
    );
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      <ul>
        {lines.map((line, index) => renderEditableText(line, index))}
      </ul>
    </div>
  );
};

export default EditableResponse;
