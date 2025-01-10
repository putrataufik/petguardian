import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSchedule = () => {
  const { scheduleId } = useParams();
  const [formData, setFormData] = useState({
    event: '',
    location: '',
    time: '',
    date: '',
    note: '',
  });
  const navigate = useNavigate();

  // Cek apakah scheduleId ada
  useEffect(() => {
    if (!scheduleId) {
      alert("Invalid schedule ID");
      navigate('/schedule'); // Redirect ke halaman schedule jika scheduleId tidak valid
    }

    const fetchSchedule = async () => {
      try {
        console.log(`Fetching schedule with ID: ${scheduleId}`); // Cek scheduleId
        const response = await axios.get(`/getschedule/${scheduleId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        alert('Failed to fetch schedule');
      }
    };

    fetchSchedule();
  }, [scheduleId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log data yang akan dikirim
    console.log("Data yang dikirim:", formData);

    try {
      // Menggunakan URL lengkap sesuai dengan API endpoint backend
      const response = await axios.post(`http://localhost:5000/api/schedules/updateschedule/${scheduleId}`, formData);
      
      alert('Schedule updated successfully!');
      navigate('/schedule'); // Redirect setelah berhasil update
    } catch (error) {
      console.error('Error updating schedule:', error);
      alert(`Failed to update schedule: ${error.response?.data?.error || error.message}`);
    }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Schedule</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event</label>
          <input
            type="text"
            name="event"
            value={formData.event || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Note</label>
          <textarea
            name="note"
            value={formData.note || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSchedule;
