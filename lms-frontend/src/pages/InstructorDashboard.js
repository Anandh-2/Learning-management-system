import React from 'react'
import CourseList from '../components/CourseList'
import Footer from '../components/Footer'
import { getCreatedCourses } from '../api/Api'
function InstructorDashboard() {
  return (
    <div className="dashboard">
      <CourseList title='Your Courses' fetchCourses={getCreatedCourses}/>
    </div>
  )
}

export default InstructorDashboard