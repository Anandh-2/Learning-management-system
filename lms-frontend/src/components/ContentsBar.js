import React from 'react'
import '../styles/ContentsBar.css'
import Module from './Module'
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuPanelLeftClose } from "react-icons/lu";
import Logo from '../images/EaseLearn.png'

function ContentsBar() {
  const modules=[{title:"Module1", materials:["M1", "M2", "M3"]},{title:"Module2", materials:["M1", "M2", "M3"]},{title:"Module3", materials:["M1", "M2", "M3"]}];
  return (
    <div className='content-bar'>
    <div className='bar-top'>
      <IoMdArrowRoundBack/>
      <LuPanelLeftClose/>
    </div>
    <div>
    <h2>Course Title</h2>
    </div>
    {modules.length===0 ? <p>No module</p>:modules.map((module)=><Module module={module}/>)}
    </div>
  )
}

export default ContentsBar