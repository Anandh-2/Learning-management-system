import React, { useState } from "react";
import "../styles/StudentDashboard.css";
import CourseList from "../components/CourseList";
import Footer from "../components/Footer";
import { getEnrolledCourses } from "../api/Api";

function StudentDashboard() {
  
  return (
    <div className="dashboard">
      <CourseList courses={[]}/>
    </div>
  );
}

export default StudentDashboard;
