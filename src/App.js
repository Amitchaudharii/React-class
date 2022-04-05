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
    <>
      <button
        className={selected === "counter" ? "selected-btn" : ""}
        onClick={(e) => setSelected("counter")}
      >
        Counter
      </button>
      
      <button
        className={selected === "carlist" ? "selected-btn" : ""}
        onClick={(e) => setSelected("carlist")}
      >
        carlist
      </button>

      <button
        className={selected === "expense" ? "selected-btn" : ""}
        onClick={(e) => setSelected("expense")}
      >
        Expense
      </button>

      <button
        className={selected === "billinglist" ? "selected-btn" : ""}
        onClick={(e) => setSelected("billinglist")}
      >
        billinglist
      </button>

      <p>{selected}</p>
      {selected === "counter" && <Counter />}
      {selected === "carlist" && <CarList />}
      {selected === "expense" && <ExpensesTracker />}
      {selected === "billinglist" && <BillingList />}
    </>
  );
}
export default App;
