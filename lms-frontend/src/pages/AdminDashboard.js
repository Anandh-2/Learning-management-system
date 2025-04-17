import React from 'react'
import NavBar from '../components/NavBar.js'
import Footer from '../components/Footer.js'
import CourseList from '../components/CourseList.js'

function AdminDashboard() {
  return (
    <div>
    <NavBar/>
    <CourseList/>
    <CourseList/>
    <CourseList/>
    <Footer/>
    </div>
  )
}

export default AdminDashboard