import React from 'react'
import '../styles/ContentsBar.css'
import Module from './Module'

function ContentsBar({modules}) {
  return (
    <div className='content-bar'>
    <div>
    <h2>Contents</h2>
    <button>+</button>
    </div>
    {modules.length===0 ? <p>No module</p>:modules.map((module)=><Module module={module}/>)}
    </div>
  )
}

export default ContentsBar