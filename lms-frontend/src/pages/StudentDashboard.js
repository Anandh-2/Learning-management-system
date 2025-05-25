import React from 'react';
import '../styles/Dashboard.css';

function StudentDashboard() {
  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <div className="dashboard-section">
        <h3>My Courses</h3>
        <ul>
          <li>Operating Systems</li>
          <li>Software Engineering</li>
          <li>Artificial Intelligence</li>
        </ul>
      </div>
      <div className="dashboard-section">
        <h3>Upcoming Deadlines</h3>
        <ul>
          <li>Assignment 1 - May 25</li>
          <li>Quiz 2 - May 28</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentDashboard;