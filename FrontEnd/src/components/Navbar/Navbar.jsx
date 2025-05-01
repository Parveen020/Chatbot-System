import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import Logo from "../Logo/Logo.jsx";
import BackDrop from "../BackDrop/BackDrop.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (state) => {
    if (state === "Login") {
      navigate("/Login");
    } else {
      navigate("/Register");
    }
  };

  return (
    <div className="nav-container">
      <Logo />
      <div className="box signup-box">
        <button className="login" onClick={() => handleClick("Login")}>
          Login
        </button>
        <button className="signup" onClick={() => handleClick("Signup")}>
          Sign up
        </button>
      </div>
      <BackDrop />
    </div>
  );
};

export default Navbar;
