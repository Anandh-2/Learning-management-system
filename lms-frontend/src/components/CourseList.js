import React from "react";
import Course from "./Course";
import "../styles/CourseList.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../api/Api";


function CourseList({courses, setCourses}) {
  const navigate = useNavigate();
  const handleDelete = async(courseId)=>{
    try{
      await deleteCourse(courseId);
      setCourses(courses=>courses.filter(course=>course._id!==courseId));
    }catch(err){
      alert('Error deleting course');
    }
  }

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
            <Course key={course._id} id={course._id} title={course.title} instructor={course.instructor.username} handleDelete={handleDelete}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
