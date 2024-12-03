import React from 'react';
import { useAuthUser, useLogout } from '../hooks/authHooks';
import BurgerMenu from '../components/burgerMenu';

const schedule = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout

  const scheduleData = [
    {
      time: '10:00',
      title: 'Grooming Noozy',
      location: 'Phinisi Point Mall',
      date: '11 Januari, 2024',
    },
    {
      time: '13:00',
      title: 'Grooming Noozy',
      location: 'Phinisi Point Mall',
      date: '11 Januari, 2024',
    },
    {
      time: '19:00',
      title: 'Grooming Noozy',
      location: 'Phinisi Point Mall',
      date: '11 Januari, 2024',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between w-full items-center">
        <BurgerMenu user={user} logout={logout} />
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mt-4">Your Pet Schedule</h1>

      {/* Calendar */}
      <div className="bg-white shadow-md rounded-lg mt-6 p-4 w-full max-w-md">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">2025</span>
          <select className="border rounded-md p-2">
            <option>January</option>
            <option>February</option>
            {/* Add other months here */}
          </select>
        </div>
        <div className="grid grid-cols-7 text-center mt-4">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          {Array(31)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="py-2">
                {i + 1}
              </span>
            ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="mt-6 w-full max-w-md">
        {scheduleData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-start"
          >
            <div className="flex-shrink-0 w-16 text-center font-bold text-lg">
              {item.time}
            </div>
            <div className="flex-grow pl-4">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.location}</p>
              <p className="text-sm text-gray-600">{item.date}</p>
              <button className="mt-2 text-sm text-pink-500 border border-pink-500 rounded-md px-3 py-1">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default schedule;
