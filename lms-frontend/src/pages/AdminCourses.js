import React from 'react'

function AdminCourses() {
  return (
    <div className='admin-courses'>
      <div className='filters'>
        <select>
          <option value="">All Courses</option>
          <option value="active">Active Courses</option>
          <option value="inactive">Inactive Courses</option>
        </select>
      </div>
    </div>
  )
}

export default AdminCourses