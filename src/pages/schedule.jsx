import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/authHooks"; 

const Schedule = () => {
  const user = useAuthUser(); 
  const navigate = useNavigate(); 

  const [schedules, setSchedules] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Fetch schedule data
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedulesData = [
          {
            scheduleID: "1",
            event: "Grooming Noozy",
            location: "Phinisi Point Mall",
            time: "10:00",
            date: "11 Januari, 2024",
          },
          {
            scheduleID: "2",
            event: "Vet Check-up",
            location: "Makassar Animal Clinic",
            time: "13:00",
            date: "12 Januari, 2024",
          },
          {
            scheduleID: "3",
            event: "Playtime with Noozy",
            location: "Losari Beach Park",
            time: "19:00",
            date: "13 Januari, 2024",
          },
        ];

        setSchedules(schedulesData); // Replace this with fetched data from the API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [user?.uid]);

  if (loading) return <div>Loading schedules...</div>;
  if (error) return <div>Error: {error}</div>;

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

      {/* card full */}
      <div className="w-full max-w-md space-y-6">
        {schedules.map((schedule) => (
          <div key={schedule.scheduleID} className="relative flex items-start space-x-4">
            <div className="w-16 text-right text-gray-700 font-medium">
              {schedule.time}
            </div>

            {/* bagian waktu dan garis*/}
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

            {/* isi Content */}
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
        ))}
      </div>
      <button
        onClick={() => navigate("/addschedule")}
        className="fixed bottom-20 right-6 w-14 h-14 bg-pink-500 rounded-full text-white text-2xl shadow-lg"
      >
        +
      </button>
    </div>
  );
};

export default Schedule;
