import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import Course from '../components/Course';
import '../styles/StudentDashboard.css';

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

function StudentDashboard() {
  const [newCourses, setNewCourses] = useState(dummyCourses);
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [courseCount, setCourseCount] = useState(10);
  const [currentSemester, setCurrentSemester] = useState(7);

  return (
    <div className="student-dashboard">
      <div className='cards-container'>
        <div className='card'>
          <div className='card-title'>No. of Courses Enrolled</div>
          <div className='card-data'>{courseCount}</div>
        </div>
        <div className='card'>
          <div className='card-title'>Current Semester</div>
          <div className='card-data'>{currentSemester}</div>
        </div>
        <div className='card'>
          <div className='card-title'>Current Academic Year</div>
          <div className='card-data'>{academicYear}</div>
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

export default StudentDashboard;