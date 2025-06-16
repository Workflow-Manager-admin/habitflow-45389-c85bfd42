import React, { useState } from "react";
import "./AddHabitCard.css";

/**
 * PUBLIC_INTERFACE
 * AddHabitCard component - displays a centered card for adding a new habit.
 * Includes fields for habit name, frequency (Daily/Weekly/Monthly), start date, and a colorful pastel-styled button.
 */
function AddHabitCard({ onAddHabit }) {
  // Local state for form fields
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState("");

  // Handler for form submit
  function handleSubmit(e) {
    e.preventDefault();
    // Simple validation: require habit name and start date
    if (habitName.trim() && startDate) {
      if (onAddHabit) {
        onAddHabit({ habitName: habitName.trim(), frequency, startDate });
      }
      setHabitName("");
      setFrequency("Daily");
      setStartDate("");
    }
  }

  return (
    <div className="add-habit-card-outer">
      <div className="add-habit-card">
        <h2 className="add-habit-title">Add New Habit</h2>
        <form className="add-habit-form" onSubmit={handleSubmit}>
          <label className="add-habit-label" htmlFor="habit-name">
            Habit Name
          </label>
          <input
            className="add-habit-input"
            id="habit-name"
            type="text"
            placeholder="e.g. Drink Water"
            value={habitName}
            autoComplete="off"
            onChange={e => setHabitName(e.target.value)}
            required
          />

          <label className="add-habit-label" htmlFor="habit-frequency">
            Frequency
          </label>
          <select
            className="add-habit-select"
            id="habit-frequency"
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <label className="add-habit-label" htmlFor="habit-start-date">
            Start Date
          </label>
          <input
            className="add-habit-input"
            id="habit-start-date"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />

          <button
            className="btn btn-large add-habit-btn"
            style={{
              backgroundColor: "#F4C2C2",
              color: "#222c38",
              marginTop: "20px",
              fontWeight: 600,
              fontFamily: "inherit",
            }}
            type="submit"
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHabitCard;
