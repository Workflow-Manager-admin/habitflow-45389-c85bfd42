import React from 'react';
import './App.css';
import Navbar from './Navbar';
import AddHabitCard from './AddHabitCard';
import HabitList from './HabitList';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <div className="container">
          <div style={{ paddingTop: 64, marginBottom: 20 }}>
            <AddHabitCard />
            {/* Below the add-habit, render the responsive habit list */}
            <HabitList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;