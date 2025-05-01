import React from "react";
import "./Plans.css";

const Plans = () => {
  return (
    <div className="plans-container">
      <div className="plans-header">
        <h1>We have plans for everyone!</h1>
        <p>
          We started with a strong foundation, then simply built all of the
          sales and marketing tools ALL businesses need under one platform.
        </p>
      </div>

      <div className="plans-cards">
        <div className="plan-card">
          <h2>STARTER</h2>
          <p className="plan-description">
            Best for local businesses needing to improve their online
            reputation.
          </p>

          <div className="price-container">
            <span className="price-symbol">$</span>
            <span className="price-value">199</span>
            <span className="price-period">/monthly</span>
          </div>

          <div className="features-list">
            <h3>What's included</h3>
            <ul>
              <li>
                <span className="checkmark">✓</span> Unlimited Users
              </li>
              <li>
                <span className="checkmark">✓</span> GMB Messaging
              </li>
              <li>
                <span className="checkmark">✓</span> Reputation Management
              </li>
              <li>
                <span className="checkmark">✓</span> GMB Call Tracking
              </li>
              <li>
                <span className="checkmark">✓</span> 24/7 Award Winning Support
              </li>
            </ul>
          </div>

          <button className="signup-button">SIGN UP FOR STARTER</button>
        </div>

        <div className="plan-card">
          <h2>GROW</h2>
          <p className="plan-description">
            Best for all businesses that want to take full control of their
            marketing automation and track their leads, click to close.
          </p>

          <div className="price-container">
            <span className="price-symbol">$</span>
            <span className="price-value">399</span>
            <span className="price-period">/monthly</span>
          </div>

          <div className="features-list">
            <h3>What's included</h3>
            <ul>
              <li>
                <span className="checkmark">✓</span> Pipeline Management
              </li>
              <li>
                <span className="checkmark">✓</span> Marketing Automation
                Campaigns
              </li>
              <li>
                <span className="checkmark">✓</span> Live Call Transfer
              </li>
              <li>
                <span className="checkmark">✓</span> GMB Messaging
              </li>
              <li>
                <span className="checkmark">✓</span> Embed-able Form Builder
              </li>
              <li>
                <span className="checkmark">✓</span> Reputation Management
              </li>
              <li>
                <span className="checkmark">✓</span> 24/7 Award Winning Support
              </li>
            </ul>
          </div>

          <button className="signup-button">SIGN UP FOR STARTER</button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
