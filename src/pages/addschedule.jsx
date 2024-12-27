import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios sudah terinstal

const AddSchedule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    time: "",
    event: "",
    location: "",
    date: "",
    note: "",
  });

  const [user, setUser] = useState(null); // Untuk menyimpan data pengguna
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mengambil data user yang sedang login (ini contoh, sesuaikan dengan implementasi auth)
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/user"); // Ganti dengan endpoint yang sesuai
        setUser(res.data); // Menyimpan user data
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("User not found");
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("User is not authenticated.");
      return;
    }

    // Menambahkan jadwal ke Firestore menggunakan API backend
    try {
      const scheduleData = {
        uid: user.uid,
        event: formData.event,
        location: formData.location,
        time: formData.time,
        date: formData.date,
        note: formData.note,
      };

      const res = await axios.post(`http://localhost:5000/schedule/${user.uid}`, scheduleData);
      if (res.status === 201) {
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
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
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter any additional notes"
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
