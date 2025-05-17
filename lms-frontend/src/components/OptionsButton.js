import React, { useState } from 'react'
import '../styles/OptionsButton.css'
import { FiEdit3, FiSave, FiX } from "react-icons/fi";

function OptionsButton({isEditing, setIsEditing}) {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  return (
    <div className='opns-btn' onMouseEnter={()=>setIsCancelOpen(true)} onMouseLeave={()=>setIsCancelOpen(false)}>
        {isEditing && <button className={`cancel-btn ${isCancelOpen?'show':''}`} ><FiX/></button>}

        {isEditing ? <button className='save-btn' onClick={()=>setIsEditing(false)}><FiSave/></button>:<button className='edit-btn' onClick={()=>setIsEditing(true)}><FiEdit3/></button>}
    </div>
  )
}

export default OptionsButton