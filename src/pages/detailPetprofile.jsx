import React from 'react';
import fotokucing from '../assets/kucing.png'; // Ganti dengan path gambar yang sesuai

const DetailPetProfile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      {/* Kontainer utama */}
      <div className="w-96 mt-20 relative">
        
       
        <button  onClick={() => window.history.back()}
        className="absolute top-4 left-4 text-2xl text-gray-500 hover:text-gray-700 z-30">
          &#x2190; {/* Icon kembali */}
        </button>

        
        <div>
          <div className="flex justify-center">
            <img
              src={fotokucing}
              alt="Pet"
              className="h-90 w-90 object-cover rounded-t-lg"
            />
          </div>

          <div className="bg-white rounded-[50px] shadow-lg p-6 relative -top-10">
            {/* Konten pet */}
            <div className="text-center mt-4 ml-8">
              <h1 className="text-xl font-semibold">
                Noozy <span className="text-pink-500">♀</span>
              </h1>
              <p className="text-gray-500">Bundel Kurilia</p>
            </div>

            {/* Detail pet */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <h2 className="text-sm text-gray-500">Age</h2>
                <p className="font-medium">1 year</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Color</h2>
                <p className="font-medium">Grey</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Weight</h2>
                <p className="font-medium">2 Kg</p>
              </div>
            </div>

            {/* Deskripsi pet */}
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm text-gray-500">Pet Description</h3>
                <p className="border-b border-gray-200 pb-2">Lorem ipsum dolor sit amet...</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Medical History</h3>
                <p className="border-b border-gray-200 pb-2">No medical issues</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Grooming Schedule</h3>
                <p className="border-b border-gray-200 pb-2">Every Saturday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPetProfile;
