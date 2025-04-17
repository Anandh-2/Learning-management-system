import React, { useEffect, useState } from "react";
import Course from "./Course";
import "../styles/CourseList.css";
import { useAuth } from "../context/AuthContext";
import { createCourse } from "../api/Api";
import { useNavigate } from "react-router-dom";

const defaultData = {
  courseName:"",
  courseCode:""
};

function CourseList({ title, fetchCourses }) {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses: ", err);
      }
    };
    loadCourses();
  }, []);

  const [newCourseData, setNewCourseData] = useState(defaultData);

  const handleChange = (e)=>{
    const {name,value}=e.target;
    setNewCourseData({
      ...newCourseData,
      [name]:value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!newCourseData.courseCode||!newCourseData.courseName){
      alert('Please fill all fields');
      return;
    }
    try{
      console.log(newCourseData);
      await createCourse(newCourseData);
      navigate(`/course/${newCourseData.courseCode}`);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="course-list">
      <h2>{title}</h2>
      {courses.length === 0 ? (
        <div>
        <p>No courses found</p>
        {user!=="student" && <button onClick={()=>setIsDialogOpen((prev)=>!prev)}>Create your first course</button>}
        </div>
      ) : (
        <div id="courses">
        {console.log(courses)}
          {courses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
          {user !== "student" && <button onClick={()=>setIsDialogOpen((prev)=>!prev)}>Add Course</button>}
        </div>
      )}
      {isDialogOpen && <form onSubmit={handleSubmit}>
        <label htmlFor="courseName">Course Name:</label>
        <input 
          type="text"
          id="courseName"
          name="courseName"
          placeholder="Course name"
          value={newCourseData.courseName}
          onChange={handleChange}
        />
        <label htmlFor="courseCode">Course Code:</label>
        <input
          type="text"
          id="courseCode"
          name="courseCode"
          placeholder="Course code"
          value={newCourseData.courseCode}
          onChange={handleChange}
        />
        <button type="submit">Create course</button>
      </form>}
    </div>
  );
}

export default CourseList;
