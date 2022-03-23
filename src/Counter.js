import React, { useState } from "react";
import "./Counter.css";


const Counter = ({initialValue}) => {
    // const [value, setValue] = useState(0);
    // const [value, setValue] = useState(initialValue);
    const [value, setValue] = useState(initialValue || 0);
    return(
        <div className="counter-container">
            <button onClick={e => setValue(value + 1)}>
                <span>+</span>
            </button>
            <h1>
            {value}
            </h1>
            <button onClick={e => setValue(value ? value - 1:value)}>
                <span>-</span>
            </button>
        </div>
    );
};
export default Counter;