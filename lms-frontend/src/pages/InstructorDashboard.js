import React from 'react'
import NavBar from '../components/NavBar'
import CourseList from '../components/CourseList'
import Footer from '../components/Footer'

function InstructorDashboard() {
  return (
    <div className="dashboard">
      <NavBar/>
      <CourseList name='Your Courses'/>
      <Footer/>
    </div>
  )
}

export default InstructorDashboard