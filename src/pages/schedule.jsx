import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthUser } from "../hooks/authHooks"; // Import hook untuk mendapatkan data user
import { FaRegTrashAlt } from "react-icons/fa";
import scheduleIcon from "../assets/schedule.png";
import locationIcon from "../assets/locationMark.png";
import { DialogDefault } from "../components/modal";

const Schedule = () => {
  const user = useAuthUser(); // Mendapatkan data pengguna yang terautentikasi
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]); // Menyimpan data jadwal
  const [checkedSchedules, setCheckedSchedules] = useState({});
  const [filter, setFilter] = useState("All"); // Menyimpan pilihan filter
  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [scheduleToEdit, setScheduleToEdit] = useState(null);

  // Ambil status checkbox dari localStorage atau API jika diperlukan
  useEffect(() => {
    const savedCheckedSchedules =
      JSON.parse(localStorage.getItem("checkedSchedules")) || {};
    setCheckedSchedules(savedCheckedSchedules);
  }, []);

  // Ambil jadwal dari API berdasarkan UID
  const fetchSchedules = async () => {
    if (!user || !user.uid) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/schedules/getschedule/${user.uid}`
      );
      console.log("Fetched schedules:", response.data);
      const schedules = response.data.schedule;

      setSchedules(schedules);

      const checkedData = schedules.reduce((acc, schedule) => {
        acc[schedule.scheduleID] = schedule.checked;
        return acc;
      }, {});

      setCheckedSchedules(checkedData);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  // Filter jadwal berdasarkan status (All, Completed, Not Completed)
  const filteredSchedules = (schedules || []).filter((schedule) => {
    if (filter === "All") return true;
    if (filter === "Completed") {
      return schedule.checked === true; // Menampilkan jadwal yang sudah selesai (checked)
    }
    if (filter === "Not Completed") {
      return schedule.checked === false; // Menampilkan jadwal yang belum selesai (belum checked)
    }
    return true;
  });

  // Menangani perubahan filter
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCheckboxChange = async (scheduleID) => {
    const newCheckedState = !checkedSchedules[scheduleID];
    setCheckedSchedules((prevState) => ({
      ...prevState,
      [scheduleID]: newCheckedState,
    }));

    try {
      await axios.post(
        `http://localhost:5000/api/schedule/updateschedule/${scheduleID}`,
        {
          checked: newCheckedState,
        }
      );
      console.log(`Schedule ${scheduleID} updated successfully!`);

      // Update state lokal tanpa memanggil ulang API
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.scheduleID === scheduleID
            ? { ...schedule, checked: newCheckedState }
            : schedule
        )
      );
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleDetailSchedule = (scheduleId) => {
    navigate(`/detailSchedule/${scheduleId}`);
  };

  const handleDeleteSchedule = (scheduleId) => {
    setScheduleToDelete(scheduleId); // Set schedule ID to delete
    setModalOpen(true);
  };

  const confirmDeleteSchedule = async () => {
    if (!scheduleToDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/schedules/deleteschedule/${scheduleToDelete}`
      );
      console.log("Schedule deleted:", response.data);
      fetchSchedules(); // Refresh the schedule list after deletion
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete schedule. Please try again.");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [user?.uid]); // Dependensi agar hanya dijalankan ketika UID berubah

  const handleAddSchedule = () => {
    navigate("/addschedule"); // Navigasi ke halaman AddSchedule
  };

  const handleEditSchedule = (scheduleId) => {
    navigate(`/editschedule/${scheduleId}`);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-24 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-center items-center mb-6 ">
        <h1 className="text-xl font-bold text-gray-800">Your Pet Schedule</h1>
      </div>

      {/* Card full */}
      <div className="w-full max-w-md space-y-6">
        {filteredSchedules && filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule, index) => (
            <div
              key={schedule.scheduleID}
              className="relative flex items-start space-x-4"
            >
              <div className="w-16 text-right text-gray-700 font-medium">
                {schedule.time}
              </div>

              {/* bagian waktu dan garis */}
              <div className="relative flex flex-col items-center">
                {/* Radio button */}
                <div className="inline-flex items-center">
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      checked={checkedSchedules[schedule.scheduleID] || false}
                      onChange={() => handleCheckboxChange(schedule.scheduleID)}
                      className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-slate-100 shadow hover:shadow-md border border-black checked:bg-pink-400 checked:border-pink-800"
                      id={`check-custom-style-${schedule.scheduleID}`}
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>

                {/* Tampilkan garis hanya jika bukan card terakhir */}
                {index !== filteredSchedules.length - 1 && (
                  <div className="h-28 border-l-2 border-pink-300 mt-5"></div>
                )}
              </div>

              {/* Isi Content */}
              <div className="flex p-4 bg-gray-100 rounded-lg shadow-md w-72 justify-between items-center">
                <div
                  className="flex flex-col gap-2"
                  onClick={() => handleDetailSchedule(schedule.scheduleID)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {schedule.event}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <img src={locationIcon} alt="" className="w-5 h-5 mr-2" />
                    {schedule.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <img
                      src={scheduleIcon}
                      alt="Schedule Icon"
                      className="w-5 h-5 mr-2"
                    />
                    {schedule.date}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleEditSchedule(schedule.scheduleID)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200"
                  >
                    Edit
                  </button>
                </div>


                {/* tombol Delete */}
                <div>
                  <button
                    onClick={() => handleDeleteSchedule(schedule.scheduleID)}
                    className="bg-red-500 text-white w-10 h-7 rounded flex items-center justify-center hover:bg-red-600"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 flex justify-center mt-4">
            No schedules available.
          </div>
        )}
      </div>

      {/* tombol add schedule*/}
      <button
        onClick={handleAddSchedule}
        className="fixed bottom-20 right-6 w-14 h-14 bg-pink-500 rounded-full text-white text-2xl shadow-lg"
      >
        +
      </button>
      <DialogDefault
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onConfirm={confirmDeleteSchedule}
      />
    </div>
  );
};

export default Schedule;