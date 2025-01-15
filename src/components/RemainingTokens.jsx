import React from "react";

const RemainingTokens = ({ usageToken }) => (
  <div className="text-center text-sm text-gray-500">
    <p>Remaining Tokens: {usageToken}</p>
  </div>
);

export default RemainingTokens;
