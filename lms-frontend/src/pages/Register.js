import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/Auth";

const defaultData = {
  username: "",
  email: "",
  password: "",
  department: "Select one",
  year: "Select one"
};

function Register() {
  const [userData, setUserData] = useState(defaultData);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!userData.username||!userData.email||!userData.password||userData.department==="Select one"||userData.year==="Select one"){
      alert('Please fill all field');
      return;
    }
    try{
      const response = await registerUser(userData);
    if(response?.data.token){
      localStorage.setItem("usertoken", response.data.token);
      navigate("/dashboard");
    }
    else{
      alert('User already exists');
    }
    setUserData(defaultData);
    } catch(err){
      console.log(err);
    }
    
  };
  return (
    <div className="register">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
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
              type="text"
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
          <div className="user-input">
            <label htmlFor="department">Department:</label>
            <select id="department" name="department" onChange={handleChange}>
              <option value="Select one">Select one</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>
          <div className="user-input">
            <label htmlFor="year">Year:</label>
            <select id="year" name="year" onChange={handleChange}>
              <option value="Select one">Select one</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>
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
