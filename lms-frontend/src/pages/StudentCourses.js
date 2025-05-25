import React, { useState } from 'react'
import '../styles/StudentCourses.css'

function StudentCourses() {
  const [courseStatus, setCourseStatus] = useState('live');
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
      </div>
    </div>
  )
}

export default StudentCourses