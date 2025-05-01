import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    {
      name: "Dashboard",
      icon: <img src={assets.home} alt="home" />,
      path: "/user/dashboard",
    },
    {
      name: "Contact Center",
      icon: <img src={assets.chat} alt="chat" />,
      path: "/user/contact-center",
    },
    {
      name: "Analytics",
      icon: <img src={assets.analytics} alt="analytics" />,
      path: "/user/analytics",
    },
    {
      name: "Chat Bot",
      icon: <img src={assets.bot} alt="bot" />,
      path: "/user/chatbot",
    },
    {
      name: "Team",
      icon: <img src={assets.team} alt="team" />,
      path: "/user/team",
    },
    {
      name: "Settings",
      icon: <img src={assets.setting} alt="setting" />,
      path: "/user/settings",
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <img src={assets.logo} alt="logo" onClick={() => navigate("/")} />
        </div>
      </div>

      <div className="menu-items">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
            onClick={() => setActiveItem(item.name)}
          >
            <div className="icon">{item.icon}</div>
            {activeItem === item.name && (
              <span className="item-name">{item.name}</span>
            )}
          </NavLink>
        ))}
      </div>

      <div className="support-icon">
        <div className="icon">
          <img src={assets.profile} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
