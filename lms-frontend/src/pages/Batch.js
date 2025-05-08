import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Batch.css';

function Batch() {
  const navigate = useNavigate();
  
  const [batches, setBatches] = useState([
    { name: "Batch: 2022–2023" },
    { name: "Batch: 2023–2024" },
    { name: "Batch: 2024–2025" }
  ]);

  useEffect(() => {
    const loadBatches = ()
  }, []);

  return (
    <div className="batches">
      <div className="batch-header">
        <h2 className="batches-title">Batches</h2>
        <button className="add-batch-btn" onClick={() => navigate('new')}>+ Add Batch</button>
      </div>
      <ul className="batch-list">
        {batches.map((batch, index) => (
          <li key={index} className="batch-item">{batch.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Batch;
