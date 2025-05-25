import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Batch.css';
import { getBatches } from '../api/Api';

function Batch() {
  const navigate = useNavigate();
  
  const [batches, setBatches] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (batchId)=>{
    navigate(`${batchId}/departments`);
  }

  useEffect(() => {
    const loadBatches = async()=>{
      setIsLoading(true);
      const data = await getBatches();
      setBatches(data);
      setIsLoading(false);
    }
    loadBatches();
  }, []);

  return (
    <div className="batches">
      <div className="batch-header">
        <button className="add-batch-btn" onClick={() => navigate('new')}>Add Batch</button>
      </div>
      <div className='batches-container'>
      {isLoading ? <div>Loading</div>
      :
      batches.length===0 ?
      <div style={{textAlign: 'center'}}>No batch found</div>
      :
      <div className="batches-grid">
        {batches.map((batch, index) => (
          <div key={index} className="batch-item" onClick={()=>handleClick(batch._id)}>{batch.name}</div>
        ))}
      </div>
      }
      </div>
    </div>
  );
}

export default Batch;
