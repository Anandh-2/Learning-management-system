import React, { useState } from 'react'
import CourseImg from '../images/Course.jpg'
import '../styles/Course.css'
import { useNavigate } from 'react-router-dom'
import { SlOptionsVertical } from "react-icons/sl";

function Course() {
  const course = { _id: '1', title: "Java", instructor: "Anandh" }; 
  const navigate = useNavigate();
  const [isOpOpen, setIsOpOpen] = useState(false);

  return (
    <div className='course' onClick={() => navigate(`/${course._id}`)}>
      <button className='option-btn' onClick={(e) => { e.stopPropagation(); setIsOpOpen(prev => !prev); }}>
        <SlOptionsVertical />
      </button>

      {isOpOpen && (
        <div className='options'>
          <ul>
            <li onClick={(e) => { e.stopPropagation(); navigate(`/${course._id}/edit`); }}>
              Edit
            </li>
          </ul>
        </div>
      )}

      <img src={CourseImg} alt='course' />
      <div id='course-details'>
        <h3>{course.title}</h3>
        <p>{course.instructor}</p>
      </div>
    </div>
  );
}

export default Course;
