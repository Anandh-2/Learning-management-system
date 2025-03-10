import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import {loginUser} from "../api/Auth";

const defaultData = {
  email: "",
  password: "",
};

function Login() {
  const [userData, setUserData] = useState(defaultData);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!userData.email||!userData.password){
      alert('Please fill all field');
      return;
    }
    try{
      const response = await loginUser(userData);
      if(response?.data.token){
        localStorage.setItem("usertoken",response.data.token);
        navigate("/dashboard");
      }
      else{
        alert('Invalid credentials');
      }
      setUserData(defaultData);
    } catch(err){
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="user-in">
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
          <div className="user-in">
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
          <button type="submit">login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link
            to={"/register"}
            style={{ color: "blue", textDecoration: "none" }}
          >
            register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
