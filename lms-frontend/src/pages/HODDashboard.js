import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCourses, getNewCourses, getUsers } from '../api/Api';
import { FaArrowRightLong } from "react-icons/fa6";
import '../styles/HODDashboard.css';

function HODDashboard() {
    const [isLoading, setIsLoading] = useState({requests: false, courses: false});
  const [studentsCount, setStudentsCount] = useState('2');
  const [instructorsCount, setInstructorsCount] = useState('10');
  const [academicYear, setAcademicYear] = useState('2025-2026');

  const [newCourses, setNewCourses] = useState([]);

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
          const query = new URLSearchParams({isVerified:false}).toString();
          // console.log('Fetching with filters:', query);
          setIsLoading(prev => ({...prev, requests: true}));
          const data = await getUsers({ query });
          setUsers(data.splice(0, 5)); 
          setIsLoading(prev => ({...prev, requests: false}));
        };
  
        const fetchCourses = async () => {
          setIsLoading(prev => ({...prev, courses: true}));
          const data = await getNewCourses();
          setNewCourses(data);
          setIsLoading(prev => ({...prev, courses: false}));
        };
        fetchUsers();
        fetchCourses();
      }, []);
  

  return (
    <div className="hod-dashboard">
     <div className='cards-container'>
        <div className='card'>
          <div className='card-title'>No. of Students</div>
          <div className='card-data'>{studentsCount}</div>
        </div>
        <div className='card'>
          <div className='card-title'>No. of Instructors</div>
          <div className='card-data'>{instructorsCount}</div>
        </div>
        <div className='card'>
          <div className='card-title'>Current Academic Year</div>
          <div className='card-data'>{academicYear}</div>
        </div>
      </div>
      <div className='quick-actions'>
              <div className='pending-approvals'>
              <div className='row-head'>
                <h2>Pending Approvals</h2>
                <button className='more-btn' onClick={()=>navigate('/admin/requests')}><FaArrowRightLong/></button>
                </div>
                <div style={{padding: '0 20px 20px 20px'}}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading.requests ? (
                        <tr>
                          <td colSpan="3">Loading...</td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.department?.name || 'N/A'}</td>
                            <td>{user.role}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='new-courses'>
                <div className='row-head'>
                <h2>New courses</h2>
                <button className='more-btn' onClick={()=>navigate('/admin/courses')}><FaArrowRightLong/></button>
                </div>
                <div style={{padding: '0 20px 20px 20px'}}>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Instructor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading.courses ? (
                      <tr>
                        <td colSpan="2">Loading...</td>
                      </tr>
                    ) : (
                      newCourses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.instructor.username}</td>
                      </tr>
                    )))}
                  </tbody>
                </table>
                  
                </div>
              </div>
            </div>
    </div>
  );
}

export default HODDashboard;
