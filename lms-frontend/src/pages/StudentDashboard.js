import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import Course from '../components/Course';
import '../styles/StudentDashboard.css';
import { getCompletedCoursesCount, getEnrolledCoursesCount, getNewCourses } from '../api/Api';

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
  const [newCourses, setNewCourses] = useState([]);
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [courseCount, setCourseCount] = useState(10);
  const [completedCoursesCount, setCompletedCoursesCount] = useState(7);

  useEffect(()=>{
    const fetchCoursesCount = async () => {
      const data = await getEnrolledCoursesCount();
      setCourseCount(data);
    }
    fetchCoursesCount();
    const fetchCompletedCoursesCount = async () => {
      const data = await getCompletedCoursesCount(); 
      setCompletedCoursesCount(data);
    }
    fetchCompletedCoursesCount();
    const fetchCourses = async () => {
      const data = await getNewCourses();
      console.log(data);
      setNewCourses(data);
    }
    fetchCourses();
  },[]);

  return (
    <div className="student-dashboard">
      <div className='cards-container'>
        <div className='card'>
          <div className='card-title'>No. of Courses Enrolled</div>
          <div className='card-data'>{courseCount}</div>
        </div>
        <div className='card'>
          <div className='card-title'>No. of Courses Completed</div>
          <div className='card-data'>{completedCoursesCount}</div>
        </div>
        <div className='card'>
          <div className='card-title'>Current Academic Year</div>
          <div className='card-data'>{academicYear}</div>
        </div>
      </div>

      {/* <div className='course-row-list'>
      <div className='course-row-head'>
      <h2>Recently Viewed Courses</h2>
      <button className='more-btn'><FaArrowRightLong/></button>
      </div>
      <div className='course-row'>
        {newCourses.map((course)=>(
          <Course key={course.id} id={course.id} title={course.title} instructor={course.instructor}/>
        ))}
      </div>
      </div> */}

      <div className='course-row-list'>
      <div className='course-row-head'>
      <h2>Newly Added Courses</h2>
      <button className='more-btn'><FaArrowRightLong/></button>
      </div>
      <div className='course-row'>
        {newCourses.map((course)=>(
          <Course key={course._id} id={course._id} title={course.title} instructor={course.instructor.username}/>
        ))}
      </div>
      </div>

    </div>
  );
}

export default StudentDashboard;