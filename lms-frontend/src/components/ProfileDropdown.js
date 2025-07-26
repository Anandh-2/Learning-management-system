import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/ProfileDropdown.css'
import { useAuth } from '../context/AuthContext'

function ProfileDropdown() {

  const {user,logout}=useAuth();
  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    logout();
  }
  return (
    <div className='profile-dropdown' onMouseDown={(e)=>e.preventDefault()}>
        <div className='greeting'>Hi, {user.name}!</div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default ProfileDropdown