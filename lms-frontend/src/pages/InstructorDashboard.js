import React from 'react'
import NavBar from '../components/NavBar'
import CourseList from '../components/CourseList'
import Footer from '../components/Footer'
import { getCreatedCourses } from '../api/Api'
function InstructorDashboard() {
  return (
    <div className="dashboard">
      <NavBar/>
      <CourseList title='Your Courses' fetchCourses={getCreatedCourses}/>
      <Footer/>
    </div>
  )
}

export default InstructorDashboard