import React, { useState } from "react";
import "../styles/Users.css"; 

const allUsers = [
  
  { id: 1, name: "Alice Smith", email: "alice@school.edu", department: "ece", role: "Teacher", batch: "2024" },
  { id: 2, name: "Bob Johnson", email: "bob@school.edu", department: "ece", role: "Student", batch: "2024" },
];

export default function Users() {
  const [filters, setFilters] = useState({ role: "", department: "", batch: "" });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredUsers = allUsers.filter(user =>
    (filters.role === "" || user.role === filters.role) &&
    (filters.department === "" || user.department === filters.department) &&
    (filters.batch === "" || user.batch === filters.batch)
  );

  return (
    <div className="user-table-container">
      <h1 className="table-title">User List</h1>

      <div className="filters">
        <select name="role" value={filters.role} onChange={handleChange}>
          <option value="">All Roles</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="HOD">HOD</option>
        </select>

        <select name="department" value={filters.department} onChange={handleChange}>
          <option value="">All Departments</option>
          <option value="ece">ECE</option>
          <option value="cse">CSE</option>
          <option value="mech">MECH</option>
        </select>

        <select name="batch" value={filters.batch} onChange={handleChange}>
          <option value="">All Batches</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Batch</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.department}</td>
                  <td>{user.email}</td>
                  <td>{user.batch}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-users">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

