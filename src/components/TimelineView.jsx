
import React from "react";
import dayjs from "dayjs";

export default function TimelineView({ events }) {
  const sorted = [...events].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
  );

  return (
    <div className="timeline-view">
      {sorted.map((event, idx) => (
        <div key={idx} className="timeline-event">
          <div className="timeline-title">{event.title}</div>
          <div className="timeline-meta">
            <span className="event-date">{event.date}</span>
            <span className="event-time">{event.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
