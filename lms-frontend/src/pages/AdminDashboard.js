import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import Course from '../components/Course';
import { FaArrowRightLong } from "react-icons/fa6";


const dummyCourses = [
  {
    id:'1',
    title: 'Course1',
    instructor: 'Teacher1'
  },
  {
    id:'2',
    title: 'Course2',
    instructor: 'Teacher2'
  },
  {
    id:'3',
    title: 'Course3',
    instructor: 'Teacher3'
  },
  {
    id:'4',
    title: 'Course4',
    instructor: 'Teacher4'
  }
]

function AdminDashboard() {
  const [batchCount, setBatchCount] = useState('2');
  const [deptCount, setDeptCount] = useState('10');
  const [academicYear, setAcademicYear] = useState('2025-2026');

  const [newCourses, setNewCourses] = useState(dummyCourses);
  return (
    <div className="admin-dashboard">
      <div className='cards-container'>
        <div className='card'>
          <div className='card-title'>No. of Batches</div>
          <div className='card-data'>{batchCount}</div>
        </div>
        <div className='card'>
          <div className='card-title'>No. of Departments</div>
          <div className='card-data'>{deptCount}</div>
        </div>
        <div className='card'>
          <div className='card-title'>Current Academic Year</div>
          <div className='card-data'>{academicYear}</div>
        </div>
      </div>

      <div>
        <div>
          <div>Quick</div>
        </div>
      </div>

      <div className='course-row-list'>
      <div className='course-row-head'>
      <h2>Newly Added Courses</h2>
      <button className='more-btn'><FaArrowRightLong/></button>
      </div>
      <div className='course-row'>
        {newCourses.map((course)=>(
          <Course key={course.id} id={course.id} title={course.title} instructor={course.instructor}/>
        ))}
      </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
