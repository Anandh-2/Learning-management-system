import React, { useEffect, useState } from 'react'
import Course from '../components/Course';
import { getAllCourses } from '../api/Api';
import '../styles/AdminCourses.css';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const data = await getAllCourses();
      console.log(data);
      setCourses(data);
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className='admin-courses'>
      {/* <div className='filters'>
        <select>
          <option value="">All Courses</option>
          <option value="active">Active Courses</option>
          <option value="inactive">Inactive Courses</option>
        </select>
      </div> */}

      <div className='courses-list'>
        {isLoading ? (
          <p>Loading courses...</p>
        ) : (
          courses.map((course) => (
            <Course key={course._id} id={course._id} title={course.title} instructor={course.instructor.username} />
          ))
        )}
      </div>
    </div>
  )
}

export default AdminCourses