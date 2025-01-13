import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios sudah terinstal
import { useAuthUser } from "../hooks/authHooks"; // Pastikan hook ini mengembalikan user yang sudah terautentikasi
import arrowLeft from "../assets/arrowLeft.png";
const AddSchedule = () => {
  const user = useAuthUser(); // Mendapatkan data pengguna yang terautentikasi
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    time: "",
    event: "",
    location: "",
    date: "",
    note: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pastikan user sudah terautentikasi atau set UID secara manual jika diperlukan
    if (!user || !user.uid) {
      setError("User is not authenticated.");
      return;
    }

    // Menambahkan jadwal ke backend
    try {
      const scheduleData = {
        uid: user.uid,  // Menggunakan UID dari user yang terautentikasi
        event: formData.event,
        location: formData.location,
        time: formData.time,
        date: formData.date,
        note: formData.note,
      };

      const res = await axios.post("http://localhost:5000/api/schedules/addschedule", scheduleData);

      // Cek jika status berhasil (201 Created)
      if (res.status === 201) {
        console.log("Schedule successfully added:", scheduleData); // Menambahkan log saat berhasil mengirim data
        navigate("/schedule"); // Mengarahkan ke halaman jadwal setelah berhasil menambahkan
      }
    } catch (err) {
      console.error("Error adding schedule:", err);
      setError("Failed to add schedule.");
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
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
      <h1 className="text-2xl font-bold text-gray-800 my-8">Add New Schedule</h1>

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
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-[#F8567B] focus:ring-[#F8567B] focus:outline-none"
            required
          />

        </div>

        {/* Event */}
        <div>
          <label htmlFor="event" className="block text-gray-700 font-medium">
            Event
          </label>
          <input
            type="text"
            id="event"
            name="event"
            value={formData.event}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-[#F8567B] focus:ring-[#F8567B] focus:outline-none"
            placeholder="Enter event name"
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-[#F8567B] focus:ring-[#F8567B] focus:outline-none"
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-[#F8567B] focus:ring-[#F8567B] focus:outline-none"
            required
          />
        </div>

        {/* Note */}
        <div>
          <label htmlFor="note" className="block text-gray-700 font-medium">
            Note (Optional)
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:border-[#F8567B] focus:ring-[#F8567B] focus:outline-none"
            placeholder="Enter any additional notes"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F8567B] text-white font-medium py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Save Schedule
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;
