import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/ProfileDropdown.css'
import { useAuth } from '../context/AuthContext'

function ProfileDropdown() {

  const {logout}=useAuth();
  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    logout();
  }
  return (
    <div className='profile-dropdown' onMouseDown={(e)=>e.preventDefault()}>
        <ul>
            <li><Link to={'/login'}>Profile</Link></li>
            <li onClick={handleLogout}>Logout</li>
        </ul>
    </div>
  )
}

export default ProfileDropdown