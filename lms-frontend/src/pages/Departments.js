import React, { useEffect, useState } from 'react'
import { assignHOD, createDept, deleteDepartment, getAllDepartments, getUsers } from '../api/Api';
import '../styles/Departments.css';

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState({
      page:false,
      instructors:false
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [instructors, setInstructors] = useState([]);
    const [openInstructorsDeptId, setOpenInstructorsDeptId] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        try{
            const newDept = await createDept({deptName:formData.get('name')});
            setDepartments((prevDepartments) => [...prevDepartments, newDept]);
        }catch(err){
            console.error("Error creating department:", err);
            alert("Error creating department");
        }
        setIsModalOpen(false);
    }

    const handleDelete = async(departmentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
            try {
                await deleteDepartment(departmentId);
                setDepartments((prevDepartments) => prevDepartments.filter(dept => dept._id !== departmentId));
            } catch (err) {
                console.error("Error deleting department:", err);
                alert("Error deleting department");
            }
        }
    }

    const handleChangeHODClk = async(departmentId) => {
        setIsLoading((prevLoading) => ({ ...prevLoading, instructors: true }));
        setOpenInstructorsDeptId(departmentId);
        try {
            const data = await getUsers({query:`role=instructor&department=${departmentId}&status=active&isVerified=true`});
            console.log(data);
            setInstructors(data);
        } catch (err) {
            console.error("Error fetching instructors:", err);
            alert("Error fetching instructors");
        } finally {
            setIsLoading((prevLoading) => ({ ...prevLoading, instructors: false }));
        }
    }

    const handleChangeHOD = async(departmentId,instructorId) => {
      try{
        const updatedDept = await assignHOD(instructorId, departmentId);
        setDepartments((prevDepartments) =>
          prevDepartments.map((dept) =>
            dept._id === updatedDept._id ? updatedDept : dept
          )
        );
        setOpenInstructorsDeptId("");
      }catch(err){
        console.error("Error changing HOD:", err);
        alert("Error changing HOD");
      }
    }

    useEffect(()=>{
        const loadDepartments = async () => {
            setIsLoading(prevLoading => ({ ...prevLoading, page: true }));
            const data = await getAllDepartments();
            console.log(data);
            setDepartments(data);
            setIsLoading(prevLoading => ({ ...prevLoading, page: false }));
        }
        loadDepartments();
    },[]);

  return (
    <div className='departments'>
        <button className='add-department' onClick={() => {setIsModalOpen(true)}}>Add Department</button>
        <table>
        <thead>
          <tr>
            <th>Departments</th>
            <th>HOD</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading.page?<tr>
            <td colSpan={3}>Loading...</td>
          </tr>
          :departments.length===0?
          <tr>
            <td colSpan={3}>No Departments Found</td>
          </tr>
          :departments.map((dept,index)=>(
            <tr key={index}>
              <td>{dept.name}</td>
              <td>{dept.hod?dept.hod.username:"No HOD assigned"}</td>
              <td>
                <div className='action-btns' >
                  <button style={{backgroundColor:'green',color:'white'}} onClick={() => handleChangeHODClk(dept._id)} onBlur={()=>setOpenInstructorsDeptId("")}>Change HOD</button>
                  <button style={{backgroundColor:'red',color:'white'}} onClick={() => handleDelete(dept._id)}>Delete</button>
                </div>
                {openInstructorsDeptId === dept._id && <div className='instructors-list' onMouseDown={(e)=>e.preventDefault()}>
                  {isLoading.instructors?<div>Loading...</div>:
                  instructors.length===0?<div>No Instructors Found</div>:
                  <ul style={{listStyleType:'none',padding:'0px 10px 0px 10px'}}>
                    {instructors.map((instructor) => (
                      <li className='instructor-item' key={instructor._id} onClick={() => handleChangeHOD(dept._id, instructor._id)}>{instructor.username}</li>
                    ))}
                  </ul> }
                </div>}
              </td>
            </tr>))}
        </tbody>
      </table>
      {isModalOpen && <div className={`modal ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <h2>Add Department</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Department Name:
                <input type="text" name="name" required />
              </label>
              <div className='modal-buttons'>             
              <button className='modal-button' type="submit">Add</button>
              <button className='modal-button' onClick={()=>setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
      </div>}
    </div>
  )
}

export default Departments