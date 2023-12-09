import React from "react";
import { getColorForAmount } from "../utils/color";

interface PriceProps {
  amount: number; // Changed to number
}

const Price: React.FC<PriceProps> = ({ amount }) => {
  // Function to determine the amount range
  
  // Get the color based on the amount
  const color = getColorForAmount(amount);

  return (
    <div style={{ color: color }}>
      {amount.toLocaleString()} {/* Format number with commas */}
    </div>
  );
};

export default Price;

