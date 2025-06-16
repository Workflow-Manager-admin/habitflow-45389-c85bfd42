import React, { useState } from "react";
import "./HabitList.css";

/**
 * PUBLIC_INTERFACE
 * HabitList component - displays a responsive grid of pastel-styled habit cards.
 * Each card: habit name, frequency, streak count with icon, "Done for Today" checkbox, edit/delete icons.
 * Responsive: 2-column grid (desktop), 1-column (mobile).
 */
function HabitList({ habits: propsHabits, onToggleDone, onDelete, onEdit }) {
  // If no habits passed, use example habits (for empty state / default preview)
  const [habits, setHabits] = useState(
    propsHabits && propsHabits.length
      ? propsHabits
      : [
          {
            id: 1,
            habitName: "Drink Water",
            frequency: "Daily",
            streak: 5,
            doneToday: false,
          },
          {
            id: 2,
            habitName: "Read 10 Pages",
            frequency: "Daily",
            streak: 12,
            doneToday: true,
          },
          {
            id: 3,
            habitName: "Meditate",
            frequency: "Weekly",
            streak: 3,
            doneToday: false,
          },
        ]
  );

  // Handler for "Done for Today" checkbox
  function handleToggleDone(id) {
    if (onToggleDone) {
      onToggleDone(id);
    } else {
      setHabits(habits =>
        habits.map(h =>
          h.id === id ? { ...h, doneToday: !h.doneToday } : h
        )
      );
    }
  }
  // Handler for delete icon
  function handleDelete(id) {
    if (onDelete) {
      onDelete(id);
    } else {
      setHabits(habits => habits.filter(h => h.id !== id));
    }
  }
  // Handler for edit icon
  function handleEdit(id) {
    onEdit && onEdit(id);
    // No local edit behavior by default
  }

  return (
    <div className="habit-list-grid">
      {habits.map(habit => (
        <div
          className={`habit-card${habit.doneToday ? " habit-card-done" : ""}`}
          key={habit.id}
        >
          <div className="habit-card-row habit-card-header">
            <div className="habit-card-title">{habit.habitName}</div>
            <div className="habit-card-actions">
              {/* Edit Icon: pencil */}
              <span
                className="habit-card-icon"
                title="Edit"
                tabIndex={0}
                onClick={() => handleEdit(habit.id)}
                role="button"
                aria-label="Edit habit"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    d="M13.5 2.5a1.4 1.4 0 0 1 2 2L6.5 13.5 3 15l1.5-3.5L13.5 2.5z"
                    fill="#845ec2"
                  />
                </svg>
              </span>
              {/* Delete Icon: trash */}
              <span
                className="habit-card-icon"
                title="Delete"
                tabIndex={0}
                onClick={() => handleDelete(habit.id)}
                role="button"
                aria-label="Delete habit"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <rect x="5" y="6.5" width="8" height="8" rx="2" fill="#ff6f91"/>
                  <rect x="7" y="3.5" width="4" height="2" rx="1" fill="#845ec2"/>
                </svg>
              </span>
            </div>
          </div>
          <div className="habit-card-row">
            <span className="habit-card-label">Frequency:</span>{" "}
            <span className="habit-card-value">{habit.frequency}</span>
          </div>
          <div className="habit-card-row streak-row">
            <span className="habit-card-label">Streak:</span>
            <span className="habit-streak-badge">
              {/* Flame SVG for streak */}
              <svg width="15" height="15" viewBox="0 0 15 15">
                <path
                  d="M8 2 Q9 5, 11 7 Q13 9, 7.5 14 Q2 9, 4 7 Q5 5, 7 2 Z"
                  fill="#f4c2c2"
                  stroke="#ff7f50"
                  strokeWidth="0.7"
                />
                <circle cx="7.5" cy="11" r="2" fill="#fff7fa" />
              </svg>{" "}
              <span className="habit-streak-count">{habit.streak}</span>
            </span>
          </div>
          <div className="habit-card-row done-checkbox-row">
            <label className="habit-done-label">
              <input
                type="checkbox"
                checked={habit.doneToday}
                onChange={() => handleToggleDone(habit.id)}
                className="habit-done-checkbox"
              />
              <span>
                Done for Today
              </span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HabitList;
