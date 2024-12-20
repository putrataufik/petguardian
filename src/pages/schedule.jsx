import React, { useState, useEffect } from 'react';
import { useAuthUser, useLogout } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import NavbarBottom from "../components/NavbarBottom";
import axios from 'axios';

const Schedule = () => {
  const user = useAuthUser();
  const logout = useLogout();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState(""); // State untuk event baru
  const [events, setEvents] = useState([]); // State untuk menyimpan events
  const [datesWithEvents, setDatesWithEvents] = useState([]); // Menyimpan tanggal yang memiliki event
  const [notesByDate, setNotesByDate] = useState({}); // State untuk menyimpan catatan per tanggal

  // Fungsi untuk mengambil event berdasarkan tanggal
  const fetchEvents = async (date) => {
    try {
      const response = await axios.get(`/api/events?date=${date}`);
      setEvents(response.data);
      updateDatesWithEvents(); // Update daftar tanggal yang memiliki event
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // Fungsi untuk memperbarui daftar tanggal yang memiliki event
  const updateDatesWithEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      const dates = response.data.map(event => event.startDate); // Ambil tanggal dari event
      setDatesWithEvents(dates); // Set tanggal-tanggal dengan event
    } catch (error) {
      console.error("Failed to fetch all events:", error);
    }
  };

  // Fungsi untuk menangani klik pada tanggal di kalender
  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchEvents(date); // Ambil events ketika tanggal dipilih
  };

  // Fungsi untuk menambahkan event
  const addEvent = async () => {
    if (selectedDate && newEvent.trim()) {
      try {
        const newEventData = {
          title: newEvent,
          description: newEvent,
          startDate: selectedDate,
          endDate: selectedDate,
        };
        await axios.post("/api/events", newEventData); // Kirim ke API untuk disimpan
        fetchEvents(selectedDate); // Update events setelah event ditambahkan
        updateDatesWithEvents(); // Update tanggal yang memiliki event
        setNewEvent(""); // Reset input
      } catch (error) {
        console.error("Failed to add event:", error);
      }
    }
  };

  // Fungsi untuk menambahkan catatan pada tanggal
  const addNote = (date, note) => {
    if (note.trim()) {
      setNotesByDate((prevNotes) => ({
        ...prevNotes,
        [date]: [...(prevNotes[date] || []), note],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full flex justify-center items-center py-4">
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
      <div className="mt-6 w-full flex justify-center relative">
        <iframe
          src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FMakassar&showPrint=0&src=ZXhwbG9zaW9ubWFuMDdAZ21haWwuY29t`}
          style={{ border: 'solid 1px #777' }}
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
          onClick={() => handleDateClick("2024-12-20")}
        ></iframe>
      </div>

      {/* Modal untuk menambahkan event */}
      {selectedDate && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Event for {selectedDate}</h2>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Add a new event"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
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
                onClick={addEvent}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daftar Tanggal dengan Event */}
      <div className="mt-6 w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Dates with Events</h2>
        <ul className="list-disc pl-5 space-y-2">
          {datesWithEvents.map((date, index) => (
            <li key={index} className="mb-4">
              <div>{date}</div>
              {/* Menampilkan catatan untuk tanggal tertentu */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add a note for this date"
                  className="border p-2 rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addNote(date, e.target.value);
                      e.target.value = ""; // Reset input setelah menambahkan catatan
                    }
                  }}
                />
                <ul className="list-inside space-y-1 mt-2">
                  {notesByDate[date] && notesByDate[date].map((note, idx) => (
                    <li key={idx} className="text-sm">{note}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <NavbarBottom />
    </div>
  );
};

export default Schedule;
