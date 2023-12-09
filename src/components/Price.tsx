import React from "react";

interface PriceProps {
  amount: number; // Changed to number
}

const Price: React.FC<PriceProps> = ({ amount }) => {
  // Function to determine the amount range
  const getColorForAmount = (amount: number) => {
    // Determine the color based on the value range
    if (amount >= 1e10) {
      // Tens of billions
      return "#00FFFF"; // Cyan color
    } else if (amount >= 1e9) {
      // Billions
      return "#000000"; // Black color
    } else if (amount >= 1e8) {
      // Hundreds of millions
      return "#b3653e"; // Brown color
    } else if (amount >= 1e7) {
      // Tens of millions
      return "#0B6623"; // Forest green color
    }
    // Default color if none of the conditions are met
    return "inherit";
  };

  // Get the color based on the amount
  const color = getColorForAmount(amount);

  return (
    <div style={{ color: color }}>
      {amount.toLocaleString()} {/* Format number with commas */}
    </div>
  );
};

export default Price;
