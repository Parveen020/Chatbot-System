import React, { useState, useEffect } from "react";
import "./Calender.css";

const Calender = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000); // updates every second

    return () => clearInterval(timer); // cleanup
  }, []);

  const currentMonth = date.toLocaleString("default", { month: "long" });
  const currentYear = date.getFullYear();
  const currentDay = date.getDate();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = getDaysInMonth(date.getMonth(), currentYear);

  return (
    <div className="calendar-box">
      <div className="calendar-header">
        {currentMonth} {currentYear}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          return (
            <span
              key={day}
              className={`day ${day === currentDay ? "today" : ""}`}
            >
              {day}
            </span>
          );
        })}
      </div>
      <div className="clock">
        <span>Time:</span>
        {date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    </div>
  );
};

export default Calender;
