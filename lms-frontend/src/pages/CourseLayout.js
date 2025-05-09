import React from 'react'
import {Outlet} from 'react-router-dom'
import ContentsBar from '../components/ContentsBar'
import '../styles/CourseLayout.css'

function CourseLayout() {
  return (
    <div className='course-layout'>
        <ContentsBar/>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default CourseLayout