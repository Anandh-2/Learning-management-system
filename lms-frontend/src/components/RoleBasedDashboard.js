import React from 'react'
import StudentDashboard from '../pages/StudentDashboard'
import InstructorDashboard from '../pages/InstructorDashboard'
import { Navigate } from 'react-router-dom'
import AdminDashboard from '../pages/AdminDashboard'
import HODDashboard from '../pages/HODDashboard'

function RoleBasedDashboard({userRole}) {
  if(userRole==='student'){
    return <StudentDashboard/>
  }else if(userRole==='instructor'){
    return <InstructorDashboard/>
  }else if(userRole==='admin'){
    return <AdminDashboard/>
  }else if(userRole==='hod'){
    return <HODDashboard/>
  }else{
    return <Navigate to={"/login"}/>
  }
}

export default RoleBasedDashboard