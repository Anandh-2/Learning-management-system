import React from 'react'
import StudentDashboard from '../pages/StudentDashboard'
import InstructorDashboard from '../pages/InstructorDashboard'
import { Navigate } from 'react-router-dom'

function RoleBasedDashboard({userRole}) {
  if(userRole==='student'){
    return <StudentDashboard/>
  }else if(userRole==='instructor'){
    return <InstructorDashboard/>
  }else{
    return <Navigate to={"/login"}/>
  }
}

export default RoleBasedDashboard