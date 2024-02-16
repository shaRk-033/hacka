import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Header = () => {
  // Using the useSelector hook to get the Redux store state
  const store = useSelector((store) => store);

  return (
    <header>
      <div>
        {/* Displaying a logo */}
        <img src="/logo-f.png" alt="" />
        {/* Displaying the title */}
        <h2>Flight Radar</h2>
      </div>

      {/* Displaying flight information or loading message based on the Redux store state */}
      <h4>
        {store.isLoading
          ? "Calculating Flights" // Displayed when flights are still being calculated
          : `${store.flights.length} flights found` // Displaying the number of flights found
        }
      </h4>
    </header>
  );
};

export default Header;
