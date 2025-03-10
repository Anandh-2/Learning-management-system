import React from 'react'
import '../styles/ContentsBar.css'
import Module from './Module'

function ContentsBar({modules}) {
  return (
    <div className='content-bar'>
    <h2>Contents</h2>
    {modules.map((module)=><Module module={module}/>)}
    </div>
  )
}

export default ContentsBar