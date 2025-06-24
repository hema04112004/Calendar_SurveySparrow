
import React from "react";
import dayjs from "dayjs";

export default function Sidebar({ events, currentDate }) {

  const thisMonth = currentDate.format("YYYY-MM");
  const upcoming = events
    .filter((event) => event.date.startsWith(thisMonth))
    .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

  return (
    <div className="sidebar">
      <div>
        <h2 className="logo-section">
          <span className="google-icon">📅</span> CalendarApp
        </h2>

        <ul>
          <li className="active">Events</li>
          <li>Settings</li>
        </ul>

        <h3 style={{ marginTop: "2rem" }}>📅 Upcoming</h3>
        <ul className="upcoming-list">
          {upcoming.length === 0 ? (
            <li className="no-upcoming">No events this month</li>
          ) : (
            upcoming.map((event, index) => (
              <li key={index} className="upcoming-item">
                <span>🗓️ {dayjs(event.date).format("DD MMM")}</span>
                <div>{event.title}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
