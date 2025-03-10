import React, { useState } from "react";
import "../styles/StudentDashboard.css";
import CourseList from "../components/CourseList";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function StudentDashboard() {
  
  return (
    <div className="dashboard">
      <NavBar/>
      <CourseList name='Your Courses'/>
      <Footer/>
    </div>
  );
}

export default StudentDashboard;
