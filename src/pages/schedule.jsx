
import React from "react";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();

  const schedules = [
    {
      time: "10:00",
      title: "Grooming Noozy",
      location: "Phinisi Point Mall",
      date: "11 Januari, 2024",
    },
    {
      time: "13:00",
      title: "Grooming Noozy",
      location: "Phinisi Point Mall",
      date: "11 Januari, 2024",
    },
    {
      time: "19:00",
      title: "Grooming Noozy",
      location: "Phinisi Point Mall",
      date: "11 Januari, 2024",
    },
  ];
=======
import React from 'react';
import { useAuthUser } from "../hooks/authHooks";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const navigate = useNavigate(); // Hook untuk navigasi

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Your Pet Schedule</h1>
        <select className="border border-gray-300 rounded-lg p-2 text-gray-600">
          <option>All</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-md space-y-6">
        {schedules.map((schedule, index) => (
          <div key={index} className="relative flex items-start space-x-4">
            {/* Time */}
            <div className="w-16 text-right text-gray-700 font-medium">
              {schedule.time}
            </div>

            {/* Timeline Line */}
            <div className="relative flex flex-col items-center">
              {/* Icon Check */}
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

              {/* Line */}
              {index !== schedules.length - 1 && (
                <div className="h-16 border-l-2 border-gray-300"></div>
              )}
            </div>


            {/* Content */}
            <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800">{schedule.title}</h2>
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
              <button
                onClick={() => navigate(`/schedule/${index}`)}
                className="mt-4 text-pink-500 border border-pink-500 rounded-lg px-4 py-2 text-sm font-medium hover:bg-pink-500 hover:text-white transition"
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
{/* Add Button */}
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
