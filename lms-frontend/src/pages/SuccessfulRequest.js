import React from 'react'
import "../styles/SuccessfulRequest.css";
import { useLocation } from 'react-router-dom';

function SuccessfulRequest() {
    const location = useLocation();
    const {username} = location.state||{username:"Learner"};
  return (
    <div className='successful-request-page'>
    <div className='successful-request'>
        <h1>Success!</h1>
        <h2>Dear {username}! , Thanks for registering.</h2>
        <p style={{color:'green'}}>Your request has been processed successfully.</p>
    </div>
    </div>
  )
}

export default SuccessfulRequest