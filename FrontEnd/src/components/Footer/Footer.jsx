import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets.js";
import Logo from "../Logo/Logo.jsx";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <Logo />
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li>
                  <a href="#">Universal checkout</a>
                </li>
                <li>
                  <a href="#">Payment workflows</a>
                </li>
                <li>
                  <a href="#">Observability</a>
                </li>
                <li>
                  <a href="#">UpliftAI</a>
                </li>
                <li>
                  <a href="#">Apps & integrations</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Why Primer</h3>
              <ul>
                <li>
                  <a href="#">Expand to new markets</a>
                </li>
                <li>
                  <a href="#">Boost payment success</a>
                </li>
                <li>
                  <a href="#">Improve conversion rates</a>
                </li>
                <li>
                  <a href="#">Reduce payments fraud</a>
                </li>
                <li>
                  <a href="#">Recover revenue</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Developers</h3>
              <ul>
                <li>
                  <a href="#">Primer Docs</a>
                </li>
                <li>
                  <a href="#">API Reference</a>
                </li>
                <li>
                  <a href="#">Payment methods guide</a>
                </li>
                <li>
                  <a href="#">Service status</a>
                </li>
                <li>
                  <a href="#">Community</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-section">
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Success stories</a>
                </li>
                <li>
                  <a href="#">News room</a>
                </li>
                <li>
                  <a href="#">Terms</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>

            <div className="footer-column social-icons">
              <div className="social-icons-container">
                <a href="#" className="social-icon">
                  <img src={assets.message} alt="Email" />
                </a>
                <a href="#" className="social-icon">
                  <img src={assets.linkedin} alt="LinkedIn" />
                </a>
                <a href="#" className="social-icon">
                  <img src={assets.x} alt="Twitter" />
                </a>
                <a href="#" className="social-icon">
                  <img src={assets.youtube} alt="YouTube" />
                </a>
                <a href="#" className="social-icon">
                  <img src={assets.discord} alt="Discord" />
                </a>
                <a href="#" className="social-icon">
                  <img src={assets.figma} alt="Slack" />
                </a>
                <a href="#" className="social-icon">
                  <img src={assets.insta} alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
