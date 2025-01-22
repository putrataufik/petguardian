import React from "react";
import tokenIcon from "../assets/coin.png";
const RemainingTokens = ({ usageToken }) => (
  <div className="flex gap-4 text-center text-md font-semibold text-black items-center">
    <img src={tokenIcon} alt="Token Icon" className="w-6 h-6 inline-block" />
    <h3>{usageToken}</h3>
  </div>
);

export default RemainingTokens;
