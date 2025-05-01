import { AdminContext } from "../Context/AdminContext";
import "./ChartAnalysis.css";
import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const ChartAnalysis = () => {
  const { missedChatsData } = useContext(AdminContext);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: 0, color: "white" }}>Chats</p>
          <p style={{ margin: 0, fontWeight: "bold", color: "white" }}>
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="missed-chats-container">
      <h2 className="missed-chats-title">Missed Chats</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={missedChatsData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00D907"
            strokeWidth={3}
            dot={{ stroke: "#000", strokeWidth: 2, fill: "#fff", r: 5 }}
            activeDot={{ r: 8 }}
          />
          <ReferenceLine x="Week 6" stroke="#000" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartAnalysis;
