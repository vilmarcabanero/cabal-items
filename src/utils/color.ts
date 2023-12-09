export const getColorForAmount = (amount: number) => {
  // Determine the color based on the value range
  if (amount >= 1e10) {
    // Tens of billions
    return "#74cc93";
  } else if (amount >= 1e9) {
    // Billions
    return "#5a6497"; // Black color
  } else if (amount >= 1e8) {
    // Hundreds of millions
    return "#b3653e"; // Brown color
  } else if (amount >= 1e7) {
    // Tens of millions
    return "#0B6623"; // Forest green color
  } else if (amount >= 1e6) {
    // millions
    return "#39acb7";
  } else if (amount >= 1e5) {
    // hundred thousands
    return "#d0be70";
  }
  // Default color if none of the conditions are met
  return "inherit";
};