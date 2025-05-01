import React, { useContext, useState } from "react";
import "./Setting.css";
import { AdminContext } from "../../Context/AdminContext";
import BackDrop from "../BackDrop/BackDrop";

const Setting = () => {
  const {
    showTooltip,
    setShowTooltip,
    adminDetails,
    handleUpdate,
    handleUpdateSubmit,
  } = useContext(AdminContext);

  console.log(adminDetails);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>

      <div className="settings-content">
        <div className="edit-profile-section">
          <h3 className="section-title">Edit Profile</h3>
          <div className="underline"></div>

          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-input"
                value={adminDetails.firstName}
                onChange={handleUpdate}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-input"
                value={adminDetails.lastName}
                onChange={handleUpdate}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={adminDetails.email}
                  onChange={handleUpdate}
                />
                <button
                  type="button"
                  className="info-icon-button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  aria-label="Email information"
                >
                  <i className="info-icon">i</i>
                </button>
                {showTooltip && (
                  <div className="tooltip">
                    User will logged out immediately
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={adminDetails.password}
                  onChange={handleUpdate}
                />
                <button
                  type="button"
                  className="info-icon-button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  aria-label="Password information"
                >
                  <i className="info-icon">i</i>
                </button>
                {showTooltip && (
                  <div className="tooltip">
                    User will logged out immediately
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  value={adminDetails.confirmPassword}
                  onChange={handleUpdate}
                />
                <button
                  type="button"
                  className="info-icon-button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  aria-label="Confirm password information"
                >
                  <i className="info-icon">i</i>
                </button>
                {showTooltip && (
                  <div className="tooltip">
                    User will logged out immediately
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="save-button"
                onClick={handleUpdateSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <BackDrop />
    </div>
  );
};

export default Setting;
