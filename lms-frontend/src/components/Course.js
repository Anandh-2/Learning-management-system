import React from 'react'
import CourseImg from '../images/Course.jpg'
import '../styles/Course.css'
import { useNavigate } from 'react-router-dom'

function Course({course}) {
  const navigate = useNavigate();
  return (
    <div className='course' onClick={()=>navigate(`/${course._id}`)}>
      <img src={CourseImg} alt='course'/>
      <div id='course-details'>
        <h3>{course.title}</h3>
        <p>{course.instructor}</p>
      </div>
    </div>
  )
}

export default Course