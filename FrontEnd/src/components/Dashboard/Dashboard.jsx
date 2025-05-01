import React, { useContext, useState } from "react";
import "./Dashboard.css";
import SearchBar from "../Searchbor/Searchbar";
import Ticket from "../Ticket/Ticket";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";

const Dashboard = () => {
  const { tickets } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === "resolved" && ticket.status !== "resolved") return false;
    if (activeTab === "unresolved" && ticket.status !== "unresolved")
      return false;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        ticket.ticketId?.toLowerCase().includes(query) ||
        ticket.customer.name?.toLowerCase().includes(query) ||
        ticket.customer.phone?.toLowerCase().includes(query) ||
        ticket.customer.email?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="dashbaord-container">
      <div className="header">
        <p>Dashboard</p>
      </div>
      <SearchBar onSearch={handleSearch} />

      <div className="tabs-container">
        <div
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          {activeTab === "all" && (
            <img
              src={assets.allTickets}
              alt="All Tickets Icon"
              className="tab-icon"
            />
          )}
          <span>All Tickets</span>
        </div>
        <div
          className={`tab ${activeTab === "resolved" ? "active" : ""}`}
          onClick={() => setActiveTab("resolved")}
        >
          {activeTab === "resolved" && (
            <img
              src={assets.resolved}
              alt="Resolved Icon"
              className="tab-icon"
            />
          )}
          <span>Resolved</span>
        </div>
        <div
          className={`tab ${activeTab === "unresolved" ? "active" : ""}`}
          onClick={() => setActiveTab("unresolved")}
        >
          {activeTab === "unresolved" && (
            <img
              src={assets.unresolved}
              alt="Unresolved Icon"
              className="tab-icon"
            />
          )}
          <span>Unresolved</span>
        </div>
      </div>

      <div className="tickets-list">
        {filteredTickets.map((ticket) => (
          <Ticket key={ticket._id} ticketData={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
