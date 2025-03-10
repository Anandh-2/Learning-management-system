import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/ProfileDropdown.css'

function ProfileDropdown() {
  return (
    <div className='profile-dropdown' onMouseDown={(e)=>e.preventDefault()}>
        <ul>
            <li><Link to={'/login'}>Profile</Link></li>
            <li>Logout</li>
        </ul>
    </div>
  )
}

export default ProfileDropdown