import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getActiveBatches,
  getAllDepartments,
  getDepartments,
  registerUser,
} from "../api/Api";

const defaultData = {
  username: "",
  rollNo: "",
  email: "",
  password: "",
  department: "Select one",
  role: "Select one",
  batch: "Select one",
};

function Register() {
  const [userData, setUserData] = useState(defaultData);

  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    if(name === 'role'){
      setUserData((prev)=>({
        ...prev,
        batch:"Select one"
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userData.username ||
      !userData.email ||
      !userData.password ||
      userData.department === "Select one" ||
      userData.role === "Select one" ||
      (userData.role === "student" && userData.batch === "Select one") ||
      (userData.role === "student" && !userData.rollNo)
    ) {
      alert("Please fill all field");
      return;
    }
    try {
      const registerData = userData.role==='student'?
      {
        ...userData
      }:
      {
        ...userData,
        batch:undefined,
        rollNo:undefined
      };

      const user = await registerUser(registerData);
      navigate("/successful-request", {
        state: {
          username: user.username,
        },
      });
      setUserData(defaultData);
    } catch (err) {
      console.log(err);
    }
    console.log(userData);
  };

  useEffect(() => {
    if (userData.batch === "Select one") {
      const fetchDepartments = async () => {
        const data = await getAllDepartments();
        setDepartments(data);
      };
      fetchDepartments();
      return;
    }
    const fetchBatchDepartments = async () => {
      const data = await getDepartments({ batchId: userData.batch });
      console.log(data);
      const depts = data.map((d)=>d.department);
      setDepartments(depts)
    };
    fetchBatchDepartments();
  }, [userData.batch]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getAllDepartments();
      setDepartments(data);
    };

    const fetchBatches = async () => {
      const data = await getActiveBatches();
      setBatches(data);
    };

    fetchDepartments();
    fetchBatches();
  }, []);
  return (
    <div className="register">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="register-fields">
            <div className="left-fields">
              <div className="user-input">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="user-input">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="user-input">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="right-fields">
              <div className="user-input">
                <label htmlFor="role">Are You A?:</label>
                <select
                  style={{
                    color: `${
                      userData.role === "Select one" ? "gray" : "#253D2C"
                    }`,
                  }}
                  id="role"
                  name="role"
                  onChange={handleChange}
                >
                  <option style={{ color: "gray" }} value="Select one">
                    Select one
                  </option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
              {userData.role === "student" && (
                <div className="user-input">
                  <label htmlFor="year">Batch:</label>
                  <select
                    style={{
                      color: `${
                        userData.batch === "Select one" ? "gray" : "#253D2C"
                      }`,
                    }}
                    id="batch"
                    name="batch"
                    onChange={handleChange}
                  >
                    <option style={{ color: "gray" }} value="Select one">
                      Select one
                    </option>
                    {batches.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="user-input">
                <label htmlFor="department">Department:</label>
                <select
                  style={{
                    color: `${
                      userData.department === "Select one" ? "gray" : "#253D2C"
                    }`,
                  }}
                  id="department"
                  name="department"
                  onChange={handleChange}
                >
                  <option style={{ color: "gray" }} value="Select one">
                    Select one
                  </option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {userData.role === "student" && (
            <div className="user-input">
              <label htmlFor="roll">Roll No:</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                placeholder="Roll no."
                value={userData.rollNo}
                onChange={handleChange}
              />
            </div>
          )}
          <button type="submit">register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to={"/login"} style={{ color: "blue", textDecoration: "none" }}>
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
