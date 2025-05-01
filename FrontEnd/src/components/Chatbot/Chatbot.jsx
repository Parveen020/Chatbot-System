import React, { useState, useRef, useEffect, useContext } from "react";
import "./Chatbot.css";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";

const Chatbot = () => {
  const {
    chatbotSettings,
    updateSetting,
    handleSaveSettings,
    handleFormDataChange,
    handleWelcomeBubbleChange,
    handleTimerChange,
  } = useContext(AdminContext);

  return (
    <div className="chatbot-container">
      <div className="chatbot-preview">
        <h2>Chat Bot</h2>

        <div className="chatbot-frame">
          <div
            className="chatbot-header"
            style={{ backgroundColor: chatbotSettings.headerColor }}
          >
            <div className="chatbot-avatar">
              <img src={assets.botImage} alt="" />
            </div>
            <div className="chatbot-name">{chatbotSettings.botName}</div>
          </div>

          <div
            className="chatbot-body"
            style={{ backgroundColor: chatbotSettings.backgroundColor }}
          >
            <>
              <div className="chatbot-message bot-message">
                <div className="message-avatar">
                  <img src={assets.botImage} alt="" />
                </div>
                <div className="message">
                  <div className="message-content">
                    {chatbotSettings.welcomeMessage}
                  </div>
                  <div className="message-content">
                    {chatbotSettings.placeholderText}
                  </div>
                </div>
              </div>
            </>

            <div className="chatbot-form">
              <h4>Introduction Yourself</h4>
              <div className="form-group">
                <label>Your name</label>
                <input type="text" value={chatbotSettings.formData.name} />
              </div>
              <div className="form-group">
                <label>Your Phone</label>
                <input type="text" value={chatbotSettings.formData.phone} />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input type="email" value={chatbotSettings.formData.email} />
              </div>
              <button className="thank-you-button">Thank You!</button>
            </div>
          </div>

          <div className="chatbot-footer">
            <input type="text" placeholder="Write a message" disabled />
            <button className="send-button">
              <img src={assets.send} alt="" />
            </button>
          </div>
        </div>
        <div className="chatbot-welcome-bubble">
          <div className="welcome-emoji">
            <img src={assets.botImage} alt="" />
          </div>
          <p>{chatbotSettings.welcomeBubbleText}</p>
          <button className="close-bubble">×</button>
        </div>
      </div>

      <div className="customization-panel">
        <div className="customization-section">
          <h3>Header Color</h3>

          <div className="color-options">
            <div
              className={`color-option ${chatbotSettings.headerColor === "#ffffff" ? "selected" : ""}`}
              style={{ backgroundColor: "#ffffff", border: "1px solid #ddd" }}
              onClick={() => updateSetting("headerColor", "#ffffff")}
            ></div>
            <div
              className={`color-option ${chatbotSettings.headerColor === "#000000" ? "selected" : ""}`}
              style={{ backgroundColor: "#000000" }}
              onClick={() => updateSetting("headerColor", "#000000")}
            ></div>
            <div
              className={`color-option ${chatbotSettings.headerColor === "#343f4b" ? "selected" : ""}`}
              style={{ backgroundColor: "#343f4b" }}
              onClick={() => updateSetting("headerColor", "#343f4b")}
            ></div>
          </div>
          <div className="color-preview-container">
            <div
              className="color-preview-box"
              style={{ backgroundColor: chatbotSettings.headerColor }}
            ></div>
            <div className="color-hex">
              <input
                type="text"
                value={chatbotSettings.headerColor}
                onChange={(e) => updateSetting("headerColor", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="customization-section">
          <h3>Custom Background Color</h3>
          <div className="color-options">
            <div
              className={`color-option ${chatbotSettings.backgroundColor === "#ffffff" ? "selected" : ""}`}
              style={{ backgroundColor: "#FAFBFC", border: "1px solid #ddd" }}
              onClick={() => updateSetting("backgroundColor", "#FAFBFC")}
            ></div>
            <div
              className={`color-option ${chatbotSettings.backgroundColor === "#000000" ? "selected" : ""}`}
              style={{ backgroundColor: "#000000" }}
              onClick={() => updateSetting("backgroundColor", "#000000")}
            ></div>
            <div
              className={`color-option ${chatbotSettings.backgroundColor === "#EEEEEE" ? "selected" : ""}`}
              style={{ backgroundColor: "#EEEEEE", border: "1px solid #ddd" }}
              onClick={() => updateSetting("backgroundColor", "#EEEEEE")}
            ></div>
          </div>
          <div className="color-preview-container">
            <div
              className="color-preview-box"
              style={{ backgroundColor: chatbotSettings.backgroundColor }}
            ></div>
            <div className="color-hex">
              <input
                type="text"
                value={chatbotSettings.backgroundColor}
                onChange={(e) =>
                  updateSetting("backgroundColor", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="customization-section">
          <h3>Customize Messages</h3>
          <div className="message-customization">
            <div className="edit-message">
              <input
                type="text"
                value={chatbotSettings.welcomeMessage}
                onChange={(e) =>
                  updateSetting("welcomeMessage", e.target.value)
                }
              />
              <button className="edit-button">
                <img src={assets.pen} alt="" />
              </button>
            </div>
            <div className="edit-message">
              <input
                type="text"
                value={chatbotSettings.placeholderText}
                onChange={(e) =>
                  updateSetting("placeholderText", e.target.value)
                }
              />
              <button className="edit-button">
                <img src={assets.pen} alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="customization-section">
          <div className="chatbot-form">
            <h4>Introduction Yourself</h4>
            <div className="form-group">
              <label>Your name</label>
              <input
                type="text"
                value={chatbotSettings.formData.name}
                onChange={(e) => handleFormDataChange("name", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Your Phone</label>
              <input
                type="text"
                value={chatbotSettings.formData.phone}
                onChange={(e) => handleFormDataChange("phone", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                value={chatbotSettings.formData.email}
                onChange={(e) => handleFormDataChange("email", e.target.value)}
              />
            </div>
            <button className="thank-you-button">Thank You!</button>
          </div>
        </div>

        <div className="customization-section">
          <h3>Welcome Message</h3>
          <div className="welcome-customization">
            <div className="edit-welcome">
              <textarea
                type="text"
                value={chatbotSettings.welcomeBubbleText}
                onChange={(e) => handleWelcomeBubbleChange(e.target.value)}
              />
              <button className="edit-button">
                <img src={assets.pen} alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className="customization-section">
          <h3>Missed chat timer</h3>
          <div className="timer-customization">
            <div className="timer-row">
              <input
                type="text"
                className="timer-input"
                value={chatbotSettings.missedChatTimer.hours}
                onChange={(e) => handleTimerChange("hours", e.target.value)}
              />
              <span>:</span>
              <input
                type="text"
                className="timer-input"
                value={chatbotSettings.missedChatTimer.minutes}
                onChange={(e) => handleTimerChange("minutes", e.target.value)}
              />
              <span>:</span>
              <input
                type="text"
                className="timer-input"
                value={chatbotSettings.missedChatTimer.seconds}
                onChange={(e) => handleTimerChange("seconds", e.target.value)}
              />
            </div>
            <div className="ampm-row">
              <button
                className={`ampm-button ${chatbotSettings.missedChatTimer.ampm === "AM" ? "active" : ""}`}
                onClick={() => handleTimerChange("ampm", "AM")}
              >
                AM
              </button>
              <button
                className={`ampm-button ${chatbotSettings.missedChatTimer.ampm === "PM" ? "active" : ""}`}
                onClick={() => handleTimerChange("ampm", "PM")}
              >
                PM
              </button>
            </div>
            <button className="save-button" onClick={handleSaveSettings}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
