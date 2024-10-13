import React, { useState } from "react";
import "./ToggleButtonGroup.css";

const ToggleButtonGroup = () => {
  const [active, setActive] = useState("M");

  const options = ["D", "M", "Y", "All"];

  return (
    <div className="toggle-group">
      {options.map((option) => (
        <button
          key={option}
          className={`toggle-button ${active === option ? "active" : ""}`}
          onClick={() => setActive(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;