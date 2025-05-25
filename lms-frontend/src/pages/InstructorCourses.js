import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";
import '../styles/InstructorCourses.css'
import { createCourse, getActiveSemesters, getCreatedCourses } from "../api/Api";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function InstructorCourses() {
  const [courseStatus, setCourseStatus] = useState("live");
  const [courses, setCourses] = useState([]);
  const [semester, setSemester] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseTitle = formData.get("courseTitle");
    const semesterId = formData.get("semesterId");
    const course = await createCourse({title:courseTitle, semester:semesterId});
    if(course){
      navigate(`/course/${course._id}`);
    }else{
      alert('Server error');
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const courses = await getCreatedCourses(courseStatus);
        setCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [courseStatus]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const semester = await getActiveSemesters();
        setSemester(semester);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      } 
    };

    fetchSemesters();
  }, []);


  return (
    <div className="instructor-courses">
    <div className="courses-header">
      <button style={{ color: courseStatus === "live" ? "#253D2C" : "#8dbc9c" }} className="course-status-btn" onClick={() => setCourseStatus("live")}>Live Courses</button>
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
      <button style={{ color: courseStatus === "past" ? "#253D2C" : "#8dbc9c" }} className="course-status-btn" onClick={() => setCourseStatus("past")}>Past Courses</button>
      <button className="add-course-btn" onClick={()=>setIsModalOpen(true)}>Add Course</button>
      </div>
      {isLoading ? <div>Loading...</div> : <CourseList
        courses={courses}
        setCourses={setCourses}
      />}
      {isModalOpen && <div className="new-course-bg">
        <div className="new-course-modal">
        <button className="close-btn" onClick={() => setIsModalOpen(false)}><IoClose /></button>
          <h2 className="new-course-title">Create New Course</h2>
          <form className="new-course-form" onSubmit={handleSubmit}>
            <input name="courseTitle" type="text" placeholder="Course Title" className="new-course-input" />
            <select name="semesterId" className="new-course-select">
            <option value="">Select Semester</option>
              {semester.map((sem) => (
                <option key={sem._id} value={sem._id}>
                  {sem.name}
                </option>
              ))}
            </select>
            <button type="submit" className="new-course-submit">Create Course</button>
          </form>
        </div>
      </div>}
    </div>
  );
}

export default InstructorCourses;
