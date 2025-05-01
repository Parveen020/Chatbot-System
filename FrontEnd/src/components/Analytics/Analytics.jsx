import React, { useContext } from "react";
import { LineChart, Line, XAxis, ReferenceLine } from "recharts";
import "./Analytics.css";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";
import ChartAnalysis from "../../ChartAnalysis/ChartAnalysis";

const Analytics = () => {
  const {
    averageReplyTime,
    resolvedCount,
    totalElapsedTime,
    totalTickets,
    missedChatsData,
  } = useContext(AdminContext);
  // const missedChatsData = [
  //   { week: "Week 1", value: 14 },
  //   { week: "Week 2", value: 8 },
  //   { week: "Week 3", value: 14 },
  //   { week: "Week 4", value: 9 },
  //   { week: "Week 5", value: 6 },
  //   { week: "Week 6", value: 12 },
  //   { week: "Week 7", value: 3 },
  //   { week: "Week 8", value: 9 },
  //   { week: "Week 9", value: 16 },
  //   { week: "Week 10", value: 17 },
  // ];

  // Highlighted data points
  // const highlightedPoints = [
  //   { week: "Week 3", value: 14 },
  //   { week: "Week 5", value: 12 },
  //   { week: "Week 8", value: 9 },
  //   { week: "Week 9", value: 16 },
  // ];

  const resolvedPercentage =
    totalTickets > 0 ? (resolvedCount / totalTickets) * 100 : 0;
  const strokeDashoffset = 282.6 * (1 - resolvedPercentage / 100);

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>

      {/* Missed Chats Section */}
      <div className="section">
        <h2 className="section-title">Missed Chats</h2>
        <div className="chart-container">
          <ChartAnalysis />
        </div>
      </div>

      {/* Average Reply Time Section */}
      <div className="section flex-section">
        <div className="section-content">
          <h2 className="section-title">Average Reply time</h2>
          <p className="para2">
            For highest customer satisfaction rates you should aim to reply to
            an incoming customer's message in 15 seconds or less. Quick
            responses will get you more conversations, help you earn customers
            trust and make more sales.
          </p>
        </div>
        <div className="metric-value">
          <span className="value">{averageReplyTime}</span>
          <span className="unit">min</span>
        </div>
      </div>

      {/* Resolved Tickets Section */}
      <div className="section flex-section">
        <div className="section-content">
          <h2 className="section-title">Resolved Tickets</h2>
          <p className="para2">
            A callback system on a website, as well as proactive invitations,
            help to attract even more customers. A separate round button for
            ordering a call with a small animation helps to motivate more
            customers to make calls.
          </p>
        </div>
        <div className="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#eee"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#00D907"
              strokeWidth="10"
              strokeDasharray="282.6"
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="progress-value">{resolvedPercentage}%</div>
        </div>
      </div>

      <div className="section flex-section final-value">
        <div className="section-content">
          <h2 className="section-title total-chats">Total Chats</h2>
          <p className="para2">
            This metric Shows the total number of chats for all Channels for the
            selected the selected period
          </p>
        </div>
        <div className="total-value">{totalTickets} Chats</div>
      </div>
    </div>
  );
};

export default Analytics;
