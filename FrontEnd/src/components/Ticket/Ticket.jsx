import React, { useContext } from "react";
import "./Ticket.css";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";

const Ticket = ({ ticketData }) => {
  const { fetchSingleChat } = useContext(AdminContext);
  const { id, message, timestamp, status, user } = ticketData;

  return (
    <div className="ticket">
      <div className="ticket-header">
        <div className="ticket-status">
          <div
            className={`status-indicator ${status === "resolved" ? "resolved" : "unresolved"}`}
          ></div>
          <span className="ticket-id">Ticket# {ticketData.ticketId.substring(0, 10)}</span>
        </div>
        <p className="missed-status">{ticketData.isMissed ? "Missed" : ""}</p>
        <div className="ticket-time">
          <span>Posted at {ticketData.postedTime}</span>
        </div>
      </div>

      <div className="ticket-content">
        <p className="ticket-message">
          {ticketData.messages.length > 0
            ? ticketData.messages[ticketData.messages.length - 1].content
            : ""}
        </p>
        <div className="ticket-time-elapsed">{ticketData.elapsedTime}</div>
      </div>

      <div className="ticket-footer">
        <div className="user-info">
          <div className="user-avatar">
            <img src={assets.john} alt="User" />
          </div>
          <div className="user-details">
            <div className="user-name">{ticketData.customer.name}</div>
            <div className="user-contact">
              {ticketData.customer.phone}
              <br />
              {ticketData.customer.email}
            </div>
          </div>
        </div>
        <button
          className="open-ticket-btn"
          onClick={() => fetchSingleChat(ticketData._id)}
        >
          Open Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
