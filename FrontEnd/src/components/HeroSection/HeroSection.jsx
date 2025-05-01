import React from "react";
import "./HeroSection.css";
import { assets } from "../../assets/assets";
import RightBox from "./RightBox/RightBox";
import HeroChatbot from "./HeroChatbot/HeroChatbot";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="details">
        <div className="upper-box">
          <p>Grow Your Business Faster with Hubly CRM</p>
        </div>
        <div className="middle-box">
          <p>
            Manage leads, automate workflows, and close deals effortlessly all
            in one powerful platform.
          </p>
        </div>
        <div className="lower-box">
          <button className="btn1">
            Get Started{" "}
            <span>
              <img src={assets.Vector} alt="" />
            </span>
          </button>
          <button className="btn2">
            <button className="playbutton">
              <img src={assets.playButton} alt="" />
            </button>
            <span>Watch Video</span>
          </button>
        </div>
      </div>
      <div className="images">
        <RightBox />
      </div>
      <HeroChatbot />
    </div>
  );
};

export default HeroSection;
