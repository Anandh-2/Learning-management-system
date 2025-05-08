import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/NewBatchCreation.css';

function NewBatchCreation() {
  const [batchName, setBatchName] = useState('');
  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Electrical" },
    { id: 3, name: "Mechanical" },
    { id: 4, name: "Civil" },
  ]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const navigate = useNavigate();

  const handleDepartmentToggle = (id) => {
    setSelectedDepartments(prev =>
      prev.includes(id)
        ? prev.filter(depId => depId !== id)
        : [...prev, id]
    );
  };

  const handleAddDepartment = () => {
    if (!newDeptName.trim()) return;

    const newId = departments.length + 1;
    const newDept = { id: newId, name: newDeptName };

    setDepartments(prev => [...prev, newDept]);
    setSelectedDepartments(prev => [...prev, newId]);
    setNewDeptName('');
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBatch = {
      name: batchName,
      departments: departments.filter(dep => selectedDepartments.includes(dep.id)),
    };

    try {
      await axios.post('/api/batch', newBatch); // Adjust the URL to your backend
      navigate('/batch', { state: { newBatch: batchName } });
    } catch (error) {
      console.error('Failed to create batch:', error);
    }
  };

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
              <tr key={dep.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dep.id)}
                    onChange={() => handleDepartmentToggle(dep.id)}
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

        <button type="submit">Add Batch</button>
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
              <button onClick={handleAddDepartment}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewBatchCreation;
