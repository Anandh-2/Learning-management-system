import React from 'react';
import '../styles/Dashboard.css';

function InstructorDashboard() {
  return (
    <div className="dashboard">
      <h2>Instructor Dashboard</h2>
      <div className="dashboard-section">
        <h3>Courses</h3>
        <ul>
          <li>Web Development - 32 Students</li>
          <li>Data Structures - 28 Students</li>
        </ul>
      </div>
      <div className="dashboard-section">
        <h3>Actions</h3>
        <ul>
          <li>Create New Course</li>
          <li>Upload Materials</li>
          <li>Review Student Progress</li>
        </ul>
      </div>
    </div>
  );
}

export default InstructorDashboard;