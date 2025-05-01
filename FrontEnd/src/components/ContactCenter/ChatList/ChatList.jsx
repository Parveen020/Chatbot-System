import React from "react";
import "./ChatList.css";
import { assets } from "../../../assets/assets";
import BackDrop from "../../BackDrop/BackDrop";

const ChatList = ({ chats, selectedChat, handleChatClick }) => {
  return (
    <div className="chatList-container">
      <div className="heading">
        <p>Contact Center</p>
      </div>
      <div className="chat-heading">
        <p>Chats</p>
      </div>
      <div className="chatList">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`single-chat ${selectedChat && selectedChat._id === chat._id ? "active" : ""}`}
              onClick={() => handleChatClick(chat)}
            >
              <div className="chat-img-box">
                <img src={assets.john} alt="" />
              </div>
              <div className="chat-info-box">
                <p className="title">{chat.customer?.name || "Unknown"}</p>
                <p className="description">
                  {chat.messages && chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1]?.text
                    : "No messages yet"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-chats">No chats available</div>
        )}
      </div>
      <BackDrop />
    </div>
  );
};

export default ChatList;
