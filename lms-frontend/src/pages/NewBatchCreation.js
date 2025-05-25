import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewBatchCreation.css';
import { createBatch, createDept, getAllDepartments } from '../api/Api';

function NewBatchCreation() {
  const [batchName, setBatchName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDepartmentToggle = (id) => {
    setSelectedDepartments(prev =>
      prev.includes(id)
        ? prev.filter(depId => depId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBatch({name:batchName, departments:selectedDepartments});
    navigate('/admin/batches');
  };

  useEffect(()=>{
    const loadDepartments = async()=>{
      // setIsLoading(true);
      const depts = await getAllDepartments();
      setDepartments(depts);
      // setIsLoading(false);
    }
    loadDepartments();
  },[]);

  return (
    <div className='new-batch'>
    <div className="new-batch-container">
      <h2>Create New Batch</h2>
      <form className='new-batch-form' onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Batch Name :</label>
        <input
          type="text"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          placeholder='e.g. 2022'
          required
          />
      </div>
        <h3>Select Departments :</h3>
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
            
          </tbody>
        </table>

        <button className='button' type="submit">Add Batch</button>
      </form>

    </div>
    </div>
  );
}

export default NewBatchCreation;
