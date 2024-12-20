import React from "react";
import { Drawer, Button } from "@material-tailwind/react";

const EditProfileForm = ({ formData, onChange, onSave, onCancel, open }) => {
  console.log("EditProfileForm -> formData", formData);

  return (
    <Drawer
      open={open}
      onClose={onCancel}
      placement="bottom"
      className="p-3 shadow-lg border-t border-gray-200 rounded-t-3xl"
      size={170}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md font-semibold">Edit Name</h3>
        <Button
          variant="text"
          size="sm"
          color="red"
          onClick={onCancel}
          className="text-red-600"
        >
          X
        </Button>
      </div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Enter new name"
        className="w-full mb-3 p-2 border border-gray-300 rounded text-sm"
      />
      <Button
        onClick={onSave}
        className="w-full bg-[#F8567B] text-white py-2 rounded text-sm hover:bg-green-600"
      >
        Save
      </Button>
    </Drawer>
  );
};

export default EditProfileForm;
