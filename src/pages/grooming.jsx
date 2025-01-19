import React, { useState, useEffect } from 'react';

function Countdown() {
  const releaseDate = new Date('2026-02-20T00:00:00'); // Tanggal rilis
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = releaseDate - now;

    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    const timer = setInterval(() => calculateTimeLeft(), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <div className="text-center text-black">
        <h1 className="text-6xl font-bold text-pink-600 mb-6 animate__animated animate__fadeIn">
          Coming Soon! <br />
          Rilis pada 20 Februari 2026
        </h1>

        {/* Countdown */}
        <div className="text-2xl font-semibold text-gray-800">
          <div className="flex justify-center gap-8 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Hari</div>
              <div className="text-2xl font-bold">{timeLeft.days}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Jam</div>
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Menit</div>
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-xl text-pink-600">Detik</div>
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
            </div>
          </div>
        </div>

        {/* Tombol Stay Tuned */}
        <div className="mt-6">
          <button className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition duration-300">
            Stay Tuned
          </button>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
