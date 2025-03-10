import React from 'react'
import CourseImg from '../images/Course.jpg'
import '../styles/Course.css'
import { useNavigate } from 'react-router-dom'

function Course({course}) {
  const navigate = useNavigate();
  return (
    <div className='course' onClick={()=>navigate(`/course/${course.id}`)}>
      <img src={CourseImg} alt='course'/>
      <div id='course-details'>
        <h3>{course.name}</h3>
        <p>Instructor name</p>
      </div>
    </div>
  )
}

export default Course