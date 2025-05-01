import React from "react";
import "./Banner.css";
import { assets } from "../../assets/assets";

const Banner = () => {
  return (
    <div className="banner">
      <div className="company-banner">
        <img src={assets.adobe} alt="" />
      </div>
      <div className="company-banner">
        <img src={assets.elastic} alt="" />
      </div>
      <div className="company-banner">
        <img src={assets.opendoor} alt="" />
      </div>
      <div className="company-banner">
        <img src={assets.airtable} alt="" />
      </div>
      <div className="company-banner">
        <img src={assets.elastic} alt="" />
      </div>
      <div className="company-banner">
        <img src={assets.framer} alt="" />
      </div>
    </div>
  );
};

export default Banner;
