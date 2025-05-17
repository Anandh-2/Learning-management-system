import React from "react";
import Course from "./Course";
import "../styles/CourseList.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function CourseList({courses}) {
  const navigate = useNavigate();

  return (
    <div className="course-list">
      {courses.length === 0 ? (
        <div>
        <p>No courses found</p>
        </div>
      ) : (
        <div id="courses">
        {console.log(courses)}
          {courses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
