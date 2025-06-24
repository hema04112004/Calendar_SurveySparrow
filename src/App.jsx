import React, { useState, useEffect } from "react";
import Calendar from "./components/Calender";
import dayjs from "dayjs";
import "./index.css";
import Sidebar from "./components/Sidebar";
import WeeklyView from "./components/WeeklyView";
import TimelineView from "./components/TimelineView";
import Modal from "./components/Modal";  

function App() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState("monthly");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const toggleTheme = () => setDarkMode(!darkMode);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Sidebar events={events} currentDate={currentDate} />

      <div className="main">
        <header className="topbar">
          <div className="calendar-header">
            <h1>{currentDate.format("MMMM YYYY")}</h1>

            <div className="view-toggle">
              <button
                className={view === "monthly" ? "active" : ""}
                onClick={() => setView("monthly")}
              >
                Monthly
              </button>
              <button
                className={view === "weekly" ? "active" : ""}
                onClick={() => setView("weekly")}
              >
                Weekly
              </button>
              <button
                className={view === "timeline" ? "active" : ""}
                onClick={() => setView("timeline")}
              >
                Timeline
              </button>
            </div>

            <div className="nav">
              <button onClick={prevMonth}>⟨</button>
              <button onClick={nextMonth}>⟩</button>
            </div>
          </div>

          <div className="theme-toggle">
            <button className="create-btn" onClick={() => setShowModal(true)}>
              + Create
            </button>

            <label className="switch">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={darkMode}
              />
              <span className="slider"></span>
            </label>
            <span className="emoji">{darkMode ? "🌙" : "🌞"}</span>
          </div>
        </header>

        <main className="calendar-container">
          {view === "monthly" && (
            <Calendar currentDate={currentDate} events={events} />
          )}
          {view === "weekly" && (
            <WeeklyView currentDate={currentDate} events={events} />
          )}
          {view === "timeline" && <TimelineView events={events} />}
        </main>
      </div>

      
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onSave={handleAddEvent} />
      )}
    </div>
  );
}

export default App;
