import React, { useEffect, useState } from 'react'
import '../styles/StudentCourses.css'
import CourseList from '../components/CourseList';
import { getEnrolledCourses, syncCourses } from '../api/Api';

function StudentCourses() {
  const [courseStatus, setCourseStatus] = useState('live');
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const [trigger, setTrigger] = useState(false);

  const handleClick = async()=>{
    await syncCourses(); 
    setTrigger(prev=>!prev)
  }

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const courses = await getEnrolledCourses(courseStatus);
        setCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  },[courseStatus, trigger]);
  return (
    <div className='student-courses'>
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
      <button className='sync-courses-btn' onClick={handleClick}>Sync Courses</button>
      </div>
      {isLoading ? <div>Loading...</div> : <CourseList courses={courses}  setCourses={setCourses}/>}
    </div>
  )
}

export default StudentCourses