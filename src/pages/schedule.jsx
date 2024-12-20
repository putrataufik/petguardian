import React, { useState } from 'react';
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";

const Schedule = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  const navigate = useNavigate(); // Hook untuk navigasi

  // State untuk To-Do List berdasarkan tanggal
  const [todosByDate, setTodosByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  // Fungsi untuk menambahkan item ke To-Do List
  const addTodo = () => {
    if (newTodo.trim() !== "" && selectedDate) {
      setTodosByDate((prevTodos) => ({
        ...prevTodos,
        [selectedDate]: [...(prevTodos[selectedDate] || []), newTodo],
      }));
      setNewTodo("");
    }
  };

  // Fungsi untuk menangani klik pada tanggal di kalender
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full flex justify-center items-center py-4">
        {/* Profil di kanan atas */}
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full absolute right-4 top-4 cursor-pointer"
            onClick={() => navigate("/userProfile")}
          />
        )}
      </div>

      {/* Google Calendar Embed */}
      <div className="mt-6 w-full flex justify-center">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FMakassar&showPrint=0&src=ZXhwbG9zaW9ubWFuMDdAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=aWQuaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%2333B679&color=%230B8043"
          style={{ border: 'solid 1px #777' }}
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
          onClick={() => handleDateClick("2024-12-20")} // Ganti sesuai logika Anda
        ></iframe>
      </div>

      {/* Modal untuk menambahkan To-Do */}
      {selectedDate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add To-Do for {selectedDate}</h2>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Add a new task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setSelectedDate(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={addTodo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* To-Do List */}
      <div className="mt-6 w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
        {Object.keys(todosByDate).map((date) => (
          <div key={date} className="mb-4">
            <h3 className="text-lg font-semibold">{date}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {todosByDate[date].map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <NavbarBottom />
    </div>
  );
};

export default Schedule;
