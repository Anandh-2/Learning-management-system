import React from 'react';
import '../styles/Dashboard.css';

function AdminDashboard() {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-section">
        <h3>Stats</h3>
        <p>Total Users: 120</p>
        <p>Total Courses: 25</p>
        <p>Departments: 5</p>
      </div>
      <div className="dashboard-section">
        <h3>Actions</h3>
        <ul>
          <li>Create Academic Schedule</li>
          <li>Manage Departments</li>
          <li>Assign HODs</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
