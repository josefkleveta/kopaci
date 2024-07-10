import React from "react";
import "./Toggler.css";

function Toggler({ active, onChoose }) {
  const handleClick = (event) => {
    onChoose(event.target.name);
  };

  return (
    <div className="page-toggler">
      <button
        className={`toggler-btn ${active === 1 ? "active" : ""}`}
        onClick={handleClick}
        name="list-of-emp"
      >
        Seznam kopáčů
      </button>
      <button
        className={`toggler-btn ${active === 2 ? "active" : ""}`}
        onClick={handleClick}
        name="work"
      >
        Práce
      </button>
    </div>
  );
}

export default Toggler;
