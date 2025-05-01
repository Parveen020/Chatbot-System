import React, { useContext, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";

const ChatWindow = ({ messages, selectedChat, user }) => {
  const { formatDate } = useContext(AdminContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-window">
      {messages && messages.length > 0 ? (
        messages.map((message, index) => {
          let isFirstMessageOfDay = false;
          let messageDate = "";

          if (selectedChat) {
            messageDate = formatDate(message.timestamp);
            isFirstMessageOfDay =
              index === 0 ||
              (messages[index - 1] &&
                formatDate(messages[index - 1].timestamp) !== messageDate);
          }

          return (
            <React.Fragment key={message._id || index}>
              {selectedChat && isFirstMessageOfDay && (
                <p className="timestamp">{messageDate}</p>
              )}
              {message.senderType !== user ? (
                <div className={"user chat-message"}>
                  <img src={assets.john} alt="user" className="avatar" />
                  <div className="msg">
                    <span>{message.senderName}</span>
                    <span>{message.content}</span>
                  </div>
                </div>
              ) : (
                <div className={"admin chat-message"}>
                  <div className="msg">
                    <span>{message.senderName}</span>
                    <span>{message.content}</span>
                  </div>
                  <img src={assets.john} alt="user" className="avatar" />
                </div>
              )}
            </React.Fragment>
          );
        })
      ) : (
        <div className="no-messages">
          <p>No messages in this conversation yet</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
