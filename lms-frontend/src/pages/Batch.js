import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Batch.css';
import { getBatches } from '../api/Api';

function Batch() {
  const navigate = useNavigate();
  
  const [batches, setBatches] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadBatches = async()=>{
      setIsLoading(true);
      const data = await getBatches();
      setBatches(data);
      setIsLoading(false)
    }
    loadBatches();
  }, []);

  return (
    <div className="batches">
      <div className="batch-header">
        <h2 className="batches-title">Batches</h2>
        <button className="add-batch-btn" onClick={() => navigate('new')}>+ Add Batch</button>
      </div>
      {isLoading ? <div>Loading</div>
      :
      batches.length===0 ?
      <div>No batch found</div>
      :
      <ul className="batch-list">
        {batches.map((batch, index) => (
          <li key={index} className="batch-item">{batch.name}</li>
        ))}
      </ul>
      }
    </div>
  );
}

export default Batch;
