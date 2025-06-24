import React from "react";
import dayjs from "dayjs";

export default function WeeklyView({ currentDate, events }) {
  
  const startOfWeek = currentDate.startOf("week").add(1, "day");
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  return (
    <div className="calendar-grid">
      {days.map((date, idx) => {
        const formattedDay = date.format("YYYY-MM-DD");

        const dayEvents = events.filter(
          (event) => event.date === formattedDay
        );

        return (
          <div key={idx} className="day-cell">
            <div className="date">{date.format("ddd DD")}</div>
            <ul className="events">
              {dayEvents.length > 0 ? (
                dayEvents.map((event, i) => (
                  <li key={i} className="event">
                    <span className="event-title">{event.title}</span>
                    <span className="event-time">{event.time}</span>
                  </li>
                ))
              ) : (
                <li className="no-event">No events</li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
