import React from "react";
import "./NavBar.css";
import { Routes, Route, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="menu">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/counter">
          Counter
        </NavLink>
        <NavLink className="nav-link" to="/carlist">
          Carlist
        </NavLink>
        <NavLink className="nav-link" to="/expense">
          Expenselist
        </NavLink>
        <NavLink className="nav-link" to="/billinglist">
          Billinglist
        </NavLink>
      </div>
    </>
  );
};
export default NavBar;
