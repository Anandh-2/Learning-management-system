import React, { useState } from "react";
import "../styles/StudentDashboard.css";
import CourseList from "../components/CourseList";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { getEnrolledCourses } from "../api/Api";

function StudentDashboard() {
  
  return (
    <div className="dashboard">
      <NavBar/>
      <CourseList title='Your Courses' fetchCourses={getEnrolledCourses}/>
      <Footer/>
    </div>
  );
}

export default StudentDashboard;
