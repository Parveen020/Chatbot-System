import React from "react";
import "./RightBox.css";
import { assets } from "../../../assets/assets";
import Calendar from "./Calender/Calender";

const RightBox = () => {
  return (
    <div className="dashboard-container">
      <img src={assets.Image} alt="Discussion" className="main-image" />

      <div className="notification-card">
        <img src={assets.Person} alt="User" className="avatar" />
        <div>
          <strong>Jerry Calzoni</strong> joined <strong>Swimming</strong>
          <br />
          <span className="timestamp">Class • 9:22 AM</span>
        </div>
      </div>

      <div className="calendar-card">
        <Calendar />
      </div>

      <div className="sales-card">
        <img src={assets.Sales} alt="" />
      </div>
    </div>
  );
};

export default RightBox;
