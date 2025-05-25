import React, { useEffect, useState } from 'react';
import '../styles/BatchDepartments.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBatch, getDepartments } from '../api/Api';

function Departments() {

  const [isLoading, setIsLoading] = useState(false);
  const [batchDepts, setBatchDepts] = useState([]);
  const navigate = useNavigate();

  const {batchId} = useParams();

  const handleDelete = async()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this batch?");
    if(!confirmDelete) return;
    await deleteBatch(batchId);
    navigate('/admin/batches');
  }

  const handleUserClick = (departmentId, batchId, role)=>{
    navigate('/admin/users',{state:{
      department: departmentId,
      batch: batchId,
      role:role
    }});
  }

  const handleCourseClick = ()=>{

  }

  useEffect(()=>{
    const loadBatchDepts = async()=>{
      setIsLoading(true);
      const data = await getDepartments({batchId});
      setBatchDepts(data);
      setIsLoading(false);
    }

    loadBatchDepts();
  },[]);

  return (
    <div className='batch-departments'>
    <button className='delete-batch' onClick={handleDelete}>Delete Batch</button>
      <table>
        <thead>
          <tr>
            <th>Departments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading?
          <tr>
            <td colSpan="3">Loading...</td>
          </tr>
          :batchDepts.length===0?
          <tr>
            <td colSpan="3">No Departments Found</td>
          </tr>
          :batchDepts.map((bdept,index)=>(
            <tr key={index}>
              <td>{bdept.department.name}</td>
              <td>
                <div className='action-btns'>
                  <button className='action-btn' onClick={()=>handleUserClick(bdept.department._id, batchId, 'student')}>View Students</button>
                  <button className='action-btn' onClick={()=>handleUserClick(bdept.department._id, batchId, 'instructor')}>View Instructors</button>
                  <button className='action-btn' style={{backgroundColor:'blue'}} onClick={()=>handleCourseClick()}>View Courses</button>
                </div>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;
