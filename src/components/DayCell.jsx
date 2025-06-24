import React, { useState } from "react";
import "./Modal.css";

function DayCell({ day, isToday, events }) {
  const [modalEvent, setModalEvent] = useState(null);

  // Detect time conflicts
  const conflictingTimes = new Set();
  events.forEach((e1, i) => {
    for (let j = i + 1; j < events.length; j++) {
      if (e1.time === events[j].time) {
        conflictingTimes.add(e1.time);
      }
    }
  });

  return (
    <div className={`day-cell ${isToday ? "today" : ""}`}>
      <div className="date">{day}</div>

      <ul className="events">
        {events.map((event, idx) => (
          <li
  key={idx}
  className={`event ${conflictingTimes.has(event.time) ? "conflict" : ""}`}
  onClick={() => setModalEvent(event)}
>
  <span className="event-title">{event.title}</span>
  <span className="event-time">{event.time}</span>
</li>

        ))}
      </ul>

      {modalEvent && (
        <div className="modal-backdrop" onClick={() => setModalEvent(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modalEvent.title}</h3>
            <p><strong>Date:</strong> {modalEvent.date}</p>
            <p><strong>Time:</strong> {modalEvent.time}</p>
            <p><strong>Duration:</strong> {modalEvent.duration}</p>
            <button onClick={() => setModalEvent(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DayCell;
