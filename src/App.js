import logo from "./logo.svg";
import "./App.css";
import Counter from "./Counter";
import React from "react";
import ExpensesTracker from "./ExpensesTracker";
import CarList from "./CarList";


function App({
  name,
  location,
  coOrdinates: { latitude, longitude },
  age,
  primes,
}) {
  return (
    <div className="App">
      <h1>{name}</h1>
      <h1>{location}</h1>
      <h1>{latitude}' North</h1>
      <h1>{longitude}'East</h1>
      <h1>{age} years</h1>
      <h2>
        Primes: {primes} {primes.length} primes
      </h2>
      <Counter />
      <CarList />
      <ExpensesTracker />
    </div>
  );
}
export default App;
