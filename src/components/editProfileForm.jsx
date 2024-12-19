import React from "react";

const EditProfileForm = ({ formData, onChange, onSave }) => {
    console.log("EditProfileForm -> formData", formData)
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200 transition-transform transform translate-y-0 z-10">
      <h3 className="text-lg font-bold mb-4">Edit Name</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Enter new name"
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={onSave}
        className="w-full bg-[#F8567B] text-white py-2 rounded hover:bg-green-600"
      >
        Save
      </button>
    </div>
  );
};

export default EditProfileForm;
