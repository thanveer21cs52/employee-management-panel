import { useState } from "react";
import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
    <div className="navbar">
      <div className="nav_box">
        <Link to="/home"  >Home</Link>
        <Link to="/list" >Employee list</Link>
      </div>
      <div className="nav_box">
        <Link to="/name" >Thanveer</Link>
        <Link to="/">Logout</Link>
      </div>
    </div>
    </>
  );
}

export default Nav;
