import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSchedule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    time: "",
    title: "",
    location: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan data di server atau state management
    console.log("Data submitted:", formData);
    navigate("/schedule"); // Kembali ke halaman jadwal setelah berhasil disimpan
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Schedule</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4"
      >
        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-gray-700 font-medium">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter activity name"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter location"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-medium py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Save Schedule
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;
