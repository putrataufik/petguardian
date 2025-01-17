import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthUser } from "../hooks/authHooks"; // Hook untuk mendapatkan user yang terautentikasi
import scheduleIcon from "../assets/schedule.png";
import locationIcon from "../assets/locationMark.png";

const DetailSchedule = () => {
  const { scheduleId } = useParams(); // Mengambil scheduleId dari URL
  const user = useAuthUser(); 
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Ambil data schedule berdasarkan scheduleId dan user.uid
  useEffect(() => {
    const fetchSchedule = async () => {
      console.log (user)
      console.log (user.uid)
      if (!user || !user.uid) {
        setError("User is not authenticated.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/schedules/getschedule/${user.uid}`
        );

        // Cari jadwal dengan scheduleId yang sesuai
        const foundSchedule = response.data.schedule.find(
          (item) => item.scheduleID === scheduleId
        );

        if (foundSchedule) {
          setSchedule(foundSchedule);
        } else {
          setError("Schedule not found.");
        }
      } catch (err) {
        setError("Failed to fetch schedule details.");
        console.error(err);
      }
    };

    fetchSchedule();
  }, [scheduleId, user?.uid]); // Dependency array agar fetch dijalankan saat scheduleId atau user.uid berubah

  // Jika ada error saat fetch data
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-24 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-center items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Schedule Details</h1>
      </div>

      {/* Card Detail Schedule */}
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md">
        {schedule ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">{schedule.event}</h2>

            <div className="flex items-center text-gray-600 text-sm mt-4">
              <img src={locationIcon} alt="Location Icon" className="w-5 h-5 mr-2" />
              <span>{schedule.location}</span>
            </div>

            <div className="flex items-center text-gray-600 text-sm mt-2">
              <img src={scheduleIcon} alt="Schedule Icon" className="w-5 h-5 mr-2" />
              <span>{schedule.date}</span>
            </div>

            <div className="flex items-center text-gray-600 text-sm mt-2">
              <span>{schedule.time}</span>
            </div>

            {/* Tampilkan Status (jika ada) */}
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">Status</h3>
              <p className={`text-sm mt-2 ${schedule.checked ? "text-green-500" : "text-red-500"}`}>
                {schedule.checked ? "Completed" : "Not Completed"}
              </p>
            </div>

            {/* Tampilkan Note */}
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">Note</h3>
              <p className="text-sm mt-2 text-gray-600">{schedule.note}</p>
            </div>

            {/* Tombol Edit dan Kembali */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate(`/editschedule/${scheduleId}`)}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md"
              >
                Edit
              </button>
              <button
                onClick={() => navigate("/schedule")}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md"
              >
                Back to Schedules
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-red-500">Schedule not found.</div>
        )}
      </div>
    </div>
  );
};

export default DetailSchedule;
