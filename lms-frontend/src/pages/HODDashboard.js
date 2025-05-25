import React from 'react';
import '../styles/Dashboard.css';

function HODDashboard() {
  return (
    <div className="dashboard">
      <h2>HOD Dashboard</h2>
      <div className="dashboard-section">
        <h3>Overview</h3>
        <p>Department: Computer Science</p>
        <p>Students: 48</p>
        <p>Instructors: 8</p>
      </div>
      <div className="dashboard-section">
        <h3>Actions</h3>
        <ul>
          <li>Approve Student Registrations</li>
          <li>Create Instructor Accounts</li>
          <li>View Course Reports</li>
        </ul>
      </div>
    </div>
  );
}

export default HODDashboard;
