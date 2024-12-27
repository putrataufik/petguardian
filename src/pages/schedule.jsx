import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthUser } from "../hooks/authHooks"; // Import hook untuk mendapatkan data user

const Schedule = () => {
  const user = useAuthUser(); // Mendapatkan data pengguna yang terautentikasi
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]); // Menyimpan data jadwal

 
  const fetchSchedules = async () => {
    if (!user || !user.uid) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/schedules/getschedule/${user.uid}`
      );
      console.log("Fetched schedules:", response.data); // Menambahkan log untuk data yang diterima
      setSchedules(response.data.schedule); // Menyimpan data jadwal yang diterima
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  useEffect(() => {
    fetchSchedules(); // Memanggil fetchSchedules ketika komponen pertama kali render
  }, [user?.uid]); // Menambahkan UID sebagai dependensi untuk rerun jika UID berubah

  const handleAddSchedule = () => {
    navigate("/addschedule"); // Navigasi ke halaman AddSchedule
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-24 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Your Pet Schedule</h1>
        <select className="border border-gray-300 rounded-lg p-2 text-gray-600">
          <option>All</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Card full */}
      <div className="w-full max-w-md space-y-6">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.scheduleID}
              className="relative flex items-start space-x-4"
            >
              <div className="w-16 text-right text-gray-700 font-medium">
                {schedule.time}
              </div>

              {/* bagian waktu dan garis */}
              <div className="relative flex flex-col items-center">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="h-16 border-l-2 border-gray-300"></div>
              </div>

              {/* Isi Content */}
              <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800">
                  {schedule.event}
                </h2>
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657A8 8 0 1116.657 17m-5.657.293V21m-4-4h4"
                    />
                  </svg>
                  {schedule.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h8M8 11h8m-8 4h8"
                    />
                  </svg>
                  {schedule.date}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No schedules available.</div>
        )}
      </div>

      {/* Button Add Schedule */}
      <button
        onClick={handleAddSchedule}
        className="fixed bottom-20 right-6 w-14 h-14 bg-pink-500 rounded-full text-white text-2xl shadow-lg"
      >
        +
      </button>
    </div>
  );
};

export default Schedule;
