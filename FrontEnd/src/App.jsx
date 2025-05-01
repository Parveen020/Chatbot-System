import React from "react";
import "./index.css";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import ContactCenter from "./components/ContactCenter/ContactCenter";
import Analytics from "./components/Analytics/Analytics";
import Chatbot from "./components/Chatbot/Chatbot";
import Team from "./components/Team/Team";
import Setting from "./components/Setting/Setting";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />

        {/* Nested routes within UserDashboard */}
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact-center" element={<ContactCenter />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
