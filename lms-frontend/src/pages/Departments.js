import React, { useState } from 'react';
import '../styles/Departments.css';

function Department({ department }) {
  return (
    <li className="item">
      {department.name} - {department.hod.name}
    </li>
  );
}

function Departments() {
  const [departments, setDepartments] = useState([
    { name: "Computer Science", hod: { name: "Dr. Smith" } },
    // { name: "Mechanical Engineering", hod: { name: "Prof. Johnson" } },
    { name: "Mechanical Engineering", hod: { name: "Prof. Johnson" } },
    { name: "Electrical Engineering", hod: { name: "Dr. Davis" } },
    // { name: "Electrical Engineering", hod: { name: "Dr. Davis" } },
    { name: "Civil Engineering", hod: { name: "Prof. Lee" } }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newDep, setNewDep] = useState({ name: '', hod: '' });

  const handleAdd = () => {
    setDepartments([...departments, { name: newDep.name, hod: { name: newDep.hod } }]);
    setNewDep({ name: '', hod: '' });
    setShowModal(false);
  };

  return (
    <div className={`departments ${showModal ? 'blurred' : ''}`}>
      <ul className="list">
        {departments.map((dept, index) => (
          <Department key={index} department={dept} />
        ))}
        <li className="item add-card" onClick={() => setShowModal(true)}>➕ Add Department</li>
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Department</h3>
            <input
              type="text"
              placeholder="Department Name"
              value={newDep.name}
              onChange={e => setNewDep({ ...newDep, name: e.target.value })}
            />
            {/* <input
              type="text"
              placeholder="HOD Name"
              value={newDep.hod}
              onChange={e => setNewDep({ ...newDep, hod: e.target.value })}
            /> */}
            <div className="modal-buttons">
              <button onClick={handleAdd}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departments;
