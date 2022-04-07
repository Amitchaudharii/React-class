import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
// import React from "react";
import ExpensesTracker from "./ExpensesTracker";
import CarList from "./CarList";
import NavBar from "./NavBar";
import ErrorPage from "./ErrorPage";
import React, { useState } from "react";
import BillingList from "./BillingList";
import { Routes, Route, NavLink } from "react-router-dom";
import "./NavBar.css";


function App() {
  const [selected, setSelected] = useState("basic");
  return (
    <>
     <NavBar/>
      <Routes>
        <Route path="counter" element={<Counter />} />
        <Route path="carlist" element={<CarList />} />
        <Route path="expense" element={<ExpensesTracker />} />
        <Route path="billinglist" element={<BillingList />} />
        <Route path="*" element={<CarList />} />
      </Routes>

      {/* <div className="components-btns">
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
        <h2>{selected}</h2>
      </div>

      {selected === "counter" && <Counter />}
      {selected === "carlist" && <CarList />}
      {selected === "expense" && <ExpensesTracker />}
      {selected === "billinglist" && <BillingList />} */}
    </>
  );
}
export default App;
