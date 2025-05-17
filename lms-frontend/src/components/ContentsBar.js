import React, { useEffect, useRef, useState } from 'react'
import '../styles/ContentsBar.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuShuffle } from "react-icons/lu";
import { CgFolderAdd } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegCheckCircle } from "react-icons/fa";
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd'
import { useNavigate } from 'react-router-dom';

function ContentsBar({course, setCourse}) {
  const [openModuleId, setOpenModuleId] = useState(null);
  const [openOptionId, setOpenOptionId] = useState(null);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const navigate=useNavigate();
  
  const modules=course.modules;

  const handleShuffleClk = ()=>{
    setIsShuffleOn(true);
  }

  const handleShuffleSaveClk = ()=>{
    setIsShuffleOn(false);
  }

  const onDragEnd = (result) => {
    const {source,destination,type} = result;
    if(!destination)return;

    const newCourse = {...course};

    if(type==="module"){
      const items = Array.from(course.modules);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index,0,reorderedItem);
      newCourse.modules=items;
    }else if(type==="content"){
      const sourceModule = course.modules.find(
        (mod)=>mod._id===source.droppableId
      );

      const destModule = course.modules.find(
        (mod)=>mod._id===destination.droppableId
      );

      const sourceItems = [...sourceModule.contents];
      const [movedItem] = sourceItems.splice(source.index,1);

      if(source.droppableId===destination.droppableId){
        sourceItems.splice(destination.index,0,movedItem);
        sourceModule.contents=sourceItems;
      }else{
        const destItems = [...destModule.contents];
        destItems.splice(destination.index,0,movedItem);
        sourceModule.contents=sourceItems;
        destModule.contents=destItems;
      }
    }
    setCourse(newCourse);

  }

  const optionRef = useRef(null);

  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(optionRef.current && !optionRef.current.contains(e.target))
      setOpenOptionId(null);
    }
    window.addEventListener('mousedown', handleClickOutside);
    return ()=>window.removeEventListener('mousedown',handleClickOutside);
  },[]);

  return (
    <div className='content-bar'>
    <div className='bar-top'>
      <IoMdArrowRoundBack className='bar-top-btns' onClick={()=>navigate(-1)}/>
      <div className='bar-top-right'>
      <CgFolderAdd className='bar-top-btns' onClick={()=>setIsModuleModalOpen(prev=>!prev)}/>
      {isShuffleOn?<FaRegCheckCircle style={{backgroundColor:'#355f42'}} className='bar-top-btns' onClick={handleShuffleSaveClk}/>:<LuShuffle className='bar-top-btns' onClick={handleShuffleClk}/>}
      <LuPanelLeftClose className='bar-top-btns'/>
      </div>
    </div>
    {isModuleModalOpen && <div>
    <div className='module-modal-bg'></div>
      <div className='module-modal'>
        <form>
          <h2 style={{margin:'0'}}>Module</h2>
          <div className='form-input'>
          <label htmlFor='title'>Title :</label>
          <input name='title' id='title'/>
          </div>
          <div id='module-action-btns'>
          <button>Cancel</button>
          <button type='submit'>Submit</button>
          </div>
        </form>
        </div>
    </div>}
    <div>
    <h2>Course Title</h2>
    </div>
    {modules.length===0 ? <p>No module</p>:
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='modules' type='module'>
        {(provided)=>(
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {course.modules.map((module, moduleIndex)=>(
              <Draggable key={module._id} draggableId={module._id} index={moduleIndex}>
                {(provided)=>(
                  <div 
                    className='module'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...(isShuffleOn ? provided.dragHandleProps : {})}
                  >
                    <div className='module-title'><div style={{fontWeight:600,flex:1}} onClick={()=>setOpenModuleId(prev => prev===module._id?null:module._id)}>{module.title}</div><button className='module-opns' onClick={(e)=>{e.stopPropagation();setOpenOptionId(prev=>prev===module._id?null:module._id)}}><SlOptionsVertical className='module-opns'/></button></div>
                    {openOptionId===module._id && <div className='module-options' ref={optionRef}>
                      <ul className='module-options-list'>
                        <li>Add Content</li>
                        <li>Edit</li>
                        {module.isPublished?<li>Unpublish</li>:<li>Publish</li>}
                        <li style={{color:'red'}}>Delete</li>
                      </ul>
                    </div>}
                    {(openModuleId===module._id||isShuffleOn) && 
                    <Droppable droppableId={module._id} type='content'>
                      {(provided)=>(
                        <div className='list' ref={provided.innerRef} {...provided.droppableProps}>
                          {module.contents.map((content, contentIndex)=>(
                            <Draggable key={content._id} draggableId={content._id} index={contentIndex}>
                              {(provided)=>(
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...(isShuffleOn ? provided.dragHandleProps :{})}
                                  >
                                    <div className='list-itm' onClick={()=>navigate(`${content.type}/${content.data}`)}>{content.title}</div>
                                  </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                )}
                    </Droppable>
                    }
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    }
    </div>
  )
}

export default ContentsBar