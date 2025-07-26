import React, { useEffect, useRef, useState } from 'react'
import CourseImg from '../images/Course.jpg'
import '../styles/Course.css'
import { useNavigate } from 'react-router-dom'
import { SlOptionsVertical } from "react-icons/sl";
import { useAuth } from '../context/AuthContext';

function Course({id, title, instructor, handleDelete}) {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [isOpOpen, setIsOpOpen] = useState(false);

  const optionRef = useRef();

  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(optionRef.current && !optionRef.current.contains(e.target)){
        setIsOpOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return ()=>document.removeEventListener('mousedown', handleClickOutside);
  },[]);

  return (
    <div className='course' onClick={() => navigate(`/course/${id}`)}>
      {user.role!=='student'&&<button className='option-btn' onClick={(e) => { e.stopPropagation(); setIsOpOpen(prev => !prev); }}>
        <SlOptionsVertical />
      </button>}

      {isOpOpen && (
        <div className='options' ref={optionRef}>
          <ul>
            <li>Publish</li>
            <li onClick={(e)=>{e.stopPropagation();handleDelete(id)}} style={{color:'red'}}>
              Delete
            </li>
          </ul>
        </div>
      )}

      <img src={CourseImg} alt='course' />
      <div id='course-details'>
        <h3>{title}</h3>
        <p>{instructor}</p>
      </div>
    </div>
  );
}

export default Course;
