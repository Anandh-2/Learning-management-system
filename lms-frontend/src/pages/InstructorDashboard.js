import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import Course from '../components/Course';
import '../styles/InstructorDashboard.css';
import { getCreatedCoursesCount, getNewCourses, getStudentsCountByInstructor } from '../api/Api';

// const dummyCourses = [
//   {
//     id:'1',
//     title: 'Course1',
//     instructor: 'Teacher1'
//   },
//   {
//     id:'2',
//     title: 'Course2',
//     instructor: 'Teacher2'
//   },
//   {
//     id:'3',
//     title: 'Course3',
//     instructor: 'Teacher3'
//   },
//   {
//     id:'4',
//     title: 'Course4',
//     instructor: 'Teacher4'
//   }
// ]


function InstructorDashboard() {
    const [newCourses, setNewCourses] = useState([]);
    const [academicYear, setAcademicYear] = useState('2025-2026');
    const [courseCount, setCourseCount] = useState(10);
    const [studentsCount, setStudentsCount] = useState(7);

    useEffect(() => {
      const fetchCreatedCoursesCount = async () => {
        const data = await getCreatedCoursesCount();
        setCourseCount(data);
      };
      fetchCreatedCoursesCount();

      const fetchStudentsCount = async () => {
        const data = await getStudentsCountByInstructor();
        setStudentsCount(data);
      };
      fetchStudentsCount();
      const fetchCourses = async () => {
        const data = await getNewCourses();
        console.log(data);
        setNewCourses(data);
      }
      fetchCourses();
    }, []);

  return (
    <div className="instructor-dashboard">
          <div className='cards-container'>
            <div className='card'>
              <div className='card-title'>No. of Courses</div>
              <div className='card-data'>{courseCount}</div>
            </div>
            <div className='card'>
              <div className='card-title'>No. of Students</div>
              <div className='card-data'>{studentsCount}</div>
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
              <Course key={course.id} id={course._id} title={course.title} instructor={course.instructor.username}/>
            ))}
          </div>
          </div>
    
        </div>
  );
}

export default InstructorDashboard;