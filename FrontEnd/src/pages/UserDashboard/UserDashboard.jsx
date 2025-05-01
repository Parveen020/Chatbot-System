import React from "react";
import "./UserDashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default UserDashboard;
