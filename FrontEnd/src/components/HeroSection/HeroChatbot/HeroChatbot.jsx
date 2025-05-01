import React, { useContext, useState } from "react";
import "./HeroChatbot.css";
import { assets } from "../../../assets/assets";
import { AdminContext } from "../../../Context/AdminContext";
import ChatWindow from "../../ChatWindow/ChatWindow";
import BackDrop from "../../BackDrop/BackDrop";

const HeroChatbot = () => {
  const {
    showWelcomeBubble,
    showChatbot,
    handleMouseEnter,
    handleMouseLeave,
    toggleChatbot,
    closeWelcomeBubble,
    chatbotSettings,
    chatCreated,
    setChatCreated,
    createFormData,
    setCreateFormData,
    handleCreateFormChange,
    handleCreateChat,
    newMsg,
    setNewMsg,
    handleUserSendMessage,
    savedChatId,
    newchatMessages,
  } = useContext(AdminContext);

  const selectedChat = null;

  return (
    <div className="hero-chatbot-container">
      {showWelcomeBubble && !showChatbot && (
        <div className="hero-welcome-bubble" onClick={toggleChatbot}>
          <div className="welcome-emoji">
            <img src={assets.botImage} alt="" />
          </div>
          <p>{chatbotSettings.welcomeBubbleText}</p>
          <button className="close-bubble" onClick={closeWelcomeBubble}>
            ×
          </button>
        </div>
      )}

      {
        <div
          className="hero-chatbot-icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleChatbot}
        >
          {!showChatbot ? (
            <img src={assets.chatIcon} alt="Chat" />
          ) : (
            <button className="hero-close-button" onClick={toggleChatbot}>
              ×
            </button>
          )}
        </div>
      }

      {showChatbot && (
        <div className="hero-chatbot-window">
          <div
            className="hero-chatbot-header"
            style={{ backgroundColor: chatbotSettings.headerColor }}
          >
            <div className="hero-chatbot-avatar">
              <img src={assets.botImage} alt="" />
            </div>
            <div className="hero-chatbot-name">Hubly</div>
          </div>

          <div
            className="hero-chatbot-body"
            style={{ backgroundColor: chatbotSettings.backgroundColor }}
          >
            {savedChatId ? (
              <ChatWindow
                messages={newchatMessages}
                selectedChat={selectedChat}
                user={"user"}
              />
            ) : (
              <div className="hero-chatbot-form">
                <h4>Introduction Yourself</h4>
                <div className="hero-form-group">
                  <label>Your name</label>
                  <input
                    type="text"
                    name="name"
                    value={createFormData.name}
                    onChange={handleCreateFormChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="hero-form-group">
                  <label>Your Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={createFormData.phone}
                    onChange={handleCreateFormChange}
                    placeholder="+1 (000) 000-0000"
                  />
                </div>
                <div className="hero-form-group">
                  <label>Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={createFormData.email}
                    onChange={handleCreateFormChange}
                    placeholder="example@gmail.com"
                  />
                </div>
                <button
                  className="hero-thank-you-button"
                  onClick={handleCreateChat}
                >
                  Thank You!
                </button>
              </div>
            )}
          </div>

          <div className="hero-chatbot-footer">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Write a message"
            />
            <button className="hero-send-button">
              <img src={assets.send} onClick={handleUserSendMessage} alt="" />
            </button>
          </div>
        </div>
      )}
      <BackDrop />
    </div>
  );
};

export default HeroChatbot;
