import React from "react";
import DayCell from "./DayCell";
import dayjs from "dayjs";

function Calendar({ currentDate, events }) {
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();  
  const daysInMonth = currentDate.daysInMonth();

  const today = dayjs();

  const cells = [];
  for (let i = 0; i < startDay + daysInMonth; i++) {
    const day = i - startDay + 1;
    const date = currentDate.date(day);
    const isToday = today.isSame(date, "day");

    const dayEvents = events.filter(event =>
      dayjs(event.date).isSame(date, "day")
    );

    cells.push(
      <DayCell
        key={i}
        day={day > 0 ? day : ""}
        isToday={isToday && day > 0}
        events={day > 0 ? dayEvents : []}
      />
    );
  }

  return (
    <div className="calendar-grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
        <div key={d} className="day-name">{d}</div>
      ))}
      {cells}
    </div>
  );
}

export default Calendar;
