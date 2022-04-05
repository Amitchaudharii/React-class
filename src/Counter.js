import React, { useState } from "react";
import "./Counter.css";

const Counter = ({ initialValue }) => {
  // const [value, setValue] = useState(0);
  // const [value, setValue] = useState(initialValue);
  const [value, setValue] = useState(initialValue || 0);
  return (
    <div className="main-container">
      <div className="box">
      <button onClick={(e) => setValue(value + 1)}>
        <span>+</span>
      </button>
      <h1 className="value">{value}</h1>
      <button onClick={(e) => setValue(value ? value - 1 : value)}>
        <span>-</span>
      </button>
      </div>
    </div>
  );
};
export default Counter;
