import React from "react";
import "./Logo.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="box logo-box">
      <img src={assets.logo} alt="" className="logo" />
      <p className="logo-title" onClick={() => navigate("/")}>
        Hubly
      </p>
    </div>
  );
};

export default Logo;
