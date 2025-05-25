import React, { useState } from 'react'
import '../styles/OptionsButton.css'
import { FiEdit3, FiSave, FiX } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import { MdDelete } from "react-icons/md";


function OptionsButton({isEditing, setIsEditing, handleSave, handleCancel, handleDelete}) {
  // const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
        {/* {isEditing && <button className={`cancel-btn ${isCancelOpen?'show':''}`} onClick={()=>handleCancel()}><FiX/></button>}
        
        {isEditing ? <button className='save-btn' onClick={()=>handleSave()}><FiSave/></button>:<button className='edit-btn' onClick={()=>setIsEditing(true)}><FiEdit3/></button>} */}

        {isEditing ?
        <div className='opns-btns' onMouseEnter={()=>setIsMenuOpen(true)} onMouseLeave={()=>setIsMenuOpen(false)}>
          <button className={`hidden-btn ${isMenuOpen?'show':''}`} onClick={()=>handleCancel()}><FiX/></button>
          <button className='main-btn' onClick={()=>handleSave()}><FiSave/></button>
        </div>
        :
        <div className='opns-btns' onMouseEnter={()=>setIsMenuOpen(true)} onMouseLeave={()=>setIsMenuOpen(false)}>
          <button className={`hidden-btn ${isMenuOpen?'show':''}`} style={{backgroundColor:'#cc0028'}} onClick={()=>handleDelete()}><MdDelete/></button>
          <button className={`hidden-btn ${isMenuOpen?'show':''}`} onClick={()=>setIsEditing(true)}><FiEdit3/></button>
          <button className='main-btn'><CgMenuBoxed/></button>
        </div>}
    </div>
  )
}

export default OptionsButton