import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewBatchCreation.css';
import { createBatch, createDept, getDepartments } from '../api/Api';

function NewBatchCreation() {
  const [batchName, setBatchName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDepartmentToggle = (id) => {
    setSelectedDepartments(prev =>
      prev.includes(id)
        ? prev.filter(depId => depId !== id)
        : [...prev, id]
    );
  };

  const handleAddDepartment = async() => {
    if (!newDeptName.trim()) return;

    const newDept = await createDept({deptName:newDeptName});
    if(!newDept)return;
    setDepartments(prev => [...prev, newDept]);
    setSelectedDepartments(prev => [...prev, newDept._id]);
    setNewDeptName('');
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBatch({name:batchName, departments:selectedDepartments});
    navigate('/batches');
  };

  useEffect(()=>{
    const loadDepartments = async()=>{
      // setIsLoading(true);
      const depts = await getDepartments();
      setDepartments(depts);
      // setIsLoading(false);
    }
    loadDepartments();
  },[]);

  return (
    <div className="new-batch-container">
      <h2>Create New Batch</h2>
      <form onSubmit={handleSubmit}>
        <label>Batch Name</label>
        <input
          type="text"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          required
          />

        <h3>Select Departments</h3>
        <table className="departments-table">
          <thead>
            <tr>
              <th>Include</th>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dep => (
              <tr key={dep._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dep._id)}
                    onChange={() => handleDepartmentToggle(dep._id)}
                  />
                </td>
                <td>{dep.name}</td>
              </tr>
            ))}
            <tr className="add-department-row" onClick={() => setShowModal(true)}>
              <td colSpan="2">+ Add Department</td>
            </tr>
          </tbody>
        </table>

        <button className='button' type="submit">Add Batch</button>
      </form>

      {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Department</h3>
            <input
              type="text"
              placeholder="Department Name"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              />
            <div className="modal-actions">
              <button className='button' onClick={handleAddDepartment}>Add</button>
              <button className='button' onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewBatchCreation;
