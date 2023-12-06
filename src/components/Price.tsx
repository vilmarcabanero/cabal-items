import React from 'react';

interface PriceProps {
  amount: string;
}

const Price: React.FC<PriceProps> = ({ amount }) => {
  // Function to determine the amount range
  const getColorForAmount = (amount: string) => {
    // Remove commas for accurate conversion
    const numericValue = parseFloat(amount.replace(/,/g, ''));
    // Determine the color based on the value range
    if (numericValue >= 1e10) {
      // Tens of billions
      return '#00FFFF'; // Replace with your chosen color
    } else if (numericValue >= 1e9) {
      // Billions
      return '#000000';
    }
    else if (numericValue >= 1e8) {
      // Millions
      return '#b3653e';
    } else if (numericValue >= 1e7) {
      // Tens of millions
      return '#0B6623'; // Replace with your chosen color
    }

  };

  // Get the color based on the amount
  const color = getColorForAmount(amount);

  return (
    <div style={{ color: color }}>
      {amount}
    </div>
  );
};

export default Price;
