import React from "react";
import "./HabitCalendar.css";

/**
 * PUBLIC_INTERFACE
 * HabitCalendar component - renders a minimalist, month-view calendar for habit tracking.
 * Visualizes completed days (checkmark), streaks (green), missed days (red), and uses neutral/soft tones and rounded borders.
 * 
 * Props:
 * - completedDates: array of dates completed (YYYY-MM-DD)
 * - currentMonth: a Date object for the current displayed month (defaults to system date)
 * - streakData: optional extra information for streaks/missed days [{ date: 'YYYY-MM-DD', status: 'good'|'missed'|'normal' }]
 *   (If not provided, completedDates marks "good", others normal/missed.)
 */
function getMonthMatrix(month, year) {
  // Returns an array of weeks for the given month; each week is an array of day info objects.
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay(); // 0-Sun, 6-Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Previous month's last few days (backfill)
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

  let matrix = [];
  let week = [];
  // Fill the first week with prev month's padding if needed
  for (let i = 0; i < firstDayOfWeek; i++) {
    week.push({
      date: new Date(prevMonthYear, prevMonth, daysInPrevMonth - firstDayOfWeek + 1 + i),
      inMonth: false
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push({
      date: new Date(year, month, day),
      inMonth: true
    });
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  // Fill last week with next month's padding if needed
  if (week.length > 0) {
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextMonthYear = month === 11 ? year + 1 : year;
    for (let i = 1; week.length < 7; i++) {
      week.push({
        date: new Date(nextMonthYear, nextMonth, i),
        inMonth: false
      });
    }
    matrix.push(week);
  }
  return matrix;
}

function dateToStr(date) {
  // Converts Date to YYYY-MM-DD string
  return date.toISOString().slice(0, 10);
}

function HabitCalendar({
  completedDates = [],
  currentMonth = new Date(),
  streakData = null
}) {
  // For demonstration, if no streakData, infer based on completedDates
  // Map streakData as { [dateStr]: { status: 'good'|'missed'|'normal'|'none', completed: bool } }
  let statusByDate = {};
  if (streakData && Array.isArray(streakData)) {
    streakData.forEach(item => {
      statusByDate[item.date] = {
        status: item.status || (item.completed ? "good" : "missed"),
        completed: Boolean(item.completed)
      };
    });
  } else {
    // Simple: good if completed, missed if before today and not completed, normal otherwise
    const today = new Date();
    let prevCompleted = false;
    // Make a set for O(1) lookup
    const completedSet = new Set(completedDates);
    // Loop through the month
    let month = currentMonth.getMonth();
    let year = currentMonth.getFullYear();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      let dt = new Date(year, month, d);
      let dtStr = dateToStr(dt);
      if (completedSet.has(dtStr)) {
        statusByDate[dtStr] = { status: "good", completed: true };
        prevCompleted = true;
      } else if (
        dt < new Date(today.getFullYear(), today.getMonth(), today.getDate())
      ) {
        statusByDate[dtStr] = { status: "missed", completed: false };
        prevCompleted = false;
      } else {
        statusByDate[dtStr] = { status: "normal", completed: false };
      }
    }
  }

  // Month/year for header (e.g. May 2024)
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const weeks = getMonthMatrix(month, year);
  const todayStr = dateToStr(new Date());

  return (
    <div className="habit-calendar-outer fade-in">
      <h3 className="habit-calendar-title" style={{fontFamily: "'Poppins','Inter',Arial,sans-serif"}}>
        {monthNames[month]} {year} <span role="img" aria-label="calendar">📅</span>
      </h3>
      <div className="habit-calendar">
        <div className="habit-calendar-row habit-calendar-daynames">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(name => (
            <div className="habit-calendar-dayname" key={name}>{name}</div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div className="habit-calendar-row" key={wi}>
            {week.map((dayInfo, di) => {
              const dateStr = dateToStr(dayInfo.date);
              const status = statusByDate[dateStr] ? statusByDate[dateStr].status : "none";
              const completed = statusByDate[dateStr] ? statusByDate[dateStr].completed : false;
              const isToday = dateStr === todayStr;
              const classes = [
                "habit-calendar-cell",
                !dayInfo.inMonth ? "not-in-month" : "",
                status === "good" ? "cell-good" : "",
                status === "missed" ? "cell-missed" : "",
                status === "normal" ? "cell-normal" : "",
                isToday ? "cell-today" : ""
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <div
                  className={classes}
                  key={di}
                  aria-current={isToday ? "date" : undefined}
                >
                  <span className="cell-date">{dayInfo.date.getDate()}</span>
                  {completed && (
                    <span className="cell-check" role="img" aria-label="Done">
                      ✔️
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="habit-calendar-legend" style={{fontFamily: "'Poppins','Inter',Arial,sans-serif"}}>
        <span className="legend-item"><span className="legend-swatch swatch-good"></span> Streak/Completed</span>
        <span className="legend-item"><span className="legend-swatch swatch-missed"></span> Missed</span>
        <span className="legend-item cell-check">✔️</span> Done
      </div>
    </div>
  );
}

export default HabitCalendar;
