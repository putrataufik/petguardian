import React from "react";

const PreviewImage = ({ previewImage, onRemovePreview }) => (
  <div className="mt-6">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Preview:</h2>
      <button
        onClick={onRemovePreview}
        className="text-red-500 font-semibold hover:underline"
      >
        X
      </button>
    </div>
    <img
      src={previewImage}
      alt="Preview"
      className="w-64 h-64 object-cover rounded-lg border border-gray-300"
    />
  </div>
);

export default PreviewImage;
