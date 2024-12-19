import React from "react";

const PetsList = ({ pets }) => {
  return (
    <div className="w-full mt-6 bg-pink-50 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 text-black text-center">Your Pets</h3>
      {pets && pets.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pets.map((pet) => (
            <div
              key={pet.petId}
              className="flex flex-col items-center bg-white rounded-lg p-4 shadow w-32 flex-shrink-0"
            >
              {/* Gambar di atas */}
              <img
                src={pet.photo || "https://via.placeholder.com/50"}
                alt={pet.name}
                className="w-16 h-16 object-cover rounded-full mb-2"
              />
              {/* Nama di bawah */}
              <div className="text-center text-black">
                <p className="font-semibold text-sm">{pet.name}</p>
                {/* <p className="text-xs text-gray-500">
                  {pet.species} - {pet.breed || "Unknown"}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">You have no pets listed.</p>
      )}
    </div>
  );
};

export default PetsList;
