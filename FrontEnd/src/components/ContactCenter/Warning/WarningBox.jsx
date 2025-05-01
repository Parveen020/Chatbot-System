import React from "react";
import "./WarningBox.css";
import BackDrop from "../../BackDrop/BackDrop";

const WarningBox = ({ isVisible, onCancel, onConfirm, message }) => {
  if (!isVisible) return null;

  return (
    <div className="warning-box-container">
      <div className="warning-box">
        <p className="warning-message">{message}</p>
        <div className="warning-actions">
          <button className="warning-button cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="warning-button confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
      <BackDrop />
    </div>
  );
};

export default WarningBox;
