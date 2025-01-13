import React from "react";
import { Button } from "@material-tailwind/react";

const LoaderButton = ({ loading, onClick, label }) => (
  <Button
    className="w-full md:w-64 h-16 text-base font-bold"
    onClick={onClick}
    loading={loading}
    loadingText="Processing..."
  >
    {loading ? "Processing..." : label}
  </Button>
);

export default LoaderButton;
