import React, { useEffect, useState } from "react";
import "../styles/Users.css";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  getBatches,
  getAllDepartments,
  getUsers,
  approveUser,
  rejectUser,
  blockUser,
  deleteUser,
} from "../api/Api";
import { useAuth } from "../context/AuthContext";

// const allUsers = [

//   // { id: 1, username: "Alice Smith", rollNo:60,email: "alice@school.edu", department: {name:"ECE"}, role: "instructor", batch: {name:"2024"} },
//   // { id: 2, username: "Bob Johnson", rollNo:61,email: "bob@school.edu", department: {name:"EEE"}, role: "student", batch: {name:"2024"} },
// ];

export default function Users({ mode }) {
  const { user } = useAuth();
  const location = useLocation();
  const [filters, setFilters] = useState({
    role: location.state?.role || "student",
    department: location.state?.department || "",
    batch: location.state?.batch || "",
    status: "",
    isVerified: mode === "users" ? true : false,
  });
  const [users, setUsers] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({ ...filters, department: "", batch: "", status: "" });
  };

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Sorry, approval unsuccessful!");
    }
  };

  const handleReject = async (userId) => {
    try {
      await rejectUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Sorry, rejection unsuccessful!");
    }
  };

  const handleBlock = async (userId) => {
    try {
      await blockUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Sorry, blocking unsuccessful!");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      alert("Sorry, deletion unsuccessful!");
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getAllDepartments();
      setDepartments(data);
    };

    const fetchBatches = async () => {
      const data = await getBatches();
      setBatches(data);
    };

    fetchDepartments();
    fetchBatches();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const query = new URLSearchParams(filters).toString();
      //console.log(query);
      console.log('Fetching with filters:', filters);

      setIsLoading(true);
      const data = await getUsers({ query });
      setUsers(data);
      setIsLoading(false);
    };
    fetchUsers();
  }, [filters]);

  useEffect(()=>{
    setFilters((prevFilters) => ({
      ...prevFilters,
      isVerified: mode === "users" ? true : false,
    }));
  },[mode]);

  return (
    <div className="users-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setFilters({ ...filters, role: "student" })}
          className="table-title"
          style={{ color: filters.role === "student" ? "#253D2C" : "#8dbc9c" }}
        >
          Students
        </button>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          {" "}
          |
        </div>
        <button
          onClick={() => setFilters({ ...filters, role: "instructor" })}
          className="table-title"
          style={{
            color: filters.role === "instructor" ? "#253D2C" : "#8dbc9c",
          }}
        >
          Instructors
        </button>
      </div>
      <div className="filters">
        {/* <select name="role" value={filters.role} onChange={handleChange}>
          <option value="">All Roles</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="HOD">HOD</option>
        </select> */}

        {user.role === "admin" && (
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        )}

        {filters.role === "student" && (
          <select name="batch" value={filters.batch} onChange={handleChange}>
            <option value="">All Batches</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name}
              </option>
            ))}
          </select>
        )}

        {mode === "users" && (
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        )}

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              {filters.role === "student" && <th>Roll</th>}
              <th>Department</th>
              <th>Email</th>
              {filters.role === "student" && <th>Batch</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={filters.role === "student" ? 6 : 5}>
                  {isLoading ? "Loading..." : "No users found."}
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  {filters.role === "student" && <td>{user.rollNo}</td>}
                  <td>{user.department?.name}</td>
                  <td>{user.email}</td>
                  {filters.role === "student" && <td>{user.batch?.name}</td>}
                  <td>
                    {mode === "users" ? (
                      <div className="user-action-btns">
                        <button
                          onClick={() => handleBlock(user._id)}
                          style={{ backgroundColor: "orange" }}
                        >
                          Block
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          style={{ backgroundColor: "red" }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="user-action-btns">
                        <button onClick={() => handleApprove(user._id)}>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user._id)}
                          style={{ backgroundColor: "red" }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
