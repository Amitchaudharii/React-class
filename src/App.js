import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
// import React from "react";
import ExpensesTracker from "./ExpensesTracker";
import CarList from "./CarList";
import React, { useState } from "react";
import BillingList from "./BillingList";

function App() {
  const [selected, setSelected] = useState("basic");
  return (
    <div className="App">
      <button className={selected === "basic" ? "selected-btn" : ""} onClick={e => setSelected("counter")}>Counter</button>
      {selected === "counter" && <Counter />}
      <CarList />
      <ExpensesTracker />
      <BillingList/>
    </div>
  );
}
export default App;
