import React from "react";
import "./About.css";
import { assets } from "../../assets/assets";

const About = () => {
  return (
    <div className="about">
      <div className="slogan-box">
        <h1>At its core, Hubly is a robust CRM solution.</h1>
        <p>
          Hubly helps businesses streamline customer interactions, track leads,
          and automate tasks saving you time and maximizing revenue. Whether
          you're a startup or an enterprise, Hubly adapts to your needs, giving
          you the tools to scale efficiently.
        </p>
      </div>

      <div className="info-box">
        <div className="left-info-box">
          <h2>Multiple Platforms Together!</h2>
          <p>
            Email communication is a breeze with our fully integrated, drag &
            drop email builder.
          </p>

          <div className="stages">
            <div className="stage">
              <h2>Close</h2>
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound phone system & more!
              </p>
            </div>

            <div className="stage">
              <h2>Nurture</h2>
              <p>
                Capture leads using our landing pages, surveys, forms,
                calendars, inbound phone system & more!
              </p>
            </div>
          </div>
        </div>

        <div className="funnel-visualization">
          <div className="funnel-container">
            {/* Funnel Layers */}
            <div className="funnel-layer top-layer"></div>
            <div className="funnel-layer middle-layer"></div>
            <div className="funnel-layer bottom-layer"></div>

            <div className="stage-label capture-label">
              <span>CAPTURE</span>
              <div className="connector">
                <div className="dot"></div>
                <div className="line"></div>
                <div className="dot"></div>
              </div>
            </div>

            <div className="stage-label nurture-label">
              <span>NURTURE</span>
              <div className="connector">
                <div className="dot"></div>
                <div className="line"></div>
                <div className="dot"></div>
              </div>
            </div>

            <div className="stage-label close-label">
              <span>CLOSE</span>
              <div className="connector">
                <div className="dot"></div>
                <div className="line"></div>
                <div className="dot"></div>
              </div>
            </div>

            <div className="social-circle facebook">
              <span>
                <img src={assets.fb} alt="" className="circle-image" />
              </span>
            </div>

            <div className="social-circle whatsapp">
              <span>
                <img src={assets.wts} alt="" className="circle-image" />
              </span>
            </div>

            <div className="social-circle google">
              <span>
                <img src={assets.ads} alt="" className="circle-image" />
              </span>
            </div>

            <div className="social-circle messenger">
              <span>
                <img src={assets.msg} alt="" className="circle-image" />
              </span>
            </div>

            <div className="social-circle snapchat">
              <span>
                <img src={assets.snp} alt="" className="circle-image" />
              </span>
            </div>

            <div className="social-circle youtube">
              <span>
                <img src={assets.yt} alt="" className="circle-image" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
