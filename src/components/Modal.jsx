// src/components/Modal.jsx
import React, { useState } from "react";
import "./Modal.css"; // Add styling

export default function Modal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.title && form.date && form.time) {
      onSave(form);
    } else {
      alert("Please fill in title, date, and time.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Task</h3>
        <input name="title" placeholder="Event Title" onChange={handleChange} />
        <input name="date" type="date" onChange={handleChange} />
        <input name="time" type="time" onChange={handleChange} />
        <input name="duration" placeholder="Duration (e.g. 1h)" onChange={handleChange} />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
