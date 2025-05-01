import React, { useContext } from "react";
import { assets } from "../../../assets/assets";
import "./ChatMain.css";
import { AdminContext } from "../../../Context/AdminContext";
import ChatWindow from "../../ChatWindow/ChatWindow";

const ChatMain = ({ selectedChat }) => {
  const {
    messages,
    newMsg,
    setNewMsg,
    handleSendMessage,
    formatDate,
    groupedMessages,
  } = useContext(AdminContext);

  if (!selectedChat) {
    return (
      <div className="chat-box no-chat-selected">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }
  return (
    <div className="chat-box">
      <div className="chat-title">
        <p>Ticket# {selectedChat.ticketId.substring(0, 10)}</p>
        <img src={assets.home} alt="home" />
      </div>

      <div className="window">
        <ChatWindow
          messages={messages}
          selectedChat={selectedChat}
          user={"admin"}
        />
      </div>

      <p className="missed-status">{selectedChat.isMissed ? "Missed" : ""}</p>

      <div className="chat-input-box">
        <textarea
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="type here"
          rows={1}
        ></textarea>
        <button onClick={handleSendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatMain;
