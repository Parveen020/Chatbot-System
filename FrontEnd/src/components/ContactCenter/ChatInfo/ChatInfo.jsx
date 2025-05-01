import React, { useContext, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./ChatInfo.css";
import { assets } from "../../../assets/assets";
import { AdminContext } from "../../../Context/AdminContext";
import WarningBox from "../Warning/WarningBox";

const ChatInfo = ({ selectedChat }) => {
  const {
    teamMembers,
    isOpen,
    statusOpen,
    selectedStatus,
    user,
    teamWarningVisible,
    setTeamWarningVisible,
    statusWarningVisible,
    setStatusWarningVisible,
    pendingTeamMember,
    toggleDropdown,
    toggleStatusDropdown,
    handleTeamMemberSelect,
    handleStatusSelect,
    confirmTeamChange,
    confirmStatusChange,
    getAssigneeNameById,
  } = useContext(AdminContext);

  const [assigneeName, setAssigneeName] = useState("");
  const statusOptions = ["unresolved", "resolved"];

  useEffect(() => {
    async function fetchName() {
      const name = await getAssigneeNameById(selectedChat.assigned);
      setAssigneeName(name);
    }
    if (selectedChat?.assigned) {
      fetchName();
    }
  }, []);

  if (!selectedChat) {
    return (
      <div className="chat-details">
        <p>Select a chat to view details</p>
      </div>
    );
  }

  return (
    <div className="chat-details">
      <div className="chat-header">
        <img src={assets.john} alt="User" className="user-avatar" />
        <span className="chat-title">
          {selectedChat.customer?.name || "Chat"}
        </span>
      </div>

      <div className="section">
        <p className="section-title">Details</p>
        <div className="input-box">
          <img src={assets.user} alt="" />
          <input
            type="text"
            value={selectedChat.customer?.name || ""}
            readOnly
          />
        </div>
        <div className="input-box">
          <img src={assets.call} alt="" />
          <input
            type="text"
            value={selectedChat.customer?.phone || ""}
            readOnly
          />
        </div>
        <div className="input-box">
          <img src={assets.message} alt="" />
          <input
            type="text"
            value={selectedChat.customer?.email || ""}
            readOnly
          />
        </div>
      </div>

      <div className="section">
        <p className="section-title">Teammates</p>
        <div className="dropdown-container">
          <div className="dropdown-selected" onClick={toggleDropdown}>
            <div className="user-info">
              <img src={assets.john} alt="Profile" className="profile-img" />
              <span className="user-name">
                {assigneeName === "" ? "admin" : assigneeName}
              </span>
            </div>
            <ChevronDown
              className={`chevron ${isOpen ? "chevron-open" : ""}`}
            />
          </div>

          {isOpen && (
            <div className="dropdown-menu">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleTeamMemberSelect(member)}
                >
                  <img
                    src={assets.john}
                    alt="Profile"
                    className="profile-img"
                  />
                  <span className="user-name">{member.fullName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <p className="section-title">Status</p>
        <div className="dropdown-container">
          <div
            className="dropdown-selected status-dropdown-selected"
            onClick={toggleStatusDropdown}
          >
            <div className="status-info">
              <img src={assets.ticket} alt="Ticket" className="ticket-icon" />
              <span className="status-text">{selectedChat.status}</span>
            </div>
            <ChevronDown
              className={`chevron ${statusOpen ? "chevron-open" : ""}`}
            />
          </div>

          {statusOpen && (
            <div className="dropdown-menu status-dropdown">
              {statusOptions.map((status, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleStatusSelect(status)}
                >
                  <span className="status-text">{status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <WarningBox
        isVisible={teamWarningVisible}
        onCancel={() => setTeamWarningVisible(false)}
        onConfirm={confirmTeamChange}
        message={`Chat will be assigned to ${pendingTeamMember?.fullName || "another team member"}`}
      />

      <WarningBox
        isVisible={statusWarningVisible}
        onCancel={() => setStatusWarningVisible(false)}
        onConfirm={confirmStatusChange}
        message="Chat will be closed"
      />
    </div>
  );
};

export default ChatInfo;
