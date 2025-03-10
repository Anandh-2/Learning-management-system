import React from 'react'
import Course from './Course'
import '../styles/CourseList.css'

function CourseList({name}) {
  const courses=[
    {name:"DSP", id:100},
    {name:"CS", id:101},
    {name:"ADC", id:102},
    {name:"MIT", id:103},
    {name:"ES", id:104},
  ]
  return (
    <div className='course-list'>
        <h2>{name}</h2>
        <div id='courses'>
            {courses.map((course)=><Course course={course}/>)}
        </div>
    </div>
  )
}

export default CourseList